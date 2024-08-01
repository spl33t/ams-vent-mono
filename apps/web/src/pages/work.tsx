import { defineRoute } from "../libs/routing";
import styled from "styled-components";
import { Layout } from "../layout";
import { useState } from "react";
import { Works } from "../components/works";
import { useUnit } from "effector-react";
import { $projects } from "../entity/project";

export const worksPage = defineRoute({
  path: "/work/:id",
  title: "Проект",
  View: (props) => {
    const project = useUnit($projects).find((s) => s.id === props.params.id);
    const [activeSlide, setActiveSlide] = useState(1);

    function navCount(action: "prev" | "next") {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      if (action === "next" && activeSlide < work?.images?.length) {
        setActiveSlide(activeSlide + 1);
      }

      if (action === "prev" && activeSlide !== 1) {
        setActiveSlide(activeSlide - 1);
      }
    }

    return (
      <Layout overlayHeader>
        <SliderWrapper>
          <swiper-container navigation-next-el={`.work-nav-next`} navigation-prev-el={`.work-nav-prev`}>
            {project?.photos.map((file, key) => {
              return (
                <swiper-slide key={key}>
                  <SlideWrapper backgroundurl={file.location} />
                </swiper-slide>
              );
            })}
          </swiper-container>
          <div className="work-info">
            <h1>{project?.name}</h1>

            <div className="work-nav">
              <div> {`${activeSlide}/${project?.photos.length}`}</div>
              <div className={`work-nav-prev`} onClick={() => navCount("prev")}>
                ←
              </div>
              <div className={`work-nav-next`} onClick={() => navCount("next")}>
                →
              </div>
            </div>
          </div>
        </SliderWrapper>
        <Works title="Смотрите другие работы" currentId={props.params.id} />
      </Layout>
    );
  },
});

const SliderWrapper = styled.section`
  position: relative;
  width: 100%;
  height: clamp(55vh, 70vw, 100vh);
  display: flex;
  flex-direction: column;
  swiper-container,
  swiper-slide {
    height: 100%;
    width: 100%;
  }

  .work-info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px;
    align-items: center;
    font-size: clamp(20px, 5vw, 50px);
    font-weight: 800;
    color: #fff;
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 100;
    h1 {
    }
    .work-nav {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;

      &-next,
      &-prev {
        padding: 10px;
        aspect-ratio: 1/1;
        cursor: pointer;

        &:hover {
          color: red;
        }
      }
    }
  }
`;

const SlideWrapper = styled.div<{ backgroundurl: string }>`
  height: 100%;
  background: url(${(props) => props.backgroundurl});
  background-size: cover;
  background-position-y: top;
  background-repeat: no-repeat;

  position: relative;
  width: 100%;
  cursor: grab;

  &::after {
    content: ""; // ::before and ::after both require content
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-image: linear-gradient(180deg, rgb(255 255 255 / 0%), rgb(0 0 0 / 60%));
    opacity: 0.6;
    z-index: 10;
  }
`;
