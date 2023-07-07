import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import styles from "./PropertyForm.module.css";

const PropertyForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    owner: "",
    type: "",
    address: "",
    country: "",
    guests: 0,
    enabled: true,
    score: 0,
    price: 0,
    review: [],
    description: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    //QUIZA SEA MEJOR HACER UN HANDER POR CADA ITEM
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //CREAR VALIDACIONES
    // TRAER FUNCION POST DE REDUX
    console.log(formData);
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
      </Form.Group>

      <Form.Group controlId="formOwner">
        {/*CAMBIAR FORM POR DATOS DEL USIARIO*/}
        <Form.Label>Owner</Form.Label>
        <Form.Control
          type="text"
          name="owner"
          value={formData.owner}
          onChange={handleChange}
          required
        />
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
      </Form.Group>
    </div>
      

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default PropertyForm;
