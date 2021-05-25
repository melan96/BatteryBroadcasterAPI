import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Helper/Context";
import { TextField, Button } from "@material-ui/core";
import { getLocalStorage, setLocalStorage } from "../Helper/LocalPersistant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = () => {
  const { authID, setAuthID } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const notify = () => toast.info("So easyyyyyyy");
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
                setLocalStorage("uid", response.data["_id"]);
                setAuthID(response.data["_id"]);

                console.log(
                  "Captured from localstorage" + getLocalStorage("uid")
                );
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
