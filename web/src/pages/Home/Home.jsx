import { useState, useEffect } from 'react';

import './Home.css';

import Navbar from '../../components/Navbar/Navbar.jsx';
import Rodape from '../../components/Rodape/Rodape.jsx';

import bannerMaps from '/banners/banner-maps.png';
import bannerAlerts from '/banners/banner-alerts.png';


const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        {
            image: bannerMaps,
            alt: 'Consultar Mapa',
            link: '/',
        },
        {
            image: bannerAlerts,
            alt: 'Receber Alertas',
            link: '/',
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 4000); // Alterna a cada 4 segundos

        return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
    }, [slides.length]);

    return (
        <>
            <Navbar />
            <div className="home-page">
                {/* Banner com Slider */}
                <div className="banner-slider">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`slide ${index === currentSlide ? 'active' : ''}`}
                        >
                            <a href={slide.link}>
                                <img
                                    src={slide.image}
                                    alt={slide.alt}
                                    className="banner-image"
                                />
                            </a>
                        </div>
                    ))}
                </div>

                {/* Sobre o projeto */}
                <section className="about-project">
                    <h1>Sobre o ChamaControl</h1>
                    <p>
                        O ChamaControl foi desenvolvido para monitorar e informar sobre queimadas em todo o território nacional. Nosso sistema utiliza como fonte a base de dados do <a href="https://terrabrasilis.dpi.inpe.br/queimadas/portal/" target="_blank" rel="noopener noreferrer">INPE</a> para fornecer informações atualizadas por meio de gráficos interativos, permitindo uma visualização clara dos focos de incêndio. Com isso, buscamos facilitar o acesso a dados relevantes e contribuir para um maior entendimento sobre a situação das queimadas no país.
                    </p>
                </section>

            </div>
            <Rodape />
        </>
    );
};

export default Home;
