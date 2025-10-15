"use client";

import { DocumentData, getProposalText } from '@/types/document';
import { motion } from 'framer-motion';

interface PreviewProps {
  documentData: DocumentData;
}

const Preview = ({ documentData }: PreviewProps) => {
  const fixedProposalText = getProposalText();
  
  // Substituir o nome do corretor no texto
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

  const renderLine = (line: string, index: number) => {
    if (line.includes('Proposta de Parceria –')) return null;
    
    // Títulos numerados
    if (line.match(/^\d+\.\s+/)) {
      return (
        <h3 
          key={index} 
          className="font-bold mt-4 mb-2 text-base" 
          style={{ 
            color: '#60C0C0',
            textShadow: '0 1px 2px rgba(0,0,0,0.1)',
            position: 'relative'
          }}
        >
          <span 
            style={{
              background: 'linear-gradient(90deg, rgba(96, 192, 192, 0.1) 0%, transparent 100%)',
              padding: '4px 8px',
              borderRadius: '4px',
              display: 'inline-block'
            }}
          >
            {line}
          </span>
        </h3>
      );
    }
    
    // Bullet points
    if (line.startsWith('•')) {
      return (
        <div key={index} className="ml-4 mb-1 flex items-start">
          <div 
            className="w-2 h-2 mr-3 mt-2 rounded-full flex-shrink-0"
            style={{ 
              backgroundColor: '#8C6B75',
              boxShadow: '0 2px 4px rgba(140, 107, 117, 0.3)'
            }}
          />
          <p className="text-gray-800 text-sm leading-relaxed" style={{ textAlign: 'justify' }}>
            {line.substring(2)}
          </p>
        </div>
      );
    }
    
    // Sub-itens
    if (line.trim().startsWith('o ')) {
      return (
        <div key={index} className="ml-8 mb-1 flex items-start">
          <span className="text-black mr-2 text-sm">o</span>
          <p className="text-gray-800 text-sm leading-relaxed" style={{ textAlign: 'justify' }}>
            {line.trim().substring(2)}
          </p>
        </div>
      );
    }
    
    if (line.trim() === '') return <div key={index} className="h-1"></div>;
    
    // Seção de contato (alinhada à esquerda)
    if (line.includes('[Nome do Corretor]') || line.includes('(') || line.includes('@') || line.includes('Instagram:')) {
      return (
        <p key={index} className="text-gray-800 text-sm leading-relaxed mb-1" style={{ textAlign: 'left' }}>
          {line}
        </p>
      );
    }
    
    return (
      <p key={index} className="text-gray-800 text-sm leading-relaxed mb-1" style={{ textAlign: 'justify' }}>
        {line}
      </p>
    );
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-100">
      <div className="min-h-full p-4 lg:p-8 flex items-start justify-center">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        
        {/* PÁGINA 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-2xl flex-shrink-0 w-full lg:w-[210mm] relative"
          style={{
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05)',
            height: '297mm',
            fontFamily: '"Times New Roman", Times, serif',
            overflow: 'hidden'
          }}
        >
          {/* Marca d'água Página 1 */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(circle at 85% 85%, rgba(140, 107, 117, 0.03) 0%, transparent 50%),
                url(/images/03.jpg)
              `,
              backgroundSize: '280px 280px, 280px 280px',
              backgroundPosition: 'bottom right, bottom right',
              backgroundRepeat: 'no-repeat, no-repeat',
              opacity: 0.25,
              zIndex: 0,
              transform: 'rotate(-12deg)',
              transformOrigin: 'bottom right',
              marginBottom: '40px',
              marginRight: '50px',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
            }}
          />
          <div 
            className="h-full flex flex-col relative z-10" 
            style={{ 
              padding: '20mm',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(248,250,252,0.4) 100%)',
              borderRadius: '6px',
              border: '1px solid rgba(229, 231, 235, 0.5)'
            }}
          >
            
            {/* Header */}
            <div 
              className="pb-3 mb-4"
              style={{
                background: 'linear-gradient(135deg, rgba(140, 107, 117, 0.05) 0%, rgba(96, 192, 192, 0.05) 100%)',
                borderBottom: '2px solid #8C6B75',
                borderRadius: '6px 6px 0 0',
                padding: '16px 20px',
                margin: '-20px -20px 16px -20px'
              }}
            >
              <div className="flex items-center justify-center mb-2 relative">
                <img 
                  src="/images/04.jpg" 
                  alt="Star Life Logo" 
                  className="h-8 w-auto absolute left-0"
                />
                <h1 className="text-lg font-bold text-gray-900">
                  PROPOSTA COMERCIAL
                </h1>
              </div>
              <p className="text-xs text-gray-600 text-center">
                Proposta Nº {documentData.numeroProposta || 'PRCP-2024-0047'} - {formatDate(documentData.dataProposta) || '06 de dezembro de 2024'}
              </p>
            </div>

            {/* Título */}
            <div 
              className="p-3 mb-4 text-center rounded-lg"
              style={{ 
                background: 'linear-gradient(135deg, #8C6B75 0%, #60C0C0 100%)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            >
              <h2 
                className="text-sm font-bold text-white"
                style={{
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                {documentData.tituloParceria || 'Proposta de Parceria – SINDIPOL'}
              </h2>
            </div>

            {/* Conteúdo Página 1 */}
            <div className="flex-1 space-y-2 text-sm">
              {page1Lines.map((line, index) => renderLine(line, index))}
            </div>

          </div>
        </motion.div>

        {/* PÁGINA 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white shadow-2xl flex-shrink-0 w-full lg:w-[210mm] relative"
          style={{
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05)',
            height: '297mm',
            fontFamily: '"Times New Roman", Times, serif',
            overflow: 'hidden'
          }}
        >
          {/* Marca d'água Página 2 */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(circle at 85% 85%, rgba(96, 192, 192, 0.03) 0%, transparent 50%),
                url(/images/03.jpg)
              `,
              backgroundSize: '280px 280px, 280px 280px',
              backgroundPosition: 'bottom right, bottom right',
              backgroundRepeat: 'no-repeat, no-repeat',
              opacity: 0.25,
              zIndex: 0,
              transform: 'rotate(-12deg)',
              transformOrigin: 'bottom right',
              marginBottom: '40px',
              marginRight: '50px',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
            }}
          />
          <div 
            className="h-full flex flex-col relative z-10" 
            style={{ 
              padding: '20mm',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(248,250,252,0.4) 100%)',
              borderRadius: '6px',
              border: '1px solid rgba(229, 231, 235, 0.5)'
            }}
          >
            
            {/* Conteúdo Página 2 */}
            <div className="flex-1 space-y-2 text-sm">
              {page2Lines.map((line, index) => renderLine(line, index))}
            </div>

            {/* Planos que Oferecemos */}
            <div className="mt-4 mb-6">
              <h3 className="font-bold mb-3 text-sm" style={{ color: '#60C0C0' }}>
                Planos que Oferecemos:
              </h3>
              <div className="grid grid-cols-3 gap-8">
                <div className="flex justify-center p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <img src="/images/planos/amil-logo.png" alt="Amil" className="h-12 w-auto object-contain" />
                </div>
                <div className="flex justify-center p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <img src="/images/planos/unimed-logo.png" alt="Unimed" className="h-12 w-auto object-contain" />
                </div>
                <div className="flex justify-center p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <img src="/images/planos/bradesco-saude-logo.png" alt="Bradesco Saúde" className="h-12 w-auto object-contain" />
                </div>
                <div className="flex justify-center p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <img src="/images/planos/medsenior.png" alt="Medsenior" className="h-12 w-auto object-contain" />
                </div>
                <div className="flex justify-center p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <img src="/images/planos/samp-logo.png" alt="Samp" className="h-12 w-auto object-contain" />
                </div>
                <div className="flex justify-center p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <img src="/images/planos/sao-bernardo-logo.png" alt="São Bernardo" className="h-12 w-auto object-contain" />
                </div>
                <div className="flex justify-center p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <img src="/images/planos/best-senior-logo.png" alt="Best Senior" className="h-12 w-auto object-contain" />
                </div>
                <div className="flex justify-center p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <img src="/images/planos/mais-saude-logo.png" alt="Mais Saúde" className="h-12 w-auto object-contain" />
                </div>
                <div className="flex justify-center p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <img src="/images/planos/you-logo.png" alt="You" className="h-12 w-auto object-contain" />
                </div>
              </div>
            </div>

            {/* Footer Página 2 */}
            <div className="mt-auto pt-4" style={{ borderTop: '2px solid #8C6B75' }}>
              <div className="flex items-center justify-between">
                <div style={{ fontFamily: '"IBM Plex Sans", "Inter", sans-serif' }}>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 flex items-center justify-center" style={{ backgroundColor: 'white', borderRadius: '7px', border: '2px solid #79C6CC' }}>
                        <svg width="28" height="28" viewBox="0 0 448 512" fill="#79C6CC">
                          <path d="M128 148v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12zm140 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-128 96h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm128 0h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-76 84v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm76 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm180 124v36H0v-36c0-6.6 5.4-12 12-12h19.5V24c0-13.3 10.7-24 24-24h337c13.3 0 24 10.7 24 24v440H436c6.6 0 12 5.4 12 12zM79.5 463H192v-67c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v67h112.5V49L80 48l-.5 415z"/>
                        </svg>
                      </div>
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: '400', color: 'rgb(111, 116, 126)', lineHeight: '14.4px' }}>Ed. Enseada Tower</div>
                        <div style={{ fontSize: '16px', fontWeight: '700', color: 'rgb(121, 198, 204)', lineHeight: '24px' }}>Av. João Batista Parra, 673</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 flex items-center justify-center" style={{ backgroundColor: 'white', borderRadius: '7px', border: '2px solid #79C6CC' }}>
                        <svg width="28" height="28" viewBox="0 0 512 512" fill="#79C6CC">
                          <path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"/>
                        </svg>
                      </div>
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: '400', color: 'rgb(111, 116, 126)', lineHeight: '14.4px' }}>Entre em Contato</div>
                        <div style={{ fontSize: '16px', fontWeight: '700', color: 'rgb(121, 198, 204)', lineHeight: '24px' }}>(27) 99861-7901</div>
                      </div>
                    </div>
                  </div>
                </div>
                <img 
                  src="/images/03.jpg" 
                  alt="Star Life Logo" 
                  className="h-8 w-auto"
                />
              </div>
              <div className="text-center text-xs mt-2" style={{ color: '#60C0C0' }}>
                Página 2 de 2
              </div>
            </div>
          </div>
        </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Preview;