import { notify } from '../../services/notification';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

const id = localStorage.getItem('id');
const token = localStorage.getItem('token');


const history = useHistory();

async function handleDeleteInvestments(id) {
  try {
    await api.delete(`investments/${id}`, {
      headers: {
        authorization: token,
      },
    });

    setInvestments(investments.filter((investment) => investment.id !== id));
    notify('success', 'Excluido com Sucesso');
  } catch (err) {
    notify('error', 'Erro ao deletar renda, tente novamente.');
  }
}
async function handleNewInvestment(e, setIsDisabled, data) {
  e.preventDefault();

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

export { handleDeleteInvestments, handleNewInvestment };
