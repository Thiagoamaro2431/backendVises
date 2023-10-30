import { Usuarios } from "../models/usuario.js"
import bcryptjs from "bcryptjs";
import { crearTokenAcceso } from "../libs/jwt.js";

export const perfil = async (req, res) => {
  const usuarioEncontrado = await Usuarios.findByPk(req.user.id);

  if (!usuarioEncontrado) {
    return res.status(400).json({ message: "Usuario no encontrado." });
  } else {
    return res.json({
      id: usuarioEncontrado.id,
      name: usuarioEncontrado.name,
      email: usuarioEncontrado.email,
      createdAt: usuarioEncontrado.createdAt,
      updatedAt: usuarioEncontrado.updatedAt,
      img_perfil:usuarioEncontrado.img_perfil
    });
  }
};

export const cerrarsSesion = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const inciarSesion = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Variable para saber si encontramo al ususario con el email ingresado en el login :) pd:mucho texto lo sé
    const usuarioEncontrado = await Usuarios.findOne({ where: { email } });

    if (!usuarioEncontrado)
      return res.status(400).json({ error: "No existe registro del email ingresado" });

    const match = await bcryptjs.compare(password, usuarioEncontrado.password);

    if (!match)
      return res.status(400).json({ error: "La contraseña es incorrecta" });

    // Guardar el usuario en la base de datos
    const token = await crearTokenAcceso({ id: usuarioEncontrado.id });
    res.cookie("token", token);
    res.json({
      id: usuarioEncontrado.id,
      name: usuarioEncontrado.name,
      email: usuarioEncontrado.email,
      createdAt: usuarioEncontrado.createdAt,
      updatedAt: usuarioEncontrado.updatedAt,
      img_perfil:usuarioEncontrado.img_perfil
    });
  } catch (error) {
    // Manejo de errores: si ocurre un error, responder con un mensaje de error
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const usuarios = await Usuarios.findAll();
    console.log(usuarios);
    res.json(usuarios);
    console.log("Exito al consultar los usuarios 😃");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuarios.findOne({
      where: { id },
    });
    console.log(`Éxito al consultar el usuario con el ID ${usuario.id} 😃`);
    if (!usuario)
      return res.status(404).json({ error: "El usuario no existe 🤔" });
    res.json(usuario);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;


  try {
        // Verificar si el usuario ya existe en la base de datos
        const existingUser = await Usuarios.findOne({ where: { email } });

        if (existingUser) {
          // Si el usuario ya existe, responde con un mensaje de error
          return res.status(400).json({ error: "Ya existe un usuario con el email ingresado." });
        }
    
    // Hashear la contraseña antes de almacenarla en la base de datos
    const passwordHash = await bcryptjs.hash(password, 10);

    // Crear un nuevo usuario en la base de datos
    const newUsuario = await Usuarios.create({
      name,
      email,
      password: passwordHash,
      isAdmin,
    });

    // Guardar el usuario en la base de datos
    const usuarioGuardado = await newUsuario.save();
    console.log("Exito al cargar el usuario:", name, "😀");
    const token = await crearTokenAcceso({ id: usuarioGuardado.id });
    res.cookie("token", token);

    res.json({
      id: usuarioGuardado.id,
      name: usuarioGuardado.name,
      email: usuarioGuardado.email,
      img_perfil:usuarioGuardado.img_perfil
    });
  } catch (error) {
    // Manejo de errores: si ocurre un error, responder con un mensaje de error
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, surename, email, password } = req.body;

    const user = await Usuarios.findByPk(id);
    user.name = name;
    user.surename = surename;
    user.email = email;
    user.password = password;
    console.log(user);

    await user.save();
    res.json(user);
    console.log("Exito al actualizar un usuario 😃");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await Usuarios.destroy({
      where: {
        id,
      },
    });
    res.sendStatus(204);
    console.log("Exito al eliminar un usuario 😃");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
