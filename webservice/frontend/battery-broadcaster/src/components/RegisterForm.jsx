import React from "react";
import { TextField, Button } from "@material-ui/core";
const RegisterForm = () => {
  return (
    <div>
      <center style={{ marginTop: "60px" }}>
        <TextField id="standard-basic" label="Username" />
        <br />
        <TextField id="standard-basic" label="Password" />
        <br />
        <Button
          style={{ color: "white", background: "blue", marginTop: "15px" }}
        >
          Register
        </Button>
      </center>
    </div>
  );
};

export default RegisterForm;
