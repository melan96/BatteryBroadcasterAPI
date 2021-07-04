import React, { useState, useContext } from "react";
import { Button } from "@material-ui/core";
import { setLocalStorage } from "../Helper/LocalPersistant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { AuthContext, JWTAuthContext } from "../Helper/Context";
const LoginForm = () => {
  const { authID, setAuthID } = useContext(AuthContext);
  const { jwtID, setJWTID } = useContext(JWTAuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const notify = (str) => toast.warn(str);
  const notifySuccess = (str) => toast.success(str);
  return (
    <div>
      <div classname="maincontainer">
        <div className="container-fluid">
          <div className="row no-gutter">
            <div className="col-md-6 d-none d-md-flex bg-image" />
            <div className="col-md-6 bg-light">
              <div className="login d-flex align-items-center py-5">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-10 col-xl-7 mx-auto">
                      <h3 className="display-4">BatteryAPI | Login </h3>
                      <p className="text-muted mb-4">
                        create an account to continue service
                      </p>
                      <form>
                        <div className="form-group mb-3">
                          <input
                            id="inputEmail"
                            type="text"
                            placeholder="Username"
                            autofocus
                            className="form-control rounded-pill border-0 shadow-sm px-4"
                            onKeyUp={(e) => {
                              setUsername(e.target.value);
                            }}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <input
                            id="inputPassword"
                            type="password"
                            placeholder="Password"
                            required
                            className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                            onKeyUp={(e) => {
                              setPassword(e.target.value);
                            }}
                          />
                        </div>
                        <div className="custom-control custom-checkbox mb-3">
                          <input
                            id="customCheck1"
                            type="checkbox"
                            defaultChecked
                            className="custom-control-input"
                          />
                          <label
                            htmlFor="customCheck1"
                            className="custom-control-label"
                          >
                            Remember password
                          </label>
                        </div>

                        <Button
                          style={{
                            color: "white",
                            background: "#0186FA",
                            marginTop: "15px",
                            minWidth: "160px",
                          }}
                          onClick={() => {
                            axios
                              .post(
                                "https://batterybroadcaster.herokuapp.com/login",
                                {
                                  username: username,
                                  password: password,
                                }
                              )
                              .then((response) => {
                                if (response.data.error) {
                                  notify(response.data.message);
                                } else {
                                  setLocalStorage(
                                    "uid",
                                    response.data.message[0]["_id"]
                                  );

                                  setAuthID(response.data.message[0]["_id"]);
                                  console.log(authID);
                                  // notifySuccess(
                                  //   "successfully registered @" +
                                  //     response.data.message[0]["username"]
                                  // );

                                  axios
                                    .post(
                                      "https://piatto-auth.herokuapp.com/auth",
                                      {
                                        username: username,
                                      }
                                    )
                                    .then((response) => {
                                      setJWTID(response.data["accessToken"]);
                                      console.log(
                                        "captured jwtToken  -----> " + jwtID
                                      );
                                    })
                                    .catch((err) => {});
                                }
                              });
                          }}
                        >
                          Login
                        </Button>
                        <div className="text-center d-flex justify-content-between mt-4">
                          <p>
                            <a src=""> fork API on Github</a>
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
    </div>
  );
};

export default LoginForm;
