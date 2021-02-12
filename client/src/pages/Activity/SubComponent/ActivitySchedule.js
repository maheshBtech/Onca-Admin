import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
} from "reactstrap";
import WeekSchedule from "./WeekSchedule";
import WYHeader from "./WYHeader";

class activityList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col lg={12} className="mb-4">
            <i className="act-menu-icon mr-4">
              <i className="run"></i>
              <i className="text">Run</i>
            </i>
            <i className="act-menu-icon mr-4">
              <i className="gym"></i>
              <i className="text">GYM</i>
            </i>
          </Col>
          <Col lg={12}>
            <div className="card-deck-wrapper">
              <div className="card-deck pl-3">
                <div className="col-10 pr-0">
                  <div className="card-deck-wrapper">
                    <div className="card-deck">
                      <WYHeader />
                      <WeekSchedule />
                    </div>
                  </div>
                </div>
                <div className="col-2">
                  <div className="card-deck-wrapper">
                    <div className="card-deck">
                      <Card className="mb-4">
                        <CardBody>
                          <h4 className="card-title mt-0">2021</h4>
                          <p className="card-text">
                            January
                          </p>
                          <p className="card-text">
                            February
                          </p>
                          <p className="card-text">
                            March
                          </p>
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default withRouter(activityList);