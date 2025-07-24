import React from 'react';

export function Button({ className = '', handleClick, children }) {
  
  return (
    <button
      className={`${className}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}