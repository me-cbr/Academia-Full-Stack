import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css'; // Importando o arquivo CSS

function Navbar() {
    return (
        <nav className="navbar">
            <h1 className="navbar-title">Academia</h1>
            <ul className="navbar-links">
                <li><Link to="/" className="navbar-link">Home</Link></li>
                <li><Link to="/classes" className="navbar-link">Aulas</Link></li>
                <li><Link to="/coaches" className="navbar-link">Treinadores</Link></li>
                <li><Link to="/contacts" className="navbar-link">Contato</Link></li>
                <li><Link to="/students" className="navbar-button">
                    Adicionar Aluno
                </Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
