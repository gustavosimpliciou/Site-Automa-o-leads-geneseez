import React from 'react';

interface FormInputProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder = '',
  required = false,
  error
}) => {
  return (
    <div className="mb-6">
      <label 
        htmlFor={id} 
        className="block text-gray-800 font-medium mb-2"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-3 rounded-lg border ${error ? 'border-red-500' : 'border-gray-300'} 
          focus:outline-none focus:ring-2 focus:ring-[#FF7300] focus:border-transparent
          transition-all duration-300`}
      />
      {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default FormInput;