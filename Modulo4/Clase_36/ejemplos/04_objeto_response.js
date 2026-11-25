import express from "express";

const app = express();

// res.send(): envia uyna cadena de texto, HTML o Buffer al cliente
app.get("/", (req, res) => {
  res.send("<h1>Hola Mundo</h1>");
});

//res.json(): Envia un objeto o arreglo como json
app.get("/", (req, res) => {
  res.json({ mensaje: "Respuesta en json" });
});

//res.status(): define el codigo de estado HTTP. Se puede encadenar con send o json
app.get("/", (req, res) => {
  res.status(404).send("Recurso no encontrado");
});

//res.redirect(url):redirecciona al usuairo a otra URL.

app.get("/", (req, res) => {
  res.redirect("/login");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en: http://localhost:${PORT}`);
});
