import { createEvent, createStore } from "effector";
import { useUnit } from "effector-react";
import { InputHTMLAttributes } from "react";
import styled from "styled-components";

export function inputFactory<Init extends number | string>(initValue: Init, initDisabled?: boolean) {
  const reset = createEvent();
  const onChange = createEvent<Init>();
  const $value = createStore(initValue)
    .on(onChange, (_, p) => p)
    .reset(reset);

  const disable = createEvent<boolean>();
  const $disabled = createStore(initDisabled || false)
    .on(disable, (_, p) => p)
    .reset(reset);

  return {
    $value,
    onChange,
    reset,
    $disabled,
    disable,
  };
}

type Props = {
  inputModel: ReturnType<typeof inputFactory<any>>;
  label?: string;
  labelGap?: number;
  type?: "input" | "textarea";
  labelDirection?: "column" | "row";
};

export function Input(props: Props) {
  const value = useUnit(props.inputModel.$value);
  const disabled = useUnit(props.inputModel.$disabled);
  const type = props.type || "input";
  const labelDirection = props.labelDirection || "column";
  const labelGap = props.labelGap || 10;
  const inputAttributes: InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> = {
    value: value,
    onChange: (e) => props.inputModel.onChange(e.target.value),
    disabled,
  };

  return (
    <Wrapper labelDirection={labelDirection} labelGap={labelGap}>
      {props.label && <label>{props.label}</label>}
      {type === "input" && <input {...inputAttributes} />}
      {type === "textarea" && <textarea {...inputAttributes} />}
    </Wrapper>
  );
}

const Wrapper = styled.div<Pick<Props, "labelDirection" | "labelGap">>`
  display: flex;
  flex-direction: ${(props) => props.labelDirection};
  gap: ${(props) => props.labelGap + "px"};
`;
