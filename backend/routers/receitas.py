from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from typing import List, Dict, Any

from database import get_db
from schemas import ReceitaSchema, ReceitaUpdate
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

@router.put("/{receita_id}")
def ler_receita( 
    receita_update: ReceitaSchema, 
    receita_id: int, 
    db: Session = Depends(get_db),
  ):
    receita = db.query(Receitas).filter(Receitas.id == receita_id).first()
    if not receita:
      raise HTTPException(status_code=404, detail="Receita não encontrada")
      return
    if receita.usuario_id != receita_update.usuario_id:
      raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Você não tem permissão para atualizar esta receita"
      )
    for field, value in receita_update.dict().items():
      setattr(receita, field, value)
    db.commit()
    db.refresh(receita)
    return receita

@router.patch("/{receita_id}")
def ler_receita(receita_update: ReceitaUpdate, receita_id: int, db: Session = Depends(get_db)):
    receita = db.query(Receitas).filter(Receitas.id == receita_id).first()
    if not receita:
        raise HTTPException(status_code=404, detail="Receita não encontrada")
        return
    # if receita.usuario_id != receita_update.usuario_id:
    #   raise HTTPException(
    #     status_code=status.HTTP_403_FORBIDDEN,
    #     detail="Você não tem permissão para atualizar esta receita"
    #   )
    
    update_data = receita_update.dict(exclude_unset=True)
    for field in update_data:
      setattr(receita, field, update_data[field])
    
    db.commit()
    db.refresh(receita)
    return receita

@router.delete("/{receita_id}")
def ler_receita(receita_id: int, db: Session = Depends(get_db)):
    receita = db.query(Receitas).filter(Receitas.id == receita_id).first()
    if not receita:
      raise HTTPException(status_code=404, detail="Receita não encontrada")
      return
    # if receita.usuario_id != usuario_id:
    #   raise HTTPException(
    #     status_code=status.HTTP_403_FORBIDDEN,
    #     detail="Você não tem permissão para deletar esta receita"
    #   )
    db.delete(receita)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)