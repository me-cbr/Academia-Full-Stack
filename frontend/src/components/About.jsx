import React from 'react';
import '../index.css';

function About() {
    return (
        <div className="about-container">
            <h2 className="about-title">Sobre Nós</h2>
            <p className="about-paragraph">
                Nossa academia oferece uma variedade de serviços para atender às suas necessidades de fitness. Com equipamentos modernos e treinadores qualificados, garantimos que você terá uma experiência de treino excepcional.
            </p>
            <p className="about-paragraph">
                Oferecemos aulas de grupo, treinos personalizados e programas de nutrição para ajudar você a alcançar seus objetivos. Se você é iniciante ou um atleta experiente, temos algo para todos!
            </p>
            <p className="about-paragraph">
                Venha nos visitar e descubra um ambiente acolhedor e motivador, onde a saúde e o bem-estar são prioridades. Estamos ansiosos para ajudá-lo em sua jornada de fitness!
            </p>
        </div>
    );
}

export default About;