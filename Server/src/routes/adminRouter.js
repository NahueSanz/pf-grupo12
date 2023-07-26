const { Router } = require("express");

const {
  getAllUsersHandler,
  getAllAdminsHandler,
  getAllPropertiesHandler,
  changeEnabledUserHandler,
  changeEnabledPropertyHandler
} = require("../handlers/adminHandlers");

const adminRouter = Router();

/************ RUTAS DEL USUARIO AUTORIZADO(ADMIN) ***************/

//Obtener la informacion de todos los usuarios con rol user
adminRouter.get("/users", getAllUsersHandler);
//Obtener la informacion de todos los usuarios con rol admin
adminRouter.get("/admins", getAllAdminsHandler);
//Obtener todas las propiedades ya sean habilitadas o deshabilitadas
adminRouter.get("/properties", getAllPropertiesHandler);
//Actualizar habilitacion user
adminRouter.put("/user/enabled/:id",changeEnabledUserHandler);
//Actualizar habilitacion property
adminRouter.put("/property/enabled/:id",changeEnabledPropertyHandler);

module.exports = adminRouter;
