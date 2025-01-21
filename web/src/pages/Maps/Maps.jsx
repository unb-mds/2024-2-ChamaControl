import { useEffect, useState } from 'react';
import './Maps.css';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement,  CategoryScale, LinearScale, BarElement, LogarithmicScale } from 'chart.js';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

import Navbar from "../../components/Navbar/Navbar.jsx"

ChartJS.register(CategoryScale, LogarithmicScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);


const Maps = () => {
    const [selectedRegion, setSelectedRegion] = useState("Norte");
    const [selectedYear, setSelectedYear] = useState(2011);
    const [totalFocos, setTotalFocos] = useState(0);
    const [chartData, setChartData] = useState(null);
    const [comparison, setComparison] = useState(null);

    const regions = ["Norte", "Nordeste", "Centro-oeste", "Sudeste", "Sul"];
    const years = Array.from({ length: 2023 - 2003 + 1 }, (_, i) => 2003 + i);

    useEffect(() => {
        setChartData(null)
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/focusYearRegionYear/${selectedRegion}/${selectedYear}`
                );
                const apiData = response.data;

                // const labels = apiData.map((item) => `Mês ${item.mes}`);
                // const data = apiData.map((item) => item.quantidade_focos);
                
                const totalFocosCurrent = apiData.reduce((sum, item) => sum + item.quantidade_focos, 0);
                
                setChartData({
                    labels: [`Ano ${selectedYear}`], // Exibe apenas o ano
                    datasets: [
                        {
                            data: [totalFocosCurrent], // Só usa o total de focos do ano
                            backgroundColor: ['#FF6384'],
                            borderColor: 'white',
                            borderWidth: 1,
                        },
                    ],
                });

                // const totalFocosCurrent = data.reduce((sum, value) => sum + value, 0)

                if (selectedYear > 2003) {
                    const responsePrevious = await axios.get(
                        `http://localhost:3000/api/focusYearRegionYear/${selectedRegion}/${selectedYear - 1}`
                    );
                    const apiDataPrevious = responsePrevious.data;
    
                    const totalFocosPrevious = apiDataPrevious.reduce((sum, item) => sum + item.quantidade_focos, 0);
    
                    const diffPercentage = ((totalFocosCurrent - totalFocosPrevious) / totalFocosPrevious) * 100;
                    setComparison(diffPercentage.toFixed(2));
                } else {
                    setComparison(null);
                }

                setTotalFocos(totalFocosCurrent)
                // setChartData({
                //     labels,
                //     datasets: [
                //         {
                //             data,
                //             backgroundColor: [
                //                 '#FF6384', '#36A2EB', '#FFCE56', '#FF6384',
                //                 '#36A2EB', '#FFCE56', '#FF6384', '#36A2EB',
                //                 '#FFCE56', '#FF6384', '#36A2EB', '#FFCE56',
                //             ],
                //             borderColor: 'white',
                //             borderWidth: 1,
                //         },
                //     ],
                // });
            } catch (error) {
                console.error("Erro ao buscar dados da API:", error);
            }
        };

        fetchData();
    }, [selectedRegion, selectedYear]);


    return (
        <div className="maps-page">
            <Navbar/>

            <main className="maps-content">
                <section className="map-section">
                    <h2>Foco de Queimadas</h2>
                    <div className="map-placeholder">
                    
                    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[51.505, -0.09]}>
                            <Popup>
                             A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    </MapContainer>,
                    
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
                        <br></br>
                        <p><strong>Total de Focos:</strong> {totalFocos ? (totalFocos) : <span>Carregando...</span>}</p>
                        {comparison !== null && (
                            <p>
                                <strong>Comparativo com {selectedYear - 1}: </strong> 
                                {comparison > 0 ? `${comparison}% maior` : `${Math.abs(comparison)}% menor`}
                            </p>
                        )}
                        {comparison === null && (
                            <p><strong>Comparativo com {selectedYear - 1}:</strong> Não disponível</p>
                        )}
                        {/* <p><strong>Frequência Anual:</strong> XX</p>  */}
                    </div>
                </aside>
                <section className="chart-section">
                    <section className="chart-placeholder">
                        {chartData ? (
                            <Bar data={chartData} options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                    title: {
                                        display: true,
                                        text: `Focos de Queimadas - Região ${selectedRegion} (${selectedYear})`,
                                    },
                                },
                                scales: {
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Ano',
                                        },
                                    },
                                    y: {
                                        type: 'linear', // Escala linear
                                        title: {
                                            display: true,
                                            text: 'Quantidade de Focos',
                                        },
                                    },
                                },                                
                                // scales: {
                                //     x: {
                                //         title: {
                                //             display: false,
                                //             text: 'Meses',
                                //         },
                                //     },
                                //     y: {
                                //         type: 'logarithmic',
                                //         title: {
                                //             display: true,
                                //             text: 'Quantidade de Focos',
                                //         },
                                //         ticks: {
                                //             display: false,
                                //             drawTicks: false,
                                //         },
                                //         grid: {
                                //             drawOnChartArea: false,
                                //             drawTicks: false,
                                //         },
                                //     },
                                // },
                            }} />
                        ) : (
                            <p>Carregando gráfico...</p>
                        )}
                    </section>
                </section>
            </main>
        </div>
    );
};

export default Maps;