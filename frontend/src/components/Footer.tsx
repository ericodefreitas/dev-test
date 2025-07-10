import { Container, Row, Col } from "react-bootstrap";

const Footer = () => (
  <footer className="footer">
    <Container fluid>
      <Row className="text-muted">
        <Col xs="12" className="text-end">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} -{" "}
            <span className="text-muted">{import.meta.env.VITE_APP_TITLE}</span>
          </p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
