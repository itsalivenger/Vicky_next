import React from 'react';
import { Card } from '../ui/Card/Card';
import { Icon } from '../ui/Icon/Icon';
import styles from './EmptyState.module.css';

export function EmptyState() {
  return (
    <Card className={styles.container}>
      <Icon name="favorite_border" className={styles.icon} />
      <h2 className={styles.title}>Aucun favori</h2>
      <p className={styles.description}>
        Explorez notre catalogue et ajoutez des articles à vos favoris pour les retrouver facilement plus tard.
      </p>
    </Card>
  );
}