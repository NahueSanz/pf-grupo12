const { Router } = require('express');
// Importar todos los routers;


const router = Router();

// Configurar los routers

//Prueba
router.use("/",(req,res)=>{
    res.status(200).send("Bienvenidos al inicio")
});

module.exports = router;