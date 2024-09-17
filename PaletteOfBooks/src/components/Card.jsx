import styles from '../Styles/Card.module.css';
import { IoMdBookmarks } from "react-icons/io";
import { MdEditSquare } from "react-icons/md";

export function Card(){
  return(
    <div className={styles.card}>
      <section>
        <header>
          <IoMdBookmarks size={32} />
          <h4>Titlte book</h4>
        </header>

        <div className={styles.image}>
          <img src="" alt="" />
        </div>
        
        <section className={styles.table}>
          <table>
            <tr>
              <td>Author:</td>
              <td>Nome do personagem</td>
            </tr>
            <tr>
              <td>Genrer:</td>
              <td>Idade do personagem</td>
            </tr>
            <tr>
              <td>Date:</td>
              <td>Altura do personagem</td>
            </tr>
            <tr>
              <td>Published:</td>
              <td>Peso do personagem</td>
            </tr>
          </table>
        </section>

        <MdEditSquare size={32} />

      </section>
    </div>
  )
}