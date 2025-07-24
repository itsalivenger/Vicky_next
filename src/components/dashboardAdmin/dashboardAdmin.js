import React, { useEffect, useState } from 'react';
import styles from './dashboardAdmin.module.css';
import sendRequest from '../other/sendRequest';
import { serverDomain } from '../other/variables';
import { FaDollarSign, FaListAlt, FaBox, FaUser } from 'react-icons/fa';


function DashboardAdmin() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await sendRequest(`/api/adminDashboard`, 'GET');

      if (response.error) {
        console.log(response.error);
      } else {
        // console.log(response);
        setData(response);
      }
    }
    getData();
  }, [])

  
  return (
    <div>
      <SalesSummary data={data} />
      <div className={styles.contentContainer}>
        <SalesTable />
        <Earnings />
      </div>
      {/* <OrdersAdmin /> */}
    </div>
  );
}

const SalesSummary = ({ data: { salesOfToday, numOfOrders, nombreDesProduitsVendus, usersThisLastWeek } }) => {
  const data = [
    {
      // statistique icon
      icon: <FaDollarSign size={24} />,
      value: salesOfToday,
      label: "Ventes d'aujourd'hui",
      change: "+0% depuis hier",
      color: '#ffa726',
    },
    {
      icon: <FaListAlt size={24} />,
      value: numOfOrders,
      label: 'Commandes Totales',
      change: '+0% from yesterday',
      color: '#26c6da',
    },
    {
      icon: <FaBox size={24} />,
      value: nombreDesProduitsVendus,
      label: 'Produits Vendus',
      change: '+0% from yesterday',
      color: '#ec407a',
    },
    {
      icon: <FaUser size={24} />,
      value: usersThisLastWeek,
      label: 'Nouveau Clients',
      change: '+0% from yesterday',
      color: '#42a5f5',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Ventes d'aujourd'hui</h2>
        <p>resume des ventes</p>
      </div>
      <div className={styles.cards}>
        {data.map((item, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.icon} style={{ color: item.color }}>
              {item.icon}
            </div>
            <h3 className={styles.value}>{item.value}</h3>
            <p className={styles.label}>{item.label}</p>
            <span className={styles.change} style={{ color: item.color }}>
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const SalesTable = () => {
  const data = [
    { id: '01', name: 'Produit 1', rank: 1, sales: 78 },
    { id: '02', name: 'Produit 2', rank: 2, sales: 62 },
    { id: '03', name: 'Produit 3', rank: 3, sales: 51 },
    { id: '04', name: 'Produit 4', rank: 4, sales: 29 },
  ];

  return (
    <div className={styles.tableContainer}>
      <h2 className={styles.tableHeading}>Produits populaires</h2>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            <th className={styles.headerCell}>#</th>
            <th className={styles.headerCell}>Nom</th>
            <th className={styles.headerCell}>Rank</th>
            <th className={styles.headerCell}>Ventes</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
            >
              <td className={styles.cell}>{item.id}</td>
              <td className={styles.cell}>{item.name}</td>
              <td className={styles.cell}>{item.rank}</td>
              <td className={styles.cell}>{item.sales}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Earnings = () => {

  const convertToK = (value) => {
    if (value >= 1000) {
      return (value / 1000).toFixed(1).replace(/\.0$/, '') + ' k'; // Handles decimals
    }
    return value.toString(); // Return as is if less than 1000
  };

  return (
    <div className={styles.earningsContainer}>
      <h2 className={styles.heading}>Revenus</h2>
      <div className={styles.earningsDetails}>
        <span className={styles.label}>Revenus totals:</span>
        <span className={styles.value}>{convertToK(6078.76)} DH</span>
      </div>
      <div className={styles.earningsItem}>
        <span className={styles.label}>Profit:</span>
        <span className={styles.value}>48%</span>
      </div>
      <div className={styles.earningsSummary}>
        <p>Le profit a augmenté de 20% depuis le dernier mois.</p>
      </div>
    </div>
  );
};


export default DashboardAdmin;