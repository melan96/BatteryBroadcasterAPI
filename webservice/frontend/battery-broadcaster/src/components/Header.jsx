import React, { useContext, useState } from "react";
import { CardHeader } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { UserRegisterFields } from "./UserRegisterFields";
import { AuthContext } from "../Helper/Context";
import { setLocalStorage } from "../Helper/LocalPersistant";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const { authID, setAuthID } = useContext(AuthContext);
  const classes = useStyles();
  const userAuthenticatedState = false;
  var buttonstr;
  const [aState, setAState] = useState(userAuthenticatedState);

  const changeState = () => {
    setAState(!aState);
  };

  const renderAuthButton = () => {
    if (authID == null || authID == "null") {
      if (aState) {
        buttonstr = (
          <Button color="inherit" onClick={changeState}>
            Register
          </Button>
        );
      } else {
        buttonstr = (
          <Button color="inherit" onClick={changeState}>
            Login
          </Button>
        );
      }
    } else {
      buttonstr = (
        <Button
          color="inherit"
          onClick={() => {
            setAuthID(null);
            setLocalStorage("uid", null);
          }}
        >
          Logout
        </Button>
      );
    }

    return buttonstr;
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            BatteryBroadcaster
          </Typography>
          {renderAuthButton()}
        </Toolbar>
      </AppBar>
      <UserRegisterFields stateOFAuth={aState} authID={authID} />
    </div>
  );
}
