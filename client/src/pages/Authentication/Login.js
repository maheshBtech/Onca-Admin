import React, { Component } from "react";
import { Row, Col, Card, CardBody, Alert } from "reactstrap";

// Redux
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

import Loader from "../../components/Loader";
// actions
import { loginUser } from "../../store/actions";

// import images
import logoSm from "../../assets/images/Onca-Logo.png";

import store from '../../store';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // handleValidSubmit
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }

  // handleValidSubmit
  handleValidSubmit(event, values) {    
    this.props.loginUser(values, this.props.history);
    store.dispatch({type:"CHANGE_USER_EMAIL", payload:document.getElementById("email").value})
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
                  {this.props.loading ? <Loader /> : null}
                  <Card className="overflow-hidden">
                    <CardBody className="p-4">
                      <div className="p-3">
                        <h2>
                          Sign In
                        </h2>
                        <AvForm
                          className="form-horizontal mt-4"
                          onValidSubmit={this.handleValidSubmit}
                        >
                          {this.props.error ? (
                            <Alert color="danger">{this.props.error}</Alert>
                          ) : null}

                          <div className="form-group">
                            <AvField
                              id="email"
                              name="email"
                              label="Email"
                              className="form-control"
                              value=""
                              placeholder="Enter email"
                              type="email"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <AvField
                              name="password"
                              label="Password"
                              type="password"
                              required
                              value="test123"
                              placeholder="Enter Password"
                            />
                          </div>

                          <Row className="form-group">
                            <Col sm={12}>
                              <button
                                className="btn btn-orange btn-block w-md waves-effect waves-light"
                                type="submit"
                              >
                                Sign In
                              </button>
                            </Col>
                          </Row>
                          <Row className="form-group">
                            <div className="col-12 mt-4 text-center">
                              <Link to="/forget-password">
                                <i className="mdi mdi-lock"></i> Forgot your
                                password?
                              </Link>
                            </div>
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
        <div className="text-center mt-3">
          <p className="mb-0">
            © {new Date().getFullYear()} Onca Active{" "}
          </p>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  const { error, loading } = state.Login;
  return { error, loading };
};

export default withRouter(connect(mapStatetoProps, { loginUser })(Login));
