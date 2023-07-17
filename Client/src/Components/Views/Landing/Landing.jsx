import style from './landing.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import Hero from '../../Inc/Hero/Hero';
import AboutUs from "../../Inc/AboutUs/AboutUs";
import ContactUs from '../../Inc/ContactUs/ContactUs';


const Landing = () => {
  return (
      <Container fluid className={style.landing}>
          <Hero/>
          <AboutUs/>
          <ContactUs/>
      </Container>
  );
};

export default Landing;
