import { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';
import styles from './AboutStats.module.css';

export default function AboutStats() {
  const stats = [
    { id: 1, name: 'Produits Vendus', value: 20000 },
    { id: 2, name: 'Clients Satisfaits', value: 3000 },
    { id: 3, name: 'Pays Des servis', value: 250 },
    { id: 4, name: 'Catégories de Produits', value: 20 },
  ];
  const duration = 5;

  const [startCounting, setStartCounting] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCounting(true);
          observer.disconnect(); // Stop observing once triggered
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the component is visible
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={statsRef} className={styles.stats}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {stats.map((stat) => (
            <div key={stat.id} className={styles.stat}>
              <dt className={styles.label}>{stat.name}</dt>
              <dd className={styles.value}>
                {startCounting ? (
                  <CountUp end={stat.value} duration={duration} />
                ) : (
                  0
                )}
                {stat.id === 1 || stat.id === 2 ? '+' : '+'}
              </dd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}