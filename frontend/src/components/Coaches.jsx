import React, { useState, useEffect } from 'react';
import '../index.css';

function Coaches() {
    const [coachesData, setCoachesData] = useState([]);

    useEffect(() => {
        const fetchCoaches = async () => {
            try {
                const response = await fetch('http://localhost:8000/coaches/');
                const data = await response.json();
                setCoachesData(data);
            } catch (error) {
                console.error('Erro ao buscar os treinadores:', error);
            }
        };

        fetchCoaches();
    }, []);

    return (
        <div className="coaches-container">
            <h2 className="coaches-title">Nossos Treinadores</h2>

            <div className="coaches-grid">
                {coachesData.map((coach, index) => (
                    <div key={index} className="coach-card">
                        <img
                            src={coach.file || 'https://via.placeholder.com/150'}
                            alt={coach.name}
                            className="coach-image"
                        />
                        <h3 className="coach-name">{coach.name}</h3>
                        <p className="coach-details">{coach.specialization}</p>
                        <p className="coach-details">{coach.email}</p>
                        <p className="coach-details">{coach.phone}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Coaches;