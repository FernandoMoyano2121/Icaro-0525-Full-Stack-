import express from "express";

const app = express();

//app.metodo(ruta, callback)
app.get("/usuarios", (req, res) => {
  //res.send("<h2>Acá se mostraria un listado de usuarios</h2>");
  //res.json({ mensaje: "Respuesta en JSON" });
  //res.status(404).json({ mensaje: "Recurso no encontrado" });
});

app.post("/usuarios", (req, res) => {
  //req.body -> contendria los datos que envia el usuario
  res.send("Crar usuario");
});

app.put("/usuarios/:id", (req, res) => {
  //req.param.id -> contendria los datos que envia el usuario
  res.send(`Usuario ${req.param.id} actualizado correctamente`);
});

app.patch("/usuarios/:id", (req, res) => {
  //req.param.id -> contendria los datos que envia el usuario
  res.send(`Usuario ${req.param.id} actualizado parcialmente`);
});

app.delete("/usuarios/:id", (req, res) => {
  //req.param.id -> contendria los datos que envia el usuario
  res.send(`Usuario ${req.param.id} eliminado correctamente`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en: http://localhost:${PORT}`);
});
