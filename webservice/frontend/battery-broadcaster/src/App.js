import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Container } from "@material-ui/core";
import Header from "./components/Header";
import ButtonAppBar from "./components/Header";
import { UserRegisterFields } from "./components/UserRegisterFields";
import { AuthContext } from "./Helper/Context";

const App = () => {
  const [auth, setAuth] = useState(false);
  const [authID, setAuthID] = useState(null);
  return (
    <AuthContext.Provider
      value={{ auth: { auth, setAuth }, authID: { authID, setAuthID } }}
    >
      <ButtonAppBar></ButtonAppBar>
    </AuthContext.Provider>
  );
};
export default App;
