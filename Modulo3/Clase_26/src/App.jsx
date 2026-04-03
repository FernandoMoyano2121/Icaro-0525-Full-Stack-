import Alumno from "./Alumno";
import { Boton } from "./components/Boton";
import { Boton1 } from "./components/Boton1";
import { Formulario } from "./components/Formulario";
import ConditionalRenderDemo from "./ConditionalRenderDemo";
import { Personajes } from "./Personajes";

const App = () => {
  const alumnos = [
    {
      id: 0,
      nombre: "Miguel",
    },
    {
      id: 1,
      nombre: "Maria",
    },
  ];

  return (
    <div>
      {/*<Boton /> */}
      {/*  <Boton1 mensaje="Hola Alumnos! " /> */}
      {/* <Formulario /> */}
      {/* <Personajes /> */}
      {/* <ConditionalRenderDemo /> */}
      <Alumno alumnos={alumnos} />
    </div>
  );
};

export default App;
