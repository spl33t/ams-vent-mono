import styled from "styled-components";

export const PageTransition = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  animation: fadeOut 2s forwards;
  z-index: 1000;
  pointer-events: none;
  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;
