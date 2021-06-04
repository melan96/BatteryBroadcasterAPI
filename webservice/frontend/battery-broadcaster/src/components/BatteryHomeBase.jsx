import axios from "axios";
import React, { useContext, useState } from "react";
import {
  ProgressBar,
  ListGroupItem,
  ListGroup,
  Card,
  Button,
  Spinner,
  Jumbotron,
} from "react-bootstrap";
import { AuthContext } from "../Helper/Context";
import audio from "../public_assets/bellringing.mp3";

const BatteryHomeBase = () => {
  const { authID, setAuthID } = useContext(AuthContext);
  const [response, setResponse] = useState({});
  const { isPlay, setPlay } = useState(false);
  const { limits, setLimits } = useState();

  const loadData = async () => {};

  axios
    .get(
      "https://batterybroadcaster.herokuapp.com/batteryinfo/getlatest/" + authID
    )
    .then((res) => {
      setResponse(res.data["message"]);
    })
    .catch((err) => {
      console.log(err);
    });

  // const playAudio = () => {
  //   new Audio(audio).play();
  // };

  return authID != null ? (
    response != null ? (
      <center>
        <div
          style={{ display: "table", marginRight: "10px", marginLeft: "10px" }}
        >
          <div style={{ height: "60px" }}></div>

          <Card style={{ width: "auto" }}>
            <Button style={{ backgroundColor: "black" }} disabled>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
                style={{ color: "green" }}
              />
              &nbsp;&nbsp; listening to battery ...
            </Button>

            <center>
              <Card.Body>
                <Card.Title style={{ color: "black", fontSize: "30px" }}>
                  🔋⚡️ BatteryStatus API
                </Card.Title>

                <Card.Text>
                  ReactHooks based full pleaged RESTAPI for monitoring Device
                  battery stats
                </Card.Text>
              </Card.Body>
            </center>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                <ListGroupItem>
                  Battery Current Level : {response["batteryLevel"]} 🔌🟢
                </ListGroupItem>
                <ListGroupItem>
                  <ProgressBar
                    animated
                    now={response["batteryLevel"]}
                    variant={
                      String(response["chargingStatus"]).split(".")[1] ==
                      "Charging"
                        ? "success"
                        : "danger"
                    }
                  />
                  <br />
                  <center>
                    <h6>
                      {String(response["chargingStatus"]).split(".")[1]} :{" "}
                      {response["batteryLevel"]}%
                    </h6>
                  </center>
                </ListGroupItem>
              </ListGroupItem>

              <ListGroupItem>
                Remaining Charging time : ⏳ {response["chargingTimeRemaining"]}
              </ListGroupItem>
              <ListGroupItem>
                Remaining Energy : ⚡️{" "}
                {(response["reamainingEnergy"] / 1000000) * -1}mAh
              </ListGroupItem>
              <ListGroupItem>
                <h6>Additional Information </h6>
                <br></br>
                <table>
                  <tbody>
                    <tr>
                      <td>Technology: 📦</td>
                      <td>{response["technology"]}</td>
                    </tr>
                    <tr>
                      <td>Voltage : ⚡️ </td>
                      <td> 240V</td>
                    </tr>
                    <tr>
                      <td>Temprature : 🌡 </td>
                      <td>{response["batteryTemperature"]}</td>
                    </tr>
                    <tr>
                      <td>current electro flow : ⚡️ </td>
                      <td>{response["currentFlowNow"] * -1} e</td>
                    </tr>
                    <tr>
                      <td>Battery Health : 🩺 </td>
                      <td>{response["batteryHealth"]}</td>
                    </tr>
                    <tr>
                      <td>Volatage : ⚡️ </td>
                      <td>{response["volatage"] / 1000} V</td>
                    </tr>
                    <tr>
                      <td>API Response timestamp : ⏱ </td>
                      <td>{response["timestamp"]}</td>
                    </tr>
                  </tbody>
                </table>
              </ListGroupItem>
            </ListGroup>

            <div style={{ height: "50px" }}></div>
            <Button> Set Reminder </Button>
          </Card>
        </div>
      </center>
    ) : (
      <Jumbotron style={{ height: "500px" }}>
        <h1>Hello, Welome to BatteryAPI </h1>
        <p>
          For use the API GUI platform, enable the stream option using
          BatteryBroadcaster APP. Currently avaiable for Android Platform 
        </p>
        <p>
          <Button variant="primary">View SourceCode of API </Button>
        </p>
      </Jumbotron>
    )
  ) : (
    <div>
      <h1>Error Access</h1>
    </div>
  );
};

export default BatteryHomeBase;
