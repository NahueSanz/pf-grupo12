import style from "./Payment.module.css";
import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

//ESTE COMPONENTE SIGUE EN PROCESO


function Payment() {
  const paypalOptions = {
    "client-id": "test",
    currency: "USD",
  };


  return (
    <section className={style.payment}>
        <PayPalScriptProvider options={paypalOptions} >
            <PayPalButtons className={style.paypal}/>
        </PayPalScriptProvider>
    </section>
  );
}


export default Payment;
