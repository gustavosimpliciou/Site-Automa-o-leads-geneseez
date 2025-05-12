import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { submitFormData } from '../services/api';
import FormSuccess from './FormSuccess';

const FormPage: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp é obrigatório';
    } else if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(formData.whatsapp)) {
      newErrors.whatsapp = 'Formato: (99) 99999-9999';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'whatsapp') {
      const numbers = value.replace(/\D/g, '');
      
      if (numbers.length <= 11) {
        let formatted = numbers;
        
        if (numbers.length > 2) {
          formatted = `(${numbers.substring(0, 2)}) ${numbers.substring(2)}`;
        }
        if (numbers.length > 7) {
          formatted = `(${numbers.substring(0, 2)}) ${numbers.substring(2, 7)}-${numbers.substring(7)}`;
        }
        
        setFormData({ ...formData, [name]: formatted });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        await submitFormData(formData);
        setIsSuccess(true);
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl shadow-xl">
        {isSuccess ? (
          <FormSuccess />
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-2 text-center">
              Ganhe Seu <span className="neon-text-blue">Site Grátis!</span>
            </h1>
            <p className="text-gray-300 text-center mb-8">
              Preencha seus dados para receber esta oferta exclusiva.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-300 mb-1">
                  Nome Completo*
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className={`form-input w-full ${errors.nome ? 'border-red-500' : ''}`}
                  placeholder="Seu nome completo"
                />
                {errors.nome && <p className="mt-1 text-sm text-red-500">{errors.nome}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  E-mail*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input w-full ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="seu@email.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>
              
              <div>
                <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-300 mb-1">
                  WhatsApp (com DDD)*
                </label>
                <input
                  type="text"
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className={`form-input w-full ${errors.whatsapp ? 'border-red-500' : ''}`}
                  placeholder="(99) 99999-9999"
                />
                {errors.whatsapp && <p className="mt-1 text-sm text-red-500">{errors.whatsapp}</p>}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center ${
                  isSubmitting 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-[#0cf] to-[#0cfa83] hover:shadow-lg hover:shadow-[#0cf]/20 transition-all duration-300'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={20} className="mr-2" />
                    ADQUIRIR AGORA
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default FormPage;