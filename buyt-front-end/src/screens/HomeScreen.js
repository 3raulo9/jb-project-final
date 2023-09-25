import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import AdPlaceholder from '../components/AdPlaceholder';

import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  // Use useEffect to fetch products when the component mounts
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  // Calculate the number of advertisements based on available screen height
  const screenHeight = window.innerHeight;
  const adHeight = 300; // Height of each advertisement
  const numAds = Math.floor((screenHeight - 70) / (adHeight + 30)); // Consider bottom ad and spacing

  // Helper function to generate multiple line breaks
  const generateLineBreaks = (count) => {
    const lineBreaks = [];
    for (let i = 0; i < count; i++) {
      lineBreaks.push(<br key={i} />);
    }
    return lineBreaks;
  };

  return (
    <div>
      <h1>Upcoming hits</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {/* Left-side advertisement */}
          <Col md={1}>
            <br />
            {[1,2,3].map((_, index) => (
              <div key={index}>
                <AdPlaceholder padding='20px' minHeight={`${adHeight}px`} />
                {generateLineBreaks(15)}
              </div>
            ))}
          </Col>

          {/* Products */}
          <Col md={10}>
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          </Col>

          {/* Right-side advertisement */}
          <Col md={1}>
            <br />
            {[1,2,3].map((_, index) => (
              <div key={index}>
                <AdPlaceholder padding='20px' minHeight={`${adHeight}px`} />
                {generateLineBreaks(15)}
              </div>
            ))}
          </Col>
        </Row>
      )}
      {/* Advertisement at the very bottom */}
      <Row>
        <Col md={12}>
          {generateLineBreaks(5)}
          <AdPlaceholder minHeight='70px' />
        </Col>
      </Row>
    </div>
  );
}

export default HomeScreen;
