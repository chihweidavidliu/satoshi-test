import styled, { css } from "styled-components";

interface IPageWrapperProps {
  isBottomBarDisabled?: boolean;
  isCenteringDisabled?: boolean;
}
export const PageWrapper = styled.div<IPageWrapperProps>`
  height: ${(props) => {
    return `calc(100vh - ${props.theme.navHeight} - ${
      props.isBottomBarDisabled ? 0 : props.theme.bottomBarHeight
    })`;
  }};
  display: flex;
  flex-direction: column;
  width: 100vw;
  ${(props) =>
    !props.isCenteringDisabled &&
    css`
      justify-content: center;
      align-items: center;
    `}

  background-color: white;
  padding: 0;
`;
