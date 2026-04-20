import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useParams,
} from "react-router-dom";

const usuarios = [
  {
    id: "1",
    nombre: "Juan Pérez",
    email: "juan@email.com",
    rol: "Desarrollador",
  },
  {
    id: "2",
    nombre: "María García",
    email: "maria@email.com",
    rol: "Diseñadora",
  },
  {
    id: "3",
    nombre: "Carlos López",
    email: "carlos@email.com",
    rol: "Project Manager",
  },
];

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
        <Link to="/" style={styles.linkVolver}>
          Volver al listado
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.pagina}>
      <h1>👤 Perfil del Usuario</h1>
      <div style={styles.card}>
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
      <div style={styles.codigo}>
        <p>
          📝 En la URL tenés: <code>/perfil/{usuarioId}</code>
        </p>
        <p>
          📝 useParams() devuelve:{" "}
          <code>{`{ usuarioId: "${usuarioId}" }`}</code>
        </p>
      </div>
      <Link to="/" style={styles.linkVolver}>
        ← Volver al listado
      </Link>
    </div>
  );
};

export const ListaUsuarios = () => {
  return (
    <div style={styles.pagina}>
      <h1>Listado de Usuarios</h1>
      <p>Hacé click en un usuario para ver su perfil</p>

      <div style={styles.lista}>
        {usuarios.map((usuario) => (
          <Link
            key={usuario.id}
            to={`perfil/${usuario.id}`}
            style={styles.usuarioLink}
          >
            <div style={styles.usuarioCard}>
              <strong>Nombre: {usuario.nombre}</strong>
              <small>ID: {usuario.id}</small>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const EjemploParams = () => {
  return (
    <BrowserRouter>
      <div style={styles.container}>
        <header style={styles.header}>
          <h2>Ejemplo useParams</h2>
        </header>
        <Routes>
          <Route path="/" element={<ListaUsuarios />}></Route>
          <Route path="/perfil/:usuarioId" element={<Perfil />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
  },
  header: {
    background: "#fd7e14",
    color: "white",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
    textAlign: "center",
  },
  pagina: {
    background: "#f8f9fa",
    padding: "30px",
    borderRadius: "8px",
    textAlign: "center",
  },
  lista: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    margin: "20px 0",
  },
  usuarioLink: {
    textDecoration: "none",
  },
  usuarioCard: {
    background: "#fff",
    padding: "15px 20px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "2px solid #fd7e14",
    color: "#333",
    transition: "transform 0.2s",
  },
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
  info: {
    background: "#fff3cd",
    padding: "20px",
    borderRadius: "8px",
    marginTop: "30px",
    textAlign: "left",
  },
  codigoBloque: {
    display: "block",
    background: "#1e1e1e",
    color: "#9cdcfe",
    padding: "15px",
    borderRadius: "5px",
    whiteSpace: "pre-wrap",
    fontSize: "13px",
    marginTop: "10px",
  },
  linkVolver: {
    display: "inline-block",
    marginTop: "20px",
    padding: "10px 20px",
    background: "#fd7e14",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px",
  },
  prueba: {
    marginTop: "20px",
    padding: "20px",
    background: "#f8d7da",
    borderRadius: "8px",
  },
  linkError: {
    display: "inline-block",
    margin: "5px",
    padding: "8px 15px",
    background: "#dc3545",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px",
    fontSize: "14px",
  },
};
