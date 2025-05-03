from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from database import get_db
from schemas import UsuarioSchema
from models import Usuarios

router = APIRouter()

@router.post("/")
def create_item(
  usuario: UsuarioSchema, 
  db: Session = Depends(get_db)
):
  db_receita = Usuarios(**usuario.dict())
    
  db.add(db_receita)
  db.commit()
  db.refresh(db_receita)
  return db_receita