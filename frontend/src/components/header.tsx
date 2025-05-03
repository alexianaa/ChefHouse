
import { useNavigate } from 'react-router-dom';

export const Header = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.setItem('access_token', '');
    navigate('/login');
  };

  return (
    <div className="h-24 w-screen text-xl text-white font-semibold flex justify-between px-12 items-center bg-linear-to-bl from-violet-500 to-fuchsia-500">
      <span>Gerenciamento de Receitas</span>
      <span onClick={handleClick} className="cursor-pointer">Sair</span>
    </div>
  )
}