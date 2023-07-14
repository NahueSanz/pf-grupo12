const {
  getUserById,
  createUserProperty,
  getAllUserProperties,
  getUserPropertyById,
  deleteUserProperty,
} = require("../controllers/userControllers");
/************** HANDLERS DEL USUARIO AUTENTICADO ****************/

//Usuario por ID
const getUserByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (!user) {
      throw Error("User not found");
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
//Actualizar usuario
const updateUserHandler = async (req, res) => {
  const { id } = req.params;
  const { name, lastname, email, country, phonenumber, language } = req.body;

  try {
    const user = await getUserById(id);

    if (!user) {
      throw new Error("User not found");
    }

    // Actualiza solo los campos que se hayan proporcionado en el cuerpo de la solicitud
    if (name) {
      user.name = name;
    }
    if (lastname) {
      user.lastname = lastname;
    }
    if (email) {
      user.email = email;
    }
    if (country) {
      user.country = country;
    }
    if (phonenumber) {
      user.phonenumber = phonenumber;
    }
    if (language) {
      user.language = language;
    }

    // Guarda los cambios en la base de datos
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//Propiedades del usuario
const getAllPropertiesUserHandler = async (req, res) => {
  const { userId } = req.params;
  try {
    const userProperties = await getAllUserProperties(userId);
    if (userProperties.length === 0) {
      throw Error("User has not properties");
    }
    res.status(200).json(userProperties);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Crear propiedad del usuario
const createPropertyUserHandler = async (req, res) => {
  const { userId } = req.params;
  const {
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
  } = req.body;
  try {
    if (
      !title ||
      !type ||
      !address ||
      !country ||
      !guests ||
      !price ||
      !description ||
      !startDate ||
      !endDate ||
      !image
    ) {
      throw Error("All fields are not complete");
    }
    const newProperty = await createUserProperty(
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
    );
    if (!newProperty) {
      throw Error("Property is not created");
    }
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Propiedad del usuario por ID
const getPropertyUserByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const userProperty = await getUserPropertyById(id);
    if (!userProperty) {
      throw Error("User property not found");
    }
    res.status(200).json(userProperty);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
//Actualizar propiedad por ID
const updatePropertyUserHandler = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    type,
    address,
    country,
    guests,
    price,
    description,
    startDate,
    endDate,
  } = req.body;
  try {
    const property = await getUserPropertyById(id);

    if (!property) {
      throw new Error("property not found");
    }

    if (title) {
      property.title = title;
    }
    if (type) {
      property.type = type;
    }
    if (address) {
      property.address = address;
    }
    if (country) {
      property.country = country;
    }
    if (guests) {
      property.guests = guests;
    }
    if (price) {
      property.price = price;
    }
    if (description) {
      property.description = description;
    }
    if (startDate) {
      property.startDate = startDate;
    }
    if (endDate) {
      property.endDate = endDate;
    }

    await property.save();
    res.status(200).json(property);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Eliminar propiedad por ID
const deletePropertyUserHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProperty = await deleteUserProperty(id);
    if (deleteProperty !== "User property deleted") {
      throw Error("User property not found to delete");
    }
    res.status(200).json(deleteProperty);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getUserByIdHandler,
  updateUserHandler,
  getAllPropertiesUserHandler,
  createPropertyUserHandler,
  getPropertyUserByIdHandler,
  updatePropertyUserHandler,
  deletePropertyUserHandler,
};
