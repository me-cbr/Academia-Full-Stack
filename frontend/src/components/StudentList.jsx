import React, { useState, useEffect } from "react";
import '../index.css';  // Importando o arquivo CSS

const StudentList = () => {
  const [users, setUsers] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [visibleExercises, setVisibleExercises] = useState({});

  // Função para alternar a visibilidade da lista de exercícios
  const toggleExercises = (userName) => {
    setVisibleExercises((prevState) => ({
      ...prevState,
      [userName]: !prevState[userName],
    }));
  };

  // Função para buscar os usuários e os exercícios da API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Buscar dados de estudantes
        const studentsResponse = await fetch('http://localhost:8000/students/');
        const studentsData = await studentsResponse.json();
        setUsers(studentsData);

        // Se você tem exercícios relacionados, pode fazer outra requisição para buscá-los
        // const exercisesResponse = await fetch('http://localhost:8000/api/exercises/');
        // const exercisesData = await exercisesResponse.json();
        // setExercises(exercisesData);

      } catch (error) {
        console.error("Erro ao buscar dados", error);
      }
    };

    fetchData();
  }, []);  // O array vazio faz a requisição quando o componente for montado

  return (
    <div>
      <h2>Lista de Usuários</h2>
      {users.length === 0 && <p>Nenhum usuário cadastrado.</p>}
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <div className="user-item">
              <strong>{user.name}</strong>
              <p>{user.email}</p>
              <p>{user.age} anos</p>
              <p>{user.phone}</p>
              <button
                className="toggle-exercise-button"
                onClick={() => toggleExercises(user.name)}
              >
                {visibleExercises[user.name] ? "Fechar" : "Abrir mais"}
              </button>
            </div>
            {/* Exibe ou esconde a lista de exercícios */}
            {visibleExercises[user.name] && (
              <ul className="exercise-list">
                {exercises
                  .filter((exercise) => exercise.user === user.name)
                  .map((exercise, idx) => (
                    <li key={idx}>{exercise.exerciseName}</li>
                  ))}
                {exercises.filter((exercise) => exercise.user === user.name)
                  .length === 0 && <li>Nenhum exercício aplicado.</li>}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
