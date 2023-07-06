const { Property, User } = require("../db");

const getAllProperties = async () => {
  try {
    const properties = await Property.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "name", "phonenumber", "language"],
        },
      ],
    });

    return properties;
  } catch (error) {
    throw new Error("Error al obtener las propiedades");
  }
};

const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (error) {
    throw new Error("Error while finding user by email");
  }
};

const getPropertyDetail = async (id) => {
  try {
    const property = await Property.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ["id", "name", "phonenumber", "language"],
        },
      ],
    });

    return property;
  } catch (error) {
    throw new Error("Error trayendo el detalle de la propiedad");
  }
};

module.exports = { getAllProperties, findUserByEmail, getPropertyDetail };
