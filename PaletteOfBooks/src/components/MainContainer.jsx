import styles from '../Styles/MainContainer.module.css';
import { Card } from './Card';

export function MainContainer(){
  return(
    <div className={styles.mainContainer}>
      <div className={styles.cardContainer}>
        <Card />
      </div>
    </div>
  )
}