import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

function Home() {
    return (
        <section className="relative py-20 bg-gray-100 text-center">
            <div className="banner mb-8 relative">
                <img
                    src="https://www.embraplan.com.br/imagens/noticias/11b986fc-d5a6-49a8-ba84-7cbbe8b6f93e.jpg"
                    alt="Banner da Academia"
                    className="banner-img"
                />
                <div className="banner-text">
                    <h1>Bem-vindo à Nossa Academia!</h1>
                    <p>Aqui você encontrará os melhores treinos e dicas de saúde para alcançar seus objetivos!</p>
                    <Link to="/about" className="banner-button">
                        Saiba Mais
                    </Link>
                </div>
            </div>

            <div className="dicas-saude bg-white">
                <h2>Dicas de Saúde</h2>
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="card">
                        <h3>Mantenha-se Hidratado</h3>
                        <p>Beber água regularmente é fundamental para manter a saúde e o desempenho físico.</p>
                    </div>
                    <div className="card">
                        <h3>Alimente-se Bem</h3>
                        <p>Uma dieta equilibrada, rica em frutas e vegetais, é essencial para um bom funcionamento do corpo.</p>
                    </div>
                    <div className="card">
                        <h3>Exercite-se Regularmente</h3>
                        <p>Realizar atividades físicas de forma regular melhora a saúde cardiovascular e aumenta a energia.</p>
                    </div>
                </div>
            </div>

            <div className="video-section mt-12">
                <h2>Confira Nosso Vídeo</h2>
                <div className="flex justify-center">
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/-MyTwgT95NU?si=CHx3VL1tkGK1hy0q"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen>
                    </iframe>
                </div>
            </div>
        </section>
    );
}

export default Home;
