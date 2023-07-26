import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { BsSearch } from 'react-icons/bs';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import firebaseApp from '../../../fb'
import { getAuth, signOut } from "firebase/auth";
import { login, logout } from "../../../redux/actions"
import { useNavigate } from "react-router-dom";


import style from "./NavBar.module.css";
import { searchPropertiesByTitle } from "../../../redux/actions";

const auth = getAuth(firebaseApp);


function NavBar() {

  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = useSelector(state => state.id);
  const user = useSelector(state => state.user);


  const handleChange = (event) => {
    setTitle(event.target.value)
  }
  const logoutHandle = () => {
 
      signOut(auth)
        .then(() => {
          dispatch(logout());
        })
        .catch((error) => {
          console.log(error);
        });

    dispatch(logout())
    navigate("/")
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(searchPropertiesByTitle(title))
    setTitle("")
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className={`${style.nav} me-auto my-2 my-lg-0`}
          style={{ maxHeight: "100px" }}
          navbarScroll
        >
          <Navbar.Brand as={Link} to="/home">AloHar</Navbar.Brand>

          <Form className={style.form} onSubmit={handleSubmit}> {/*O BIEN SOLO RENDERIZAR EN /home, O QUE AL BUSCAR REDIRIGA A /home */ }
            <Form.Control
              name="search"
              type="search"
              value={title}
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={handleChange}
            />
            <Button variant="outline-success" type="submit" className={style.searchButton}>
           < BsSearch className={style.imgSearch}/>
            </Button>
          </Form>

          <div className={style.containerNews}>

            <DropdownButton
              className={`btn btn-primary bg-transparent ${style.buttonMenu}`}
              align="end"
              title={
                <img
                  className={style.imgUser}
                  src="https://img.icons8.com/?size=2x&id=23265&format=png"
                  // src={auth.currentUser.photoURL}
                  alt="Imagen de Dropdown"
                />
              }
            >
              {/* <Dropdown.Item >{auth.currentUser.displayName}</Dropdown.Item> */}
              <Dropdown.Item as={Link} to="/new-property">New Property</Dropdown.Item>

              <Dropdown.Divider />
              {/* Solo renderiza el boton si eres rol admin */
                user.role==="admin"?<Dropdown.Item as={Link} to={`/admin-dashboard`}>Admin Dashboard</Dropdown.Item>:null
              }
              <Dropdown.Item as={Link} to={`/user/${id}`}>Profile</Dropdown.Item>
              <Dropdown.Item as={Link} to="/update-my-property">Update My Property</Dropdown.Item>
              <Dropdown.Item as={Link} to="/" onClick={logoutHandle}>Close sesion</Dropdown.Item>

            </DropdownButton>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
