import Slider from 'react-slick';
import styles from './heroCarousel.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LazyMedia from '../lazyMedia/LazyMedia';
const slides = [
  {
    title: "Améliorez Votre Expérience Audio",
    description: "Découvrez des produits incroyables et parcourez une vaste collection.",
    buttonText: "En Savoir Plus",
    backgroundImage: "/images/flayers/mouse.jpeg"
  }, {
    title: "Améliorez Votre Expérience Audio",
    description: "Découvrez des produits incroyables et parcourez une vaste collection.",
    buttonText: "En Savoir Plus",
    backgroundImage: "/images/flayers/queen.jpeg"
  }, {
    title: "Améliorez Votre Expérience Audio",
    description: "Découvrez des produits incroyables et parcourez une vaste collection.",
    buttonText: "En Savoir Plus",
    backgroundImage: "/images/flayers/lastWatch.jpg"
  },
];


const Slide = ({ title, description, buttonText, backgroundImage, index }) => {
  return (
    <div className={styles.contentBlock}>
      {/* <img src={backgroundImage} alt="Background" className={styles.backgroundImage} /> */}
      <LazyMedia type="image" src={backgroundImage} alt="Background" className={styles.backgroundImage} />
      <div className={styles.overlay}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <button className={styles.button}>{buttonText}</button>
      </div>
    </div>
  );
};

const HeroCarousel = () => {
  const settings = {
    dots: true,
    customPaging: (i) => (
      <div className={styles.customDot} />
    ),
    dotsClass: `slick-dots ${styles.customDots}`,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <Arrow direction="left" />,
    nextArrow: <Arrow direction="right" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.carouselContainer}>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className={styles.slide}>
            <Slide index={index} title={slide.title} description={slide.description} buttonText={slide.buttonText} backgroundImage={slide.backgroundImage} />
          </div>
        ))}
      </Slider>
    </div>
  );
};


const Arrow = ({ direction, onClick }) => {

  return (
    <div onClick={onClick} className={`${styles["arrow"]} ${direction === 'right' ? styles["right"] : styles["left"]}`}>
      <div className={styles["arrow-top"]}></div>
      <div className={styles["arrow-bottom"]}></div>
    </div>
  );
};




export default HeroCarousel;