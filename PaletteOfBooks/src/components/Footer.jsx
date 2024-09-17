import styles from '../Styles/Footer.module.css';
import {FaFacebook, FaInstagram, FaLinkedin, FaGithub} from 'react-icons/fa'

export function Footer(){
  return(
    <footer className={styles.footer}>
      <span className={styles.blur}></span>
      <span className={styles.blur}></span>

      <div className={styles.container}>
        <div className={styles.column}>
          <div className={styles.logo}>
            <img src="./beagle.png" alt="Beagle logo" />
          </div>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>

          <div className={styles.social}>
            <a href="#"><FaFacebook size={32} className={styles.social_icon} /></a>
            <a href="#"><FaInstagram size={32} className={styles.social_icon} /></a>
            <a href="#"><FaLinkedin size={32} className={styles.social_icon} /></a>
            <a href="#"><FaGithub size={32} className={styles.social_icon} /></a>
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
  )
}