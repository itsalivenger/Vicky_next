"use client";
import React, { useEffect, useState } from 'react';
import { ProfileCard } from '../ProfilePage/ProfileCard/ProfileCard';
import { OrderHistory } from '../ProfilePage/OrderHistory/OrderHistory';
import styles from './ProfilePage.module.css';
import { getUser } from '../../components/other/usefulFunctions';
import sendRequest from '../../components/other/sendRequest';
import { serverDomain } from '../../components/other/variables';

export default function ProfilePage({ handleLogout }) {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (typeof window !== 'undefined') {
        const currentUser = getUser();
        setUser(currentUser);
        if (currentUser?._id) {
      try {
            const response = await sendRequest(`/api/orders/user/${currentUser._id}`, 'GET');
        if (response.error) {
          console.log(response.error);
        } else {
          setOrders(response.orders || []);
        }
      } catch (error) {
        console.log(error);
      }
    }
      }
    }
    init();
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.grid}>
          <ProfileCard handleLogout={handleLogout} user={user} />
          <OrderHistory user={user} orders={orders} />
        </div>
      </div>
    </div>
  );
}