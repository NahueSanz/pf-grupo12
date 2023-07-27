import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { BsSearch } from 'react-icons/bs';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import firebaseApp from '../../../fb'
import { getAuth, signOut } from "firebase/auth";
import { login, logout } from "../../../redux/actions"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser, resetUser } from '../../../redux/actions';


import style from "./NavBar.module.css";
import { searchPropertiesByTitle } from "../../../redux/actions";

const auth = getAuth(firebaseApp);



function NavBar() {
  const idUserLogged= localStorage.getItem("loggedIn");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = useSelector(state => state.id);
  const user = useSelector(state => state.user);
  const currentUserId = useSelector(state=> state.id)
  const [showUserInfo, setShowUserInfo ] = useState(true);
  // const [ profileIsCurrentUser, setProfileIsCurrentUser ] = useState(true); 
  const defaultImage = "data:image/jpeg;base64,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"

  useEffect(() => {
      if(!user.image && !user.name && !user.lastname){
          setShowUserInfo(false);
      } else setShowUserInfo(true);
  }, [user]);

  const userImage = user?.image || defaultImage;

  useEffect(() => {
      async function getUserData(id){
        try {
            const data = getUser(id);
            dispatch(data)
        } catch (error) {
            console.log(error);
        }
    }
      
      getUserData(id);

      return () => dispatch(resetUser());
    }, [ dispatch, id]);



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
    <Navbar  className="bg-body-tertiary">
      {/* <Navbar.Toggle className="ms-auto">

       <Navbar.Brand as={Link} to="/home">AloHar</Navbar.Brand>

      </Navbar.Toggle> */}
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className={`${style.nav} me-auto my-2 my-lg-0`}
          style={{ maxHeight: "100px" }}
          navbarScroll
        >
          <Navbar.Brand as={Link} to="/home" className={style.logo}>AloHar</Navbar.Brand>

          <Form className={style.form} onSubmit={handleSubmit} > {/*O BIEN SOLO RENDERIZAR EN /home, O QUE AL BUSCAR REDIRIGA A /home */ }
            <Form.Control
              name="search"
              type="search"
              value={title}
              placeholder="Search"
              className={`me-2 ${style.search}`}
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
                <div className={style.containerImg}>
                  <img
                  className={style.imgUser}
                  // src="https://img.icons8.com/?size=2x&id=23265&format=png"
                  src={userImage} 
                  alt="Imagen de Dropdown"
                />
                </div>
                
              }
            >
              {/* <Dropdown.Item >{auth.currentUser.displayName}</Dropdown.Item> */}
              <Dropdown.Item as={Link} to={`/user/${id}`}>{`${user.name} ${user.lastname}`}</Dropdown.Item>
              

              <Dropdown.Divider />
              {/* Solo renderiza el boton si eres rol admin */
                user.role==="admin"?<Dropdown.Item as={Link} to={`/admin-dashboard`}>Admin Dashboard</Dropdown.Item>:null
              }
              <Dropdown.Item as={Link} to="/new-property">New Property</Dropdown.Item>
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
