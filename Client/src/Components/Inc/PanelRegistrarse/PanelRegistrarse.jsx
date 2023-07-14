import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import style from './PanelRegistrarse.module.css';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';


function PanelRegistrarse() {
  const redVariant = 'danger';
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const handleClose = () => {
    setShow(false);
    setError(null); 
    setFormData({
      email: '',
      password: '',
    });
  };
  const handleShow = () => setShow(true);


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);
  
    // CREAR VALIDACIONES
  
   try{
    const response = await axios.post(`http://localhost:3001/public/register`, formData)

    console.log(response.data);
    alert('Created user');
    setShow(false);
    setFormData({
      email: '',
      password: '',
    });
    setError(null);
  
   }
      catch(error){
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

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Registrarse
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registrarse</Modal.Title>
        </Modal.Header>
        <Modal.Body className={style.body}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange} value={formData.email} />
              <Form.Text className="text-muted">
              
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={formData.password}
              />
              <Form.Check
                type="checkbox"
                label="Show password"
                onChange={togglePasswordVisibility}
              />
               
            </Form.Group>
            {error && (
                  <Alert variant={redVariant}>
                    {error}
                  </Alert>
                )}

       
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>

        <Modal.Footer>

        </Modal.Footer>

      </Modal>
    </>
  );
}

export default PanelRegistrarse;
