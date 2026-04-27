import React from "react";
import "./EjemploCssTradicional.css";

export const CardTradicional = () => {
  return (
    <div className="card">
      <h2 className="card-titulo">Card con CSS Tradicional</h2>
      <p className="card-texto">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque rerum,
        quos error numquam praesentium perferendis!
      </p>
      <button className="card-boton">Ver Más</button>
    </div>
  );
};

export const EjemploCSSTradicional = () => {
  return (
    <div className="ejemplo-css-container">
      <header className="ejemplo-header">
        <h1>Ejemplo 2 Archivo CSS Tradicional</h1>
      </header>
      <main className="ejemplo-main">
        <section className="ejemplo-seccion">
          <CardTradicional />
        </section>
      </main>
    </div>
  );
};
