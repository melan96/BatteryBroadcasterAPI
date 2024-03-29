import React, { useState, useMemo } from "react";
import ReactDOM from "react-dom";
import { Container } from "@material-ui/core";
import Header from "./components/Header";
import ButtonAppBar from "./components/Header";
import { UserRegisterFields } from "./components/UserRegisterFields";
import { AuthContext, JWTAuthContext } from "./Helper/Context";
import { getLocalStorage } from "./Helper/LocalPersistant";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import BatteryHomeBase from "./components/BatteryHomeBase";
import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [authID, setAuthID] = useState(null);
  const [jwtID, setJWTID] = useState(null);

  return (
    <JWTAuthContext.Provider value={{ jwtID, setJWTID }}>
      <Router>
        <AuthContext.Provider value={{ authID, setAuthID }}>
          <ButtonAppBar></ButtonAppBar>

          <Switch>
            <Route exact path="/login">
              <LoginForm></LoginForm>
            </Route>

            <Route exact path="/register">
              <RegisterForm></RegisterForm>
            </Route>

            <Route exact path="/dashboard">
              <BatteryHomeBase></BatteryHomeBase>
            </Route>
          </Switch>
        </AuthContext.Provider>
      </Router>
    </JWTAuthContext.Provider>
  );
};
export default App;
