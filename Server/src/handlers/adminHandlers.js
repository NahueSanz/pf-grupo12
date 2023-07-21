const {
  getAllUsers,
  getAllAdmins,
  deleteUser,
  getReviewByPk,
} = require("../controllers/adminControllers");
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

const changeEnableReview = (req, res) => {
  const reviewId = req.params.id;
  try {
    const review = getReviewByPk(reviewId);
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsersHandler,
  getAllAdminsHandler,
  deleteUserHandler,
  changeEnableReview,
};
