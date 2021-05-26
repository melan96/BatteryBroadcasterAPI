import React, { useState, useContext } from "react";
import { TextField, Button } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { getLocalStorage, setLocalStorage } from "../Helper/LocalPersistant";
import { AuthContext } from "../Helper/Context";
const LoginForm = () => {
  const { authID, setAuthID } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const useHC = useHistory();

  const notify = (str) => toast.warn(str);
  const notifySuccess = (str) => toast.success(str);
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
            axios
              .post("http://localhost:5000/login", {
                username: username,
                password: password,
              })
              .then((response) => {
                if (response.data.error) {
                  notify(response.data.message);
                } else {
                  setLocalStorage("uid", response.data.message[0]["_id"]);
                  console.log(response.data.message[0]["_id"]);

                  setAuthID(response.data["_id"]);
                  notifySuccess(
                    "successfully registered @" +
                      response.data.message[0]["username"]
                  );

                  console.log(
                    "Captured from localstorage" + getLocalStorage("uid")
                  );

                  window.location.reload();
                }
              });
          }}
        >
          Login
        </Button>
      </center>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default LoginForm;
