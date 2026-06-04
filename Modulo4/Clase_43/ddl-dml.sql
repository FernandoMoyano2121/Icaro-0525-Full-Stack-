CREATE DATABASE IF NOT EXISTS biblioteca;
USE biblioteca;

-- CREATE TABLE <nombreDeTabla>
CREATE TABLE IF NOT EXISTS autores(
	id INT AUTO_INCREMENT NOT NULL,
	nombre VARCHAR(100) NOT NULL,
	apellido VARCHAR(100) NOT NULL,
	nacionalidad VARCHAR(50),
	fecha_nacimiento DATE,
	activo BOOLEAN DEFAULT TRUE,
	creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
	PRIMARY KEY(id)
);

-- CREATE TABLE <nombreDeTabla>
CREATE TABLE IF NOT EXISTS libros(
-- <nombreDeColumna><TipoDeDato><Restricción>
	id INT AUTO_INCREMENT NOT NULL,
    autor_id INT NOT NULL,
	titulo VARCHAR(100) NOT NULL,
	descripcion TEXT,
	precio DECIMAL(10, 2) NOT NULL,
	stock INT DEFAULT 0,
    fecha_publicacion DATE,
	activo BOOLEAN DEFAULT TRUE,
	creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
	PRIMARY KEY(id),
    CONSTRAINT fk_libros_autor
		FOREIGN KEY(autor_id)
        REFERENCES autores(id)
        ON DELETE CASCADE
        
);

ALTER TABLE libros
	ADD COLUMN paginas INT NULL;
    
    DESCRIBE libros;
    
-- ALTER TABLE autores
-- REANAME COLUMN nombreColumna - nuevoValor

ALTER TABLE autores
	DROP COLUMN nacionalidad;
    
ALTER TABLE autores
	ADD COLUMN nacionalidad VARCHAR(50);




  USE biblioteca;

INSERT INTO autores(nombre, apellido, nacionalidad, fecha_nacimiento, activo)
	VALUES
		('Gabriel',     'Garcia Márquez','Colombia',    '1927-03-06', TRUE),
		('Isabel',      'Allende',    'Chilena',        '1942-08-02', TRUE),
		('Stephen',     'King',       'Americana',      '1947-09-21', TRUE ),
		('Julio',       'Cortázar',   'Argentina',      '1914-08-26', TRUE),
		('Pablo',       'Neruda',     'Chilena',        '1904-07-12', TRUE),
		('Mario',       'Vargas Llosa','Peruana',       '1936-03-28', TRUE);
        
SELECT * FROM autores;

SELECT 
	nombre, nacionalidad
FROM autores;


SELECT 
	nombre       AS Nombre del autor,
  nacionalidad AS Nacionalidad del autor
FROM autores;

SELECT * FROM autores
	WHERE nacionalidad = 'Argentina';


INSERT INTO libros (titulo, precio, stock, autor_id)
VALUES
    ('El amor en los tiempos del cólera',    1400.00, 20,  1),  -- García Márquez
    ('La casa de los espíritus',             1300.00, 18,  3),  -- Allende (id=3)
    ('El resplandor',                        1100.00, 30,  4),  -- King (id=4)
    ('It',                                   1600.00, 22,  4),  -- King también
    ('Rayuela',                              1250.00, 10,  5),  -- Cortázar (id=5)
    ('La ciudad y los perros',               1100.00, 12,  7);  -- Vargas Llosa (id=7);




