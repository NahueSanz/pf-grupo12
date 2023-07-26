import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Comentarios from '../Comentarios/Comentarios'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsProperty } from "../../../redux/actions";
import style from "./PanelComentarios.module.css"



function Example({ idCasa }) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.review);

  const idUserLogged= localStorage.getItem("loggedIn");

  useEffect(() => {
    async function getReviewData(idCasa) {
      try {
        const data = getReviewsProperty(idCasa);

        dispatch(data);
      } catch (error) {
        console.log(error);
      }
    }

    getReviewData(idCasa);
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
        className={style.containerModal}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title" className={style.title}>
            Reviews
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className={style.comentarios}>
            {reviews && reviews.length > 0 ? (
              reviews.map((element) => {
                if (element.enabled) {

                  return (
                    <Comentarios
                      key={element.id}
                      id={element.id}
                      review={element.review}
                      score={element.score}
                      user={element.User}
                      idUserLogged={idUserLogged}

                    />
                  )

                }

              })
            ) : (
              <p>No hay comentarios disponibles.</p>
            )}
          </div>

        </Modal.Body>
      </Modal>
    </>
  );
}

export default Example;