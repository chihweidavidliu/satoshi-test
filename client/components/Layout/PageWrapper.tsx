import styled from "styled-components";

export const PageWrapper = styled.div<{ isBottomBarDisabled?: boolean }>`
  position: relative;
  height: ${(props) => {
    return `calc(100vh - ${props.theme.navHeight} - ${
      props.isBottomBarDisabled ? 0 : props.theme.bottomBarHeight
    })`;
  }};
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 0;
`;
