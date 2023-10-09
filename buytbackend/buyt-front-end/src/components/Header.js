import React, { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logout } from '../actions/userActions';
import { USER_LOGOUT } from '../constants/userConstants';
import RandomPhrase from './RandomPhrase'; 
import SearchBox from './SearchBox'

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header style={{ fontSize: '1.5em'  }}>
      <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
        <Container>
        <LinkContainer to="/" style={{ marginRight: '40px' }}>
            <Navbar.Brand>
              <span style={{ color: '#71797E', fontSize: '2.5em', fontFamily: 'Comic Sans MS, cursive, sans-serif', fontWeight: 'bold' }}>buy</span>
              <span style={{ color: '#007bff', fontSize: '2.5em', fontFamily: 'Comic Sans MS, cursive, sans-serif', fontWeight: 'bold' }}>T</span>
            </Navbar.Brand>
          </LinkContainer>
          <Nav  style={{ marginRight: '460px', marginTop: '20px'}}><RandomPhrase /></Nav>
           

          <div style={{ marginLeft: 'auto' }}>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />

              <Nav className="ml-auto">
                {/* Cart */}
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <i className="fas fa-shopping-cart"></i> cart
                  </Nav.Link>
                </LinkContainer>

                {userInfo ? (
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i className="fa fa-user"></i> login
                    </Nav.Link>
                  </LinkContainer> )}
                  {userInfo && userInfo.isAdmin && (
                  <NavDropdown title='Admin' id='adminmenue'>
                  <LinkContainer to='/admin/userlist'>
                  <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/productlist'>
                  <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/orderlist'>
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>

                  </NavDropdown>
                            )}                
              </Nav>
            </Navbar.Collapse>
          </div>

        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
