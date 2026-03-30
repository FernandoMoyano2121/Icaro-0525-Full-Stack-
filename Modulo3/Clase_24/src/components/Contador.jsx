import { useState } from "react";

export const Contador = () => {
  //const [estadoInicial, funcionQueModificaElEstado] = useState(valorInicial);
  const [numero, setNumero] = useState(0);

  //OPCION 2
  /*   const handleIncrement = () => {
    setNumero(numero + 1);
  }; */

  //OPCION 3
  function handleIncrement() {
    setNumero(numero + 1);
  }

  return (
    <div>
      <h2>Contador comienza en: {numero} </h2>
      {/* OPCION 1 */}
      {/*  <button onClick={() => setNumero(numero + 1)}>+1</button> */}
      {/* OPCION 2 */}
      {/* <button onClick={handleIncrement}>+1</button> */}
      {/* OPCION 3 */}
      <button onClick={handleIncrement}>+1</button>
    </div>
  );
};
