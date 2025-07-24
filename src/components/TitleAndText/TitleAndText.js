import React from 'react';
import styles from './TitleAndText.module.css';

const TitleAndText = ({ title, text }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {title}
      </h1>
      <p className={styles.description}>
        {text}
      </p>
    </div>
  );
};

export default TitleAndText;