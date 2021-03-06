import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import styled from "styled-components";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Card } from "./Card";
import { useRequest } from "../hooks/useRequest";
import { HTTP_METHOD } from "../types/httpMethod";
import { useRouter } from "next/router";
import { FadeIn } from "./FadeIn";

const H2 = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

const P = styled.p`
  text-align: center;
  margin: 10px 0px 0px 0px;
`;

const A = styled.a`
  cursor: pointer;
  text-decoration: underline;
`;

const validationSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(5, "Password should be at least 5 characters long"),
});

const Signin = () => {
  const router = useRouter();

  const onSubmit = async () => {
    await doRequest();
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    validationSchema,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
  });

  const { doRequest, apiErrors } = useRequest({
    url: "/api/users/signin",
    method: HTTP_METHOD.POST,
    body: {
      email: values.email,
      password: values.password,
    },
    onSuccess: () => router.push("/dashboard"),
  });

  return (
    <FadeIn>
      <Card>
        <H2>Log In</H2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              placeholder="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
          {touched.email && errors.email && (
            <Alert variant="danger">{errors.email}</Alert>
          )}

          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
          {touched.password && errors.password && (
            <Alert variant="danger">{errors.password}</Alert>
          )}
          <div className="text-center">
            <Button
              variant="primary"
              type="submit"
              style={{ marginBottom: "10px" }}
            >
              Submit
            </Button>
          </div>
          {apiErrors}
          <P>
            Don't have an account? Click{" "}
            <A
              className="text-primary"
              onClick={() => {
                router.push("/signup");
              }}
            >
              here
            </A>{" "}
            to sign up
          </P>
        </Form>
      </Card>
    </FadeIn>
  );
};

export default Signin;
