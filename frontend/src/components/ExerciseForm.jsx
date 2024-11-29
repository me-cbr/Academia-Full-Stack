import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';

function ExerciseForm() {
    const [exerciseName, setExerciseName] = useState('');
    const [reps, setReps] = useState('');
    const [sessions, setSessions] = useState('');
    const [coachName, setCoachName] = useState([]);
    const [classes, setClasses] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // Novo estado para mensagem de sucesso
    const [csrfToken, setCsrfToken] = useState('');
    const [coaches, setCoaches] = useState([]);
    const [availableClasses, setAvailableClasses] = useState([]);

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await axios.get('http://localhost:8000/get-csrf-token/');
                setCsrfToken(response.data.csrfToken); // Armazena o token CSRF
            } catch (error) {
                console.error('Erro ao obter CSRF token:', error);
            }
        };
        fetchCsrfToken();
    }, []);

    useEffect(() => {
        const fetchCoachesAndClasses = async () => {
            try {
                const [coachesResponse, classesResponse] = await Promise.all([
                    axios.get('http://localhost:8000/coaches/'),
                    axios.get('http://localhost:8000/classes/'),
                ]);
                setCoaches(coachesResponse.data);
                setAvailableClasses(classesResponse.data);
            } catch (error) {
                console.error('Erro ao carregar coaches ou classes:', error);
            }
        };

        fetchCoachesAndClasses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!exerciseName || !reps || !sessions || !coachName.length || !classes) {
            setError('Todos os campos são obrigatórios!');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:8000/exercises/',
                {
                    name: exerciseName,
                    repetitions: reps,
                    sessions: sessions,
                    coach_name: coachName,
                    classes: classes,
                },
                {
                    headers: {
                        'X-CSRFToken': csrfToken,
                    },
                }
            );
            console.log('Exercício adicionado:', response.data);
            setExerciseName('');
            setReps('');
            setSessions('');
            setCoachName([]);
            setClasses('');
            setSuccessMessage('Exercício adicionado com sucesso!');
        } catch (err) {
            console.error('Erro ao enviar exercício:', err);
            setError('Erro ao adicionar exercício');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="exercise-form">
            <div className="form-group">
                <label htmlFor="exerciseName">Nome do Exercício:</label>
                <input
                    type="text"
                    id="exerciseName"
                    value={exerciseName}
                    onChange={(e) => setExerciseName(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="exerciseReps">Repetições:</label>
                <input
                    type="number"
                    id="exerciseReps"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="exerciseSessions">Sessões:</label>
                <input
                    type="number"
                    id="exerciseSessions"
                    value={sessions}
                    onChange={(e) => setSessions(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="coachName">Coaches:</label>
                <select
                    id="coachName"
                    multiple
                    value={coachName}
                    onChange={(e) => setCoachName([...e.target.selectedOptions].map(option => option.value))}
                    required
                >
                    {coaches.map(coach => (
                        <option key={coach.id} value={coach.id}>
                            {coach.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="classes">Classe:</label>
                <select
                    id="classes"
                    value={classes}
                    onChange={(e) => setClasses(e.target.value)}
                    required
                >
                    <option value="">Selecione uma classe</option>
                    {availableClasses.map(classItem => (
                        <option key={classItem.id} value={classItem.id}>
                            {classItem.name}
                        </option>
                    ))}
                </select>
            </div>

            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <button type="submit" className="toggle-button">Adicionar Exercício</button>
        </form>
    );
}

export default ExerciseForm;