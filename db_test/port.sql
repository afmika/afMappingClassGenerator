DROP USER port CASCADE;
CREATE USER port IDENTIFIED BY port;
GRANT DBA TO port;
CONNECT port
port


CREATE TABLE Bateau (
	nom VARCHAR (50) PRIMARY KEY,
	capacite FLOAT
);

CREATE TABLE Quai (
	idquai VARCHAR (20) PRIMARY KEY,
	nombre_bateau INT DEFAULT 1
);

CREATE TABLE Prevision (
	idprevision VARCHAR (20) PRIMARY KEY,
	date_saisie TIMESTAMP,
	date_arrivee TIMESTAMP,
	duree FLOAT,
	nom_bateau VARCHAR (50),
	idquai VARCHAR (20),
	FOREIGN KEY (idprevision) REFERENCES Prevision(idprevision),
	FOREIGN KEY (nom_bateau) REFERENCES Bateau(nom)
);

CREATE TABLE Effectivite (
	ideffectivite VARCHAR (20) PRIMARY KEY,
	date_arrivee TIMESTAMP,
	date_depart TIMESTAMP,
	idprevision VARCHAR (20),
	FOREIGN KEY (idprevision) REFERENCES Prevision (idprevision)
);

INSERT INTO Bateau VALUES ('Vikings', 30);
INSERT INTO Bateau VALUES ('Drifters', 80);
INSERT INTO Bateau VALUES ('Luffies', 120);
INSERT INTO Bateau VALUES ('Georgia', 350);
INSERT INTO Bateau VALUES ('Georgia II', 300);
INSERT INTO Bateau VALUES ('Titanic v2', 350);

CREATE SEQUENCE QuaiSequence;
INSERT INTO Quai VALUES ('Quai_' || QuaiSequence.nextval, 2);
INSERT INTO Quai VALUES ('Quai_' || QuaiSequence.nextval, 3);
INSERT INTO Quai VALUES ('Quai_' || QuaiSequence.nextval, 4);
CREATE TABLE FactureEscale (
	idfactureescale VARCHAR (20) PRIMARY KEY,
	idescale VARCHAR (20), -- escale correspondant
	idquai VARCHAR (20),
	arrivee TIMESTAMP, -- arrivee sur ce quai
	depart TIMESTAMP, -- depart sur ce quai
	duree float,
	tarif number, -- en Ar
	duree_penalite float,
	penalite number, -- en Ar
	total number, -- en Ar
	FOREIGN KEY (idescale) REFERENCES Escale (idescale),
	FOREIGN KEY (idquai) REFERENCES Quai (idquai)
);

-- test
-- 1,5
-- 1,5
-- 2,3
-- 1,3
-- 3,9
-- 7,10
-- 7,10
-- VS --
-- 1,5
-- 1,5,1
-- 2,3
-- 1,3,1
-- 3,9
-- 7,10
-- 7,10

CREATE OR REPLACE VIEW EffectiviteQuai AS 
	SELECT Effectivite.*, Quai.* FROM Effectivite 
	JOIN Prevision ON Effectivite.idprevision = Prevision.idprevision
	JOIN Quai ON Prevision.idquai = Quai.idquai;


CREATE SEQUENCE PrevisionSequence;
INSERT INTO Prevision VALUES ('Prevision_' || PrevisionSequence.nextval, TIMESTAMP '2020-10-10 01:00:00', TIMESTAMP '2020-10-10 01:00:00', 4*60, 'Vikings', 'Quai_1');
INSERT INTO Prevision VALUES ('Prevision_' || PrevisionSequence.nextval, TIMESTAMP '2020-10-10 01:00:00', TIMESTAMP '2020-10-10 01:00:00', 4*60, 'Drifters', 'Quai_1');
INSERT INTO Prevision VALUES ('Prevision_' || PrevisionSequence.nextval, TIMESTAMP '2020-10-10 01:00:00', TIMESTAMP '2020-10-10 02:00:00', 1*60, 'Georgia', 'Quai_1');
INSERT INTO Prevision VALUES ('Prevision_' || PrevisionSequence.nextval, TIMESTAMP '2020-10-10 01:00:00', TIMESTAMP '2020-10-10 01:00:00', 2*60, 'Georgia II', 'Quai_1');
INSERT INTO Prevision VALUES ('Prevision_' || PrevisionSequence.nextval, TIMESTAMP '2020-10-10 01:00:00', TIMESTAMP '2020-10-10 03:00:00', 6*60, 'Titanic v2', 'Quai_1');
INSERT INTO Prevision VALUES ('Prevision_' || PrevisionSequence.nextval, TIMESTAMP '2020-10-10 01:00:00', TIMESTAMP '2020-10-10 07:00:00', 3*60, 'Georgia', 'Quai_1');
INSERT INTO Prevision VALUES ('Prevision_' || PrevisionSequence.nextval, TIMESTAMP '2020-10-10 01:00:00', TIMESTAMP '2020-10-10 07:00:00', 3*60, 'Vikings', 'Quai_1');

CREATE SEQUENCE EffectiviteSequence;
INSERT INTO Effectivite VALUES ('Effectivite_' || EffectiviteSequence.nextval, TIMESTAMP '2020-10-10 01:00:00', TIMESTAMP '2020-10-10 05:00:00', 'Prevision_2');
INSERT INTO Effectivite VALUES ('Effectivite_' || EffectiviteSequence.nextval, TIMESTAMP '2020-10-10 01:00:00', TIMESTAMP '2020-10-10 03:00:00', 'Prevision_4');


COMMIT;

