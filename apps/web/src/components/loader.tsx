import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { displayScrollBar, hideScrollBar } from "../libs/scrollbar";

export function Loader() {
  const [isDisplay, setIsDisplay] = useState(true);
  const vent = useRef<SVGTSpanElement>(null);

  useEffect(() => {
    hideScrollBar();
    vent?.current?.addEventListener("animationend", () => {
      displayScrollBar();
      setIsDisplay(false);
    });
  }, []);

  return (
    <LoaderWrapper $isDisplay={isDisplay}>
      <LoaderOverlay />
      <svg viewBox="0 0 1320 300">
        <text x="50%" y="50%" textAnchor="middle">
          <tspan id="ams">AMS</tspan>
          <tspan id="vent" ref={vent}>
            vent
          </tspan>
        </text>
      </svg>
    </LoaderWrapper>
  );
}

const LoaderWrapper = styled.div<{ $isDisplay: boolean }>`
  position: fixed;
  z-index: 1000;
  top: 0;
  background-color: rgba(0, 0, 0, 0.851);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  opacity: ${(props) => (props.$isDisplay ? 1 : 0)};
  transition: 1s ease;
  pointer-events: ${(props) => (props.$isDisplay ? "visible" : "none")};

  svg {
    width: 100%;
    height: 100%;
    text {
      text-transform: uppercase;
      font-weight: 800;
      font-size: 140px;

      #ams {
        animation: strokeAms 3.5s forwards;
        animation-delay: 0.8s;
        stroke-width: 1;
        stroke: rgba(255, 255, 255, 0);
        fill: rgba(255, 255, 255, 0);
      }

      #vent {
        animation: strokeVent 4.5s forwards;
        animation-delay: 0.8s;
        stroke-width: 1;
        stroke: rgba(255, 255, 255, 0);
        fill: rgba(255, 255, 255, 0);
      }
    }
  }

  @keyframes strokeAms {
    0% {
      fill: rgba(255, 0, 0, 0);
      stroke: rgba(255, 255, 255, 1);
      stroke-dashoffset: 25%;
      stroke-dasharray: 0 50%;
      stroke-width: 2;
    }
    70% {
      fill: rgba(255, 0, 0, 0);
      stroke: rgba(255, 255, 255, 1);
    }
    80% {
      fill: rgba(255, 0, 0, 0);
      stroke: rgba(255, 255, 255, 1);
      stroke-width: 3;
    }
    100% {
      fill: rgba(255, 255, 255, 1);
      stroke: rgba(255, 0, 0, 0);
      stroke-dashoffset: -25%;
      stroke-dasharray: 50% 0;
      stroke-width: 0;
    }
  }

  @keyframes strokeVent {
    0% {
      fill: rgba(255, 255, 255, 0);
      stroke: rgba(255, 0, 0, 1);
      stroke-dashoffset: 25%;
      stroke-dasharray: 0 50%;
      stroke-width: 2;
    }
    70% {
      fill: rgba(255, 255, 255, 0);
      stroke: rgba(255, 0, 0, 1);
    }
    80% {
      fill: rgba(255, 255, 255, 0);
      stroke: rgba(255, 0, 0, 1);
      stroke-width: 3;
    }
    100% {
      fill: rgba(255, 0, 0, 1);
      stroke: rgba(54, 95, 160, 0);
      stroke-dashoffset: -25%;
      stroke-dasharray: 50% 0;
      stroke-width: 0;
    }
  }
`;

const LoaderOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  animation: fadeOut 1.3s forwards;
  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;
