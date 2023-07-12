//Importar los controllers
const {
  createUser,
  getAllProperties,
  findUserByEmail,
  getPropertyDetail,
  getPropertiesbyTitle,
} = require("../controllers/publicControllers");

/********* HANDLERS PARA LAS RUTAS PUBLICAS(NO AUTENTICADO) *********/

//Registrar un nuevo usuario
const registerUserHandler = async (req, res) => {
  const { email,password } = req.body;
  try {
    if (!email || !password ) {
      throw Error("All fields are not complete");
    }
    const newUser = await createUser(email,password);
    if (!newUser) {
      throw Error("User not created");
    }
    //Si todo sale bien se crea al nuevo usuario
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Login de un usuario
const loginUserHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw Error("All fields are not complete");
    }
    const user = await findUserByEmail(email);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    }
    if (user.password !== password) {
      throw Error("Incorrect Password");
    }
    res.status(200).json({ access: "User authenticated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Todas las propiedades o todas las propiedas encontradas por search
const getAllPropertiesHandler = async (req, res) => {
  const {title} = req.query;
  try {
    //Si se busca por search
    if (title) {
      const properties = await getPropertiesbyTitle(title.toLowerCase());
      if (properties.length===0) {
        throw Error("No se paso un titulo valido");
      }
      res.status(200).json(properties);
    }
    else{
      const properties = await getAllProperties();
      if (properties.length === 0) {
        return res.status(404).json({ message: "There are not properties" });
      }
      res.status(200).json(properties);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Detalle de la propiedad
const getPropertyByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const property = await getPropertyDetail(id);
    if (!property) {
      throw Error("Property not Found");
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  registerUserHandler,
  loginUserHandler,
  getAllPropertiesHandler,
  getPropertyByIdHandler,
};
