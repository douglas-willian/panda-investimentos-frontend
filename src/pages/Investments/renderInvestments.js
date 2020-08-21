import React from 'react';
import { FiTrash2 } from 'react-icons/fi';

export default function renderInvestments(data, investmentType, handleDeleteInvestments) {
  return data.reduce((accumulator, investment) => {
    if (investment.type === investmentType) {
      accumulator.push(
        <li key={investment.id}>
          <strong>DATA DO INVESTIMENTO:</strong>
          <p>{investment.date}</p>

          <strong>VALOR:</strong>
          <p>
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(investment.value)}
          </p>

          <button
            onClick={() => handleDeleteInvestments(investment.id)}
            type='button'
          >
            <FiTrash2 size={20} color='#90b128' />
          </button>
        </li>
      );
    }
    return accumulator;
  }, [])
}