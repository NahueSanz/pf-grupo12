const { Router } = require("express");
const {
  getUserByIdHandler,
  updateUserHandler,
  getAllPropertiesUserHandler,
  createPropertyUserHandler,
  getPropertyUserByIdHandler,
  updatePropertyUserHandler,
  deletePropertyUserHandler,
} = require("../handlers/userHanders");
const userRouter = Router();

/*************** RUTAS DEL USUARIO AUTENTICADO *******************/

//Obtener informacion de otro usuario por su ID
userRouter.get("/info/:id", getUserByIdHandler);
//Actualizar la informacion del usuario
userRouter.put("/update/:id", updateUserHandler);
//Obtener todas las propiedades del usuario
userRouter.get("/property", getAllPropertiesUserHandler);
//Crear una nueva propiedad del usuario
userRouter.post("/property", createPropertyUserHandler);
//Obtener informacion de una propiedad del usuario por su ID
userRouter.get("/property/:id", getPropertyUserByIdHandler);
//Actualizar la informacion de una propiedad del usuario
userRouter.put("/property/:id", updatePropertyUserHandler);
//Eliminar una propiedad del usuario
userRouter.delete("/property/:id", deletePropertyUserHandler);

module.exports = userRouter;
