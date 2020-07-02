import { NextPage, NextPageContext } from "next";
import buildClient from "../api/buildClient";
import { FadeIn } from "../components/FadeIn";
import { useEffect } from "react";
import { useRouter } from "next/router";
import OriginatorDashboard from "../components/OriginatorDashboard/OriginatorDashboard";
import ProducerDashboard from "../components/ProducerDashboard/ProducerDashboard";
import { IUser } from "../types/IUser";
import { UserType } from "../types/UserType";
import Layout from "../components/Layout/Layout";

interface IDashboardPageProps {
  currentUser: IUser | null;
}

const DashboardPage: NextPage<IDashboardPageProps> = ({ currentUser }) => {
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    }
  }, []);

  const renderDashboard = () => {
    if (currentUser) {
      return currentUser.type === UserType.ORIGINATOR ? (
        <OriginatorDashboard currentUser={currentUser} />
      ) : (
        <ProducerDashboard currentUser={currentUser} />
      );
    }
  };
  return (
    <Layout>
      <FadeIn>{renderDashboard()}</FadeIn>
    </Layout>
  );
};

DashboardPage.getInitialProps = async (context: NextPageContext) => {
  // build preconfigured axios instance depending on whether we are running on the server or in the browser
  const axiosClient = buildClient(context);
  const { data } = await axiosClient.get("/api/users/currentUser");
  return data;
};

export default DashboardPage;
