import React from "react";
import styles from "./Rodape.module.css";
import { FaGithub } from "react-icons/fa";

const Rodape = () => {
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
        <FaGithub size={30} color="#000" style={{ marginTop: "20px" }}/>
        </a>

      </div>
    </footer>
  );
};

export default Rodape;
