import style from './perfilUser.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser, resetUser } from '../../../redux/actions';
import { useDispatch, useSelector } from "react-redux";
import PerfilUserName from '../../Inc/PerfilUserName/perfilUserName';
import PerfilUserAbout from '../../Inc/PerfilUserAbout/perfilUserAbout';
import PerfilCreateUser from '../../Inc/PerfilUserCreateButton/perfilUserCreate';
import UserProperties from '../../Inc/UserPropertiesProfile/UserProfileProperties';


function PerfilUser () {
    const { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const currentUserId = useSelector(state=> state.id)
    const [showUserInfo, setShowUserInfo ] = useState(true);
    const [ profileIsCurrentUser, setProfileIsCurrentUser ] = useState(true); 

    useEffect(() => {
        if(id === currentUserId){
            setProfileIsCurrentUser(true);
        }else {
            setProfileIsCurrentUser(false);
        }
    }, [id, currentUserId]);
 
    useEffect(() => {
        if(!user.phonenumber && !user.language && !user.country){
            setShowUserInfo(false);
        } else setShowUserInfo(true);
    }, [user]);

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

        return () => dispatch(resetUser());
      }, [ dispatch, id]);

   
    return(
        <Container fluid style={{ height: 'auto' }} className='py-lg-5 py-md-5 py-2 mb-5'>
            <Row className='d-flex justify-content-between'>
            {profileIsCurrentUser &&  <Col className='col-12 d-flex align-items-center justify-content-end mb-3'>
                <a className='text-decoration-underline link-dark link-offset-1 d-md-none d-lg-none d-block fw-bolder'>
                    Edit
                </a>
            </Col> }
            <Col lg={3} md={3} sm={11} xs={11} className={`rounded shadow-lg ms-lg-5 ms-md-5 ms-3 ${style.perfilUserName}`} style={{ height: '300px' }}>
                <PerfilUserName user={user} />
            </Col>
            <Col lg={8} md={9} sm={12} xs={12}>
                {!showUserInfo ? (
                <PerfilCreateUser profileIsCurrentUser={profileIsCurrentUser}/>
                ) : (
                <PerfilUserAbout user={user} profileIsCurrentUser={profileIsCurrentUser}/>
                )}
                <hr className='border-top border-secondary mt-5' style={{ width: '100%' }} />
                <UserProperties user={user} />
            </Col>
            </Row>
      </Container>
    )
   }




export default PerfilUser;