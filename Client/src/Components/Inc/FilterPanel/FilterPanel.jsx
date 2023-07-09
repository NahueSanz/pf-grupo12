import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { BsFilter } from 'react-icons/bs';
import { useDispatch } from "react-redux";
import { orderPrice } from "../../../redux/actions";
import { countries } from "../../../utils/countries"
import styles from "./FilterPanel.module.css";


function FilterPanel({
  onPriceMinChange,
  onPriceMaxChange,
  onCountryChange,
  onTypeChange,
  priceMin,
  priceMax,
  selectedCountry,
  selectedTypes,
}) {

  const [lgShow, setLgShow] = useState(false);
  const dispatch = useDispatch();

  const handleSaveChanges = () => {
    setLgShow(false);
  };

  const handleReset = () => {
    const emptyEvent = { target: { value: "" } };

    onPriceMinChange(emptyEvent);
    onPriceMaxChange(emptyEvent);
    onCountryChange(emptyEvent);
    onTypeChange([]);
  };

  const handleOrderPrice = (e) => {
    dispatch(orderPrice(e.target.value));
  };

  return (
    <>

      <div className={styles.containerFilters}>
        <div className={styles.selectOrd}>
          <label htmlFor="order">Order by: </label>
        <Form.Select aria-label="Default select example" name="order" className={styles.selectOrdPrice} onChange={handleOrderPrice}>
          <option value="All">Most relevant</option>
          <option value="A">Lower price</option>
          <option value="D">Higher price</option>
        </Form.Select>

        </div>
        
        <Button onClick={() => setLgShow(true)}>  <BsFilter /> Filters</Button>
      </div>

      <Modal
        className={styles.modal}
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="example-modal-sizes-title-lg"
            className={styles.tittleFilter}
          >
            <span>Filtros</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <h4>Rango de precios</h4>
          <div className={styles.containerInputs}>
            <div className={styles.containerInput1}>
              <label className={styles.labelPrice} htmlFor="priceMin">
                Mínimo
              </label>
              <div>
                <span>$</span>
                <input
                  type="number"
                  id="priceMin"
                  value={priceMin}
                  onChange={onPriceMinChange}
                />
              </div>
            </div>
            <div className={styles.containerInput1}>
              <label htmlFor="priceMax">Máximo</label>
              <div>
                <span htmlFor="priceMax">$</span>
                <input
                  type="number"
                  id="priceMax"
                  value={priceMax}
                  onChange={onPriceMaxChange}
                />
              </div>
            </div>
          </div>
          <h4 className={styles.tittleType}>Países</h4>
          <Form.Select
            aria-label="Default select example"
            className={styles.select}
            value={selectedCountry}
            onChange={onCountryChange}
          >
            <option value="">Países</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}

          </Form.Select>
          <h4 className={styles.tittleType}>Tipo de propiedad</h4>
          <ToggleButtonGroup
            type="checkbox"
            value={selectedTypes}
            onChange={onTypeChange}
          >
            <ToggleButton
              id="tbg-btn-1"
              className={`btn btn-primary ${styles.buttonTypes} ${selectedTypes.includes("Apartment") ? styles.selectedButton : ""
                }`}
              value={"Apartment"}
            >
              <img
                src="https://img.icons8.com/?size=1x&id=4525&format=png"
                alt=""
              />
              Apartment
            </ToggleButton>
            <ToggleButton
              id="tbg-btn-2"
              className={`btn btn-primary ${styles.buttonTypes} ${selectedTypes.includes("Hotel") ? styles.selectedButton : ""
                }`}
              value={"Hotel"}
            >
              <img
                src="https://img.icons8.com/?size=1x&id=aJugviEYCZvO&format=png"
                alt=""
              />
              Hotel
            </ToggleButton>
            <ToggleButton
              id="tbg-btn-3"
              className={`btn btn-primary btn-transparent ${styles.buttonTypes
                } ${selectedTypes.includes("House") ? styles.selectedButton : ""
                }`}
              value={"House"}
            >
              <img
                src="https://img.icons8.com/?size=1x&id=73&format=png"
                alt=""
              />
              House
            </ToggleButton>
            <ToggleButton
              id="tbg-btn-4"
              className={`btn btn-primary ${styles.buttonTypes} ${selectedTypes.includes("Cabin") ? styles.selectedButton : ""
                }`}
              value={"Cabin"}
            >
              <img
                src="https://img.icons8.com/?size=1x&id=3876&format=png"
                alt=""
              />
              Cabin
            </ToggleButton>
          </ToggleButtonGroup>
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
          <Button variant="secondary" onClick={handleReset}>
            Borrar todo
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FilterPanel;