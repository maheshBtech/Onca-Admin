import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import RefMenu from './RefMenu';

class WeekSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <div className="col-12">
          <div className="card-deck-wrapper">
            <div className="card-deck">
              <Card className="mb-4 timeline-h">
                <CardBody>
                  <h4 className="card-title mt-5">Jan 04 - 10</h4>
                </CardBody>
              </Card>
              <Card className="mb-4 timeline-h">
                <CardBody>
                  <RefMenu />
                  <p className="addAOD">
                    <Link to="/#">Add AOD</Link>
                  </p>
                </CardBody>
              </Card>
              <Card className="mb-4 timeline-h">
                <CardBody>
                  <RefMenu />
                  <i className="act-icon">
                    <i className="run"></i>
                    <i className="text">Run</i>
                  </i>
                  <Row className="mb-0">
                    <Col lg={12}>
                      <p className="font-size-10 text-center mt-4">
                        <b>5:30AM to 6:30AM</b>
                      </p>
                      <ol>
                        <li>AOD Title 1</li>
                        <li>AOD Title 2</li>
                      </ol>
                    </Col>
                  </Row>
                  <p className="addAOD">
                    <Link to="/#">Add AOD</Link>
                  </p>
                </CardBody>
              </Card>
              <Card className="mb-4 timeline-h">
                <CardBody>
                  <RefMenu />
                </CardBody>
              </Card>
              <Card className="mb-4 timeline-h">
                <CardBody>
                  <RefMenu />
                </CardBody>
              </Card>
              <Card className="mb-4 timeline-h">
                <CardBody>
                  <RefMenu />
                </CardBody>
              </Card>
              <Card className="mb-4 timeline-h">
                <CardBody>
                  <RefMenu />
                </CardBody>
              </Card>
              <Card className="mb-4 timeline-h">
                <CardBody>
                  <RefMenu />
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default WeekSchedule;
