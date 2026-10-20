import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: "Falta el token" });
  const token = header.startsWith("Bearer ") ? header.slice(7) : header;
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido" });
  }
}

const verifyAdmin = (req, res, next) => {
  if (req.user?.rol !== "A") {
    return res.status(403).json({ error: "Sólo un admin puede hacer esto" });
  }
  next();
}