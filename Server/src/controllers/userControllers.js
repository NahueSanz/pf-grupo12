const { User, Property, Review } = require("../db");
/************** CONTROLLERS DEL USUARIO AUTENTICADO ****************/

//Se obtendra al usuario buscando en la BDD por su ID
const getUserById = async (id) => {
  try {
    const user = await User.findByPk(id);
    return user;
  } catch (error) {
    throw new Error("Error getting user by id");
  }
};
//Se obtendra todas las propiedades del usuario
const getAllUserProperties = async (userId) => {
  try {
    const userProperties = await Property.findAll({
      where: { UserId: userId },
      include: [
        {
          model: User,
          attributes: ["id", "name", "phonenumber", "language"],
        },
      ],
    });
    return userProperties;
  } catch (error) {
    throw new Error("Error getting all user properties");
  }
};
//Crea una nueva propiedad en la BDD
const createUserProperty = async (
  title,
  type,
  address,
  country,
  guests,
  price,
  description,
  startDate,
  endDate,
  image,
  userId
) => {
  const existingProperty = await Property.findOne({
    where: { title: title, address: address },
  });
  if (existingProperty) {
    throw new Error("post already exists");
  }
  const newProperty = await Property.create({
    title,
    type,
    address,
    country,
    guests,
    price,
    description,
    startDate,
    endDate,
    image,
    UserId: userId,
  });
  return newProperty;
};


const createUserReview = async (review, score, user, idCasa) => {
 const existingReview = await Review.findOne({
    where: { UserId: user, PropertyId: idCasa },
  });
  console.log(existingReview, idCasa);
  if (existingReview) {
    throw new Error("You have already posted one review in this property");
  }
  const newReview = await Review.create({
    review,
    score,
    UserId: user,
    PropertyId: idCasa,
  });
  return newReview;
};




//Se obtendra la propiedad de un usuario por su ID de la propiedad
const getUserPropertyById = async (id) => {
  try {
    const userProperty = await Property.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: [],
        },
      ],
    });
    return userProperty;
  } catch (error) {
    throw new Error("Error getting a user property");
  }
};
//Se eliminara una propiedad del usuario
const deleteUserProperty = async (id) => {
  try {
    const deletedProperty = await Property.destroy({
      where: { id },
    });

    if (deletedProperty === 0) {
      throw new Error("User property not found");
    }

    return "User property deleted";
  } catch (error) {
    throw new Error("Error deleting a user property");
  }
};
const getReview = async (id) => {
  try {
    const casaConReview = await Property.findByPk(id, {
      include: [
        {
          model: Review,
          attributes: ["review", "score"],
          include: [
            {
              model: User,
              attributes: ["name", "lastname"],
            }
          ]
        },
      ],
    });
    if (!casaConReview) {
      throw new Error("User property review not found");
    }
    return casaConReview;
  } catch (error) {
    throw new Error("No se encontraron las reviews");
  }
};

module.exports = {
  getUserById,
  createUserProperty,
  getAllUserProperties,
  getUserPropertyById,
  deleteUserProperty,
  getReview,
  createUserReview,
};
