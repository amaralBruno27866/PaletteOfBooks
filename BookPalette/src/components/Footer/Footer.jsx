import styles from './Footer.module.css';
import {FaFacebook, FaInstagram, FaLinkedin, FaGithub} from 'react-icons/fa'

export function Footer(){
  return(
    <>
      <footer className={styles.footer}>
        <div className={styles.container}>

        <span className={styles.blur}></span>
        <span className={styles.blur}></span>

          <div className={styles.column}>
            <div className={styles.logo}>
              <img src="./beagle.png" alt="Beagle logo" />
            </div>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>

            <div className={styles.social}>
              <a href="https://www.facebook.com/brunoalencar.amaral.50"><FaFacebook size={32} className={styles.social_icon} /></a>
              <a href="https://www.instagram.com/brunoalencar.amaral.50/?__pwa=1"><FaInstagram size={32} className={styles.social_icon} /></a>
              <a href="https://www.linkedin.com/in/brunoalencaramaral/"><FaLinkedin size={32} className={styles.social_icon} /></a>
              <a href="https://github.com/amaralBruno27866"><FaGithub size={32} className={styles.social_icon} /></a>
            </div>
          </div>

          <div className={styles.column}>
            <h4>Company</h4>
            <a href="#">Business</a>
            <a href="#">Patnership</a>
            <a href="#">Network</a>
          </div>

          <div className={styles.column}>
            <h4>About us</h4>
            <a href="#">Blog</a>
            <a href="#">Channels</a>
            <a href="#">Sponsors</a>
          </div>

          <div className={styles.column}>
            <h4>Contact</h4>
            <a href="#">Contact us</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & conditions</a>
          </div>
        </div>      

      </footer>
      <div className={styles.copyright}>
        Copyright &copy; 2024 BeagleProg. All Rights Reserved. Made by Bruno Amaral
      </div>
    </>
  )
}