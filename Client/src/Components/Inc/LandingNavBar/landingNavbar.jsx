import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import style from '../../Views/Landing/landing.module.css';

function LandingNavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" className={`shadow ${style.navLanding}`}  fixed={'top'}>
      <Container>
        <Navbar.Brand href="/home" className={`${style.font_primary} text-light fs-2`}>ALOHAR</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/become-a-host" className='text-light  ms-lg-5 ms-md-5 ms-0'>Become host</Nav.Link>
            <Nav.Link href="/home" className='text-light  ms-lg-5 ms-md-5  ms-0'>Login</Nav.Link>
            <Nav.Link href="/become-a-host" className='text-light ms-lg-5 ms-md-5 ms-0'>Sign up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default LandingNavBar;