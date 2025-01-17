import styles from './Register.module.css'

import { AuthContext } from "../../context/AuthContext";
import { useState, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const { register, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!nome || nome.trim() === "") {
      setMensagem({ text: "O nome é obrigatório.", type: "error" });
      return;
    }

    try {
      await register(email, senha, nome);  
      setMensagem({ text: "Usuário criado com sucesso!", type: "success" }); 
      setTimeout(() => {
        navigate('/login'); 
      }, 1000); 
  
    } catch (error) {
      setMensagem({ text: error.message, type: "error" });
    }

  };
 
  return (
    <div>
      <div className={styles.signUpContainer}>
        <div className={styles.signUpBox}>
          <h2>Criar Conta</h2>
          {mensagem && (
            <div
              className={
                mensagem.type === "error"
                  ? styles.errorMessage
                  : styles.successMessage
              }
            >
              {mensagem.text}
            </div>
          )}
          <form onSubmit={handleSignUp}>
            <div className={styles.inputGroup}>
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome completo"
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu e-mail"
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="Senha">Senha</label>
              <input
                type="password"
                id="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Sua senha"
                required
              />
            </div>
            <button type="submit" disabled={loading} className={styles.signUpButton}>
              {loading ? "Criando conta..." : "Criar Conta"}
            </button>
            <p className={styles.text}>Já tem uma conta?</p>
            <Link to="/Login" className={styles.signUpButton}>Login</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register
