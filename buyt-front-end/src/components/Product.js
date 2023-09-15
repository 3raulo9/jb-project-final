import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import Rating from './Rating';
import { Link, Link as Linjo, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

function Product({ product }) {
  const [qty, setQty] = useState(1);
  const navigate = useNavigate(); // Initialize the navigate function

  const incrementQty = () => {
    if (qty < product.countInStock) {
      setQty(qty + 1);
    }
  };

  const decrementQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const addToCartHandler = () => {
    navigate(`/cart/${product._id}?qty=${qty}`); // Use the navigate function to navigate to the cart
  };

  return (
    <Card className="my-3 p-3 rounded">
      <Linjo to={`/product/${product._id}`}>
        <Card.Img src={product.image} />
      </Linjo>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className='my-3'>
            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#fc9700'} />
          </div>
        </Card.Text>

        <Card.Text as="h3">
          <div className="d-flex justify-content-between align-items-center">
            <span className="product-price">${product.price}</span>
            <div className='product-quantity'>
              <div className='quantity-bubble'>
                <button
                  type='button'
                  className='quantity-button'
                  onClick={decrementQty}
                >
                  -
                </button>
                <span className='quantity-value'>{qty}</span>
                <button
                  type='button'
                  className='quantity-button'
                  onClick={incrementQty}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </Card.Text>
        <Button
          onClick={addToCartHandler}
          className='btn-block'
          type='button'
          disabled={product.countInStock === 0}
        >
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Product;
