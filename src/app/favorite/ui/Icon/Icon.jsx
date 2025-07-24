import React from 'react';
import { MdFavoriteBorder, MdClose, MdShoppingCart, MdExitToApp } from 'react-icons/md';

export function Icon({ name, className = '', onClick = () => {} }) {
  switch (name) {
    case 'favorite_border':
      return <MdFavoriteBorder size={24} className={className} />;
    case 'close':
      return <MdClose size={24} className={className} />;
    case 'shopping_cart':
      return <MdShoppingCart size={24} className={className} />;
    case 'exit_to_app':
      return <MdExitToApp size={24} className={className} />;
    default:
      return (
        <span onClick={onClick} className={`material-symbols-outlined ${className}`}>
          {name}
        </span>
      );
  }
}