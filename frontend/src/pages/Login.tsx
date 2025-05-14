import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';

interface LoginRequest {
  username: string;
  password: string;
}

type ErrorResponse = {
  message: string;
};

interface User {
  id: string,
  nome: string,
  email: string
};


function Login() {
  const [formData, setFormData] = useState<LoginRequest>({
    username: '',
    password: ''
  });
  const [erro, setErro] = useState<string>('');
  const [carregando, setCarregando] = useState<boolean>(false);

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
      
      // faz login
      const response = await axios.post<{ user: User, token: string }>(
        'http://localhost:8000/auth/token',
        formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      const { user, token } = response.data;
      localStorage.setItem('access_token', token);
      localStorage.setItem('user', JSON.stringify({
        id: user.id,
        nome: user.nome,
        email: user.email,
      }));

      navigate('/home');
      
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.log(error)
      setErro(
        axiosError.response?.data?.message || 
        'Erro ao fazer login. Tente novamente.'
      );
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-linear-to-t from-sky-500 to-indigo-500">
        <div className="w-[40vw] h-[60vh] bg-white rounded-lg p-8 shadow-2xl flex items-center justify-center flex-col">
          <h1 className="text-3xl font-bold underline mb-4">Login</h1>
          <p>Bem vindo(a) ao ChefHouse</p>
          {erro && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-center">
              {erro}
            </div>
          )}
          <form onSubmit={handleSubmit} className="w-full block px-16 text-lg">
            <label htmlFor="username" className="w-full font-semibold" >Email</label>
            <input
              className="w-full p-2 outline rounded mb-2"
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <label htmlFor="password" className="w-full font-semibold" >Senha</label>
            <input
              className="w-full p-2 outline rounded mb-6"
              id="password"
              name="password"
              type="password"
              value={formData.password}
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
                {carregando ? 'Carregando...' : 'Entrar'}
              </button>
            </div>
          </form>
          <a 
            href="/cadastro" 
            className="mt-4 text-blue-600 hover:underline text-sm md:text-base"
            onClick={(e) => {
              e.preventDefault();
              navigate('/cadastro');
            }}
          >
            Não tem uma conta? Cadastre-se
          </a>
        </div>
      </div>
    </>
  )
}

export default Login
