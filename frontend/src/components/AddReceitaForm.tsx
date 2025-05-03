import React, {useState} from 'react';

interface PropsInterface {
  addReceita: (receitaTitulo: string, receitaIngredientes: string) => Promise<void>;
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={receitaNome}
        onChange={(e) => setReceitaNome(e.target.value)}
        placeholder="Digite o titulo da receita"
      />
      <br/>
      <input
        type="text"
        value={receitaIngredientes}
        onChange={(e) => setReceitaIngredientes(e.target.value)}
        placeholder="Digite os ingredientes da receita"
      />
      <br/>
      <button type="submit" >Cadastrar Receita</button>
    </form>
  )
}

export default AddReceitaForm;