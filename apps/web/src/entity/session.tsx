import { createEffect, createStore } from "effector";
import { useUnit } from "effector-react";
import { ReactNode } from "react";
import { apiRequest } from "../libs/fetcher";

type LoginPayload = { login: string; password: string };
type LoginResponse = { id: string; login: string };

const login = createEffect(async (data: LoginPayload) => {
  const res = await apiRequest<LoginResponse>({
    method: "post",
    url: "auth/login",
    data,
  });

  return res;
});

const $user = createStore<null | LoginResponse>(null).on(login.doneData, (_, p) => p);
const $isAuth = createStore(false).on($user, (_, p) => Boolean(p));

export function AuthorizedContent(props: { children: ReactNode }) {
  const isAuth = useUnit($isAuth);

  if (isAuth) return <>{props.children}</>;
}

export function UnauthorizedContent(props: { children: ReactNode }) {
  const isAuth = useUnit($isAuth);

  if (!isAuth) return <>{props.children}</>;
}

export const $$session = {
  $isAuth,
  $user,
  login,
};
