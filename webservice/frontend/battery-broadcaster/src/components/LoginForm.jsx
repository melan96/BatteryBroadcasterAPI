import React from "react";
import { TextField, Button } from "@material-ui/core";
const LoginForm = () => {
  return (
    <div>
      <center style={{ marginTop: "60px" }}>
        <TextField id="standard-basic" label="Login name" />
        <br />
        <TextField id="standard-basic" label="Password" />
        <br />
        <Button
          style={{ color: "white", background: "blue", marginTop: "15px" }}
        >
          Login
        </Button>
      </center>
    </div>
  );
};

export default LoginForm;
