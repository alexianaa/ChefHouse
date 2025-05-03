# models.py
from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Usuarios(Base):
  __tablename__ = "usuarios"
  
  id = Column(Integer, primary_key=True, index=True)
  nome = Column(String(100), nullable=False)
  email = Column(String(100), unique=True, index=True, nullable=False)
  senha = Column(String(255), nullable=False)
  criado_em = Column(DateTime(timezone=True), server_default=func.now())
  atualizado_em = Column(DateTime(timezone=True), onupdate=func.now())

class Receitas(Base):
  __tablename__ = "receitas"
  
  id = Column(Integer, primary_key=True, index=True)
  titulo = Column(String(100), nullable=False)
  ingredientes = Column(Text, nullable=False)  
  preparo = Column(Text) 
  tempo_minutos = Column(Integer)
  foto_url = Column(String(255))
  usuario_id = Column(Integer, ForeignKey('usuarios.id', ondelete="CASCADE"))
  criado_em = Column(DateTime(timezone=True), server_default=func.now())
  atualizado_em = Column(DateTime(timezone=True), onupdate=func.now())