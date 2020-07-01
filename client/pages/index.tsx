import styled from "styled-components";
import { NextPage, NextPageContext } from "next";
import buildClient from "../api/buildClient";
import { useEffect } from "react";
import { useRouter } from "next/router";

export const SplashScreen = styled.div`
  position: relative;
  height: calc(100vh - 55px);
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  background-color: #101a3f;
  padding: 0;
`;

const Logo = styled.img`
  width: 90%;

  @media (min-width: ${(props) => props.theme.largeMobileBreakpoint}) {
    width: 376px;
  }
`;

const H1 = styled.h1`
  margin: 0;
  margin-top: 20px;
  color: white;
  font-size: 48px;
  font-family: "Montserrat", sans-serif;
  @media (min-width: ${(props) => props.theme.tabletBreakpoint}) {
    font-size: 48px;
  }
`;

interface IIndexPageProps {
  currentUser: { id: string; email: string } | null;
}

const IndexPage: NextPage<IIndexPageProps> = ({ currentUser }) => {
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/dashboard");
    } else {
      setTimeout(() => {
        router.push("/signin");
      }, 1000);
    }
  }, []);

  return (
    <SplashScreen>
      <Logo src="/LoadLogo.png" />

      <div>
        <H1>Modern Marketing</H1>
      </div>
    </SplashScreen>
  );
};

IndexPage.getInitialProps = async (context: NextPageContext) => {
  // build preconfigured axios instance depending on whether we are running on the server or in the browser
  const axiosClient = buildClient(context);
  const { data } = await axiosClient.get("/api/users/currentUser");
  return data;
};

export default IndexPage;
