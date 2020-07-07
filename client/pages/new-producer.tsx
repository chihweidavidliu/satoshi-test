import React from "react";
import Layout from "../components/Layout/Layout";
import Signup from "../components/Signup";
import { UserType } from "../types/UserType";
import { useAuthRequirement } from "../hooks/useAuthRequirement";
import { NextPageContext } from "next";
import buildClient from "../api/buildClient";
import { IUser } from "../types/IUser";

interface INewProducerPagePageProps {
  currentUser: IUser;
}

const NewProducerPage = ({ currentUser }: INewProducerPagePageProps) => {
  const isAuthValid = useAuthRequirement(currentUser, UserType.ORIGINATOR);
  return (
    <Layout>
      {isAuthValid && (
        <Signup userType={UserType.PRODUCER} isSigninLinkDisabled />
      )}
    </Layout>
  );
};

export default NewProducerPage;

NewProducerPage.getInitialProps = async (context: NextPageContext) => {
  // build preconfigured axios instance depending on whether we are running on the server or in the browser
  const axiosClient = buildClient(context);
  const { data } = await axiosClient.get("/api/users/currentUser");
  return data;
};
