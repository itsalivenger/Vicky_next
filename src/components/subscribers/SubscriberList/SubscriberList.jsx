import React from 'react';
import styles from './SubscriberList.module.css';

export function SubscriberList({ subscribers }) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.header}>Nom</th>
            <th className={styles.header}>Email</th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map((subscriber) => (
            <tr key={subscriber.id}>
              <td className={styles.cell}>{subscriber.name}</td>
              <td className={styles.cell}>{subscriber.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}