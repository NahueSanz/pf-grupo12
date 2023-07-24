const { User, Property, Review } = require("../db");
/**************** CONTROLLERS DEL USUARIO AUTORIZADO(ADMIN) ****************/

//Obtener todos los usuarios con rol usuario de la BDD
const getAllUsers = async () => {
  try {
    const users = await User.findAll({
      where: {
        role: "user",
      },
      include: [
        {
          model: Property,
          attributes: ["id", "title", "type"],
        },
      ],
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
      where: {
        role: "admin",
      },
      include: [
        {
          model: Property,
          attributes: ["id", "title", "type"],
        },
      ],
    });
    return admins;
  } catch (error) {
    throw new Error("Error while getting admins");
  }
};
//Cambiar si un usurio esta habilitado o no
const enabledUser = async (id,enabled) => {
  try {
    console.log(enabled);
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    await user.update({enabled: enabled});
    await user.save();
    if (!enabled) {
      throw new Error("User disabled");
    }
    return {message:"User enabled", enabled:enabled};
    
  } catch (error) {
    throw new Error(error.message);
  }
};
//Cambiar si una propiedad esta habilitada o no
const enabledProperty = async (id,enabled) => {
  try {
    const property = await Property.findByPk(id);
    if (!property) {
      throw new Error("Property not found");
    }
    await property.update({enabled: enabled});
    await property.save();
    if (enabled) {
      return "Property enabled"
    }
    return "Property disabled";
  } catch (error) {
    throw new Error("Error while updating enabled property");
  }
};

const getReviewByPk = async (id) => {
  try {
    const review = await Review.findByPk(id);
    if (!review) {
      throw new Error("Property not found");
    }

    review.enabled = !review.enabled;
    await review.save();

    return {
      message: "Campo booleano cambiado exitosamente.",
      newValue: review.enabled,
    };
  } catch (error) {
    throw new Error("Error al cambiar el campo booleano: " + error.message);
  }
};

module.exports = { getAllUsers, getReviewByPk, getAllAdmins, enabledUser, enabledProperty };
