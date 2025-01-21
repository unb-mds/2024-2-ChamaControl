import { useState } from 'react';
import './Alert.css';
import Navbar from '../../components/Navbar/Navbar.jsx';

const Alert = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [region, setRegion] = useState('Brasil');

    const regions = ['Brasil', 'Norte', 'Nordeste', 'Centro-oeste', 'Sudeste', 'Sul'];

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Nome: ${name}\nEmail: ${email}\nRegião: ${region}`);
        // Lógica para enviar os dados para o backend aqui
    };

    return (
        <div className="alert-page">
            <Navbar/>

            {/* Formulário */}
            <main className="alert-content">
                <h1>Receber Notificações</h1>
                <form className="alert-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nome:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Digite seu nome"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Digite seu email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="region">Região:</label>
                        <select
                            id="region"
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                        >
                            {regions.map((region) => (
                                <option key={region} value={region}>
                                    {region}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="submit-button">
                        Enviar
                    </button>
                </form>
            </main>
        </div>
    );
};

export default Alert;
