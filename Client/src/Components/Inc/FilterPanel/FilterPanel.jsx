import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Form from 'react-bootstrap/Form';
import styles from './FilterPanel.module.css';

function Example() {
  const [lgShow, setLgShow] = useState(false);
  const [value, setValue] = useState([]);

  const handleChange = (val) => setValue(val);

  return (
    <>
      <Button onClick={() => setLgShow(true)}>Filter</Button>
      <Modal
        className={styles.modal}
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg" className={styles.tittleFilter} >
            <span>Filtros</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody} >


          <h4>Rango de precios</h4>
          <div className={styles.containerInputs}>
            <div className={styles.containerInput1}>
              <label className={styles.labelPrice} htmlFor="">Mínimo</label>
              <div >
                <span>$</span>
                <input type="text" />
              </div>
            </div>

            <div className={styles.containerInput1}>
              <label htmlFor="">Máximo</label>
              <div >
                <span htmlFor="">$</span>
                <input type="text" />
              </div>

            </div>
          </div>

          <h4 className={styles.tittleType}>Países</h4>
          <Form.Select aria-label="Default select example" className={styles.select}>
            <option>Paises</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>



          <h4 className={styles.tittleType}>Tipo de propiedad</h4>
          <ToggleButtonGroup type="checkbox" value={value} onChange={handleChange}>
            <ToggleButton
              id="tbg-btn-1"
              className={`btn btn-primary ${styles.buttonTypes} ${value.includes(1) ? styles.selectedButton : ''}`}
              value={1}
            >
              <img src="https://img.icons8.com/?size=1x&id=4525&format=png" alt="" />
              Apartament
            </ToggleButton>
            <ToggleButton
              id="tbg-btn-2"
              className={`btn btn-primary ${styles.buttonTypes} ${value.includes(2) ? styles.selectedButton : ''}`}
              value={2}
            >
              <img src="https://img.icons8.com/?size=1x&id=aJugviEYCZvO&format=png" alt="" />
              Hotel
            </ToggleButton>
            <ToggleButton
              id="tbg-btn-3"
              className={`btn btn-primary btn-transparent ${styles.buttonTypes} ${value.includes(3) ? styles.selectedButton : ''}`}
              value={3}
            >
              <img src="https://img.icons8.com/?size=1x&id=73&format=png" alt="" />
              House
            </ToggleButton>
            <ToggleButton
              id="tbg-btn-4"
              className={`btn btn-primary ${styles.buttonTypes} ${value.includes(4) ? styles.selectedButton : ''}`}
              value={4}
            >
              <img src="https://img.icons8.com/?size=1x&id=3876&format=png" alt="" />
              Cabin
            </ToggleButton>
          </ToggleButtonGroup>


      
        </Modal.Body>


        <Modal.Footer className={styles.modalFooter}>
          <Button variant="secondary">Borrar todo</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
