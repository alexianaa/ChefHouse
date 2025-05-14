from fastapi import APIRouter, Depends, HTTPException, status, Response, FastAPI, File, UploadFile
from sqlalchemy.orm import Session
from typing import List, Dict, Any
import boto3
import uuid

from dotenv import load_dotenv
import os
load_dotenv()

from database import get_db
from schemas import ReceitaSchema, ReceitaUpdate
from models import Receita

router = APIRouter()

s3 = boto3.client(
  "s3",
  aws_access_key_id= os.getenv('ACCESS_KEY'), 
  aws_secret_access_key=os.getenv('SECRET_KEY'),
  region_name=os.getenv('REGION')
)

BUCKET_NAME = "chefhouse-2"

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
  file_extension = file.filename.split(".")[-1]
  key = f"{uuid.uuid4()}.{file_extension}"

  s3.upload_fileobj(file.file, BUCKET_NAME, key, ExtraArgs={"ContentType": file.content_type, "ACL": "public-read"})
  file_url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{key}"
  return {"url": file_url}

@router.get("/")
def listar_receitas(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(Receita).offset(skip).limit(limit).all()

@router.post("/")
def create_item(
  receita: ReceitaSchema, 
  db: Session = Depends(get_db)
):
  db_receita = Receita(
    **receita.dict()
  )
    
  db.add(db_receita)
  db.commit()
  db.refresh(db_receita)
  return db_receita

@router.get("/{receita_id}")
def ler_receita(receita_id: int, db: Session = Depends(get_db)):
    receita = db.query(Receita).filter(Receita.id == receita_id).first()
    if not receita:
        raise HTTPException(status_code=404, detail="Receita não encontrada")
    return receita

@router.put("/{receita_id}")
def ler_receita( 
    receita_update: ReceitaSchema, 
    receita_id: int, 
    db: Session = Depends(get_db),
  ):
    receita = db.query(Receita).filter(Receita.id == receita_id).first()
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
    receita = db.query(Receita).filter(Receita.id == receita_id).first()
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
    receita = db.query(Receita).filter(Receita.id == receita_id).first()
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