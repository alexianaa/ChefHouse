import React, {useState} from 'react';
import close from '../assets/close.svg';

interface PropsInterface {
  addReceita: (
    receitaTitulo: string, 
    receitaIngredientes: string
  ) => Promise<void>;
  open: boolean; 
  setIsOpen: () => void;
}

const AddReceitaForm: React.FC<PropsInterface> = ( {addReceita, open, setIsOpen} ) => {
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

  if(open){
    return (
      <div className="fixed top-0 left-0 bg-black/50 w-full h-full flex items-center justify-center">
        <div className="bg-white rounded h-[60vh] w-[40vw] min-h-fit p-8">
          <div className="flex justify-end pb-4">
            <button 
              onClick={setIsOpen}
              type="button" 
              className="p-2 rounded-2xl font-semibold transition duration-150 ease-in-out cursor-pointer bg-purple-600 hover:bg-purple-500" 
            >
              <img src={close} width="10px"/>
            </button>
          </div>
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
        </div>
      </div>
    )
  }

}

export default AddReceitaForm;