import { Col } from "react-bootstrap";
import style from '../../Views/PerfilUser/perfilUser.module.css';
import { useNavigate } from "react-router-dom";

function UserPropertiesItem({ properties }) {

  const navigate = useNavigate()
  return (
      <Col className={`g-2 d-flex ${style.userPropertiesItem}`}>
        {properties &&
          properties.map(prop => (
            <Col key={prop.id} lg={4} md={4} sm={12} xs={12} className="mt-3" style={{ cursor: 'pointer' }} onClick={ () => navigate(`/rooms/${prop.id}`)}>
                <img src={prop.image} alt="" className={`${style.propertyImage}`} />
                <div className="d-flex justify-content-between align-items-center mt-1">
                  <span className="text-start fw-bolder ms-md-1 ms-lg-1 ms-5">{prop.type}</span>
                  <span className="text-end fw-semibold me-lg-1 me-md-1 me-5">${prop.price} USD</span>
                </div>
                <small className="d-block text-start text-secondary ms-md-1 ms-lg-1 ms-5">
                  {prop.title.length > 26 ? prop.title.slice(0, 26).concat('...') : prop.title}
                </small>
            </Col>
          ))}
      </Col>
  );
}

export default UserPropertiesItem;