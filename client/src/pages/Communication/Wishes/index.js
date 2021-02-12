import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import WishCards from "./WishCards/wishCards";
import store from "../../../store/index";
class Wishes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    store.dispatch({ type: "CHANGE_CURRENT_PAGE_NAME", payload: "Wishes" });
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <ol className="breadcrumb mb-0 ">
                  <li className="breadcrumb-item">
                    <Link to="/#">Communication</Link>
                  </li>
                  <li className="breadcrumb-item active">Wishes</li>
                </ol>
              </div>
            </Col>
          </Row>

          {/* Cards */}
          <Row>
            <Col xl={12}>
              <WishCards />
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default Wishes;
