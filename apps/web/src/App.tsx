import { createEvent, sample } from "effector";
import { Loader } from "./components/loader";
import { getProjectsFx } from "./entity/project";
import { Router, defineRouter } from "./libs/routing";
import { adminPage } from "./pages/admin/page";
import { homePage } from "./pages/home";
import { worksPage } from "./pages/work";
import { GlobalStyle } from "./styles";

const appStarted = createEvent()

export const router = defineRouter({
  homePage,
  worksPage,
  adminPage,
});


sample({
  clock: appStarted,
  target: getProjectsFx,
});

function App() {
  appStarted()
  return (
    <>
      <GlobalStyle />
      <Router router={router} />
      <Loader />
    </>
  );
}

export default App;
