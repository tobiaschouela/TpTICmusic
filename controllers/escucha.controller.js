import * as escuchaService from "../services/escucha.service.js";

export const escucho = async (req, res) => {
  const { id } = req.body
  if (!id) return res.status(400).json({ error: "Falta el id de la canción" })
  try {
    if (!(await escuchaService.existeCancion(id))) {
      return res.status(404).json({ error: "La canción no existe" })
    }

    const { cantidad, fan } = await escuchaService.registrarEscucha(req.user.id, id);
    res.status(201).json({ mensaje: "Escucha registrada", cancionesEscuchadas: cantidad, fan })
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo registrar la escucha" });
  }
}

const misEscuchas = async (req, res) => {
  try {
    res.json(await escuchaService.listarEscuchas(req.user.id));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener las escuchas" });
  }
}

const EscuchaController = { escucho, misEscuchas };
export default EscuchaController;
