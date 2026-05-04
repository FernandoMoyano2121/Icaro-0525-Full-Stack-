import { Carrito } from "../components/Carrito";
import { ListaProductos, styles } from "../components/ListaProductos";

//COMPONENTE PRINCIPAL
export const CarritoCompras = () => {
  return (
    <div style={styles.container}>
      <h2>Mini E-commerce con Zustand</h2>
      <div style={styles.layout}>
        <ListaProductos />
        <Carrito />
      </div>
    </div>
  );
};
