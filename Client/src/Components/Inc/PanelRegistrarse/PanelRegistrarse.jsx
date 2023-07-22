import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import style from "./PanelRegistrarse.module.css";
import Alert from "react-bootstrap/Alert";
import axios from "axios";


import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

function PanelRegistrarse() {
  const redVariant = "danger";
  // muestra o no en pantalla el form de registro
  const [show, setShow] = useState(false);
  // muestra o no la contraseña
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });
  // errores de BDD o validaciones, se está usando de firebase
  const [error, setError] = useState(null);

  const handleClose = () => {
    setShow(false);
    setError(null);
    setFormData({
      name: "",
      lastname: "",
      email: "",
      password: "",
    });
  };
  const handleShow = () => setShow(true);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // Al presionar el botón save changes crea el usuario en firebase y BDD
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // trae los datos del usuario de firebase
      const auth = getAuth();
      // crea el usuario en firebase con email y contraseña
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      // Manda al correo un email con el registro del usuario
      const sendVerificationEmail = async () => {
        const auth = getAuth(); // Obtener instancia de autenticación de Firebase
        await sendEmailVerification(auth.currentUser);
      };
      sendVerificationEmail().catch((error) => console.log(error));

      const userData = {
        name: formData.name,
        lastname: formData.lastname,
        email: formData.email,
        id: userCredential.user.uid,
      };
      // Crea un usuario en la BDD con los datos proporcionados
      await axios
        .post("http://localhost:3001/public/register", userData)
        //.post("https://pf-grupo12-production.up.railway.app/public/register", userData)

        .then((response) => console.log("Response register: ", response.data))
        .catch((error) => console.log("Error Register: ", error));

      setShow(false);
      setFormData({
        name: "",
        lastname: "",
        email: "",
        password: "",
      });
      setError(null);

      //alert("Created user"); Crear nuevo tipo de Alerta
      dispatch(login(userData.id));
      navigate("/home");
    } catch (error) {
      const errorMessage = error.message;
      setError(errorMessage);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <a className="link-danger" onClick={handleShow}>
        Sign up
      </a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body className={style.body}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                onChange={handleChange}
                value={formData.name}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastname">
              <Form.Label>Lastname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter lastname"
                name="lastname"
                onChange={handleChange}
                value={formData.lastname}
              />
            </Form.Group>
            
            
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={handleChange}
                value={formData.email}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={formData.password}
              />
              <Form.Check
                className="mt-3"
                type="checkbox"
                label="Show password"
                onChange={togglePasswordVisibility}
              />
            </Form.Group>
            {error && <Alert variant={redVariant}>{error}</Alert>}
            <Button type="submit" variant="danger">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PanelRegistrarse;