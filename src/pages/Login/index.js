import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { ToastContainer, notify } from '../../services/notification';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const {
        data: { id, token },
      } = await api.post('login', { email, password });

      localStorage.setItem('id', id);
      localStorage.setItem('token', token);

      history.push(`/investments/${id}`);
    } catch (err) {
      console.log(err)
      notify('error', 'Usuário e/ou Senha Inválidos.');
    }
  }

  return (
    <div className='login-container'>
      <section className='form'>

      <h1 id='login-title'>PANDA INVESTIMENTOS</h1>

        <form onSubmit={handleLogin}>
          <h1>Faça seu login</h1>

          <input
            placeholder='Email'
            value={email}
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className='button' type='submit'>
            Entrar
          </button>

          <Link className='back-link' to='/register'>
            <FiLogIn size={16} color='#90b128' />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <ToastContainer />
      <img id='login-img' src={logoImg} alt='' />
    </div>
  );
}
