// AGREGADO: useSearchParams permite leer y manipular los query params de la URL (?id=X)
import { useSearchParams, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useCarritoStore } from "../store/carritoStore";
import { styles } from "../components/ListaProductos";
// AGREGADO: Header compartido que muestra el título y el ícono del carrito con badge
import { Header } from "../components/Header";

const estilosDetalle = {
  pagina: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "700px",
    margin: "0 auto",
  },
  backLink: {
    display: "inline-block",
    marginBottom: "20px",
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "bold",
  },
  card: {
    display: "flex",
    gap: "30px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    background: "#fff",
  },
  imagen: {
    width: "200px",
    height: "200px",
    objectFit: "contain",
    flexShrink: 0,
  },
  info: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  titulo: {
    fontSize: "20px",
    fontWeight: "bold",
    margin: 0,
  },
  precio: {
    fontSize: "22px",
    color: "#28a745",
    fontWeight: "bold",
    margin: 0,
  },
  categoria: {
    display: "inline-block",
    padding: "3px 10px",
    background: "#e9ecef",
    borderRadius: "20px",
    fontSize: "13px",
    color: "#6c757d",
    textTransform: "capitalize",
  },
  descripcion: {
    color: "#444",
    lineHeight: "1.6",
    margin: 0,
  },
  rating: {
    color: "#6c757d",
    fontSize: "14px",
  },
};

// PÁGINA 3: Detalle de Producto
// Lee el query param "id" de la URL (?id=X) con useSearchParams,
// fetchea ese producto puntual desde la API y muestra todos sus datos.
export const ProductoDetalle = () => {
  // AGREGADO: useSearchParams devuelve un objeto similar a URLSearchParams.
  // Con searchParams.get("id") leemos el valor del query param ?id=X
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const agregarProducto = useCarritoStore((state) => state.agregarProducto);

  // La base URL se lee desde la variable de entorno definida en .env
  const { data: producto, loading, error } = useFetch(
    `${import.meta.env.VITE_API_BASE_URL}/products/${id}`
  );

  // AGREGADO: Si no hay id en la URL mostramos un mensaje de error descriptivo
  if (!id) {
    return (
      <div style={estilosDetalle.pagina}>
        <p style={styles.error}>No se especificó ningún producto.</p>
        <Link to="/" style={estilosDetalle.backLink}>← Volver al listado</Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={estilosDetalle.pagina}>
        <p style={styles.mensaje}>Cargando producto...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={estilosDetalle.pagina}>
        <p style={styles.error}>Error al cargar el producto: {error}</p>
        <Link to="/" style={estilosDetalle.backLink}>← Volver al listado</Link>
      </div>
    );
  }

  return (
    <div style={estilosDetalle.pagina}>
      {/* AGREGADO: Header compartido, igual que en ProductosPage, con badge reactivo */}
      <Header />
      {/* Enlace para volver al listado */}
      <Link to="/" style={estilosDetalle.backLink}>← Volver al listado</Link>

      <div style={estilosDetalle.card}>
        {/* La API devuelve una URL de imagen en producto.image */}
        <img
          src={producto.image}
          alt={producto.title}
          style={estilosDetalle.imagen}
        />

        <div style={estilosDetalle.info}>
          <p style={estilosDetalle.titulo}>{producto.title}</p>
          <p style={estilosDetalle.precio}>${producto.price}</p>

          {/* AGREGADO: producto.category viene directamente de la API */}
          <span style={estilosDetalle.categoria}>{producto.category}</span>

          <p style={estilosDetalle.descripcion}>{producto.description}</p>

          {/* AGREGADO: producto.rating es un objeto { rate, count } que devuelve la API */}
          <p style={estilosDetalle.rating}>
            ⭐ {producto.rating.rate} / 5 &nbsp;·&nbsp; {producto.rating.count} reseñas
          </p>

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
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};
