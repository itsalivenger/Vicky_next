import React from 'react';
import styles from './Button.module.css';

export function Button({ children, className = '', ...props }) {
  return (
    <button className={`${styles.button} ${className}`} {...props}>
      {children}
    </button>
  );
}