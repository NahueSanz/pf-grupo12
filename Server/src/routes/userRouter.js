const { Router } = require("express");
const {
  getUserByIdHandler,
  updateUserHandler,
  getAllPropertiesUserHandler,
  createPropertyUserHandler,
  getPropertyUserByIdHandler,
  updatePropertyUserHandler,
  deletePropertyUserHandler,
  getPropertyReview,
  createPropertyReview,
  getUserFavs,
  setUserFavs,
  deleteUserFav,
} = require("../handlers/userHanders");

const userRouter = Router();

/*************** RUTAS DEL USUARIO AUTENTICADO *******************/

//Obtener informacion de otro usuario por su ID
userRouter.get("/info/:id", getUserByIdHandler);
//Actualizar la informacion del usuario
userRouter.put("/update/:id", updateUserHandler);
//Obtener todas las propiedades del usuario
userRouter.get("/:userId/property", getAllPropertiesUserHandler);
//Crear una nueva propiedad del usuario
userRouter.post("/:userId/property", createPropertyUserHandler);
//Obtener informacion de una propiedad del usuario por su ID
userRouter.get("/property/:id", getPropertyUserByIdHandler);
//Actualizar la informacion de una propiedad del usuario
userRouter.put("/property/:id", updatePropertyUserHandler);
//Eliminar una propiedad del usuario
userRouter.delete("/property/:id", deletePropertyUserHandler);
//Obtener las reviews
userRouter.get("/property/:id/review", getPropertyReview);
//Crear una nueva review
userRouter.post("/property/:id/review", createPropertyReview);
//Obtener los favoritos
userRouter.get("/property/:userId/fav", getUserFavs);
//Guardar en favoritos
userRouter.post("/property/:userId/fav", setUserFavs);
//Eliminar de favoritos
userRouter.delete("/property/:userId/fav/:houseId", deleteUserFav);

module.exports = userRouter;
