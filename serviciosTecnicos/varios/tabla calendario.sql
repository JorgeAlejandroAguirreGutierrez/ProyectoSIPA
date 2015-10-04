
-- http://gucky.uni-muenster.de/cgi-bin/rgbtab-en

CREATE TABLE calendario (
	id serial NOT NULL,
	profesor varchar,
	hora_inicio timestamp,
	hora_fin timestamp,
	color varchar,
	anotacion varchar,
	fk_sala smallint,
	PRIMARY KEY(id)
);


DELETE FROM calendario;
ALTER SEQUENCE calendario_id_seq RESTART 1;

INSERT INTO calendario(profesor, hora_inicio, hora_fin, color, anotacion, fk_sala) VALUES ('Carlos Cuesta', '2013-12-13 09:00:00am', '2013-12-13 10:30:00am', '#8B7D6B', 'Requiere monitor disponible para apoyo en talleres', 1);
INSERT INTO calendario(profesor, hora_inicio, hora_fin, color, anotacion, fk_sala) VALUES ('Carlos Cuesta', '2013-12-13 07:00:00am', '2013-12-13 09:30:00am', '#8B7D6B', '', 2);
INSERT INTO calendario(profesor, hora_inicio, hora_fin, color, anotacion, fk_sala) VALUES ('Carlos Cuesta', '2013-12-12 08:30:00am', '2013-12-12 10:00:00am', '#8B7D6B', '', 2);


INSERT INTO calendario(profesor, hora_inicio, hora_fin, color, anotacion, fk_sala) VALUES ('Carlos H. Gómez', '2013-12-13 11:00:00am', '2013-12-13 01:00:00pm', '#B03060', 'Requiere simuladores empresariales', 1);
---2013-12-10T09:00:00Z
INSERT INTO calendario(profesor, hora_inicio, hora_fin, color, anotacion, fk_sala) VALUES ('Carlos H. Gómez', '2013-12-11T18:00:00Z', '2013-12-11T20:00:00Z', '#B03060', 'Requiere simuladores empresariales', 1);


INSERT INTO calendario(profesor, hora_inicio, hora_fin, color, anotacion, fk_sala) VALUES ('José F, Castellanos', '2013-12-13 01:00:00pm', '2013-12-13 03:00:00pm', '#B8860B', '', 1);
INSERT INTO calendario(profesor, hora_inicio, hora_fin, color, anotacion, fk_sala) VALUES ('José F. Castellanos', '2013-12-13 05:00:00pm', '2013-12-13 07:00:00pm', '#B8860B', '', 2);
INSERT INTO calendario(profesor, hora_inicio, hora_fin, color, anotacion, fk_sala) VALUES ('José F. Castellanos', '2013-12-10 08:00:00am', '2013-12-10 10:00:00am', '#B8860B', '', 2);


INSERT INTO calendario(profesor, hora_inicio, hora_fin, color, anotacion, fk_sala) VALUES ('Adriana Morales', '2013-12-13 03:00:00pm', '2013-12-13 04:00:00pm', '#6B8E23', '', 2);
INSERT INTO calendario(profesor, hora_inicio, hora_fin, color, anotacion, fk_sala) VALUES ('Adriana Morales', '2013-12-11 02:00:00pm', '2013-12-11 04:00:00pm', '#6B8E23', '', 2);


SELECT * FROM calendario WHERE fk_sala = 2