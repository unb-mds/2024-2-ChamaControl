import React from "react";
import styles from "./Rodape.module.css";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";

const Rodape = () => {
  const [color, setColor] = useState("#000");
  return (
    <footer className={styles.rodape}>
      <div className={styles.rodape_conteudo}>
        
        <a href="https://www.unb.br/" target="_blank">
        <img
          src="/logos/logo-unb.png" 
          alt="UnB Logo"
          className={styles.unb_logo}
        />
        </a>
        
        
        <p>
          <a href="https://mds.lappis.rocks/" target="blank">Métodos de Desenvolvimento de Software - FGA0312</a> 
        </p>
        <p className={styles.copyright}>
          &copy; 2024 | <a href="/"><b>Chama Control</b></a>
        </p>
        <a href="https://github.com/unb-mds/2024-2-ChamaControl?tab=readme-ov-file#chamacontrol" target="blank">
        
        <FaGithub
          size={30}
          color={color}
          style={{
            marginTop: "20px",
            cursor: "pointer",
            transition: "color 0.2s ease-in-out",
          }}
          onMouseEnter={() => setColor("#f57c00")}
          onMouseLeave={() => setColor("#000")}
        />
        </a>
      </div>
    </footer>
  );
};

export default Rodape;
