import { useState, useEffect } from 'react';

import './Home.css';

import Navbar from '../../components/Navbar/Navbar.jsx';
import Rodape from '../../components/Rodape/Rodape.jsx';

// Importando as imagens para desktop e mobile
import bannerDashboardDesktop from '/banners/banner-dashboard-desktop.png';
import bannerDashboardMobile from '/banners/banner-dashboard-mobile.png';
import bannerNewsDesktop from '/banners/banner-noticias-desktop.png';
import bannerNewsMobile from '/banners/banner-noticias-mobile.png';

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600); // Definindo se é mobile

    // Definir as imagens corretas baseado no tamanho da tela
    const slides = [
        {
            image: isMobile ? bannerDashboardMobile : bannerDashboardDesktop,
            alt: 'Consultar Dashboard',
            link: '/dashboard',
        },
        {
            image: isMobile ? bannerNewsMobile : bannerNewsDesktop,
            alt: 'Ver Notícias',
            link: '/news',
        },
    ];

    // Atualizar quando a tela for redimensionada
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 850);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Configuração do slide automático
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 4000);

        return () => clearInterval(interval);
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
