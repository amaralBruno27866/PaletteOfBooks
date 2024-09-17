import styles from '../Styles/Navbar.module.css';
import { FcList } from "react-icons/fc";

export function Navbar(){
  return(
    <div className={styles.nav}>
      <nav>
        <button>Add a new book</button>
        <input type="text" />
        <FcList />
        <button>CSV</button>
        <button>JSON</button>
      </nav>
    </div>
  )
}