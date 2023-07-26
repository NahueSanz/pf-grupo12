import { Row, Col, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";


function PerfilCreateUser ({ profileIsCurrentUser } ) {


    return(
        <Row className='d-flex justify-content-center'>
            {profileIsCurrentUser ? (
                <>
                    <Col className='col-12 fw-bold text-uppercase mt-5 mb-2'>
                        <hr className='mb-4 border-top border-secondary' style={{ width: "100%" }} />
                        <h3>It's time to create your profile</h3>
                    </Col>
                    <Col className='col-12 mb-2'>
                        <p className='text-secondary' style={{fontFamily: 'Open Sans, sans-serif'}}>Completing your profile helps keeping the host and guests safe. Create it and let the world of Alohar know who you are</p>
                    </Col>
                    <Col className='col-12'>
                        <Button as={Link} to="/Miperfilform" variant='danger'>Create profile</Button>
                    </Col>
                </>
            ) : (
                <Col className='col-12 fw-semibold text-uppercase mt-5 mb-2'>
                    <h5>This user does not contain information. Please do not trust users without any information.</h5>
                </Col>
            )}
    </Row>
    )
}


export default PerfilCreateUser;