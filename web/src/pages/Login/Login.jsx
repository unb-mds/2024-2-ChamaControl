import styles from "./Login.module.css";

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState(""); // Alterado de username para email
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const navigate = useNavigate(); // Hook para redirecionamento
  const { login, loading } = useContext(AuthContext); // Usar o contexto

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(email, senha);
      setMensagem({ text: "Usuário logado com sucesso!", type: "success" }); 
      setTimeout(() => {
        navigate('/'); 
      }, 1000); 
  
    } catch (Error) {
      setMensagem({ text: Error.message, type: "error" });
    } 
  };

  return (
    <div className="pageWrapper">
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <h2>Fazer Login</h2>
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
          <form onSubmit={handleLogin}>
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
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Sua senha"
                required
              />
            </div>
            <button
              type="submit"
              className={styles.loginButton}
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
            <p className={styles.text}>Não tem uma conta?</p>
            <Link to="/Register" className={styles.loginButton}>Criar conta</Link>
          </form>
        </div>
      </div>

    </div>
  );
};

export default LoginPage;

