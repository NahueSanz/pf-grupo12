import style from "./Payment.module.css";
import React, { useState } from "react";
import { Card, Row, Col, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Payment() {
  const property = useSelector((state) => state.propertyDetail);
  const [selectedRange, setSelectedRange] = useState([
    {
      startDate: new Date(property.startDate),
      endDate: new Date(property.endDate),
      key: "selection"
    }
  ]);

  const paypalOptions = {
    "client-id": "test",
    currency: "USD"
  };

  function onChange(range) {
    setSelectedRange([range.selection]);
  }

  function calculateNights() {
    const startDate = selectedRange[0].startDate;
    const endDate = selectedRange[0].endDate;
    const timeDifference = endDate.getTime() - startDate.getTime();
    const nights = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return nights;
  }

  const nights = calculateNights();

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <h4 className={style.encabezado}>Reserve payment</h4>
      <section className={style.payment}>
        <PayPalButtons className={style.paypal} />

        <ListGroup flush>
          <ListGroup.Item>
            <Card className={style.card} style={{ maxWidth: "35vw" }} >
              <Row className="g-0">
                <Col md={4}>
                  <Card.Img src={property.image} alt={property.title} />
                </Col>
                <Col md={8} className="text-start">
                  <Card.Body>
                    <Card.Title>{property.title}</Card.Title>
                    <Card.Text>{property.address}</Card.Text>
                    <Card.Text>
                      <small className="text-body-secondary">
                        {property.type}
                      </small>
                    </Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </ListGroup.Item>

          <ListGroup.Item>
            <DateRange
              ranges={selectedRange}
              onChange={onChange}
              editableDateInputs={{ range: true }}
              direction="vertical"
              showDateDisplay={true}
              minDate={new Date(property.startDate)}
              maxDate={new Date(property.endDate)}
            />
          </ListGroup.Item>

          <ListGroup.Item>
            <h4>Price Detail:</h4>
            <div className={style.priceLine}><h5>${property.price} USD per {nights} nights</h5> <h5>${(property.price)*nights}</h5></div>
            <div className={style.priceLine}><h5>Taxes (5%)</h5> <h5>${(((property.price)*nights)*5)/100}</h5></div>
            <hr />
            <div className={style.priceLine}><h5>Total price</h5> <h5>${(((property.price)*nights)*5)/100+((property.price)*nights)}</h5></div>
          </ListGroup.Item>
        </ListGroup>
      </section>
    </PayPalScriptProvider>
  );
}

export default Payment;
