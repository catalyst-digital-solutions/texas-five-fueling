import React, { useState, useRef, useEffect } from 'react';

type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type SelectProps = {
  label?: string;
  name?: string;
  options: SelectOption[];
  error?: string;
  success?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  className?: string;
  placeholder?: string;
  loading?: boolean;
  value?: string;
};

export default function Select({
  label,
  name,
  options,
  error,
  success,
  onChange,
  required = false,
  className = '',
  placeholder = 'Select an option...',
  loading = false,
  value,
  ...props
}: SelectProps & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const [focused, setFocused] = useState(false);
  
  const baseStyles = 'w-full px-4 py-3 text-base border rounded-lg transition-all duration-200 ease-out min-h-[44px] motion-reduce:transition-none appearance-none bg-white';
  const focusStyles = 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent';
  const stateStyles = error
    ? 'border-red-500 focus:ring-red-500'
    : success
    ? 'border-green-500 focus:ring-green-500'
    : 'border-gray-300';
  
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
        </label>
      )}
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-lg" role="status" aria-label="Loading">
            <span className="sr-only">Loading</span>
          </div>
        )}
        <select
          name={name}
          id={name}
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
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        {!loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        )}
        {success && !loading && (
          <div className="absolute right-8 top-1/2 -translate-y-1/2 transition-opacity duration-200 animate-in fade-in">
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

