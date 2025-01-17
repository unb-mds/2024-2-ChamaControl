import { useState, useEffect } from 'react';
import './Home.css';
import Navbar from '../../layout/Navbar';

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        {
            image: '/src/assets/banners/banner-maps.png',
            alt: 'Consultar Mapa',
            link: '/maps',
        },
        {
            image: '/src/assets/banners/banner-alerts.png',
            alt: 'Receber Alertas',
            link: '/alert',
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 4000); // Alterna a cada 4 segundos

        return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
    }, [slides.length]);

    return (
        <div className="home-page">
            <Navbar/>

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
                    O ChamaControl foi criado com o objetivo de monitorar e combater queimadas em
                    todo o território nacional. Nosso sistema fornece informações atualizadas sobre
                    focos de queimadas e notícias relacionadas. Além disso, oferecemos alertas
                    personalizados para que você possa acompanhar a situação da sua região e
                    tomar decisões mais informadas. Juntos, podemos contribuir para um ambiente
                    mais saudável e sustentável.
                </p>
            </section>
        </div>
    );
};

export default Home;
