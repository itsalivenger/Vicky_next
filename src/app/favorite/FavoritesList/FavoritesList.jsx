"use client";
import React from 'react';
import { Card } from '../ui/Card/Card';
import { Button } from '../ui/Button/Button';
import { Icon } from '../ui/Icon/Icon';
import styles from './FavoritesList.module.css';
import { addToCart } from '../../../components/other/usefulFunctions';
import LazyMedia from '../../../components/lazyMedia/LazyMedia';
import { FaHeart } from 'react-icons/fa';

export function FavoritesList({ items, togglePopup, user, removeItemFromFavorite, hasFavorites, itemsLength, renderTitle }) {
  return (
    <div className={styles.grid}>
      {renderTitle && (
        <h1 className={styles.title}>
          <FaHeart className={styles.icon} size={24} color="white" />
          Mes Favoris
        </h1>
      )}
      <p className={styles.subtitle}>
        {hasFavorites
          ? `${itemsLength} articles enregistrés`
          : 'Aucun article enregistré'}
      </p>
      {items.map((item, index) => (
        <Card key={index} className={styles.card}>
          <div className={styles.imageContainer}>
            <LazyMedia type="image" src={item.imageUrls[0]} alt={item.productName} className={styles.image} />
            <button className={styles.removeButton}>
              <Icon onClick={() => removeItemFromFavorite(item._id)} name="close" />
            </button>
          </div>
          
          <div className={styles.content}>
            <h3 className={styles.name}>{item.productName}</h3>
            <p className={styles.price}>{item.price} DH</p>
            <p className={styles.date}>
              Ajouté le {new Date(item.createdAt).toLocaleDateString('fr-FR')}
            </p>
            
            <Button onClick={() => addToCart(user._id , togglePopup, item)} className={styles.addToCartButton}>
              <Icon name="shopping_cart" className={styles.buttonIcon} />
              Ajouter au panier
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}