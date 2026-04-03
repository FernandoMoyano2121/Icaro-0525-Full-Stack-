import React from "react";

export const Boton = () => {
  function handleClick() {
    alert("Hice click! ");
  }

  /*
    const handleClick = () => {
    alert("Hice click! ");
  };
 */
  return <button onClick={handleClick}>Click</button>;
  /*  return <button onClick={() => alert("Hice click!")}>Click</button>; */
};
