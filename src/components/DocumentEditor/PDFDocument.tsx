import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { DocumentData, getProposalText } from '@/types/document';

interface PDFDocumentProps {
  data: DocumentData;
  selectedTemplateId?: string;
}

// Estilos do PDF - IDÊNTICOS AO PREVIEW
const styles = StyleSheet.create({
  page: {
    padding: 60,
    fontSize: 12,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
    lineHeight: 1.6,
  },
});

const PDFDocument: React.FC<PDFDocumentProps> = ({ data, selectedTemplateId }) => {
  const fixedProposalText = getProposalText(selectedTemplateId);
  
  // Substituir o nome do corretor no texto
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
    const numValue = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^\d,]/g, '').replace(',', '.'));
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(numValue);
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={{
          borderBottom: '2pt solid #d1d5db',
          paddingBottom: 20,
          marginBottom: 30,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <View style={{ flex: 1 }}>
            <Text style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: 8,
            }}>
              PROPOSTA COMERCIAL
            </Text>
            <Text style={{
              fontSize: 11,
              color: '#6b7280',
              fontWeight: 'medium',
            }}>
              Proposta Nº {data.numeroProposta || '_______________'}
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <View style={{
              width: 70,
              height: 70,
              backgroundColor: '#059669',
              borderRadius: 2,
              marginBottom: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {data.logoEmpresa ? (
                <Image 
                  src={data.logoEmpresa} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'contain',
                    padding: 4
                  }} 
                />
              ) : (
                <Text style={{
                  color: '#ffffff',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                  LOGO
                </Text>
              )}
            </View>
            <Text style={{
              fontSize: 10,
              color: '#6b7280',
            }}>
              {formatDate(data.dataProposta) || 'Data não informada'}
            </Text>
          </View>
        </View>

        {/* Project Title */}
        <View style={{
          backgroundColor: '#059669',
          padding: 16,
          marginBottom: 24,
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#ffffff',
            textAlign: 'center',
            letterSpacing: 0.5,
          }}>
            {data.tituloParceria || 'Proposta de Parceria – SINDIPOL'}
          </Text>
        </View>

        {/* Fixed Proposal Text */}
        <View style={{ marginTop: 8 }}>
          {processedText.split('\n').map((line, index) => {
            // Título principal (Proposta de Parceria – SINDIPOL) - pular pois já mostramos acima
            if (line.includes('Proposta de Parceria –')) {
              return null;
            }
            
            // Subtítulos numerados (1. Quem Somos, 2. Objetivo, etc.)
            if (line.match(/^\d+\.\s+/)) {
              return (
                <View key={index} style={{ marginTop: 24, marginBottom: 12 }}>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#111827',
                    borderLeftWidth: 4,
                    borderLeftColor: '#059669',
                    paddingLeft: 12,
                    paddingVertical: 6,
                    backgroundColor: '#f0fdf4',
                    lineHeight: 1.4
                  }}>
                    {line}
                  </Text>
                </View>
              );
            }
            
            // Bullet points principais (•)
            if (line.startsWith('•')) {
              return (
                <View key={index} style={{ flexDirection: 'row', marginLeft: 20, marginBottom: 8 }}>
                  <Text style={{ fontSize: 14, color: '#059669', marginRight: 10, fontWeight: 'bold' }}>✓</Text>
                  <Text style={{ fontSize: 12, flex: 1, lineHeight: 1.6, color: '#1f2937' }}>
                    {line.substring(2)}
                  </Text>
                </View>
              );
            }
            
            // Sub-itens (linhas com 'o')
            if (line.trim().startsWith('o ')) {
              return (
                <View key={index} style={{ flexDirection: 'row', marginLeft: 40, marginBottom: 6 }}>
                  <Text style={{ fontSize: 11, color: '#10b981', marginRight: 10 }}>→</Text>
                  <Text style={{ fontSize: 11, flex: 1, lineHeight: 1.5, color: '#374151' }}>
                    {line.trim().substring(2)}
                  </Text>
                </View>
              );
            }
            
            // Seção de contato
            if (line.startsWith('Contato:')) {
              return (
                <View key={index} style={{
                  marginTop: 30,
                  padding: 20,
                  backgroundColor: '#f0fdf4',
                  borderLeftWidth: 4,
                  borderLeftColor: '#059669'
                }}>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#047857', marginBottom: 8 }}>
                    {line}
                  </Text>
                </View>
              );
            }
            
            // Informações de contato específicas
            if (line.includes('Kamila Ramos Corrêa') || line.includes('(27)') || line.includes('@') || line.includes('Instagram:')) {
              return (
                <View key={index} style={{ marginLeft: 20, marginBottom: 4 }}>
                  <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#1f2937', lineHeight: 1.6 }}>
                    {line}
                  </Text>
                </View>
              );
            }
            
            // Linhas vazias
            if (line.trim() === '') {
              return <View key={index} style={{ height: 8 }} />;
            }
            
            // Texto normal (parágrafos)
            return (
              <Text key={index} style={{
                fontSize: 12,
                lineHeight: 1.6,
                marginBottom: 8,
                color: '#1f2937',
                textAlign: 'justify'
              }}>
                {line}
              </Text>
            );
          })}
        </View>

        {/* Values */}
        {(data.valorTotal || data.condicoesPagamento || data.prazoExecucao) && (
          <View style={{
            marginTop: 30,
            padding: 20,
            backgroundColor: '#f0fdf4',
            borderLeftWidth: 4,
            borderLeftColor: '#059669'
          }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#047857', marginBottom: 12 }}>
              INVESTIMENTO
            </Text>
            {data.valorTotal && (
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 8 }}>
                {formatCurrency(data.valorTotal)}
              </Text>
            )}
            {data.condicoesPagamento && (
              <Text style={{ fontSize: 12, color: '#1f2937', marginBottom: 6, lineHeight: 1.6 }}>
                <Text style={{ fontWeight: 'bold' }}>Condições de Pagamento:</Text> {data.condicoesPagamento}
              </Text>
            )}
            {data.prazoExecucao && (
              <Text style={{ fontSize: 12, color: '#1f2937', lineHeight: 1.6 }}>
                <Text style={{ fontWeight: 'bold' }}>Prazo de Execução:</Text> {data.prazoExecucao}
              </Text>
            )}
          </View>
        )}

        {/* Observations */}
        {data.observacoes && (
          <View style={{
            marginTop: 24,
            padding: 20,
            backgroundColor: '#fffbeb',
            borderLeftWidth: 4,
            borderLeftColor: '#f59e0b'
          }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#92400e', marginBottom: 8 }}>
              OBSERVAÇÕES
            </Text>
            <Text style={{ fontSize: 12, color: '#1f2937', lineHeight: 1.6 }}>
              {data.observacoes}
            </Text>
          </View>
        )}

        {/* Footer */}
        <View style={{
          marginTop: 40,
          paddingTop: 20,
          borderTop: '2pt solid #d1d5db'
        }}>
          <View style={{ textAlign: 'center' }}>
            <Text style={{ fontSize: 10, color: '#6b7280', marginBottom: 4 }}>
              Proposta válida por: {data.validadeProposta || '30 dias'}
            </Text>
            <Text style={{ fontSize: 10, color: '#6b7280', marginBottom: 4 }}>
              Data da Proposta: {formatDate(data.dataProposta) || 'Data não informada'}
            </Text>
            <Text style={{ fontSize: 10, color: '#6b7280', fontWeight: 'bold', marginBottom: 12 }}>
              Proposta Nº {data.numeroProposta || 'N/A'}
            </Text>
            <View style={{ paddingTop: 12, borderTop: '1pt solid #e5e7eb' }}>
              <Text style={{ fontSize: 9, color: '#9ca3af' }}>
                {data.nomeEmpresa || 'Sua Empresa'} | {data.emailEmpresa || 'email@empresa.com'} | {data.telefoneEmpresa || 'Telefone'}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;