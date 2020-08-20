import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { ToastContainer, notify } from '../../services/notification';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewInvestment() {
  const [type, setType] = useState('variavel');
  const [value, setValue] = useState('');
  let [isDisabled, setIsDisabled] = useState(false);
  const [date, setDate] = useState('');

  const history = useHistory();

  const id = localStorage.getItem('id');
  const token = localStorage.getItem('token');

  async function handleNewInvestment(e) {
    e.preventDefault();

    const data = {
      type,
      value,
      date,
    };

    try {
      await api.post(`investments/${id}`, data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setIsDisabled(true);

      history.push(`/investments/${id}`);
    } catch (err) {
      notify('error', 'Erro ao cadastrar caso, tente novamente.');
    }
  }

  return (
    <div className='new-investment-container'>
      <div className='content'>
        <section>
          <img src={logoImg} />

          <h1>Cadastrar novo caso</h1>

          <Link className='back-link' to={`/investments/${id}`}>
            <FiArrowLeft size={16} color='#E02041' />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNewInvestment}>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value='variavel'>VARIAVEL</option>
            <option value='fixa'>FIXA</option>
          </select>

          <input
            type='number'
            min='1'
            step={0.1}
            precision={2}
            placeholder='Valor em reais'
            value={value}
            required={true}
            onChange={(e) => setValue(e.target.value)}
          />

          <input
            type='date'
            placeholder='Data Do Investimento'
            value={date}
            required={true}
            onChange={(e) => setDate(e.target.value)}
          />

          <button className='button' type='submit' disabled={isDisabled}>
            Cadastrar
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}
