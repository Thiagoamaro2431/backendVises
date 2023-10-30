import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Usuarios } from "../models/usuario.js";

// Variables de entorno desde el archivo .env
dotenv.config();

export const verificarToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ error: "No autorizado" });
  }

  Jwt.verify(token, process.env.TOKEN_SECRET, async (error, user) => {
    if (error) {
      return res.status(401).json({ error: "No autorizado" });
    }

    const usuarioEncontrado = await Usuarios.findByPk(user.id);
    if (!usuarioEncontrado) {
      return res.status(401).json({ error: "No autorizado" });
    }

    return res.json({
      id: usuarioEncontrado.id,
      name: usuarioEncontrado.name,
      email: usuarioEncontrado.email,
      img_perfil:usuarioEncontrado.img_perfil
    });
  });
};
