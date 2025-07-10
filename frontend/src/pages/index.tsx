import React from "react";
import { Helmet } from "react-helmet-async";
import { Card } from "react-bootstrap";

const WelcomePage = () => {
  return (
    <React.Fragment>
      <Helmet title="Bem-vindo" />
      <Card>
        <Card.Body>
          <h1 className="h2">Bem-vindo(a) ao Teste de Avaliação!</h1>
          <p className="lead">
            Esta é a área logada do sistema. Sinta-se à vontade para explorar o projeto e demonstrar suas habilidades.
          </p>
          <p>Boa sorte!</p>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default WelcomePage;