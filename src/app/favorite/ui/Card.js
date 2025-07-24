import React from 'react';

export function Card({ children, className = '' }) {
  return (
    <div className={`bg-[rgba(255,255,255,0.1)] rounded-lg shadow-sm border border-[rgba(255,255,255,0.1)] ${className}`}>
      {children}
    </div>
  );
}