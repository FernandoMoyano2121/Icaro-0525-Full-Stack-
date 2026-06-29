import path from "path";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

//"file:///C:/proyecto/index.js"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function demoPath() {
  //uploads\usuarios\avatar.png
  const rutaJoin = path.join("uploads", "usuarios", "avatar.png");
  console.log("path join: ", rutaJoin);

  //C:\Users\Fernando\Desktop\WWW\ICARO-CLASES\Icaro-0525-Full Stack\Modulo4\Clase_48\uploads\avatar.png
  const rutaResolve = path.resolve("uploads", "avatar.png");
  console.log("path resolve: ", rutaResolve);
}

async function demoEscritura() {
  const carpetaSandbox = path.join(__dirname, "sandbox");
  await fs.mkdir(carpetaSandbox, { recursive: true });
  console.log("Carpeta creada: ", carpetaSandbox);

  const rutaArchivo = path.join(carpetaSandbox, "notas.txt");
  const contenido = `Notas de clase 48: Enrique, Romina, Alvaro David`;
  await fs.writeFile(rutaArchivo, contenido, "utf-8");
}

async function demoLectura() {
  const rutaArchivo = path.join(__dirname, "sandbox", "notas.txt");
  const contenido = await fs.readFile(rutaArchivo, "utf-8");
  console.log("Contenido Leido: ");
  console.log(contenido);
}

async function main() {
  try {
    demoPath();
    await demoEscritura();
    await demoLectura();
  } catch (error) {
    console.error(error.message);
  }
}
main();
