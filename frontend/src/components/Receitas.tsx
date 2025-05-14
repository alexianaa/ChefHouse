import {useState, useEffect} from 'react';
import api from '../api';
import AddReceitaForm from './AddReceitaForm';
import default_img from '../assets/default.png'; 
import { TrashIcon, EyeIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

interface Receita {
  id: number | null,
  titulo: string,
  ingredientes: string,
  preparo: string,
  tempo_minutos: number,
  foto_url: string
}

const ReceitasList = () => {
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchReceitas = async () => {
    try {
      const response = await api.get('/receitas');
      setReceitas(response.data);
    } catch (error) {
      console.log('Erro ao buscar por receitas: ', error);
    }
  }

 
  const handleDelete = async(id: number | null) => {
    const confirmar = window.confirm("Tem certeza que deseja excluir esta receita?");
    if (!confirmar) return;

    try {
      await api.delete(`/receitas/${id}`);
      fetchReceitas();
    } catch (error) {
      console.log('Erro excluir receita: ', error);
    }
  }

  useEffect(() => {
    fetchReceitas();
  }, []);

  return (
    <div className="w-full mt-16 flex flex-col items-center">
      <div className="shadow-xl/20 w-[50vw] h-[60vh] outline outline-gray-300 flex flex-col items-center rounded overflow-y-scroll">
        <div className="bg-gray-100 w-full h-16 border-b-2 border-gray-300 flex items-center justify-between p-4 sticky top-0">
          <span>Lista de Receitas</span>
          <button onClick={() => setIsOpen(true)} className="px-8 py-2 rounded font-semibold transition duration-150 ease-in-out cursor-pointer bg-purple-600 hover:bg-purple-500 text-white">
            Nova receita
          </button>
        </div>
        <div className="p-8 w-full">
          <div>
            {receitas?.map((receita, index) => (
              <div key={index} className="w-full outline outline-gray-300 bg-gray-100 rounded mb-4 flex justify-between items-center hover:shadow-lg">
                <div className="w-full flex items-center justify-between">
                  <div className="flex">
                    <img alt={receita.titulo} src={receita.foto_url? receita.foto_url : default_img} className="w-32 h-24 rounded-s mr-2" />
                    <div className="flex flex-col justify-center">
                      <p>
                        <span className="font-bold">Título: </span>
                        <span>{receita.titulo}</span>
                      </p>
                      <p>
                        <span className="font-bold">Tempo de preparo: </span>
                        {receita.tempo_minutos > 0 && (
                          <span> {receita.tempo_minutos} minutos </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex px-8 gap-4">
                    <EyeIcon className="w-6 hover:w-8 duration-300 ease-in-out cursor-pointer" onClick={() => navigate(`/receita/${receita.id}`)} />
                    <TrashIcon onClick={() => handleDelete(receita.id)} className="w-6 text-red-700 hover:w-8 duration-300 ease-in-out cursor-pointer" />
                  </div>
                </div>
              </div>
            ))}
          </div> 
        </div>
      </div>

      <AddReceitaForm fetchReceitas={fetchReceitas} open={isOpen} setIsOpen={() => setIsOpen(!isOpen)} />
    </div>
  )
}

export default ReceitasList;
