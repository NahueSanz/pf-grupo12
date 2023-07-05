const { Router } = require("express");
const {
  getAllUsersHandler,
  deleteUserHandler,
} = require("../handlers/adminHandlers");
const adminRouter = Router();

/************ RUTAS DEL USUARIO AUTORIZADO(ADMIN) ***************/

//Obtener la informacion de todos los usuarios
adminRouter.get("/users", getAllUsersHandler);
//Eliminar a un usuario
adminRouter.delete("/users/:id", deleteUserHandler);

module.exports = adminRouter;
