import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { DocumentData, getProposalText } from '@/types/document';

interface PDFDocumentProps {
  data: DocumentData;
  selectedTemplateId?: string;
}

// Estilos do PDF
const styles = StyleSheet.create({
  page: {
    paddingTop: 70,
    paddingBottom: 56,
    paddingLeft: 56,
    paddingRight: 56,
    fontSize: 10,
    fontFamily: 'Times-Roman',
    backgroundColor: '#ffffff',
    lineHeight: 1.4,
  },
  header: {
    borderBottom: '2pt solid #d1d5db',
    paddingBottom: 12,
    marginBottom: 12,
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
    fontFamily: 'Times-Bold',
  },
  proposalNumber: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 3,
  },
  date: {
    fontSize: 9,
    color: '#9ca3af',
  },
  titleBox: {
    backgroundColor: '#059669',
    padding: 10,
    marginBottom: 12,
    textAlign: 'center',
  },
  titleBoxText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'Times-Bold',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
    borderLeftWidth: 4,
    borderLeftColor: '#059669',
    paddingLeft: 8,
    paddingVertical: 4,
    backgroundColor: '#f0fdf4',
    marginTop: 12,
    marginBottom: 6,
    fontFamily: 'Times-Bold',
    lineHeight: 1.3,
  },
  text: {
    fontSize: 11,
    color: '#1f2937',
    marginBottom: 12,
    lineHeight: 1.6,
    textAlign: 'justify',
  },
  bulletPoint: {
    flexDirection: 'row',
    marginLeft: 20,
    marginBottom: 6,
  },
  bulletIcon: {
    fontSize: 11,
    color: '#059669',
    fontWeight: 'bold',
    marginRight: 8,
  },
  bulletText: {
    fontSize: 11,
    color: '#1f2937',
    lineHeight: 1.5,
    textAlign: 'justify',
    flex: 1,
  },
  subItem: {
    flexDirection: 'row',
    marginLeft: 32,
    marginBottom: 6,
  },
  subIcon: {
    fontSize: 10,
    color: '#10b981',
    marginRight: 6,
  },
  subText: {
    fontSize: 10,
    color: '#374151',
    lineHeight: 1.4,
    textAlign: 'justify',
    flex: 1,
  },
  contactBox: {
    marginTop: 12,
    padding: 10,
    backgroundColor: '#f0fdf4',
    borderLeftWidth: 4,
    borderLeftColor: '#059669',
  },
  contactTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#047857',
    marginBottom: 6,
    fontFamily: 'Times-Bold',
  },
  contactInfo: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1f2937',
    marginLeft: 12,
    marginBottom: 2,
    lineHeight: 1.4,
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 12,
    borderTop: '2pt solid #d1d5db',
    textAlign: 'center',
  },
  footerText: {
    fontSize: 9,
    color: '#6b7280',
    marginBottom: 3,
  },
  pageNumber: {
    fontSize: 8,
    color: '#9ca3af',
    marginTop: 6,
  },
});

