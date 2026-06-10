CREATE DATABASE IF NOT EXISTS tienda;

USE tienda;

CREATE TABLE categorias(
  id INT AUTO_INCREMENT NOT NULL ,
  nombre VARCHAR(80) NOT NULL,
  descripcion TEXT,

  PRIMARY KEY(id)
);

CREATE TABLE productos(
  id INT AUTO_INCREMENT NOT NULL,
  nombre VARCHAR(150) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  activo BOOLEAN NOT NULL DEFAULT TRUE,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                           ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY(id)
);


CREATE TABLE producto_categoria(
  producto_id INT NOT NULL,
  categoria_id INT NOT NULL,
  
  PRIMARY KEY(producto_id, categoria_id),
  
  CONSTRAINT fk_pc_producto
    FOREIGN KEY(producto_id)
    REFERENCES productos(id)
    ON DELETE CASCADE,
    
  CONSTRAINT fk_pc_categoria
    FOREIGN KEY(categoria_id)
    REFERENCES categorias(id)
    ON DELETE CASCADE
  );
