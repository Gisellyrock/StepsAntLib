import { useState } from 'react';
import './style.css';
import { FormControl } from 'react-bootstrap';
import MaskInput from './maskInput';
import { useNavigate } from 'react-router-dom';
import { useLoadingWatch } from '../../hooks/useLoadingWatch';

const LoginPage = () => {
  const [protocol, setProtocol] = useState('');
  const [cpf, setCpf] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useLoadingWatch(loading);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!protocol || !cpf || cpf.length !== 14) {
      setError('Por favor, preencha todos os campos corretamente.');
      return;
    }
    const newCpf = cpf.replace(/[.-]/g, '');

    setLoading(true);
    try {
      const response = await fetch(
        'https://',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ protocol, cpf: newCpf }),
        },
      );

      if (!response.ok) {
        throw new Error('Data not found');
      }

      const dataExist = await response.json();

      sessionStorage.setItem(
        'session',
        JSON.stringify({ protocol, cpf: newCpf }),
      );

      if (!dataExist.length) {
        setError('Dados inválidos. Por favor, tente novamente.');
        return;
      }

      navigate('/registration-process');
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-login">
      <div className="login-card">
        <div className="login-top">
          <p>PROTOCOLOS (ESCRITURA / DIVÓRCIO / INVENTÁRIO)</p>
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <h2 className="login-paragraph">Preencha os campos</h2>
          <label htmlFor="protocol" className="login-label input-container">
            Protocolo:
            <FormControl
              type="text"
              id="protocol"
              name="protocol"
              value={protocol}
              onChange={(e) => setProtocol(e.target.value)}
              required
            />
          </label>

          <label htmlFor="userCpf" className="login-label input-container">
            CPF:
            <MaskInput
              mask="cpf"
              type="text"
              autoComplete="off"
              maxLength="14"
              id="cpf"
              name="cpf"
              value={cpf}
              handleChange={(value) => setCpf(value)}
              required
            />
          </label>

          {error && <p className="error-message">{error}</p>}

          <button
            className={loading ? 'disabled' : ''}
            disabled={loading}
            type="submit"
          >
            CONSULTAR
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
