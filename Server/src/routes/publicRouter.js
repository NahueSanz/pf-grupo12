const { Router } = require("express");
const {
  loginUserHandler,
  getAllPropertiesHandler,
  getPropertyByIdHandler,
} = require("../handlers/publicHandlers");
const publicRouter = Router();

/**************** RUTAS PUBLICAS SIN AUTENTICARSE ****************/

//Login del usuario
publicRouter.post("/login", loginUserHandler);
//Obtener todas las propiedades
publicRouter.get("/properties", getAllPropertiesHandler);
//Obtener el detalle de la propiedad
publicRouter.get("/property/detail/:id", getPropertyByIdHandler);

module.exports = publicRouter;
