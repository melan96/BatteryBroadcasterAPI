import React from "react";
import { TextField, Button } from "@material-ui/core";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Redirect } from "react-router-dom";

export const UserRegisterFields = ({ stateOFAuth, authID }) => {
  console.log("header access" + authID);
  return (
    <div>
      {authID != null ? (
        <Redirect to="/dashboard" />
      ) : stateOFAuth ? (
        <Redirect to="/login" />
      ) : (
        <Redirect to="/register" />
      )}
    </div>
  );
};
