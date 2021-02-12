import React, { Component } from "react";
import TrainingLocationService from '../TrainingLoc/TrainingLocationService';
import CsvDataDownload from '../TrainingLoc/SubComponents/CSVDataDownload';
import SearchData from '../TrainingLoc/SubComponents/SearchData';
import AddTrainingLoc from '../TrainingLoc/SubComponents/AddTrainingLoc';
import Confirmation_Message from '../TrainingLoc/SubComponents/Confirmation_Message';
import Information_Message from '../TrainingLoc/SubComponents/Information_Message';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import {
    Row,
    Col,
    Card,
    CardBody,
    CardHeader,
    Button,
    Label,
    Input
} from "reactstrap";
import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component';
import { Modal } from "reactstrap";
import Select from "react-select";

const headerStyle = {
    headCells: {
        style: {
            backgroundColor: "#EDECEC",
        },
    },
};

//Varaiable declaration
var trainingLocationList = [];
var filterTrainingLocationList = [];
var trainingLocationListBackup = [];
var userProfileDataTL;
var serviceProviderID = 0;
var city = [];
var cityOptionGroup = [];
var state = [];
var stateOptionGroup = [];
var country = [];
var countryOptionGroup = [];
var userId = 0;
const optionGroup = [
    {
        options: [
            { label: "Mustard", value: "Mustard" },
            { label: "Ketchup", value: "Ketchup" },
            { label: "Relish", value: "Relish" }
        ]
    }
];
const stateListObj = (data) => {
    if (data === undefined) {
        return;
    };
    let optionsState = [];
    data.forEach(element => {
        optionsState.push({ label: element.State_Name, value: element.State_ID });
    });

    stateOptionGroup = [{ options: optionsState }];
}
const cityListObj = (data) => {
    if (data === undefined) {
        return;
    };
    let optionsCity = [];
    data.forEach(element => {
        optionsCity.push({ label: element.City_Name, value: element.City_ID });
    });

    cityOptionGroup = [{ options: optionsCity }];
}
const countryListObj = (data) => {
    if (data === undefined) {
        return;
    };
    let optionsCountry = [];
    data.forEach(element => {
        optionsCountry.push({ label: element.Country_Name, value: element.Country_ID });
    });

    countryOptionGroup = [{ options: optionsCountry }];
}
const trainingLocationListObject = (data) => {
    if (data === undefined) {
        return;
    }

    data.forEach(element => {
        trainingLocationList.push({
            TrainingLocationId: element.Training_Location_ID,
            TrainingLocationName: element.Training_Location_Name,
            TrainingLocationCode: element.Training_Location_Code,
            TrainingLocationCity: element.City_Name,
            TrainingLocationState: element.State_Name,
            TrainingLocationCountry: element.Country_Name,
            TrainingLocationCountryID: element.Country_ID,
            isActivate: element.Active_Flag["data"]["length"] > 0 ? element.Active_Flag["data"][0] : undefined,
            TrainingLocationStatus: element.Active_Flag["data"]["length"] > 0 ? element.Active_Flag["data"][0] == 1 ? 'Active' : 'DeActivate' : undefined,
            TLServiceProviderID: element.Service_Provider_ID,
            isTrainingLocationDeleted: 0,
            UserID: 1,
            // UserTypeID: element.User_Type_ID,
            // UserTypeName: element.User_Type_Name,
            // UserTypeDesc:element.User_Type_Desc,
            // Discount: element.Discount,
            // isUserTypeActive: element.User_Type_Active_Flag,
            // ServiceProviderID: element.Service_Provider_ID,
            // isActivate: element.User_Type_Active_Flag["data"]["length"] > 0 ? element.User_Type_Active_Flag["data"][0] : undefined,
            // isUserTypeDeleted: 0
        });
    });
}

class TrainingLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_center: false,
            modal_scroll: false,
            //selectedGroup: null,
            success_msg: false,
            modal_data: "",
            eventData: null,
            model_title: "",
            btn_call: "",
        };
        this.handleSelectGroup = this.handleSelectGroup.bind(this);
        this.add_member = this.add_member.bind(this);
        this.tog_scroll = this.tog_scroll.bind(this);

        this.traininglocationservice = new TrainingLocationService();
        this.getTrainingLocationList = this.getTrainingLocationList.bind(this)
        this.searchAnything = this.searchAnything.bind(this);

        ///This function is for the form handling
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeSelectedOptionCountry = this.handleChangeSelectedOptionCountry.bind(this);
        this.handleChangeSelectedOptionCity = this.handleChangeSelectedOptionCity.bind(this);
        this.handleChangeSelectedOptionState = this.handleChangeSelectedOptionState.bind(this);

        //Grid button click event object
        this.RemoveTL = this.RemoveTL.bind(this);
        this.ActivateSuspendTL = this.ActivateSuspendTL.bind(this);

        this.state = {
            //UserRoleData: '',
            TrainingLocationList: [],
            TrainingLocationListBackup: []

        };


        //
        this.state = {
            TrainingLocationForm: {
                LocationName: "",
                LocationCode: "",
                CountryName: "",
                StateName: "",
                CityName: "",
                CountryNameOption: null,
                StateNameOption: null,
                CityNamOption: null,


                TrainingLocationID: 0,
                c: 0,
                LocationNameError: "",
                LocationCodeError: "",
                CountryNameError: "",
                StateNameError: "",
                CityNameError: "",
                Err: "",
                ShowSuccessMessage: ""
            }
        };

        userProfileDataTL = this.props.userProfileData;
        this.props.updateTableData('CHANGE_CURRENT_PAGE_NAME', "Training Location");
        serviceProviderID = this.props.ProviderID;
        userId = this.props.UserSkeyID;
    }

    columns = [
        {
            name: 'Training Location',
            selector: 'TrainingLocationName',
            sortable: true,
            wrap: true,
            width: '140px',
            cell: (row) => <div>{row.TrainingLocationName} ({row.TrainingLocationCode})</div>
        },
        {
            name: 'City',
            selector: 'TrainingLocationCity',
            sortable: true,
        },
        {
            name: 'State',
            selector: 'TrainingLocationState',
            sortable: true,
        },
        {
            name: 'Country',
            selector: 'TrainingLocationCountry',
            sortable: true,
        },
        {
            name: 'Status',
            selector: 'TrainingLocationStatus',
            sortable: true,
            wrap: true,
        },
        {

            name: 'Action',
            cell: (row) =>
                <Button variant="contained" color="light"
                    type="button"
                    onClick={() => this.updateMemberTL(row)}
                    data-toggle="modal"
                    data-target=".bs-example-modal-center"
                    className="update-btn"
                >Update</Button>,
            button: true,
            width: "115px"

        },
        {
            cell: (row) => (row.isActivate) ? <Button className="btn-warning" variant="contained" onClick={(event) => this.ActivateSuspendTL(event, row, "Sus")}>Suspend</Button>
                : <Button color="success" className="btn success-btn" variant="contained" onClick={(event) => this.ActivateSuspendTL(event, row, "Act")}>Activate</Button>,
            button: true,
            width: "115px"
        },
        {
            cell: (row) => <Button className="btn remove-btn" variant="contained" onClick={(event) => this.RemoveTL(event, row, "Rmv")}>Remove</Button>,
            button: true,
            width: "115px"
        },
    ];
    validate = () => {
        let LocationNameError = "";
        let LocationCodeError = "";
        let CountryNameError = "";
        let StateNameError = "";
        let CityNameError = "";
        let Err = "";
        let defaultError = "not assigned";

        if (this.state.TrainingLocationForm.LocationName == "" || this.state.TrainingLocationForm.LocationName == null) {
            LocationNameError = "Location name";
            Err = LocationNameError;
        }

        if (this.state.TrainingLocationForm.LocationCode == "" || this.state.TrainingLocationForm.LocationCode == null) {
            LocationCodeError = "Location code ";
            if (Err === "") {
                Err = LocationCodeError;
            }
            else {
                Err = Err + " & " + LocationCodeError;
            }
        }

        if (this.state.TrainingLocationForm.CountryName == "" || this.state.TrainingLocationForm.CountryName == null) {
            CountryNameError = "Country name ";
            if (Err === "") {
                Err = CountryNameError;
            }
            else {
                Err = Err + " & " + CountryNameError;
            }
        }

        if (this.state.TrainingLocationForm.StateName == "" || this.state.TrainingLocationForm.StateName == null) {
            StateNameError = "State name";
            if (Err === "") {
                Err = StateNameError;
            }
            else {
                Err = Err + " & " + StateNameError;
            }
        }

        if (this.state.TrainingLocationForm.CityName == "" || this.state.TrainingLocationForm.CityName == null) {
            CityNameError = "City name";
            if (Err === "") {
                Err = CityNameError;
            }
            else {
                Err = Err + " & " + CityNameError;
            }
        }
        // if (this.state.UserTypeForm.UserTypeDesc == "" || this.state.UserTypeForm.UserTypeDesc == null)
        // {
        //     UsertTypeDescError = "User Type Desc";
        //     if(Err === "") {
        //         Err = UsertTypeDescError;
        //     }
        //     else{
        //         Err = Err + " & " + UsertTypeDescError;
        //     }
        // }

        if (Err) {
            if (Err !== "") {
                Err = Err + " " + defaultError;
            } else {
                Err = Err + " & " + defaultError;
            }

            this.setState({
                TrainingLocationForm: {
                    ...this.state.TrainingLocationForm,
                    LocationNameError: LocationNameError,
                    LocationCodeError: LocationCodeError,
                    CountryNameError: CountryNameError,
                    StateNameError: StateNameError,
                    CityNameError: CityNameError,
                    Err: Err
                }
            });
            return false;
        }
        else {
            this.setState({

                TrainingLocationForm: {
                    ...this.state.TrainingLocationForm,
                    LocationNameError: "",
                    LocationCodeError: "",
                    CountryNameError: "",
                    StateNameError: "",
                    CityNameError: "",
                    Err: Err
                }
            });
            return true;
        }

    }

    ///This is my first submit forms
    handleSubmit = (event) => {

        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            this.state.TrainingLocationForm.ServiceProviderID = serviceProviderID;
            this.state.TrainingLocationForm.UserID = userId;
            //this.state.TrainingLocationForm.CityName = this.state.TrainingLocationForm.CityNamOption.value;
            let trainingLocationFormObj = this.state.TrainingLocationForm;
            this.traininglocationservice.CreateUpdateSettingLocation(trainingLocationFormObj)
                .then(resp => {
                    trainingLocationList = [];
                    this.getTrainingLocationList();
                    console.log(resp);
                    this.setState({


                        TrainingLocationForm: {
                            ...this.state.TrainingLocationForm,
                            ShowSuccessMessage: "Training location is added successfully. "

                        }
                    });

                    // Refresh the grid
                    this.getTrainingLocationList(serviceProviderID);
                });
        }
    }

    handleChange = (event, inputIdentifier) => {

        if (inputIdentifier != undefined) {
            if (inputIdentifier.action = "select-option") {
                console.log('test');
                const value = event.value;
                const label = event.label;
                const name = inputIdentifier.name;

                this.setState({
                    TrainingLocationForm: {
                        ...this.state.TrainingLocationForm,
                        [name]: value
                    }
                });
            }
        }
        else {
            const target = event.target;
            const value = target.type === 'input' ? target.checked : target.value;
            const name = target.name;

            this.setState({
                TrainingLocationForm: {
                    ...this.state.TrainingLocationForm,
                    [name]: value
                }
            });
        }

    }

    handleChangeSelectedOptionCountry = (SelectedOption) => {

        this.setState({
            TrainingLocationForm: {
                ...this.state.TrainingLocationForm,
                CountryNameOption: SelectedOption,
                CountryName: SelectedOption.value,
            }
        });
        //console.log(`Option selected:`, SelectedOption);
    };
    handleChangeSelectedOptionCity = (SelectedOption) => {

        this.setState({
            TrainingLocationForm: {
                ...this.state.TrainingLocationForm,
                CityNameOption: SelectedOption,
                CityName: SelectedOption.value,
            }
        });
        //console.log(`Option selected:`, SelectedOption);
    };
    handleChangeSelectedOptionState = (SelectedOption) => {

        this.setState({
            TrainingLocationForm: {
                ...this.state.TrainingLocationForm,
                StateNameOption: SelectedOption,
                StateName: SelectedOption.value,
            }
        });
        console.log(`Option selected:`, SelectedOption);
    };
    //SEarch 
    searchAnything = () => {
        let thingToSearch = document.getElementById("searchData").value;
        trainingLocationList = [];
        if (thingToSearch != "") {
            filterTrainingLocationList = this.traininglocationservice.filterByValue(this.state.TrainingLocationListBackup, thingToSearch);
            trainingLocationListObject(filterTrainingLocationList);
        }
        else {

            trainingLocationListObject(this.state.TrainingLocationListBackup);
        }
        this.setState({ TrainingLocationList: trainingLocationList });
    }

    async componentDidMount() {

        trainingLocationList = [];
        if (userProfileDataTL != null || userProfileDataTL != undefined) {
            this.getTrainingLocationList(serviceProviderID);

        }
    }
    ///This function 
    getActivityDropdownDataList = (spID) => {
        this.traininglocationservice.GetActivityDropdownDataList(spID)
            .then(resp => {

                //console.log("activity down")
                //console.log(resp);
                state = resp[6];
                stateListObj(state);
                city = resp[7];
                cityListObj(city);
                country = resp[5];
                countryListObj(country);

            });
    }
    ///This function 
    getTrainingLocationList = (spID) => {
        this.traininglocationservice.GetSettingLoctionList(spID)
            .then(resp => {

                //UserRoleData = this.props.UserRoleData;
                trainingLocationListObject(resp);
                this.setState({ TrainingLocationList: trainingLocationList, TrainingLocationListBackup: resp });
                trainingLocationListBackup = resp; // This is to get the record in the external world
                this.getActivityDropdownDataList(spID);
            });
    }

    removeBodyCss() {
        document.body.classList.add("no_padding");
    }
    add_member() {
        this.setState(prevState => ({
            modal_center: !prevState.modal_center,
            TrainingLocationForm: {
                LocationName: "",
                LocationCode: "",
                CountryName: "",
                StateName: "",
                CityName: "",
                TrainingLocationID: 0,
                ServiceProviderID: 0,
                LocationNameError: "",
                LocationCodeError: "",
                CountryNameError: "",
                StateNameError: "",
                CityNameError: "",
                Err: "",
                ShowSuccessMessage: ""
            }
        }));
        this.removeBodyCss();
    }
    updateMemberTL(data) {
        //Filter the State and City
        let cityData = this.traininglocationservice.filterByValueCity(cityOptionGroup[0].options, data.TrainingLocationCity)
        let stateData = this.traininglocationservice.filterByValueState(stateOptionGroup[0].options, data.TrainingLocationState)
        let countryData = this.traininglocationservice.filterByValueCountry(countryOptionGroup[0].options, data.TrainingLocationCountry)


        this.setState({
            TrainingLocationForm: {
                LocationName: data.TrainingLocationName,
                LocationCode: data.TrainingLocationCode,
                CountryName: countryData.value,
                CountryNameOption: countryData,
                StateName: stateData.value,
                StateNameOption: stateData,
                CityName: cityData.value,
                CityNameOption: cityData,
                TrainingLocationID: data.TrainingLocationId,
                ServiceProviderID: data.TLServiceProviderID,

            }
        });
        this.setState(prevState => ({
            modal_center: !prevState.modal_center
        }));
        this.removeBodyCss();
    }

    ActivateSuspendTL = (event, data, btnCall) => {
        event.preventDefault();
        let modalTitle = "";
        if (btnCall == "Sus") {
            modalTitle = "Are you sure you want to Suspend TrainingLocation";
        }
        else if (btnCall == "Act") {
            modalTitle = "Are you sure you want to Activate TrainingLocation";
        }
        //the condition message before delete
        this.setState({ btn_call: btnCall, eventData: event, success_msg: true, modal_data: data, model_title: modalTitle });
    }


    RemoveTL = (event, data, btnCall) => {
        event.preventDefault();
        //the condition message before delete
        this.setState({ btn_call: btnCall, eventData: event, success_msg: true, modal_data: data, model_title: "Are you sure you want to remove" });
    }


    onConfirmClick() {

        switch (this.state.btn_call) {
            case "Sus": {
                this.state.eventData.preventDefault();
                let data = this.state.modal_data == "" || undefined ? "" : this.state.modal_data;
                this.setState({ success_msg: false });
                let objData = this.state.modal_data;
                objData.isActivate = 0;
                this.traininglocationservice.ActivateSuspendSetLoc(objData)
                    .then(resp => {
                        trainingLocationList = [];
                        this.getTrainingLocationList(objData.TLServiceProviderID);
                        this.setState({ with_title: true, model_title: "Thanks, transaction is completed successfully!!!" });
                        console.log(resp);
                    });

                break;
            }
            case "Act": {

                this.state.eventData.preventDefault();
                let data = this.state.modal_data == "" || undefined ? "" : this.state.modal_data;
                this.setState({ success_msg: false });
                let objData = this.state.modal_data;
                objData.isActivate = 1;
                this.traininglocationservice.ActivateSuspendSetLoc(objData)
                    .then(resp => {
                        trainingLocationList = [];
                        this.getTrainingLocationList(objData.TLServiceProviderID);
                        this.setState({ with_title: true, model_title: "Thanks, transaction is completed successfully!!!" });
                        console.log(resp);
                    });
                break;
            }
            case "Rmv": {

                this.state.eventData.preventDefault();
                let data = this.state.modal_data == "" || undefined ? "" : this.state.modal_data;
                this.setState({ success_msg: false });
                let objData = this.state.modal_data;

                objData.isTrainingLocationDeleted = 1;
                this.traininglocationservice.RemoveSetLoc(this.state.modal_data)
                    .then(resp => {
                        trainingLocationList = [];
                        this.getTrainingLocationList(objData.TLServiceProviderID);
                        this.setState({ with_title: true, model_title: "Thanks, transaction is completed successfully!!!" });
                        console.log(resp);
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
    CancelBtn() {
        this.setState({ success_msg: false });
    }
    Information_MessageBtn() {
        this.setState({ with_title: false });
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
    //Select
    handleSelectGroup = selectedGroup => {
        this.setState({ selectedGroup });
    };
    render() {
        //const { selectedGroup } = this.state;
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <Row className="align-items-center">
                        <Col sm={6}>
                            <div className="page-title-box">
                                <ol className="breadcrumb mb-0">
                                    <li className="breadcrumb-item">
                                        Settings
                                    </li>
                                    <li className="breadcrumb-item active">Training Location</li>
                                </ol>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={12} className="text-right mb-4">
                            <Button type="button"
                                className="btn update-btn"
                                onClick={this.add_member}
                                data-toggle="modal"
                                data-target=".bs-example-modal-center">
                                Add Training Location
                            </Button>

                            {this.state.success_msg ? (
                                <Confirmation_Message title={this.state.model_title}
                                    modelOkButtonClicked={this.onConfirmClick.bind(this)}
                                    success_msg={true} modelCancelButtonClicked={() => this.CancelBtn()} />
                            ) : null}

                            {this.state.with_title ? (
                                <Information_Message title={this.state.model_title}
                                    modelOkButtonClicked={() => this.Information_MessageBtn()}
                                ></Information_Message>
                            ) : null}

                            <Modal
                                isOpen={this.state.modal_center}
                                toggle={this.add_member}
                            >
                                <div className="modal-header">
                                    <h5 className="modal-title mt-0">Add Training Location</h5>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            this.setState({
                                                modal_center: false,
                                                TrainingLocationForm: {
                                                    ShowSuccessMessage: ""
                                                }
                                            })
                                        }
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <AddTrainingLoc handleSubmit={this.handleSubmit} handleChange={this.handleChange}
                                    trainingLocationForm={this.state.TrainingLocationForm}
                                    handleChangeSelectedOptionState={this.handleChangeSelectedOptionState}
                                    handleChangeSelectedOptionCity={this.handleChangeSelectedOptionCity}
                                    handleChangeSelectedOptionCountry={this.handleChangeSelectedOptionCountry}
                                    cityOptionGroup={cityOptionGroup} stateOptionGroup={stateOptionGroup} countryOptionGroup={countryOptionGroup}></AddTrainingLoc>
                            </Modal>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={12}>
                            <Card className="mini-stat">
                                <CardHeader className="bl-bg">
                                    <Link to="#" className="text-white">
                                        <b>Location List</b>
                                    </Link>
                                    <span className="float-right">
                                        <SearchData searchAnything={this.searchAnything}></SearchData>
                                        <CsvDataDownload TrainingLocationListToDownload={trainingLocationList} />
                                    </span>
                                </CardHeader>
                                <CardBody>
                                    <DataTable
                                        className="data-table"
                                        columns={this.columns}
                                        data={this.state.TrainingLocationList}
                                        noHeader={true}
                                        customStyles={headerStyle}
                                        fixedHeader
                                        fixedHeaderScrollHeight="300px"
                                        pagination
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    return {
        userProfileData: state.userProfileData.ProfileData,
        ProviderID: state.currentPageName.roleAndProvider.selectedRole.Service_Provider_ID,
        UserSkeyID: state.userProfileData != undefined ? state.userProfileData.ProfileData[0][0].User_Skey_ID : null,
    };
};

const dispatchToProps = dispatch => {
    return {
        updateTableData: (type, payload) => {
            dispatch({ type: type, payload: payload })
        }
    }
}

export default withRouter(connect(mapStatetoProps, dispatchToProps)(TrainingLocation));;
