import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import AdPlaceholder from '../components/AdPlaceholder'; // Import the AdPlaceholder component

import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Upcoming hits</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={1}>
            {/* Left-side advertisement */}
            <br/>
            <AdPlaceholder /> 
            <br/><br/><br/><br/><br/>
            <AdPlaceholder /> 

            <br/><br/><br/><br/><br/>
            <AdPlaceholder /> 
            <br/><br/><br/><br/><br/>
            <AdPlaceholder /> 
            <br/><br/><br/><br/><br/>
            <AdPlaceholder /> 
          </Col>
          <Col md={10}>
            {/* Products */}
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          </Col>
          
          <Col md={1}>
            {/* Right-side advertisement */}
            <br/>
            <AdPlaceholder /> 
            <br/><br/><br/><br/><br/>
            <AdPlaceholder /> 
            <br/><br/><br/><br/><br/>
            <AdPlaceholder /> 
            <br/><br/><br/><br/><br/>
            <AdPlaceholder /> 
            <br/><br/><br/><br/><br/>
            <AdPlaceholder /> 
          </Col>
        </Row>
      )}
    </div>
  );
}

export default HomeScreen;
