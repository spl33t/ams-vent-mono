import styled from "styled-components";
import FirstSlide from "../data/hero-slider/IMG_1808-2.png"
import SecondSlide from "../data/hero-slider/IMG_2218-1.png"
import ThirdSlide from "../data/hero-slider/IMG_1870-1.png"

type SliderItem = {
  title: string;
  subtitle: string;
  background: string;
};

const sliderItems: SliderItem[] = [
  {
    title: "Монтаж системы кондиционирования",
    subtitle: "Сплит, мультисплит,VRV/VRF, фанкойл",
    background: FirstSlide
  },
  {
    title: "Монтаж приточно-вытяжной системы",
    subtitle: "Делаем заебись, делаем надежно!",
    background: SecondSlide
  },
  {
    title: "Проектирование",
    subtitle: "Все что душе угодно, идеи похлеще чем в сколково.",
    background: ThirdSlide
  },
];

export function HeroSlider() {
  return (
    <HeroSliderWrapper>
      <swiper-container loop pagination pagination-clickable="true">
        {sliderItems.map((slide, key) => {
          return (
            <swiper-slide key={key}>
              <SlideWrapper backgroundurl={slide.background}>
                <SlideContent>
                  <h1>{slide.title}</h1>
                  <h2>{slide.subtitle}</h2>
                </SlideContent>
              </SlideWrapper>
            </swiper-slide>
          );
        })}
      </swiper-container>
    </HeroSliderWrapper>
  );
}

const HeroSliderWrapper = styled.section`
  position: relative;
  color: #fff;
  width: 100%;
  height: clamp(55vh, 70vw, 100vh);

  swiper-container,
  swiper-slide {
    height: 100%;
  }

  swiper-container::part(pagination) {
    max-width: 1200px;
    position: absolute;
    bottom: clamp(20px, 10vw, 20vh);
    left: 0;
    right: 0;
    margin: 0 auto;
    text-align: left;
    padding: 10px;
    gap: 5px;
    display: flex;
    box-sizing: border-box;
    @media (max-width: 600px) {
      bottom: 20px;
    }
  }

  swiper-container::part(bullet-active) {
    background-color: red;
  }
  swiper-container::part(bullet) {
    background-color: #fff;
    opacity: 0.3;
  }

  swiper-container::part(bullet),
  swiper-container::part(bullet-active) {
    width: clamp(100px, 10vw, 150px);
    height: 10px;
    border-radius: 0;
    display: flex;
    @media (max-width: 600px) {
      width: 100%;
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
    background-image: linear-gradient(120deg, rgb(0 0 0 / 98%), rgb(0 0 0 / 67%));
    opacity: 0.6;
    z-index: 10;
  }
`;

const SlideContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 10px;
  z-index: 20;
  position: relative;
  gap: 10px;
  h1,
  h2 {
    line-height: 1.2;
    max-width: 700px;
  }
  h1 {
    font-size: clamp(30px, 5vw, 60px);
    font-weight: 800;
  }
  h2 {
    font-size: clamp(20px, 3vw, 30px);
    font-weight: 400;
    margin-bottom: 70px;
  }
`;
