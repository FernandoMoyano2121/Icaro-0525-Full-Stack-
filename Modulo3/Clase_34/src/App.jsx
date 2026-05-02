import { Route, Routes } from "react-router-dom";
import { CarritoPage } from "./pages/CarritoPage";
import { ProductoDetalle } from "./pages/ProductoDetalle";
import { ProductosPage } from "./pages/ProductosPage";

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ProductosPage />}></Route>
        <Route path="/carrito" element={<CarritoPage />}></Route>
        <Route path="/producto" element={<ProductoDetalle />}></Route>
      </Routes>
    </div>
  );
};
