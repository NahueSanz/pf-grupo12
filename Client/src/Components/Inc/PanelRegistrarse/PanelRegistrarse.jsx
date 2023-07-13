import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import firebaseApp from '../../../fb';
import { getAuth, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import style from './PanelRegistrarse.module.css';
import axios from 'axios';

const auth = getAuth(firebaseApp);
const gProvider = new GoogleAuthProvider();

function PanelRegistrarse() {
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Nuevo estado para controlar la visibilidad de la contraseña
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const loginGoogle = () => {
    signInWithRedirect(auth, gProvider);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)

    //CREAR VALIDACIONES

      axios.post(`http://localhost:3001/public/register`,formData)
      .then(res=>{
        console.log(res.data);
        alert("Created user")});
      
      setFormData({
        email: '',
        password: '',
      });


  };
useEffect(()=> console.log(formData), [formData])

  const handleChange = (e) => {

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Registrarse
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registrarse</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form  onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange}/>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={showPassword ? 'text' : 'password'} // Mostrar la contraseña si showPassword es true
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
              <Form.Check
                type="checkbox"
                label="Show password" // Etiqueta para mostrar/ocultar la contraseña
                onChange={togglePasswordVisibility} // Cambiar el estado de showPassword al hacer clic en la casilla de verificación
              />
            </Form.Group>

            <Button className={style.googleBtn} onClick={loginGoogle}>
              <picture>
                <img
                  src="https://entredichos.trabajosocial.unlp.edu.ar/wp-content/uploads/sites/6/2016/12/Google_-G-_Logo.svg_.png"
                  alt="logo-google"
                />
              </picture>
              <span>Registrarse con Google</span>
            </Button>
            <Button type="submit" variant="primary">
            Save Changes
          </Button>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
     
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PanelRegistrarse;
