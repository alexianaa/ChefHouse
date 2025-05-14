import { Outlet } from 'react-router-dom';
import { Header } from './header';

const Layout = () => {
  return (
    <div className="h-screen w-full">
      <Header />
      <div className="w-full mt-16 flex flex-col items-center">
        <Outlet /> 
      </div>
    </div>
  );
};

export default Layout;
