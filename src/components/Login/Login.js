import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../Context/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT_MAIL") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "EMAIL_VALID") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_PASSWORD") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "PASSWORD_VALID") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const contextData = useContext(AuthContext);

  //object destructuring
  const { isValid: emailStateIsValid } = emailState;
  const { isValid: passwordStateIsValid } = passwordState;

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking Form Validity");
      setFormIsValid(emailStateIsValid && passwordStateIsValid);
    }, 500);

    return () => {
      console.log("clean code");
      clearTimeout(identifier);
    };
  }, [emailStateIsValid, passwordStateIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT_MAIL", val: event.target.value });
    // setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_PASSWORD", val: event.target.value });
    // setFormIsValid(emailState.isValid && passwordState.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "EMAIL_VALID" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "PASSWORD_VALID" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      contextData.onLogin(emailState.value, passwordState.value);
    } else if (!emailStateIsValid) {
      emailInputRef.current.focused();
    } else {
      passwordInputRef.current.focused();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          isValid={emailStateIsValid}
          htmlFor="email"
          label="E-Mail"
          type="email"
          id="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          isValid={passwordStateIsValid}
          htmlFor="password"
          label="Password"
          type="password"
          id="password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
