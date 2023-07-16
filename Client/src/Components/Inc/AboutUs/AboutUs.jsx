import React from "react";
import style from "../../Views/landing/landing.module.css";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const AboutUs = () => {
  return (
    <Container fluid className="p-5">
      <Row className="d-flex justify-content-center align-text-center py-4">
        <Col className="col-12">
          <h1 className="fw-semibold text-center text-dark font-monospace">About Us</h1>
        </Col>
        <Col className="col-8 m-2 p-1">
          <p className="m-auto fw-semibold text-dark" style={{ textAlign: 'justify', }}>Alohar was founded in 2023 by 6 Henry students Edinson, Fabio, Facundo, Ivan, Julio, Nahuel and Micaela with the idea that make confortable, fast and secure your stay. In the name of Alohar we wish you an excellent experience in the amazing South America.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
