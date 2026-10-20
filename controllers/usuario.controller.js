import * as usuarioService from "../services/usuario.service.js";

const crearUsuario = async (req, res) => {
  const { userid, nombre, password } = req.body
  if (!userid || !nombre || !password) {
    return res.status(400).json({ error: "Faltan datos" })
  }
  try {
    await usuarioService.crearUsuario(userid, nombre, password)
    res.status(201).json({ mensaje: "Usuario creado" })
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo crear el usuario" })
  }
}

const login = async (req, res) => {
  const { userid, password } = req.body
  if (!userid || !password) {
    return res.status(400).json({ error: "Faltan datos" })
  }
  try {
    const token = await usuarioService.login(userid, password)
    if (!token) {
      return res.status(401).json({ error: "Usuario o password incorrecto" })
    }
    res.json({ token })
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error en el login" })
  }
}