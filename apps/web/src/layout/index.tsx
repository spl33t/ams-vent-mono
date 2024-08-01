import { ReactNode } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import styled from "styled-components";
import { PageTransition } from "../components/page-transition";

const constants = {
  gapSize: "150px",
};

export function Layout(props: { children: ReactNode; overlayHeader?: boolean }) {
  return (
    <>
      <Header overlayHeader={props.overlayHeader} />
      <Main>{props.children}</Main>
      <Footer />
      <PageTransition />
    </>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: ${constants.gapSize};

    & > :last-child {
    padding-bottom: ${constants.gapSize};
  }
`;
