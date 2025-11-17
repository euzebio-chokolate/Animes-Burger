import jwt from "jsonwebtoken";

export function gerarAccessToken(usuario) {

  return jwt.sign(
    {
      id: usuario.id,
      role: usuario.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
}

export function gerarRefreshToken(usuario) {
  return jwt.sign(
    {
      id: usuario.id
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
}
