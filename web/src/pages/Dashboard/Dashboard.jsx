import { useEffect, useState } from 'react';
import './Dashboard.css';
import Navbar from "../../components/Navbar/Navbar.jsx";
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import axios from 'axios';
import LoadingGraphs from "../../components/LoadingGraphs/LoadingGraphs.jsx";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
);

const Dashboard = () => {
    const currentYear = 2018;
    const currentMonth = new Date().getMonth() + 1;

    const [estateMonthData, setEstateMonthData] = useState({ labels: [], datasets: [] });
    const [regionMonthData, setRegionMonthData] = useState({ labels: [], datasets: [] });

    const [yearEstateData, setYearEstateData] = useState({ labels: [], datasets: [] });
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedYear, setSelectedYear] = useState(2016);
    const [selectedRegionYear, setSelectedRegionYear] = useState(currentYear);
    const [selectedEstateYear, setSelectedEstateYear] = useState(currentYear);
    const [selectedEstate, setSelectedEstate] = useState('PA');
    const [historicalData, setHistoricalData] = useState([]);
    const [selectedHistoricalEstate, setSelectedHistoricalEstate] = useState('PA');

    const [loadingEstateMonth, setLoadingEstateMonth] = useState(false);
    const [loadingRegion, setLoadingRegion] = useState(false);
    const [loadingYearEstate, setLoadingYearEstate] = useState(false);
    const [loadingHistorical, setLoadingHistorical] = useState(false);

    const estados = [
        { value: 'AC', label: 'Acre' },
        { value: 'AL', label: 'Alagoas' },
        { value: 'AP', label: 'Amapá' },
        { value: 'AM', label: 'Amazonas' },
        { value: 'BA', label: 'Bahia' },
        { value: 'CE', label: 'Ceará' },
        { value: 'DF', label: 'Distrito Federal' },
        { value: 'ES', label: 'Espírito Santo' },
        { value: 'GO', label: 'Goiás' },
        { value: 'MA', label: 'Maranhão' },
        { value: 'MT', label: 'Mato Grosso' },
        { value: 'MS', label: 'Mato Grosso do Sul' },
        { value: 'MG', label: 'Minas Gerais' },
        { value: 'PA', label: 'Pará' },
        { value: 'PB', label: 'Paraíba' },
        { value: 'PR', label: 'Paraná' },
        { value: 'PE', label: 'Pernambuco' },
        { value: 'PI', label: 'Piauí' },
        { value: 'RJ', label: 'Rio de Janeiro' },
        { value: 'RN', label: 'Rio Grande do Norte' },
        { value: 'RS', label: 'Rio Grande do Sul' },
        { value: 'RO', label: 'Rondônia' },
        { value: 'RR', label: 'Roraima' },
        { value: 'SC', label: 'Santa Catarina' },
        { value: 'SP', label: 'São Paulo' },
        { value: 'SE', label: 'Sergipe' },
        { value: 'TO', label: 'Tocantins' }
    ];

    const months = [
        { value: 1, label: 'Janeiro' },
        { value: 2, label: 'Fevereiro' },
        { value: 3, label: 'Março' },
        { value: 4, label: 'Abril' },
        { value: 5, label: 'Maio' },
        { value: 6, label: 'Junho' },
        { value: 7, label: 'Julho' },
        { value: 8, label: 'Agosto' },
        { value: 9, label: 'Setembro' },
        { value: 10, label: 'Outubro' },
        { value: 11, label: 'Novembro' },
        { value: 12, label: 'Dezembro' }
    ];

    const years = Array.from({ length: 2024 - 2003 + 1 }, (_, i) => 2003 + i);

    const fetchEstateData = async () => {
        try {
            setLoadingEstateMonth(true);
            const estateMonth = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/focusEstateMonthYear/${selectedMonth}/${selectedYear}`);
            setEstateMonthData({
                labels: estateMonth.data.map(item => item.estado),
                datasets: [{
                    label: 'Focos de Incêndio',
                    data: estateMonth.data.map(item => parseInt(item.quantidade_focos)),
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            });
        } catch (error) {
            console.error('Erro ao buscar dados por estado:', error);
        } finally {
            setLoadingEstateMonth(false);
        }
    };

    const fetchRegionData = async () => {
        try {
            setLoadingRegion(true);
            const regionMonth = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/focusRegionYear/${selectedRegionYear}`);
            setRegionMonthData({
                labels: regionMonth.data.map(item => item.regiao),
                datasets: [{
                    label: 'Focos de Incêndio',
                    data: regionMonth.data.map(item => parseInt(item.quantidade_focos)),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                    ],
                    borderWidth: 1
                }]
            });
        } catch (error) {
            console.error('Erro ao buscar dados por região:', error);
        } finally {
            setLoadingRegion(false);
        }
    };

    const fetchYearEstateData = async () => {
        try {
            setLoadingYearEstate(true);

            const estadoNome = estados.find(e => e.value === selectedEstate)?.label;
            const yearEstate = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/focusYearEstateYear/${estadoNome}/${selectedEstateYear}`);
            setYearEstateData({
                labels: yearEstate.data.map(item => item.mes),
                datasets: [{
                    label: `Focos de Incêndio - ${estadoNome}`,
                    data: yearEstate.data.map(item => parseInt(item.quantidade_focos)),
                    backgroundColor: 'rgba(153, 102, 255, 0.5)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                }]
            });
        } catch (error) {
            console.error('Erro ao buscar dados por estado:', error);
        } finally {
            setLoadingYearEstate(false);
        }
    };

    const fetchHistoricalData = async () => {
        try {
            setLoadingHistorical(true);

            const estadoNome = estados.find(e => e.value === selectedHistoricalEstate)?.label;
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/focusEstateAllYears/${estadoNome}`);
            setHistoricalData(response.data);
        } catch (error) {
            console.error('Erro ao buscar dados históricos:', error);
        } finally {
            setLoadingHistorical(false);
        }
    };

    useEffect(() => {
        fetchEstateData();
    }, [selectedMonth, selectedYear]);

    useEffect(() => {
        fetchRegionData();
    }, [selectedRegionYear]);

    useEffect(() => {
        fetchYearEstateData();
    }, [selectedEstateYear, selectedEstate]);

    useEffect(() => {
        fetchHistoricalData();
    }, [selectedHistoricalEstate]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                onClick: null,
            }
        }
    };

    return (
        <div className="dashboard-page">
            <Navbar/>
            <div className="dashboard-container">
                <h2>Dashboard de Focos de Incêndio</h2>
                <div className="chart-container">
                    <div className="filter-container" style={{ marginBottom: '20px', display: 'flex', gap: '20px' }}>
                        <div>
                            <label htmlFor="month-select" style={{ marginRight: '10px' }}>Mês:</label>
                            <select
                                id="month-select"
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                                style={{ padding: '5px' }}
                            >
                                {months.map(month => (
                                    <option key={month.value} value={month.value}>
                                        {month.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="year-select" style={{ marginRight: '10px' }}>Ano:</label>
                            <select
                                id="year-select"
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                                style={{ padding: '5px' }}
                            >
                                {years.map(year => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <h3>Focos por Estado ({months.find(m => m.value === selectedMonth)?.label} de {selectedYear})</h3>
                    <div style={{ height: '300px', width: '800px' }}>
                        {loadingEstateMonth ? (
                            <LoadingGraphs />
                        ) : (
                            <Bar data={estateMonthData} options={options} />
                        )}
                    </div>
                </div>

                <div className="chart-container">
                    <div className="filter-container" style={{ marginBottom: '20px', display: 'flex', gap: '20px' }}>
                        <div>
                            <label htmlFor="region-year-select" style={{ marginRight: '10px' }}>Ano:</label>
                            <select
                                id="region-year-select"
                                value={selectedRegionYear}
                                onChange={(e) => setSelectedRegionYear(parseInt(e.target.value))}
                                style={{ padding: '5px' }}
                            >
                                {years.map(year => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <h3>Focos por Região ({selectedRegionYear})</h3>
                    <div style={{ height: '300px' }}>
                        {loadingRegion ? (
                            <LoadingGraphs />
                        ) : (
                            <Pie data={regionMonthData} options={options} />
                        )}
                    </div>
                </div>

                {/* grafico inutil e sem sentido, nao implementar */}
                {/* <div className="chart-container">
                    <h3>Focos na Região Norte por Mês ({currentYear})</h3>
                    <div style={{ height: '300px' }}>
                        <Bar data={yearRegionData} options={options} />
                    </div>
                </div> */}

                <div className="chart-container">
                    <div className="filter-container" style={{ marginBottom: '20px', display: 'flex', gap: '20px' }}>
                        <div>
                            <label htmlFor="estate-select" style={{ marginRight: '10px' }}>Estado:</label>
                            <select
                                id="estate-select"
                                value={selectedEstate}
                                onChange={(e) => setSelectedEstate(e.target.value)}
                                style={{ padding: '5px' }}
                            >
                                {estados.map(estado => (
                                    <option key={estado.value} value={estado.value}>
                                        {estado.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="estate-year-select" style={{ marginRight: '10px' }}>Ano:</label>
                            <select
                                id="estate-year-select"
                                value={selectedEstateYear}
                                onChange={(e) => setSelectedEstateYear(parseInt(e.target.value))}
                                style={{ padding: '5px' }}
                            >
                                {years.map(year => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <h3>Focos em {estados.find(e => e.value === selectedEstate)?.label} por Mês ({selectedEstateYear})</h3>
                    <div style={{ height: '300px' }}>
                        {loadingYearEstate ? (
                            <LoadingGraphs />
                        ) : (
                            <Bar data={yearEstateData} options={options} />
                        )}
                    </div>
                </div>

                <div className="chart-container">
                    <div className="filter-container" style={{ marginBottom: '20px', display: 'flex', gap: '20px' }}>
                        <div>
                            <label htmlFor="historical-estate-select" style={{ marginRight: '10px' }}>Estado:</label>
                            <select
                                id="historical-estate-select"
                                value={selectedHistoricalEstate}
                                onChange={(e) => setSelectedHistoricalEstate(e.target.value)}
                                style={{ padding: '5px' }}
                            >
                                {estados.map(estado => (
                                    <option key={estado.value} value={estado.value}>
                                        {estado.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <h3>Histórico de Focos de Incêndio em {estados.find(e => e.value === selectedHistoricalEstate)?.label}</h3>
                    <div className="table-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {loadingHistorical ? (
                            <LoadingGraphs />
                        ) : (
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                                <thead style={{ position: 'sticky', top: 0, background: 'white' }}>
                                    <tr>
                                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Ano</th>
                                        {months.map(month => (
                                            <th key={month.value} style={{ padding: '8px', border: '1px solid #ddd' }}>
                                                {month.label}
                                            </th>
                                        ))}
                                        <th style={{ padding: '8px', border: '1px solid #ddd' }}>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {years.map(year => {
                                        const yearData = historicalData.filter(item => item.ano === year);
                                        const yearTotal = yearData.reduce((sum, item) => sum + parseInt(item.quantidade_focos || 0), 0);
                                        
                                        return (
                                            <tr key={year}>
                                                <td style={{ padding: '8px', border: '1px solid #ddd', fontWeight: 'bold' }}>{year}</td>
                                                {months.map(month => {
                                                    const monthData = yearData.find(item => item.mes === month.value);
                                                    return (
                                                        <td key={month.value} style={{ padding: '8px', border: '1px solid #ddd' }}>
                                                            {monthData ? monthData.quantidade_focos : '-'}
                                                        </td>
                                                    );
                                                })}
                                                <td style={{ padding: '8px', border: '1px solid #ddd', fontWeight: 'bold' }}>{yearTotal}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;