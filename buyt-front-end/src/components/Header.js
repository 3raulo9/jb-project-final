import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

function Header() {
  return (
    <header>
      <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>buyT</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {/* Cart */}
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> cart
                </Nav.Link>
              </LinkContainer>

              {/* Login */}
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fa fa-user"></i> login
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
