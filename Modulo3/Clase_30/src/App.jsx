import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { NavBar } from "./components/NavBar";
import { Contacto } from "./components/Contacto";
import { Footer } from "./components/Footer";
import { EjemploParams } from "./parametros/EjemploParams";

/* export const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div style={styles.container}>
          <header style={styles.header}>
            <h2>Navegacion con Link</h2>
          </header>
          <NavBar />
          <main style={styles.main}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contacto" element={<Contacto />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}; */

export const App = () => {
  return (
    <div>
      <EjemploParams />
    </div>
  );
};

/* const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
  },
  header: {
    background: "#28a745",
    color: "white",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
    textAlign: "center",
  },
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
  main: {
    minHeight: "300px",
  },
  pagina: {
    background: "#f8f9fa",
    padding: "40px",
    borderRadius: "8px",
    textAlign: "center",
  },
  comparacion: {
    marginTop: "20px",
    textAlign: "left",
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
  },
  codigo: {
    display: "block",
    background: "#1e1e1e",
    color: "#9cdcfe",
    padding: "15px",
    borderRadius: "5px",
    whiteSpace: "pre-wrap",
    fontSize: "14px",
  },
  footer: {
    marginTop: "20px",
    padding: "15px",
    background: "#d4edda",
    borderRadius: "8px",
    textAlign: "center",
  },
};
 */
