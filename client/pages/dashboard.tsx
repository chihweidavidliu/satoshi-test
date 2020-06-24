import styled from "styled-components";
import { NextPage, NextPageContext } from "next";
import { PageWrapper } from "../components/PageWrapper";
import buildClient from "../api/buildClient";
import { FadeIn } from "../components/FadeIn";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Dashboard from "../components/Dashboard";
import { IUser } from "../types/IUser";

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

  return (
    <PageWrapper>
      <FadeIn>{currentUser && <Dashboard currentUser={currentUser} />}</FadeIn>
    </PageWrapper>
  );
};

DashboardPage.getInitialProps = async (context: NextPageContext) => {
  // build preconfigured axios instance depending on whether we are running on the server or in the browser
  const axiosClient = buildClient(context);
  const { data } = await axiosClient.get("/api/users/currentUser");
  return data;
};

export default DashboardPage;
