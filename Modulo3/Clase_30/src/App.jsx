import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./shared/NavBar";
import { Footer } from "./shared/Footer";
import { Indice } from "./shared/Indice";
import { styles } from "./shared/styles";
import { Navegacion } from "./ejemplos/01-navegacion/Navegacion";
import { Params } from "./ejemplos/02-params/Params";
import { Protegidas } from "./ejemplos/03-rutas-protegidas/Protegidas";

export const App = () => {
  return (
    <BrowserRouter>
      <div style={styles.container}>
        <header style={styles.header}>
          <h2>Ejemplos de React Router</h2>
        </header>
        <NavBar />
        <main style={styles.main}>
          <Routes>
            <Route path="/" element={<Indice />} />
            {/*
                El "/*" (splat) hace que la ruta coincida con /navegacion y con
                todo lo que venga después (/navegacion/about, etc.). La parte
                restante la resuelve el <Routes> interno de cada ejemplo, con
                rutas relativas. Sin el "/*", solo coincidiría /navegacion. 
            */}
            <Route path="/navegacion/*" element={<Navegacion />} />
            <Route path="/params/*" element={<Params />} />
            <Route path="/protegidas/*" element={<Protegidas />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};
