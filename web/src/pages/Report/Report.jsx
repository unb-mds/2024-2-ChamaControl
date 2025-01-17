import { useState } from 'react';
import './Report.css';

const Report = () => {
    const [info, setInfo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Relatório enviado:', info);
    };

    return (
        <div className="report">
            <h1>Enviar Relatório</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={info}
                    onChange={(e) => setInfo(e.target.value)}
                    placeholder="Descreva as informações do relatório..."
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};

export default Report;
