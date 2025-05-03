import {useState, useEffect} from 'react';
import api from '../api';
import AddReceitaForm from './AddReceitaForm';

interface Receita {
  titulo: string,
  ingredientes: string,
  preparo: string,
  tempo_minutos: number,
  foto_url: string
}

const ReceitasList = () => {
  const [receitas, setReceitas] = useState<Receita[]>([]);

  const fetchReceitas = async () => {
    try {
      const response = await api.get('/receitas');
      setReceitas(response.data);
    } catch (error) {
      console.log('Erro ao buscar por receitas: ', error);
    }
  }

  const addReceita = async (receitaTitulo: string, receitaIngredientes: string) => {
    try {
      await api.post('/receitas', {
        titulo: receitaTitulo,
        ingredientes: receitaIngredientes,
        usuario_id: 1 // substituir futuramente
      });
      fetchReceitas();
    } catch (error) {
      console.log('Erro adicionar receita: ', error);
    }
  }

  useEffect(() => {
    fetchReceitas();
  }, []);

  return (
    <div>
      <h2>Lista de receitas</h2>
      <div>
        {receitas?.map((receita, index) => (
          <div key={index}>{receita.titulo}</div>
        ))}
      </div>
      <br/>
      <AddReceitaForm addReceita={addReceita} />
    </div>
  )
}

export default ReceitasList;
