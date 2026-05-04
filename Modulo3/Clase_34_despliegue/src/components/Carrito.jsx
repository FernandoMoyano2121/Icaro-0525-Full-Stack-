import { useCarritoStore } from "../store/carritoStore";
import { styles } from "./ListaProductos";

//COMPONENTE: 2 Carrito
export const Carrito = () => {
  const items = useCarritoStore((state) => state.items);
  const eliminarProducto = useCarritoStore((state) => state.eliminarProducto);
  const actualizarCantidad = useCarritoStore(
    (state) => state.actualizarCantidad
  );
  const vaciarCarrito = useCarritoStore((state) => state.vaciarCarrito);
  const getTotalPrecio = useCarritoStore((state) => state.getTotalPrecio);
  const getTotalItems = useCarritoStore((state) => state.getTotalItems);

  //Comprobación si el carrito está vacio
  if (items.length === 0) {
    return (
      <>
        <div style={styles.seccion}>
          <h3>🛒 Tu Carrito</h3>
          <p style={styles.vacio}>El carrito está vacío</p>
        </div>
      </>
    );
  }

  //Si no está vacio recorro los items
  return (
    <div style={styles.seccion}>
      <h3>🛒 Tu Carrito ({getTotalItems()} items)</h3>

      {items.map((item) => (
        <div key={item.id} style={styles.itemCarrito}>
          <span>{item.nombre}</span>
          <div style={styles.controlesCantidad}>
            <button
              onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
              style={styles.botonCantidad}
            >
              -
            </button>
            <span style={styles.cantidad}>{item.cantidad}</span>
            <button
              onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
              style={styles.botonCantidad}
            >
              +
            </button>
          </div>
          <span>${item.precio * item.cantidad}</span>
          <button
            onClick={() => eliminarProducto(item.id)}
            style={styles.botonEliminar}
          >
            🗑️
          </button>
        </div>
      ))}

      <div style={styles.total}>
        <strong>Total: ${getTotalPrecio()}</strong>
      </div>

      <button onClick={vaciarCarrito} style={styles.botonVaciar}>
        Vaciar Carrito
      </button>
    </div>
  );
};
