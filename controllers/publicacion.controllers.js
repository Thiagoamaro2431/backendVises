import { Queja } from "../models/Queja.js"; 
import { Usuarios } from "../models/usuario.js";

export const getPublicacion = async (req, res) => {
  try {
    // Realiza una consulta para obtener todos los Usuarios con sus Quejas
    const quejasConUsuarios = await Queja.findAll({
      include: Usuarios
    });
    // Invierte el orden del array sin modificar el original
    const quejasConUsuariosInvertido = [...quejasConUsuarios].reverse();

    // Envía los datos al frontend
    res.json(quejasConUsuariosInvertido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hubo un error al obtener los datos" });
  }
};



  