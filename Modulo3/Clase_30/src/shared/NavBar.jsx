import { Link } from "react-router-dom";
import { styles } from "./styles";

export const NavBar = () => {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link}>
        Índice
      </Link>
      <Link to="/navegacion" style={styles.link}>
        Navegación
      </Link>
      <Link to="/params" style={styles.link}>
        useParams
      </Link>
      <Link to="/protegidas" style={styles.link}>
        Rutas protegidas
      </Link>
    </nav>
  );
};
