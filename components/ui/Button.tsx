import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  className?: string;
  onClick?: () => void;
};

export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
  onClick,
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const baseStyles = 'font-medium rounded transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 transform active:scale-95 motion-reduce:transition-none motion-reduce:transform-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 hover:shadow-md focus:ring-gray-500',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:shadow-md focus:ring-blue-500 bg-transparent',
  };
  
  const sizeStyles = {
    sm: 'py-2 px-4 text-sm min-h-[44px] min-w-[44px]',
    md: 'py-3 px-5 text-base min-h-[44px]',
    lg: 'py-4 px-6 text-lg min-h-[48px]',
  };
  
  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${loading ? 'opacity-70 cursor-wait' : ''} ${className}`}
      onClick={onClick}
      disabled={loading || props.disabled}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
          Loading...
        </span>
      ) : children}
    </button>
  );
}

