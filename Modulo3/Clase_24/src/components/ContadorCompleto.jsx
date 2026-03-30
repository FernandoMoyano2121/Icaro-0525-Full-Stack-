import React, { useState } from "react";

export const ContadorCompleto = () => {
  const [numero, setNumero] = useState(0);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <div style={{ fontWeight: "bold" }}>Contador: {numero}</div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        <button onClick={() => setNumero(numero - 1)}>Decrementar</button>
        <button onClick={() => setNumero(0)}>Reset</button>
        <button onClick={() => setNumero(numero + 1)}>Incrementar</button>
      </div>
    </div>
  );
};
