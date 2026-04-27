import React from "react";
import Button from "@mui/material/Button";

export const BotonBasico = () => {
  return (
    <div>
      <h2>Ejemplo 1</h2>
      <Button color="success" variant="contained">
        Contained
      </Button>
      <Button variant="text">Text</Button>
      <Button variant="outlined">Contained</Button>
    </div>
  );
};
