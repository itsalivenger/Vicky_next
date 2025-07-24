import React from 'react';
import { Card } from '../../../components/newsletterUi/Card/Card';
import { Button } from '../../../components/newsletterUi/Button/Button';
import { Icon } from '../../../components/newsletterUi/Icon/Icon';
import styles from './ProfileCard.module.css';
import LazyMedia from '../../../components/lazyMedia/LazyMedia';

export function ProfileCard({ user, handleLogout }) {
  return (
    <Card className={styles.container}>
      <LazyMedia type={'image'} src={'/images/icons/user.png'} alt={user.name} className={styles.avatar} />
      <h2 className={styles.name}>{user.fullName}</h2>
      <p className={styles.email}>{user.email}</p>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <div className={styles.statValue}>{user.cart.length}</div>
          <div className={styles.statLabel}>Panier</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>{user.favorite.length}</div>
          <div className={styles.statLabel}>Liste de souhaits</div>
        </div>
      </div>

      <div className={styles.buttonsContainer}>
        <Button handleClick={handleLogout} className={styles.logoutBtn} style={{ backgroundColor: 'var(--color-gray)', color: 'white' }}>
          <Icon name="logout" className="mr-2" />
          Déconnexion
        </Button>
      </div>
    </Card>
  );
}