import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 92px;
  width: 100vw;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: whitesmoke;
`;

const BottomBar = () => {
  return <Wrapper>Bottom Bar</Wrapper>;
};

export default BottomBar;
