import { useState } from 'react';
import styles from './tabNavigation.module.css';

const TabNavigation = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={styles.tabContainer}>
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`${styles.tab} ${activeTab === index ? styles.active : ''}`}
          onClick={() => setActiveTab(index)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;