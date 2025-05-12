import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import PersonalInfoStep from './steps/PersonalInfoStep';
import ProjectInfoStep from './steps/ProjectInfoStep';
import AutomationEducationStep from './steps/AutomationEducationStep';
import SuccessScreen from './SuccessScreen';
import { FormData } from '../types/form';

const initialFormData: FormData = {
  fullName: '',
  whatsapp: '',
  email: '',
  companyName: '',
  businessType: '',
  siteObjective: '',
  targetRegion: '',
  colorPreferences: '',
  productsServices: '',
  siteDifferential: '',
  socialMedia: '',
  domain: '',
  wantsAutomation: null,
  confirmNoAutomation: null
};

const FormContainer: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const totalSteps = 3; // Personal info, project info, automation education

  const updateFormData = (field: keyof FormData, value: string | boolean | null) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleNext = () => {
    setCurrentStep(prevStep => Math.min(prevStep + 1, totalSteps));
  };

  const handleBack = () => {
    setCurrentStep(prevStep => Math.max(prevStep - 1, 0));
  };

  const handleSubmit = async () => {
    try {
      // In a real implementation, you would send the data to an API endpoint
      console.log('Form submitted with data:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFormSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const renderStep = () => {
    if (formSubmitted) {
      return <SuccessScreen wantsAutomation={formData.wantsAutomation === true} />;
    }

    switch (currentStep) {
      case 0:
        return (
          <PersonalInfoStep 
            formData={formData} 
            updateFormData={updateFormData} 
            onNext={handleNext} 
          />
        );
      case 1:
        return (
          <ProjectInfoStep 
            formData={formData} 
            updateFormData={updateFormData} 
            onNext={handleNext} 
            onBack={handleBack} 
          />
        );
      case 2:
        return (
          <AutomationEducationStep 
            formData={formData} 
            updateFormData={updateFormData} 
            onBack={handleBack} 
            onSubmit={handleSubmit} 
          />
        );
      default:
        return null;
    }
  };

  const calculateProgress = () => {
    // Basic calculation - can be more complex if steps have different weights
    return ((currentStep + 1) / (totalSteps + 1)) * 100;
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500">
      {!formSubmitted && (
        <ProgressBar progress={calculateProgress()} />
      )}
      <div className="p-6 md:p-8">
        {renderStep()}
      </div>
    </div>
  );
};

export default FormContainer;