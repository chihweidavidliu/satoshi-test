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

const ContentGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: max-content 1fr;
  grid-gap: 20px;

  @media (min-width: ${(props) => props.theme.tabletBreakpoint}) {
    width: 400px;
  }
`;

const TitleWrapper = styled.div`
  text-align: center;
  padding: 30px;
`;

const H1 = styled.h1`
  margin: 0;
  color: white;
  font-size: 24px;
  @media (min-width: ${(props) => props.theme.tabletBreakpoint}) {
    font-size: 48px;
  }
`;

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
  username: Yup.string().required("Name is required"),
  password: Yup.string()
    .required("Password is required")
    .min(5, "Password should be at least 5 characters long"),
  age: Yup.number().min(0, "Age must be over 0").required("Age is required"),
  score: Yup.number().min(0, "Min score is 0").required("Score is required"),
});

const SigninSignup = () => {
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
      username: "",
      password: "",
      age: "",
      score: "",
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
      age: values.age,
      score: values.score,
    },
    onSuccess: () => router.push("/dashboard"),
  });

  return (
    <FadeIn>
      <ContentGrid>
        <TitleWrapper>
          <H1>Join Us</H1>
        </TitleWrapper>
        <Card>
          <H2>Sign Up</H2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                placeholder="Enter name"
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
              <Form.Label>Password</Form.Label>
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
            <Form.Group controlId="age">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Age"
                name="age"
                value={values.age}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
            {touched.age && errors.age && (
              <Alert variant="danger">{errors.age}</Alert>
            )}
            <Form.Group controlId="score">
              <Form.Label>Score</Form.Label>
              <Form.Control
                type="number"
                placeholder="Score"
                name="score"
                value={values.score}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
            {touched.score && errors.score && (
              <Alert variant="danger">{errors.score}</Alert>
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
          </Form>
        </Card>
      </ContentGrid>
    </FadeIn>
  );
};

export default SigninSignup;
