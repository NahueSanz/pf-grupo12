const { User, Property } = require("../db");
/**************** CONTROLLERS DEL USUARIO AUTORIZADO(ADMIN) ****************/

//Obtener todos los usuarios con rol usuario de la BDD
const getAllUsers = async () => {
  try {
    const users = await User.findAll({
      where:{
        role: "user"
      },
      include:[{
        model: Property,
        attributes: ["id","title","type"],
      }]
    });
    return users;
  } catch (error) {
    throw new Error("Error while getting users");
  }
};
//Obtener todos los usuario de la BDD
const getAllAdmins = async () => {
  try {
    const admins = await User.findAll({
      where:{
        role: "admin"
      },
      include:[{
        model: Property,
        attributes: ["id","title","type"],
      }]
    });
    return admins;
  } catch (error) {
    throw new Error("Error while getting admins");
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

module.exports = { getAllUsers, getAllAdmins, deleteUser };
