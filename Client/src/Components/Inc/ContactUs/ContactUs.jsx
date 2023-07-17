import style from '../../Views/Landing/landing.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import img from '../../../assets/locationIcon.svg';
import img2 from '../../../assets/ContactUs.svg'
import img3 from '../../../assets/CallUs.svg';


function ContactUs(){
    return(
        <Container fluid className={style.contact}>
            <Row>
                <Col className='col-12' >
                    <h1 className='text-light fw-bolder text-decoration-underline'>Contact Us</h1>
                    <p className='text-light fw-semibold'>Get in Touch with Us for Any Questions or Inquiries</p>
                </Col>
                <Col lg={4} md={4} sm={12} xs={12} className='g-2 d-flex justify-content-center align-items-center mt-5'>
                    <div className={`${style.item} py-4 px-1 rounded shadow-lg`} >
                            <img src={img} alt="Location Icon" style={{ width: '60px'}}/>
                            <h5 className='fw-bold text-danger mt-3 mb-3'>Our address</h5>
                            <small className=''>Av. Medrano 706, C1179AAN CABA</small>
                    </div>
                </Col>
                <Col lg={4} md={4} sm={12} xs={12} className='g-2 d-flex justify-content-center align-items-center mt-5'>
                    <div className={`${style.item} py-4 px-1 rounded shadow-lg`} >
                            <img src={img2} alt="Location Icon" style={{ width: '60px'}}/>
                            <h5 className='fw-bold text-danger mt-3 mb-3'>Email Us</h5>
                            <small className=''>Alohar@email.com</small>
                    </div>
                </Col>
                <Col lg={4} md={4} sm={12} xs={12} className='g-2 d-flex justify-content-center align-items-center mt-5'>
                    <div className={`${style.item} py-4 px-1 rounded shadow-lg`} >
                            <img src={img3} alt="Location Icon" style={{ width: '60px'}}/>
                            <h5 className='fw-bold text-danger mt-3 mb-3'>Call Us</h5>
                            <small className=''>+54 1143 31 4590</small>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}


export default ContactUs;