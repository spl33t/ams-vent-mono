import styled from "styled-components";

export function ContactForm() {
  return (
    <>
      <FormSection>
        <h4>Хотите работать с нами?</h4>

        <Form>
          <InputFiled placeholder="Имя" />
          <InputFiled placeholder="Телефон" />
          <InputFiled placeholder="Ваш email" />
          <InputFiled placeholder="Пару слов о проекте" />
          <SubmitButton>Отправить</SubmitButton>
        </Form>
      </FormSection>
    </>
  );
}

export function InputFiled(props: { label?: string; placeholder?: string }) {
  return (
    <InputWrapper>
      {props.label && <label>{props.label}</label>}
      <Input placeholder={props.placeholder} />
    </InputWrapper>
  );
}

const SubmitButton = styled.button`
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: #fff;
  color: red;
  font-size: 24px;
  font-weight: 500;
  padding: 10px 20px;
  border: 2px solid red;
  align-items: center;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Input = styled.input`
  border: 0;
  border-bottom: 1px solid #ddd;
  font-size: 20px;
  padding: 5px;
  width: 100%;
`;

const FormSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 80px;
  max-width: 1200px;
  padding: 10px;
  margin: 0 auto;
  padding-bottom: 100px;
  text-align: center;

  h4 {
    font-size: clamp(20px, 5vw, 48px);
    font-weight: 800;
  }
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 60px;

  & > * {
    width: calc(50% - 30px);
    &:nth-child(2n + 1):nth-last-child(1) {
      width: 100%;
    }
    @media (max-width: 600px) {
      width: 100%;
    }
  }
`;
