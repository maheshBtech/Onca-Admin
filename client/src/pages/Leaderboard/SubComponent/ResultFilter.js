import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Link } from "react-router-dom";
import {
    Card,
    Row,
    Col,
    CardBody,
    CardHeader,
    Label,
    Input
} from "reactstrap";
import { Modal } from "reactstrap";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {leaderboardRace,Insertleaderboardtiming,ListLeadershipDropdownURL,leaderboardResultList} from "../../../AppConfig"
import store from "../../../store";
import { connect } from "react-redux";
import AppService from '../../../AppService'

class ResultFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_center: false,
            modal_scroll: false,
            duration_checkbox: false,
            selectedrace: "",
            raceList: [],
            selectedrunner: "",
            runnerList: [],
            Activity: "",
            selectedactivity: '',
            GroupList: [],
            selectedgroup: '',
            GenderList: [],
            selectedgender: '',
            LocationList: [],
            selectedlocation: '',
            showAlertBox: false,
            showMessagePopup: false,
            alertData:"",
            personalBest_checkbox:false,
            firstRun_checkbox :false,
            timing:"",
             loader : true,
             generate_certificate_cemter:false
           
        };
        this.appService = new AppService();
        this.add_member = this.add_member.bind(this);
        this.generate_certificate = this.generate_certificate.bind(this);
        this.tog_scroll = this.tog_scroll.bind(this);
        this.getLeaderboardList();
        this.loadRaceList();
        this.loadDropdownList();
        this.props.updateTableData('CHANGE_CURRENT_PAGE_NAME', 'Leaderboard List')    
      
    }
    removeBodyCss() {
        document.body.classList.add("no_padding");
    }
    add_member() {
        this.setState(prevState => ({
            modal_center: !prevState.modal_center
        }));
        this.removeBodyCss();
        this.setState({ personalBest_checkbox: false });
        this.setState({ firstRun_checkbox: false });

    }
    generate_certificate() {
        this.setState(prevState => ({
            generate_certificate_cemter: !prevState.generate_certificate_cemter
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
    // componentDidUpdate(prevProps, prevState){
    //     console.log(store.getState().LeaderboardResult.showTimingPoupup)
    //     if(store.getState().LeaderboardResult.showTimingPoupup ==true )
    //     {
    //       this.state.modal_center = true

    //     }

    //   }

    loadRaceList() {
        this.appService.GetLeaderboardDataFromApiPost(leaderboardRace, null)
        .then((response)=>{       
          console.log("race data list")    
          if(response.status == 200){       
            this.state.rawTableData = JSON.parse(JSON.stringify(response.data[0]));     
            store.dispatch({type:'TABLE_DATA_RACE', payload:this.state.rawTableData}); 
            this.state.raceList=response.data[0]      

          }
        })
      }
      
     
      
     
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
                        this.state.GenderList = store.getState().LeaderboardResult.genderlist
                        this.state.runnerList = store.getState().LeaderboardResult.runnerslist               
                    }
         });

      }
      closeMessagePopup(){
        this.setState({showMessagePopup:false})
    }
    messageModal() {
        this.setState(prevState => ({
            modal_center: !prevState.modal_center
        }));
        this.removeBodyCss();
        this.setState({ personalBest_checkbox: false });
        this.setState({ firstRun_checkbox: false });
    }

    getLeaderboardList() {
        if (this.props.LeaderboardResultData != "") {
            this.state.LeaderboardResultData = this.props.LeaderboardResultData
            this.state.loader = false
            this.props.updateTableData('LOADER', this.state.loader)
        }
        else {
            let providerID = this.props.ProviderID
            let data = { provider: providerID, activity: null, group: null, gender: null, location: null }

            this.appService.GetLeaderboardDataFromApiPost(leaderboardResultList, data)
                .then((response) => {
                    this.state.rawTableData = JSON.parse(JSON.stringify(response.data[0]));
                    this.props.updateTableData('TABLE_LEADERRESULT_DATA', this.state.rawTableData)
                    this.setState({ loader: false })
                    this.props.updateTableData('LOADER', this.state.loader)

                })
        }
    }
    disableKeyPress = (e) => {
        e.preventDefault();
        return false
    }


    filterresultdata() {
     
        let ActivityID = null

        if(this.state.selectedactivity === null){
            this.state.selectedactivity = ""
        }
        if(this.state.selectedgroup === null){
            this.state.selectedgroup = ""
        }
        if(this.state.selectedgender === null){
            this.state.selectedgender = ""
        }
        if(this.state.selectedlocation === null){
            this.state.selectedlocation = ""
        }
        if (this.state.selectedactivity !== "") {
            ActivityID = this.state.selectedactivity.Activity_ID

        }
        else {
            ActivityID = null
        }

        // let gender = this.state.selectedgender;
        let GroupID = null

        if (this.state.selectedgroup !== ""  ) {
            GroupID = this.state.selectedgroup.Group_ID

        }
        else {
            GroupID = null
        }


        let genderID = null

        if (this.state.selectedgender !== ""  ) {
            genderID = this.state.selectedgender.Gender_ID

        }
        else {
            genderID = null
        }

        let locationID = null

        if (this.state.selectedlocation !== ""  ) {
            locationID = this.state.selectedlocation.Training_Location_ID

        }
        else {
            locationID = null
        }



        let providerID = this.props.ProviderID

        this.state.loader = true;

        let data = { provider: providerID, activity: ActivityID, group: GroupID, gender: genderID, location: locationID }
        this.appService.GetLeaderboardDataFromApiPost(leaderboardResultList, data)
            .then((response) => {
                if (response.status == 200) {
                    this.setState({ modal_center: false })
                    this.setState({ showAlertBox: true })
                    this.setState({ alertData: "success, Data Filtered." })
                    this.state.rawTableData = JSON.parse(JSON.stringify(response.data[0]));
                    this.state.loader = false;
                    this.props.updateTableData('TABLE_LEADERRESULT_DATA', this.state.rawTableData)
                    //this.state.loader = false;
                    this.setState({ loader: false });
                    // this.setState({ firstRun_checkbox: false });
                }
            })
            .catch(err => { alert("error occured") })

        // let data = {activity: ActivityName, group:groupName, gender: gender, location:location}
        // this.appService.GetLeaderboardDataFromApiPost(filterLeaderboardResultdata, data)
        // .then((response)=>{
        //   if(response.status ==200 ){        
        //     this.setState({modal_center: false})
        //     this.setState({showAlertBox:true})
        //     this.setState({alertData:"success, Data Filtered."})
        //     this.state.rawTableData = JSON.parse(JSON.stringify(response.data[0]));
        //     this.props.updateTableData('TABLE_LEADERRESULT_DATA', this.state.rawTableData)
        //     // this.setState({ personalBest_checkbox: false });
        //     // this.setState({ firstRun_checkbox: false });
        //   }
        // })
        // .catch(err=>{alert("error occured")})     

    }




    resetworkoutdata() {

        document.getElementById('activity').value = ""
        document.getElementById('group').value = ""
        document.getElementById('location').value = ""
        document.getElementById('gender').value = ""

        this.setState({ selectedactivity: "" })
        this.state.selectedactivity = ""
        let ActivityID = null


        this.state.selectedgroup = ""
        let GroupID = null


        this.state.selectedlocation = "";
        let locationID = null


        this.state.selectedgender = "";
        let genderID = null


        let providerID = this.props.ProviderID


        this.state.loader = true;

        let data = { provider: providerID, activity: ActivityID, group: GroupID, gender: genderID, location: locationID }
        this.appService.GetLeaderboardDataFromApiPost(leaderboardResultList, data)
            .then((response) => {
                if (response.status == 200) {
                    this.setState({ modal_center: false })
                    this.setState({ showAlertBox: true })
                    this.setState({ alertData: "success, Data Filtered." })
                    this.state.rawTableData = JSON.parse(JSON.stringify(response.data[0]));
                    this.state.loader = false;
                    this.props.updateTableData('TABLE_LEADERRESULT_DATA', this.state.rawTableData)
                    //this.state.loader = false;
                    this.setState({ loader: false });
                    // this.setState({ firstRun_checkbox: false });
                }
            })
            .catch(err => { alert("error occured") })

    }
    personalBestCheckedBox = (e, index) => {
        if (e.target.checked) {
            this.setState({ personalBest_checkbox: true });
        } else {
            this.setState({ personalBest_checkbox: false });
        }

    };
     closeMessageBox =()=>{
        this.setState({ showAlertBox: false })
        this.setState({ alertData: "" })
      }
    firstRunCheckedBox = (e, index) => {
        let checked = e.target.checked;
        if (e.target.checked) {
            this.setState({ firstRun_checkbox: true });
        } else {
            this.setState({ firstRun_checkbox: false });
        }

    };
    handleTime = (event) => {
        let time = event.target.value
        if (event.target.valueAsDate !== undefined) {
            if (event.target.valueAsDate.getTime() < 43200000) {
                time = event.target.value + " AM"
            }
            else {
                time = event.target.value + " PM"
            }
        }

        this.setState({ timing: time })

        //console.log('from_date', event.target.value);
    };
    AddNewTiming() {
        let raceName = this.state.selectedrace;

        let raceID = null
        let racedata = this.state.raceList;

        let selectedData = racedata.filter(data => data.Fitness_Event_Name === raceName)
        if (raceName !== "") {
            raceID = selectedData[0].Fitness_Detail_ID
        }
        else {
            raceID = null
        }

        let runnerName = this.state.selectedrunner;

        let runnerID = null
        let runnerdata = this.state.runnerList

        let selectedrunnerdata = runnerdata.filter(data => data.User_ID === runnerName)
        if (runnerName !== "") {
            runnerID = selectedrunnerdata[0].User_Skey_ID
        }
        else {
            runnerID = null
        }


        let timing = document.getElementById("race-time").value;

        let raceurl = document.getElementById("raceURL").value;
        var personalBestcheckedValue = 0
        if (this.state.personalBest_checkbox === true) {
            personalBestcheckedValue = 1
        }
        var firstRuncheckedValue = 0
        if (this.state.firstRun_checkbox === true) {
            firstRuncheckedValue = 1
        }

        document.getElementById("racenameError").innerHTML = ""
        document.getElementById("runnerError").innerHTML = ""
        document.getElementById("timingError").innerHTML = ""
        document.getElementById("raceurlError").innerHTML = ""

        let validate = this.appService.validateTimingPopupForm(raceName, runnerName, timing)
        if (validate.status == true) {

            var time = this.state.timing;
            var hours = Number(time.match(/^(\d+)/)[1]);
            var minutes = Number(time.match(/:(\d+)/)[1]);
            var AMPM = time.match(/\s(.*)$/)[1];
            if (AMPM == "PM" && hours < 12) hours = hours + 12;
            if (AMPM == "AM" && hours == 12) hours = hours - 12;
            var sHours = hours.toString();
            var sMinutes = minutes.toString();
            if (hours < 10) sHours = "0" + sHours;
            if (minutes < 10) sMinutes = "0" + sMinutes;
            let timing24hrs = sHours + ":" + sMinutes

            let data = { fitnesseventparticipantID: null, race: raceID, runner: runnerID, timing: timing24hrs, raceurl: raceurl, personalBest: personalBestcheckedValue, debut: firstRuncheckedValue }
            this.appService.GetDataFromApiPost(Insertleaderboardtiming, data)
                .then((response) => {
                    if (response.status == 200) {
                        this.setState({ modal_center: false })
                        this.setState({ showAlertBox: true })
                        this.setState({ alertData: "success, New Timing added." })
                        this.appService.updateLeaderboardListMasterData(this.props.ProviderID)
                        this.setState({ personalBest_checkbox: false });
                        this.setState({ firstRun_checkbox: false });
                    }
                })
                .catch(err => { alert("error occured") })
        }
        else {
            validate.section.forEach((obj, idx) => {
                document.getElementById(obj).innerHTML = validate.message[idx]
            })
        }

    }
    render() {
        const errorMsgStyle = {
            color: "red",
            fontSize: "12px"
        }
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <Row className="align-items-center">
                        <Col sm={6}>
                            <div className="page-title-box">
                                <ol className="breadcrumb mb-0">
                                    <li className="breadcrumb-item">
                                        Leaderboard
                                    </li>
                                    <li className="breadcrumb-item active">
                                        Leaderboard List
                                    </li>
                                </ol>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={12} className="text-right mb-4">
                                <button type="button"
                                    className="btn update-btn font mr-2"
                                    onClick={this.generate_certificate} >
                                    Generate e-Certificate
                                    </button>
                         <Modal
                                isOpen={this.state.generate_certificate_cemter}
                                toggle={this.generate_certificate}
                            >
                                <div className="modal-header">
                                <h5 className="modal-title mt-0">e-Certificate template is not Present </h5>
                     
                                    <button
                                        type="button"
                                        onClick={() =>
                                            this.setState({ generate_certificate_cemter: false })
                                            // this.setState({ personalBest_checkbox: false }),
                                            // this.setState({ firstRun_checkbox: false })
                                        }
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="col-sm-12">
                                    {/* <h5 className="modal-title mt-0">e-Certificate template is not defined </h5>
                      */}
                                  
                                    </div>
                                </div>
                            </Modal>
                   
                                <button
                                    type="button"
                                    className="btn update-btn font"
                                    onClick={this.add_member}
                                    data-toggle="modal"
                                    data-target=".bs-example-modal-center"
                                >
                                    Add Timing
                                </button>
                            <Modal
                                isOpen={this.state.modal_center}
                                toggle={this.add_member}
                            >
                                <div className="modal-header">
                                    <h5 className="modal-title mt-0">Add New Timing <span style={errorMsgStyle}>(*all fields are mandetory)</span></h5>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            this.setState({ modal_center: false })
                                            // this.setState({ personalBest_checkbox: false }),
                                            // this.setState({ firstRun_checkbox: false })
                                        }
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="col-sm-12">
                                        <div className="form-group row">
                                            <Label for="name">Race Name</Label>
                                            <Autocomplete
                                                className="d-block w-100"
                                                options={this.state.raceList}
                                                onInputChange={(event, value) => {
                                                    console.log('value ' + value)
                                                    this.setState({ selectedrace: value });

                                                }}
                                                getOptionLabel={(option) => option.Fitness_Event_Name}
                                                id="race"
                                                renderInput={(params) => (
                                                    <div ref={params.InputProps.ref}>
                                                        <input type="race" placeholder="Enter Race Name" type="text" {...params.inputProps} />
                                                    </div>
                                                )}
                                            />
                                            <Label for="name" id="racenameError" style={errorMsgStyle}></Label>

                                        </div>
                                        <div className="form-group row">
                                            <Label for="name">Runners</Label>
                                            <Autocomplete
                                                className="d-block w-100"
                                                options={this.state.runnerList}
                                                onInputChange={(event, value) => {
                                                    console.log('value ' + value)
                                                    this.setState({ selectedrunner: value });
                                                }}
                                                getOptionLabel={(option) => option.User_ID}
                                                id="runner"
                                                renderInput={(params) => (
                                                    <div ref={params.InputProps.ref}>
                                                        <input type="runner" placeholder="Enter runner ID" type="text" {...params.inputProps} />
                                                    </div>
                                                )}
                                            />
                                            <Label for="name" id="runnerError" style={errorMsgStyle}></Label>

                                        </div>
                                        <div className="form-group row">
                                            <Label for="name">Timing</Label>
                                            <input className="form-control" type="time" id="race-time" name="RaceTime"
                                                onChange={this.handleTime}
                                                onKeyPress={this.disableKeyPress}
                                            />

                                            <Label for="name" id="timingError" style={errorMsgStyle}></Label>
                                        </div>
                                        <div className="form-group row">
                                            <Label for="name">Race URL</Label>
                                            <input className="form-control d-block w-100" type="text" id="raceURL" name="raceURL" />
                                            <Label for="name" id="raceurlError" style={errorMsgStyle}></Label>
                                        </div>
                                        <div className="form-group row">
                                            <FormControlLabel
                                                value="personalBest"
                                                control={<Checkbox color="primary" />}
                                                label="Is this your personal best?"
                                                className="-block w-100 personalBest"
                                                id="best"
                                                onClick={e => this.personalBestCheckedBox(e)}
                                            />

                                            <FormControlLabel
                                                value="firstRun"
                                                control={<Checkbox color="primary" />}
                                                label="Is this your first 'Run'?"
                                                className="-block w-100 firstRun"
                                                id="Run"
                                                onClick={e => this.firstRunCheckedBox(e)}
                                            />
                                        </div>

                                        <div className="form-group row">
                                            <button className="btn btn-block update-btn font" onClick={() => this.AddNewTiming()} id="submit">
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                        </Col>
                    </Row>
                    <Modal
                        isOpen={this.state.showAlertBox}
                        toggle={false}
                    >
                        <div className="modal-header">
                            <h5 className="modal-title mt-0">Message</h5>
                            <button
                                type="button"
                                onClick={() => this.closeMessageBox()
                                }
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        {this.state.alertData !== "" ?
                            <div className="modal-body">
                                {this.state.alertData.split(',')[0] !== "success" ?
                                    <div class="alert alert-danger" role="alert">
                                        Some error occured
                                      </div>
                                    :
                                    <div class="alert alert-success" role="alert">
                                        {this.state.alertData.split(',')[1]}
                                    </div>
                                }
                            </div>
                            : null}
                    </Modal>
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
                                                            <input type="activity" placeholder="Enter activity" type="text" {...params.inputProps} />
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
                                                            <input type="activity" placeholder="Enter activity" type="text" {...params.inputProps} />
                                                        </div>
                                                    )} />
                                            </div>
                                        </Col>
                                        <Col lg={3}>
                                            <div className="form-group">
                                                <Label for="act-type">Gender</Label>
                                                <Autocomplete
                                                    className="d-block w-100"
                                                    options={this.state.GenderList}
                                                    onChange={(event, value) => {
                                                        console.log('value ' + value)
                                                        this.setState({ selectedgender: value });

                                                    }}
                                                    value={this.state.selectedgender}
                                                    getOptionLabel={(option) => option.Gender_Name}
                                                    id="gender"
                                                    renderInput={(params) => (
                                                        <div ref={params.InputProps.ref}>
                                                            <input type="gender" placeholder="Enter Gender" type="text" {...params.inputProps} />
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
                                            <div className="form-group">
                                                <button className="btn update-btn" onClick={() => this.filterresultdata()}>
                                                    Filter Record
                                                </button>
                                                <button className="btn update-btn ml-2" onClick={() => this.resetworkoutdata()}>
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
    LeaderboardResultData :state.LeaderboardResult.LeaderboardresultList,
    racetableData :state.LeaderboardResult !=undefined ? state.LeaderboardResult.racelist :null,
    runnerList:state.LeaderboardResult.runnerslist,
    GroupNameList:state.LeaderboardResult !=undefined ? state.LeaderboardResult.grouplist :null,
    GenderList:state.LeaderboardResult !=undefined ? state.LeaderboardResult.genderlist :null,
    LocationList:state.LeaderboardResult !=undefined ? state.LeaderboardResult.locationlist :null,
    ActivityList:state.raceData !=undefined ? state.raceData.activities :null,
    showTimingPoupup : state.LeaderboardResult.showTimingPoupup,
    ProviderID: state.currentPageName.roleAndProvider.selectedRole.Service_Provider_ID 

   };
    
};

const dispatchToProps = dispatch => {
    return {
        updateTableData: (type, payload) => {
            dispatch({ type: type, payload: payload })
        }
    }
}
export default withRouter(connect(mapStatetoProps, dispatchToProps)(ResultFilter));
