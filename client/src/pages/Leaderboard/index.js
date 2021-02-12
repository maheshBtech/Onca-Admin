import React, { Component, useEffect, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Row, Col, Label, Input } from "reactstrap";
import CsvDownload from 'react-json-to-csv'
import DataTable, { createTheme } from 'react-data-table-component';
import ResultFilter from '../Leaderboard/SubComponent/ResultFilter';
import CsvDataDownload from '../Leaderboard/SubComponent/CSVDataDownload';
import SearchData from '../Leaderboard/SubComponent/SearchData';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { green } from '@material-ui/core/colors';
import CancelIcon from '@material-ui/icons/Cancel';
import Loader from "../../components/Loader";
import { Insertleaderboardtiming, Deleteleaderboardtiming } from "../../AppConfig"

import {
  Card,
  CardBody,
  CardHeader,
  Button
} from "reactstrap";
import { connect } from 'react-redux';
import store from '../../store/index'
import { Modal } from "reactstrap";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AppService from '../../AppService'
// import users
import runners1 from '../../assets/images/users/user-1.jpg';
import runners2 from '../../assets/images/users/user-2.jpg';
import runners3 from '../../assets/images/users/user-3.jpg';
import runners4 from '../../assets/images/users/user-4.jpg';

// this.appService = new AppService();
var workoutLeaderboardList = [];
const errorMsgStyle = {
  color: "red",
  fontSize: "12px"
}
const WorkoutData = [
  {
    OverallRank: 1,
    GroupRank: 1,
    GenderRank: 1,
    RunnerImg: runners1,
    UserName: "Arun TD",
    Distance: "10KMs",
    Timing: "00:39:14",
    PB: "N",
    Debut: "N",
    raceURL: "https://www.google.com/fit/"
  },
  {
    OverallRank: 2,
    GroupRank: 1,
    GenderRank: 2,
    RunnerImg: runners2,
    UserName: "Nava Shankar",
    Distance: "10KMs",
    Timing: "00:40:58",
    PB: "N",
    Debut: "N",
    raceURL: "https://www.google.com/fitrr/"
  }
];
const headerStyle = {
  rows: {
    style: {
      minHeight: '120px', // override the row height
    }
  },
  headCells: {
    style: {
      backgroundColor: "#EDECEC",
    },
  },
};

