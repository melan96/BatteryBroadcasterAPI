import React from "react";
import {
  ProgressBar,
  ListGroupItem,
  ListGroup,
  Card,
  Button,
  Spinner,
} from "react-bootstrap";
const BatteryHomeBase = () => {
  return (
    <div style={{ display: "table", marginRight: "auto", marginLeft: "auto" }}>
      <div style={{ height: "60px" }}></div>
      <Card style={{ width: "35rem" }}>
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
            <ListGroupItem>Battery Current Level : charging 🔌🟢</ListGroupItem>
            <ListGroupItem>
              <ProgressBar animated now={45} variant="danger" />
              <br />
              <center>
                <h6>Charging : 46%</h6>
              </center>
            </ListGroupItem>
          </ListGroupItem>

          <ListGroupItem>Remaining Charging time : ⏳ 2h 34min</ListGroupItem>
          <ListGroupItem>Remaining Energy : ⚡️ 3200mAh</ListGroupItem>
          <ListGroupItem>
            <h6>Additional Information </h6>
            <br></br>
            <table>
              <tbody>
                <tr>
                  <td>Technology: 📦</td>
                  <td> Li-ion</td>
                </tr>
                <tr>
                  <td>Voltage : ⚡️ </td>
                  <td> 240V</td>
                </tr>
                <tr>
                  <td>Temprature : 🌡 </td>
                  <td> 34C</td>
                </tr>
              </tbody>
            </table>
          </ListGroupItem>
        </ListGroup>
        <Card.Body>
          <Card.Link href="#">set reminder 🔔 </Card.Link>
          <Card.Link href="#">Force Reload</Card.Link>
        </Card.Body>
      </Card>
      <div style={{ height: "50px" }}></div>
    </div>
  );
};

export default BatteryHomeBase;
