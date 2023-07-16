import style from '../../Views/Landing/landing.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'



function Hero(){
  return (  
    <Container fluid className={`${style.containerHero} p-5`} >
      <Row className='mt-5'>
        <Col className='col-12'>
            <h1 className='fw-bolder text-light display-5'>
              Find and reserve your perfect place.
            </h1>
        </Col>
        <Col className='col-12 mt-4'>
          <Button className='btn-light shadow fw-bolder' href='/home'>SEARCH</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Hero;
