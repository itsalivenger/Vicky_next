import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './PreviewProduct.module.css';
import sendRequest from '../../components/other/sendRequest';
import { useSearchParams } from 'next/navigation';
import { serverDomain } from '../../components/other/variables';
import { addToCart, addToFavorite, getUser } from '../../components/other/usefulFunctions';
import Popup from '../../components/popup/popup';
import LazyMedia from '../../components/lazyMedia/LazyMedia';
import { useTheme } from '../../components/other/useTheme';
import { FaArrowLeft, FaShoppingCart, FaHeart } from 'react-icons/fa';

function PreviewProduct() {
  const [product, setProduct] = useState({});
  const [user, setUser] = useState({});
  const [content, setContent] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const _id = searchParams.get('_id');
  const { theme } = useTheme();

  useEffect(() => {
    const getItem = async () => {
      const response = await sendRequest(`/api/products/${_id}`, 'GET');
      if (response.error) {
        setContent({ title: 'Error', content: response.error });
        setIsOpen(true);
      } else {
        setProduct(response);
        setUser(getUser());
      }
    }
    if (_id) {
      getItem();
    }
  }, [_id]);

  const sliderSettings = {
    dots: true,
    infinite: product.imageUrls?.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    centerMode: false
  };
  

  const togglePopup = (content) => {
    setIsOpen(!isOpen);
    setContent(content)
  }

  return (
    <div className={`${styles["product-container"]} ${theme}`}>
      <div onClick={() => window.history.back()} className={styles.goBackContainer}>
        <button className={`${styles["go-back"]} material-symbols-outlined`}>arrow_back</button>
      </div>
      <div className={styles["product-category"]}>
        {product.category}
      </div>
      <div className={styles["product-preview"]}>
        <div className={styles["image-carousel"]}>
          {product.imageUrls && product.imageUrls.length > 0 && (
            <Slider {...sliderSettings}>
              {product.imageUrls.map((url, index) => (
                <div key={index} className={styles["carousel-slide"]}>
                  <LazyMedia type="image" alt={`Vue ${index + 1} du produit`} className={styles["carousel-image"]} src={url} width={500} height={500} unoptimized={true} />
                </div>
              ))}
            </Slider>
          )}
        </div>

        <div className={styles["product-info"]}>
          <h1 className={styles["product-title"]}>{product && product.productName}</h1>
          <div className={styles["product-price"]}>{product.price} DH</div>

          <div className={styles["product-description"]}>
            <p className={styles["description-text"]}>
              {product.description}
            </p>
          </div>

          <div className={styles["product-features"]}>
            <h2 className={styles["features-title"]}>Caractéristiques Principales</h2>
            <ul className={styles["features-list"]}>
              {product.features && product.features.map((feature, index) => (
                <li key={index} className={styles["feature-item"]}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className={styles["product-actions"]}>
            <button className={`${styles["button"]} ${styles["button-cart"]}`} onClick={() => addToCart(user._id, togglePopup, product)}>
              Ajouter au Panier <span className='material-symbols-outlined'>shopping_cart</span>
            </button>
            <button
              onClick={() => addToFavorite(product._id, user._id, togglePopup)}
              className={`${styles["button"]} ${styles["button-wishlist"]}`}
            >
              Ajouter aux favoris <FaHeart size={24} color="white" />
            </button>
          </div>
        </div>
      </div>
      <Popup title={content.title} content={content.content} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default PreviewProduct;