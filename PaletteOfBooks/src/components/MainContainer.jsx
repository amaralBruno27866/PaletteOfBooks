import styles from '../Styles/MainContainer.module.css';

export function MainContainer(){
  return(
    <div className={styles.mainContainer}>
      <div className={styles.cardContainer}>
        <h1>main content</h1>
      </div>
    </div>
  )
}