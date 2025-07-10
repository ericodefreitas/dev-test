import { Container, Row, Spinner } from "react-bootstrap";

const Loader = ({ small }: { small?: boolean }) => (
  <Container fluid className="d-flex" style={{ scale: small ? '.7' : '1' }}>
    <Row className="justify-content-center align-self-center w-100 text-center">
      <Spinner animation="border" variant="primary" />
    </Row>
  </Container>
);

export default Loader;
