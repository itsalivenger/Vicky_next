import LazyMedia from '../../../../components/lazyMedia/LazyMedia';

import styles from './AboutTestimonials.module.css';

const testimonials = [
  {
    name: "Ali yahdin",
    role: "",
    image: "/images/icons/user.png",
    content: "Les produits Vicky ont complètement transformé mon expérience de charge. La qualité de fabrication et la fiabilité sont inégalées.",
    rating: 4
  },
  {
    name: "Omar Othman",
    role: "",
    image: "/images/icons/user.png",
    content: "En tant que photographe, des accessoires fiables sont essentiels. Vicky offre l'excellence à chaque fois.",
    rating: 5
  },
  {
    name: "Salim Dani",
    role: "",
    image: "/images/icons/user.png",
    content: "Les capacités de charge rapide des produits Vicky ont révolutionné mon flux de travail mobile.",
    rating: 3
  }
];

export default function AboutTestimonials({ theme }) {
  return (
    <div className={styles.testimonials}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.subtitle}>Témoignages</h2>
          <p className={styles.title}>
            Adoré par les passionnés de tech du Maroc entier
          </p>
        </div>
        <div className={styles.grid}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className={styles.card}>
              <div className={styles.rating}>
                {[...Array(5)].map((_, i) => {
                    return <LazyMedia type="image" key={i} src={"/images/icons/star.svg"} alt="star" />;})}
              </div>
              <blockquote className={styles.content}>
                <p>"{testimonial.content}"</p>
              </blockquote>
              <div className={styles.author}>
                <LazyMedia type="image" className={styles.avatar} src={testimonial.image} alt="quote" />
                <div className={styles.info}>
                  <div className={`${styles.name} ${theme == 'dark' ? 'dark' : 'light'}`}>{testimonial.name}</div>
                  <div className={styles.role}>{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
