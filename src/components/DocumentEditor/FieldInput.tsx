"use client";

import { FieldConfig } from '@/types/document';
import { Lock } from 'lucide-react';

interface FieldInputProps {
  field: FieldConfig;
  value: any;
  onChange: (value: any) => void;
}

const FieldInput = ({ field, value, onChange }: FieldInputProps) => {
  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(num);
  };

  const parseCurrency = (str: string) => {
    const numbers = str.replace(/\D/g, '');
    return parseFloat(numbers) / 100 || 0;
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseCurrency(e.target.value);
    onChange(newValue);
  };

  const baseInputClasses = `
    w-full px-3 py-2 rounded-lg border transition-all
    ${field.editable 
      ? 'bg-gray-700 border-gray-600 text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none' 
      : 'bg-gray-800 border-gray-700 text-gray-400 cursor-not-allowed'
    }
  `;

  const renderInput = () => {
    if (!field.editable) {
      // Campo fixo (não editável)
      return (
        <div className="relative">
          <input
            type="text"
            value={value || ''}
            disabled
            className={baseInputClasses}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Lock className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      );
    }

    // Campos editáveis
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            rows={4}
            className={baseInputClasses + ' resize-none'}
          />
        );

      case 'currency':
        return (
          <input
            type="text"
            value={value ? formatCurrency(value) : ''}
            onChange={handleCurrencyChange}
            placeholder={field.placeholder || 'R$ 0,00'}
            required={field.required}
            className={baseInputClasses}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            placeholder={field.placeholder}
            required={field.required}
            className={baseInputClasses}
          />
        );

      case 'date':
        return (
          <input
            type="date"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
            className={baseInputClasses}
          />
        );

      case 'email':
        return (
          <input
            type="email"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            className={baseInputClasses}
          />
        );

      case 'tel':
        return (
          <input
            type="tel"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            className={baseInputClasses}
          />
        );

      case 'url':
        return (
          <input
            type="url"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder || 'https://exemplo.com'}
            required={field.required}
            className={baseInputClasses}
          />
        );

      default:
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            className={baseInputClasses}
          />
        );
    }
  };

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-300">
        {field.label}
        {field.required && <span className="text-red-400 ml-1">*</span>}
        {!field.editable && <span className="text-xs text-gray-500 ml-2">(Fixo)</span>}
      </label>
      {renderInput()}
    </div>
  );
};

export default FieldInput;
