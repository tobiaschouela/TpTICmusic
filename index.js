import express from "express";
import usuario from "./usuario.js";

const app = express();
app.use(express.json());

app.post("/crearusuario", usuario.crearusuario);
app.post("/login", usuario.login);
app.post("/escucho", usuario.escucho);

if (!process.env.VERCEL) {
  app.listen(3000, () => console.log("listening on http://localhost:3000"));
}

export default app;