import styled from "styled-components";
import { $$session } from "../../entity/session";
import { Input, inputFactory } from "../../libs/input-factory";

const $$loginInput = inputFactory("ROOT1337");
const $$passwordInput = inputFactory("ROOT1337");

export function AuthForm() {
  return (
    <AuthFormWrapper>
      Вход в админку
      <Input inputModel={$$loginInput} label="Логин" />
      <Input inputModel={$$passwordInput} label="Пароль" />
      <button
        onClick={() =>
          $$session.login({
            login: $$loginInput.$value.getState(),
            password: $$passwordInput.$value.getState(),
          })
        }
      >
        Войти
      </button>
    </AuthFormWrapper>
  );
}

const AuthFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 160px;
  max-width: 1200px;
  margin: 10px auto;
  border: 2px solid #000;
`;
