
import React from 'react';

interface InputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  type?: 'number' | 'text';
  placeholder?: string;
  prefix?: string;
  suffix?: string;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  value, 
  onChange, 
  type = 'number', 
  placeholder,
  prefix,
  suffix 
}) => {
  return (
    <div className="flex flex-col gap-1.5 mb-4">
      <label className="text-sm font-semibold text-pink-700">{label}</label>
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3 text-pink-400 font-medium">{prefix}</span>
        )}
        <input
          type={type}
          value={value === 0 ? '' : value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          placeholder={placeholder}
          className={`w-full p-2.5 rounded-xl border border-pink-200 bg-white focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all text-pink-900 ${
            prefix ? 'pl-10' : 'pl-4'
          } ${suffix ? 'pr-10' : 'pr-4'}`}
        />
        {suffix && (
          <span className="absolute right-3 text-pink-400 font-medium">{suffix}</span>
        )}
      </div>
    </div>
  );
};

export default Input;
