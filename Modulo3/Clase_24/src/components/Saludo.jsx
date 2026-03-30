import React from "react";

export const Saludo = ({ nombre, edad }) => {
  return (
    <div style={{ backgroundColor: "tomato" }}>
      <p style={{ color: "white" }}>
        Hola mi nombre es: {nombre} y tengo {edad} años
      </p>
    </div>
  );
};
