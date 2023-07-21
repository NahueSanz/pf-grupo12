const { Router } = require("express");

const {
  getAllUsersHandler,
  getAllAdminsHandler,
  deleteUserHandler,
  changeEnableReview,
} = require("../handlers/adminHandlers");

const adminRouter = Router();

/************ RUTAS DEL USUARIO AUTORIZADO(ADMIN) ***************/

//Obtener la informacion de todos los usuarios con rol user
adminRouter.get("/users", getAllUsersHandler);
//Obtener la informacion de todos los usuarios con rol admin
adminRouter.get("/admins", getAllAdminsHandler);
//Eliminar a un usuario
adminRouter.delete("/users/:id", deleteUserHandler);
//Cambia el campo enable
adminRouter.put("/property/:id/review", changeEnableReview);

module.exports = adminRouter;
