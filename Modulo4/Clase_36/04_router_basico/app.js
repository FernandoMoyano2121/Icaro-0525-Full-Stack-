import express, { json } from "express";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(json());
app.use("/users", userRoutes); //http://localhost:3000/users

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
