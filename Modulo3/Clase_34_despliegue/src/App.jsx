import { Routes, Route } from "react-router-dom";
import { ProductosPage } from "./pages/ProductosPage";
import { CarritoPage } from "./pages/CarritoPage";
// AGREGADO: Importamos la nueva página de detalle de producto
import { ProductoDetalle } from "./pages/ProductoDetalle";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductosPage />} />
      <Route path="/carrito" element={<CarritoPage />} />
      {/* AGREGADO: Ruta para la vista detalle. Usa query params (?id=X)
          en lugar de un param de ruta dinámica (/producto/:id) para
          mostrar el uso de useSearchParams */}
      <Route path="/producto" element={<ProductoDetalle />} />
    </Routes>
  );
}

export default App;
