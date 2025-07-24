import React, { useEffect } from 'react';
import { OrderItemCard } from './OrderItemCard';
import { OrderStatus } from './OrderStatus';
import OrderSummary from './OrderSummary';
import styles from './OrderDetails.module.css';
import { calculatePromo, downloadOrderAsPDF, getTotal } from '../other/usefulFunctions';
import { FaArrowLeft } from 'react-icons/fa';

export const OrderDetails = ({ order, toggleBack }) => {
  const [promo, setPromo] = React.useState({ discount: 0, newTotal: 0 });

  useEffect(() => {
    async function setData() {
      const res = await calculatePromo(order.userInfo.formData, order.cart)
      setPromo(res)
    }
    setData()
  })
  return (
    <div className={styles.container}>
      <div className={styles.back} onClick={toggleBack}>
        <FaArrowLeft size={24} color="white" />
      </div>
      <div>
        <h2 className={styles.title}>Details de la commande</h2>
      </div>
      <div className={styles.header}>
        <div className={styles.orderInfo}>
          <h2 className={styles.orderId}>Commande #{order._id}</h2>
          <p className={styles.date}>{new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        <OrderStatus status={order.status} />
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Articles</h3>
        <div className={styles.orderDetails}>
          {order.cart.map((item, index) => (
            <OrderItemCard key={index} item={item} />
          ))}
        </div>
      </div>

      <div className={styles.orderDetails}>
        <OrderSummary
          subtotal={getTotal(order.cart)}
          shippingCost={0}
          tax={10}
          total={getTotal(order.cart)}
          promo={promo}
        />
      </div>


      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Adresse de livraison</h3>
        <div className={`${styles.address} ${styles.orderDetails}`}>
          <p>{order.userInfo.formData.address}</p>
          <p>
            {order.userInfo.formData.city}, {order.userInfo.formData.apartement}{' '}
            {order.userInfo.formData.postalCcode}
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Informations du client</h3>
        <div className={`${styles.address} ${styles.orderDetails}`}>
          <p>Nom Complet: <span className={styles.userInfo}>{order.userInfo.formData.firstName + ' ' + order.userInfo.formData.lastName}</span></p>
          <p>Email: <span className={styles.userInfo}>{order.userInfo.formData.email}</span></p>
          <p>Telephone: <span className={styles.userInfo}>{order.userInfo.formData.phone}</span></p>
          <p>
            Message du client: <span className={styles.userInfo}>{order.userInfo.formData.notes}</span>
          </p>
          <p>Date: <span className={styles.userInfo}>{order.createdAt}</span></p>
        </div>
      </div>
      <div className={styles.printBtnContainer}>
        <button onClick={() => downloadOrderAsPDF(order, promo)} className={styles.printOrderBtn}>Telecharger la commande</button>
      </div>
    </div>
  );
};