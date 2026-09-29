import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { query } from "./db.js";

const crearusuario = async (req, res) => {
  const { userid, nombre, password } = req.body;
  if (!userid || !nombre || !password) {
    return res.status(400).json({ error: "Faltan datos" });
  }
  try {
    const hash = await bcrypt.hash(password, 10);
    await query(
      "INSERT INTO usuario (id, nombre, password) VALUES ($1, $2, $3)",
      [userid, nombre, hash]
    );
    res.status(201).json({ mensaje: "Usuario creado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo crear el usuario" });
  }
};

const login = async (req, res) => {
  const { userid, password } = req.body;
  if (!userid || !password) {
    return res.status(400).json({ error: "Faltan datos" });
  }
  try {
    const result = await query("SELECT * FROM usuario WHERE id = $1", [userid]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "El usuario no existe" });
    }
    const user = result.rows[0];
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ error: "Password incorrecto" });
    }
    const token = jwt.sign(
      { id: user.id, nombre: user.nombre },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error en el login" });
  }
};

const escucho = async (req, res) => {
  const token = req.body?.token;
  if (!token) return res.status(401).json({ error: "Falta el token" });

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return res.status(401).json({ error: "Token inválido" });
  }

  try {
    const result = await query(
      `SELECT c.id, c.nombre, e.reproducciones
         FROM escucha e
         JOIN cancion c ON c.id = e.cancion_id
        WHERE e.usuario_id = $1`,
      [payload.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener las escuchas" });
  }
};

export default { crearusuario, login, escucho };