import React from "react";
import { MdHomeRepairService } from "react-icons/md";
import styles from "./AboutUs.module.css";
const AboutUs = () => {
  return (
    <div className="row mt-5">
      <div className="row col-md-6">
        <div className="col-md-6">
          <div className={styles.cas}>
            <MdHomeRepairService size={"1.8rem"} />
            <h1>Good Services</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima
              in quis doloremque ipsa voluptates, itaque quasi placeat incidunt
              soluta dolorum, repudiandae quae, repellat id quos debitis maxime
              possimus blanditiis inventore?
            </p>
          </div>
          <div className={styles.cas}>
            <MdHomeRepairService size={"1.8rem"} />
            <h1>Good Services</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima
              in quis doloremque ipsa voluptates, itaque quasi placeat incidunt
              soluta dolorum, repudiandae quae, repellat id quos debitis maxime
              possimus blanditiis inventore?
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className={styles.cas}>
            <MdHomeRepairService size={"1.8rem"} />
            <h1>Good Services</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima
              in quis doloremque ipsa voluptates, itaque quasi placeat incidunt
              soluta dolorum, repudiandae quae, repellat id quos debitis maxime
              possimus blanditiis inventore?
            </p>
          </div>
          <div className={styles.cas}>
            <MdHomeRepairService size={"1.8rem"} />
            <h1>Good Services</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima
              in quis doloremque ipsa voluptates, itaque quasi placeat incidunt
              soluta dolorum, repudiandae quae, repellat id quos debitis maxime
              possimus blanditiis inventore?
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-6 row justify-content-center align-items-center ">
        <div className="col-auto text-justify">
          <h1 className={styles.titulo_about}>
            Know <span className={styles.orange}>About Us</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, sed
            corrupti porro dolore debitis doloremque ex unde, est odio sint
            recusandae dolorem, beatae ab perferendis?
          </p>
          <button className="btn btn-warning">Read more</button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
