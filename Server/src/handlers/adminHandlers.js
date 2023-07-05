//Importar los controllers
const { getAllUsers, deleteUser } = require("../controllers/adminControllers");
/************ HANDLERS DEL USUARIO AUTORIZADO(ADMIN) ************/

//Todos los usuarios
const getAllUsersHandler = async (req, res) => {
  try {
    const users = await getAllUsers();
    if (users.length === 0) {
      throw Error("Not Users");
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
//Eliminar un usuario por ID
const deleteUserHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await deleteUser(id);
    if (deletedUser !== "User deleted") {
      throw Error("User not found to delete");
    }
    res.status().json(deletedUser);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getAllUsersHandler,
  deleteUserHandler,
};
