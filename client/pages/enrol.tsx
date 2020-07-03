import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { UserType } from "../types/UserType";
import { useAuthRequirement } from "../hooks/useAuthRequirement";
import { NextPageContext } from "next";
import buildClient from "../api/buildClient";
import { IUser } from "../types/IUser";
import { useRouter } from "next/router";
import Enrolment from "../components/OriginatorDashboard/Enrolment";
import { getProducer } from "../components/OriginatorDashboard/api/getProducer";

interface IEnrolPageProps {
  currentUser: IUser;
  producer: IUser;
}

const EnrolPage = ({ currentUser }: IEnrolPageProps) => {
  const isAuthValid = useAuthRequirement(currentUser, UserType.ORIGINATOR);
  const [producer, setProducer] = useState<IUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const id = router.query.producerId;

    getProducer(id as string)
      .then(({ data }) => {
        setProducer(data);
      })
      .catch(() => {
        router.push("/dashboard");
      });
  }, []);

  return (
    <Layout>
      {isAuthValid && producer && (
        <Enrolment producer={producer} currentUser={currentUser} />
      )}
    </Layout>
  );
};

export default EnrolPage;

EnrolPage.getInitialProps = async (context: NextPageContext) => {
  // build preconfigured axios instance depending on whether we are running on the server or in the browser
  const axiosClient = buildClient(context);
  const { data } = await axiosClient.get("/api/users/currentUser");

  return data;
};
