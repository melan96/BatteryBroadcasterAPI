import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Container } from "@material-ui/core";
import Header from "./components/Header";
import ButtonAppBar from "./components/Header";
import { UserRegisterFields } from "./components/UserRegisterFields";
import { AuthContext } from "./Helper/Context";
import { getLocalStorage } from "./Helper/LocalPersistant";

const App = () => {
  const [authID, setAuthID] = useState(getLocalStorage("uid"));
  console.log("listning...." + authID);

  return (
    <AuthContext.Provider value={{ authID, setAuthID }}>
      <ButtonAppBar></ButtonAppBar>
    </AuthContext.Provider>
  );
};
export default App;
