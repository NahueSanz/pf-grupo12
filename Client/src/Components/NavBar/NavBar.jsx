import { Link } from "react-router-dom";

const navBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/countries">
            <button className="btnBar">Home</button>
          </Link>
        </li>
        <li>
          <Link to="/countries/activities">
            <button className="btnBar">Poner tu Airbnb</button>
          </Link>
        </li>
        <li>
          <Link to="/countries/activities/show">
            <button className="btnBar">Mostrar Habitaciones</button>
          </Link>
        </li>
        <li></li>
        <li>
          <Link to="/">
            <button className="btnBar">Log Out</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default navBar;
