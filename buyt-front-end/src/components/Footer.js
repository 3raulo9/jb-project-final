import React from 'react'
import { Container,Row,Col } from 'react-bootstrap';
function Footer() {
  return (
    <footer>
        <Container>
            <Row>
                <Col className="text-center py3">
                    Copyright &copy; buyT
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer