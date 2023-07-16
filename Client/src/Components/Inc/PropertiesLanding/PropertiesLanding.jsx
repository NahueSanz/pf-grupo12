import style from '../../Views/Landing/landing.module.css';
import Container  from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import LandingPropertiesItem from '../LandingPropertiesItem/landingPropertiesItem';
import Aparment from '../../../assets/Aparment.webp'
import House from '../../../assets/House.webp'
import Cabin from '../../../assets/Cabin.webp'
import Hotel from '../../../assets/Hotel.webp'


function PropertiesLanding() {
    return(
        <Container fluid className='py-3'> 
            <Row className='mb-3' >
                <Col className='g-4 col-12 mb-2 mt-1'>
                    <h4 className='fw-bolder text-center text-md-start text-lg-start'>Discover your ideal property</h4>
                </Col>
                <LandingPropertiesItem  img={House} title={'House'} value='House' href='/home'/>
                <LandingPropertiesItem img={Aparment} title={'Apartment'} value='Aparment' href='/home'/>
                <LandingPropertiesItem img={Cabin} title={'Cabin'} value='Cabin' href='/home'/>
                <LandingPropertiesItem img={Hotel} title={'Hotel'} value='Hotel' href='/home'/>
            </Row>
        </Container>
    )
}




export default PropertiesLanding;