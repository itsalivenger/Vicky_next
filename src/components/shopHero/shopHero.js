import styles from './shopHero.module.css';

const getCategoryData = (category) => {
  const categories = {
    ['Écouteurs']: {
      title: "Écouteurs",
      image: "https://res.cloudinary.com/dkhvdihhj/image/upload/v1739029022/earphones_wma8jr.jpg",
      description: 'Un Son Immersif à Prix Imbattables – Prenez vos Casques Maintenant !'
    },
    ['Chargeurs']: {
      title: "Adapters",
      image: "https://res.cloudinary.com/dkhvdihhj/image/upload/v1739028060/adapters_evdspa.jpg",
      description: 'Chargez Plus, Payez Moins – Adoptez Nos Adaptateurs !'
    },
    ['Câbles']: {
      title: "Câbles",
      image: "https://res.cloudinary.com/dkhvdihhj/image/upload/v1739028252/cables_i0rrxw.jpg",
      description: 'Restez Connectés à Petit Prix – Saisissez Vos Câbles !'
    },
    ['Powerbank']: {
      title: "PowerBanks",
      image: "https://res.cloudinary.com/dkhvdihhj/image/upload/v1739029096/powerbanks_tlsi2i.jpg",
      description: "De l'Énergie Partout, Tout le Temps – Adoptez Nos Powerbanks !"
    },
    ['Haut-parleurs']: {
      title: "Haut-parleurs",
      image: "https://res.cloudinary.com/dkhvdihhj/image/upload/v1739029340/speakers_gi9rpk.jpg",
      description: 'Du Son Puissant à Petit Prix – Profitez de Nos Enceintes !'
    },
    ['Batteries']: {
      title: "Batteries",
      image: "https://res.cloudinary.com/dkhvdihhj/image/upload/v1739029435/battery_hhv2dh.jpg",
      description: 'Une Énergie Fiable à Prix Doux – Choisissez Nos Batteries !'
    },
    ['Modulateur']: {
      title: "Modulateurs",
      image: "https://res.cloudinary.com/dkhvdihhj/image/upload/v1739029693/modulater_zqowoj.jpg",
      description: 'Une Connexion Parfaite, Où Que Vous Soyez – Optez pour Nos Modulateurs !'
    },
    ['Supports']: {
      title: "Supports",
      image: "https://res.cloudinary.com/dkhvdihhj/image/upload/v1739029793/holders_fj85nm.jpg",
      description: 'Stabilité et Confort à Petit Prix – Découvrez Nos Supports !'
    },
    ['Montres']: {
      title: "Montres",
      image: "https://res.cloudinary.com/dkhvdihhj/image/upload/v1739029956/watch_oezjee.jpg",
      description: 'Le Temps Élégamment Maîtrisé – Craquez pour Nos Montres !'
    },
    ['Chargeur de voiture']: {
      title: "Chargeur de voiture",
      image: "https://res.cloudinary.com/dkhvdihhj/image/upload/v1739030079/carCharger_kalbsf.jpg",
      description: 'Chargez en Route, Sans Compromis – Adoptez Nos Chargeurs de Voiture !'
    },
    ['Phone Case']: {
      title: "Phone Case",
      image: "https://res.cloudinary.com/dkhvdihhj/image/upload/v1739030310/phoneCase_t6au7c.jpg",
      description: 'Protection Stylée, Prix Imbattables – Trouvez Votre Coque de Téléphone !'
    },
    ['Tablettes']: {
      title: "Explore Categories",
      image: "https://res.cloudinary.com/dkhvdihhj/image/upload/v1739030403/tablets_nxl06x.jpg",
      description: 'Puissance et Performance à Petit Prix – Découvrez Nos Tablettes !'
    },
    default: {
      title: "Explore Categories",
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=2070",
      description: 'Tout pour Votre Technologie, À Prix Imbattables – Explorez Notre Magasin !'
    }
  };

  return categories[category] || categories.default;
};

const ShopHero = ({ category }) => {
  const { title, image, description } = getCategoryData(category);

  return (
    <div 
      className={styles.categoryHeader}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className={styles.overlay}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default ShopHero;