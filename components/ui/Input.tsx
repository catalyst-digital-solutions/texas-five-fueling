import React, { useState } from 'react';

type InputProps = {
  label?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  error?: string;
  success?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  loading?: boolean;
  value?: string;
};

export default function Input({
  label,
  name,
  type = 'text',
  placeholder,
  error,
  success,
  onChange,
  required = false,
  className = '',
  loading = false,
  value,
  ...props
}: InputProps & React.InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false);
  
  const baseStyles = 'w-full px-4 py-3 text-base border rounded-lg transition-all duration-200 ease-out min-h-[44px] motion-reduce:transition-none';
  const focusStyles = 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent';
  const stateStyles = error
    ? 'border-red-500 focus:ring-red-500'
    : success
    ? 'border-green-500 focus:ring-green-500'
    : 'border-gray-300';
  
  const containerStyles = 'flex-1 transition-all duration-200';
  
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
        </label>
      )}
      <div className={`relative ${containerStyles}`}>
        {loading && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-lg" role="status" aria-label="Loading">
            <span className="sr-only">Loading</span>
          </div>
        )}
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`${baseStyles} ${focusStyles} ${stateStyles} ${loading ? 'opacity-50' : ''}`}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          disabled={loading}
          {...props}
        />
        {success && !loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity duration-200 animate-in fade-in">
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

