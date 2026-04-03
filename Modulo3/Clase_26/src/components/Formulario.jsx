import React from "react";

export const Formulario = () => {
  function handleSubmit(e) {
    e.preventDefault();
    console.log("Datos enviados al servidor");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          <input type="text" placeholder="ingresa tu nombre" />
        </label>
      </div>
      <br />
      <div>
        <label>
          <input type="number" placeholder="ingresa tu edad" />
        </label>
      </div>
      <br />
      <button type="submit">Enviar</button>
    </form>
  );
};
