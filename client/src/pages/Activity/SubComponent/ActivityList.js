import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Button } from "reactstrap";
import DataTable from 'react-data-table-component';
import ActivityService from '../ActivityService';
import CsvDataDownload from './CSVDataDownload';
import SearchData from './SearchData';
import { connect } from "react-redux";
import { Modal } from "reactstrap";
import store from '../../../store/index';
// import {  } from '../../../store/activity/activityReducer';
import Confirmation_Message from '../SubComponent/Confirmation_Message';
import Information_Message from '../SubComponent/Information_Message';
import AppService from '../../../AppService';
import { GetNewActivityFormDDLsURL } from '../../../AppConfig';

//Varaiable declaration
var activitiesList = [];
var filteractivitiesList = [];
var UserRoleData = [];
var activitiesListBackup = [];
var getActivityToUpdate;
const customProps = { id: 'my-table-id' };
let GroupList = [];
let CityList = [];
let ServiceProviderIDTemp;

const activityListObject = (data) => {
  if (data === undefined) {
    return;
  }
  activitiesList = [];
  data.forEach(element => {
    var startDate = new Date(element.Start_Date);
    var endDate = new Date(element.End_Date);
    let cityData = []; let groupData = [];
    if((element.City_ID !== null && element.Group_Set_ID !== null) && (GroupList.length > 0 && CityList.length > 0)){
      cityData = CityList.filter(elem => elem.City_ID.toString() === element.City_ID.toString());
      groupData = GroupList.filter(elem => elem.Group_Set_ID.toString() === element.Group_Set_ID.toString());
    }

    activitiesList.push({
      id: element.Activity_ID,
      ActivityName: element.Activity_Name,
      DateRange: startDate.toLocaleDateString() + '-' + endDate.toLocaleDateString(),
      Group: groupData.length > 0? groupData[0].Group_Set_Name: '',
      City: cityData.length > 0? cityData[0].City_Name: '',
      Price: element.Price,
      ActivityActiveFlag: element.Activity_Active_Flag, //ActivitiesandRemove
      ActivityDeleteFlag: 0,//element.Activity_Delete_Flag,
      UserId: 12345,
      ActivityId: element.Activity_ID,
      isActivate: element.Activity_Active_Flag["data"]["length"] > 0 ? element.Activity_Active_Flag["data"][0] : undefined,
      isDeleted: 0,//element.Activity_Delete_Flag["data"]["length"] > 0 ? element.Activity_Active_Flag["data"][0] : undefined
    });
  });
}

const headerStyle = {
  rows: {
    style: {
      minHeight: '150px', // override the row height
    }
  },
  headCells: {
    style: {
      backgroundColor: "#EDECEC",
    },
  },
};

