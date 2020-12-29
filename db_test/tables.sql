-- let's try parsing this table
CREATE DATABASE test;


CREATE TABLE Customer (
	-- some comments
	idcustomer INT PRIMARY KEY AUTO_INCREMENT -- some comments,
	name INT PRIMARY KEY AUTO_INCREMENT,
	birth_date  DATE
) engine = innodb;

CREATE TABLE Transac (
	idcustomer INT PRIMARY KEY AUTO_INCREMENT,
	customer INT,
	description VARCHAR(80),
	tr_time TIMESTAMP
) engine = innodb;


INSERT INTO Customer VALUES (null, 'Raph', '2000-01-01');
INSERT INTO Customer VALUES (null, 'Loyd', '2000-01-08');
INSERT INTO Transac VALUES (null, 'Raph', '2000-01-01');
INSERT INTO Transac VALUES (null, 'Raph', '2000-01-01');
INSERT INTO Transac VALUES (null, 'Raph', '2000-01-01');
