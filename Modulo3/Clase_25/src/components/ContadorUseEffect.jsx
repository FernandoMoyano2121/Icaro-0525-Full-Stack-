//rafce
import React, { useEffect, useState } from "react";

const ContadorUseEffect = () => {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    console.log(` valor actual del contador:  ${contador}`);
  }, [contador]);

  function handleContador() {
    setContador(contador + 1);
  }

  return (
    <>
      <button onClick={handleContador}>Incrementar</button>
      {/*<button onClick={() => setContador(contador + 1)}>Incrementar</button */}
      <div>{contador}</div>
    </>
  );
};

export default ContadorUseEffect;
