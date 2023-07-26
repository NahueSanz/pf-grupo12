const { User, Property, Review } = require("../db");
const admin = require("../../firebase");
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
//Obtener todos los usuario de la BDD
const getAllProperties = async () => {
  try {
    const properties = await Property.findAll({
      include: [
        {
          model: Review,
          attributes: ["score"],
        },
        {
          model: User,
          attributes: ["name","lastname"],
        }
      ],
    });
    return properties;
  } catch (error) {
    throw new Error("Error while getting properties");
  }
};
//Cambiar si un usurio esta habilitado o no
const enabledUser = async (id,enabled) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    await user.update({enabled: enabled});
    await user.save();
    admin.auth().updateUser(id,{disabled:!enabled})
      .then((userRecord) => {
        const userAuth = userRecord.toJSON()
        console.log(`Usuario ${userAuth.email} de Firebase actualizo correctamente su campo disabled: ${userAuth.disabled}` );
      })
    if (!enabled) {
      throw new Error("User disabled");
    }
    return {message: 'User updated successfully', enabled:enabled};
    
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

module.exports = { getAllUsers, getReviewByPk, getAllAdmins, getAllProperties, enabledUser, enabledProperty };
