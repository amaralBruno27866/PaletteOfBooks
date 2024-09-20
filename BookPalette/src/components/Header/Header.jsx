/* eslint-disable react/prop-types */
import { FaBookOpen } from 'react-icons/fa';
import styles from './Header.module.css';

export function Header({ onRefresh }) {
  return (
    <div className={styles.headerContainer}>
      <header className={styles.header}>
        <a href="#" onClick={(e) => { e.preventDefault(); onRefresh(); }}>
          Book Palette
        </a>
        <FaBookOpen size={48} className={styles.logo} />
      </header>
    </div>
  );
}