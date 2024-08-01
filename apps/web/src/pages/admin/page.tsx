import { createEvent, createStore } from "effector";
import { Layout } from "../../layout";
import { defineRoute } from "../../libs/routing";
import styled from "styled-components";
import { AuthorizedContent, UnauthorizedContent } from "../../entity/session";
import { AuthForm } from "./auth";
import { useUnit } from "effector-react";
import { Projects } from "./projects";
import { Constants } from "./constants";

const screens = {
  projects: { title: "Проекты", view: <Projects /> },
  constants: { title: "Константы", view: <Constants /> },
};

const changeScreen = createEvent<keyof typeof screens>();
const $currentScreen = createStore<keyof typeof screens>("projects").on(changeScreen, (_, p) => p);

export const adminPage = defineRoute({
  path: "/admin",
  title: "Админка",
  View: () => {
    const currentScreen = useUnit($currentScreen);

    return (
      <>
        <Layout overlayHeader={false}>
          <Wrapper>
            <UnauthorizedContent>
              <AuthForm />
            </UnauthorizedContent>
            <AuthorizedContent>
              <Sidebar>
                {Object.entries(screens).map(([key, value]) => {
                  return <div onClick={() => changeScreen(key as keyof typeof screens)}>{value.title}</div>;
                })}
              </Sidebar>
              <Screen>{screens[currentScreen].view}</Screen>
            </AuthorizedContent>
          </Wrapper>
        </Layout>
      </>
    );
  },
});

const Wrapper = styled.div`
  display: flex;
  gap: 20;
`;
const Sidebar = styled.div`
  width: 15%;
  border-right: 1px solid #ddd;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  > * {
    cursor: pointer;
  }
`;
const Screen = styled.div`
  width: 85%;
  border-right: 1px solid #ddd;
  padding: 20px;
`;
