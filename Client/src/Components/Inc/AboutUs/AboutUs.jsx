import style from '../../Views/Landing/landing.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import img from '../../../assets/AboutUsImage.webp'
import AboutUsItem from '../AboutUsItems/itemsAboutUs';
import Secure from '../../../assets/securityIcon.svg';
import Comfortable from '../../../assets/comfortableIcon.svg';
import Fast from '../../../assets/fastIcon.svg';


const AboutUs = () => {
  return (
   <Container fluid className='mb-5'>
      <Row style={{ backgroundColor: '#fff', height: '70vh'}}> 
        <Col className='col-12 d-flex justify-content-center text-uppercase align-text-center text-nowrap'>
              <h2 className='fw-bolder text-dark fw'>
                  About <span className='fw-bolder text-danger'>Us</span>
              </h2>
          </Col>
          <div className='d-flex justify-content-center align-items-center p-5 ms-5' style={{ position: 'absolute', width: '90%'}}>
          <Col lg={7} md={6} sm={12} xs={12} className='px-2'>
           <p className="lh-lg fst-italic fw-bold text-start mx-2 mb-5" style={{ textAlign: 'justify', fontFamily: 'Open Sans, sans-serif' }}>Alohar, founded in 2023 by 6 Henry students, Edinson, Fabio, Facundo, Ivan, Julio, Nahuel and Micaela, with the mission of make your experience comfortable, fast, and secure. With our carefully selected accommodations and commitment to quality, we strive to provide you with unforgettable memories. We look forward to being part of your amazing journey through this beautiful continent South America.</p>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12} className='d-flex justify-content-center p-5'>
            <img src={img} alt="" style={{ width: '400px', height: '350px' }} fluid/>
          </Col>
          </div>
          </Row>
         <Row>
          <Col className='col-12 mt-2'>
            <h3 className='text-danger text-start text-uppercase text-decoration-underline'>Why Us?</h3>
            <iframe width="400" height="260" src="https://www.youtube.com/embed/kYorkpYEme8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </Col>
          <AboutUsItem img={Secure} title={'Secure'} text={'We collaborate with verified and trustworthy hosts who have undergone rigorous selection processes'}/>
          <AboutUsItem img={Comfortable} title={'Comfortable'} text={'We offer a carefully chosen accommodations for your perfect stay. Wide selection to meet your needs.'}/>
          <AboutUsItem img={Fast} title={'Fast'} text={'We provide a function of instant bookings, allowing you to secure your accommodation quickly and hassle-free.'}/>
         </Row>
   </Container>
  );
};

export default AboutUs;
