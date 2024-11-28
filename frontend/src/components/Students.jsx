import React, { useState, useEffect } from 'react';
import Modal from './Modal'; // Importar o Modal
import StudentForm from './StudentForm'; // Importar o Formulário
import ExerciseForm from './ExerciseForm'; // Importar o ExerciseForm
import '../styles.css'; // Importar o arquivo CSS

function Students() {
    const [students, setStudents] = useState([]);
    const [newStudent, setNewStudent] = useState({ name: '', age: '', email: '', phone: '' });
    const [isLoaded, setIsLoaded] = useState(false); // Estado para controlar o carregamento dos alunos
    const [showStudents, setShowStudents] = useState(false); // Estado para controlar a exibição dos alunos
    const [buttonText, setButtonText] = useState('Carregar Alunos'); // Estado para o texto do botão

    const fetchStudents = async () => {
        try {
            const response = await fetch('http://localhost:8000/students/');
            const data = await response.json();
            setStudents(data);
            setIsLoaded(true);
        } catch (error) {
            console.error("Erro ao buscar alunos:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStudent((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddStudent = () => {
        setStudents([...students, { ...newStudent, id: Date.now() }]);
        setNewStudent({ name: '', age: '', email: '', phone: '' });
    };

    // Função para alternar a exibição dos alunos
    const toggleShowStudents = () => {
        if (showStudents) {
            setShowStudents(false); // Oculta a lista de alunos
            setButtonText('Carregar Alunos'); // Altera o texto para "Carregar Alunos"
        } else {
            setShowStudents(true); // Exibe a lista de alunos
            setButtonText('Mostrar Menos'); // Altera o texto para "Mostrar Menos"
        }
    };

    return (
        <section className="py-20 bg-gray-100 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Lista de Alunos</h2>

            {/* Formulário para adicionar novo aluno */}
            <StudentForm
                handleInputChange={handleInputChange}
                handleAddStudent={handleAddStudent}
                newStudent={newStudent}
            />

            {/* Botão único que alterna entre "Carregar Alunos" e "Mostrar Menos" */}
            <button
                onClick={() => {
                    if (!isLoaded) {
                        fetchStudents(); // Carrega os alunos se ainda não foi carregado
                    } else {
                        toggleShowStudents(); // Alterna entre mostrar e esconder alunos
                    }
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mb-4">
                {buttonText} {/* Alterna entre "Carregar Alunos" e "Mostrar Menos" */}
            </button>

            {/* Exibição da lista de alunos */}
            {isLoaded && showStudents && (
                <div className="max-w-lg mx-auto mt-4">
                    <ul className="space-y-4">
                        {students.map((student) => (
                            <li key={student.id} className="bg-white p-4 rounded-lg shadow-md text-left">
                                <h4 className="text-lg font-semibold text-gray-800">{student.name}</h4>
                                <p className="text-gray-600">Idade: {student.age}</p>
                                <p className="text-gray-600">Email: {student.email}</p>
                                <p className="text-gray-600">Telefone: {student.phone}</p>

                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
}

export default Students;
