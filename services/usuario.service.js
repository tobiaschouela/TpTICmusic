import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { query } from "../db.js";

const crearUsuario = async (id, nombre, password) => {
  const hash = await bcrypt.hash(password, 10);
  await query(
    "INSERT INTO usuario (id, nombre, password) VALUES ($1, $2, $3)",
    [id, nombre, hash]
  );
};


const login = async (id, password) => {
  const result = await query("SELECT * FROM usuario WHERE id = $1", [id]);
  if (result.rows.length === 0) return null;

  const user = result.rows[0];
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return null;

  return jwt.sign(
    { id: user.id, nombre: user.nombre, rol: user.rol },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

const UsuarioService = { crearUsuario, login };
export default UsuarioService;