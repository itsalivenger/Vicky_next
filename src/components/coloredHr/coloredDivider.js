import React from 'react';
import styles from './coloredDivider.module.css';

function ColoredDivider() {
    return (
        <div className={styles.divider}>
            <div className={styles.greenSection}></div>
            <div className={styles.graySection}></div>
        </div>
    );
}

export default ColoredDivider;