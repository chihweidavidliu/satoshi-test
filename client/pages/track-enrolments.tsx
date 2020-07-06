import React from "react";
import Layout from "../components/Layout/Layout";
import { useAuthRequirement } from "../hooks/useAuthRequirement";
import { NextPageContext } from "next";
import buildClient from "../api/buildClient";
import { IUser } from "../types/IUser";
import { UserType } from "../types/UserType";
import TrackEnrolment from "../components/OriginatorDashboard/TrackEnrolments";

interface ITrackEnrolmentsPageProps {
  currentUser: IUser;
}

const TrackEnrolmentsPage = ({ currentUser }: ITrackEnrolmentsPageProps) => {
  const isAuthValid = useAuthRequirement(currentUser, UserType.ORIGINATOR);
  return <Layout>{isAuthValid && <TrackEnrolment}</Layout>;
};

export default TrackEnrolmentsPage;

TrackEnrolmentsPage.getInitialProps = async (context: NextPageContext) => {
  // build preconfigured axios instance depending on whether we are running on the server or in the browser
  const axiosClient = buildClient(context);
  const { data } = await axiosClient.get("/api/users/currentUser");

  return data;
};
