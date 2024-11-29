import React, { useState, useEffect } from 'react';
import '../index.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/get-csrf-token/');
        const data = await response.json();
        setCsrfToken(data.csrfToken);
      } catch (error) {
        console.error('Erro ao obter CSRF token:', error);
      }
    };
    fetchCsrfToken();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/contacts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar a mensagem');
      }

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Error:', error);
      alert('Falha ao enviar a mensagem');
    }
  };

  return (
    <div className="contact-container">
      <h2 className="contact-heading">Contato</h2>
      <div className="contact-form-container">
        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Nome</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">E-mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Telefone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Mensagem</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-textarea"
                rows="4"
                required
              ></textarea>
            </div>
            <button className="submit-button">Enviar</button>
          </form>
        </div>
        <div>
          <h3 className="contact-info">Informações</h3>
          <p>Telefone: (XX) XXXX-XXXX</p>
          <p>E-mail: contato@academia.com</p>
          <p>Endereço: Rua Exemplo, 123 - Cidade</p>
          <p>Horário de Funcionamento: Segunda a Sexta, 6h - 22h</p>
        </div>
      </div>
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.224589634198!2d-122.41941578468153!3d37.77492927975967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809a49f2f0f3%3A0x165b3be4ec8e9b54!2sAcademia%20Exemplo!5e0!3m2!1spt-BR!2sbr!4v1631234567890!5m2!1spt-BR!2sbr"
          title="Academia Exemplo"
        ></iframe>
      </div>
    </div>
  );
}

export default Contact;
