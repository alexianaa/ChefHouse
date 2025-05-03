from fastapi import FastAPI, Depends, HTTPException, status,APIRouter
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from sqlalchemy.orm import Session

from models import Usuario as UsuarioModel
from database import get_db
from auth.services import (
    create_access_token,
    get_current_user,
    get_current_active_user,
    verify_password,
    get_password_hash,
    ACCESS_TOKEN_EXPIRE_MINUTES
)

from auth.schemas import UsuarioCreate, Usuario, Token

router = APIRouter()

@router.get("/")
async def receitas_protegidas(current_user: Usuario = Depends(get_current_user)):
  return {"mensagem": "Esta é uma rota protegida", "usuario": current_user.nome}

@router.post("/registrar", response_model=Usuario)
def registrar_usuario(usuario: UsuarioCreate, db: Session = Depends(get_db)):
    
    db_user = db.query(UsuarioModel).filter(UsuarioModel.email == usuario.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email já registrado")
    
   
    hashed_password = get_password_hash(usuario.senha)
    db_usuario = UsuarioModel(
        nome=usuario.nome,
        email=usuario.email,
        senha=hashed_password
    )
    db.add(db_usuario)
    db.commit()
    db.refresh(db_usuario)
    return db_usuario

@router.post("/token", response_model=Token)
def login_para_token(
    form_data: OAuth2PasswordRequestForm = Depends(), 
    db: Session = Depends(get_db)
):
    usuario = db.query(UsuarioModel).filter(UsuarioModel.email == form_data.username).first()
    if not usuario or not verify_password(form_data.password, usuario.senha):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=int(ACCESS_TOKEN_EXPIRE_MINUTES))
    access_token = create_access_token(
        data={"sub": usuario.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/{id}", response_model=Usuario)
async def ler_usuario_atual(id: int, db: Session = Depends(get_db)):
  usuario = db.query(UsuarioModel).filter(UsuarioModel.id == id).first()
  if usuario:
    return usuario
  else:
    raise HTTPException(
      status_code=status.HTTP_404_UNAUTHORIZED,
      detail="Usuário não encontrado"
    )

@router.get("/usuarios/me")
async def read_usuario_logado(current_user: Usuario = Depends(get_current_active_user)):
  return {
    "id": current_user.id,
    "nome": current_user.nome,
    "email": current_user.email
  }