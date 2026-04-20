import React from "react";

export const Home = () => {
  return (
    <div style={styles.pagina}>
      <h1>🏠Pagina de Inicio</h1>
      <p>Bienvenido a nuestra aplicación con React Router</p>
    </div>
  );
};

const styles = {
  pagina: {
    background: "#f8f9fa",
    padding: "40px",
    borderRadius: "8px",
    textAlign: "center",
  },
};
