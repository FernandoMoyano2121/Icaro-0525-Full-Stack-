//componente hijo

import { Contador } from "./components/Contador";
import { ContadorCompleto } from "./components/ContadorCompleto";
import { Saludo } from "./components/Saludo";

/*
export const ComponenteHijo = (props) => {
  return <div>{props.saludo}</div>;
  };
*/

export const ComponenteHijo = ({ saludo }) => {
  return <div>{saludo}</div>;
};

//componente principal
export const App = () => {
  return (
    <>
      <ComponenteHijo saludo="Hola Alumnos! " />
      <Saludo nombre="Mariana" edad={30} />
      <Saludo nombre="David" edad={25} />
      <Saludo nombre="Enrique" edad={35} />

      <Contador />
      <br />
      <hr />
      <br />
      <ContadorCompleto />
    </>
  );
};
