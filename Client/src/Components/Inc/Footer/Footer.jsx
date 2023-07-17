import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={`${styles.footer} bg-dark text-light py-4`}>
      <Container>
        <Row>
          <Col xs={12} md={4}>
            <h5>Links</h5>
            <ul className="list-unstyled">{/*CAMBIAR POR ETIQUETAS LINK*/ }
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </Col>
          <Col xs={12} md={4}>
            <h5>Social Media</h5> {/*CAMBIAR POR BOOTSTRAP ICONS*/ }
            <ul className="list-unstyled">
              <li>
                <a href="#">Facebook</a>
              </li>
              <li>
                <a href="#">Twitter</a>
              </li>
              <li>
                <a href="#">Instagram</a>
              </li>
              <li>
                <a href="#">LinkedIn</a>
              </li>
            </ul>
          </Col>
          <Col xs={12} md={4}>
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>Email: example@example.com</li>
              <li>Phone: 123-456-7890</li>
              <li>Address: 123 Street, City, Country</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
