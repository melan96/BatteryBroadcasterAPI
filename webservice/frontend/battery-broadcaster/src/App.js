import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Container } from "@material-ui/core";
import Header from "./components/Header";
import ButtonAppBar from "./components/Header";
import { UserRegisterFields } from "./components/UserRegisterFields";
import { AuthContext } from "./Helper/Context";
import { getLocalStorage } from "./Helper/LocalPersistant";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

const App = () => {
  const [authID, setAuthID] = useState(getLocalStorage("uid"));
  console.log("listning...." + authID);

  return (
    <Router>
      <AuthContext.Provider value={{ authID, setAuthID }}>
        <ButtonAppBar></ButtonAppBar>

        <Switch>
          <Route exact path="/login">
            <LoginForm></LoginForm>
          </Route>

          <Route exact path="/register">
            <RegisterForm />
          </Route>
        </Switch>
      </AuthContext.Provider>
    </Router>
  );
};
export default App;
