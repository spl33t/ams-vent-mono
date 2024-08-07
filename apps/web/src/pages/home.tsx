import { Layout } from "../layout";
import { HeroSlider } from "../components/hero-slider";
import { defineRoute } from "../libs/routing";

import { Works } from "../components/works";

export const homePage = defineRoute({
  path: "/",
  title: "Главная",
  View: () => {
    return (
      <>
        <Layout overlayHeader>
          <HeroSlider />
          <Works title="Мои проекты" />
        </Layout>
      </>
    );
  },
});
