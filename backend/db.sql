CREATE DATABASE IF NOT EXISTS chefhouse;
USE chefhouse;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  senha VARCHAR(255) NOT NULL
);

CREATE TABLE receitas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  ingredientes VARCHAR(255) NOT NULL,
  preparo VARCHAR(255),
  tempo_minutos VARCHAR(255),
  foto_url VARCHAR(255),
  usuario_id INT,

  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

select * from usuarios;
select * from receitas;