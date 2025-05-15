import { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

interface User {
  nome: string,
  email: string,
  senha: string
};

type ErrorResponse = {
  message: string;
};

function Cadastro() {
  
  const [erro, setErro] = useState<string>('');
  const [carregando, setCarregando] = useState<boolean>(false);
  const [formData, setFormData] = useState<User>({
    nome: '',
    email: '',
    senha: ''
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');
    
    try {
      
      await api.post('/auth/registrar',formData);
      alert('Cadastro realizado com sucesso!');
      navigate('/login');
      
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      setErro(
        axiosError.response?.data?.message || 
        'Erro ao fazer cadastro. Tente novamente.'
      );
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-linear-to-t from-sky-700 to-indigo-700">
        <div className="w-[40vw] h-[60vh] bg-white rounded-lg p-8 shadow-2xl flex items-center justify-center flex-col">
          <h1 className="text-3xl font-bold underline mb-4">Cadastro</h1>
          <p>Bem vindo(a) ao ChefHouse</p>
          {erro && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-center">
              {erro}
            </div>
          )}

          <form onSubmit={handleSubmit} className="w-full block px-16 text-lg">
            <label htmlFor="nome" className="w-full font-semibold" >Nome</label>
            <input
              className="w-full p-2 outline rounded mb-2"
              id="nome"
              name="nome"
              type="text"
              value={formData.nome}
              onChange={handleChange}
              required
            />
            <label htmlFor="email" className="w-full font-semibold" >Email</label>
            <input
              className="w-full p-2 outline rounded mb-2"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="senha" className="w-full font-semibold" >Senha</label>
            <input
              className="w-full p-2 outline rounded mb-6"
              id="senha"
              name="senha"
              type="password"
              value={formData.senha}
              onChange={handleChange}
              required
            />
            <div className="flex w-full justify-center">
              <button 
                type="submit"
                disabled={carregando}
                className={`px-12 py-2 text-white rounded font-semibold transition duration-150 ease-in-out cursor-pointer ${
                  carregando 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-500'
                }`}
              >
                {carregando ? 'Carregando...' : 'Cadastrar'}
              </button>
            </div>
          </form>

        </div>
      </div>
    </>
  )
}

export default Cadastro
