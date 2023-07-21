//Importar los controllers
const {
  createUser,
  getAllProperties,
  findUserByEmail,
  getPropertyDetail,
  getPropertiesbyTitle,
} = require("../controllers/publicControllers");
/********* HANDLERS PARA LAS RUTAS PUBLICAS(NO AUTENTICADO) *********/

const nodeMailer = require("nodemailer");

const html = `
  <h1>Hola Nuevo Usuario :)</h1>
  <p>De parte de Alohar le damos la Bienvenida; estamos muy felices de tenerte como parte de esta gran familia</p>
`;

const html2 = `
  <h1>Hola Nuevo Usuario :)</h1>
  <p>Gracias por Reservar tu alojamiento preferido, las fechas de la reserva son: dd/mm/yyyy. </p>
  <p>Que pases una linda temporada<p>
`;

const sendEmail = async (toEmail, type) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "edisonprise@gmail.com",
      pass: "bcoagfopeblzaybz",
    },
  });

  let emailSubject;
  let emailHtml;

  if (type === "welcome") {
    emailSubject = "Alohar, Gracias por Registrarse";
    emailHtml = html;
  } else if (type === "reservation") {
    emailSubject = "Alohar, Gracias por tu Reserva";
    emailHtml = html2;
  } else {
    throw new Error("Invalid email type");
  }

  const info = await transporter.sendMail({
    from: "<edisonprise@gmail.com>",
    to: toEmail,
    subject: emailSubject,
    html: emailHtml,
  });

  console.log("Message sent: " + info.messageId);
  return info;
};

const registerUserHandler = async (req, res) => {
  var { email, id } = req.body;
  ema = email;
  try {
    if (!email || !id) {
      throw new Error("All fields are not complete");
    }
    const newUser = await createUser(email, id);
    if (!newUser) {
      throw new Error("User not created");
    }

    // Si todo sale bien se crea al nuevo usuario
    // Envía el correo electrónico al usuario recién registrado
    const emailInfo = await sendEmail(email, "welcome"); // Enviamos el email de bienvenida
    console.log("Email sent: " + emailInfo.messageId);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Check user
const checkUserHandle = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      throw Error("All fields are not complete");
    }
    const user = await findUserByEmail(email);
    if (!user) {
      res.status(200).json({ exists: false });
    }
    res.status(200).json({ exists: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Todas las propiedades o todas las propiedas encontradas por search
const getAllPropertiesHandler = async (req, res) => {
  const { title } = req.query;
  try {
    //Si se busca por search
    if (title) {
      const properties = await getPropertiesbyTitle(title.toLowerCase());
      if (properties.length === 0) {
        throw Error("No se paso un titulo valido");
      }
      res.status(200).json(properties);
    } else {
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
  getAllPropertiesHandler,
  getPropertyByIdHandler,
};
