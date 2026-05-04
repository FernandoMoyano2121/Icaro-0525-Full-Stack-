// AGREGADO: Link de React Router para el enlace "volver a la tienda"
import { Link } from "react-router-dom";
import { Carrito } from "../components/Carrito";
import { styles } from "../components/ListaProductos";

// AGREGADO: Estilo para el enlace de volver a la página de productos
const stylesBack = {
  backLink: {
    display: "inline-block",
    marginBottom: "15px",
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "bold",
    fontSize: "15px",
  },
};

// PÁGINA 2: Carrito de Compras
// Renderiza el componente Carrito (con todos sus controles de cantidad, eliminar, etc.)
// y un enlace para volver al listado de productos sin perder el estado del carrito.
export const CarritoPage = () => {
  return (
    <div style={styles.container}>
      <h2>Mi Carrito</h2>

      {/* AGREGADO: Enlace para volver a la tienda. Usa Link en vez de <a>
          para no recargar la página y conservar el estado de Zustand */}
      <Link to="/" style={stylesBack.backLink}>
        ← Seguir comprando
      </Link>

      {/* El componente Carrito ya maneja toda la lógica de items, cantidades y totales */}
      <Carrito />
    </div>
  );
};
