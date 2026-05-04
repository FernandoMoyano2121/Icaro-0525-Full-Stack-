import { useCarritoStore } from "../store/carritoStore";
import { useFetch } from "../hooks/useFetch";
// AGREGADO: Link para poder navegar a la vista detalle de cada producto
import { Link } from "react-router-dom";

// La base URL se lee desde la variable de entorno definida en .env
// En Vite todas las variables expuestas al cliente deben tener el prefijo VITE_
const API_URL = `${import.meta.env.VITE_API_BASE_URL}/products`;

// eslint-disable-next-line react-refresh/only-export-components
export const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "900px",
    margin: "0 auto",
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginTop: "20px",
  },
  seccion: {
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    background: "#fff",
  },
  productos: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  productoCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    background: "#f8f9fa",
    borderRadius: "5px",
  },
  productoNombre: {
    flex: 1,
  },
  productoPrecio: {
    fontWeight: "bold",
    marginRight: "10px",
  },
  botonAgregar: {
    padding: "5px 15px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  // AGREGADO: Estilo para el link "Ver detalle", mismo diseño que botonAgregar pero en negro
  linkDetalle: {
    padding: "5px 15px",
    background: "#212529",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textDecoration: "none",
    marginRight: "8px",
  },
  itemCarrito: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    borderBottom: "1px solid #eee",
  },
  controlesCantidad: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  botonCantidad: {
    width: "25px",
    height: "25px",
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
    borderRadius: "3px",
  },
  cantidad: {
    minWidth: "30px",
    textAlign: "center",
  },
  botonEliminar: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
  total: {
    marginTop: "15px",
    padding: "10px",
    background: "#e9ecef",
    borderRadius: "5px",
    textAlign: "right",
    fontSize: "18px",
  },
  botonVaciar: {
    marginTop: "10px",
    width: "100%",
    padding: "10px",
    background: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  vacio: {
    textAlign: "center",
    color: "#6c757d",
    fontStyle: "italic",
  },
  mensaje: {
    textAlign: "center",
    padding: "20px",
    color: "#6c757d",
    fontStyle: "italic",
  },
  error: {
    textAlign: "center",
    padding: "20px",
    color: "#dc3545",
  },
};

export const ListaProductos = () => {
  const agregarProducto = useCarritoStore((state) => state.agregarProducto);
  const { data: productos, loading, error } = useFetch(API_URL);

  if (loading) {
    return (
      <div style={styles.seccion}>
        <h3>🛍️ Productos Disponibles</h3>
        <p style={styles.mensaje}>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.seccion}>
        <h3>🛍️ Productos Disponibles</h3>
        <p style={styles.error}>Error al cargar productos: {error}</p>
      </div>
    );
  }

  return (
    <div style={styles.seccion}>
      <h3>🛍️ Productos Disponibles</h3>
      <div style={styles.productos}>
        {productos.map((producto) => (
          <div key={producto.id} style={styles.productoCard}>
            <span style={styles.productoNombre}>{producto.title}</span>
            <span style={styles.productoPrecio}>${producto.price}</span>

            {/* AGREGADO: Link que navega a /producto?id=X
                Usamos query param (?id) en lugar de ruta dinámica (/producto/:id)
                para ilustrar el uso de useSearchParams en la página de detalle */}
            <Link
              to={`/producto?id=${producto.id}`}
              style={styles.linkDetalle}
            >
              Ver detalle
            </Link>

            <button
              onClick={() =>
                agregarProducto({
                  id: producto.id,
                  nombre: producto.title,
                  precio: producto.price,
                })
              }
              style={styles.botonAgregar}
            >
              Agregar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
