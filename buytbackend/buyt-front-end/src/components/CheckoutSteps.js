import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './CheckoutSteps.css'; // Import your custom CSS file

function CheckoutSteps({ step1, step2, step3, step4 }) {
    return (
        <Nav className='checkout-steps'>
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/login'>
                        <Nav.Link className='checkout-step-link active'>Login</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link className='checkout-step-link disabled'>Login</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/shipping'>
                        <Nav.Link className='checkout-step-link active'>Shipping</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link className='checkout-step-link disabled'>Shipping</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/payment'>
                        <Nav.Link className='checkout-step-link active'>Payment</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link className='checkout-step-link disabled'>Payment</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step4 ? (
                    <LinkContainer to='/placeorder'>
                        <Nav.Link className='checkout-step-link active'>Place Order</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link className='checkout-step-link disabled'>Place Order</Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    );
}

export default CheckoutSteps;
