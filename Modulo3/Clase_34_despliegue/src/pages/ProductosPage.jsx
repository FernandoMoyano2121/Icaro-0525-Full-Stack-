import { Link } from "react-router-dom";
import { ListaProductos, styles } from "../components/ListaProductos";
// AGREGADO: Importamos el Header compartido en lugar de repetir su código aquí
import { Header } from "../components/Header";

// PÁGINA 1: Listado de Productos
export const ProductosPage = () => {
  return (
    <div style={styles.container}>
      {/* MODIFICADO: Reemplazamos el header inline por el componente Header reutilizable */}
      <Header />
      <ListaProductos />
    </div>
  );
};
