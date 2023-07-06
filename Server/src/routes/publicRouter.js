const { Router } = require("express");

const {
  registerUserHandler,
  loginUserHandler,
  getAllPropertiesHandler,
  getPropertyByIdHandler
} = require("../handlers/publicHandlers");

const publicRouter = Router();

/**************** RUTAS PUBLICAS SIN AUTENTICARSE ****************/

//Registro de usuario
publicRouter.post("/register",registerUserHandler);
//Login del usuario
publicRouter.post("/login", loginUserHandler);
//Obtener todas las propiedades
publicRouter.get("/properties", getAllPropertiesHandler);
//Obtener el detalle de la propiedad
publicRouter.get("/property/detail/:id", getPropertyByIdHandler);
//ruta buscar por searchbar

module.exports = publicRouter;