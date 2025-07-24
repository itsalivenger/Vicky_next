import Slider from 'react-slick';
import styles from './imageCarousel.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LazyMedia from '../lazyMedia/LazyMedia';

const ImageCarousel = ({ images }) => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: "20px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "20px", 
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "10px", /* Less padding for mobile */
        },
      },
    ],
  };

  return (
    <div className={styles.carouselContainer}>
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index} className={styles.slide}>
            <LazyMedia type="image" src={src} alt={`Slide ${index + 1}`} className={styles.image} width={500} height={300} unoptimized={true} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;