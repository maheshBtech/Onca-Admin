import React, { Component } from "react";
import { Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Modal } from "reactstrap";
import AddDist from "./AddDist";
import DistanceService from "./DistanceService";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Confirmation_Message from "./Confirmation_Message";
import Information_Message from "./Information_Message";
// const DistanceData = [
//   {
//     id: 1,
//     DistanceOpt: "HM",
//     MFT: "00:00:00",
//   },
//   {
//     id: 2,
//     DistanceOpt: "FM",
//     MFT: "00:00:00",
//   },
//   {
//     id: 3,
//     DistanceOpt: "5KM's",
//     MFT: "00:00:00",
//   },
//   {
//     id: 4,
//     DistanceOpt: "25K",
//     MFT: "00:00:00",
//   },
//   {
//     id: 5,
//     DistanceOpt: "10KM's",
//     MFT: "00:00:00",
//   },
// ];
const headerStyle = {
  rows: {
    style: {
      minHeight: "80px", // override the row height
    },
  },
  headCells: {
    style: {
      backgroundColor: "#EDECEC",
    },
  },
};

//Varaiable declaration
var distanceList = [];
var filterDistanceList = [];
var distanceListBackup = [];
var userProfileDataDistance;
var serviceProviderID = 0;
var userID = 0;

const distanceListObject = (data) => {
  if (data === undefined) {
    return;
  }

  data.forEach((element) => {
    distanceList.push({
      DistanceOptionID: element.Distance_Option_ID,
      ServiceProviderID: element.Service_Provider_ID,
      DistanceOption: element.Distance_Option,
      MinimumFinishingTime: element.Minimum_Finishing_Time,
      isActivate:
        element.Active_Flag["data"]["length"] > 0
          ? element.Active_Flag["data"][0]
          : undefined,
      isDistanceDeleted: 0,
    });
  });
};

