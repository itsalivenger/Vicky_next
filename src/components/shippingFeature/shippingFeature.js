import React from 'react';
import styles from './shippingFeature.module.css';
import LazyMedia from '../lazyMedia/LazyMedia';

function ShippingFeatures() {
    const features = [
        {
            icon: <LazyMedia type={'image'} src='/images/icons/truck.svg' className={styles.icon} alt='truck' />,
            title: 'Livraison Gratuite',
            description: 'Bénéficiez de la livraison gratuite pour toute commande supérieure à 50 DH.'
        },
        {
            icon: <LazyMedia type={'image'} src='/images/icons/package.svg' className={styles.icon} alt='package' />,
            title: 'Retours Gratuits',
            description: 'Retournez vos produits gratuitement dans les 30 jours suivant votre achat.'
        },
        {
            icon: <LazyMedia type={'image'} src='/images/icons/clock.svg' className={styles.icon} alt='clock' />,
            title: 'Livraison Express',
            description: 'Recevez votre commande en 24 à 48 heures, selon votre localisation.'
        },        
        {
            icon: <LazyMedia type={'image'} src='/images/icons/pod.svg' className={styles.icon} alt='shield' />,
            title: 'Paiement Sécurisé',
            description: 'Optez pour un paiement sécurisé par Cash on Delivery lors de la réception de votre commande.'
        }

    ];

    return (
        <div className={styles.container}>
            {features.map((feature, index) => (
                <div key={index} className={styles.feature}>
                    {feature.icon}
                    <h3 className={styles.title}>{feature.title}</h3>
                    <p className={styles.description}>{feature.description}</p>
                </div>
            ))}
        </div>
    );
}

export default ShippingFeatures;