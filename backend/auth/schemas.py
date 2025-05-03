from pydantic import BaseModel, EmailStr
from datetime import datetime, timedelta
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status
from jose import JWTError, jwt
from typing import Optional

class UsuarioSchema(BaseModel):
  nome: str
  email: str
  senha: str

class UsuarioBase(BaseModel):
  nome: str
  email: EmailStr

class UsuarioCreate(UsuarioBase):
  senha: str  # Senha em texto puro (será hasheada antes de salvar)

class Usuario(UsuarioBase):
  id: int
  criado_em: datetime
  
  class Config:
    from_attributes = True

class Token(BaseModel):
  access_token: str
  token_type: str

class TokenData(BaseModel):
  email: str | None = None  # Usaremos email como identificador