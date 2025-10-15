import { DocumentData, getProposalText } from '@/types/document';

export function generatePDFHTML(documentData: DocumentData): string {
  const fixedProposalText = getProposalText();
  
  // Substituir dados do corretor no texto
  const processedText = fixedProposalText.replace(
    /Kamila Ramos Corrêa/g,
    documentData.nomeCorretor || '[Nome do Corretor]'
  ).replace(
    /kamilaramoscorretora@gmail\.com/g,
    documentData.emailCorretor || '[email@exemplo.com]'
  ).replace(
    /\(27\) 98889-1991/g,
    documentData.telefoneCorretor || '[Telefone]'
  ).replace(
    /@ramos_k/g,
    documentData.instagramCorretor || '[@usuario]'
  ).replace(
    /{percentualComissionamento}/g,
    documentData.percentualComissionamento?.toString() || '10'
  );

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const lines = processedText.split('\n');
  
  // Encontrar onde termina a seção 5 (Vantagens para os Associados)
  let breakPoint = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/^6\.\s+/)) {
      breakPoint = i;
      break;
    }
  }
  
  const page1Lines = lines.slice(0, breakPoint);
  const page2Lines = lines.slice(breakPoint);

  const renderLineToHTML = (line: string): string => {
    if (line.includes('Proposta de Parceria –')) return '';
    
    // Títulos numerados
    if (line.match(/^\d+\.\s+/)) {
      return `
        <h3 style="font-weight: bold; margin-top: 16px; margin-bottom: 8px; font-size: 16px; color: #60C0C0; text-shadow: 0 1px 2px rgba(0,0,0,0.1); position: relative;">
          <span style="background: linear-gradient(90deg, rgba(96, 192, 192, 0.1) 0%, transparent 100%); padding: 4px 8px; border-radius: 4px; display: inline-block;">
            ${line}
          </span>
        </h3>
      `;
    }
    
    // Bullet points
    if (line.startsWith('•')) {
      return `
        <div style="margin-left: 16px; margin-bottom: 4px; display: flex; align-items: flex-start;">
          <div style="width: 8px; height: 8px; margin-right: 12px; margin-top: 8px; border-radius: 50%; flex-shrink: 0; background-color: #8C6B75; box-shadow: 0 2px 4px rgba(140, 107, 117, 0.3);"></div>
          <p style="color: #1f2937; font-size: 14px; line-height: 1.5; text-align: justify; margin: 0;">
            ${line.substring(2)}
          </p>
        </div>
      `;
    }
    
    // Sub-itens
    if (line.trim().startsWith('o ')) {
      return `
        <div style="margin-left: 32px; margin-bottom: 4px; display: flex; align-items: flex-start;">
          <span style="color: black; margin-right: 8px; font-size: 14px;">o</span>
          <p style="color: #1f2937; font-size: 14px; line-height: 1.5; text-align: justify; margin: 0;">
            ${line.trim().substring(2)}
          </p>
        </div>
      `;
    }
    
    if (line.trim() === '') return '<div style="height: 4px;"></div>';
    
    // Seção de contato (alinhada à esquerda)
    if (line.includes('[Nome do Corretor]') || line.includes('(') || line.includes('@') || line.includes('Instagram:')) {
      return `<p style="color: #1f2937; font-size: 14px; line-height: 1.5; margin-bottom: 4px; text-align: left; margin: 0;">${line}</p>`;
    }
    
    return `<p style="color: #1f2937; font-size: 14px; line-height: 1.5; margin-bottom: 4px; text-align: justify; margin: 0;">${line}</p>`;
  };

  const page1Content = page1Lines.map(line => renderLineToHTML(line)).join('');
  const page2Content = page2Lines.map(line => renderLineToHTML(line)).join('');

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Proposta de Parceria</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Times New Roman', Times, serif;
          margin: 0;
          padding: 0;
          background: white;
        }
        
        .page {
          width: 210mm;
          height: 297mm;
          background: white;
          position: relative;
          padding: 20mm;
          page-break-after: always;
        }
        
        .watermark {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzhjNmI3NSIgb3BhY2l0eT0iMC4wMyIvPjwvc3ZnPg==') center/contain no-repeat;
          opacity: 0.25;
          pointer-events: none;
          z-index: 0;
        }
        
        .content {
          position: relative;
          z-index: 10;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .header {
          background: linear-gradient(135deg, rgba(140, 107, 117, 0.05) 0%, rgba(96, 192, 192, 0.05) 100%);
          border-bottom: 2px solid #8C6B75;
          border-radius: 6px 6px 0 0;
          padding: 16px 20px;
          margin-bottom: 16px;
        }
        
        .title-box {
          background: linear-gradient(135deg, #8C6B75 0%, #60C0C0 100%);
          padding: 12px;
          margin-bottom: 16px;
          text-align: center;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        .title-text {
          color: white;
          font-size: 14px;
          font-weight: bold;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
          margin: 0;
        }
        
        .planos-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-top: 16px;
          margin-bottom: 24px;
        }
        
        .plano-card {
          background: white;
          border-radius: 8px;
          padding: 12px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 48px;
        }
        
        .footer {
          margin-top: auto;
          padding-top: 16px;
          border-top: 2px solid #8C6B75;
        }
        
        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
        }
        
        .contact-icon {
          width: 36px;
          height: 36px;
          background: white;
          border-radius: 7px;
          border: 2px solid #79C6CC;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 8px;
          flex-shrink: 0;
        }
        
        .contact-text {
          font-family: 'IBM Plex Sans', 'Inter', sans-serif;
        }
        
        .contact-label {
          font-size: 12px;
          color: rgb(111, 116, 126);
          line-height: 14.4px;
        }
        
        .contact-value {
          font-size: 16px;
          font-weight: 700;
          color: rgb(121, 198, 204);
          line-height: 24px;
        }
        
        @page {
          size: A4;
          margin: 0;
        }
        
        @media print {
          .page {
            margin: 0;
            box-shadow: none;
            border: none;
          }
        }
      </style>
    </head>
    <body>
      <!-- PÁGINA 1 -->
      <div class="page">
        <div class="watermark"></div>
        <div class="content">
          <!-- Header -->
          <div class="header">
            <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 8px; position: relative; width: 100%;">
              <img src="http://localhost:3000/images/04.jpg" alt="Star Life Logo" style="height: 32px; width: auto; position: absolute; left: 0;" />
              <h1 style="margin: 0; font-size: 20px; font-weight: bold; color: #8C6B75;">PROPOSTA COMERCIAL</h1>
            </div>
            <p style="font-size: 12px; color: #6b7280; margin: 0; text-align: center;">
              Proposta Nº ${documentData.numeroProposta || 'PRCP-2024-0047'} - ${formatDate(documentData.dataProposta) || '06 de dezembro de 2024'}
            </p>
          </div>

          <!-- Título -->
          <div class="title-box">
            <h2 class="title-text">
              ${documentData.tituloParceria || 'Proposta de Parceria – SINDIPOL'}
            </h2>
          </div>

          <!-- Conteúdo Página 1 -->
          <div style="flex: 1; display: flex; flex-direction: column; gap: 8px;">
            ${page1Content}
          </div>
        </div>
      </div>

      <!-- PÁGINA 2 -->
      <div class="page">
        <div class="watermark"></div>
        <div class="content">
          <!-- Conteúdo Página 2 -->
          <div style="flex: 1; display: flex; flex-direction: column; gap: 8px;">
            ${page2Content}
          </div>

          <!-- Planos que Oferecemos -->
          <div style="margin-top: 24px; margin-bottom: 16px;">
            <h3 style="font-weight: bold; margin-bottom: 12px; font-size: 14px; color: #60C0C0;">
              Planos que Oferecemos:
            </h3>
            <div class="planos-grid">
              ${[
                { nome: 'Amil', img: 'amil-logo.png' },
                { nome: 'Unimed', img: 'unimed-logo.png' },
                { nome: 'Bradesco Saúde', img: 'bradesco-saude-logo.png' },
                { nome: 'Medsenior', img: 'medsenior.png' },
                { nome: 'Samp', img: 'samp-logo.png' },
                { nome: 'São Bernardo', img: 'sao-bernardo-logo.png' },
                { nome: 'Best Senior', img: 'best-senior-logo.png' },
                { nome: 'Mais Saúde', img: 'mais-saude-logo.png' },
                { nome: 'You', img: 'you-logo.png' }
              ].map(plano => `
                <div class="plano-card">
                  <img src="http://localhost:3000/images/planos/${plano.img}" alt="${plano.nome}" style="max-height: 48px; max-width: 100%; object-fit: contain;" />
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Footer -->
          <div class="footer">
            <div class="footer-content">
              <div style="display: flex; gap: 16px;">
                <div class="contact-item">
                  <div class="contact-icon">
                    <svg width="20" height="20" viewBox="0 0 448 512" fill="#79C6CC">
                      <path d="M128 148v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12zm140 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-128 96h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm128 0h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-76 84v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm76 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm180 124v36H0v-36c0-6.6 5.4-12 12-12h19.5V24c0-13.3 10.7-24 24-24h337c13.3 0 24 10.7 24 24v440H436c6.6 0 12 5.4 12 12zM79.5 463H192v-67c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v67h112.5V49L80 48l-.5 415z"/>
                    </svg>
                  </div>
                  <div class="contact-text">
                    <div class="contact-label">Ed. Enseada Tower</div>
                    <div class="contact-value">Av. João Batista Parra, 673</div>
                  </div>
                </div>
                <div class="contact-item">
                  <div class="contact-icon">
                    <svg width="20" height="20" viewBox="0 0 512 512" fill="#79C6CC">
                      <path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"/>
                    </svg>
                  </div>
                  <div class="contact-text">
                    <div class="contact-label">Entre em Contato</div>
                    <div class="contact-value">(27) 99861-7901</div>
                  </div>
                </div>
              </div>
              <img src="http://localhost:3000/images/03.jpg" alt="Star Life Logo" style="height: 32px; width: auto;" />
            </div>
            <div style="text-align: center; font-size: 12px; color: #60C0C0; margin-top: 8px;">
              Página 2 de 2
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  return htmlContent;
}

