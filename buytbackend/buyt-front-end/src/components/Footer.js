import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            &copy; 2023 Raul Asadov 
            <a className="text-dark" href="https://www.linkedin.com/in/raul-asadov-b2083a255/" target="_blank" rel="noopener noreferrer">
              <img src="https://static.licdn.com/sc/h/5bukxbhy9xsil5mb7c2wulfbx" alt="LinkedIn" style={{ width: '20px', height: '20px', verticalAlign: 'middle', marginLeft: '5px' }} />
            </a>  | buyT
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
