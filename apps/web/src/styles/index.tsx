import { createGlobalStyle, css } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}

#root {
	display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: space-between;
}

  body {
    font-family: 'Roboto';
	background-color: #fff;
  }
  * {
  box-sizing: border-box;
  }
 
`;

export const styles = {
  heading: css`
    font-size: 48px;
    font-weight: 800;
    &::first-letter {
      color: red;
    }
    @media (max-width: 1200px) {
      padding: 0 10px;
    }
    @media (max-width: 600px) {
      font-size: 38px;
    }
  `,
};
