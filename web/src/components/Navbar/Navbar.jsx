import { useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
    const location = useLocation();

    return (
        <div className={styles.home_header}>
            <img src="/src/assets/logo-png.png" alt="ChamaControl" className="logo-image" />
            <nav className={styles.navigation}>
                <a href="/" className={location.pathname === "/" ? styles.active : ""}>Início</a>
                <a href="/maps" className={location.pathname === "/maps" ? styles.active : ""}>Consultar Mapa</a>
                <a href="/about" className={location.pathname === "/about" ? styles.active : ""}>Equipe</a>
            </nav>
            <div className={styles.nav_actions}>
                <a href="/alert">
                    <button className={styles.alert_button}>Receber Alertas</button>
                </a>
            </div>
        </div>
    );
}

export default Navbar;
