import React, { useEffect } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card, Alert } from 'react-bootstrap';
import { addToCart, removeFromCart } from '../actions/cartActions';
import './CartScreen.css'; // Import the CSS file for our custom animation

function CartScreen() {
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const location = useLocation();
  const qty = new URLSearchParams(location.search).get('qty');

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  // Calculate the total price of items in the cart
  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const checkoutHandler = () => {
    navigate('/shipping');
  };

  // Calculate the total quantity of items in the cart
  const totalQuantity = cartItems.reduce((acc, item) => acc + Number(item.qty), 0);

  // Determine whether to use singular or plural "item/items"
  const itemText = totalQuantity === 1 ? 'item' : 'items';

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <Alert variant='info' className="shake">
            Your cart is empty. Add some items from <Link to='/'>here</Link>.
          </Alert>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>

                  <Col md={2}>
                    ${item.price}
                  </Col>
                  
                  <Col md={3}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={1}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}>
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}

        {cartItems.length > 0 && (
          <Card className="mt-3">
            <Card.Body>
              <h5>Total Price: ${total.toFixed(2)}</h5>
            </Card.Body>
          </Card>
        )}
  
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              {cartItems.length === 0 ? (
                <h2>Your cart is empty!</h2>
              ) : (
                <h2 className="subtotal-text">Subtotal {totalQuantity} {itemText}</h2>
              )}
              {cartItems.length > 0 && `$${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}`}
            </ListGroup.Item>
          </ListGroup>

          <ListGroup.Item>
            <Button
              type='button'
              className='btn-block'
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </Button>
          </ListGroup.Item>
        </Card>
      </Col>
    </Row>
  );
}

export default CartScreen;
