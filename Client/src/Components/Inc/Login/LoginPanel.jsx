import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import firebaseApp from "../../../fb";
import Alert from "react-bootstrap/Alert";
import { login, logout } from "../../../redux/actions";
import style from "./LoginPanel.module.css";
import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import axios from "axios";

const auth = getAuth(firebaseApp);
const gProvider = new GoogleAuthProvider();

function LoginPanel() {
  const redVariant = "danger";
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: localStorage.getItem("email") || "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleClose = () => {
    setShow(false);
    setError(null);
  };
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      // Realizar la solicitud de inicio de sesión
      const response = await axios.post(
        `http://localhost:3001/public/login`,
        formData
      );
      console.log(response.data);
      alert("Logeado");
      localStorage.setItem("email", formData.email);

      dispatch(login(response.data.id));

      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      const errorMessage = error.response.data.error;
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

  const loginGoogle = () => {
    signInWithRedirect(auth, gProvider);
  };

  return (
    <>
      <Button className='btn-danger' onClick={handleShow}>
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
              <Form.Text className="text-muted">
                We&apos;ll never share your email with anyone else.
              </Form.Text>
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

          <Button className={`${style.googleBtn} btn-danger`} onClick={loginGoogle}>
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
