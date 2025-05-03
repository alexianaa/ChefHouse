import './App.css'
import ReceitasList from './components/Receitas';

function App() {

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Gerenciamento de Receitas</h1>
        </header>
        <main>
          <ReceitasList/>
        </main>
      </div>
    </>
  )
}

export default App
