import React from "react";
import { useState } from "react";

/* const estilosCard = {
  container: {
    backgroundColor: "#e3f2fd",
    padding: "20px",
    borderRadius: "12px",
    border: "2px solid #2196f3",
    maxWidth: "350px",
    margin: "20px auto",
  },
  titulo: {
    color: "#1565c0",
    marginBottom: "15px",
    fontSize: "1.5rem", // También podemos usar strings con unidades
  },
  texto: {
    color: "#424242",
    lineHeight: "1.6",
  },
  boton: {
    backgroundColor: "#2196f3",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    marginTop: "15px",
  },
}; */

export const CardBasica = () => {
  return (
    <div
      style={{
        backgroundColor: "#f8f9fa",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        maxWidth: "300px",
        margin: "20px auto",
      }}
    >
      <h2 style={{ color: "#333", marginBottom: "20px" }}>Card Basica</h2>
      <p style={{ color: "#666", lineHeight: 1.5 }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, tempora.
      </p>
    </div>
  );
};

export const CardDinamica = () => {
  //Estado de la tarjeta
  const [activa, setActiva] = useState(false);

  const estilosDinamicos = {
    container: {
      backgroundColor: activa ? "#c8e6c9" : "#ffcdd2",
      padding: "20px",
      borderRadius: "12px",
      border: `3px solid ${activa ? "#4caf50" : "#f44336"}`,
      maxWidth: "350px",
      margin: "20px auto",
      transition: "all 0.3s ease", // Las transiciones funcionan!
    },
    estado: {
      color: activa ? "#2e7d32" : "#c62828",
      fontWeight: "bold",
      fontSize: "1.2rem",
    },
  };

  return (
    <div style={estilosDinamicos.container}>
      <h2>Estilos Dinamicos</h2>
      <p>Estado: {activa ? "✅Activa" : "❌Inactiva"}</p>

      <button
        style={{
          //...estilosCard.boton
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "1rem",
          marginTop: "15px",
          backgroundColor: activa ? "#4caf50" : "#f44336",
        }}
        onClick={() => setActiva(!activa)}
      >
        Toggle Estado
      </button>
    </div>
  );
};

export const EjemploInlineStyles = () => {
  return (
    <div>
      <header
        style={{
          backgroundColor: "#1976d2",
          color: "white",
          padding: "20px",
          borderRadius: "8px",
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        <h1>Ejemplo 1 estilos en linea</h1>
      </header>
      <section style={{ marginTop: "40px" }}>
        <h2
          style={{
            borderBottom: "2px solid #1976d2",
            paddingBottom: "10px",
            color: "#333",
          }}
        >
          Estilos en linea Básicos
        </h2>
        <CardBasica />
        <CardDinamica />
      </section>
    </div>
  );
};
