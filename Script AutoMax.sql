create database AutoMax;
use AutoMax;

CREATE TABLE carros (
  idcarro INT PRIMARY KEY auto_increment not null,
  marca VARCHAR(50) not null,
  modelo VARCHAR(50) not null,
  anofabricacao INT not null,
  preco DECIMAL(10,2) not null
);

INSERT INTO carros (marca, modelo, anofabricacao, preco)
VALUES
  ('chevrolet', 'onix', 2020, 60000.00),
  ('volkswagen', 'gol', 2019, 55000.00),
  ('fiat', 'uno', 2021, 45000.00),
  ('ford', 'ka', 2018, 50000.00),
  ('renault', 'kwid', 2021, 40000.00);
  
  select * from carros;