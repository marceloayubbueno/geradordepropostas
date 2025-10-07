"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronUp, 
  User, 
  FileText, 
  Briefcase, 
  DollarSign, 
  MessageSquare,
  Building2
} from 'lucide-react';
import { DocumentData, documentFields, FieldConfig } from '@/types/document';
import FieldInput from './FieldInput';

interface SidebarProps {
  documentData: DocumentData;
  onFieldChange: (field: keyof DocumentData, value: any) => void;
}

const Sidebar = ({ documentData, onFieldChange }: SidebarProps) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [isEditorExpanded, setIsEditorExpanded] = useState(false);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const sections = [
    { 
      id: 'empresa', 
      title: '1º - Dados da Empresa', 
      icon: Building2,
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      id: 'corretor', 
      title: '2º - Dados do Corretor', 
      icon: User,
      color: 'from-purple-500 to-pink-500'
    },
    { 
      id: 'parceria', 
      title: '3º - Dados da Parceria', 
      icon: Briefcase,
      color: 'from-green-500 to-emerald-500'
    },
    { 
      id: 'proposta', 
      title: '4º - Dados da Proposta', 
      icon: FileText,
      color: 'from-orange-500 to-red-500'
    },
    { 
      id: 'valores', 
      title: '5º - Valores e Prazos', 
      icon: DollarSign,
      color: 'from-yellow-500 to-amber-500'
    },
    { 
      id: 'observacoes', 
      title: '6º - Observações', 
      icon: MessageSquare,
      color: 'from-red-500 to-rose-500'
    },
  ];

  const getFieldsByCategory = (category: string) => {
    return documentFields.filter(field => field.category === category);
  };

  return (
    <div className="space-y-4">
      {/* Título da Seção - Destaque verde com botão de recolher */}
      <button
        onClick={() => setIsEditorExpanded(!isEditorExpanded)}
        className="w-full p-4 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all shadow-md flex items-center justify-between"
      >
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wide text-left">
            ✏️ Editar Documento
          </h2>
          <p className="text-xs text-white/80 mt-1 text-left">
            Preencha os campos abaixo para gerar sua proposta
          </p>
        </div>
        <div className="text-white flex-shrink-0 ml-3">
          {isEditorExpanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </div>
      </button>

      {/* Cards de Edição com animação */}
      <AnimatePresence>
        {isEditorExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden space-y-4"
          >
            {sections.map((section, index) => {
        const IconComponent = section.icon;
        const isExpanded = expandedSections.includes(section.id);
        const fields = getFieldsByCategory(section.id);
        const editableFields = fields.filter(f => f.editable);
        const hasEditableFields = editableFields.length > 0;

        return (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-green-500/20 overflow-hidden"
          >
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-700/30 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 bg-gradient-to-br ${section.color} rounded-lg flex items-center justify-center`}>
                  <IconComponent className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-semibold text-white">{section.title}</h3>
                  {!hasEditableFields && (
                    <p className="text-xs text-gray-500">Campos fixos</p>
                  )}
                </div>
              </div>
              
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </motion.div>
            </button>

            {/* Section Content */}
            <motion.div
              initial={false}
              animate={{
                height: isExpanded ? 'auto' : 0,
                opacity: isExpanded ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="p-4 space-y-3 border-t border-gray-700/50">
                {fields.map((field) => (
                  <FieldInput
                    key={field.name}
                    field={field}
                    value={documentData[field.name]}
                    onChange={(value) => onFieldChange(field.name, value)}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        );
      })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sidebar;
