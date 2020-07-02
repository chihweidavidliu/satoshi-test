import React from "react";
import { useRouter } from "next/dist/client/router";
import { useAuthContext } from "../../context/AuthContext";
import styled from "styled-components";

const Spacer = styled.div`
  height: ${(props) => props.theme.navHeight};
`;

const Wrapper = styled.div`
  z-index: 1;
  background: #78acc6;
  height: ${(props) => props.theme.navHeight};
  position: fixed;
  top: 0px;
  right: 0px;
  display: flex;
  width: 100vw;
  justify-content: space-between;
  align-items: baseline;
  padding: 10px;
  min-width: 300px;
`;

const Logo = styled.img.attrs({
  src: "logo.png",
})`
  height: 100%;
`;

const StoneXLogo = styled.img.attrs({
  src: "stonex-logo.png",
})`
  max-width: 150px;
  width: 100%;
  height: 60px;
`;

const CustomNav = () => {
  const router = useRouter();
  const { currentUser } = useAuthContext();

  return (
    <Spacer>
      <Wrapper>
        <Logo />
        <StoneXLogo
          onClick={() => {
            const endpoint = currentUser ? "/dashboard" : "/signin";
            router.push(endpoint);
          }}
        />
      </Wrapper>
    </Spacer>
  );
};

export default CustomNav;
