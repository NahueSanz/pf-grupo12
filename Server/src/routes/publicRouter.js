const { Router } = require("express");

const {
  registerUserHandler,
  getAllPropertiesEnabledHandler,
  getPropertyByIdHandler,
} = require("../handlers/publicHandlers");

const publicRouter = Router();

/**************** RUTAS PUBLICAS SIN AUTENTICARSE ****************/

//Registro de usuario
publicRouter.post("/register", registerUserHandler);
//Obtener todas las propiedades habilitadas o traer todas por search habilitadas
publicRouter.get("/properties", getAllPropertiesEnabledHandler);
//Obtener el detalle de la propiedad
publicRouter.get("/property/detail/:id", getPropertyByIdHandler);

publicRouter.get("/property/:email", async function (req, res) {
  const { email } = req.params;
  console.log(email);
  try {
    const nodeMailer = require("nodemailer");

    const html = `
  <h1>Hola Nuevo Usuario :)</h1>
  <p>De parte de Alohar le damos la Bienvenida; estamos muy felices de tenerte como parte de esta gran familia</p>
`;

    const html2 = `
  <h1>Hola Nuevo Usuario :)</h1>
  <p>Gracias por Reservar tu alojamiento preferido </p>
  <p>Que pases una linda temporada<p>
  `;
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
    emailSubject = "Alohar, Gracias por reservar";
    emailHtml = html2;

    const info = await transporter.sendMail({
      from: "<edisonprise@gmail.com>",
      to: email,
      subject: emailSubject,
      html: emailHtml,
      attachments: [
        {
          filename: "house1.jpg",
          path: "https://res.cloudinary.com/dgsnukgdu/image/upload/v1689704501/aloharsur88/HouseMedellin_gdzq1c.jpg",
          cid: "aloharsur88@gmail.com",
        },
        {
          filename: "house2.jpg",
          path: "https://res.cloudinary.com/dgsnukgdu/image/upload/v1689704501/aloharsur88/HouseMedellin_gdzq1c.jpg",
        },
        {
          filename: "house3.jpg",
          path: "https://res.cloudinary.com/dgsnukgdu/image/upload/v1689704501/aloharsur88/HouseMedellin_gdzq1c.jpg",
        },
      ],
    });
    console.log("Message sent: " + info.messageId);
    return info;
  } catch (err) {
    console.log("error" + err);
  }
});

module.exports = publicRouter;
