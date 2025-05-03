from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from database import get_db
from schemas import ReceitaSchema
from models import Receitas

router = APIRouter()

@router.get("/")
def listar_receitas(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(Receitas).offset(skip).limit(limit).all()

@router.post("/")
def create_item(
  receita: ReceitaSchema, 
  db: Session = Depends(get_db)
):
  db_receita = Receitas(
    **receita.dict()
  )
    
  db.add(db_receita)
  db.commit()
  db.refresh(db_receita)
  return db_receita

@router.get("/{receita_id}")
def ler_receita(receita_id: int, db: Session = Depends(get_db)):
    receita = db.query(Receitas).filter(Receitas.id == receita_id).first()
    if not receita:
        raise HTTPException(status_code=404, detail="Receita não encontrada")
    return receita