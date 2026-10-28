import * as cancionService from "../services/cancion.service.js";

const crearCancion = async (req, res) => {
  const { nombre } = req.body
  if (!nombre) return res.status(400).json({ error: "Falta el nombre" })
  try {
    const cancion = await cancionService.crearCancion(nombre)
    res.status(201).json(cancion);
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "No se pudo crear la canción" })
  }
}

const modificarCancion = async (req, res) => {const { id, nombre } = req.body
  if (!id || !nombre) return res.status(400).json({ error: "Faltan datos" })
  try {
    const cancion = await cancionService.modificarCancion(id, nombre);
    if (!cancion) return res.status(404).json({ error: "La canción no existe" })
    res.json(cancion)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "No se pudo modificar la canción" })
  }
}

const borrarCancion = async (req, res) => {
  const { id } = req.body
  if (!id) return res.status(400).json({ error: "Falta el id" })
  try {
    const borrada = await cancionService.borrarCancion(id)
    if (!borrada) return res.status(404).json({ error: "La canción no existe" })
    res.json({ mensaje: "Canción borrada" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "No se pudo borrar la canción" })
  }
}

const CancionController = { crearCancion, modificarCancion, borrarCancion };
export default CancionController;