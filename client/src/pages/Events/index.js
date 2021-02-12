import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import EventInformation from "./SubComponents/eventInformation";
import EventConnectivity from "./SubComponents/EventConnectivity";
import EventPricing from "./SubComponents/EventPricing";
import EventVisibility from "./SubComponents/EventVisibility";
import store from "../../store/index";
class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    store.dispatch({ type: "CHANGE_CURRENT_PAGE_NAME", payload: "Events" });
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/#">Events</Link>
                  </li>
                </ol>
              </div>
            </Col>
          </Row>
          <EventInformation />
          <EventConnectivity />
          <EventPricing />
          <EventVisibility />
        </div>
      </React.Fragment>
    );
  }
}

export default Events;
