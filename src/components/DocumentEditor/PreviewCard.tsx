"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ChevronDown, ChevronUp } from 'lucide-react';
import { DocumentData } from '@/types/document';
import Preview from './Preview';

interface PreviewCardProps {
  documentData: DocumentData;
  selectedTemplateId?: string;
}

const PreviewCard = ({ documentData, selectedTemplateId }: PreviewCardProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div>
      {/* Header com botão de expandir/recolher */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 mb-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all shadow-md"
      >
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-white" />
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wide text-left">
              Visualizar Proposta
            </h3>
            <p className="text-xs text-white/80 mt-1 text-left">
              Veja como ficará o documento
            </p>
          </div>
        </div>
        <div className="text-white flex-shrink-0 ml-3">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </div>
      </button>
      
      {/* Preview com animação */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-gray-800 rounded-lg p-2">
              <Preview documentData={documentData} selectedTemplateId={selectedTemplateId} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PreviewCard;
