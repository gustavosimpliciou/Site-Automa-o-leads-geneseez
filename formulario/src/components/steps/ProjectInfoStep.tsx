import React, { useState } from 'react';
import QuestionCard from '../QuestionCard';
import FormInput from '../FormInput';
import FormTextarea from '../FormTextarea';
import NavigationButton from '../NavigationButton';
import { FormData } from '../../types/form';

interface ProjectInfoStepProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const ProjectInfoStep: React.FC<ProjectInfoStepProps> = ({
  formData,
  updateFormData,
  onNext,
  onBack
}) => {
  const [errors, setErrors] = useState({
    companyName: '',
    businessType: '',
    siteObjective: ''
  });

  const validateForm = () => {
    const newErrors = {
      companyName: !formData.companyName ? 'Por favor, informe o nome da sua empresa ou marca' : '',
      businessType: !formData.businessType ? 'Por favor, informe o tipo de negócio' : '',
      siteObjective: !formData.siteObjective ? 'Por favor, informe o objetivo principal do seu site' : ''
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
        Informações sobre o Projeto
      </h1>
      <p className="text-gray-600 mb-8">
        Agora, conte-nos mais sobre o seu projeto para que possamos entender melhor suas necessidades.
      </p>

      <FormInput
        id="companyName"
        label="Qual o nome da sua empresa ou marca?"
        type="text"
        value={formData.companyName}
        onChange={(value) => updateFormData('companyName', value)}
        placeholder="Nome da empresa ou marca"
        required
        error={errors.companyName}
      />

      <FormInput
        id="businessType"
        label="Qual o tipo de negócio?"
        type="text"
        value={formData.businessType}
        onChange={(value) => updateFormData('businessType', value)}
        placeholder="Ex: salão, loja, consultoria, restaurante"
        required
        error={errors.businessType}
      />

      <FormInput
        id="siteObjective"
        label="Qual o objetivo principal do seu site?"
        type="text"
        value={formData.siteObjective}
        onChange={(value) => updateFormData('siteObjective', value)}
        placeholder="Ex: atrair clientes, agendar, vender online..."
        required
        error={errors.siteObjective}
      />

      <FormInput
        id="targetRegion"
        label="Seu público-alvo é de qual cidade ou região?"
        type="text"
        value={formData.targetRegion}
        onChange={(value) => updateFormData('targetRegion', value)}
        placeholder="Cidade ou região"
      />

      <FormInput
        id="colorPreferences"
        label="Tem preferência de cores ou estilo visual?"
        type="text"
        value={formData.colorPreferences}
        onChange={(value) => updateFormData('colorPreferences', value)}
        placeholder="Suas preferências de cores ou estilo"
      />

      <FormTextarea
        id="productsServices"
        label="Deseja exibir produtos ou serviços? Descreva brevemente."
        value={formData.productsServices}
        onChange={(value) => updateFormData('productsServices', value)}
        placeholder="Descrição dos produtos ou serviços"
        rows={3}
      />

      <FormInput
        id="siteDifferential"
        label="Seu site terá algum diferencial?"
        type="text"
        value={formData.siteDifferential}
        onChange={(value) => updateFormData('siteDifferential', value)}
        placeholder="Ex: botão do WhatsApp, depoimentos, localização"
      />

      <FormInput
        id="socialMedia"
        label="Quais redes sociais você deseja integrar ao site?"
        type="text"
        value={formData.socialMedia}
        onChange={(value) => updateFormData('socialMedia', value)}
        placeholder="Instagram, Facebook, LinkedIn, etc."
      />

      <FormInput
        id="domain"
        label="Já possui domínio? Se sim, informe."
        type="text"
        value={formData.domain}
        onChange={(value) => updateFormData('domain', value)}
        placeholder="Ex: seusite.com"
      />

      <div className="flex justify-between mt-8">
        <NavigationButton 
          type="back" 
          onClick={onBack}
        >
          Voltar
        </NavigationButton>
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

export default ProjectInfoStep;