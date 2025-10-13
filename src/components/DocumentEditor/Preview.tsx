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
  
  // Encontrar onde termina a seção 4
  let breakPoint = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/^5\.\s+/)) {
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
        <h3 key={index} className="font-bold text-gray-900 mt-4 mb-2 text-base">
          {line}
        </h3>
      );
    }
    
    // Bullet points
    if (line.startsWith('•')) {
      return (
        <div key={index} className="ml-4 mb-1 flex items-start">
          <span className="text-black font-bold mr-2 text-sm">•</span>
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
    <div className="h-full p-4 lg:p-8 overflow-y-auto bg-gray-100">
      <div className="max-w-[420mm] mx-auto flex gap-6">
        
        {/* PÁGINA 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl flex-shrink-0"
          style={{ 
            width: '210mm',
            height: '297mm',
            fontFamily: '"Times New Roman", Times, serif',
            overflow: 'hidden'
          }}
        >
          <div className="h-full flex flex-col" style={{ padding: '10mm 30mm 30mm 30mm' }}>
            
            {/* Header */}
            <div className="border-b-2 border-gray-300 pb-3 mb-4 text-center">
              <h1 className="text-lg font-bold text-gray-900 mb-1">
                PROPOSTA COMERCIAL
              </h1>
              <p className="text-xs text-gray-600">
                Proposta Nº {documentData.numeroProposta || 'PRCP-2024-0047'} - {formatDate(documentData.dataProposta) || '06 de dezembro de 2024'}
              </p>
            </div>

            {/* Título */}
            <div className="bg-green-600 text-white p-3 mb-4 text-center">
              <h2 className="text-sm font-bold">
                {documentData.tituloParceria || 'Proposta de Parceria – SINDIPOL'}
              </h2>
            </div>

            {/* Conteúdo Página 1 */}
            <div className="flex-1 space-y-3 text-sm">
              {page1Lines.map((line, index) => renderLine(line, index))}
            </div>

          </div>
        </motion.div>

        {/* PÁGINA 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white shadow-xl flex-shrink-0"
          style={{ 
            width: '210mm',
            height: '297mm',
            fontFamily: '"Times New Roman", Times, serif',
            overflow: 'hidden'
          }}
        >
          <div className="h-full flex flex-col" style={{ padding: '10mm 30mm 30mm 30mm' }}>
            
            {/* Conteúdo Página 2 */}
            <div className="flex-1 space-y-3 text-sm">
              {page2Lines.map((line, index) => renderLine(line, index))}
            </div>

            {/* Footer Página 2 */}
            <div className="mt-auto pt-3 border-t-2 border-gray-300">
              <div className="text-center text-xs text-gray-600 space-y-1">
                <p>Proposta válida por: {documentData.validadeProposta || '30 dias'}</p>
                <p>Data: {formatDate(documentData.dataProposta)}</p>
                <p>Proposta Nº {documentData.numeroProposta || 'PRCP-2024-0047'}</p>
              </div>
              <div className="text-center text-xs text-gray-400 mt-2">
                Página 2 de 2
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Preview;