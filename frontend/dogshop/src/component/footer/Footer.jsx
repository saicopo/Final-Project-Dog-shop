import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row>
          <Col md={4} className="mb-3">
            <h5>Contatti</h5>
            <p>Email: info@example.com</p>
            <p>Telefono: +39 123 456 789</p>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Link Utili</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light">Home</a></li>
              <li><a href="#" className="text-light">Chi Siamo</a></li>
              <li><a href="#" className="text-light">Servizi</a></li>
              <li><a href="#" className="text-light">Contatti</a></li>
            </ul>
          </Col>
          <Col md={4} className="mb-3 text-center">
            <h5>Seguici</h5>
            <div className="d-flex justify-content-center">
              <a href="#" className="text-primary mx-2 fs-3"><FaFacebook /></a>
              <a href="#" className="text-info mx-2 fs-3"><FaTwitter /></a>
              <a href="#" className="text-danger mx-2 fs-3"><FaInstagram /></a>
              <a href="#" className="text-primary mx-2 fs-3"><FaLinkedin /></a>
            </div>
          </Col>
        </Row>
        <hr className="bg-light" />
        <Row>
          <Col className="text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} Tutti i diritti riservati.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
