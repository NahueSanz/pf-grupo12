const { Router } = require('express');
// Importar todos los routers;
import userRouter from './userRouter';
import adminRouter from './adminRouter';
import publicRouter from './publicRouter';

const router = Router();

/***********CONFIGURAR LAS RUTAS*************/

//Rutas publicas
router.use("/public",publicRouter);
//Rutas privadas
router.use("/user",userRouter);
router.use("/admin",adminRouter);

module.exports = router;