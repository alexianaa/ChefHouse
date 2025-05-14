import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import default_img from '../assets/default.png'; 
import api from '../api';

interface Receita {
  id: number | null,
  titulo: string,
  ingredientes: string,
  preparo: string,
  tempo_minutos: number,
  foto_url: string
}

const ReadReceita = () => {
  const { id } = useParams();
  const [receita, setReceita] = useState<Receita>({
    id: null,
    titulo: '',
    ingredientes: '',
    preparo: '',
    tempo_minutos: 0,
    foto_url: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchReceitaById(id);
  }, [id]);

  async function fetchReceitaById(id: string | undefined){
    try {
      const response = await api.get('/receitas/'+id);
      setReceita(response.data);
    } catch (error) {
      console.log('Erro ao buscar po receita: ', error);
    }
  }

  return (
    <>
      <div className="mb-5 text-xl font-semibold w-[50vw]">
        <button onClick={() => navigate(-1)} className="cursor-pointer">Voltar</button>
      </div>
      <div className="shadow-xl/20 w-[50vw] h-[60vh] outline outline-gray-300 flex flex-col  rounded justify-center p-16">
        <img alt={receita.titulo} src={receita.foto_url? receita.foto_url : default_img} className="w-64 h-56 rounded" />
        <p> <span className="font-bold">Título:</span> {receita.titulo}</p>
        <p> <span className="font-bold">Ingredientes:</span> {receita.ingredientes}</p>
        <p> <span className="font-bold">Modo de preparo:</span> {receita.preparo}</p>
        <p> <span className="font-bold">Tempo de preparo:</span> {receita.tempo_minutos} minutos</p>
      </div>
    </>
  )
}

export default ReadReceita;
