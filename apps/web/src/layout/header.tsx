import { Link } from "atomic-router-react";
import { useState } from "react";
import styled, { css } from "styled-components";
import { router } from "../App";
import Logo from "./logo.svg";

type MenuItem = {
  name: string;
  href?: string;
};

const navItems: MenuItem[] = [{ name: "Наши проекты", href: "/#my-works" }, { name: "Контакты" }];

export function Header(props: { overlayHeader?: boolean }) {
  const overlayHeader = props.overlayHeader || false;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <HeaderWrapper>
        <HeaderContent>
          <Link to={router.routes.homePage.route}>
            <HeaderLogo src={Logo} />
          </Link>

          <HeaderNav $isOpen={isOpen}>
            {navItems.map((item, key) => {
              return <a key={key}>{item.name}</a>;
            })}
          </HeaderNav>

          <div>7 (925) 063-36-41</div>

          <StyledBurger open={isOpen} onClick={() => setIsOpen(!isOpen)}>
            <div />
            <div />
            <div />
          </StyledBurger>
        </HeaderContent>
      </HeaderWrapper>
      {!overlayHeader && <HeaderPadding />}
    </>
  );
}
const styles = {
  headerHeight: "72px",
};
const HeaderPadding = styled.div`
  padding-top: ${styles.headerHeight};
`;
const HeaderNav = styled.nav<{ $isOpen: boolean }>`
  display: flex;
  gap: 20px;

  @media (max-width: 700px) {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background: linear-gradient(rgb(0, 0, 0), rgba(21, 20, 20, 0.897));
    clip-path: inset(0 0 100% 0);
    transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1) all;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 20px;

    ${(props) =>
      props.$isOpen &&
      css`
        clip-path: inset(0);
      `}

    a {
      flex-direction: column;
      transition: 0.3s ease-in all;
      opacity: 0;

      ${(props) =>
        props.$isOpen &&
        css`
          opacity: 1;
          // transform: translateY(10px);
        `}
    }
  }
`;

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 10px;
  height: ${styles.headerHeight};
  color: #fff;
  background-color: #000a;
  font-size: 20px;
  z-index: 1000;
  transition: all 0.3s ease-out;
  text-transform: uppercase;
  align-content: center;
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  font-size: clamp(16px, 2vw, 18px);
`;

const HeaderLogo = styled.img`
  width: clamp(120px, 15vw, 200px);
  object-fit: contain;
`;

const StyledBurger = styled.button<{ open: boolean }>`
  display: none;
  flex-direction: column;
  justify-content: space-around;
  aspect-ratio: 1/1;
  width: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  @media (max-width: 700px) {
    display: flex;
  }

  &:focus {
    outline: none;
  }

  div {
    width: inherit;
    height: 3px;
    background: #fff;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    &:first-child {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    &:nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) => (open ? "translateX(20px)" : "translateX(0)")};
    }

    &:nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;
