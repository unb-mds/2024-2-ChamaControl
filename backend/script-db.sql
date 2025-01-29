CREATE TABLE IF NOT EXISTS focos (
    foco_id INT NOT NULL AUTO_INCREMENT,
    estado VARCHAR(20) NOT NULL,
    bioma VARCHAR(15) NOT NULL,
    regiao VARCHAR(15) NOT NULL,
    mes SMALLINT NOT NULL,
    quantidade_focos INT NOT NULL,
    ano SMALLINT NOT NULL,
    PRIMARY KEY (foco_id)
);

CREATE TABLE IF NOT EXISTS focosDiarios (
    foco_id INT NOT NULL AUTO_INCREMENT,
    estado VARCHAR(20) NOT NULL,
    bioma VARCHAR(15) NOT NULL,
    regiao VARCHAR(15) NOT NULL,
    dia SMALLINT NOT NULL,
    mes SMALLINT NOT NULL,
    quantidade_focos INT NOT NULL,
    ano SMALLINT NOT NULL,
    PRIMARY KEY (foco_id)
);

-- CREATE INDEX idx_mesAno ON focos(mes, ano);
-- CREATE INDEX idx_estadoAno ON focos(estado, ano);
-- CREATE INDEX idx_regiaoAno ON focos(regiao, ano);
-- CREATE INDEX idx_regiao ON focos(regiao);
-- CREATE INDEX idx_estado ON focos(estado);

CREATE TABLE IF NOT EXISTS USUARIO (
    idUsuario INT NOT NULL auto_increment,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    eAdmin boolean default false,
    recebeAlertas boolean default false,
    CONSTRAINT USUARIO_PK PRIMARY KEY (idUsuario)
);
