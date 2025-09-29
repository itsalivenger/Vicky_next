"use client";

import React, { useEffect, useState } from 'react';
import { ProfileCard } from './ProfileCard/ProfileCard';
import { OrderHistory } from './OrderHistory/OrderHistory';
import styles from './ProfilePage.module.css';
import { getUser } from '../../components/other/usefulFunctions';
import sendRequest from '../../components/other/sendRequest';

import { useAuth } from '../../components/auth/AuthContext';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { handleLogout, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isLoading) {
      return; // Wait for authentication status to be determined
    }

    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const load = async () => {
      const u = getUser();
      setUser(u);
      if (u?._id) {
        try {
          const response = await sendRequest(`/api/orders/user/${u._id}`, 'GET');
          setOrders(response.orders || []);
        } catch (error) {
          console.log(error);
        }
      }
    };

    load();
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !user || !isAuthenticated) return null; // Or a loading spinner

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.grid}>
          <ProfileCard handleLogout={handleLogout} user={user} />
          <OrderHistory orders={orders} />
        </div>
      </div>
    </div>
  );
}
