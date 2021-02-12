import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Link } from "react-router-dom";
import { leaderboardWorkout, ListLeadershipDropdownURL, ListLocationURL, FilterleaderboardWorkout } from "../../../AppConfig"
import AppService from "../../../AppService";
import store from "../../../store";
import { connect } from "react-redux";
import Loader from "../../../components/Loader";
import {
    Card,
    Row,
    Col,
    CardBody,
    CardHeader,
    Label
} from "reactstrap";

const appService = new AppService()


class WorkoutFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            urlworkoutTableData: leaderboardWorkout,
            Activity: "",
            selectedactivity: '',
            GroupList: [],
            selectedgroup: '',
            LocationList: [],
            selectedlocation: '',
            showAlertBox: false,
            showMessagePopup: false,
            alertData: "",
            loader: true,


        };
        this.appService = new AppService();
        this.getWorkoutData();
        // this.getActivityData();
        this.loadDropdownList();
        this.props.updateTableData('CHANGE_CURRENT_PAGE_NAME', 'Workout Leaderboard')
        }


    getWorkoutData() {
        if (this.props.workoutTableData != "" && this.props.workoutTableData !== null) {
            this.state.workoutTableData = this.props.workoutTableData
            this.state.loader = false
        }
        else {
            this.appService.GetWorkoutDataFromApiget(this.state.urlworkoutTableData, null)
                .then((response) => {
                    this.state.rawTableData = JSON.parse(JSON.stringify(response.data[0]));
                    store.dispatch({ type: 'TABLE_WORKOUT_DATA', payload: this.state.rawTableData });
                    this.setState({ loader: false })
                })
        }
    }
    // loadDropdownList() {
    //     this.appService.GetWorkoutDataFromApiget(ListLeadershipDropdownURL, null)
    //         .then(response => {
    //             if (response.status == 200) {
    //                 store.dispatch({ type: 'LIST_GROUP_DATA', payload: response.data[1] });
    //                 this.setState({ GroupList: response.data[1] })
    //                 store.dispatch({ type: 'LIST_LOCATION_DATA', payload: response.data[3] });
    //                 this.setState({ LocationList: response.data[3] })
    //                 store.dispatch({type:'Activity_DATA_RACE', payload:response.data[5]}); 
    //                 this.setState({ Activity: response.data[5] })
    //             }
    //         });
    // }
    
    loadDropdownList = () => {              
        let ProviderID=  this.props.ProviderID
              let data={
                provider :ProviderID
              }
              this.appService.GetWorkoutDataFromApiget(ListLeadershipDropdownURL, data)
                  .then(response => {
                  
                      if (response.status == 200) {
                        store.dispatch({ type: 'LIST_RUNNER_DATA', payload: response.data[4] }); 
                          store.dispatch({ type: 'LIST_GROUP_DATA', payload: response.data[1] });                
                          store.dispatch({ type: 'LIST_LOCATION_DATA', payload: response.data[3] });              
                          store.dispatch({type:'Activity_DATA_RACE', payload:response.data[5]}); 
                          store.dispatch({type:'LIST_GENDER_DATA', payload:response.data[2]});   
                          store.dispatch({type:'LIST_DISTANCE_DATA', payload:response.data[8]});  
                          this.state.GroupList = store.getState().LeaderboardResult.grouplist
                          this.state.LocationList = store.getState().LeaderboardResult.locationlist
                          this.state.Activity = store.getState().raceData.activities              
                      }
           });
          
  
        
  
        }
    // loadDropdownList = () => {
    // //     console.log(store.getState())
    //     this.state.GroupList = store.getState().LeaderboardResult.grouplist
    //     this.state.LocationList = store.getState().LeaderboardResult.locationlist
    //     this.state.Activity = store.getState().raceData.activities
    //  }
    filterworkoutdata() {
           
        let ActivityID =null
        if(this.state.selectedactivity === null){
            this.state.selectedactivity=""
        }
        if(this.state.selectedgroup === null){
            this.state.selectedgroup=""  
        }
        if(this.state.selectedlocation === null){
            this.state.selectedlocation=""
        }
       
        if (this.state.selectedactivity !== "" ) {
            ActivityID = this.state.selectedactivity.Activity_ID

        }
        else {
            ActivityID = null
        }
    
      

        let GroupID = null;
     
        if (this.state.selectedgroup !== "" ) {
            GroupID = this.state.selectedgroup.Group_ID;
        }
        else {
            GroupID = null
        }

     

        let locationID = null
     
        if (this.state.selectedlocation !== "" ) {
            locationID = this.state.selectedlocation.Training_Location_ID
        }
        else {
            locationID = null
        }
        let  providerID=this.props.ProviderID

        this.state.loader = true;
        let data = { provider: providerID ,activity: ActivityID, group: GroupID, location: locationID }
        this.appService.GetWorkoutDataFromApiget(FilterleaderboardWorkout, data)
            .then((response) => {
                if (response.status == 200) {
                    this.setState({ modal_center: false })
                    this.setState({ showAlertBox: true })
                    this.setState({ alertData: "success, Data Filtered." })
                    this.state.rawTableData = JSON.parse(JSON.stringify(response.data[0]));
                    this.state.loader = false;
                    this.props.updateTableData('TABLE_WORKOUT_DATA', this.state.rawTableData)
                    //this.state.loader = false;
                     this.setState({ loader: false });
                    // this.setState({ firstRun_checkbox: false });
                }
            })
            .catch(err => { alert("error occured") })

    }

    
    resetworkoutdata() {
        
        document.getElementById('activity').value = ""
        document.getElementById('group').value = ""
        document.getElementById('location').value = ""
        this.setState({ selectedactivity: "" })
        this.state.selectedactivity=""       
        let ActivityID = null
        
     
        this.state.selectedgroup=""
        let GroupID = null
       
         
        this.state.selectedlocation="";
        let locationID = null
       

    
        let  providerID=this.props.ProviderID
        this.state.loader = true;
        let data = { provider: providerID ,activity: ActivityID, group: GroupID, location: locationID }
        this.appService.GetWorkoutDataFromApiget(FilterleaderboardWorkout, data)
            .then((response) => {
                if (response.status == 200) {
                    this.setState({ modal_center: false })
                    this.setState({ showAlertBox: true })
                    this.setState({ alertData: "success, Data Filtered." })
                    this.state.rawTableData = JSON.parse(JSON.stringify(response.data[0]));
                    this.state.loader = false;
                    this.props.updateTableData('TABLE_WORKOUT_DATA', this.state.rawTableData)
                    //this.state.loader = false;
                     this.setState({ loader: false });
                    // this.setState({ firstRun_checkbox: false });
                }
            })
            .catch(err => { alert("error occured") })

    }
    render() {
        return (
            <React.Fragment>
                {this.state.loader ?
                    <Loader /> :
                    null
                }
                <div className="container-fluid">
                    <Row className="align-items-center">
                        <Col sm={6}>
                            <div className="page-title-box">
                                <ol className="breadcrumb mb-0">
                                    <li className="breadcrumb-item">
                                        Leaderboard
                                    </li>
                                    <li className="breadcrumb-item active">
                                        Workout Leaderboard
                                    </li>
                                </ol>
                            </div>
                        </Col>
                    </Row>
                    <Card className="mini-stat">
                        <CardBody>
                            <Row>
                                <Col lg={12}>
                                    <Row>
                                        <Col lg={3}>
                                            <div className="form-group">
                                                <Label for="act-type">Activity Name</Label>
                                                <Autocomplete
                                                    className="d-block w-100"
                                                    options={this.state.Activity}
                                                    onChange={(event, value) => {
                                                        console.log('value ' + value)
                                                        this.setState({ selectedactivity: value });

                                                    }}
                                                    value={this.state.selectedactivity}
                                                    getOptionLabel={(option) => option.Activity_Name}
                                                    id="activity"
                                                    renderInput={(params) => (
                                                        <div ref={params.InputProps.ref}>
                                                            <input type="activity" placeholder="Enter activity" id="act" type="text" {...params.inputProps} />
                                                        </div>
                                                    )} />
                                            </div>
                                        </Col>
                                        <Col lg={3}>
                                            <div className="form-group">
                                                <Label for="act-type">Group Name</Label>
                                                <Autocomplete
                                                    className="d-block w-100"
                                                    options={this.state.GroupList}
                                                    onChange={(event, value) => {
                                                        console.log('value ' + value)
                                                        this.setState({ selectedgroup: value });

                                                    }}
                                                    value={this.state.selectedgroup}
                                                    getOptionLabel={(option) => option.Group_Name}
                                                    id="group"
                                                    renderInput={(params) => (
                                                        <div ref={params.InputProps.ref}>
                                                            <input type="group" placeholder="Enter group" type="text" {...params.inputProps} />
                                                        </div>
                                                    )} />
                                            </div>
                                        </Col>
                                        <Col lg={3}>
                                            <div className="form-group">
                                                <Label for="act-type">Location</Label>
                                                <Autocomplete
                                                    className="d-block w-100"
                                                    options={this.state.LocationList}
                                                    onChange={(event, value) => {
                                                        console.log('value ' + value)
                                                        this.setState({ selectedlocation: value });

                                                    }}
                                                    value={this.state.selectedlocation}
                                                    getOptionLabel={(option) => option.Training_Location_Name}
                                                    id="location"
                                                    renderInput={(params) => (
                                                        <div ref={params.InputProps.ref}>
                                                            <input type="location" placeholder="Enter Location" type="text" {...params.inputProps} />
                                                        </div>
                                                    )} />
                                            </div>
                                        </Col>
                                        <Col lg={3}>
                                            <div className="form-group text-right">
                                                <button className="btn w-50 update-btn mt-2-5" onClick={() => this.filterworkoutdata()}>
                                                    Filter Record
                                                </button>
                                                <button className="btn update-btn mt-2-5 ml-2" onClick={() => this.resetworkoutdata()}>
                                                    Reset
                                                </button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </div>
            </React.Fragment>
        )
    }
}
const mapStatetoProps = state => {
    return {

        selectedActivities: state.selectedActivity != undefined ? state.selectedActivity.activities : null,
        workoutTableData: state.workoutData != undefined ? state.workoutData.tableData : null,
        ProviderID: state.currentPageName.roleAndProvider.selectedRole.Service_Provider_ID 
    };
};


const dispatchToProps = dispatch => {
    return{
      updateTableData:(type, payload)=> {      
          dispatch({type:type, payload:payload})
      } 
    }
    }
export default withRouter(connect(mapStatetoProps, dispatchToProps)(WorkoutFilter));


