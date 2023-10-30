import { Router} from "express";
import { 
    createUser,
    getUsers,
    deleteUsuario,
    updateUsuario,
    getUser,
    inciarSesion,
    cerrarsSesion,
    perfil
 } from "../controllers/user.controller.js";
 import {autenticacion} from "../middleware/validarToken.js"
 import { verificarToken } from "../controllers/auth.controllers.js";

const router = Router();

router.get("/users",getUsers);//funciona 😃
router.get("/user/:id",getUser);//funciona 😃
router.get("/profile",autenticacion,perfil)
router.get("/verificacion",verificarToken)


router.post("/user",createUser);//funciona 😃
router.post("/user/login",inciarSesion);//funciona 😃
router.post("/user/logout",cerrarsSesion)//funciona 😃

router.put("/user/:id",updateUsuario);//funciona 😃
router.delete("/users/:id",deleteUsuario);//funciona 😃




export default router;