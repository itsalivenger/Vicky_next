"use client";
import React from 'react';
import { Card } from '../ui/Card/Card';
import { Button } from '../../favorite/ui/Button/Button';
import { Icon } from '../../favorite/ui/Icon/Icon';
import styles from './ProfileCard.module.css';
import LazyMedia from '../../../components/lazyMedia/LazyMedia';

export function ProfileCard({ user, handleLogout }) {
    if (!user) {
        return <div>Loading...</div>; // Or some other placeholder
    }

    return (
        <Card className={styles.container}>
            <LazyMedia type="image" src={'/images/icons/user.png'} alt={user.name} className={styles.avatar} />
            <h2 className={styles.name}>{user.fullName}</h2>
            <p className={styles.email}>{user.email}</p>

            <div className={styles.stats}>
                <div className={styles.stat}>
                    <div className={styles.statValue}>{user.cart ? user.cart.length : 0}</div>
                    <div className={styles.statLabel}>Panier</div>
                </div>
                <div className={styles.stat}>
                    <div className={styles.statValue}>{user.favorite ? user.favorite.length : 0}</div>
                    <div className={styles.statLabel}>Liste de souhaits</div>
                </div>
            </div>

            <div className={styles.buttonsContainer}>
                <Button onClick={handleLogout} className={styles.logoutBtn} style={{ backgroundColor: 'var(--color-gray)', color: 'white' }}>
                    <Icon name="logout" className="mr-2" />
                    Déconnexion
                </Button>
            </div>
        </Card>
    );
}