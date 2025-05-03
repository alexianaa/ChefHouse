CREATE DATABASE chefhouse;

\c chefhouse

CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS receitas (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  ingredientes TEXT NOT NULL,
  preparo TEXT,
  tempo_minutos INTEGER,
  foto_url VARCHAR(255),
  usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_receitas_usuario_id ON receitas(usuario_id);
CREATE INDEX idx_usuarios_email ON usuarios(email);

CREATE OR REPLACE FUNCTION update_atualizado_em()
RETURNS TRIGGER AS $$
BEGIN
  NEW.atualizado_em = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_usuario
BEFORE UPDATE ON usuarios
FOR EACH ROW
EXECUTE FUNCTION update_atualizado_em();

CREATE TRIGGER trigger_update_receita
BEFORE UPDATE ON receitas
FOR EACH ROW
EXECUTE FUNCTION update_atualizado_em();