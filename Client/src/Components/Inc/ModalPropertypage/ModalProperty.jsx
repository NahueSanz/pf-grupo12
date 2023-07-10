import '../../Views/DetailProperty/PropertyPage.css'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import closeIcon from '../../../assets/CloseIcon.svg'
import favoriteIcon from '../../../assets/favoriteIcon.svg'
import favoriteFillIcon from '../../../assets/favoriteFillIcon.svg'

function FavoritesAddNotification({ title }) {
    
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  return (
    <>
      {!show ? <Button variant='outline-danger rounded-circle ms-4 favButton' className='addButton'onClick={handleShow}><img src={favoriteIcon} alt="Favorite" style={{ height: "25px"}}/></Button>: <Button className='outline-danger rounded-circle btn-danger ms-4'  variant='danger' onClick={handleShow}><img src={favoriteFillIcon} alt="Favorite Filled" style={{ height: "25px", cursor: 'pointer' }}/></Button>}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          {`${title} added to favorites`}
          <img src={closeIcon} alt="Close" style={{ height: "25px", float: 'right', cursor: 'pointer' }} onClick={handleClose}/>
        </Modal.Body>
      </Modal>
    </>
  );
} 

export default FavoritesAddNotification;