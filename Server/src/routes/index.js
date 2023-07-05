const { Router } = require('express');
// Importar todos los routers;
const userRouter =require("./userRouter")
const adminRouter =require("./adminRouter")
const publicRouter =require("./publicRouter")

const router = Router();

/***********CONFIGURAR LAS RUTAS*************/

//Rutas publicas
router.use("/public",publicRouter);
//Rutas privadas
router.use("/user",userRouter);
router.use("/admin",adminRouter);

module.exports = router;