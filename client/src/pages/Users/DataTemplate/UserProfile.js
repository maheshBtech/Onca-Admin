import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import UserActivity from "./UserActivity";
import UserTransaction from "./UserTransaction";
import UserReferal from "./UserReferal";
import UserPersonalDetails from "./UserPersonalDetails";
import UserWorkout from "./UserWorkout";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Row,
  Col,
  CardBody,
  CardHeader,
  Label,
  Input,
} from "reactstrap";
import classnames from "classnames";
import Autocomplete from "../SubComponent/Autocomplete";
import { Modal } from "reactstrap";
import { connect } from "react-redux";
import AppService from "../../../AppService"
import {listRoleURL } from '../../../AppConfig'
// import images
import user1 from "../../../assets/images/users/user-1.jpg";
const appService = new AppService();
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal_center: false,
      modal_scroll: false,
      customActiveTab: "1",
      userProfileData: "",
    };
    this.add_member = this.add_member.bind(this);
    this.tog_scroll = this.tog_scroll.bind(this); 

    this.getData();
  }

  removeBodyCss() {
    document.body.classList.add("no_padding");
  }
  add_member() {
    this.setState((prevState) => ({
      modal_center: !prevState.modal_center,
    }));
    this.removeBodyCss();
  }
  tog_scroll() {
    this.setState((prevState) => ({
      modal_scroll: !prevState.modal_scroll,
    }));
    this.removeBodyCss();
  }
  show() {
    this.setState({ visible: true });
  }
  hide() {
    this.setState({ visible: false });
  }
  toggleCustom(tab) {
    if (this.state.customActiveTab !== tab) {
      this.setState({
        customActiveTab: tab,
      });
    }
  }

  getData() {
    this.state.userProfileData = this.props.userProfileData;
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userProfileData !== this.props.userProfileData) {
      this.setState({ userProfileData: this.props.userProfileData });
    }
  }
  render() {
    const { userProfileData } = this.state;
    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item active">Users</li>
                </ol>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={5} className="offset-sm-7">
              <Row>
                <Col lg={6} className="pr-0">
                  <div className="form-group">
                    <Autocomplete />
                  </div>
                </Col>
                <Col lg={6}>
                  <button className="btn update-btn">Search</button>
                  <Link to="/users" className="btn update-btn ml-2">
                    Back
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
          <Card className="mini-stat">
            <CardHeader className="bl-bg">
              <Row>
                <Col lg={3}>
                  <div className="media text-white">
                    <img
                      src={user1}
                      alt=""
                      className={
                        "img-fluid img-thumbnail rounded-circle avatar-md " +
                        (userProfileData.user_Active_Flag.data[0] === 1
                          ? " active"
                          : null)
                      }
                    />
                    <div className="media-body ml-3">
                      <p className="font-size-20 mb-0">
                        <b>Name</b>
                      </p>
                      <p>{userProfileData.User_Name}</p>
                    </div>
                  </div>
                </Col>
                <Col lg={3}>
                  <div className="media-body text-white">
                    <p className="font-size-20 mb-0">
                      <b>Email ID</b>
                    </p>
                    <p>{userProfileData.Email_ID}</p>
                  </div>
                </Col>
                <Col lg={3}>
                  <div className="media-body text-white">
                    <p className="font-size-20 mb-0">
                      <b>Mobile No.</b>
                    </p>
                    <p>{userProfileData.Telephone_No}</p>
                  </div>
                </Col>
                <Col lg={3}>
                  <div className="media-body text-white">
                    <p className="font-size-20 mb-0">
                      <b>Location</b>
                    </p>
                    <p>{userProfileData.Location_Name}</p>
                  </div>
                </Col>
              </Row>
            </CardHeader>
            <CardBody className="p-0">
              <Row>
                <Col xl={12}>
                  <Card className="activity-card">
                    <CardBody>
                      <Nav tabs className="nav-tabs-custom mt-3">
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: this.state.customActiveTab === "1",
                            })}
                            onClick={() => {
                              this.toggleCustom("1");
                            }}
                          >
                            <span className="d-none d-sm-block">
                              User Profile
                            </span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: this.state.customActiveTab === "2",
                            })}
                            onClick={() => {
                              this.toggleCustom("2");
                            }}
                          >
                            <span className="d-none d-sm-block">
                              Activities
                            </span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: this.state.customActiveTab === "3",
                            })}
                            onClick={() => {
                              this.toggleCustom("3");
                            }}
                          >
                            <span className="d-none d-sm-block">
                              Transactions
                            </span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: this.state.customActiveTab === "4",
                            })}
                            onClick={() => {
                              this.toggleCustom("4");
                            }}
                          >
                            <span className="d-none d-sm-block">Referral</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: this.state.customActiveTab === "5",
                            })}
                            onClick={() => {
                              this.toggleCustom("5");
                            }}
                          >
                            <span className="d-none d-sm-block">Workout</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent activeTab={this.state.customActiveTab}>
                        <TabPane tabId="1">
                          <UserPersonalDetails />
                        </TabPane>
                        <TabPane tabId="2">
                          <UserActivity />
                        </TabPane>
                        <TabPane tabId="3">
                          <UserTransaction />
                        </TabPane>
                        <TabPane tabId="4">
                          <Row>
                            <Col sm="12">
                              <UserReferal />
                            </Col>
                          </Row>
                        </TabPane>
                        <TabPane tabId="5">
                          <Row>
                            <Col sm="12">
                              <UserWorkout />
                            </Col>
                          </Row>
                        </TabPane>
                      </TabContent>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}
const mapStatetoProps = (state) => {
  return {
    userProfileData: state.userPageData.userProfileData,
    stateList: state.generalData.state,
    countryList :  state.generalData.countryList
  };
};
const dispatchToProps = (dispatch) => {
  return {
    updateTableData: (type, payload) => {
      dispatch({ type: type, payload: payload });
    },
  };
};
export default withRouter(
  connect(mapStatetoProps, dispatchToProps)(UserProfile)
);
