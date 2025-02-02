import { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import logoChama from "/logos/logo-chama.png";

function Navbar() {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={styles.home_header}>
            <Link to="/" className={location.pathname === "/" ? styles.active : ""}>
                <img src={logoChama} alt="ChamaControl" className={styles.logo_image} />
            </Link>
            <button className={styles.hamburger} onClick={toggleMenu}>
                ☰
            </button>
            <nav className={`${styles.navigation} ${isMenuOpen ? styles.open : ""}`}>
                <Link to="/" className={location.pathname === "/" ? styles.active : ""}>
                    Início
                </Link>
                <Link to="/dashboard" className={location.pathname === "/dashboard" ? styles.active : ""}>
                    Dashboard
                </Link>
                <Link to="/about" className={location.pathname === "/about" ? styles.active : ""}>
                    Equipe
                </Link>
                <Link to="/news" className={location.pathname === "/news" ? styles.active : ""}>
                    Notícias
                </Link>
            </nav>
        </header>
    );
}

export default Navbar;