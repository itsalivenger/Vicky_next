"use client";

import React, { useEffect, useState } from 'react';
import { ProfileCard } from './ProfileCard/ProfileCard';
import { OrderHistory } from './OrderHistory/OrderHistory';
import styles from './ProfilePage.module.css';
import { getUser } from '../../components/other/usefulFunctions';
import sendRequest from '../../components/other/sendRequest';
import { serverDomain } from '../../components/other/variables';

export default function ProfilePage({ handleLogout }) {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    const getOrderHistory = async () => {
      try {
        const response = await sendRequest(`/api/orders/user/${user._id}`, 'GET');
        if (response.error) {
          console.log(response.error);
        } else {
          // console.log(response);
          setOrders(response.orders || []);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getOrderHistory();
    setUser(getUser());
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