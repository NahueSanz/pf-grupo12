import React from "react";
import styles from "./landing.module.css";
import { Link } from "react-router-dom";
import AboutUs from "../../Inc/AboutUs/AboutUs";
import LoginPanel from "../../Inc/Login/LoginPanel"
import PanelRegistrarse from "../../Inc/PanelRegistrarse/PanelRegistrarse"

const Hero = () => {
  return (
   
    <div className={styles.prin}> 

      <nav className="row">
        <h1 className="col-md-1">AloHar</h1>
        <ul className="col-md-10">
          <li>Features</li>
          <li>Trending</li>
          <li>About</li>
        </ul>
        <PanelRegistrarse className="col-md-1 btn btn-warning">Registrarse</PanelRegistrarse>
        <LoginPanel className="col-md-1 btn btn-warning">Iniciar Sesion </LoginPanel>
        
      </nav>

      <div className={styles.cont}>
        <div className={styles.form}>
          <div className="row">
            {/* <div className="col-md-3">
              <div className="">
                <label htmlFor="location">Location</label>
                <input type="text" placeholder="CO" className="form-control" />
              </div>
            </div>
            <div className="col-md-3">
              <label htmlFor="property">Property</label>
              <input
                type="text"
                placeholder="property"
                className="form-control"
              />
            </div>
            <div className="col-md-3 ">
              <label htmlFor="price">Max price</label>
              <input
                type="text"
                placeholder="100,00"
                className="form-control"
              />
            </div> */}
            <div className="col-md-3 ">
              <br></br>
              <Link to="/home" id="click">
                <button className="btn btn-warning">Let´s Go</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <AboutUs />
    </div>
  );
};

export default Hero;
