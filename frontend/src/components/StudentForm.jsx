import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudentForm({ handleInputChange, handleAddStudent, newStudent }) {
  const [csrfToken, setCsrfToken] = useState('');

  // Effect para buscar o token CSRF quando o componente for montado
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('http://localhost:8000/get-csrf-token/');
        if (response.data.csrfToken) {
          setCsrfToken(response.data.csrfToken); // Armazena o token CSRF
        } else {
          console.error('Token CSRF não encontrado na resposta:', response.data);
        }
      } catch (error) {
        console.error('Erro ao obter CSRF token:', error);
      }
    };
    fetchCsrfToken();
  }, []);

  // Função para adicionar aluno
  const handleAddStudentWithCsrf = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/students/create/',
        newStudent,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken, // Envia o token CSRF no cabeçalho
          },
        }
      );
      console.log('Aluno adicionado com sucesso:', response.data);
      handleAddStudent(); // Atualiza a lista de alunos ou limpa o formulário
    } catch (error) {
      console.error('Erro ao adicionar aluno:', error.response?.data || error.message);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto mb-8">
      <h3 className="text-2xl font-bold mb-4">Novo Aluno</h3>
      <form>
        <label className="block text-left text-gray-700">Nome:</label>
        <input
          type="text"
          name="name"
          value={newStudent.name || ''}
          onChange={handleInputChange}
          className="w-full border border-gray-300 p-3 rounded-md mb-4"
        />
        <label className="block text-left text-gray-700">Idade:</label>
        <input
          type="number"
          name="age"
          value={newStudent.age || ''}
          onChange={handleInputChange}
          className="w-full border border-gray-300 p-3 rounded-md mb-4"
        />
        <label className="block text-left text-gray-700">Email:</label>
        <input
          type="email"
          name="email"
          value={newStudent.email || ''}
          onChange={handleInputChange}
          className="w-full border border-gray-300 p-3 rounded-md mb-4"
        />
        <label className="block text-left text-gray-700">Telefone:</label>
        <input
          type="text"
          name="phone"
          value={newStudent.phone || ''}
          onChange={handleInputChange}
          className="w-full border border-gray-300 p-3 rounded-md mb-4"
        />
        <button
          type="button"
          onClick={handleAddStudentWithCsrf}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
          Salvar Aluno
        </button>
      </form>
    </div>
  );
}

export default StudentForm;