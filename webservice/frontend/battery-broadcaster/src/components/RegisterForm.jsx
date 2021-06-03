import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Helper/Context";
import { TextField, Button } from "@material-ui/core";
import { getLocalStorage, setLocalStorage } from "../Helper/LocalPersistant";
import { ToastContainer, toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = () => {
  const { authID, setAuthID } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const notify = (str) => toast.warn(str);
  const notifySuccess = (str) => toast.success(str);
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
              .post("https://batterybroadcaster.herokuapp.com/register", {
                username: username,
                password: password,
              })
              .then((response) => {
                if (response.data.error) {
                  console.log(response.data.message);
                  notify(response.data.message);
                } else {
                  //setLocalStorage("uid", response.data.message["_id"]);
                  console.log(response.data.message["_id"]);

                  // setAuthID(response.data["_id"]);
                  notifySuccess(
                    "successfully registered @" +
                      response.data.message["username"]
                  );

                  <Redirect to="/login" />;

                  // console.log(
                  //   "Captured from localstorage" + getLocalStorage("uid")
                  // );
                }
              });

            console.log(authID);
            notify();
          }}
          style={{ color: "white", background: "blue", marginTop: "15px" }}
        >
          Register
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

export default RegisterForm;
