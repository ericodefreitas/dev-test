import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, Alert, Button, Form } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { Loader } from "react-feather";

import Logo from "@/assets/logo.svg";

import { login } from "@/redux/slices/auth.slice";
import useAppDispatch from "@/hooks/useAppDispatch";
import AuthService from "@/services/AuthService";
import { TextFormField } from "@/components/form/TextFormField/TextFormField";
import { TextFormFieldType } from "@/components/form/TextFormField/TextFormFieldType";
import { useJwt } from "react-jwt";

function SignInPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const [redirectUri] = useState(searchParams.get("redirect_uri"));

  return (
    <React.Fragment>
      <Helmet title="Login" />
      <div className="text-center mt-4">
        <img src={Logo} height={70} className="mb-3" />
        <h2>Bem vindo</h2>
        <p className="lead">Acesse com sua conta para continuar</p>
      </div>

      <Card>
        <Card.Body>
          <div className="m-sm-3">
            <Formik
              initialValues={{
                username: "",
                password: "",
                submit: false,
              }}
              validationSchema={Yup.object().shape({
                username: Yup.string()
                  .max(255)
                  .required("Usuário é obrigatório"),
                password: Yup.string().max(255).required("Senha é obrigatória"),
              })}
              onSubmit={async (values, { setErrors }) => {
                try {
                  const response = await AuthService.login(values.username, values.password);
                  dispatch(login(response))
                  navigate(redirectUri ?? "/");
                } catch (error: any) {
                  const message = error.message || "Usuário ou senha inválidos";
                  setErrors({ submit: message });
                }
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
              }) => (
                <>
                  {errors.submit && <Alert variant="danger">{errors.submit}</Alert>}
                  <TextFormField
                    componentType={TextFormFieldType.INPUT}
                    name="username"
                    label="Usuário"
                    placeholder="Digite seu username"
                    value={values.username}
                    isInvalid={Boolean(touched.username && errors.username)}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    formikError={errors.username}
                    style={{ marginBottom: 10 }}
                  />
                  <TextFormField
                    componentType={TextFormFieldType.INPUT}
                    name="password"
                    password
                    label="Senha"
                    placeholder="Digite sua senha"
                    value={values.password}
                    isInvalid={Boolean(touched.password && errors.password)}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    formikError={errors.password}
                  />

                  <div className="d-grid gap-2 mt-3">
                    <Button
                      size="lg"
                      disabled={isSubmitting}
                      onClick={() => handleSubmit()}
                    >
                      {isSubmitting ? <Loader /> : "Login"}
                    </Button>
                  </div>
                </>
              )}
            </Formik>
          </div>
        </Card.Body>
      </Card>
    </React.Fragment >
  );
}

export default SignInPage;