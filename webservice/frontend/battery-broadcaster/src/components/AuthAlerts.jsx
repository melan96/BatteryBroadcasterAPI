import React from "react";
import { AlertTitle, Alert } from "@material-ui/lab";
export const AuthAlerts = () => {
  return (
    <div style={{ top: "0px" }}>
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        This is a success alert — <strong>check it out!</strong>
      </Alert>
    </div>
  );
};
