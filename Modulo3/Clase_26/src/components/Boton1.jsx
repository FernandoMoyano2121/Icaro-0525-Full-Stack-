import React from "react";

export const Boton1 = ({ mensaje }) => {
  function handleClick(mensaje) {
    alert(mensaje);
  }

  /*
    const handleClick = (mensaje) => {
    alert(mensaje);
  };
  */

  return <button onClick={() => handleClick(mensaje)}>Boton1</button>;
};
