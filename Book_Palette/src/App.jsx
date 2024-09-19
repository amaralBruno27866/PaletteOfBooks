import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { Navbar } from "./Components/Navbar";
import styles from './App.module.css';
import './global.css';

export function App() {

  return (
    <div className={styles.container}>
      <Header />
      <Navbar />
      <Footer />
      <div className={styles.copyright}>
        Copyright &copy; 2024 BeagleProg. All Rights Reserved. Made by Bruno Amaral
      </div>
    </div>
  )
}
