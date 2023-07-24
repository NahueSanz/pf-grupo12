import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import StarRatings from 'react-star-ratings';
import Form from 'react-bootstrap/Form';
import { getAuth } from "firebase/auth";
import { postReviewsProperty } from "../../../redux/actions";

function ReviewsPanel({idCasa}) {
  const [show, setShow] = useState(false);
  const [score, setScore] = useState(0);
  const [formData, setFormData] = useState({
    review: '',
  });

  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleScoreChange = (newScore) => {
    setScore(newScore);
    console.log(newScore);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const auth = getAuth();
    const currentUser = auth.currentUser;
    const uid = currentUser.uid;

    // Agregar el rating al objeto formData antes de enviarlo
    const dataToSend = {
      ...formData,
      score: score,
      user: uid,
    };

    console.log("Datos a enviar al backend:", dataToSend);

    // Llamar a la acción para enviar la reseña al backend
    dispatch(postReviewsProperty(idCasa, dataToSend));

    // Cerrar el modal después de enviar la reseña
    handleClose();
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
            rating={score}
            starRatedColor="#FFC107"
            starHoverColor="#FFC107"
            changeRating={handleScoreChange}
            numberOfStars={5}
            starDimension="40px"
            starSpacing="6px"
          />
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="reviewForm">
              <Form.Label>Deja tu opinión acerca de esta propiedad</Form.Label>
              <Form.Control
                as="textarea"
                name="review"
                rows={3}
                value={formData.review}
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
