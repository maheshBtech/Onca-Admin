import React, { Component } from "react";
import { Row, Col, Card, CardBody, Alert, Badge } from "reactstrap";

// Redux
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// action
import { userForgetPassword } from "../../store/actions";

// import images
import logoSm from "../../assets/images/Onca-Logo.png";

class AccountLockPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // handleValidSubmit
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }

  // handleValidSubmit
  handleValidSubmit(event, values) {
    this.props.userForgetPassword(values, this.props.history);
  }

  render() {
    return (
      <React.Fragment>
        <div className="account-pages mt-5">
          <div className="left-container">
            <img src={logoSm} height="75" alt="logo" />
            <h1>
              Onca <span>Active</span>
            </h1>
          </div>
          <div className="right-container">
            <Row className="justify-content-center">
              <Col sm={12} lg={9} xl={8} md={12}>
                <div className="position-relative">
                  <Card className="overflow-hidden">
                    <CardBody className="p-4">
                      <div className="p-3">
                        <h2>
                          Hello Username, enter your email to unlock the screen!
                        </h2>
                        {this.props.forgetError && this.props.forgetError ? (
                          <Alert color="danger" style={{ marginTop: "13px" }}>
                            {this.props.forgetError}
                          </Alert>
                        ) : null}
                        {this.props.forgetSuccess ? (
                          <Alert color="success" style={{ marginTop: "13px" }}>
                            {this.props.forgetSuccess}
                          </Alert>
                        ) : null}

                        <AvForm
                          className="form-horizontal mt-4"
                          onValidSubmit={this.handleValidSubmit}
                        >
                          <div className="form-group">
                            <AvField
                              name="email"
                              label="Email"
                              className="form-control"
                              placeholder="Enter email"
                              type="email"
                              required
                            />
                          </div>
                          <Row className="form-group">
                            <Col sm={12}>
                              <Link to="/reset-password" className="btn btn-orange btn-block w-md waves-effect waves-light">
                                Unlock
                              </Link>

                            </Col>
                          </Row>
                        </AvForm>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  console.log(state.forgetSuccessMsg);
  const { forgetError, forgetSuccessMsg } = state.ForgetPassword;
  return { forgetError, forgetSuccessMsg };
};

export default withRouter(
  connect(mapStatetoProps, { userForgetPassword })(AccountLockPage)
);