const PDFDocument: React.FC<PDFDocumentProps> = ({ data, selectedTemplateId }) => {
  const fixedProposalText = getProposalText(selectedTemplateId);
  
  // Substituir dados do corretor
  const processedText = fixedProposalText.replace(
    /Kamila Ramos Corrêa/g,
    data.nomeCorretor || '[Nome do Corretor]'
  ).replace(
    /kamilaramoscorretora@gmail\.com/g,
    data.emailCorretor || '[email@exemplo.com]'
  ).replace(
    /\(27\) 98889-1991/g,
    data.telefoneCorretor || '[Telefone]'
  ).replace(
    /@ramos_k/g,
    data.instagramCorretor || '[@usuario]'
  );

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatCurrency = (value: any) => {
    if (!value) return 'R$ 0,00';
    const numValue = typeof value === 'number' ? value : parseFloat(String(value));
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(numValue);
  };

  const lines = processedText.split('\n');
  
  // Encontrar onde termina a seção 4 para quebrar a página
  let breakPoint = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/^5\.\s+/)) {
      breakPoint = i;
      break;
    }
  }
  
  const page1Lines = lines.slice(0, breakPoint);
  const page2Lines = lines.slice(breakPoint);

  const renderTextLine = (line: string, index: number) => {
    if (line.includes('Proposta de Parceria –')) return null;
    
    // Títulos numerados
    if (line.match(/^\d+\.\s+/)) {
      return (
        <Text key={index} style={{
          fontSize: 11,
          fontWeight: 'bold',
          color: '#111827',
          marginTop: 12,
          marginBottom: 6,
          fontFamily: 'Times-Bold',
        }}>
          {line}
        </Text>
      );
    }
    
    // Bullet points
    if (line.startsWith('•')) {
      return (
        <View key={index} style={{
          flexDirection: 'row',
          marginLeft: 16,
          marginBottom: 3,
        }}>
          <Text style={{
            fontSize: 10,
            color: '#000000',
            fontWeight: 'bold',
            marginRight: 6,
            marginTop: 1,
          }}>•</Text>
          <Text style={{
            fontSize: 10,
            color: '#1f2937',
            lineHeight: 1.4,
            textAlign: 'justify',
            flex: 1,
          }}>{line.substring(2)}</Text>
        </View>
      );
    }
    
    // Sub-itens
    if (line.trim().startsWith('o ')) {
      return (
        <View key={index} style={{
          flexDirection: 'row',
          marginLeft: 32,
          marginBottom: 3,
        }}>
          <Text style={{
            fontSize: 10,
            color: '#000000',
            marginRight: 4,
          }}>o</Text>
          <Text style={{
            fontSize: 10,
            color: '#374151',
            lineHeight: 1.4,
            textAlign: 'justify',
            flex: 1,
          }}>{line.trim().substring(2)}</Text>
        </View>
      );
    }
    
    if (line.trim() === '') {
      return <View key={index} style={{ height: 3 }} />;
    }
    
    // Seção de contato (alinhada à esquerda)
    if (line.includes('[Nome do Corretor]') || line.includes('(') || line.includes('@') || line.includes('Instagram:')) {
      return (
        <Text key={index} style={{
          fontSize: 10,
          color: '#1f2937',
          marginBottom: 3,
          lineHeight: 1.4,
          textAlign: 'left',
        }}>
          {line}
        </Text>
      );
    }
    
    return (
      <Text key={index} style={{
        fontSize: 10,
        color: '#1f2937',
        marginBottom: 3,
        lineHeight: 1.4,
        textAlign: 'justify',
      }}>
        {line}
      </Text>
    );
  };

  return (
    <Document>
      {/* PÁGINA 1 */}
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>PROPOSTA COMERCIAL</Text>
          <Text style={styles.proposalNumber}>
            Proposta Nº {data.numeroProposta || '_______________'}
          </Text>
          <Text style={styles.date}>
            {formatDate(data.dataProposta) || 'Data não informada'}
          </Text>
        </View>

        {/* Título da Parceria */}
        <View style={styles.titleBox}>
          <Text style={styles.titleBoxText}>
            {data.tituloParceria || 'Proposta de Parceria – SINDIPOL'}
          </Text>
        </View>

        {/* Conteúdo Página 1 */}
        <View style={{ flex: 1 }}>
          {page1Lines.map((line, index) => renderTextLine(line, index))}
        </View>

        {/* Espaçamento */}
        <View style={{ marginTop: 20, marginBottom: 12 }} />

      </Page>

      {/* PÁGINA 2 */}
      <Page size="A4" style={styles.page}>
        {/* Conteúdo Página 2 */}
        <View style={{ flex: 1 }}>
          {page2Lines.map((line, index) => renderTextLine(line, index + breakPoint))}
        </View>

        {/* Footer Página 2 */}
        <View style={{
          marginTop: 'auto',
          paddingTop: 12,
          borderTopWidth: 2,
          borderTopColor: '#d1d5db',
        }}>
          <View style={{ textAlign: 'center' }}>
            <Text style={{ fontSize: 9, color: '#4b5563', marginBottom: 2 }}>
              Proposta válida por: {data.validadeProposta || '30 dias'}
            </Text>
            <Text style={{ fontSize: 9, color: '#4b5563', marginBottom: 2 }}>
              Data: {formatDate(data.dataProposta)}
            </Text>
            <Text style={{ fontSize: 9, color: '#4b5563', marginBottom: 4 }}>
              Proposta Nº {data.numeroProposta || 'PRCP-2024-0047'}
            </Text>
            <Text style={{ fontSize: 9, color: '#9ca3af' }}>
              Página 2 de 2
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;
