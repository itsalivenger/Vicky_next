import styles from './ThemeToggle.module.css';

const ThemeToggle = ({theme, toggleTheme}) => {

  return (
    <button 
      className={`${theme === 'dark' ? '' : styles.light} ${styles.toggleSwitch}`}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title={`Switch to ${theme === 'light' ? 'light' : 'dark'} mode`}
    >
      <div className={`${styles.slider} ${theme === 'light' ? styles.dark : ''}`}>
        <div className={styles.icon}>
          {theme === 'dark' ? '🌙' : '☀️'}
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;