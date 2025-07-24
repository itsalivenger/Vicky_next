import LazyMedia from '../../../../components/lazyMedia/LazyMedia';
import styles from './AboutInnovation.module.css';
import { FaLightbulb, FaWifi } from 'react-icons/fa';

const innovations = [
  {
    title: "Charge Nouvelle Génération",
    description: "Recherche sur les technologies de charge révolutionnaires qui définiront l'avenir de la distribution d'énergie.",
    icon: "lightbulb",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  },
  {
    title: "Connectivité Intelligente",
    description: "Développement d'accessoires intelligents qui s'intègrent parfaitement à votre écosystème numérique.",
    icon: "wifi",
    image: "https://images.unsplash.com/photo-1526666923127-b2970f64b422?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  }
];

export default function AboutInnovation() {
  return (
    <div className={styles.innovation}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.subtitle}>Laboratoire d'Innovation</h2>
          <p className={styles.title}>Façonner l'Avenir de l'Électronique</p>
          <p className={styles.description}>
            Notre laboratoire d'innovation est le berceau des solutions électroniques de demain. 
            Nous repoussons constamment les limites du possible.
          </p>
        </div>

        <div className={styles.grid}>
          {innovations.map((item) => (
            <div key={item.title} className={styles.card}>
              <div className={styles.imageContainer}>
                <LazyMedia type="image" src={item.image} alt={item.title} className={styles.image} />
                <div className={styles.gradient} />
                <div className={styles.content}>
                  <div className={styles.iconTitle}>
                    {item.icon === "lightbulb" && <FaLightbulb size={24} color="white" />}
                    {item.icon === "wifi" && <FaWifi size={24} color="white" />}
                    <h3>{item.title}</h3>
                  </div>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
