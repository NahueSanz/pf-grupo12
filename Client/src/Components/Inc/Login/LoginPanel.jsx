import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import firebaseApp from "../../../fb";
import Alert from "react-bootstrap/Alert";
import { getUser, register } from "../../../redux/actions";
import style from "./LoginPanel.module.css";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithCredential,
  signInWithPopup,
  sendEmailVerification,
} from "firebase/auth";

const auth = getAuth(firebaseApp);
const gProvider = new GoogleAuthProvider();

function LoginPanel() {
  const redVariant = "danger";
  const dispatch = useDispatch();
  const userDB = useSelector(state=>state.user);
  //Para mostrar o no el formulario de login
  const [show, setShow] = useState(false);
  //Para mostrar o no la contraseña
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  //errores de validaciones o BDD, usamos errores de firebase
  const [error, setError] = useState(null);

  const handleClose = () => {
    setShow(false);
    setError(null);
    setFormData({
      email: "",
      password: "",
    });
  };
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth(); // Obtener instancia de autenticación de Firebase
      //Login con Firebase pasando email y contraseña
      const { user } = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );


      setFormData({
        email: "",
        password: "",
      });

      //alert("Logged in"); usar otro tipo de alerta
    } catch (error) {
      const errorMessage = error.message;
      setError(errorMessage);
    }
  };
  //Logueo con el boton de google
  const loginGoogle = async () => {
    //Crea el usuario en Firebase al registrarse con google
    await signInWithPopup(auth, gProvider)
      .then( (result) => {
        // Obtener credenciales del usuario creado
        const id = result.user.uid;
        const email = result.user.email;
        const nameUser = result.user.displayName;
        const nameArray = nameUser.split(' ');

        // Ahora, vamos a guardar los nombres en dos variables distintas
        const name = nameArray[0]; // El primer elemento del array será el primer nombre
        const lastname = nameArray.slice(1).join(' '); //desde el segundo elemnto en adelante

  
        //Tratar de que no mande un correo si ya estas registrado: pensado una ruta para realizar condiciones
        //manda un email si te registras con google
        const sendVerificationEmail = async () => {
          const auth = getAuth();
          await sendEmailVerification(auth.currentUser);
        };

        sendVerificationEmail().catch((error) => console.log(error));

        const userData = {
          email,
          id,
          name,
          lastname
        };
        console.log(userData)
        //Tratar de no crear un usuario si ya estas registrado
        //Crea el usuario en la BDD
        dispatch(register(userData));

        // Crear un objeto credential con las credenciales del usuario
        const credential = GoogleAuthProvider.credentialFromResult(result);

        // Iniciar sesión con las credenciales del usuario(Logueo)
      })
      .catch((error) => {
        // Ocurrió un error al autenticar con Firebase a través del objeto del proveedor de Google
        console.log(error);
      });
  };

  return (
    <>
      <Button className="btn-danger" onClick={handleShow}>
        LOGIN
      </Button>

      <Modal show={show} onHide={handleClose} className={style.modal}>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar Sesion</Modal.Title>
        </Modal.Header>
        <Modal.Body className={style.body}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
            </Form.Group>

            {error && <Alert variant={redVariant}>{error}</Alert>}

            <Button type="submit" variant="danger">
              Login
            </Button>
          </Form>
          {/* Boton de google para logueo */}
          <Button
            className={`${style.googleBtn} btn-danger`}
            onClick={loginGoogle}
          >
            <picture>
              <img
                src="https://entredichos.trabajosocial.unlp.edu.ar/wp-content/uploads/sites/6/2016/12/Google_-G-_Logo.svg_.png"
                alt="logo-google"
              />
            </picture>
            <span>Log in with Google</span>
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginPanel;
