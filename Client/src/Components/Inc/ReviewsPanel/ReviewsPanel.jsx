import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import StarRatings from 'react-star-ratings';
import Form from 'react-bootstrap/Form';
import { getAuth } from "firebase/auth";

function ReviewsPanel() {
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [formData, setFormData] = useState({
    comentario: '',
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    console.log(newRating);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const auth = getAuth();
    const currentUser = auth.currentUser;
    const uid = currentUser.uid;

    console.log("Este es el rating:", rating);
    console.log("Este es el UID del usuario:", uid);
    console.log("Estos son los datos del formulario:", formData);
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
        Calificar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deja una reseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StarRatings
            rating={rating}
            starRatedColor="#FFC107"
            starHoverColor="#FFC107"
            changeRating={handleRatingChange}
            numberOfStars={5}
            starDimension="40px"
            starSpacing="6px"
          />
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="reviewForm">
              <Form.Label>Deja tu opinión acerca de esta propiedad</Form.Label>
              <Form.Control
                as="textarea"
                name="comentario"
                rows={3}
                value={formData.comentario}
                onChange={handleChange}
              />
              <Button type="submit">Publicar</Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ReviewsPanel;
