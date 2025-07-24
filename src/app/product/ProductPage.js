import TitleAndText from '../../../components/TitleAndText/TitleAndText';
import MediaDisplay from '../../../components/ImageResponsive/MediaDisplay';
import ImageCarousel from '../../../components/imagesCarousel/imagesCarousel';
import LazyMedia from '../../../components/lazyMedia/LazyMedia';
import ProductPreview from '../../../components/productPreview/productPreview';
import ImageBesidesText from '../../../components/ImageBesidesText/imageBesidesText';
import ProductCard from '../../../components/productCard/productCard';
import styles from './ProductPage.module.css';
import Gallery from '../../../components/imagesCarousel/Gallery';

function ProductPage() {
    const images = [
        { src: './images/other/img1.jpeg', alt: 'Image 1' },
        { src: './images/other/img2.png', alt: 'Image 2' },
        { src: './images/other/img3.jpeg', alt: 'Image 3' },
        { src: './images/other/img5.png', alt: 'Image 5' },
        { src: './images/other/img6.png', alt: 'Image 6' },
        { src: './images/other/img7.jpeg', alt: 'Image 6' },
    ];

    const image2 = [
        './images/products/prodDisplay1.jpeg',
        './images/products/prodDisplay2.jpeg',
        './images/products/prodDisplay3.jpeg'

    ]
    const detailsData = [
        {
            label: 'Battery',
            desc: 'The ZG28 Gaming Headset features a 3.7V, 300mAh rechargeable battery, providing long-lasting power for extended gaming sessions and quick recharging for minimal downtime.',
        },
        {
            label: 'Sound Quality',
            desc: 'Experience immersive audio with crystal-clear highs and deep, rich bass. Perfect for gaming, music, and movies.',
        },
        {
            label: 'Comfort',
            desc: 'Designed with soft ear cushions and an adjustable headband for extended gaming sessions without discomfort.',
        },
        {
            label: 'Connectivity',
            desc: 'Seamless wireless connectivity with Bluetooth 5.0 and a range of up to 10 meters for hassle-free use.',
        }, {
            label: 'Battery',
            desc: 'The ZG28 Gaming Headset features a 3.7V, 300mAh rechargeable battery, providing long-lasting power for extended gaming sessions and quick recharging for minimal downtime.',
        },
        {
            label: 'Sound Quality',
            desc: 'Experience immersive audio with crystal-clear highs and deep, rich bass. Perfect for gaming, music, and movies.',
        },
        {
            label: 'Comfort',
            desc: 'Designed with soft ear cushions and an adjustable headband for extended gaming sessions without discomfort.',
        },
    ];
    const products = [
        {
            id: 1,
            imageSrc: './images/products/headset1.png',
            note: 'best seller',
            title: 'Wireless Bluetooth Headphones',
            description: 'High-quality wireless headphones with noise cancellation and 20-hour battery life',
            price: 99.99
        },
        {
            id: 2,
            imageSrc: './images/products/headset2.png',
            note: 'best seller',
            title: 'Smart Fitness Watch',
            description: 'Track your health and fitness with this advanced smartwatch featuring heart rate monitoring',
            price: 149.99
        },
        {
            id: 3,
            imageSrc: './images/products/headset3.png',
            note: 'best seller',
            title: 'Portable Power Bank',
            description: '20000mAh high-capacity power bank with fast charging capabilities',
            price: 49.99
        },
        {
            id: 4,
            imageSrc: './images/products/headset4.png',
            note: 'best seller',
            title: 'Ultra HD Webcam',
            description: '4K webcam perfect for streaming and video conferencing with auto-focus',
            price: 79.99
        }
    ];



    return (
        <div>
            <div className={styles['productPageContainer']}>
                <ProductPreview />
                <TitleAndText title={'Ultra Wide Camera. Focus On Little Things'} text={'The new ultra wide camera with autofocus takes incredibely sharp, detailed marcro photos and videos. You can also frame more expansive scenes without taking a step back. and because it has a larger aperture and bigger pixels, it can capture up to 2.6x more light for higher image quality - even in low light'} />
                <ImageCarousel images={image2} />
                <div className={styles['textSectionContainer']}>
                    <div className={styles['textSection']}>
                        <h1>lorem ipsum is simply dummy text of the printing and typesetting</h1>
                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi</p>
                    </div>
                </div>
                <MediaDisplay type={'video'} src={'./videos/adVid.mp4'} />
                <ImageBesidesText imageSrc={'./images/products/prodDisplay3.jpeg'} title={'Lorem ipsum dolor sit amet'} description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'} />
                <ImageBesidesText reverse={true} imageSrc={'./images/products/prodDisplay3.jpeg'} title={'Lorem ipsum dolor sit amet'} description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'} />

                <div className={styles['detailsContainer']}>
                    <h2 className={styles.specificationsTitle}>Specifications.</h2>
                </div>
                {detailsData && detailsData.map((detail, index) => (
                    <DetailSection key={index} label={detail.label} description={detail.desc} />
                ))}
                <div className={styles.miniTitle}>
                    <h2>Get Similar Products</h2>
                </div>

                <div className={styles['similarProductsContainer'] + ' ' + styles['cardsContainer']}>
                    {products && products.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
            </div>

            <div>
                <Gallery images={images} />
            </div>
        </div>
    );
}


const DetailSection = ({ label, description }) => {
    return (
        <div className={styles.detailContainer}>
            <hr className={styles.horizontalLine} />
            <div className={styles.contentContainer}>
                <div className={styles.label}>{label}</div>
                <div className={styles.description}>{description}</div>
            </div>
        </div>
    );
};


export default ProductPage;