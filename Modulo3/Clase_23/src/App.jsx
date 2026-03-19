import React from "react";
import { Bienvenida } from "./components/Bienvenida";
import { Separador } from "./components/Separador";
import { Despedida } from "./components/Despedida";

export const App = () => {
  return (
    <>
      <Bienvenida />
      <Separador />
      <Despedida />
    </>
  );
};
