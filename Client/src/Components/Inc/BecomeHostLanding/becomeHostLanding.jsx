import style from '../../Views/Landing/landing.module.css';
import  Container  from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import  Button  from 'react-bootstrap/Button';

function BecomeHostLanding() {
    return(
        <Container fluid className={style.becomeHostLanding}>
             <Row>
                <Col className='col-12 d-flex align-items-center justify-content-center'>
                <h2 className='text-light fw-bolder'>
                        Anounce your property and earn money on Alohar
                </h2>
                </Col>
                <Col className='col-12 mt-4'>
                <Button className='btn-dark shadow fw-semibold' href='/become-a-host'>Become host</Button>
                </Col>
                </Row>
        </Container>
    )
}


export default BecomeHostLanding;