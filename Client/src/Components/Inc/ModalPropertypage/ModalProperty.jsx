import { useState } from "react";
import { Button, Modal, Col } from "react-bootstrap";

function FavoritesAddNotification({ title }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {!show ? (
        <Button
          variant="outline-danger rounded-circle ms-4 favButton"
          className="addButton"
          onClick={handleShow}
        >
          <i class="bi bi-heart"></i>
        </Button>
      ) : (
        <Button
          className="outline-danger rounded-circle btn-danger ms-4"
          variant="danger"
          onClick={handleShow}
        >
         <i className="bi bi-heart-fill"></i>
        </Button>
      )}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
         <Col className="d-flex justify-content-between">
            <small className="">{`${title} added to favorites`}</small>
            <i class="bi bi-x-circle" style={{ cursor: 'pointer'}} onClick={handleClose}></i>
        </Col>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default FavoritesAddNotification;
