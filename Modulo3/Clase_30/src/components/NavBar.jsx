import { BrowserRouter, Link, Route, Routes } from "react-router";

export const NavBar = () => {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link}>
        Inicio
      </Link>
      <Link to="/about" style={styles.link}>
        Acerca de{" "}
      </Link>
      <Link to="/contacto" style={styles.link}>
        Contacto
      </Link>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    padding: "15px",
    background: "#f8f9fa",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  link: {
    padding: "10px 20px",
    background: "#007bff",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px",
    transition: "background 0.3s",
  },
};
