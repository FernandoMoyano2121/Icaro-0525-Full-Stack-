import React from "react";
import { BotonBasico } from "./components/BotonBasico";
import { ComponentesComunes } from "./components/ComponentesComunes";
import { ModalBasico } from "./components/ModalBasico";
import { ThemeProviderEjemplo } from "./components/ThemeProviderEjemplo";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";

const darkTheme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#859210", // Verde - color principal
      light: "#81C784", // Versión clara (generada automáticamente si no se especifica)
      dark: "#d0e749", // Versión oscura
      contrastText: "#fff", // Color del texto sobre este fondo
    },
  },
});

export const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
        <Button variant="contained">Ver mas</Button>
      </main>
    </ThemeProvider>
  );
};
