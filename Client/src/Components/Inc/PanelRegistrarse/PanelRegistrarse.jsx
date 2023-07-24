import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import style from "./PanelRegistrarse.module.css";
import Alert from "react-bootstrap/Alert";
import { register } from "../../../redux/actions";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";


function PanelRegistrarse() {
  const dispatch = useDispatch();
  const redVariant = "danger";
  //muestra o no en pantalla el form de registro
  const [show, setShow] = useState(false);
  //muestra o no la contraseña
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  //errores de BDD o validaciones, se esta usando de firebase
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  //Al presionar el boton save changes vrea el usuario en firebase y BDD
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //trae los datos del usuario de firebase
      const auth = getAuth();
      //crea el usuario en firebase con email y contraseña
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
        formData.name,
        formData.lastname
      );
      //Manda al correo un email con el registro del usuario
      const sendVerificationEmail = async () => {
        const auth = getAuth(); // Obtener instancia de autenticación de Firebase
        await sendEmailVerification(auth.currentUser);
      };
      sendVerificationEmail().catch((error) => console.log(error));

      const userData = {
        email: formData.email,
        name: formData.name,
        lastname: formData.lastname,
        id: userCredential.user.uid,
      };
      //Crea un usuario en la BDD con el email y id proporcionado por Firebase
      dispatch(register(userData))

      setShow(false);
      setFormData({
        email: "",
        password: "",
        name: "",
        lastname: ""
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

      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
        <Modal.Title  className={style.tittle}>Welcome</Modal.Title>
          
        </Modal.Header>
        <Modal.Body className={style.body}>
          <Form onSubmit={handleSubmit} className={style.form} >
          

            <div className={style.register}>
               <Form.Label className={style.desc}>Please enter your personal info</Form.Label>
            <Form.Group className={`mb-3 ${style.formGroup}`} controlId="formBasicEmail">
              {/* <Form.Label>Name</Form.Label> */}
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                onChange={handleChange}
                value={formData.name}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>


            <Form.Group className={`mb-3 ${style.formGroup}`} controlId="formBasicEmail">
              {/* <Form.Label>Last Name</Form.Label> */}
              <Form.Control
                type="text"
                placeholder="Last name"
                name="lastname"
                onChange={handleChange}
                value={formData.lastname}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>



            <Form.Group className={`mb-3 ${style.formGroup}`} controlId="formBasicEmail">
              {/* <Form.Label>Email</Form.Label> */}
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={handleChange}
                value={formData.email}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className={`mb-4 ${style.formGroup}`} controlId="formBasicPassword">
              {/* <Form.Label>Password</Form.Label> */}
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


            </div>

         
            <Button type="submit" variant="danger">
              Sign Up
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PanelRegistrarse;
