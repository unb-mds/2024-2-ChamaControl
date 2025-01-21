import { useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

import { Link } from "react-router-dom";
import logoPng from "../../public/assets/logo-png.png";

function Navbar() {
    const location = useLocation();

    return (
        <div className={styles.home_header}>
            <img src={logoPng} alt="ChamaControl" className="logo-image" />
            <nav className={styles.navigation}>
                <Link to="/" className={location.pathname === "/" ? styles.active : ""}>Início</Link>
                <Link to="/maps" className={location.pathname === "/maps" ? styles.active : ""}>Consultar Mapa</Link>
                <Link to="/about" className={location.pathname === "/about" ? styles.active : ""}>Equipe</Link>
            </nav>
            <div className={styles.nav_actions}>
                <Link to="/alert">
                    <button className={styles.alert_button}>Receber Alertas</button>
                </Link>
            </div>
        </div>
    );
}

export default Navbar;
