import React, { Component } from "react";
import { Row, Col } from "reactstrap";

// import component
import NewLeads from "../Charts/NewLeads";
import NewRegistration from "../Charts/NewRegistration";
import Activity from "../Charts/Activity";
import Revenue from "../Charts/Revenue";
import AlertData from "./SubComponent/AlertData";
import LogData from "./SubComponent/LogData";
import Cards from "./Cards/Cards";
import { connect } from "react-redux";
import {activitydata,ListLeadershipDropdownURL} from "../../AppConfig";
import store from "../../store";
import AppService from "../../AppService";

const appService = new AppService()
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      urlactivityTableData: activitydata
    }
    this.appService = new AppService();
    this.props.updateTableData('CHANGE_CURRENT_PAGE_NAME', "Dashboard")
    // this.getActivityListData();
   // this.loadDropdownList();
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
                    Dashboard
                  </li>
                </ol>
              </div>
            </Col>
          </Row>

          {/* Cards */}
          <Row>
            <Col xl={12}>
              <Cards />
            </Col>
          </Row>
          
          {/* Chart */}
          <Row>
            <Col xl={6}>
              {/* <NewLeads /> */}
            </Col>
            <Col xl={6}>
              {/* <NewRegistration /> */}
            </Col>
          </Row>

          <Row>
            <Col xl={6}>
              {/* <Activity /> */}
            </Col>
            <Col xl={6}>
              {/* <Revenue /> */}
            </Col>
          </Row>

          {/* Alert Data Table */}
          <Row>
            <Col xl={12}>
              <AlertData />
            </Col>
          </Row>

          {/* Log Data Table */}
          <Row>
            <Col xl={12}>
              <LogData />
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}
const mapStatetoProps = state => { 
  return { 
  //ProviderID: state.userProfileData != undefined ? state.userProfileData.ProfileData[1][0].Service_Provider_ID :null

 };
  };
const dispatchToProps = dispatch => {
  return{
    updateTableData:(type, payload)=> {      
        dispatch({type:type, payload:payload})
    } 
  }
  }
export default connect(mapStatetoProps, dispatchToProps)(Dashboard);
