const { User } = require("../db");
/**************** CONTROLLERS DEL USUARIO AUTORIZADO(ADMIN) ****************/

//Obtener todos los usuario de la BDD
const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw new Error("Error while getting users");
  }
};
//Eliminar un usuario de la BDD
const deleteUser = async (id) => {
  try {
    const deletedUser = await User.destroy({ where: { id } });
    if (deletedUser === 0) {
      throw new Error("User not found");
    }
    return "User deleted";
  } catch (error) {
    throw new Error("Error while deleting user");
  }
};

module.exports = { getAllUsers, deleteUser };