class activityList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ActivitiesList: [],
      ActivitiesListBackup: [],

      //modal popups
      modal_center: false,
      modal_scroll: false,
      success_msg: false,
      with_title: false,
      modal_data: "",
      eventData: null,
      model_title: "",
      btn_call: "",
    };

    this.activityservice = new ActivityService();
    this.appService = new AppService();
    this.searchAnything = this.searchAnything.bind(this);
    this.onUpdateButtonHandleClick = this.onUpdateButtonHandleClick.bind(this);
    this.onActivateSuspendButtonHandleClick = this.onActivateSuspendButtonHandleClick.bind(this);
    this.onRemoveButtonHandleClick = this.onRemoveButtonHandleClick.bind(this);
  }

  //SEarch 
  searchAnything = () => {
    let thingToSearch = document.getElementById("searchData").value;
    activitiesList = [];
    if (thingToSearch != "") {
      filteractivitiesList = this.activityservice.filterByValue(this.state.ActivitiesListBackup, thingToSearch);
      activityListObject(filteractivitiesList);
    }
    else {

      activityListObject(this.state.ActivitiesListBackup);
    }
    this.setState({ ActivitiesList: activitiesList });
  }

  componentDidMount(){
    ServiceProviderIDTemp = this.props.providerAndRoleData.Service_Provider_ID
    let data = {
      ProviderId: ServiceProviderIDTemp
    }
    // get all DLLs required in Activity create form
    this.appService.GetDataFromApiPost(GetNewActivityFormDDLsURL, data)
      .then((response) => {
        if (response.status == 200) {
          GroupList= response.data[2]
          CityList= response.data[7]
        }
      })
      .catch(err => { console.log("error occured while getiing data of all ddls for new activity create") })
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (this.props.ActivityListData !== prevProps.ActivityListData) {
      activityListObject(this.props.ActivityListData);
      UserRoleData = this.props.profileData;
      this.setState({ ActivitiesList: activitiesList, ActivitiesListBackup: this.props.ActivityListData });
      activitiesListBackup = this.props.ActivityListData; // This is to get the record in the external world
    }
  }

  //Update Button
  onUpdateButtonHandleClick = (data) => {
    getActivityToUpdate = activitiesListBackup.find(element => element.Activity_ID = data.ActivityId);
    store.dispatch({ type: 'UPDATE_ACTITIY_DATA', getActivityToUpdate });
  }


  //Update Button
  onActivateSuspendButtonHandleClick = (event, data, btnCall) => {

    event.preventDefault();
    let modalTitle = "";
    if (btnCall == "Sus") {
      modalTitle = "Are you sure you want to Suspend UserType";
    }
    else if (btnCall == "Act") {
      modalTitle = "Are you sure you want to Activate UserType";
    }
    //the condition message before delete
    this.setState({ btn_call: btnCall, eventData: event, success_msg: true, modal_data: data, model_title: modalTitle });

  }

  //Update Button
  onRemoveButtonHandleClick = (event, data, btnCall) => {
    event.preventDefault();
    //the condition message before delete
    this.setState({ btn_call: btnCall, eventData: event, success_msg: true, modal_data: data, model_title: "Are you sure you want to remove" });
  }
  
  onConfirmClick() {
    switch (this.state.btn_call) {
      case "Sus": {
        this.state.eventData.preventDefault();
        this.setState({ success_msg: false });
        //let objData = this.state.modal_data;
        let objData = {
          P_ActivityID: this.state.modal_data.ActivityId,
          P_DeleteFlag: this.state.modal_data.isDeleted, 
          P_ActiveFlag: this.state.modal_data.isActivate, 
          P_UserID: this.state.modal_data.UserId 
        }
        objData.P_ActiveFlag = 0;
        this.activityservice.ActivateSuspendRemove(objData, UserRoleData.ProfileData[0][0].UserID)
          .then(resp => {
            this.getActivityList();
            this.setState({ with_title: true, model_title: "Thanks, transaction is completed successfully!!!" });
          });
        break;
      }
      case "Act": {
        this.state.eventData.preventDefault();
        this.setState({ success_msg: false });
        let objData = {
          P_ActivityID: this.state.modal_data.ActivityId,
          P_DeleteFlag: this.state.modal_data.isDeleted, 
          P_ActiveFlag: this.state.modal_data.isActivate, 
          P_UserID: this.state.modal_data.UserId 
        }
        objData.P_ActiveFlag = 1;
        this.activityservice.ActivateSuspendRemove(objData, UserRoleData.ProfileData[0][0].UserID)
          .then(resp => {
            this.getActivityList();
            this.setState({ with_title: true, model_title: "Thanks, transaction is completed successfully!!!" });
          });

        break;
      }
      case "Rmv": {
        this.state.eventData.preventDefault();
        this.setState({ success_msg: false });
        let objData = {
          P_ActivityID: this.state.modal_data.ActivityId,
          P_DeleteFlag: this.state.modal_data.isDeleted, 
          P_ActiveFlag: this.state.modal_data.isActivate, 
          P_UserID: this.state.modal_data.UserId 
        }
        objData.P_DeleteFlag = 1;
        this.activityservice.ActivateSuspendRemove(objData, UserRoleData.ProfileData[0][0].UserID)
          .then(resp => {
            this.getActivityList();
            this.setState({ with_title: true, model_title: "Thanks, transaction is completed successfully!!!" });
          });
        break;
      }
      default: {
        break;
      }

    }

    //Again reset the state
    this.setState({ btn_call: "", eventData: null, success_msg: false, modal_data: null, model_title: "" });

  }

  //update the grid
  getActivityList = () => {
    this.activityservice.GetActivityList()
      .then(resp => {
        activitiesList = [];
        activityListObject(resp);
        this.setState({ ActivitiesList: activitiesList, ActivitiesListBackup: resp });
        activitiesListBackup = resp; // This is to get the record in the external world
      });
  }

  CancelBtn() {
    this.setState({ success_msg: false });
  }
  Information_MessageBtn() {
    this.setState({ with_title: false });
  }

  columns = [
    {
      name: 'Activity Name',
      selector: 'ActivityName',
      sortable: true,
      allowOverflow: true,
      wrap: true,
      width: "20%"
    },
    {
      name: 'From & To Date',
      selector: 'DateRange',
      sortable: true,
      allowOverflow: true,
      wrap: true,
      width: "15%"
    },
    {
      name: 'Group Set Name',
      selector: 'Group',
      sortable: true,
      allowOverflow: true,
      wrap: true
    },
    {
      name: 'City',
      selector: 'City',
      sortable: true,
      wrap: true,
      allowOverflow: true
    },
    {
      name: 'Price',
      selector: 'Price',
      sortable: true,
      wrap: true,
      allowOverflow: true
    },
    {
      name: 'Action',
      cell: (row) => <div className="col-12">
        <Link to={{
          pathname: '/new-activity'
        }}> <Button className="mb-1 btn update-btn"
          variant="contained"
          color="light"
          onClick={() => this.onUpdateButtonHandleClick(row)}
          data-toggle="modal"
          data-target=".bs-example-modal-center">View &amp; Update</Button>
        </Link>

        {(row.isActivate) ? <Button className="mb-1 btn btn-warning"
          variant="contained"
          onClick={(event) => this.onActivateSuspendButtonHandleClick(event, row, "Sus")}>Suspend</Button>
          :
          <Button className="mb-1 btn activate-btn"
            variant="contained"
            onClick={(event) => this.onActivateSuspendButtonHandleClick(event, row, "Act")}>Activate</Button>
        }
        <Button className="mb-1 btn btn-info" variant="contained" onClick={() => this.onActivateSuspendButtonHandleClick(row)}>AOD</Button>
        <Button className="mb-1 btn remove-btn"
          variant="contained"
          onClick={(event) => this.onRemoveButtonHandleClick(event, row, "Rmv")}>Remove</Button>
      </div>,
      button: true,
    }
  ];

  render() {
    return (
      <React.Fragment>
        <Card className="mini-stat">
          <CardHeader className="bl-bg">
            <h4 className="title-text">Activity List Table</h4>
            {/* Search and CSV Download */}
            <span className="float-right">
              <SearchData searchAnything={this.searchAnything}></SearchData>
              <CsvDataDownload ActivityListToDownload={this.state.ActivitiesList} />
            </span>
          </CardHeader>
          <CardBody>
            <DataTable
              className="data-table"
              columns={this.columns}
              data={this.state.ActivitiesList}
              noHeader={true}
              customStyles={headerStyle}
              fixedHeader
              fixedHeaderScrollHeight="500px"
              pagination
              getProps={() => customProps}
            />
          </CardBody>
        </Card>
        <div>
          {this.state.success_msg ? (
            <Confirmation_Message title={this.state.model_title}
              modelOkButtonClicked={this.onConfirmClick.bind(this)}
              success_msg={true} modelCancelButtonClicked={() => this.CancelBtn()} />
          ) : null}

          {this.state.with_title ? (
            <Information_Message title={this.state.model_title} messageType='success'
              modelOkButtonClicked={() => this.Information_MessageBtn()}
            ></Information_Message>
          ) : null}

        </div>
      </React.Fragment>
    )
  }
}


const mapStateToProps = state => {

  return {
    toUpdateActivityData: state.ToUpdateActivityData,
    providerAndRoleData: state.currentPageName.roleAndProvider.selectedRole,
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
export default withRouter(connect(mapStateToProps, mapDispatchToProp)(activityList));
