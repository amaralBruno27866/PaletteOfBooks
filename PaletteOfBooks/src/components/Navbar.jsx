import styles from '../Styles/Navbar.module.css';
import { FaList } from "react-icons/fa";

export function Navbar(){
  return(
    <div className={styles.nav}>
      <nav>
        <button>Add book</button>
        <input type="text"placeholder='Search' className={styles.input} />
        <FaList size={48} className={styles.filter} />
        <button>CSV</button>
        <button>JSON</button>
      </nav>
    </div>
  )
}