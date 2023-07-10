import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import '../../Views/DetailProperty/PropertyPage.css'

function ReadMore( { description } ) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Read More
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='mx-auto'>About this space</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='paragraph'>
            <small>{ description }</small>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default ReadMore;