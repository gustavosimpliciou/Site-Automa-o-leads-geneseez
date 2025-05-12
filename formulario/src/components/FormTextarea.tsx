import React from 'react';

interface FormTextareaProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}

const FormTextarea: React.FC<FormTextareaProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder = '',
  required = false,
  rows = 4
}) => {
  return (
    <div className="mb-6">
      <label 
        htmlFor={id} 
        className="block text-gray-800 font-medium mb-2"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 
          focus:outline-none focus:ring-2 focus:ring-[#FF7300] focus:border-transparent
          transition-all duration-300"
      />
    </div>
  );
};

export default FormTextarea;