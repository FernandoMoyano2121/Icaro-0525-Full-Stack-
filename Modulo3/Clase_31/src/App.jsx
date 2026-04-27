import React from "react";
import { EjemploInlineStyles } from "./examples/EjemploInlineStyles";
import { EjemploCSSTradicional } from "./examples/EjemploCSSTradicional";
import { EjemploCssModules } from "./examples/EjemploCssModules/EjemploCssModules";

export const App = () => {
  return (
    <div>
      <EjemploInlineStyles />
      <EjemploCSSTradicional />
      <EjemploCssModules />
    </div>
  );
};
