const { getAllUsers, getAllAdmins, enabledUser, enabledProperty } = require("../controllers/adminControllers");
/************ HANDLERS DEL USUARIO AUTORIZADO(ADMIN) ************/

//Todos los usuarios con rol user
const getAllUsersHandler = async (req, res) => {
  try {
    const users = await getAllUsers();
    if (users.length === 0) {
      throw Error("There are not Users");
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
//Todos los usuarios con rol admin
const getAllAdminsHandler = async (req, res) => {
  try {
    const admins = await getAllAdmins();
    if (admins.length === 0) {
      throw Error("There are not Admins");
    }
    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
//Cambiar si un usuario esta habilitado o no
const changeEnabledUserHandler = async (req, res) => {
  const { id } = req.params;
  const { enabled } = req.body;
  try {
    const updateEnabledUser = await enabledUser(id,enabled);
    console.log(updateEnabledUser);
    res.status(200).json(updateEnabledUser);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
//Cambiar si un usuario esta habilitado o no
const changeEnabledPropertyHandler = async (req, res) => {
  const { id } = req.params;
  const { enabled } = req.body;
  try {
    const updateEnabledProperty = await enabledProperty(id,enabled);
    console.log(updateEnabledProperty);
    res.status(200).json(updateEnabledProperty);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getAllUsersHandler,
  getAllAdminsHandler,
  changeEnabledUserHandler,
  changeEnabledPropertyHandler
};
