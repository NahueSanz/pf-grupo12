const { User, Property } = require("../db");

const getUserById = async (id) => {
  try {
    const user = await User.findByPk(id);
    return user;
  } catch (error) {
    throw new Error("Error al obtener el usuario por ID");
  }
};

const getAllUserProperties = async () => {
  try {
    const userProperties = await Property.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "name", "phonenumber", "language"],
        },
      ],
    });
    return userProperties;
  } catch (error) {
    throw new Error("Error al obtener las propiedades del usuario");
  }
};

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
  image
) => {
  const existingProperty = await Property.findOne({
    where: { title: title, address: address },
  });
  if (existingProperty) {
    throw Error("La publicación ya existe");
  }
  const newProperty = await Property.create({
    title,
    owner,
    type,
    address,
    country,
    guests,
    price,
    description,
    startDate,
    endDate,
    image,
  });
  return newProperty;
};

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
    throw new Error("Error al obtener la propiedad del usuario");
  }
};

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
    throw new Error("Error al eliminar la propiedad del usuario");
  }
};
module.exports = {
  getUserById,
  createUserProperty,
  getAllUserProperties,
  getUserPropertyById,
  deleteUserProperty,
};
