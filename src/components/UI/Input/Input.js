import React, { useRef, useImperativeHandle } from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  const inputFocus = useRef();

  const activate = () => {
    inputFocus.current.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      focused: activate,
    };
  });

  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.htmlFor}>{props.label}</label>

      <input
        ref={inputFocus}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});

export default Input;
