import { ReactNode } from "react";
import styled from "styled-components";

type ScreenProps = {
  direction?: "column" | "row";
  gap?: number;
  title: string;
  children: ReactNode;
};

export function ScreenLayout(props: ScreenProps) {
  const direction = props.direction || "row";
  const gap = props.gap || 0;
  return (
    <>
      <ScreenTitle>{props.title}</ScreenTitle>
      <hr />
      <Wrapper direction={direction} gap={gap}>{props.children}</Wrapper>
    </>
  );
}

const ScreenTitle = styled.h2`
  font-size: 42px;
  font-weight: 800;
`;
const Wrapper = styled.div<Pick<ScreenProps, "direction" | "gap">>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  gap: ${(props) => props.gap + "px"};
`;
