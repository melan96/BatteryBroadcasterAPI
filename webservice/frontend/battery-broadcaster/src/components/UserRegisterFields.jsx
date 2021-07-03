import React from "react";

import { Redirect } from "react-router-dom";

export const UserRegisterFields = ({ stateOFAuth, authID }) => {
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
