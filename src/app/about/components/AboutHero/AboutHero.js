import LazyMedia from '../../../../components/lazyMedia/LazyMedia';
import styles from './AboutHero.module.css';

export default function AboutHero() {
  return (
    <div className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>A Propos de </h1>
          <LazyMedia type="image" src="/images/logos/HeatzLogo.png" alt="Heatz Logo" className={styles.logo} />
        </div>
        <p>
          Alimentez votre style de vie numérique avec des accessoires électroniques haut de gamme. 
          Chez <strong>Heatz</strong>, nous croyons en l'excellence à travers l'innovation et la qualité.
        </p>
      </div>
    </div>
  );
}