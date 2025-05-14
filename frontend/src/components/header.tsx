
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string,
  nome: string,
  email: string
}

export const Header = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState<User>();

  function getUser(){
    let user = localStorage.getItem('user');
    if(user) setUser(JSON.parse(user));
  }

  useEffect(() => {
    getUser();
  }, []);

  const handleClick = () => {
    localStorage.setItem('access_token', '');
    navigate('/login');
  };

  return (
    <div className="h-24 w-screen text-xl text-white font-semibold flex justify-between px-12 items-center bg-linear-to-bl from-violet-500 to-fuchsia-500">
      <span>Gerenciamento de Receitas</span>
      <div>
        <span className="pr-12" >Olá, {user?.nome}</span>
        <span onClick={handleClick} className="cursor-pointer">Sair</span>
      </div>
    </div>
  )
}