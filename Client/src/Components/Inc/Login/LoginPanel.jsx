import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import firebaseApp from '../../../fb';
import { getAuth, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import PanelRegistrarse from "../PanelRegistrarse/PanelRegistrarse"
import style from './LoginPanel.module.css';

const auth = getAuth(firebaseApp);
const gProvider = new GoogleAuthProvider();

function LoginPanel() {
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Nuevo estado para controlar la visibilidad de la contraseña

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const loginGoogle = () => {
  //   signInWithRedirect(auth, gProvider);
  // };

  // const togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Iniciar Sesion
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={showPassword ? 'text' : 'password'} // Mostrar la contraseña si showPassword es true
                placeholder="Password"
              />
              <Form.Check
                type="checkbox"
                label="Show password" // Etiqueta para mostrar/ocultar la contraseña
                // Cambiar el estado de showPassword al hacer clic en la casilla de verificación
              />
            </Form.Group>

      

            <Button variant="primary" >Iniciar Sesion</Button>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <PanelRegistrarse  variant="link" className={style.linkButton} onClick={handleShow}>
            Regístrate
          </PanelRegistrarse>
       
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LoginPanel;
