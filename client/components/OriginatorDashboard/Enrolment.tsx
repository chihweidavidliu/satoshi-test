import React, { useState, useEffect } from "react";
import { useFormik, FormikValues } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import styled from "styled-components";
import { IUser } from "../../types/IUser";
import { IProgram } from "../../types/IProgram";
import { getPrograms } from "./api/getPrograms";
import ProgramCard from "./ProgramCard";
import { enrolProducer } from "./api/enrolProducer";
import { useRouter } from "next/router";
import { ContentWrapper } from "../Layout/ContentWrapper";

const StyledForm = styled(Form)`
  height: 100%;
  max-height: 100%;
  grid-gap: 15px;
  padding: 20px 0px;
  display: grid;
  grid-template-rows: max-content 1fr max-content;
`;

const ProgramSelection = styled.div`
  display: grid;
  grid-template-rows: max-content 1fr;
  overflow-y: hidden;
`;

const ProgramCardGrid = styled.div`
  display: grid;
  grid-gap: 15px;
  overflow-y: auto;
  padding-bottom: 15px;
  grid-template-columns: 1fr 1fr;
`;

const validationSchema = Yup.object({
  apv: Yup.number().required("APV is required"),
  program: Yup.string().nullable().required("Program is required"),
});

interface IEnrolmentProps {
  producer: IUser;
  currentUser: IUser;
}

const Enrolment = ({ producer, currentUser }: IEnrolmentProps) => {
  const [programs, setPrograms] = useState<IProgram[]>([]);
  const router = useRouter();

  useEffect(() => {
    getPrograms().then(({ data }) => {
      setPrograms(data);
    });
  }, []);

  const onSubmit = async (values: FormikValues) => {
    try {
      const program = programs.find((program) => program.id === values.program);

      if (!program) {
        throw new Error("Program not found");
      }

      await enrolProducer(currentUser, producer, program, values.apv);

      alert(
        `${producer.name} has successfully been enrolled to ${program.name}. Redirecting...`
      );

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      if (error?.response?.data?.errors) {
        return alert(error.response.data.errors[0].message);
      }
      alert(error);
    }
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    validationSchema,
    initialValues: {
      apv: "",
      program: "",
    },
    onSubmit,
  });

  return (
    <ContentWrapper>
      Select a program for {producer.email}
      <StyledForm onSubmit={handleSubmit}>
        <div>
          <div>APV</div>
          <Form.Control
            type="number"
            placeholder="Enter APV"
            name="apv"
            value={values.apv}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          {touched.apv && errors.apv && (
            <Alert variant="danger">{errors.apv}</Alert>
          )}
        </div>

        <ProgramSelection>
          <div>Select Program</div>
          <ProgramCardGrid>
            {programs.map((program) => {
              return (
                <ProgramCard
                  key={program.id}
                  program={program}
                  isSelected={values.program === program.id}
                  handleSelect={() => {
                    if (values.program === program.id) {
                      return setFieldValue("program", null);
                    }
                    setFieldValue("program", program.id);
                  }}
                />
              );
            })}
          </ProgramCardGrid>
          {touched.program && errors.program && (
            <Alert variant="danger">{errors.program}</Alert>
          )}
        </ProgramSelection>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </StyledForm>
    </ContentWrapper>
  );
};

export default Enrolment;
