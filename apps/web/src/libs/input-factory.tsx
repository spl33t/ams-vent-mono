import { createEvent, createStore } from "effector";
import { useUnit } from "effector-react";

export function inputFactory<Init extends number | string>(init: Init) {
  const reset = createEvent();
  const onChange = createEvent<Init>();
  const $value = createStore(init)
    .on(onChange, (_, p) => p)
    .reset(reset);

  return {
    $value,
    onChange,
    reset,
  };
}

export function Input(props: { inputModel: ReturnType<typeof inputFactory<any>>; label?: string }) {
  const value = useUnit(props.inputModel.$value);
  return (
    <>
      {props.label && <label>{props.label}</label>}
      <input value={value} onChange={(e) => props.inputModel.onChange(e.target.value)} />
    </>
  );
}
