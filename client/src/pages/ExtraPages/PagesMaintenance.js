import React, { Component } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

//import images
import maintenanceImg from "../../assets/images/maintenance.png";
import logoDark from "../../assets/images/logo-dark.png";
// import images
import JJSLogo from "../../assets/images/JJS-Logo.png";

class PagesMaintenance extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <div className="home-btn d-none d-sm-block">
          <Link to="/" className="text-dark">
            <i className="fas fa-home h2"></i>
          </Link>
        </div>

        <section className="my-5">
          <div className="container-alt container">
            <Row>
              <div className="col-12 text-center">
                <div className="home-wrapper mt-5">
                  <div className="mb-4">
                    <img src={JJSLogo} alt="logo" />
                  </div>

                  <div className="maintenance-img">
                    <img
                      src={maintenanceImg}
                      alt=""
                      className="img-fluid mx-auto d-block"
                    />
                  </div>
                  <h3 className="mt-4">Site is Under Maintenance</h3>
                  <p>Please check back in sometime.</p>
                </div>
              </div>
            </Row>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default PagesMaintenance;
