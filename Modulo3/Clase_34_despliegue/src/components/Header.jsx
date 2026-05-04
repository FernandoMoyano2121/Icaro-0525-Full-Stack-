import { Link } from "react-router-dom";
import { useCarritoStore } from "../store/carritoStore";

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  carritoLink: {
    position: "relative",
    textDecoration: "none",
    fontSize: "28px",
    lineHeight: 1,
  },
  badge: {
    position: "absolute",
    top: "-8px",
    right: "-10px",
    background: "#dc3545",
    color: "white",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    fontSize: "11px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
};

// COMPONENTE COMPARTIDO: Header de la aplicación.
// Se extrae en su propio componente para poder reutilizarlo en todas las páginas
// sin duplicar la lógica del badge (que depende del estado global del carrito).
export const Header = () => {
  // Leemos el total de items directamente desde el estado global de Zustand
  const totalItems = useCarritoStore((state) =>
    state.items.reduce((total, item) => total + item.cantidad, 0)
  );

  return (
    <div style={styles.header}>
      {/* El título es un link a "/" para poder volver al inicio desde cualquier página */}
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <h2 style={{ margin: 0 }}>Mini E-commerce con Zustand</h2>
      </Link>

      <Link to="/carrito" style={styles.carritoLink} title="Ver carrito">
        🛒
        {totalItems > 0 && (
          <span style={styles.badge}>{totalItems}</span>
        )}
      </Link>
    </div>
  );
};
