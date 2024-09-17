import styles from '../Styles/Card.module.css';
import { IoMdBookmarks } from "react-icons/io";
import { MdEditSquare } from "react-icons/md";

export function Card(){
  return(
    <div className={styles.card}>
      <section>
        <header>
          <IoMdBookmarks size={32} />
          <h3>The Lord of the Ring</h3>
        </header>

        <div className={styles.image}>
          <img src="./cover.jpg" alt="Lord of the ring cover book" />
        </div>
        
        <section className={styles.table}>
          <table>
            <tr>
              <td className={styles.left}>Author</td>
              <td className={styles.right}>J. R. R. Tolkien</td>
            </tr>
            <tr>
              <td className={styles.left}>Genrer</td>
              <td className={styles.right}>Fantasy</td>
            </tr>
            <tr>
              <td className={styles.left}>Published Date</td>
              <td className={styles.right}>1954 / 07 / 29</td>
            </tr>
            <tr>
              <td className={styles.left}>ISBN</td>
              <td className={styles.right}>0618346007</td>
            </tr>
          </table>
        </section>

        <div className={styles.edit_bt}>
          <MdEditSquare size={32} className={styles.editIcon}/>
        </div>
      </section>
    </div>
  )
}