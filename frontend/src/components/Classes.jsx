import React, { useState, useEffect } from 'react';
import '../index.css';

function Classes() {
    const [classesData, setClassesData] = useState([]);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await fetch('http://localhost:8000/classes/');
                const data = await response.json();
                setClassesData(data);
            } catch (error) {
                console.error('Erro ao buscar as classes:', error);
            }
        };

        fetchClasses();
    }, []);

    return (
        <div className="classes-container">
            <h2 className="classes-title">Nossas Aulas</h2>
            <div className="classes-table-container">
                <table className="classes-table">
                    <thead>
                        <tr>
                            <th>Nome da Aula</th>
                            <th>Imagem</th>
                            <th>Descrição</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classesData.map((classItem, index) => (
                            <tr key={index} className="classes-table-row">
                                <td>{classItem.name}</td>
                                <td>
                                    <img
                                        src={classItem.file || 'https://via.placeholder.com/300x200'}
                                        alt={classItem.name}
                                        className="classes-image"
                                    />
                                </td>
                                <td>{classItem.description || 'Descrição não disponível.'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Classes;