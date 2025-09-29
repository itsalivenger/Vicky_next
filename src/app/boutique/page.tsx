"use client";

import { useEffect, useState, useRef, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductCard from '../../components/productCard/productCard';
import ShopHero from '../../components/shopHero/shopHero';
import LoadingSpinner from '../../components/LoadingSpinner/loadingSpinner';
import Popup from '../../components/popup/popup';
import Gallery from '../../components/imagesCarousel/Gallery';
import CategoriesSection from './CategoriesSection';
import sendRequest from '../../components/other/sendRequest';
import { serverDomain } from '../../components/other/variables';
import { getUser } from '../../components/other/usefulFunctions';
import { MdAutorenew } from 'react-icons/md';
import styles from './Shop.module.css';

const DEFAULT_CATEGORY = 'earphones';
const LOAD_LIMIT = 24;

const images = [
  { src: '/images/other/img1.jpeg' },
  { src: '/images/other/img2.png' },
  { src: '/images/other/img3.jpeg' },
  { src: '/images/other/img5.png' },
  { src: '/images/other/img6.png' },
  { src: '/images/other/img7.jpeg' },
];

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState({ title: '', content: '' });
  const [hasMore, setHasMore] = useState(true);
  const userRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      userRef.current = getUser();
    }
  }, []);
  const searchParams: any = useSearchParams();
  const router = useRouter();

  const categoryFromUrl = searchParams.get('category') || DEFAULT_CATEGORY;

  const fetchProducts = useCallback(async (category: string, append = false) => {
    setIsLoading(true);
  
    try {
      const start = append ? products.length : 0;
      const response = await sendRequest(
        `/api/shop?category=${category}&start=${start}&limit=${LOAD_LIMIT}`,
        'GET'
      );
  
      if (!response.error) {
        setProducts(prev => (append ? [...prev, ...response.products] : response.products));
        setHasMore(response.products.length === LOAD_LIMIT);
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
  
    setIsLoading(false);
  }, [products.length]);
  
  useEffect(() => {
    fetchProducts(categoryFromUrl);
  }, [categoryFromUrl, fetchProducts]);

  // Ensure Material Icons are loaded for shop page
  useEffect(() => {
    const ensureMaterialIcons = () => {
      if (!document.querySelector('link[href*="Material+Symbols+Outlined"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,100,0,0';
        document.head.appendChild(link);
      }
    };
    
    // Ensure icons are loaded when shop page loads
    ensureMaterialIcons();
    
    // Also check after a short delay to ensure they're applied
    const timer = setTimeout(ensureMaterialIcons, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleCategories = (category: string) => {
    if (category !== categoryFromUrl) {
      router.replace(`?category=${category}`);
    }
  };

  const togglePopup = (content: any) => {
    setIsPopupOpen(true);
    setPopupContent(content);
  };

  return (
    <div className={styles.container}>
      <ShopHero category={categoryFromUrl} />
      <CategoriesSection handleCategories={handleCategories} />

      <div className={styles.titleContainer}>
        <h2>{categoryFromUrl} Pour Vous!</h2>
      </div>

      <div className={styles.productContainer}>
        {isLoading ? (
          <LoadingSpinner />
        ) : products.length > 0 ? (
          products.map((product: { id: string}, index) => (
            <ProductCard
              togglePopup={togglePopup}
              user_id={userRef.current}
              key={product.id || index}
              product={product}
            />
          ))
        ) : (
          <p className={styles.noProducts}>Aucun produit disponible.</p>
        )}
      </div>


      {hasMore && (
        <div className={styles.loadMoreContainer}>
          <button
            onClick={() => fetchProducts(categoryFromUrl, true)}
            className={styles.loadMore}
            disabled={isLoading}
          >
            <MdAutorenew size={24} />
            {isLoading ? 'Chargement...' : 'Charger plus'}
          </button>
        </div>
      )}

      <Gallery images={images} />

      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title={popupContent.title}
        content={popupContent.content}
        onConfirm={()=> setIsPopupOpen(false)}
      />
    </div>
  );
}


// **FIX #1: Create a new root component for the page that provides the Suspense boundary.**
export default function Shop() {
    return (
        <Suspense fallback={<div className={styles['loading-container']}>Loading Page...</div>}>
            <ShopPage />
        </Suspense>
    );
}