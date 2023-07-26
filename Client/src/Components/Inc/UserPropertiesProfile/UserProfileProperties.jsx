import { useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { getUserProperties } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import UserPropertiesItem from './UserPropertiesItem';
 
function UserProperties ({ user }) {
    const { id } = user;
    const dispatch = useDispatch();
    const userProperties = useSelector(state => state.userProperties);

    useEffect(() => {
        async function getProperties(id) {
            try {
              const data = getUserProperties(id);
              dispatch(data);
            } catch (error) {
              console.log(error);
            }
        }
        getProperties(id);
    }, [id]);


    return(
        <Col className='py-1'>
            <h2 className='text-lg-start text-md-start text-center'>{user.name}'s properties</h2>
            <UserPropertiesItem properties={userProperties}/>
        </Col>  
    )
}

export default UserProperties;