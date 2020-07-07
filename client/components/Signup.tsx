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
import { UserType } from "../types/UserType";

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
  email: Yup.string()
    .email("Valid email is required")
    .required("Email is required"),
  username: Yup.string().required("Name is required"),
  password: Yup.string()
    .required("Password is required")
    .min(5, "Password should be at least 5 characters long"),
});

interface ISignupProps {
  userType?: UserType;
  isSigninLinkDisabled?: boolean;
}
const Signup = ({ userType, isSigninLinkDisabled }: ISignupProps) => {
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
      username: "",
      password: "",
    },
    onSubmit,
  });

  const endpoint = "/api/users/signup";

  const { doRequest, apiErrors } = useRequest({
    url: endpoint,
    method: HTTP_METHOD.POST,
    body: {
      name: values.username,
      password: values.password,
      email: values.email,
      type: userType || UserType.ORIGINATOR,
    },
    onSuccess: () => router.push("/dashboard"),
  });

  return (
    <FadeIn>
      <Card>
        <H2>Sign Up ({userType || "Originator"})</H2>
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

          <Form.Group controlId="formBasicName">
            <Form.Control
              placeholder="Name"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
          {touched.username && errors.username && (
            <Alert variant="danger">{errors.username}</Alert>
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

          {!isSigninLinkDisabled && (
            <P>
              Already have an account? Click{" "}
              <A
                className="text-primary"
                onClick={() => {
                  router.push("/signin");
                }}
              >
                here
              </A>{" "}
              to sign in
            </P>
          )}
        </Form>
      </Card>
    </FadeIn>
  );
};

export default Signup;
