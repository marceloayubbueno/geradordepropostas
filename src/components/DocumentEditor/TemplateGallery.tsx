"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { proposalTemplates, ProposalTemplate } from '@/types/templates';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

interface TemplateGalleryProps {
  onSelectTemplate: (template: ProposalTemplate) => void;
  selectedTemplateId?: string;
}

const TemplateGallery = ({ onSelectTemplate, selectedTemplateId }: TemplateGalleryProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-6">
      {/* Header com botão de expandir/recolher */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 mb-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all shadow-md"
      >
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wide">
            📋 Modelos de Propostas
          </h3>
          <p className="text-xs text-white/80 mt-1">
            Selecione o modelo para usar
          </p>
        </div>
        <div className="text-white flex-shrink-0 ml-3">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </div>
      </button>
      
      {/* Cards Verticais - Um embaixo do outro com animação */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-2">
              {proposalTemplates.map((template, index) => (
                <motion.button
                  key={template.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onSelectTemplate(template)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`
                    w-full p-3 rounded-lg border transition-all text-left
                    ${selectedTemplateId === template.id
                      ? 'border-green-500 bg-green-900/20'
                      : 'border-gray-700 bg-gray-800 hover:border-green-500/50'
                    }
                  `}
                >
                  {/* Header com Ícone e Check */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{template.icon}</span>
                      <h4 className="text-sm font-bold text-white">
                        {template.name}
                      </h4>
                    </div>
                    {selectedTemplateId === template.id && (
                      <div className="bg-green-500 rounded-full p-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Barra de Cor */}
                  <div className={`h-0.5 w-full bg-gradient-to-r ${template.color} rounded mb-2`} />

                  {/* Descrição */}
                  <p className="text-xs text-gray-400 line-clamp-2">
                    {template.description}
                  </p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TemplateGallery;
