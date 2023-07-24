import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Comentarios from '../Comentarios/Comentarios'
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getReviewsProperty}from "../../../redux/actions"

function Example({idCasa}) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.review);


  useEffect(() => {
    async function getReviewData(idCasa) {
      try {
        const data = getReviewsProperty(idCasa);

        dispatch(data);
      } catch (error) {
        console.log(error);
      }
    }

    getReviewData(idCasa) ;
  }, [dispatch, idCasa]);


  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        Ver mas
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Custom Modal Styling
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <div>
        {reviews?.map((element) => {
          return (
            <Comentarios
              key={element.idCasa}
              id={element.idCasa}
              review={element.review}
              score={element.score}
              user={element.User}
            />
          );
        })}
      </div>
        
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Example;