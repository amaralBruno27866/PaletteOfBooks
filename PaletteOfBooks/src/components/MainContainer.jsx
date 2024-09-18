import styles from '../Styles/MainContainer.module.css';
import { BooksView } from './BookView';

export function MainContainer() {
  return (
    <div className={styles.mainContainer}>
      <BooksView />
    </div>
  );
}