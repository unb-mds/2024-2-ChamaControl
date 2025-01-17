CREATE DATABASE IF NOT EXISTS mdschama;
USE mdschama;

CREATE TABLE focos (
    foco_id INT NOT NULL AUTO_INCREMENT,
    estado VARCHAR(100) NOT NULL,
    bioma VARCHAR(100) NOT NULL,
    regiao VARCHAR(100) NOT NULL,
    mes INT NOT NULL,
    quantidade_focos INT NOT NULL,
    ano INT NOT NULL,
    PRIMARY KEY (foco_id)
);

CREATE INDEX idx_mesAno ON focos(mes, ano);
CREATE INDEX idx_estadoAno ON focos(estado, ano);
CREATE INDEX idx_regiaoAno ON focos(regiao, ano);
CREATE INDEX idx_regiao ON focos(regiao);
CREATE INDEX idx_estado ON focos(estado);

CREATE TABLE USUARIO (
    idUsuario INT NOT NULL auto_increment,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    eAdmin boolean default false,
    recebeAlertas boolean default false,
    CONSTRAINT USUARIO_PK PRIMARY KEY (idUsuario)
);
