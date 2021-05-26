import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import axios from "axios";
const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <center style={{ marginTop: "60px" }}>
        <TextField
          id="standard-basic"
          onKeyUp={(e) => {
            setUsername(e.target.value);
            console.log(username);
          }}
          label="Login name"
        />
        <br />
        <TextField
          id="standard-basic"
          label="Password"
          onKeyUp={(e) => {
            setPassword(e.target.value);
            console.log(password);
          }}
        />
        <br />
        <Button
          style={{ color: "white", background: "blue", marginTop: "15px" }}
          onClick={() => {
            axios.post("http://localhost:5000/login", {
              username: username,
              password: password,
            });
          }}
        >
          Login
        </Button>
      </center>
    </div>
  );
};

export default LoginForm;
