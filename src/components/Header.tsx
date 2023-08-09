import logo from '../images/logo.png'
import styles from '../assets/css/Header.module.css'
import { NavLink } from 'react-router-dom';

const Header = () => {
    return <header className={styles.head}>
        <NavLink to={'/'}><img src={logo} alt='logo' className={styles.logo} /></NavLink>
        <div className={styles.text}>
            <h1>HG Weather Alert</h1>
        </div>
    </header>
};

export default Header;