function Result(props) {
  const [selectedPB, setselectedPB] = useState(0);
  const [selecteddebut, setselecteddebut] = useState("");
  const [bindingPopup, setbindingPopup] = useState("");
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const [rawTableData, setrawTableData] = useState();
  const [toCSV, setToCSV] = useState(null)
  const [filteredDataForTable, setFilteredDataForTable] = useState(rawTableData)
  const [alertData, setAlertData] = useState("");
  const [poupdata, setpoupdata] = useState([]);
  const [newtiming, settiming] = useState("");
  var appService = new AppService();
  useEffect(() => {

    if (props.LeaderboardresultList !== "" && props.LeaderboardresultList !== null) {
      let workoutData = [];
      let workoutData1 = props.LeaderboardresultList;
      workoutData = workoutData1
      workoutData.forEach(function (e) {
        if (typeof e === "object") {
          e["PB"] = "";
          e["Debut"] = "";
          e["Name"] = "";
        }
      });
      workoutData.map((item, index) => {

        let fullname = item.First_Name + " " + item.Last_Name;
        workoutData[index].Name = fullname;

        let personnelbest = item.Personal_Best_Flag.data[0]


        if (personnelbest === 1) {
          workoutData[index].PB = 'Y'
        }
        else {
          workoutData[index].PB = 'N'
        }


        let debut = item.Debut_Flag.data[0]

        if (debut === 1) {
          workoutData[index].Debut = 'Y'
        }
        else {
          workoutData[index].Debut = 'N'
        }

      })
      setrawTableData(props.LeaderboardresultList)
      console.log(props.LeaderboardresultList)
      setFilteredDataForTable(props.LeaderboardresultList)
      prepareFileToDownload(props.LeaderboardresultList)

    }

    console.log(props.LeaderboardresultList);

  }, [props.LeaderboardresultList]);

  const columns = [
    {
      name: 'Overall Rank',
      selector: 'Rank',
      sortable: true,
      wrap: true,
      width: '7%',
    },
    {
      name: 'Group Rank',
      selector: 'GroupRank',
      sortable: true,
      wrap: true,
      width: '7%',
    },
    {
      name: 'Gender Rank',
      selector: 'GenderRank',
      sortable: true,
      wrap: true,
      width: '7%',
    },
    {
      name: 'Runners Name',
      selector: 'Name',
      sortable: true,
      wrap: true,
      width: '30%',
      cell: (row) =>
        <div className="col-12">
          <div className="w50 float-left">
            <img src={runners1} alt="user" className="avatar-sm rounded-circle" />
            <CheckCircleIcon className="ecert" style={{ fontSize: 20, color: green[500] }} />
          </div>
          <div className="ml-3 user-profile float-left">
            <a href={row.First_Name} target="_blank">{row.Name}</a>
          </div>
        </div>
    },
    {
      name: 'Distance',
      selector: 'Fitness_Event_Name',
      sortable: true,
      wrap: true,
      width: '10%',
    },
    {
      name: 'Time',
      selector: 'Timing',
      sortable: true,
      wrap: true,
      width: '10%',
    },
    {
      name: 'PB (Y/N)',
      selector: 'PB',
      sortable: true,
      wrap: true,
      width: '7%',
    },
    {
      name: 'Debut (Y/N)',
      selector: 'Debut',
      sortable: true,
      width: '7%',
    },
    {
      name: 'Action',
      width: '11%',
      cell: (row) =>
        <div className="col-12">
          <Button className="mb-1 btn update-btn" onClick={() => showHidePopup(row)} >
            Update
      </Button>

          <Button className="mb-1 btn remove-btn" onClick={() => removeUser(row)}>
            Remove
      </Button>
        </div>
      ,
      button: true,
    },

  ];

  const showHidePopup = (row) => {

    let participantID = row.Fitness_Event_Participant_ID
    store.dispatch({ type: 'CHANGE_POPUP_TIMING_VIEW', payload: true })
    let time12hrs = row.Timing;


    var hours = Number(time12hrs.match(/^(\d+)/)[1]);
    var minutes = Number(time12hrs.match(/:(\d+)/)[1]);

    var AmOrPm = hours <= 12 ? 'AM' : 'PM';

    hours = (hours % 12) || 12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    let finalTime = sHours + ":" + sMinutes + " " + AmOrPm;
    var personalBestcheckedValue = false
    if (row.PB === "Y") {
      personalBestcheckedValue = true
    }
    var firstRuncheckedValue = false
    if (row.Debut === "Y") {
      firstRuncheckedValue = true
    }
    store.dispatch({ type: "RESULT_CHANGE_POPUP_DATA", payload: { eventparticipantID: participantID, race: row.Fitness_Detail_Name, runner: row.User_ID, raceURL: row.URL, timing: time12hrs, PB: personalBestcheckedValue, debut: firstRuncheckedValue } })

    let vardata1 = store.getState().LeaderboardResult.popupData
    let vardata = [];
    vardata.push(JSON.parse(JSON.stringify(vardata1)))
    // const data=[...vardata]
    setpoupdata(vardata);
    settiming(vardata[0].timing)
    console.log(poupdata);
  }

  const removeUser = (row) => {
    let participantID = row.Fitness_Event_Participant_ID

    let data = { participantID: participantID, deleteFlag: 1, Activeflag: 0 }
    let providerID=props.ProviderID
    appService.GetLeaderboardDataFromApiPost(Deleteleaderboardtiming, data)
      .then((response) => {
        if (response.status == 200) {
          setShowMessagePopup(true)
          store.dispatch({ type: "CHANGE_DELETE_POPUP_TIMING_VIEW", payload: "success,  Participant Timing removed successfully." })
          appService.updateLeaderboardListMasterData(providerID)

        }
      })
      .catch(err => { alert(err) })
  }

  useEffect(() => {
    if (props.showTimingPoupup === true) {
      props.updateTableData('CHANGE_POPUP_TIMING_VIEW', true)
    }
  }, [props.showTimingPoupup]);


  useEffect(() => {
    if (showMessagePopup !== false) {
      setAlertData(props.showMessagePopup)
      setShowMessagePopup(true)
    }
  }, [props.showMessagePopup])

  const prepareFileToDownload = (rawData) => {
    if ((rawData !== "" || rawData !== undefined || rawData !== null) && rawData.length > 0) {
      let filterData = []
      rawData.forEach(obj => {
        filterData.push({ "Overall Rank": obj.Rank, "Group Rank": 0, "Gender Rank": 0, "Runner Name": obj.Name, "Distance": obj.Fitness_Event_Name, "Time": obj.Timing, "PB(Y/N)": obj.PB, "Debut(Y/N)": obj.Debut })
      })
      setToCSV(filterData)
    }
  }

  const searchAnything = () => {
    let thingToSearch = document.getElementById("searchData").value;
    let filterDataToShow = []
    if (thingToSearch == "") {
      setFilteredDataForTable(rawTableData)
      prepareFileToDownload(rawTableData)
    }
    else {
      rawTableData.forEach(obj => {
        if (obj.Rank.toString().includes(thingToSearch.toLowerCase()) || obj.Name.toLowerCase().includes(thingToSearch.toLowerCase()) || obj.Fitness_Event_Name.toLowerCase().includes(thingToSearch.toLowerCase()) || obj.Timing.toString().includes(thingToSearch.toLowerCase()) || obj.PB.toLowerCase().includes(thingToSearch.toLowerCase()) || obj.Debut.toLowerCase().includes(thingToSearch.toLowerCase())) {
          filterDataToShow.push(obj)
        }
      });
      setFilteredDataForTable(filterDataToShow)
      prepareFileToDownload(filterDataToShow)
    }

  }

  const closeMessageBox = () => {
    setShowMessagePopup(false)
    store.dispatch({ type: "CHANGE_DELETE_POPUP_TIMING_VIEW", payload: "" })
  }
  const CloseForm = () => {
    props.updateTableData('CHANGE_POPUP_TIMING_VIEW', false)
    props.updateTableData('RESULT_CHANGE_POPUP_DATA', "")

    //refreshMasterTable()
  }
  const handleTime = (event) => {

    let time = event.target.value

    const preData = [...poupdata];
    preData[0].timing = time
    const data = preData
    setpoupdata(data);
    if (event.target.valueAsDate !== undefined) {
      if (event.target.valueAsDate.getTime() < 43200000) {
        time = event.target.value + " AM"
      }
      else {
        time = event.target.value + " PM"
      }
    }

    // preData[0].timing=time
    // const data=preData
    //  setpoupdata(data);
    settiming(time)
    // this.setState({ timing: time })

    //console.log('from_date', event.target.value);
  };
  const disableKeyPress = (e) => {
    e.preventDefault();
    return false
  }
  const personalBestCheckedBox = (e, index) => {
    console.log(poupdata)
    const preData = [...poupdata];
    preData[0].PB = !preData[0].PB
    console.log(poupdata)
    const data = preData
    setpoupdata(data);
    console.log(poupdata)
  };
  const firstRunCheckedBox = (e, index) => {
    console.log(poupdata)
    const preData = [...poupdata];
    preData[0].debut = !preData[0].debut
    console.log(poupdata)
    const data = preData
    setpoupdata(data);
    console.log(poupdata)
  };

  const handleraceurl=(event)=>{
   
    const preData = [...poupdata];
    let raceurl = event.target.value
    preData[0].raceURL = raceurl
 
    const data = preData
    setpoupdata(data);
    
  }
  const AddNewTiming = (participantID) => {
   
    let raceName = document.getElementById('race').value;
    // raceName ="pp"
    let raceID = null
    let racedata = props.racetableData;

    let selectedData = racedata.filter(data => data.Fitness_Event_Name === raceName)
    if (raceName !== "") {
      raceID = selectedData[0].Fitness_Detail_ID

    }
    else {
      raceID = null
    }

    let runnerName = document.getElementById('runner').value;;

    let runnerID = null
    let runnerdata = props.runnerList

    let selectedrunnerdata = runnerdata.filter(data => data.User_ID === runnerName)
    if (raceName !== "") {
      runnerID = selectedrunnerdata[0].User_Skey_ID
    }
    else {
      runnerID = null
    }


    let timing = document.getElementById("race-time").value;

    let raceurl = document.getElementById("raceURL").value;
    const preData = [...poupdata];
    var personalBestcheckedValue = 0
    if (preData[0].PB === true) {
      personalBestcheckedValue = 1
    }
    var firstRuncheckedValue = 0
    if (preData[0].debut === true) {
      firstRuncheckedValue = 1
    }


    document.getElementById("timingError").innerHTML = ""
    document.getElementById("raceurlError").innerHTML = ""
    let ProviderID=props.ProviderID
    let validate = appService.validateTimingPopupForm(raceName, runnerName, timing)
    if (validate.status == true) {

      var time = newtiming;
      // var hours = Number(time.match(/^(\d+)/)[1]);
      // var minutes = Number(time.match(/:(\d+)/)[1]);
      // var AMPM = time.match(/\s(.*)$/)[1];
      // if (AMPM == "PM" && hours < 12) hours = hours + 12;
      // if (AMPM == "AM" && hours == 12) hours = hours - 12;
      // var sHours = hours.toString();
      // var sMinutes = minutes.toString();
      // if (hours < 10) sHours = "0" + sHours;
      // if (minutes < 10) sMinutes = "0" + sMinutes;
      // let timing24hrs = sHours + ":" + sMinutes  

      let data = { fitnesseventparticipantID: participantID, race: raceID, runner: runnerID, timing: time, raceurl: raceurl, personalBest: personalBestcheckedValue, debut: firstRuncheckedValue }
      appService.GetLeaderboardDataFromApiPost(Insertleaderboardtiming, data)
        .then((response) => {
          if (response.status == 200) {
            store.dispatch({ type: 'CHANGE_POPUP_TIMING_VIEW', payload: false })
            setShowMessagePopup(true)
            store.dispatch({ type: "CHANGE_DELETE_POPUP_TIMING_VIEW", payload: "success,  Timing Updated" })
            appService.updateLeaderboardListMasterData(ProviderID)


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

  return (
    <React.Fragment>
      {props.loader ?
        <Loader /> :
        null
      }
      <ResultFilter />
      <Card className="mini-stat">
        <CardHeader className="bl-bg">
          <Link to="#" className="text-white">
            <b>Leaderboard List</b>
          </Link>
          <span className="float-right">
            <Input
              className="search-elem"
              type="text"
              id="searchData"
              placeholder={"Search..."}
              onChange={() => { searchAnything() }}
            />
            <CsvDownload
              className="file-dwd ml-3"
              data={toCSV}
              filename={"LeadershipResult_Data.csv"}
            />
          </span>
        </CardHeader>

        {props.showTimingPoupup !== false ?
          <Modal

            isOpen={true}
            toggle={true}
          >
            <div className="modal-header">
              <h5 className="modal-title mt-0">Add New Timing <span style={errorMsgStyle}>(*all fields are mandetory)</span></h5>

              <button
                type="button"
                onClick={() =>
                  CloseForm()
                }
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {poupdata != undefined && poupdata.map((item) =>
                <div className="col-sm-12">
                  <div className="form-group row">
                    <Label for="name">Race Name</Label>
                    <input className="form-control d-block w-100" disabled type="text" id="race" name="race" value={item.race} />

                  </div>
                  <div className="form-group row">
                    <Label for="name">Runners</Label>
                    <input className="form-control d-block w-100" disabled type="text" id="runner" name="runner" value={item.runner} />




                  </div>
                  <div className="form-group row">
                    <Label for="name">Timing</Label>
                    <input className="form-control" type="time" id="race-time" name="RaceTime"
                      onChange={e => handleTime(e)}
                      onKeyPress={e => disableKeyPress(e)}
                      value={item.timing}
                    />

                    <Label for="name" id="timingError" style={errorMsgStyle}></Label>
                  </div>
                  <div className="form-group row">
                    <Label for="name">Race URL</Label>
                    <input className="form-control d-block w-100" type="text" id="raceURL" name="raceURL" value={item.raceURL} onChange={(event)=>handleraceurl(event)} />
                    <Label for="name" id="raceurlError" style={errorMsgStyle}></Label>

                  </div>
                  <div className="form-group row">
                    <FormControlLabel
                      value="personalBest"
                      control={<Checkbox checked={item.PB}
                        onChange={(event) => personalBestCheckedBox(event)}
                        color="primary" />}
                      label="Is this your personal best?"
                      className="-block w-100 personalBest"
                      id="best"

                    />

                    <FormControlLabel
                      value="firstRun"
                      control={<Checkbox checked={item.debut}
                        onChange={(event) => firstRunCheckedBox(event)}
                        color="primary" />}
                      label="Is this your first 'Run'?"
                      className="-block w-100 firstRun"
                      id="Run"
                    />
                  </div>

                  <div className="form-group row">
                    <button className="btn btn-block update-btn font" onClick={() => AddNewTiming(props.popupData.eventparticipantID)} id="submit">
                      Update
            </button>
                  </div>
                </div>
              )}
            </div>
          </Modal>
          : null
        }
        <Modal
          isOpen={showMessagePopup}
          toggle={false}
        >
          <div className="modal-header">
            <h5 className="modal-title mt-0">Message</h5>
            <button
              type="button"
              onClick={() =>
                closeMessageBox()
              }
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          {alertData !== "" ?
            <div className="modal-body">
              {alertData.split(',')[0] !== "success" ?
                <div class="alert alert-danger" role="alert">
                  Some error occured
                                      </div>
                :
                <div class="alert alert-success" role="alert">
                  {alertData.split(',')[1]}
                </div>
              }
            </div>
            : null}


        </Modal>


        <CardBody>
          <DataTable
            className="data-table"
            columns={columns}
            data={filteredDataForTable}
            noHeader={true}
            customStyles={headerStyle}
            fixedHeader
            selectableRows
            fixedHeaderScrollHeight="300px"
            pagination
          />
        </CardBody>
      </Card>
    </React.Fragment>
  )

}
const mapStatetoProps = state => {
  return {
    userTableData: state.userPageData.firstTableData,
    LeaderboardresultList: state.LeaderboardResult.LeaderboardresultList,
    racetableData: state.raceTableData != undefined ? state.raceTableData.tableData : null,
    runnerList: state.LeaderboardResult.runnerslist,
    GroupNameList: state.LeaderboardResult != undefined ? state.LeaderboardResult.grouplist : null,
    GenderList: state.LeaderboardResult != undefined ? state.LeaderboardResult.genderlist : null,
    LocationList: state.LeaderboardResult != undefined ? state.LeaderboardResult.locationlist : null,
    ActivityList: state.raceData != undefined ? state.raceData.activities : null,
    showTimingPoupup: state.LeaderboardResult.showTimingPoupup,
    popupData: state.LeaderboardResult.popupData,
    leaderresultmessage:state.LeaderboardResult.leaderresultmessage,
    showMessagePopup: state.LeaderboardResult != undefined ? state.LeaderboardResult.showdeletePoupup :false,
    loader:state.LeaderboardResult.loader,
    ProviderID: state.currentPageName.roleAndProvider.selectedRole.Service_Provider_ID, 
  };
};
const dispatchToProps = dispatch => {
  return {
    updateTableData: (type, payload) => {
      dispatch({ type: type, payload: payload })
    }
  }
}
export default withRouter(connect(mapStatetoProps, dispatchToProps)(Result));
