import React, { useState, useEffect, Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Row, Col, Label, Input } from "reactstrap";
import MultiChipSelect from "../SubComponent/MultiChipSelect";
import DataTable, { createTheme } from 'react-data-table-component';
import SearchData from '../SubComponent/SearchData';
import CsvDownload from 'react-json-to-csv'
import { connect } from "react-redux";
import dateFormat from 'dateformat';
import AppService from "../../../AppService"
import { leaderboardRacebyID, DeleteleaderboardRace } from "../../../AppConfig"
import store from "../../../store";
import { Modal } from "reactstrap";
import { BrowserRouter, Route } from 'react-router-dom'
// import { browserHistory } from 'react-router'
import { useHistory } from "react-router-dom";

import {
    Card,
    CardBody,
    CardHeader,
    Button
} from "reactstrap";



const appService = new AppService();

var reaceList = [];
const UsersActvitiesData = [
    {
        id: 1,
        RaceName: 'THE RE-CHARGE RUN 42K',
        Distance: '42  KMs',
        DateTime: '03 October, 2020 06:00 AM',
        Duration: '39 Hours',
    },
    {
        id: 2,
        RaceName: 'THE RE-CHARGE RUN 25K',
        Distance: '25 KMs',
        DateTime: '03 October, 2020 06:00 AM',
        Duration: '39 Hours',
    },
    {
        id: 3,
        RaceName: 'THE RE-CHARGE RUN 21K',
        Distance: '21 KMs',
        DateTime: '03 October, 2020 06:00 AM',
        Duration: '39 Hours',
    },
    {
        id: 4,
        RaceName: 'THE RE-CHARGE RUN 10K',
        Distance: '10 KMs',
        DateTime: '03 October, 2020 06:00 AM',
        Duration: '39 Hours',
    },
    {
        id: 5,
        RaceName: 'BREAKTHROUGH 10K Virtual Run',
        Distance: '10 KMs',
        DateTime: '13 June, 2020 05:30 AM',
        Duration: '5 Hours',
    }
];
const headerStyle = {
    rows: {
        style: {
            minHeight: '100px', // override the row height
        }
    },
    headCells: {
        style: {
            backgroundColor: "#EDECEC",
        },
    },
};

