import React, { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import Signup from "../components/Signup";
import { UserType } from "../types/UserType";
import { useAuthContext } from "../context/AuthContext";
import { useAuthRequirement } from "../hooks/useAuthRequirement";

const NewProducerPage = () => {
  const { currentUser } = useAuthContext();
  useAuthRequirement(currentUser, UserType.ORIGINATOR);
  return (
    <Layout>
      <Signup userType={UserType.PRODUCER} isSigninLinkDisabled />
    </Layout>
  );
};

export default NewProducerPage;
