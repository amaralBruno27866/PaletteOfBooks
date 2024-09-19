import { Header } from "./Components/Header";
import styles from './App.module.css'
import './global.css'

export function App() {

  return (
    <body>
      <Header />
      <div className={styles.copyright}>
        Copyright &copy; 2024 BeagleProg. All Rights Reserved. Made by Bruno Amaral
      </div>
    </body>
  )
}
