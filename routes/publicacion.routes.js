import { Router} from "express";

import {getPublicacion} from "../controllers/publicacion.controllers.js"

const router = Router();

router.get("/publicacion",getPublicacion);

export default router;