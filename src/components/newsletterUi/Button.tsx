import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center px-4 py-2 bg-[rgb(0,228,137)] text-black rounded-md 
        hover:bg-[rgba(0,228,137,0.9)] focus:outline-none focus:ring-2 focus:ring-offset-2 
        focus:ring-[rgb(0,228,137)] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}