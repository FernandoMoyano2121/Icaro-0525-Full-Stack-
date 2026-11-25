import { Link } from "react-router-dom";
import { useCarritoStore } from "../store/carritoStore";

export const Header = () => {
  const totalItems = useCarritoStore((state) =>
    // reduce recorre los items y suma sus cantidades para mostrar el total de unidades en el carrito.
    state.items.reduce((total, item) => total + item.cantidad, 0),
  );
  return (
    <div>
      <h2>Mini Ecommerce con Zustand</h2>
      <Link to={"/carrito"}>
        {" "}
        🛒{totalItems > 0 && <span>{totalItems}</span>}
      </Link>
    </div>
  );
};
