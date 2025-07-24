import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './CategoriesSection.module.css';
import LazyMedia from '../../components/lazyMedia/LazyMedia';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const categories = [
    { name: 'Chargeurs', imgSrc: '/images/categories/adaptors.png' },
    { name: 'Câbles', imgSrc: '/images/categories/cables.png' },
    { name: 'Écouteurs', imgSrc: '/images/categories/earphone.png' },
    { name: 'Haut-parleurs', imgSrc: '/images/categories/speaker.png' },
    { name: 'Batteries', imgSrc: '/images/categories/battery.png' },
    { name: 'Modulateur', imgSrc: '/images/categories/fm.png' },
    { name: 'Supports', imgSrc: '/images/categories/holder.png' },
    { name: 'Tablettes', imgSrc: '/images/categories/tablette.png' },
    { name: 'Montres', imgSrc: '/images/categories/watches.png' },
    { name: 'Powerbank', imgSrc: '/images/categories/powerbank.png' },
    { name: 'Phone Case', imgSrc: '/images/categories/phoneCase.png' },
    { name: 'Chargeur de voiture', imgSrc: '/images/categories/car-charger.png' },
];

function CategoriesSection({ handleCategories }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const categoryFromUrl = searchParams.get('category');
    
    const defaultCategory = categories.find(cat => cat.name === categoryFromUrl)?.name || categories[0].name;
    const [activeCategory, setActiveCategory] = useState(defaultCategory);

    useEffect(() => {
        handleCategories(activeCategory);
    }, [activeCategory, handleCategories]);

    useEffect(() => {
        if (categoryFromUrl) {
            setTimeout(() => {
                const element = document.getElementById('categories');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 0);
        }
    }, [categoryFromUrl]);

    const handleCategoryClick = (categoryName) => {
        setActiveCategory(categoryName);
    };

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 2,
        arrows: true,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        cssEase: 'ease-in-out',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    arrows: true,
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
        ],
    };

    return (
        <div className={styles.sliderContainer} id="categories">
            <Slider {...sliderSettings}>
                {categories.map((category) => (
                    <div key={category.name}>
                        <div
                            className={`${styles.category} ${activeCategory === category.name ? styles.active : ''}`}
                            onClick={() => handleCategoryClick(category.name)}
                        >
                            <LazyMedia type="image" src={category.imgSrc} alt={category.name} className={styles.icon} />
                            <span className={styles.name}>{category.name}</span>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default CategoriesSection;