import styles from '../Styles/Navbar.module.css';
import { FaList, FaFileDownload } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";

export function Navbar(){
  return(
    <div className={styles.nav}>
      <nav>
        <button>
          Add book
          <div><IoMdAddCircle size={24}/></div>
        </button>

        <input type="text"placeholder='Search' className={styles.input} />

        <FaList size={48} className={styles.filter} />

        <button>
          CSV 
          <div><FaFileDownload size={24} /></div>
        </button>

        <button>
          JSON 
          <div><FaFileDownload size={24} /></div>
        </button>
      </nav>
    </div>
  )
}