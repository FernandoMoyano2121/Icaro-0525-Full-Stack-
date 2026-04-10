import React from "react";
import { useContador } from "../hooks/useContador";

export const Contador = () => {
  const { contador, incrementar, decrementar, resetear } = useContador();

  return (
    <div>
      <h1>Contador: {contador}</h1>
      <button onClick={decrementar}>Decrementar</button>
      <button onClick={resetear}>Resetear</button>
      <button onClick={incrementar}>Incrementar</button>
    </div>
  );
};
