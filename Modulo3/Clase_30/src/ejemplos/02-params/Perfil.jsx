import { Link, useParams } from "react-router-dom";
import { styles } from "../../shared/styles";
import { usuarios } from "./usuarios";

export const Perfil = () => {
  const { usuarioId } = useParams();

  const usuario = usuarios.find((usuario) => usuario.id === usuarioId);

  if (!usuario) {
    return (
      <div>
        <h1>❌Usuario no encontrado</h1>
        <p>
          No se encontró el usuario con el id <strong>{usuarioId}</strong>
        </p>
        <Link to="/params" style={styles.linkVolver}>
          Volver al listado
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.pagina}>
      <h1>👤 Perfil del Usuario</h1>
      <div style={estilos.card}>
        <p>
          <strong>ID:</strong> {usuario.id}
        </p>
        <p>
          <strong>Nombre:</strong> {usuario.nombre}
        </p>
        <p>
          <strong>Email:</strong> {usuario.email}
        </p>
        <p>
          <strong>Rol:</strong> {usuario.rol}
        </p>
      </div>
      <div style={estilos.codigo}>
        <p>
          📝 En la URL tenés: <code>/params/perfil/{usuarioId}</code>
        </p>
        <p>
          📝 useParams() devuelve:{" "}
          <code>{`{ usuarioId: "${usuarioId}" }`}</code>
        </p>
      </div>
      <Link to="/params" style={styles.linkVolver}>
        ← Volver al listado
      </Link>
    </div>
  );
};

const estilos = {
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "left",
    maxWidth: "300px",
    margin: "20px auto",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  codigo: {
    background: "#e7f3ff",
    padding: "15px",
    borderRadius: "8px",
    margin: "20px 0",
    fontSize: "14px",
  },
};
