import jwt from "jsonwebtoken";

export function authenticate(permittedRoles = []) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
      return res.status(401).json({ erro: "Token ausente" });

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (permittedRoles.length > 0 && !permittedRoles.includes(decoded.role)) {
        return res.status(403).json({ erro: "Acesso negado" });
      }

      req.user = decoded;
      next();
    } catch (erro) {
      return res.status(401).json({ erro: "Token inválido" });
    }
  };
}