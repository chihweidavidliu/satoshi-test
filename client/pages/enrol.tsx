import React from "react";
import Layout from "../components/Layout/Layout";
import { UserType } from "../types/UserType";
import { useAuthRequirement } from "../hooks/useAuthRequirement";
import { NextPageContext } from "next";
import buildClient from "../api/buildClient";
import { IUser } from "../types/IUser";

interface IEnrolPageProps {
  currentUser: IUser;
}

const EnrolPage = ({ currentUser }: IEnrolPageProps) => {
  const isAuthValid = useAuthRequirement(currentUser, UserType.ORIGINATOR);
  return <Layout>{isAuthValid && <p>Enrolment page</p>}</Layout>;
};

export default EnrolPage;

EnrolPage.getInitialProps = async (context: NextPageContext) => {
  // build preconfigured axios instance depending on whether we are running on the server or in the browser
  const axiosClient = buildClient(context);
  const { data } = await axiosClient.get("/api/users/currentUser");
  return data;
};
