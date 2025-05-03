# schemas.py
from pydantic import BaseModel

class UsuarioSchema(BaseModel):
  nome: str
  email: str
  senha: str

class ReceitaSchema(BaseModel):
  titulo: str
  ingredientes: str
  preparo: str = None 
  tempo_minutos: int = None
  usuario_id: int 
  foto_url: str = None