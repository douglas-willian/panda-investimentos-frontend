import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import { ToastContainer, notify } from '../../services/notification';
import renderInvestments from './renderInvestments';
import getTotalInvestments from './getTotalInvestments';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function GetInvestments() {
  const [investments, setInvestments] = useState([]);
  const history = useHistory();

  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');

  useEffect(() => {
    async function getInvestments() {
      const response = await api.get(`investments/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setInvestments(response.data);
    }
    getInvestments();
  }, [token, id]);

  async function handleDeleteInvestments(id) {
    try {
      await api.delete(`investments/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setInvestments(investments.filter((investment) => investment.id !== id));
      notify('success', 'Excluido com Sucesso');
    } catch (err) {
      notify('error', 'Erro ao deletar renda, tente novamente.');
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  const {percentageOnVariable, percentageOnFixed} = getTotalInvestments(investments)

  return (
    <div className='investment-container'>
      <header>
        <img src={logoImg} alt=''/>

        <span>Meus Investimentos</span>

        <Link className='button' to='/newInvestment'>
          Cadastrar novo Investimento
        </Link>
        <button onClick={handleLogout} type='button'>
          <FiPower size={18} color='#90b128' />
        </button>
      </header>

      <h1>Total Investimentos</h1>
      <ul>
        <li>
          <strong>RENDA VARIAVEL:</strong>
          <p>{`${percentageOnVariable}%`}</p>

          <strong>RENDA FIXA:</strong>
          <p>{`${percentageOnFixed}%`}</p>
        </li>
      </ul>

      <h1>Renda Váriavel</h1>
      <ul>
        {renderInvestments(investments, 'variavel', handleDeleteInvestments)}
      </ul>

      <h1>Renda Fixa</h1>
      <ul>{renderInvestments(investments, 'fixa', handleDeleteInvestments)}</ul>
      <ToastContainer />
    </div>
  );
}
