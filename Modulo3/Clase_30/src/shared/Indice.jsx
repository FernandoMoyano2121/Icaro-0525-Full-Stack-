import { Link } from "react-router-dom";
import { styles } from "./styles";

const ejemplos = [
  {
    to: "/navegacion",
    titulo: "01 - Navegación",
    descripcion: "Routes, Route y Link con páginas simples",
  },
  {
    to: "/params",
    titulo: "02 - useParams",
    descripcion: "Parámetros dinámicos en la URL (/perfil/:usuarioId)",
  },
  {
    to: "/protegidas",
    titulo: "03 - Rutas protegidas",
    descripcion: "Navigate y un ProtectedRoute que redirige al login",
  },
];

export const Indice = () => {
  return (
    <div style={styles.pagina}>
      <h1>Ejemplos de React Router</h1>
      <p>Elegí un ejemplo para verlo funcionando</p>
      {ejemplos.map((ejemplo) => (
        <p key={ejemplo.to}>
          <Link to={ejemplo.to}>
            <strong>{ejemplo.titulo}</strong>
          </Link>
          {" — "}
          {ejemplo.descripcion}
        </p>
      ))}
    </div>
  );
};
