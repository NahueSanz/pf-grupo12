//Importar los controllers
const {
  getAllProperties,
  findUserByEmail,
  getPropertyDetail,
} = require("../controllers/publicControllers");
/********* HANDLERS PARA LAS RUTAS PUBLICAS(NO AUTENTICADO) *********/

//Login
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
//Todas las propiedades
const getAllPropertiesHandler = async (req, res) => {
  try {
    const properties = await getAllProperties();
    if (properties.length === 0) {
      return res.status(404).json({ message: "No hay datos cargados" });
    }
    res.status(200).json(properties);
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
  loginUserHandler,
  getAllPropertiesHandler,
  getPropertyByIdHandler,
};

