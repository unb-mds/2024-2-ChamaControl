import Navbar from '../../components/Navbar/Navbar.jsx';

import './About.css';

import logoGithub from '/logos/logo-github.png';
import Rodape from '../../components/Rodape/Rodape.jsx';

const members = [
    {
        name: 'Artur Krauspenhar',
        role: 'Backend',
        github: 'https://github.com/Arturhk05',
        photo: 'https://github.com/Arturhk05.png',
    },
    {
        name: 'Diassis Nascimento',
        role: 'Backend',
        github: 'https://github.com/Diaxiz',
        photo: 'https://github.com/Diaxiz.png',
    },
    {
        name: 'Eduardo Morais',
        role: 'Frontend',
        github: 'https://github.com/Edumorais08',
        photo: 'https://github.com/Edumorais08.png',
    },
    {
        name: 'Filipe Bressanelli',
        role: 'Backend',
        github: 'https://github.com/fbressa',
        photo: 'https://github.com/fbressa.png',
    },
    {
        name: 'Gustavo Gontijo',
        role: 'Frontend',
        github: 'https://github.com/Guga301104',
        photo: 'https://github.com/Guga301104.png',
    },
    {
        name: 'Leonardo Sauma',
        role: 'Frontend',
        github: 'https://github.com/leohssjr',
        photo: 'https://github.com/leohssjr.png',
    },
];

const About = () => {
    return (
        <div className="about-page">
            {/* Fundo com fotos */}
            <div className="background">
                {members.map((member, index) => (
                    <img
                        key={index}
                        src={member.photo}
                        alt={member.name}
                        className="background-photo"
                    />
                ))}
            </div>

            {/* Navbar */}
            <Navbar />

            {/* Conteúdo */}
            <main className="about-content">
                <section className="about-intro">
                    <h1>Quem somos nós?</h1>
                    <p>
                        Somos alunos de Engenharia de Software. Este projeto foi confeccionado para a disciplina
                        de Métodos de Desenvolvimento de Software, lecionada pela professora <a href="https://carlarocha.org/" target="_blank" rel="noopener noreferrer">Carla Rocha</a>. Nosso
                        objetivo é oferecer uma solução tecnológica para o monitoramento e maior transparência sobre as queimadas no Brasil.
                    </p>
                </section>

                {/* Membros */}
                <section className="members-section">
                    {members.map((member, index) => (
                        <div key={index} className="member-card">
                            <div className="member-photo">
                                <img src={member.photo} alt={member.name} />
                            </div>
                            <div className="member-info">
                                <h3>{member.name}</h3>
                                <p>{member.role}</p>
                                <a href={member.github} target="_blank" rel="noopener noreferrer">
                                    <img src={logoGithub} alt="GitHub" className="github-icon" />
                                    GitHub
                                </a>
                            </div>
                        </div>
                    ))}
                </section>
            </main>
            <Rodape/>
        </div>
    );
};

export default About;
