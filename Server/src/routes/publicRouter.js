const { Router } = require("express");

const {
  registerUserHandler,
  getAllPropertiesHandler,
  getPropertyByIdHandler,
} = require("../handlers/publicHandlers");

const publicRouter = Router();

/**************** RUTAS PUBLICAS SIN AUTENTICARSE ****************/

//Registro de usuario
publicRouter.post("/register", registerUserHandler);
//Obtener todas las propiedades o traer todas por search
publicRouter.get("/properties", getAllPropertiesHandler);
//Obtener el detalle de la propiedad
publicRouter.get("/property/detail/:id", getPropertyByIdHandler);

module.exports = publicRouter;
