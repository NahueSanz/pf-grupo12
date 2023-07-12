import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { BsSearch } from 'react-icons/bs';
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import firebaseApp from '../../../fb'
import { getAuth, signOut } from "firebase/auth";

import style from "./NavBar.module.css";
import { searchPropertiesByTitle } from "../../../redux/actions";

const auth = getAuth(firebaseApp);

function NavBar() {
  console.log("hola soy el auth", auth)

  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const handleChange = (event) => {
    setTitle(event.target.value)
  }
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
          <Form className={style.form}>
            <Form.Control
              name="search"
              type="search"
              value={title}
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={handleChange}
            />
            <Button variant="outline-success" className={style.searchButton} onClick={()=>{dispatch(searchPropertiesByTitle(title))}}>
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
                  // src="https://img.icons8.com/?size=2x&id=23265&format=png"
                  src={auth.currentUser.photoURL}
                  alt="Imagen de Dropdown"
                />
              }
            >
              <Dropdown.Item >{auth.currentUser.displayName}</Dropdown.Item>
              <Dropdown.Item as={Link} to="/become-a-host">Become a host</Dropdown.Item>
        
              <Dropdown.Divider />
              <Dropdown.Item as={Link} to="/" onClick={() => signOut(auth)}>Close sesion</Dropdown.Item>

            </DropdownButton>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
