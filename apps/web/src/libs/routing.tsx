import { createBrowserHistory } from "history";
import { createHistoryRouter, createRoute } from "atomic-router";
import { RouterProvider, Route } from "atomic-router-react";
import { useEffect } from "react";

import { useUnit } from "effector-react";
import { scrollToTop } from "./scrollbar";

type PageProps<Path extends string> = {
  path: string;
  title: string;
  params: ParamsFromUrl<Path>;
};

export function defineRoute<Path extends string>(page: { View: (props: PageProps<Path>) => JSX.Element; path: Path; title: string }) {
  return {
    ...page,
    route: createRoute<ParamsFromUrl<Path>>(),
  };
}

export type RouterWithTypes<R extends ReturnType<typeof defineRouter>> = R;

interface Routes {
  [key: string]: ReturnType<typeof defineRoute<any>>;
}

export function defineRouter<R extends Routes>(routes: R) {
  const router = createHistoryRouter({
    routes: Object.values(routes),
  });

  const history = createBrowserHistory();

  router.setHistory(history);

  return { ...router, routes: routes };
}

export function Router(props: { router: ReturnType<typeof defineRouter> }) {
  const currentPath = useUnit(props.router.$path);
  const currentRoute = Object.values(props.router.routes).find((s) => s.path === currentPath);

  useEffect(() => {
    document.title = currentRoute?.title || "No title";
  }, [currentRoute]);

  return (
    <>
      <RouterProvider
        router={{
          ...props.router,
          routes: Object.values(props.router.routes) as [],
        }}
      >
        {Object.values(props.router.routes).map((route, index) => {
          const View = () => {
            const params = useUnit(route.route.$params);
            route.route.$isOpened.watch((s) => {
              if (s) scrollToTop();
            });

            return (
              <>
                <route.View path={route.path} title={route.title} params={params} />
              </>
            );
          };

          return <Route key={index} route={route.route} view={View} />;
        })}
      </RouterProvider>
    </>
  );
}

type RecursivelyExtractPathParams<T extends PropertyKey, TAcc extends null | Record<string, string>> = T extends `/:${infer PathParam}/${infer Right}`
  ? { [key in PathParam]: string } & RecursivelyExtractPathParams<Right, TAcc>
  : T extends `/:${infer PathParam}`
  ? { [key in PathParam]: string }
  : T extends `/${string}/${infer Right}`
  ? RecursivelyExtractPathParams<Right, TAcc>
  : T extends `/${string}`
  ? TAcc
  : T extends `:${infer PathParam}/${infer Right}`
  ? { [key in PathParam]: string } & RecursivelyExtractPathParams<Right, TAcc>
  : T extends `:${infer PathParam}`
  ? TAcc & { [key in PathParam]: string }
  : T extends `${string}/${infer Right}`
  ? RecursivelyExtractPathParams<Right, TAcc>
  : TAcc;

export type ParamsFromUrl<T extends PropertyKey> = [keyof RecursivelyExtractPathParams<T, {}>] extends [never]
  ? any
  : RecursivelyExtractPathParams<T, {}>;
