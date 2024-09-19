import { Header } from "./Components/Header";
import styles from './App.module.css';
import './global.css';
import { Footer } from "./Components/Footer";

export function App() {

  return (
    <div className={styles.container}>
      <Header />
      <Footer />
      <div className={styles.copyright}>
        Copyright &copy; 2024 BeagleProg. All Rights Reserved. Made by Bruno Amaral
      </div>
    </div>
  )
}
