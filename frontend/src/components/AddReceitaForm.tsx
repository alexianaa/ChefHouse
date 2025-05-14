import React, {useState, FormEvent, useEffect} from 'react';
import close from '../assets/close.svg';
import api from '../api';

interface PropsInterface {
  fetchReceitas: () => Promise<void>;
  open: boolean; 
  setIsOpen: () => void;
}

interface Receita {
  id: number | null;
  titulo: string;
  ingredientes: string;
  preparo: string;
  tempo_minutos: number;
};

interface User {
  id: string,
  nome: string,
  email: string
}


const AddReceitaForm: React.FC<PropsInterface> = ( {fetchReceitas, open, setIsOpen} ) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<Receita>({
    id: null,
    titulo: '',
    ingredientes: '',
    preparo: '',
    tempo_minutos: 0
  });

  function getUser(){
    let user = localStorage.getItem('user');
    if(user) setUser(JSON.parse(user));
  }

  useEffect(() => {
    getUser();
  }, []);


  const addReceita = async (formData: Receita) => {
    let fotoUrl = '';

    try {
      setLoading(true);
      if(selectedFile){
        const uploadData = new FormData();
        uploadData.append('file', selectedFile);
        const response = await api.post('/receitas/upload',uploadData);
        fotoUrl = await response.data.url;
      }
  
        await api.post('/receitas', {
          ...formData,
          foto_url: fotoUrl,
          usuario_id: user?.id
        });
        
        fetchReceitas();
        setLoading(false);
        setIsOpen();
    } catch (error) {
      console.log('Erro adicionar receita: ', error);
    }
  }

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
      tempo_minutos: 0
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
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
            {/* <br/>
            <input
              type="text"
              name="foto_url"
              value={formData.foto_url}
              onChange={handleChange}
              placeholder="Url para foto da receita"
              className="outline p-2 w-full mb-2"
            /> */}
            <br/>
            <input 
              type="file" 
              accept="image/*" 
              id="foto"
              onChange={handleFileChange} 
              className="hidden"
            />
            <label htmlFor="foto" className="outline p-2 w-full mb-2 cursor-pointer">
              Enviar arquivo: {selectedFile?.name && <span> {selectedFile.name}</span>}
            </label>
            <br/>

            {loading && (
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            )}

            {!loading && (
              <button 
                type="submit" 
                className="px-8 py-2 rounded font-semibold transition duration-150 ease-in-out cursor-pointer bg-purple-600 hover:bg-purple-500 text-white" 
              >
                Cadastrar Receita
              </button>
            )}
          </form>
        </div>
      </div>
    )
  }

}

export default AddReceitaForm;