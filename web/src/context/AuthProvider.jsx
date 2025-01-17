import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Estado do usuário
    const [loading, setLoading] = useState(false); // Estado de carregamento
  
    // Função de login
    const login = async (email, senha) => {
      setLoading(true);
      try {
        const response = await axios.post('http://localhost:3000/api/login', { email, senha });
        setUser({ email: response.data.email }); // Supondo que a resposta tenha o e-mail
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error.response.data.error)
        throw new Error(error.response.data.error);
      }
    };
  
    // Função de logout
    const logout = () => {
      setUser(null); // Remove o usuário
    };
  
    // Função de registro
    const register = async (email, senha, nome) => {
      setLoading(true);
      try {
        const response = await axios.post('http://localhost:3000/api/users', { email, senha, nome });
        setUser({ email: response.data.email }); 
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error.response.data.error)
        throw new Error(error.response.data.error);
      }
    };
  
    const value = {
      user,
      login,
      logout,
      register,
      loading
    };
  
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired, 
  };
  