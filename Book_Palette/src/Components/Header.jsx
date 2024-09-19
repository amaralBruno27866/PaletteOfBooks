import styles from '../Styles/Header.module.css'
import { FaBookOpen } from 'react-icons/fa'

export function Header() {
  return(
    <header className={styles.header}>
      <a href="#">
        Book Palette
      </a>
      <FaBookOpen size={48} className={styles.logo}/>
    </header>
  )
}