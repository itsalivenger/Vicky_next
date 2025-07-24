import React from 'react';
import styles from './imageBesidesText.module.css';
import LazyMedia from '../lazyMedia/LazyMedia';

const ProductFeature = ({ imageSrc, title, subtitle, description, reverse }) => {
  return (
    <div className={`${styles.featureContainer} ${reverse ? styles.reverse : ''}`}>
      <div className={styles.imageContainer}>
        <LazyMedia type="image" src={imageSrc} alt={title} className={styles.image} width={500} height={300} unoptimized={true} />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{title}</h1>
        <h2 className={styles.subtitle}>{subtitle}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default ProductFeature;