function RaceData(props) {
    const [showMessagePopup, setShowMessagePopup] = useState(false);
    const [rawTableData, setrawTableData] = useState();
    const [toCSV, setToCSV] = useState(null)
    const [filteredDataForTable, setFilteredDataForTable] = useState(rawTableData)
    const [alertData, setAlertData] = useState("")

    const columns = [
        {
            name: 'Race Name',
            selector: 'Fitness_Event_Name',
            sortable: true,
            wrap: true
        },
        {
            name: 'Distance',
            selector: 'Fitness_Event_Type',
            sortable: true
        },
        {
            name: 'Date & Time',
            selector: 'Date',
            sortable: true,
            wrap: true
        },
        {
            name: 'Duration',
            selector: 'Duration_In_Hours',
            sortable: true,
            wrap: true
        },
        {
            name: 'Action',
            cell: (row) => <Link to="/add-race"><Button className=" mr-4 btn update-btn" variant="contained" color="light" onClick={() => ViewandUpdateRace(row)}>View &amp; Update</Button></Link>,
            button: true,
        },
        {
            cell: (row) => <Button variant="contained" color="light" className="btn remove-btn" onClick={() => removeRace(row)}>Remove</Button>,
            button: true,
        },
    ];

    useEffect(() => {
        if (props.racetableData != "") {
            let racedata = props.racetableData
            racedata.forEach(function (e) {
                if (typeof e === "object") {
                    e["Date"] = "";
                }
            });
            racedata.map((item, index) => {
                let racetime = item.Start_Time
                let time12hrs = item.Start_Time
                var hours = Number(time12hrs.match(/^(\d+)/)[1]);
                var minutes = Number(time12hrs.match(/:(\d+)/)[1]);

                var AmOrPm = hours <= 12 ? 'AM' : 'PM';

                hours = (hours % 12) || 12;
                var sHours = hours.toString();
                var sMinutes = minutes.toString();
                let finalTime = sHours + ":" + sMinutes + " " + AmOrPm;
                let d = new Date(item.From_Date)
                let datewithouttime = d.toISOString().split('T')[0]
                let raceDate = dateFormat(datewithouttime, "mmm d, yyyy") + " & " + finalTime
                racedata[index].Date = raceDate;

            })
        }

        setrawTableData(props.racetableData)
        console.log(props.racetableData)
        setFilteredDataForTable(props.racetableData)
        prepareFileToDownload(props.racetableData)
    }, [props.racetableData]);

    useEffect(() => {
        if (props.showMessagePopup !== "") {
            setAlertData(props.showMessagePopup)
            setShowMessagePopup(true)
        }
    }, [props.showMessagePopup])

    const prepareFileToDownload = (rawData) => {

        if ((rawData !== "" || rawData !== undefined || rawData !== null) && rawData.length > 0) {
            let filterData = []
            rawData.forEach(obj => {
                filterData.push({ "Race Name": obj.Fitness_Event_Name, "Distance": obj.Fitness_Event_Type, "Date & Time": obj.Date, "Duration": obj.Duration_In_Hours })
            })
            setToCSV(filterData)
        }
    }


    const removeRace = (row) => {
        let RaceDetailID = row.Fitness_Detail_ID;
        let data = { raceID: RaceDetailID }
        let url = ''
        //store.dispatch({ type: "MESSAGE_POPUP_DATA", payload: "success,Race removed successfully." })
        appService.GetraceDataFromApiget(DeleteleaderboardRace, data)
            .then(response => {
                if (response.status == 200) {
                    appService.updateRaceMasterData()
                    store.dispatch({ type: "MESSAGE_POPUP_DATA", payload: "success,User removed successfully." })
                }
            })
            .catch(err => { alert("error occured") })
    }

    const ViewandUpdateRace = (row) => {
        let RaceDetailID = row.Fitness_Detail_ID;

        let data = { raceID: RaceDetailID }
        let url = leaderboardRacebyID
        let selectedData = [], racelist = []

        racelist = props.racetableData
        selectedData = racelist.filter(racedata => racedata.Fitness_Detail_ID === RaceDetailID)[0]
        store.dispatch({ type: "CHANGE_RACE_DATA", payload: selectedData })
        // appService.GetraceDataFromApiget(url, data)
        //     .then(response => {
        //         if (response.status == 200) {
        //             store.dispatch({ type: 'CHANGE_RACE_VIEW', payload: true })
        //             store.dispatch({ type: "CHANGE_RACE_DATA", payload: response.data[0] })
        //             // console.log(this.props.history)


        //             // this.context.router.history.push(`/add-race`)
        //             // browserHistory.push('/add-race')

        //            // window.location = "/add-race";
        //         }
        //     })
    }
    const closeMessageBox = () => {
        setShowMessagePopup(false)
        store.dispatch({ type: "MESSAGE_POPUP_DATA", payload: "" })
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
                if (obj.Fitness_Event_Name.toLowerCase().includes(thingToSearch.toLowerCase()) || obj.Fitness_Event_Type.toLowerCase().includes(thingToSearch.toLowerCase()) || obj.Date.toString().toLowerCase().includes(thingToSearch.toLowerCase()) || obj.Duration_In_Hours.toString().includes(thingToSearch)) {
                    filterDataToShow.push(obj)
                }
            });
            setFilteredDataForTable(filterDataToShow)
            prepareFileToDownload(filterDataToShow)
        }

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
                                    Race
                                    </li>
                            </ol>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xl={12} className="text-right mb-4">
                        <Link to="/add-race">
                            <button type="button"
                                className="btn update-btn font mr-2" >
                                Add Race
              </button>
                        </Link>
                    </Col>
                </Row>
                <Card className="mini-stat">
                    <CardHeader className="bl-bg">
                        <Link to="#" className="text-white">
                            <b>Race List</b>
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
                                filename={"Race_Data.csv"}
                            />
                        </span>
                    </CardHeader>
                    {/* add member message popup */}

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
                            fixedHeaderScrollHeight="300px"
                            pagination
                        />
                    </CardBody>
                </Card>
            </div>
        </React.Fragment>
    )

}

const mapStatetoProps = state => {
    return {
        userTableData: state.userPageData.firstTableData,

        racetableData: state.raceTableData != undefined ? state.raceTableData.tableData : null,
        showMessagePopup: state.raceData != undefined ? state.raceData.racedeletemessage : ""

    };
};
const dispatchToProps = dispatch => {
    return {
        updateTableData: (type, payload) => {
            dispatch({ type: type, payload: payload })
        }
    }
}
export default withRouter(connect(mapStatetoProps, dispatchToProps)(RaceData));

