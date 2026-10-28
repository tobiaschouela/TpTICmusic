import { query } from "../db.js";

const existeCancion = async (cancionId) => {
  const result = await query("SELECT 1 FROM cancion WHERE id = $1", [cancionId]);
  return result.rows.length > 0;
}

const registrarEscucha = async (usuarioId, cancionId) => {
  const update = await query(
    `UPDATE escucha SET reproducciones = reproducciones + 1
      WHERE usuario_id = $1 AND cancion_id = $2`,
    [usuarioId, cancionId]
  );
  if (update.rowCount === 0) {
    await query(
      "INSERT INTO escucha (usuario_id, cancion_id, reproducciones) VALUES ($1, $2, 1)",
      [usuarioId, cancionId]
    );
  }
  return actualizarFan(usuarioId);
};

const actualizarFan = async (usuarioId) => {
  const result = await query(
    "SELECT COUNT(DISTINCT cancion_id) AS cantidad FROM escucha WHERE usuario_id = $1",
    [usuarioId]
  );
  const cantidad = Number(result.rows[0].cantidad);
  const fan = cantidad > 10;
  if (fan) {
    await query("UPDATE usuario SET fan = true WHERE id = $1", [usuarioId]);
  }
  return { cantidad, fan };
};

const listarEscuchas = async (usuarioId) => {
  const result = await query(
    `SELECT c.id, c.nombre, e.reproducciones
       FROM escucha e
       JOIN cancion c ON c.id = e.cancion_id
      WHERE e.usuario_id = $1`,
    [usuarioId]
  );
  return result.rows;
};
const EscuchaService = { existeCancion, registrarEscucha, actualizarFan, listarEscuchas };
export default EscuchaService;