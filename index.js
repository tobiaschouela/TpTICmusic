import express from "express";
import usuarioRoutes from "./routes/usuario.routes.js";
import cancionRoutes from "./routes/cancion.routes.js";
import escuchaRoutes from "./routes/escucha.routes.js";

const app = express();
app.use(express.json());

app.use("/", usuarioRoutes);
app.use("/cancion", cancionRoutes);
app.use("/escucho", escuchaRoutes);

if (!process.env.VERCEL) {
  app.listen(3000, () => console.log("listening on http://localhost:3000"));
}

export default app;