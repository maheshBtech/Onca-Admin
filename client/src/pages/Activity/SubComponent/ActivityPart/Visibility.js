import React, { Component } from "react";
import { Row, Col, Label, Input, Card, CardBody, CardHeader, Modal, Button } from "reactstrap";
import { Link } from "react-router-dom";
import MultiChipSelect from "../MultiChipSelect";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Autocomplete from "../Autocomplete";
import DataTable, { createTheme } from 'react-data-table-component';
import SearchData from '../../SubComponent/SearchData';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

let tempUserList = []
let tempSelectedArray = []
let tempNotSelectedArray = []

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
const columns = [
    {
        name: 'Runners Name',
        selector: 'Member_Name',
        sortable: true,
        wrap: true
    },
    {
        name: 'Phone Number',
        selector: 'Telephone_No',
        sortable: true
    }
];
// Selected Activity
const RunnerheaderStyle = {
    headCells: {
        style: {
            backgroundColor: "#EDECEC",
        },
    },
};



class Visibility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            duration_checkbox: false,
            selectedGroup: null,
            modal_center: false,
            modal_scroll: false,
            ActivityVisibility: { ...this.props.ActivityVisibility },
            UserList: { ...this.props.UserList },
            RunnerColumns: [
                {
                    name: 'Runners Name',
                    selector: 'Member_Name',
                    wrap: true
                },
                {
                    name: 'Mobile Number',
                    selector: 'Telephone_No',
                    wrap: true
                },
                {
                    name: 'Action',
                    cell: (row) =>
                        <div className="col-12 text-center text-danger">
                            <Button variant="contained" color="light" onClick={() => this.removeSelectedUser(row)}><HighlightOffIcon /></Button>
                        </div>
                    ,
                    button: true,
                },
            ],
        };

        this.handleACChange = this.handleACChange.bind(this)
        this.handleMCSChange = this.handleMCSChange.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleCBchange = this.handleCBchange.bind(this)
        this.searchAnything = this.searchAnything.bind(this)
        this.handleSelectedRows = this.handleSelectedRows.bind(this)
        this.removeSelectedUser = this.removeSelectedUser.bind(this)
        this.onSelectedUserSubmit = this.onSelectedUserSubmit.bind(this)
        // Modal Popup
        this.add_member = this.add_member.bind(this);
        this.tog_scroll = this.tog_scroll.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.UserList !== this.props.UserList) {
            this.setState({ UserList: this.props.UserList })
            tempNotSelectedArray = this.props.UserList
        }
        if (prevProps.ActivityVisibility !== this.props.ActivityVisibility) {
            this.setState({ ActivityVisibility: this.props.ActivityVisibility })
        }
        if (prevState.ActivityVisibility !== this.state.ActivityVisibility) {
            this.props.handleActivityVisibility(this.state.ActivityVisibility)
        }
        if(prevProps.ActivityVisibility.activitySelectedUserList !== this.props.ActivityVisibility.activitySelectedUserList || prevProps.UserList !== this.props.UserList){
            if (this.props.ActivityVisibility.activitySelectedUserList.length > 0 && this.props.UserList.length > 0) {
                let a = this.props.UserList
                this.props.ActivityVisibility.activitySelectedUserList.forEach((elem) => {
                    a = a.filter(dataObj => dataObj.User_Skey_ID !== elem.User_Skey_ID)
                })
                this.setState({ UserList: a })
                tempNotSelectedArray = a
            }
        }
    }

    removeSelectedUser = (row) => {
        let userName = row.Member_Name
        let userMobile = row.Telephone_No
        let tempArray = []
        let tempArray2 = this.state.UserList
        this.state.ActivityVisibility.activitySelectedUserList.forEach(obj => {
            if ((obj.Member_Name !== "" && obj.Member_Name !== null) && (obj.Telephone_No !== '' && obj.Telephone_No !== null)) {
                if (!(obj.Member_Name.toLowerCase().includes(userName.toLowerCase()) && obj.Telephone_No.toLowerCase().includes(userMobile.toLowerCase()))) {
                    tempArray.push(obj)
                }
                else {
                    tempArray2.push(obj)
                }
            }
        })
        this.setState(prevState => ({
            ActivityVisibility: {
                ...prevState.ActivityVisibility, activitySelectedUserList: tempArray
            }
        }));
        this.setState({ UserList: tempArray2 })
        tempNotSelectedArray = tempArray2
    }
    handleSelectedRows = (state, operation) => {
        tempSelectedArray = [...state.selectedRows]
    }
    // submit button from specific user sulection popup
    onSelectedUserSubmit = () => {
        let temp = [...this.state.ActivityVisibility.activitySelectedUserList, ...tempSelectedArray]
        this.setState(prevState => ({
            ActivityVisibility: {
                ...prevState.ActivityVisibility, activitySelectedUserList: temp
            }
        }));
        let tempArray = []
        let tempidArr = []
        temp.map((row) => { tempidArr.push(row.User_Skey_ID) })
        tempArray = this.props.UserList.filter((row) => (!tempidArr.includes(row.User_Skey_ID)))
        //this.setState({UserList: tempArray})
        tempNotSelectedArray = tempArray
        this.setState({ UserList: tempNotSelectedArray })
        tempSelectedArray = []
    }
    //SEarch 
    searchAnything = () => {
        let thingToSearch = document.getElementById("searchData").value;
        tempUserList = []
        if (thingToSearch === '') {
            this.setState({ UserList: tempNotSelectedArray })
        }
        else {
            tempNotSelectedArray.forEach(obj => {
                if ((obj.Member_Name !== "" && obj.Member_Name !== null) && (obj.Telephone_No !== '' && obj.Telephone_No !== null)) {
                    if (obj.Member_Name.toLowerCase().includes(thingToSearch.toLowerCase()) || obj.Telephone_No.toLowerCase().includes(thingToSearch.toLowerCase())) {
                        tempUserList.push(obj)
                    }
                }
            })
            this.setState({ UserList: tempUserList })
        }
    }
    // handle all checkbox
    handleCBchange = (event) => {
        let fname = event.target.name;
        let fvalue = event.target.checked;
        this.setState(prevState => ({
            ActivityVisibility: {
                ...prevState.ActivityVisibility, [fname]: fvalue
            }
        }));
    }
    // Training Locations Multichip select
    handleMCSChange = (value) => {
        let tempAcTrLoc = [];
        value.forEach(row => {
            tempAcTrLoc.push(row.Training_Location_ID)
        })
        this.setState(prevState => ({
            ActivityVisibility: {
                ...prevState.ActivityVisibility, activityTrainingLocation: tempAcTrLoc
            }
        }));
    }
    // handle activity tag
    handleInputChange = (event) => {
        let Iname = event.target.name
        let Ivalue = event.target.value
        this.setState(prevState => ({
            ActivityVisibility: {
                ...prevState.ActivityVisibility, activityParticipentLimit: Ivalue
            }
        }));
    }
    // handle all Autocomplete
    handleACChange = (value, name) => {
        this.setState(prevState => ({
            ActivityVisibility: {
                ...prevState.ActivityVisibility, [name]: value
            }
        }));
    }
    // Modal
    removeBodyCss() {
        document.body.classList.add("no_padding");
    }
    add_member(event = {}) {
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
    render() {
        const { selectedGroup } = this.state;
        return (
            <Row>
                <Col lg={6}>
                    <div className="form-group">
                        <Label for="name">Filter by Location</Label>
                        <Autocomplete
                            name="activityCountry"
                            value={this.state.ActivityVisibility.activityCountry}
                            DataList={this.props.CountryList}
                            ACType='Country'
                            handleACChange={this.handleACChange} />
                    </div>
                    <div className="form-group">
                        <Autocomplete
                            name="activityState"
                            value={this.state.ActivityVisibility.activityState}
                            DataList={this.props.StateList}
                            ACType='State'
                            handleACChange={this.handleACChange} />
                    </div>
                    <div className="form-group">
                        <Autocomplete
                            name="activityCity"
                            value={this.state.ActivityVisibility.activityCity}
                            DataList={this.props.CityList}
                            ACType='City'
                            handleACChange={this.handleACChange} />
                    </div>
                    <div className="form-group">
                        <MultiChipSelect
                            name="activityTrainingLocation"
                            placeholder='Select Training Locations'
                            value={this.state.ActivityVisibility.activityTrainingLocation}
                            handleMCSChange={this.handleMCSChange} DataList={this.props.TrainingLocationList} />
                    </div>
                    <div className="form-group mb-0">
                        <Row>
                            <Col lg={7}>
                                <Label for="participants">Maximum Limit of participants </Label>
                                <Input type="number" name='activityParticipentLimit' id="participants" value={this.state.ActivityVisibility.activityParticipentLimit}
                                    placeholder='Enter no of participents' onChange={(e) => this.handleInputChange(e)} />
                            </Col>
                            <Col lg={5} className="pl-0 mt-4">
                                <FormControlLabel
                                    value="personalBest"
                                    control={<Checkbox color="primary" name='activityWebsite' checked={this.state.ActivityVisibility.activityWebsite} onChange={this.handleCBchange} />}
                                    label="Website"
                                />
                                <FormControlLabel
                                    value="personalBest"
                                    control={<Checkbox color="primary" name='activityMobile' checked={this.state.ActivityVisibility.activityMobile} onChange={this.handleCBchange} />}
                                    label="Mobile App"
                                />
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col lg={6}>
                    <FormControlLabel
                        value="SelectedRunners"
                        control={<Checkbox color="primary" name='activitySelectedUser' checked={this.state.ActivityVisibility.activitySelectedUser} onChange={(e) => { this.add_member(e); this.handleCBchange(e) }} />}
                        label="Only for Selected Runners"
                        data-toggle="modal"
                        data-target=".bs-example-modal-center"
                    />
                    <Modal
                        isOpen={this.state.modal_center}
                        toggle={this.add_member}
                    >
                        <div className="modal-header">
                            <h5 className="modal-title mt-0">Active Runners List</h5>
                            <button
                                type="button"
                                onClick={() =>
                                    this.setState({ modal_center: false })
                                }
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Card className="mini-stat text-white">
                                <CardHeader className="bl-bg">
                                    <b>Runners List</b>
                                    {/* Search and CSV Download */}
                                    <span className="float-right">
                                        <SearchData searchAnything={this.searchAnything}></SearchData>
                                    </span>
                                </CardHeader>
                                <CardBody>
                                    <DataTable
                                        className="data-table"
                                        columns={columns}
                                        data={this.state.UserList}
                                        noHeader={true}
                                        customStyles={headerStyle}
                                        fixedHeader
                                        fixedHeaderScrollHeight="300px"
                                        pagination
                                        selectableRows
                                        //selectableRowSelected={row => row.isSelected}
                                        onSelectedRowsChange={state => this.handleSelectedRows(state, 'add')}
                                    />
                                    <button className="btn btn-block update-btn font mt-3" onClick={() => { this.onSelectedUserSubmit(); this.setState({ modal_center: false }); }}>
                                        Submit
                                  </button>
                                </CardBody>
                            </Card>
                        </div>
                    </Modal>
                    {/* Selected Runners */}
                    <DataTable
                        className="data-table mb-3"
                        columns={this.state.RunnerColumns}
                        data={this.state.ActivityVisibility.activitySelectedUserList}
                        noHeader={true}
                        customStyles={RunnerheaderStyle}
                        fixedHeader
                        fixedHeaderScrollHeight="300px"
                        pagination
                    />
                </Col>
            </Row>
        );
    }
}

export default Visibility;