import React, { useState } from 'react';
import QuestionCard from '../QuestionCard';
import FormInput from '../FormInput';
import NavigationButton from '../NavigationButton';
import { FormData } from '../../types/form';
import { validateEmail, validatePhone } from '../../utils/validation';

interface PersonalInfoStepProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: string) => void;
  onNext: () => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  formData,
  updateFormData,
  onNext
}) => {
  const [errors, setErrors] = useState({
    fullName: '',
    whatsapp: '',
    email: ''
  });

  const validateForm = () => {
    const newErrors = {
      fullName: !formData.fullName ? 'Por favor, informe seu nome completo' : '',
      whatsapp: !validatePhone(formData.whatsapp) ? 'Por favor, informe um número de WhatsApp válido com DDD' : '',
      email: !validateEmail(formData.email) ? 'Por favor, informe um e-mail válido' : ''
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <QuestionCard>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Informações Pessoais
      </h1>
      <p className="text-gray-600 mb-8">
        Vamos começar com algumas informações básicas para conhecê-lo melhor.
      </p>

      <FormInput
        id="fullName"
        label="Qual seu nome completo?"
        type="text"
        value={formData.fullName}
        onChange={(value) => updateFormData('fullName', value)}
        placeholder="Seu nome completo"
        required
        error={errors.fullName}
      />

      <FormInput
        id="whatsapp"
        label="Qual seu número de WhatsApp com DDD?"
        type="tel"
        value={formData.whatsapp}
        onChange={(value) => updateFormData('whatsapp', value)}
        placeholder="(00) 00000-0000"
        required
        error={errors.whatsapp}
      />

      <FormInput
        id="email"
        label="Qual seu e-mail principal?"
        type="email"
        value={formData.email}
        onChange={(value) => updateFormData('email', value)}
        placeholder="seu@email.com"
        required
        error={errors.email}
      />

      <div className="flex justify-end mt-8">
        <NavigationButton 
          type="next" 
          onClick={handleNext}
        >
          Próximo
        </NavigationButton>
      </div>
    </QuestionCard>
  );
};

export default PersonalInfoStep;