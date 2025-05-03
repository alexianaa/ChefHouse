import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database import get_db_connection
from typing import List

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

app = FastAPI()

origins = [
  'http://localhost:3000/'
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"]
)

@app.get("/")
def welcome():
  return 'welcome'

@app.get("/receitas")
async def read_item():
  conn = get_db_connection()
  if conn is None:
    raise HTTPException(status_code=500, detail="Database connection failed")
  
  cursor = conn.cursor(dictionary=True)
  query = "SELECT * FROM receitas"
  
  try:
    cursor.execute(query)
    item = cursor.fetchall()
    return item
  except Exception as e:
    raise HTTPException(status_code=500, detail=str(e))
  finally:
    cursor.close()
    conn.close()

@app.post("/usuarios")
async def create_item(item: UsuarioSchema):
  conn = get_db_connection()
  if conn is None:
    raise HTTPException(status_code=500, detail="Database connection failed")
  
  cursor = conn.cursor()
  query = "INSERT INTO usuarios (nome, email, senha) VALUES (%s, %s, %s)"
  values = (item.nome, item.email, item.senha)
  
  try:
    cursor.execute(query, values)
    conn.commit()
    item_id = cursor.lastrowid
    return {"id": item_id, **item.dict()}
  except Exception as e:
    conn.rollback()
    raise HTTPException(status_code=500, detail=str(e))
  finally:
    cursor.close()
    conn.close()

@app.post("/receitas")
async def create_item(item: ReceitaSchema):
  conn = get_db_connection()
  if conn is None:
    raise HTTPException(status_code=500, detail="Database connection failed")
  
  cursor = conn.cursor()
  query = "INSERT INTO receitas (titulo, ingredientes, usuario_id) VALUES (%s, %s, %s)"
  values = (item.titulo, item.ingredientes, item.usuario_id)
  
  try:
    cursor.execute(query, values)
    conn.commit()
    item_id = cursor.lastrowid
    return {"id": item_id, **item.dict()}
  except Exception as e:
    conn.rollback()
    raise HTTPException(status_code=500, detail=str(e))
  finally:
    cursor.close()
    conn.close()

if __name__ == '__main__':
  uvicorn.run(app, host="localhost", port=8000)