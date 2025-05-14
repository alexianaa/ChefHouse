import React, {useState, FormEvent} from 'react';
import close from '../assets/close.svg';

interface PropsInterface {
  addReceita: (receita: Receita) => Promise<void>;
  open: boolean; 
  setIsOpen: () => void;
}

interface Receita {
  id: number | null;
  titulo: string;
  ingredientes: string;
  preparo: string;
  tempo_minutos: number;
  foto_url: string;
}

const AddReceitaForm: React.FC<PropsInterface> = ( {addReceita, open, setIsOpen} ) => {
  const [formData, setFormData] = useState<Receita>({
    id: null,
    titulo: '',
    ingredientes: '',
    preparo: '',
    tempo_minutos: 0,
    foto_url: '',
  });


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'tempo_minutos' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    addReceita(formData);
    //console.log('Receita cadastrada:', formData);

    // Resetar o formulário
    setFormData({
      id: null,
      titulo: '',
      ingredientes: '',
      preparo: '',
      tempo_minutos: 0,
      foto_url: '',
    });
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
              name="titulo"
              value={formData.titulo}
              required
              onChange={handleChange}
              placeholder="Digite o titulo da receita"
              className="outline p-2 w-full mb-2"
            />
            <br/>
            <input
              type="text"
              name="ingredientes"
              value={formData.ingredientes}
              required
              onChange={handleChange}
              placeholder="Digite os ingredientes da receita"
              className="outline p-2 w-full mb-2"
            />
            <br/>
            <input
              type="text"
              name="preparo"
              value={formData.preparo}
              onChange={handleChange}
              placeholder="Explique o preparo da receita"
              className="outline p-2 w-full mb-2"
            />
            <br/>
            <input
              type="number"
              name="tempo_minutos"
              value={formData.tempo_minutos}
              onChange={handleChange}
              placeholder="Tempo em minutos do preparo"
              className="outline p-2 w-full mb-2"
            />
            <br/>
            <input
              type="text"
              name="foto_url"
              value={formData.foto_url}
              onChange={handleChange}
              placeholder="Url para foto da receita"
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