class Distance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal_center: false,
      modal_scroll: false,

      success_msg: false,
      modal_data: "",
      eventData: null,
      model_title: "",
      btn_call: "",
    };
    this.add_distance = this.add_distance.bind(this);
    this.distance_scroll = this.distance_scroll.bind(this);

    this.distanceservice = new DistanceService();
    this.getDistanceList = this.getDistanceList.bind(this);

    ///This function is for the form handling
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    //Grid button click event object
    this.RemoveDistance = this.RemoveDistance.bind(this);
    this.userProfileData = this.props.userProfileData;
    serviceProviderID = this.props.ProviderID;
    userID = this.props.UserSkeyID;
    this.state = {
      //UserRoleData: '',
      DistanceList: [],
      DistanceListBackup: [],
    };

    //
    this.state = {
      DistanceForm: {
        DistanceOpt: "",
        DistanceMFT: "",
        DistanceServiceProviderID: 0,
        DistanceIsActive: 0,
        DistanceOptID: 0,
        isDistanceDeleted: 0,
        DistanceOptError: "",
        DistanceMFTError: "",
        Err: "",
        ShowSuccessMessage: "",
      },
    };

    this.props.updateTableData('CHANGE_CURRENT_PAGE_NAME', "Distance");
  }

  validate = () => {
    let DistanceOptError = "";
    let DistanceMFTError = "";
    let Err = "";
    let defaultError = "not assigned";

    if (
      this.state.DistanceForm.DistanceOpt == "" ||
      this.state.DistanceForm.DistanceOpt == null
    ) {
      DistanceOptError = "Distance Opt";
      Err = DistanceOptError;
    }

    if (
      this.state.DistanceForm.DistanceMFT == "" ||
      this.state.DistanceForm.DistanceMFT == null
    ) {
      DistanceMFTError = "Distance MFT ";
      if (Err === "") {
        Err = DistanceMFTError;
      } else {
        Err = Err + " & " + DistanceMFTError;
      }
    }

    if (Err) {
      if (Err !== "") {
        Err = Err + " " + defaultError;
      } else {
        Err = Err + " & " + defaultError;
      }

      this.setState({
        DistanceForm: {
          ...this.state.DistanceForm,
          DistanceOptError: DistanceOptError,
          DistanceMFTError: DistanceMFTError,
          Err: Err,
        },
      });
      return false;
    } else {
      this.setState({
        DistanceForm: {
          ...this.state.DistanceForm,
          DistanceOptError: "",
          DistanceMFTError: "",
          Err: Err,
        },
      });
      return true;
    }
  };

  ///This is my first submit forms
  handleSubmit = (event) => {

    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      this.state.DistanceForm.DistanceServiceProviderID = serviceProviderID;
      this.state.DistanceForm.UserID = userID;
      //this.state.TrainingLocationForm.CityName = this.state.TrainingLocationForm.CityNamOption.value;
      let distanceFormObj = this.state.DistanceForm;
      this.distanceservice
        .CreateUpdateSettingDistance(distanceFormObj)
        .then((resp) => {
          distanceList = [];
          this.getDistanceList(serviceProviderID);
          console.log(resp);
          this.setState({
            DistanceForm: {
              ...this.state.DistanceForm,
              ShowSuccessMessage: "Distance is added successfully.",
            },
          });
        });
    }
  };

  handleChange = (event, inputIdentifier) => {
    if (inputIdentifier != undefined) {
      if ((inputIdentifier.action = "select-option")) {
        console.log("test");
        const value = event.value;
        const label = event.label;
        const name = inputIdentifier.name;

        this.setState({
          TrainingLocationForm: {
            ...this.state.TrainingLocationForm,
            [name]: value,
          },
        });
      }
    } else {
      const target = event.target;
      const value = target.type === "input" ? target.checked : target.value;
      const name = target.name;

      this.setState({
        DistanceForm: {
          ...this.state.DistanceForm,
          [name]: value,
        },
      });
    }
  };
  async componentDidMount() {

    distanceList = [];
    if (this.userProfileData != null || this.userProfileData != undefined) {
      this.getDistanceList(serviceProviderID);
    }
  }
  ///This function
  getDistanceList = (spID) => {

    this.distanceservice.GetSettingDistanceList(spID).then((resp) => {
      //UserRoleData = this.props.UserRoleData;
      distanceListObject(resp);
      this.setState({ DistanceList: distanceList, DistanceListBackup: resp });
      distanceListBackup = resp; // This is to get the record in the external world
    });
  };
  updateMemberDistance(data) {

    this.setState({
      DistanceForm: {
        DistanceOpt: data.DistanceOption,
        DistanceMFT: data.MinimumFinishingTime,
        DistanceServiceProviderID: data.ServiceProviderID,
        DistanceIsActive: data.isActivate,
        DistanceOptID: data.DistanceOptionID,
      },
    });
    this.setState((prevState) => ({
      modal_center: !prevState.modal_center,
    }));
    this.removeBodyCss();
  }

  RemoveDistance = (event, data, btnCall) => {
    event.preventDefault();
    //the condition message before delete
    this.setState({
      btn_call: btnCall,
      eventData: event,
      success_msg: true,
      modal_data: data,
      model_title: "Are you sure you want to remove",
    });
  };

  onConfirmClick() {
    switch (this.state.btn_call) {
      case "Rmv": {
        this.state.eventData.preventDefault();
        let data =
          this.state.modal_data == "" || undefined ? "" : this.state.modal_data;
        this.setState({ success_msg: false });
        let objData = this.state.modal_data;

        objData.isDistanceDeleted = 1;
        this.distanceservice
          .RemoveSetDistance(this.state.modal_data, 1)
          .then((resp) => {
            distanceList = [];
            this.getDistanceList(this.serviceProviderID);
            this.setState({
              with_title: true,
              model_title: "Thanks, transaction is completed successfully!!!",
            });
            console.log(resp);
          });
        break;
      }
      default: {
        break;
      }
    }

    //Again reset the state
    this.setState({
      btn_call: "",
      eventData: null,
      success_msg: false,
      modal_data: null,
      model_title: "",
    });
  }
  CancelBtn() {
    this.setState({ success_msg: false });
  }
  Information_MessageBtn() {
    this.setState({ with_title: false });
  }

  // Modal Popup
  removeBodyCss() {
    document.body.classList.add("no_padding");
  }
  add_distance() {
    this.setState((prevState) => ({
      modal_center: !prevState.modal_center,
      DistanceForm: {
        DistanceOpt: "",
        DistanceMFT: "",
        DistanceServiceProviderID: 0,
        DistanceIsActive: 0,
        DistanceOptID: 0,
        DistanceOptError: "",
        DistanceMFTError: "",
        Err: "",
        ShowSuccessMessage: "",
      },
    }));
    this.removeBodyCss();
  }
  distance_scroll() {
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

  columns = [
    {
      name: "Distance Options",
      selector: "DistanceOption",
      sortable: true,
      wrap: true,
    },
    {
      name: "Minimum Finishing Timing",
      selector: "MinimumFinishingTime",
      sortable: true,
      wrap: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="col-12">
          <Button
            className="btn update-btn mb-2 mt-2"
            variant="contained"
            type="button"
            data-toggle="modal"
            data-target=".bs-example-modal-center"
            onClick={() => this.updateMemberDistance(row)}
          >
            View &amp; Update
          </Button>

          <Button
            className="btn remove-btn mb-2"
            variant="contained"
            type="button"
            onClick={(event) => this.RemoveDistance(event, row, "Rmv")}
          >
            Remove
          </Button>
        </div>
      ),
      button: true,
    },
  ];
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/#">Settings</Link>
                  </li>
                  <li className="breadcrumb-item active">Distance</li>
                </ol>
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={12} className="text-right">
              <button
                className="btn update-btn mb-3"
                onClick={this.add_distance}
                data-toggle="modal"
                data-target=".bs-example-modal-center"
              >
                Add Distance
              </button>
              {this.state.success_msg ? (
                <Confirmation_Message
                  title={this.state.model_title}
                  modelOkButtonClicked={this.onConfirmClick.bind(this)}
                  success_msg={true}
                  modelCancelButtonClicked={() => this.CancelBtn()}
                />
              ) : null}

              {this.state.with_title ? (
                <Information_Message
                  title={this.state.model_title}
                  modelOkButtonClicked={() => this.Information_MessageBtn()}
                ></Information_Message>
              ) : null}
              <Modal
                isOpen={this.state.modal_center}
                toggle={this.add_distance}
              >
                <div className="modal-header">
                  <h5 className="modal-title mt-0">Add Distance</h5>
                  <button
                    type="button"
                    onClick={() => this.setState({ modal_center: false })}
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <AddDist
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    distanceForm={this.state.DistanceForm}
                  />
                </div>
              </Modal>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Card className="mini-stat">
                <CardHeader className="bl-bg text-white">
                  <b>Distance List</b>
                  <span className="float-right"></span>
                </CardHeader>
                <CardBody>
                  <DataTable
                    className="data-table"
                    columns={this.columns}
                    data={this.state.DistanceList}
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
const mapStatetoProps = (state) => {
  return {
    userProfileData: state.userProfileData.ProfileData,
    ProviderID: state.currentPageName.roleAndProvider.selectedRole.Service_Provider_ID,
    UserSkeyID: state.userProfileData != undefined ? state.userProfileData.ProfileData[0][0].User_Skey_ID : null,
  };
};

const dispatchToProps = (dispatch) => {
  return {
    updateTableData: (type, payload) => {
      dispatch({ type: type, payload: payload });
    },
  };
};
export default withRouter(connect(mapStatetoProps, dispatchToProps)(Distance));
