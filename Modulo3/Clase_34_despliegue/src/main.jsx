import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// AGREGADO: BrowserRouter habilita el sistema de rutas en toda la aplicación
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* AGREGADO: BrowserRouter envuelve la app para que React Router funcione en todos los componentes */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
