"use client";

import { DocumentData, getProposalText } from '@/types/document';
import { motion } from 'framer-motion';

interface PreviewProps {
  documentData: DocumentData;
  selectedTemplateId?: string;
}

const Preview = ({ documentData, selectedTemplateId }: PreviewProps) => {
  const fixedProposalText = getProposalText(selectedTemplateId);
  
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
  );
  
  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(num);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const renderDocumentContent = () => (
    <>
      {/* Header */}
      <div className="border-b-2 border-gray-300 pb-8 mb-12">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight" style={{ fontSize: '24pt' }}>
              PROPOSTA COMERCIAL
            </h1>
            <p className="text-base text-gray-600 font-medium" style={{ fontSize: '11pt' }}>
              Proposta Nº {documentData.numeroProposta || '_______________'}
            </p>
          </div>
          <div className="text-right">
            <div className="w-28 h-28 bg-gradient-to-br from-green-600 to-emerald-600 rounded flex items-center justify-center mb-3 shadow-lg overflow-hidden">
              {documentData.logoEmpresa ? (
                <img 
                  src={documentData.logoEmpresa} 
                  alt="Logo" 
                  className="w-full h-full object-contain p-2"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <span className={`text-white font-bold text-2xl ${documentData.logoEmpresa ? 'hidden' : ''}`}>LOGO</span>
            </div>
            <p className="text-sm text-gray-600" style={{ fontSize: '10pt' }}>
              {formatDate(documentData.dataProposta) || 'Data não informada'}
            </p>
          </div>
        </div>
      </div>

      {/* Project Title */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 mb-10 shadow-md">
        <h2 className="text-2xl font-bold text-center" style={{ fontSize: '18pt', letterSpacing: '0.5px' }}>
          {documentData.tituloParceria || 'Proposta de Parceria – SINDIPOL'}
        </h2>
      </div>

      {/* Fixed Proposal Text */}
      <div className="space-y-8">
        {processedText.split('\n').map((line, index) => {
          // Título principal (Proposta de Parceria – SINDIPOL) - pular pois já mostramos acima
          if (line.includes('Proposta de Parceria –')) {
            return null;
          }
          
          // Subtítulos numerados (1. Quem Somos, 2. Objetivo, etc.)
          if (line.match(/^\d+\.\s+/)) {
            return (
              <div key={index} className="mt-10 mb-6">
                <h2 className="text-xl font-bold text-gray-900 border-l-4 border-green-600 pl-4 py-2 bg-green-50" style={{ fontSize: '16pt', lineHeight: '1.4' }}>
                  {line}
                </h2>
              </div>
            );
          }
          
          // Bullet points principais (•)
          if (line.startsWith('•')) {
            return (
              <div key={index} className="ml-8 mb-4 flex items-start">
                <span className="text-green-600 font-bold mr-4 mt-1 text-lg">✓</span>
                <p className="text-gray-800 leading-relaxed flex-1" style={{ fontSize: '12pt', lineHeight: '1.6' }}>
                  {line.substring(2)}
                </p>
              </div>
            );
          }
          
          // Sub-itens (linhas com 'o')
          if (line.trim().startsWith('o ')) {
            return (
              <div key={index} className="ml-16 mb-3 flex items-start">
                <span className="text-green-500 mr-4 text-base">→</span>
                <p className="text-gray-700 leading-relaxed" style={{ fontSize: '11pt', lineHeight: '1.5' }}>
                  {line.trim().substring(2)}
                </p>
              </div>
            );
          }
          
          // Seção de contato
          if (line.startsWith('Contato:')) {
            return (
              <div key={index} className="mt-12 p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-l-4 border-green-600 shadow-sm">
                <h3 className="text-xl font-bold text-green-700 mb-4" style={{ fontSize: '14pt' }}>
                  {line}
                </h3>
              </div>
            );
          }
          
          // Informações de contato específicas
          if (line.includes('[Nome do Corretor]') || line.includes('(') || line.includes('@') || line.includes('Instagram:')) {
            return (
              <div key={index} className="ml-8 mb-2">
                <p className="text-base font-semibold text-gray-800" style={{ fontSize: '11pt', lineHeight: '1.6' }}>
                  {line}
                </p>
              </div>
            );
          }
          
          // Linhas vazias
          if (line.trim() === '') {
            return <div key={index} className="h-4"></div>;
          }
          
          // Texto normal (parágrafos)
          return (
            <p key={index} className="text-gray-800 leading-relaxed mb-4 text-justify" style={{ fontSize: '12pt', lineHeight: '1.6' }}>
              {line}
            </p>
          );
        })}
      </div>

      {/* Values */}
      {(documentData.valorTotal || documentData.condicoesPagamento || documentData.prazoExecucao) && (
        <div className="mt-12 bg-green-50 border-l-4 border-green-600 p-8">
          <h3 className="text-lg font-bold text-green-700 mb-6" style={{ fontSize: '14pt' }}>
            INVESTIMENTO
          </h3>
          
          <div className="space-y-4">
            {documentData.valorTotal && (
              <div>
                <p className="text-2xl font-bold text-gray-900" style={{ fontSize: '18pt' }}>
                  {documentData.valorTotal ? formatCurrency(documentData.valorTotal) : 'R$ 0,00'}
                </p>
              </div>
            )}

            {documentData.condicoesPagamento && (
              <div>
                <p className="text-gray-800 whitespace-pre-wrap" style={{ fontSize: '12pt', lineHeight: '1.6' }}>
                  <span className="font-semibold">Condições de Pagamento:</span> {documentData.condicoesPagamento}
                </p>
              </div>
            )}

            {documentData.prazoExecucao && (
              <div>
                <p className="text-gray-800" style={{ fontSize: '12pt', lineHeight: '1.6' }}>
                  <span className="font-semibold">Prazo de Execução:</span> {documentData.prazoExecucao}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Observations */}
      {documentData.observacoes && (
        <div className="mt-10 p-8 border-l-4 border-yellow-500 bg-yellow-50">
          <h3 className="text-lg font-bold text-yellow-800 mb-4" style={{ fontSize: '14pt' }}>
            OBSERVAÇÕES
          </h3>
          <p className="text-gray-800 whitespace-pre-wrap" style={{ fontSize: '12pt', lineHeight: '1.6' }}>
            {documentData.observacoes}
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-16 pt-8 border-t-2 border-gray-300">
        <div className="text-center text-gray-600 space-y-3" style={{ fontSize: '10pt' }}>
          <p>Proposta válida por: {documentData.validadeProposta || '30 dias'}</p>
          <p>Data da Proposta: {formatDate(documentData.dataProposta) || 'Data não informada'}</p>
          <p className="font-semibold">Proposta Nº {documentData.numeroProposta || 'N/A'}</p>
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              {documentData.nomeEmpresa || 'Sua Empresa'} | {documentData.emailEmpresa || 'email@exemplo.com'} | {documentData.telefoneEmpresa || 'Telefone'}
            </p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="h-full flex justify-center overflow-y-auto bg-gray-100">
      {/* Mobile: Versão miniatura (escala 50%) */}
      <div className="lg:hidden w-full p-2">
        <div 
          className="origin-top-left bg-white shadow-2xl"
          style={{ 
            transform: 'scale(0.5)',
            transformOrigin: 'top left',
            width: '200%',
            fontFamily: 'Arial, sans-serif'
          }}
        >
          <div className="p-16 space-y-8">
            {renderDocumentContent()}
          </div>
        </div>
      </div>

      {/* Desktop: Versão normal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:block w-full max-w-[210mm] bg-white shadow-2xl p-8"
        style={{ minHeight: '297mm', fontFamily: 'Arial, sans-serif' }}
      >
        <div className="p-16 space-y-8">
          {renderDocumentContent()}
        </div>
      </motion.div>
    </div>
  );
};

export default Preview;