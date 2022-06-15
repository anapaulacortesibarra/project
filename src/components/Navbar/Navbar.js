import { Link } from 'react-router-dom';
import style from './Navbar.module.css';
import { Navbar, Container, Nav, NavLink } from 'react-bootstrap';



const NavBar = () => {

  return (

    <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/" className={style.brand}> <p>VIDEOGAMES</p></Navbar.Brand>
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink as={Link} to='/videogame' className={style.names} >Create Videogame</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar;