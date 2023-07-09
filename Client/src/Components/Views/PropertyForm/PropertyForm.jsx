import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import styles from "./PropertyForm.module.css";
import { useParams } from "react-router-dom";
import validate from "../../../utils/validations";
import axios from "axios";

const PropertyForm = () => {
  //Requiriendo el id del usuario de la url
  const { id } =useParams();
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    type: "",
    address: "",
    country: "",
    guests: 0,
    price: 0,
    description: "",
    startDate: "",
    endDate: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    image: "",
    type: "",
    address: "",
    country: "",
    guests: "",
    price: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    //QUIZA SEA MEJOR HACER UN HANDER POR CADA ITEM
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors(
      validate({
        ...formData,
        [name]: value,
      })
    )
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let arrayErrors = Object.entries(errors);
    //CREAR VALIDACIONES
    if (arrayErrors.length === 0) {
      axios.post(`http://localhost:3001/user/${id}/property`,formData)
      .then(res=>{
        console.log(res.data);
        alert("Created property")});
      
      setFormData({
        title: "",
        image: "",
        type: "",
        address: "",
        country: "",
        guests: 0,
        price: 0,
        description: "",
        startDate: "",
        endDate: "",
      });
      setErrors({
        title: "",
        image: "",
        type: "",
        address: "",
        country: "",
        guests: "",
        price: "",
        description: "",
        startDate: "",
        endDate: "",
      })
    }else{
      alert("Debe llenar correctamente todos los campos")
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={styles.form}>
      <Form.Group controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        {errors.title && <Alert variant="danger">{errors.title}</Alert>}
      </Form.Group>

      <Form.Group controlId="formImage">
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
        />
        {errors.image && <Alert variant="danger">{errors.image}</Alert>}
      </Form.Group>

      <Form.Group controlId="formType">
        <Form.Label>Type</Form.Label>
        <Form.Control
          as="select"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="">Select type</option>
          <option value="Apartment">Apartment</option>
          <option value="Hotel">Hotel</option>
          <option value="House">House</option>
          <option value="Cabin">Cabin</option>
        </Form.Control>
        {errors.type && <Alert variant="danger">{errors.type}</Alert>}
      </Form.Group>

      <div className={styles.inline}>
        <Form.Group controlId="formType" className={styles.inlineElement}>
          <Form.Label>Country</Form.Label>
          <Form.Control
            as="select"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          >
            <option value="">Select country</option>
            {/*CAMBIAR LUEGO */}
            <option value="Argentina">Argentina</option>
            <option value="Brasil">Brasil</option>
            <option value="Chile">Chile</option>
            <option value="Uruguay">Uruguay</option>
          </Form.Control>
          {errors.country && <Alert variant="danger">{errors.country}</Alert>}
        </Form.Group>

        <Form.Group controlId="formAddress" className={styles.inlineElement}>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          {errors.address && <Alert variant="danger">{errors.address}</Alert>}
        </Form.Group>
      </div>

      <Form.Group controlId="formGuests">
        <Form.Label>Guests</Form.Label>
        <Form.Control
          type="number"
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          required
        />
        {errors.guests && <Alert variant="danger">{errors.guests}</Alert>}
      </Form.Group>

      <Form.Group controlId="formPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        {errors.price && <Alert variant="danger">{errors.price}</Alert>}
      </Form.Group>

      <Form.Group controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        {errors.description && <Alert variant="danger">{errors.description}</Alert>}
      </Form.Group>

    <div className={styles.inline}>

      <Form.Group controlId="formStartDate" className={styles.inlineElement}>
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
        {errors.startDate && <Alert variant="danger">{errors.startDate}</Alert>}
      </Form.Group>

      <Form.Group controlId="formEndDate" className={styles.inlineElement}>
        <Form.Label>End Date</Form.Label>
        <Form.Control
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
        />
        {errors.endDate && <Alert variant="danger">{errors.endDate}</Alert>}
      </Form.Group>
    </div>
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default PropertyForm;
