import React, {useState} from 'react';

interface PropsInterface {
  addReceita: (
    receitaTitulo: string, 
    receitaIngredientes: string
  ) => Promise<void>,
}

const AddReceitaForm: React.FC<PropsInterface> = ( {addReceita} ) => {
  const [receitaNome, setReceitaNome] = useState('');
  const [receitaIngredientes, setReceitaIngredientes] = useState('');

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if(receitaNome && receitaIngredientes){
      addReceita(receitaNome, receitaIngredientes);
      setReceitaIngredientes(receitaIngredientes);
      setReceitaNome('');
      setReceitaIngredientes('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-full px-24">
      <input
        type="text"
        value={receitaNome}
        onChange={(e) => setReceitaNome(e.target.value)}
        placeholder="Digite o titulo da receita"
        className="outline p-2 w-full mb-2"
      />
      <br/>
      <input
        type="text"
        value={receitaIngredientes}
        onChange={(e) => setReceitaIngredientes(e.target.value)}
        placeholder="Digite os ingredientes da receita"
        className="outline p-2 w-full mb-2"
      />
      <br/>
      <button 
        type="submit" 
        className="px-8 py-2 rounded font-semibold transition duration-150 ease-in-out cursor-pointer bg-purple-600 hover:bg-purple-500 text-white" 
      >
        Cadastrar Receita
      </button>
    </form>
  )
}

export default AddReceitaForm;