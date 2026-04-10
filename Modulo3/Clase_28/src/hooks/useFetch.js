import { useEffect } from "react";
import { useState } from "react";

export function useFetch(url) {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setDatos(resultado);
      } catch (error) {
        console.error(error);
        setError("Error al obtener datos");
      } finally {
        setCargando(false);
      }
    };
    obtenerDatos();
  }, [url]);

  return { datos, cargando, error };
}
