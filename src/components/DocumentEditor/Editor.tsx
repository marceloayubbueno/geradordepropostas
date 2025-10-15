"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, EyeOff, Menu, X } from 'lucide-react';
import Sidebar from './Sidebar';
import Preview from './Preview';
import PreviewCard from './PreviewCard';
import { DocumentData } from '@/types/document';

const DocumentEditor = () => {
  const [showPreview, setShowPreview] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  // Estado do documento com valores padrão
  const [documentData, setDocumentData] = useState<DocumentData>({
    // Corretor (vazios para edição)
    nomeCorretor: '',
    telefoneCorretor: '',
    emailCorretor: '',
    instagramCorretor: '',
    
    // Parceria
    nomeResponsavel: '',
    cargoResponsavel: '',
    tituloParceria: 'SINDIPOL',
    
    // Proposta
    numeroProposta: `PROP-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`,
    dataProposta: new Date().toISOString().split('T')[0],
    validadeProposta: '30 dias',
    
    // Percentual de Comissionamento
    percentualComissionamento: 10,
    
    // Observações
    observacoes: '',
  });

  const handleFieldChange = (field: keyof DocumentData, value: any) => {
    setDocumentData(prev => ({
      ...prev,
      [field]: value
    }));
  };


  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    try {
      // Gerar novo número da proposta
      const novoNumero = `PROP-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`;
      const dataComNovoNumero = {
        ...documentData,
        numeroProposta: novoNumero
      };
      
      setDocumentData(prev => ({
        ...prev,
        numeroProposta: novoNumero
      }));
      
      // Gerar PDF usando a nova API
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataComNovoNumero),
      });

      if (!response.ok) {
        throw new Error('Erro ao gerar PDF');
      }

      // Criar blob do PDF
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      // Criar link de download
      const link = document.createElement('a');
      link.href = url;
      link.download = `Proposta_${novoNumero}_${new Date().getTime()}.pdf`;
      
      // Simular clique para download
      document.body.appendChild(link);
      link.click();
      
      // Limpar
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      console.log('PDF gerado com sucesso!');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar PDF. Por favor, tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-sm border-b border-[#8C6B75]/20 sticky top-0 z-50">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Title */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="lg:hidden p-2 text-[#79C6CC] hover:bg-[#79C6CC]/10 rounded-lg transition-colors"
              >
                {showSidebar ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#8C6B75] to-[#79C6CC] rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Gerador de Propostas</h1>
                  <p className="text-xs text-gray-400">Crie propostas profissionais em PDF</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2 lg:space-x-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span className="text-sm">{showPreview ? 'Ocultar' : 'Mostrar'} Preview</span>
              </button>
              
              <motion.button
                onClick={handleGeneratePDF}
                disabled={isGenerating}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#8C6B75] to-[#79C6CC] hover:from-[#8C6B75]/80 hover:to-[#79C6CC]/80 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-[#8C6B75]/25"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">{isGenerating ? 'Gerando...' : 'Gerar PDF'}</span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Desktop: Sidebar */}
        <aside className="hidden lg:block lg:w-96 bg-gray-900 border-r border-[#8C6B75]/20 overflow-y-auto">
          <div className="p-6">
            {/* Template Gallery */}
            {/* Editor de Documento */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-[#79C6CC]" />
                Editor de Documento
              </h3>
              <p className="text-gray-300 text-sm">
                Preencha os campos abaixo para personalizar sua proposta de parceria.
              </p>
            </div>

            {/* Sidebar Fields */}
            <Sidebar 
              documentData={documentData} 
              onFieldChange={handleFieldChange}
            />
          </div>
        </aside>

        {/* Mobile: Layout Vertical */}
        <div className="lg:hidden flex-1 overflow-y-auto bg-gray-900">
          <div className="p-4 space-y-4">
            {/* Template Gallery */}
            {/* Editor de Documento */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-[#79C6CC]" />
                Editor de Documento
              </h3>
              <p className="text-gray-300 text-sm">
                Preencha os campos abaixo para personalizar sua proposta de parceria.
              </p>
            </div>

            {/* Sidebar Fields */}
            <Sidebar 
              documentData={documentData} 
              onFieldChange={handleFieldChange}
            />

            {/* Preview Card Recolhível - APENAS MOBILE */}
            <PreviewCard 
              documentData={documentData} 
            />
          </div>
        </div>

        {/* Desktop: Preview Area */}
        <main className="hidden lg:block flex-1 bg-gray-100 overflow-y-auto">
          <Preview documentData={documentData} />
        </main>
      </div>
    </div>
  );
};

export default DocumentEditor;
