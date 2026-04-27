import Button from "@mui/material/Button";
import React from "react";

/* const temaPersonalizadoEjemplo = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#5c0f13",
      light: "#81C784", // Versión clara (generada automáticamente si no se especifica)
      dark: "#7c1344", // Versión oscura
      contrastText: "#fff", // Color del texto sobre este fondo
    },
    // Color secundario - usado para elementos de acento
    secondary: {
      main: "#FF9800", // Naranja
      light: "#FFB74D",
      dark: "#F57C00",
      contrastText: "#000",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        padding: "8px 24px",
      },
    },
  },
});
 */

export const ThemeProviderEjemplo = () => {
  return (
    <div>
      <Button variant="contained" color="secondary">
        Boton primario
      </Button>
    </div>
  );
};
