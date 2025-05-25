import type { FC } from 'react';
import { Navbar as BsNavbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navbar: FC = () => {
  return (
    <BsNavbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <BsNavbar.Brand as={Link} to="/">
          <img
            src="/logo.png"
            alt="Логотип"
            height="35"
            className="d-inline-block align-top"
          />
        </BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Главная</Nav.Link>
            <Nav.Link as={Link} to="/services">Услуги</Nav.Link>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

export default Navbar;
