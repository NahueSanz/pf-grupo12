import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch  } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {login, logout} from "../../../redux/actions"
import axios from 'axios';

function LoginPanel() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const loggedIn = useSelector(state => state.loggedIn);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    // Realizar la solicitud de inicio de sesión
    axios.post(`http://localhost:3001/public/login`, formData)
      .then(res => {
        console.log(res.data);
        alert("Logeado");

          dispatch(login());
     
      
       
        setFormData({
          email: '',
          password: '',
        });
      })
      .catch(error => console.log(error));
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
      <Button variant="primary" onClick={handleShow}>
        Iniciar Sesion
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar Sesion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange} />
              <Form.Text className="text-muted">
                We&apos;ll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Iniciar Sesion
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

export default LoginPanel;
