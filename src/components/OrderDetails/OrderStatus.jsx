import React from 'react';
import styles from './OrderStatus.module.css';
import { MdMoreVert } from 'react-icons/md';

const statusConfig = {
  pending: { label: 'En attente' },
  processing: { label: 'En cours de traitement' },
  shipped: { label: 'Expédié' },
  delivered: { label: 'Livré' },
  cancelled: { label: 'Annulé' },
};

export const OrderStatus = ({ status }) => {
  return (
    <div className={`${styles.status} ${styles[status.toLowerCase()]}`}>
      {/* <Icon size={16} /> */}
      <MdMoreVert size={24} />
      <span>{statusConfig[status.toLowerCase()].label}</span>
    </div>
  );
};