import { useNavigate, useRouteError } from "react-router-dom";
import styled from "styled-components";
import DashboardLayout from "@/layouts/Dashboard";
import Icon500 from "@/assets/img/page500.svg"
import { AxiosError } from "axios";
import { Button } from "react-bootstrap";

interface Props {
    fatal?: boolean
}

export default function Page500(props: Props) {
    if (props.fatal) {
        return <ComponentContent fatal />
    }

    return (
        <DashboardLayout>
            <ComponentContent />
        </DashboardLayout>
    );
}

function ComponentContent(props: Props) {
    const navigate = useNavigate();
    const error = useRouteError();

    let codeError = "";
    if (error instanceof AxiosError) {
        if (error.message === "Network Error") {
            codeError = '503'
        }
    }

    return (
        <Content>
            <img src={Icon500} alt="500" width={400} />
            <div id="error-page">
                <h1>Ocorreu um erro inesperado</h1>
                <p>A página que você tentou acessar está com um erro inesperado. Por favor entre em contato com o administrador do site.</p>
                <p>Código do erro: {codeError}</p>
            </div>
            {props.fatal && (
                <button
                    id="fatal-button"
                    title={"Voltar a landing page"}
                    onClick={() => navigate("/")}
                />
            )}
            <Button onClick={() => window.location.reload()}>Carregar página</Button>
        </Content>
    )
}

const Content = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: auto;

  img {
    user-select: none;
  }
  
  h1 {
    text-align: center;
    font-style: normal;
    font-weight: 700;
  }
  
  p {
    text-align: center;
    font-size: 20px;
  }

  #fatal-button {
    width: 80%;
  }
`