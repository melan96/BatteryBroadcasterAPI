import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Helper/Context";
import { TextField, Button } from "@material-ui/core";
import { getLocalStorage, setLocalStorage } from "../Helper/LocalPersistant";

const RegisterForm = () => {
  const { authID, setAuthID } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <center style={{ marginTop: "60px" }}>
        <TextField
          id="standard-basic"
          label="Username"
          onKeyUp={(e) => {
            setUsername(e.target.value);
            console.log(username);
          }}
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
          onClick={() => {
            axios
              .post("http://localhost:5000/register", {
                username: username,
                password: password,
              })
              .then((response) => {
                setAuthID(response.data["_id"]);

                setLocalStorage("uid", authID);

                console.log(
                  "Captured from localstorage" + getLocalStorage("uid")
                );
              });

            console.log(authID);
          }}
          style={{ color: "white", background: "blue", marginTop: "15px" }}
        >
          Register
        </Button>
      </center>
    </div>
  );
};

export default RegisterForm;
