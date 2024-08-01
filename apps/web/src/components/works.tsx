import { Link } from "atomic-router-react";
import styled from "styled-components";
import { router } from "../App";
import { styles } from "../styles";
import { useUnit } from "effector-react";
import { $projects } from "../entity/project";

export function Works(props: { title: string; currentId?: string }) {
  const projects = useUnit($projects);
  return (
    <>
      <WorksSection>
        <h3>{props.title}</h3>
        <h4>
          Каждый новый проект для нас — это вызов сделать лучшую работу в соответствии с задачами и <span>потребностями клиента.</span>
        </h4>

        <WorksItems>
          {projects.map((item, key) => {
            if (item.id !== props.currentId)
              return (
                <WorkItem key={key}>
                  <swiper-container navigation-next-el={`.works-nav-next-${key}`} navigation-prev-el={`.works-nav-prev-${key}`}>
                    {item.photos.map((file, key) => {
                      return (
                        <swiper-slide key={key}>
                          <img src={file.location} />
                        </swiper-slide>
                      );
                    })}
                  </swiper-container>
                  <div className="work-slider-nav">
                    <div className={`works-nav-prev-${key}`}>←</div>
                    <div className={`works-nav-next-${key}`}>→</div>
                  </div>
                  <Link className="work-item-title" to={router.routes.worksPage.route} params={{ id: item.id }}>
                    {item.name}
                  </Link>
                </WorkItem>
              );
          })}
        </WorksItems>
      </WorksSection>
    </>
  );
}

const WorksSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: calc(100% - 120px);
  margin: 0 auto;

  @media (max-width: 1200px) {
    width: 100%;
  }

  h3 {
    ${styles.heading}
  }

  h4 {
    font-size: clamp(18px, 5vw, 30px);
    line-height: 1.5;
    max-width: 70vw;
    @media (max-width: 1200px) {
      padding: 0 10px;
      max-width: 100%;
    }
    @media (max-width: 600px) {
    }
    span {
      color: red;
    }
  }
`;

const WorksItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
`;

const WorkItem = styled.div`
  width: calc(50% - 20px);
  position: relative;
  height: 30vw;

  a {
    text-decoration: none;
  }

  @media (max-width: 1200px) {
    width: 100%;
    height: 500px;
  }

  &::after {
    content: ""; // ::before and ::after both require content
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background: linear-gradient(0deg, rgb(0, 0, 0) 0%, rgba(237, 237, 237, 0) 25%);
    opacity: 0.7;
    z-index: 10;
  }

  swiper-container {
    height: 100%;

    swiper-slide {
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
  }

  .work-item-title {
    position: absolute;
    z-index: 20;
    font-size: 2.1vw;
    font-weight: 600;
    color: #fff;
    bottom: 0;
    padding: 20px;

    @media (max-width: 1200px) {
      font-size: 30px;
    }
  }

  .work-slider-nav {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    display: flex;
    background: #fff;

    &-disabled {
      background-color: #ddd;
    }

    & > * {
      padding: 20px;
      aspect-ratio: 1/1;
      cursor: pointer;

      &:hover {
        background-color: #ddd;
      }
    }
  }
`;
