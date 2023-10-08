// import React from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap';
// import Rating from '../components/Rating';
// import products from '../products';

// function ProductScreen() {
//   const { id } = useParams();
//   const product = products.find((p) => p._id === id);

//   if (!product) {
//     // You might want to handle the case where the product is not found
//     return <div>Product not found.</div>;
//   }

//   return (
//     <div>
//       <Link to='/' className='btn btn-light my-3'>
//         Go Back
//       </Link>
//       <Row>
//         <Col md={6}>
//           <Card className='my-3 p-3 rounded'>
//             <Image src={product?.image} alt={product?.name} fluid />
//           </Card>
//         </Col>

//         <Col md={3}>
//           <ListGroup variant='flush'>
//             <ListGroup.Item>
//               <h3>{product.name}</h3>
//             </ListGroup.Item>

//             <ListGroup.Item>Price: ${product.price}</ListGroup.Item>

//             <ListGroup.Item>{product.description}</ListGroup.Item>

//             <ListGroup.Item>
//               <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#fc9700'} />
//             </ListGroup.Item>
//           </ListGroup>
//         </Col>

//         <Col md={3}>
//           <Card>
//             <ListGroup variant='flush'>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Price:</Col>
//                   <Col>
//                     <strong>${product.price}</strong>
//                   </Col>
//                 </Row>
//               </ListGroup.Item>

//               <ListGroup.Item>
//                 <Row>
//                   <Col>Status:</Col>
//                   <Col>
//                     {product.countInStock > 0 ? 'Currently available' : 'Not available'}
//                   </Col>
//                 </Row>
//               </ListGroup.Item>

//               <ListGroup.Item>
//                 <Button className='btn-block' disabled={product.countInStock == 0} type='button'>add to cart</Button>
//               </ListGroup.Item>


//             </ListGroup>




//           </Card>
//         </Col>
//       </Row>
//       {/* Add the rest of the product details */}
//     </div>
//   );
// }

// export default ProductScreen;



// above is an old code that uses non api thingies and below does use them
//  



// import React, {useState, useEffect} from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap';
// import Rating from '../components/Rating';
// import axios from 'axios';

// function ProductScreen({match}) {
//   const [product, setProduct] = useState([])

//   useEffect(() => {

//     async function fetchProduct() {

//       const { data } = await axios.get('/api/products/${match.params.id}');
//       setProduct(data);
//     }

//     fetchProduct()
//   }, [])


//   return (
//     <div>
//       <Link to='/' className='btn btn-light my-3'>
//         Go Back
//       </Link>
//       <Row>
//         <Col md={6}>
//           <Card className='my-3 p-3 rounded'>
//             <Image src={product?.image} alt={product?.name} fluid />
//           </Card>
//         </Col>

//         <Col md={3}>
//           <ListGroup variant='flush'>
//             <ListGroup.Item>
//               <h3>{product.name}</h3>
//             </ListGroup.Item>

//             <ListGroup.Item>Price: ${product.price}</ListGroup.Item>

//             <ListGroup.Item>{product.description}</ListGroup.Item>

//             <ListGroup.Item>
//               <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#fc9700'} />
//             </ListGroup.Item>
//           </ListGroup>
//         </Col>

//         <Col md={3}>
//           <Card>
//             <ListGroup variant='flush'>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Price:</Col>
//                   <Col>
//                     <strong>${product.price}</strong>
//                   </Col>
//                 </Row>
//               </ListGroup.Item>

//               <ListGroup.Item>
//                 <Row>
//                   <Col>Status:</Col>
//                   <Col>
//                     {product.countInStock > 0 ? 'Currently available' : 'Not available'}
//                   </Col>
//                 </Row>
//               </ListGroup.Item>

//               <ListGroup.Item>
//                 <Button className='btn-block' disabled={product.countInStock == 0} type='button'>add to cart</Button>
//               </ListGroup.Item>


//             </ListGroup>




//           </Card>
//         </Col>
//       </Row>
//       {/* Add the rest of the product details */}
//     </div>
//   );
// }

// export default ProductScreen;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProductDetails, createProductReview } from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import './ProductScreen.css'; // Import the CSS file for the styles

function ProductScreen() {
  const [qty, setQty] = useState(1);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const { id } = useParams();
  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector(state => state.productReviewCreate);
  const {
      loading: loadingProductReview,
      error: errorProductReview,
      success: successProductReview,
  } = productReviewCreate;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(
        id, // Use the ID from useParams
        {
          rating,
          comment
        }
    ));
  }

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const navigate = useNavigate();

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

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

  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Card className='my-3 p-3 rounded product-card'>
              <Image src={product?.image} alt={product?.name} fluid className='product-image' />
            </Card>
          </Col>

          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>

              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>

              <ListGroup.Item>{product.description}</ListGroup.Item>

              <ListGroup.Item>
                <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#fc9700'} />
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card className='product-details'>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>{product.countInStock > 0 ? 'Currently available' : 'Not available'}</Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col xs='auto' className='my-1'>
                        <div className='product-quantity'>
                          <div className='quantity-bubble'>
                            <button
                              type='button'
                              className='quantity-button product-quantity-button'
                              onClick={decrementQty}
                            >
                              -
                            </button>
                            <span className='quantity-value'>{qty}</span>
                            <button
                              type='button'
                              className='quantity-button product-quantity-button'
                              onClick={incrementQty}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className='btn-block'
                    disabled={product.countInStock === 0}
                    type='button'
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h4>Write a review</h4>

                  {loadingProductReview && <Loader />}
                  {successProductReview && <Message variant='success'>Review Submitted</Message>}
                  {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}

                  {userInfo ? (
                      <Form onSubmit={submitHandler}>
                          <Form.Group controlId='rating'>
                              <Form.Label>Rating</Form.Label>
                              <Form.Control
                                  as='select'
                                  value={rating}
                                  onChange={(e) => setRating(e.target.value)}
                              >
                                  <option value=''>Select...</option>
                                  <option value='1'>1 - Poor</option>
                                  <option value='2'>2 - Fair</option>
                                  <option value='3'>3 - Good</option>
                                  <option value='4'>4 - Very Good</option>
                                  <option value='5'>5 - Excellent</option>
                              </Form.Control>
                          </Form.Group>

                          <Form.Group controlId='comment'>
                              <Form.Label>Review</Form.Label>
                              <Form.Control
                                  as='textarea'
                                  row='5'
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                              ></Form.Control>
                          </Form.Group>

                          <Button
                              disabled={loadingProductReview}
                              type='submit'
                              variant='primary'
                          >
                              Submit
                          </Button>

                      </Form>
                  ) : (
                          <Message variant='info'>Please <Link to='/login'>login</Link> to write a review</Message>
                      )}
              </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}

      {/* Reviews section */}
      <Row>
        <Col md={6}>
          <h4>Reviews</h4>
          {product.reviews.length === 0 ? (
            <Message variant='info'>No Reviews</Message>
          ) : (
            <ListGroup variant='flush'>
              {product.reviews.map((review) => (
                <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} color='#f8e825' />
                  {review.createdAt && <p>{review.createdAt.substring(0, 10)}</p>}
                  <p>{review.comment}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default ProductScreen;
