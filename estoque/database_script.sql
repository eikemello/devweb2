CREATE DATABASE estoque;
USE estoque;
 
 #cargo com o propósito de definir o acesso a determinado ativo.
 CREATE TABLE cargo (
    id_cargo INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(60) NOT NULL,
    nivel_acesso INT NOT NULL,
    registrado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id_cargo`)
);
 INSERT INTO cargo (nome, nivel_Acesso) VALUES ('Desenvolvedor JR', 2),
											('Analista de Compras',  2),
											('Analista de RH', 1),
											('Coordenadora de RH', 3),
											('Analista de Segurança', 5);
SELECT * FROM cargo;

CREATE TABLE funcionario (
    id_funcionario INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    id_cargo INT NOT NULL,
    registrado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id_funcionario`),
    FOREIGN KEY (id_cargo) REFERENCES cargo (id_cargo)
);
 INSERT INTO funcionario (nome, id_cargo) VALUES ('Eike Mello', 1),
												('Alberto Alves', 2),
												('Lucia Helena', 1),
												('Maria Luiz Oliveira',4),
												('Leonardo Trindade', 5),
												('Marilia Mello', 2),
												('João Pedro', 3);
SELECT * FROM funcionario;

CREATE TABLE ativo (
    id_ativo INT NOT NULL AUTO_INCREMENT,
    tipo VARCHAR(40) NOT NULL,
    marca VARCHAR(30) NOT NULL,
    modelo VARCHAR(20) NOT NULL,
    serial_number VARCHAR(20) NOT NULL,
    registrado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    disponibilidade VARCHAR(20),
    desgaste VARCHAR(30),
    PRIMARY KEY (`id_ativo`)
);
INSERT INTO ativo (tipo, marca, modelo, serial_number, disponibilidade, desgaste) VALUES ('Monitor', 'LG', 'Ultrawide 29pol', 'HKL23AS', 'Disponível', 'Novo'),
																		('Monitor', 'Samsung', 'LCS23', 'PAJKO43F', 'Disponível', 'Novo'),
																		('Monitor', 'Samsung', 'LCS27', 'DAQ84NA8', 'Disponível', 'Novo'),
																		('Monitor', 'Samsung', 'LCS29', 'LOKT61POP9', 'Indisponível', 'Novo'),
																		('Monitor', 'DELL', 'DELL23', 'QW324TRY', 'Disponível', 'Novo'),
																		('Monitor', 'DELL', 'DELL27', 'HUID0923798', 'Disponível', 'Novo'),
																		('Monitor', 'DELL', 'DELL29', 'COP43HUL', 'Indisponível', 'Novo');
SELECT * FROM ativo;

CREATE TABLE ativo_emprestado (
    id_emprestimo INT NOT NULL AUTO_INCREMENT,
    id_funcionario INT NOT NULL,
    id_ativo INT NOT NULL,
    PRIMARY KEY (`id_emprestimo`),
    FOREIGN KEY (id_ativo) REFERENCES ativo (id_ativo),
    FOREIGN KEY (id_funcionario) REFERENCES funcionario (id_funcionario)
);

SELECT
    P.tipo,
    P.modelo,
    P.serial_number,
    C.nome 
FROM
    ativo P
INNER JOIN
  funcionario C
ON P.id_ativo = C.id_funcionario;

INSERT INTO ativo_emprestado (id_funcionario, id_ativo) VALUES (1, 5),
															(2, 4),
															(7, 3),
															(6, 2),
															(3, 6),
															(4, 1),
															(5, 7);
SELECT * FROM ativo_emprestado;

CREATE TABLE transferencia (
    id_transfererencia INT NOT NULL AUTO_INCREMENT,
    id_ativo INT NOT NULL,
    id_novo_responsavel INT NOT NULL,
    id_antigo_responsavel INT NOT NULL,
    transferido_em TIMESTAMP,
    PRIMARY KEY (`id_transfererencia`),
    FOREIGN KEY (id_ativo) REFERENCES ativo (id_ativo),
    FOREIGN KEY (id_novo_responsavel) REFERENCES funcionario (id_funcionario),
    FOREIGN KEY (id_antigo_responsavel) REFERENCES funcionario (id_funcionario)
);
INSERT INTO transferencia (id_ativo, id_novo_responsavel, id_antigo_responsavel) VALUES (5, 1, 5),
																						(4, 2, 4),
																						(3, 7, 3),
																						(2, 6, 7),
																						(6, 3, 2),
																						(1, 4, 1),
																						(7, 5, 6);
SELECT * FROM transferencia;

CREATE TABLE usuarios ( 
idusuario INT NOT NULL AUTO_INCREMENT,
nome VARCHAR (45) NOT NULL,
username VARCHAR(20) NOT NULL,
password_user VARCHAR(32) NOT NULL, 
registrado_em TIMESTAMP,   
PRIMARY KEY (`idusuario`)
); 