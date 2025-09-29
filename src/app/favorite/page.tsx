"use client";
import React, { useEffect, useState } from 'react';
import { FavoritesList } from './FavoritesList/FavoritesList';
import { EmptyState } from './EmptyState/EmptyState';
import styles from './Favorite.module.css';
import { getFavoriteItems, getUser } from '../../components/other/usefulFunctions';
import Popup from '../../components/popup/popup';
import { FaHeart } from 'react-icons/fa';
import sendRequest from '../../components/other/sendRequest';
import { serverDomain } from '../../components/other/variables';

export default function FavoritesPage() {
  const [items, setItems] = useState([]);
  const [user] = useState(getUser());
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState({ title: '', content: '' });

  useEffect(() => {
    const getItems = async () => {
      const favoriteItems = await getFavoriteItems();
      setItems(favoriteItems.favorite ? favoriteItems.favorite : []);
    }
    getItems();
  }, [content]);

  const togglePopup = ({ title, content }: { title: any; content: any }) => {
    setIsOpen(!isOpen);
    setContent({ title, content });
  }

  const removeItemFromFavorite = async (id: string) => {
    const response = await sendRequest(`/api/favorite/delete`, 'POST', { user_id: user._id, product_Id: id });
    if (!response.error) {
      togglePopup({ title: 'Success', content: response.message });
      user.favorite = user.favorite.filter((item: string) => item.toString() !== id);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      togglePopup({ title: 'Error', content: response.error });
    }
  }
  const hasFavorites = items.length > 0;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            <FaHeart className={styles.icon} size={24} color="white" />
            Mes Favoris
          </h1>
          <p className={styles.subtitle}>
            {hasFavorites
              ? `${items.length} articles enregistrés`
              : 'Aucun article enregistré'}
          </p>
        </header>

        {hasFavorites ? (
          <FavoritesList removeItemFromFavorite={removeItemFromFavorite} user={user} togglePopup={togglePopup} items={items} />
        ) : (
          <EmptyState />
        )}
      </div>
      <Popup onConfirm={() => setIsOpen(false)} isOpen={isOpen} onClose={() => setIsOpen(false)} title={content.title} content={content.content} />
    </div>
  );
}