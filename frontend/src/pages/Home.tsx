import { Header } from '../components/header'
import ReceitasList from '../components/Receitas'

function Home() {

  return (
    <>
    <div className="h-screen w-full">
      <Header/>
      <ReceitasList/>
    </div>
    </>
  )
}

export default Home
