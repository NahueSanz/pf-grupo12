import { Link } from "react-router-dom";

const navBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link>
            <button className="btnBar">Home</button>
          </Link>
        </li>
        <li>
          <Link>
            <button className="btnBar">Poner tu Airbnb</button>
          </Link>
        </li>
        <li>
          <Link>
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
