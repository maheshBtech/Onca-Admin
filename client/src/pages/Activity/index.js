import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
} from "reactstrap";
import { withRouter, Link } from 'react-router-dom';
import ActivityList from "./SubComponent/ActivityList";
import { Modal } from "reactstrap";
import Cards from "./Cards/Cards";
import ActivityService from './ActivityService';
import { connect } from 'react-redux';
import store from '../../store/index';
var activitiesList = [];
const customProps = { id: 'my-table-id' };
class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.state = {
      ActivityListData: [],
      UserRoleData: '',
    };
    this.props.updateActivityData('CHANGE_CURRENT_PAGE_NAME', "Activity")
    this.activityservice = new ActivityService();
    this.getActivityList = this.getActivityList.bind(this)
  }

  componentDidMount() {
    this.getActivityList();
  }
  //  shouldComponentUpdate(nextProps, nextState){
  //     return this.state.ActivityList!==nextState.ActivityList;
  //  }

  ///This function 
  getActivityList = () => {
    this.activityservice.GetActivityList()
      .then(resp => {
        this.setState({ ActivityListData: resp });
        this.setState({ UserRoleData: this.props.profileData });
      });
  }

  removeBodyCss() {
    document.body.classList.add("no_padding");
  }
  add_member() {
    this.setState(prevState => ({
      modal_center: !prevState.modal_center
    }));
    this.removeBodyCss();
  }
  tog_scroll() {
    this.setState(prevState => ({
      modal_scroll: !prevState.modal_scroll
    }));
    this.removeBodyCss();
  }
  show() {
    this.setState({ visible: true });
  }
  hide() {
    this.setState({ visible: false });
  }
  addNewActivity() {
    let getActivityToUpdate = [];
    store.dispatch({ type: 'UPDATE_ACTITIY_DATA', getActivityToUpdate });
  }
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item active">
                    Activity
                  </li>
                </ol>
              </div>
            </Col>
          </Row>

          {/* Cards */}
          <Row>
            <Col xl={12}>
              <Cards ActivityListData={this.state.ActivityListData} />
            </Col>
          </Row>

          {/* Cards */}
          <Row>
            <Col xl={12} className="text-right mb-4">
              <Link to="/new-activity">
                <button type="button"
                  className="btn update-btn font mr-2"
                  onClick={this.addNewActivity()} >
                  Add New Activity
                </button>
              </Link>
            </Col>
          </Row>

          {/* Table */}
          <Row>
            <Col xl={12}>
              <ActivityList UserRoleData={this.state.UserRoleData} ActivityListData={this.state.ActivityListData} ActivityService={this.activityservice} key={() => customProps} />
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    profileData: state.userProfileData,
  }
}
const mapDispatchToProp = dispatch => {
  return {
    updateActivityData: (type, payload) => {
      dispatch({ type: type, payload: payload })
    }
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProp)(Activity));