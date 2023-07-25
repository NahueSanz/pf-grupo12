const { Router } = require("express");

const {
  getAllUsersHandler,
  getAllAdminsHandler,
  changeEnabledUserHandler,
  changeEnabledPropertyHandler
} = require("../handlers/adminHandlers");

const adminRouter = Router();

/************ RUTAS DEL USUARIO AUTORIZADO(ADMIN) ***************/

//Obtener la informacion de todos los usuarios con rol user
adminRouter.get("/users", getAllUsersHandler);
//Obtener la informacion de todos los usuarios con rol admin
adminRouter.get("/admins", getAllAdminsHandler);
//Actualizar habilitacion user
adminRouter.put("/user/enabled/:id",changeEnabledUserHandler);
//Actualizar habilitacion property
adminRouter.put("/property/enabled/:id",changeEnabledPropertyHandler);

module.exports = adminRouter;
