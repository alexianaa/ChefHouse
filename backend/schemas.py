# schemas.py
from pydantic import BaseModel
from typing import Optional


class ReceitaSchema(BaseModel):
  titulo: str
  ingredientes: str
  preparo: str = None 
  tempo_minutos: int = None
  foto_url: str = None
  usuario_id: int 

class ReceitaUpdate(BaseModel):
  titulo: Optional[str] = None
  ingredientes: Optional[str] = None
  preparo: Optional[str] = None
  tempo_minutos: Optional[int] = None
  foto_url: Optional[str] = None
  class Config:
    from_attributes = True