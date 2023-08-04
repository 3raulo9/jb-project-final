import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

import { Link as Linjo, Link } from 'react-router-dom';

function Product( {product}) {
  return (
    <Card className="my-3 p-3 rounded">
{/* i just liked the way "Linjo" looks */}
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
                    <Rating value={product.rating} text={`${product.numReviews} reviews` } color={'#fc9700'} />

                </div>
            </Card.Text>

            <Card.Text as="h3">
                ${product.price}
            </Card.Text>


        </Card.Body>
    </Card>
  )
}

export default Product