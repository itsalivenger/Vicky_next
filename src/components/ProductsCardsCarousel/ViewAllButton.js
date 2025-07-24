import React from 'react';
import styles from './viewAllButton.module.css';

const ViewAllButton = ({ text, onClick }) => {
  return (
    <button className={styles.viewAllButton} onClick={onClick}>
      <span className={styles.text}>{text}</span>
      <span className={styles.arrow}>&rarr;</span>
    </button>
  );
};

export default ViewAllButton;