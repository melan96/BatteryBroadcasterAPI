import React from "react";
import { TextField, Button } from "@material-ui/core";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export const UserRegisterFields = ({ stateOFAuth }) => {
  return (
    <div>
      {stateOFAuth ? <LoginForm></LoginForm> : <RegisterForm></RegisterForm>}
    </div>
  );
};
