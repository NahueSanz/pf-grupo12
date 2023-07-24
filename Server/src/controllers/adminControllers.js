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
    if (enabled) {
      return "User enabled"
    }
    return "User disabled";
  } catch (error) {
    throw new Error("Error while updating enabled user");
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

module.exports = { getAllUsers, getAllAdmins, enabledUser, enabledProperty  };
