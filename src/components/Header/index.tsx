import styles from './styles.module.scss';
import logo from '../../assets/logo.jpg';

const Header = () => (
  <header className={styles.header}>
    <img src={logo} alt="elogroup" />
    <h1>Elogroup</h1>
  </header>
);

export default Header;
