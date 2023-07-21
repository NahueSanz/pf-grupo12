import style from './perfilUser.module.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from '../../../redux/actions';
import { useDispatch, useSelector } from "react-redux";
import languageIcon from '../../../assets/languageIcon.svg';
import locationIcon from '../../../assets/locationIcon.svg';
import contactUsIcon from '../../../assets/ContactUs.svg';
import { Link } from "react-router-dom";


function PerfilUser () {
    const navigate = useNavigate('/Miperfilform')
    const { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    useEffect(() => {

        async function getUserData(id){
          try {
              const data = getUser(id);
              dispatch(data)
          } catch (error) {
              console.log(error);
          }
      }
      
        getUserData(id);
      }, [ dispatch, id]);

   if(!user.name){
        return(
            <Container fluid style={{ height: '62vh'}} className='pt-5'>
                <Row className='d-flex justify-content-center align-items-center mt-5'>
                    <Col className='col-12 fw-bold text-uppercase mt-5'>
                        <h2>It's time to create your profile</h2>
                    </Col>
                    <Col lg={6} md={6} sm={12} xs={12} className='mt-4'>
                        <p className='text-secondary' style={{fontFamily: 'Open Sans, sans-serif' }}>Completing your profile helps keeping the host and guests safe. Create it and let the world of Alohar know who you are</p>
                    </Col>
                    <Col className='col-12 mt-4'>
                        <Button as={Link} to="/Miperfilform" variant='danger'>Create profile</Button>
                    </Col>
                </Row>
            </Container>
        )
   }else{
    return(
        <Container fluid style={{ height: '65vh'}}>
            <Row>
                <Col lg={4} md={4} sm={12} xs={12} className='rounded shadow mt-5 mx-lg-5 mx-md-5 ms-0 py-4'>
                    <img src={user.image} alt="" className='rounded-circle mb-3' style={{ width: '100px'}}/>
                    <h3 className='fw-bolder mt-1'> {user.name}</h3>
                    <p>{user.email}</p>
                </Col>  
                <Col lg={4} md={4} sm={12} xs={12} className='mt-5 mx-lg-5 mx-md-5 ms-0'>
                    <h1 className='fw-bolder mt-1 text-start'>About {user.name}</h1>
                    <Col className='col-12 d-flex mb-3 mt-3'>
                        <Button className='btn-light btn-outline-dark'  as={Link} to="/Miperfilform" >Edit profile</Button>
                    </Col>
                    <div>
                     {user.language && <p className='text-start'>
                            <img style={{ height: "22px" }} src={languageIcon} alt="Star icon" className='me-1'/>
                            Speaks {user.language}.
                        </p>}
                       { user.country && <p className='text-start'>
                            <img style={{ height: "22px" }} src={locationIcon} alt="Location icon"  className='me-1'/>
                            Lives in {user.country}.
                        </p>}
                        {user.phonenumber && <p className='text-start'>
                            <img style={{ height: "22px" }} src={contactUsIcon} alt="Phone icon"  className='me-1'/>
                            Contact {user.phonenumber}.
                        </p>}
                    </div>
                    <hr className='mb-4 border-top border-secondary' style={{ width: "100%" }} />
                    {user.description && <p className='text-start'>{user.description}</p>}
                </Col> 
            </Row>
        </Container>
    )
   }
}



export default PerfilUser;