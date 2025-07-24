import styles from "./homeCategories.module.css";
import LazyMedia from "../lazyMedia/LazyMedia";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRouter } from 'next/navigation';

const categories = [
    { name: "Chargeurs", imgSrc: "/images/categories/adaptors.png" },
    { name: "Batteries", imgSrc: "/images/categories/battery.png" },
    { name: "Câbles", imgSrc: "/images/categories/cables.png" },
    { name: "Écouteurs", imgSrc: "/images/categories/earphone.png" },
    { name: "Modulateur", imgSrc: "/images/categories/fm.png" },
    { name: "Supports", imgSrc: "/images/categories/holder.png" },
    { name: "Tablettes", imgSrc: "/images/categories/tablette.png" },
    { name: "Montres", imgSrc: "/images/categories/watches.png" },
    { name: "Powerbank", imgSrc: "/images/categories/powerbank.png" },
    { name: "Phone Case", imgSrc: "/images/categories/phoneCase.png" },
    { name: "Haut-parleurs", imgSrc: "/images/categories/speaker.png" },
    { name: "Chargeur de voiture", imgSrc: "/images/categories/car-charger.png" },
];

function HomeCategories() {
    const router = useRouter();
    const handleClick = (category) => {
        router.push(`/boutique?category=${encodeURIComponent(category)}`);
    };

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 2,
        arrows: true,
        swipeToSlide: true,
        autoplay: false,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        cssEase: 'ease-in-out',
        adaptiveHeight: false,
        centerMode: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 2,
                    arrows: true,
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    arrows: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
        ],
    };

    return (
        <div className={styles.sliderContainer}>
            <Slider {...sliderSettings}>
                {categories.map(({ name, imgSrc }) => (
                    <div key={name} className={styles.category} onClick={() => handleClick(name)}>
                        <LazyMedia type="image" src={imgSrc} alt={name} className={styles.icon} />
                        <p className={styles.name}>{name}</p>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default HomeCategories;