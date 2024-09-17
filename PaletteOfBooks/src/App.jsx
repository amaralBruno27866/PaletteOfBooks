import {Header} from './components/Header'
import { Navbar } from './components/Navbar'
import { MainContainer } from './components/MainContainer'
import {Footer} from './components/Footer'
import styles from './App.module.css'
import './global.css'

export function App() {
  return (
    <body>
      <Header />
      <Navbar />
      <MainContainer />
      <Footer />
      <div className={styles.copyright}>
        Copyright &copy; 2024 BeagleProg. All Rights Reserved. Made by Bruno Amaral
    </div>
    </body>
  )
}
