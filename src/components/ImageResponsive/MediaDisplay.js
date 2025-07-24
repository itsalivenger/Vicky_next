import React from 'react';
import styles from './MediaDisplay.module.css';
import LazyMedia from '../lazyMedia/LazyMedia';

const MediaDisplay = ({ type, src, alt = '', controls = true, autoplay = false }) => {
  return (
    <div className={styles.mediaContainer}>
      {type === 'video' ? (
        <LazyMedia type={'video'} src={src} alt={alt} className={styles.media} />
      ) : (
        <LazyMedia type="image" src={src} alt={alt} className={styles.media} width={500} height={300} unoptimized={true} />
      )}
    </div>
  );
};

export default MediaDisplay;