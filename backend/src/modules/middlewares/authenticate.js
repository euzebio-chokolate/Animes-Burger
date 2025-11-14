import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export function authenticate(roles = []) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ erro: "Token ausente" });
    const token = authHeader.split(" ")[1];
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      req.user = payload;
      if (roles.length && !roles.includes(payload.role)) {
        return res.status(403).json({ erro: "Permissão negada" });
      }
      next();
    } catch (err) {
      return res.status(401).json({ erro: "Token inválido" });
    }
  };
}
