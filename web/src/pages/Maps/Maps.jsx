import { useState } from 'react';
import './Maps.css';
import Navbar from '../../layout/Navbar';

const Maps = () => {
    const [selectedRegion, setSelectedRegion] = useState("Brasil");
    const [selectedYear, setSelectedYear] = useState(2024);

    const regions = ["Brasil", "Norte", "Nordeste", "Centro-oeste", "Sudeste", "Sul"];
    const years = Array.from({ length: 2024 - 2003 + 1 }, (_, i) => 2003 + i);

    return (
        <div className="maps-page">
            <Navbar/>

            <main className="maps-content">
                <section className="map-section">
                    <h2>Foco de Queimadas</h2>
                    <div className="map-placeholder">
                        {/* Aqui vai o mapa */}
                        <p>Mapa interativo será carregado aqui</p>
                    </div>
                </section>
                <aside className="stats-section">
                    <div className="selected-region">
                        <h3>Região selecionada:</h3>
                        <select
                            value={selectedRegion}
                            onChange={(e) => setSelectedRegion(e.target.value)}
                        >
                            {regions.map((region) => (
                                <option key={region} value={region}>
                                    {region}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="selected-year">
                        <h3>Ano selecionado:</h3>
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                        >
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="statistics">
                        <h3>Estatísticas</h3>
                        <p><strong>Número de Focos de Queimadas:</strong> XX focos</p>
                        <p><strong>Comparativo com o passado:</strong> XX% maior</p>
                        <p><strong>Frequência Anual:</strong> XX</p>
                        <p><strong>Intensidade:</strong> X</p>
                    </div>
                </aside>
                <section className="chart-section">
                    <h3>Gráfico de Queimadas</h3>
                    <div className="chart-placeholder">
                        {/* Aqui vai o gráfico */}
                        <p>Gráfico será carregado aqui</p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Maps;
