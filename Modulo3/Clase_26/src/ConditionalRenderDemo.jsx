import React, { useState } from "react";

const ConditionalRenderDemo = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div
      style={{
        backgroundColor: "beige",
        fontFamily: "Sans serif",
        padding: "1rem",
      }}
    >
      <h3>Ejemplo de renderizado condicional</h3>
      {loggedIn ? (
        <p style={{ color: "green" }}>Bienvenido 🙌🏻</p>
      ) : (
        <p style={{ color: "red" }}>Por favor inicia sesion</p>
      )}

      <button
        style={{
          padding: "5px 10px",
          cursor: "pointer",
          marginTop: "10px",
          backgroundColor: "tomato",
          border: "none",
        }}
        onClick={() => setLoggedIn(!loggedIn)}
      >
        {loggedIn ? "Cerrar sesion" : "Iniciar Sesion"}
      </button>
    </div>
  );
};

export default ConditionalRenderDemo;
