import { Col } from 'react-bootstrap';
import profilePicGuess from '../../../assets/guessProfilePic.webp';


function PerfilUserName({ user }) {

    const userImg = user.image || profilePicGuess
    
    return(     
            <Col className='py-5'>
                    {<img src={userImg} alt="User image" className='rounded-circle mb-3' style={{ width: '100px'}}/>}
                    <h1 className='fw-bolder mt-3'> {user.name}</h1>
                    <p>{user.email}</p>
            </Col>  
    )
}


export default PerfilUserName;