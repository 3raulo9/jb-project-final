import React, { useInsertionEffect,  } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { logout } from '../actions/userActions';

function Header() {

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin
  const dispatch = useDispatch()
  const logoutHandler = () =>{
    console.log('logout')
    dispatch(logout())
  }
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

              {userInfo ?(
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>


                </NavDropdown>
              ):(            
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fa fa-user"></i> login
                </Nav.Link>
              </LinkContainer>
                

              )
              }


            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
