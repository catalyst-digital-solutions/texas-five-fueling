import React, { useState, useRef, useEffect } from 'react';

type TextareaProps = {
  label?: string;
  name?: string;
  placeholder?: string;
  error?: string;
  success?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  className?: string;
  maxLength?: number;
  value?: string;
};

export default function Textarea({
  label,
  name,
  placeholder,
  error,
  success,
  onChange,
  required = false,
  className = '',
  maxLength,
  value,
  ...props
}: TextareaProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [focused, setFocused] = useState(false);
  const [currentLength, setCurrentLength] = useState(value?.length || 0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const baseStyles = 'w-full px-4 py-3 text-base border rounded-lg transition-all duration-200 ease-out min-h-[88px] resize-y motion-reduce:transition-none';
  const focusStyles = 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent';
  const stateStyles = error
    ? 'border-red-500 focus:ring-red-500'
    : success
    ? 'border-green-500 focus:ring-green-500'
    : 'border-gray-300';
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentLength(e.target.value.length);
    if (onChange) {
      onChange(e);
    }
  };
  
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);
  
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <div className="flex justify-between items-center">
          <label htmlFor={name} className="text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
          </label>
          {maxLength && (
            <span className={`text-xs transition-colors duration-200 ${
              currentLength >= maxLength ? 'text-red-600' : 'text-gray-500'
            }`}>
              {currentLength} / {maxLength}
            </span>
          )}
        </div>
      )}
      <div className="relative">
        <textarea
          ref={textareaRef}
          name={name}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          maxLength={maxLength}
          className={`${baseStyles} ${focusStyles} ${stateStyles}`}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          {...props}
        />
        {success && (
          <div className="absolute right-3 top-3 transition-opacity duration-200 animate-in fade-in">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
      {error && (
        <div 
          id={`${name}-error`} 
          className="text-red-600 text-sm transition-opacity duration-200 opacity-100 animate-in fade-in" 
          role="alert"
          aria-live="polite"
        >
          {error}
        </div>
      )}
    </div>
  );
}

