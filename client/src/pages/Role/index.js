import React, { Component } from "react";
import { Row, Col, Label, Input, } from "reactstrap";
import Cards from "./Cards/Cards";
import RoleData from "./SubComponent/RoleData";
import MultiChipSelect from "./SubComponent/MultiChipSelect";
import { Modal } from "reactstrap";
import { connect } from "react-redux";
import { roleDataURL, assginRoleURL, listRoleURL, roleUserList, leaderboardRace } from '../../AppConfig'
import { withRouter } from 'react-router-dom';
import AppService from '../../AppService'
import Loader from "../../components/Loader";
import store from "../../store";
import Cookies from 'universal-cookie';
import Autocomplete from '@material-ui/lab/Autocomplete';

const cookies = new Cookies();
class Role extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal_center: false,
      modal_scroll: false,
      urlTableData: roleDataURL,
      rawTableData: "",
      roleCount: "",
      selectedRoles: 0,
      loader: true,
      MasterRoletableData: "",
      showMessagePopup: false,
      showAlertBox: false,
      alertData: "",
      emailOfNewMember: "",
      rawUserList: "",
      modifiedUserList: '',
      newUserNumber: '',
      isValid: false,

    };
    this.appService = new AppService();
    this.add_member = this.add_member.bind(this);
    this.tog_scroll = this.tog_scroll.bind(this);
    this.messageModal = this.messageModal.bind(this);
    this.props.updateTableData('CHANGE_CURRENT_PAGE_NAME', 'Role')
    this.getAllData();
    this.loadTotalRoleData();
    this.loadUserList();

  }
  // to load list of role, country
  loadTotalRoleData() {
    this.appService.GetDataFromApiPost(listRoleURL, null)
      .then((response) => {
        console.log("role data list")
        if (response.status == 200) {
          store.dispatch({ type: 'TOTAL_ROLE_LIST', payload: response.data[1] });
          store.dispatch({ type: 'CHANGE_COUNTRY_LIST', payload: response.data[8] })
          store.dispatch({ type: 'CHANGE_STATE_LIST', payload: response.data[9] })   
          store.dispatch({ type: 'CHANGE_CITY_LIST', payload: response.data[10] })  
        }
      })
  }
  loadUserList() {
    this.appService.GetDataFromApiPost(roleUserList, null)
      .then(response => {
        if (response.status == 200) {
          store.dispatch({ type: 'CHANGE_ROLE_USER_DATA', payload: response.data[0] });
        }
      });
  }

  closeMessagePopup() {
    this.setState({ showMessagePopup: false })
  }
  messageModal() {
    this.setState(prevState => ({
      modal_center: !prevState.modal_center
    }));
    this.removeBodyCss();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedRole !== this.state.selectedRoles) {
      this.state.selectedRoles = this.props.selectedRole
    }
    if (this.state.rawUserList !== prevProps.usersList) {
      this.setState({ rawUserList: this.props.usersList }, () => {
        this.removeLoginUserDataForForm();
      })
    }
  }
  removeLoginUserDataForForm() {
    let data = this.state.rawUserList;
    if (data) {
      let email = cookies.get('userEmail');
      let modifiedData = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].Email_ID != email) {
          modifiedData.push(data[i]);
        }
      }
      this.setState({ modifiedUserList: modifiedData })
    }
  }
  getAllData() {
    if (this.props.tableData.tableData != "") {
      this.state.tableData = this.props.tableData
      this.state.loader = false
    }
    else {
      this.appService.GetDataFromApiPost(this.state.urlTableData, null)
        .then((response) => {
          this.removeLoginUserData(response)

        })
    }
  }

  removeLoginUserData(response) {
    let email = cookies.get('userEmail')
    let data = []
    response.data[1].forEach((obj, idx) => {
      if (obj.Email_ID !== email) {
        data.push(obj)
      }
    });
    this.state.rawTableData = JSON.parse(JSON.stringify(data));
    this.props.updateTableData('CHANGE_TABLE_DATA', this.state.rawTableData)
    data = []
    response.data[0].forEach((obj, idx) => {
      if (obj.Email_ID !== email) {
        data.push(obj)
      }
    });
    this.state.MasterRoletableData = JSON.parse(JSON.stringify(data));
    this.props.updateTableData('CHANGE_MASTER_ROLE_TABLE_DATA', this.state.MasterRoletableData)

    //console.log(this.state.rawTableData)   
    this.setState({ loader: false })
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
  addNewMember() {

    let emailID = this.state.emailOfNewMember;
    let phNumber = document.getElementById("number").value
    document.getElementById("emailError").innerHTML = ""
    document.getElementById("numberError").innerHTML = ""
    document.getElementById("roleError").innerHTML = ""
    let role = this.state.selectedRoles
    let validate = this.appService.validatePopupForm(emailID, phNumber, role)
    if (validate.status == true) {
      let selectRoleID = ""
      role.forEach(obj => {
        selectRoleID = selectRoleID + obj.id + ','
      });
      selectRoleID = selectRoleID.substring(0, selectRoleID.length - 1)
      let data = { mobNO: phNumber, email: emailID, roles: selectRoleID, activeFlag: 0, userActiveFlag: 1, roleDeleteFlag: 0 }
      this.appService.GetDataFromApiPost(assginRoleURL, data)
        .then((response) => {
          if (response.status == 200) {
            this.setState({ modal_center: false })
            this.setState({ showAlertBox: true })
            this.setState({ alertData: "success, User added." })
            this.appService.updateRoleMasterData()
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

  closeMessageBox() {
    this.setState({ showAlertBox: false })
    this.setState({ alertData: "" })
  }
  setMobileNumbeForUser(email) {
    let data = this.state.modifiedUserList;
    let mobileNumber = "";
    if (email) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].Email_ID == email) {
          mobileNumber = data[i].Telephone_No;
          break;
        }
      }
      this.setState({ newUserNumber: mobileNumber });
      console.log(mobileNumber)
    }
  }
  render() {
    const errorMsgStyle = {
      color: "red",
      fontSize: "12px"
    }

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
                  <li className="breadcrumb-item active">
                    Role
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

          {/* Cards */}
          <Row>
            <Col xl={12} className="text-right mb-4">
              <button
                type="button"
                className="btn update-btn font"
                onClick={this.add_member}
                data-toggle="modal"
                data-target=".bs-example-modal-center"
              >
                Add New Member
              </button>
              <Modal
                isOpen={this.state.modal_center}
                toggle={this.add_member}
              >
                <div className="modal-header">
                  <h5 className="modal-title mt-0">Invite New Member <span style={errorMsgStyle}>(*all fields are mandetory)</span></h5>
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
                  <div className="col-sm-12">
                    <div className="form-group row">
                      <Label for="email">Email ID</Label>
                      <Autocomplete
                        className="d-block w-100"
                        options={this.state.modifiedUserList}
                        onInputChange={(event, value) => {
                          console.log('value ' + value)
                          this.setState({ emailOfNewMember: value });
                          this.setMobileNumbeForUser(value);
                        }}
                        getOptionLabel={(option) => option.Email_ID}
                        id="email"
                        renderInput={(params) => (
                          <div ref={params.InputProps.ref}>
                            <input type="email" placeholder="Enter Email ID" type="text" {...params.inputProps} />
                          </div>
                        )}
                      />
                      <Label for="name" id="emailError" style={errorMsgStyle}></Label>
                    </div>
                    <div className="form-group row">
                      <Label for="number">Phone Number</Label>
                      <Input disabled type="number" id="number" placeholder="Enter Phone Number" value={this.state.newUserNumber} />
                      <Label for="name" id="numberError" style={errorMsgStyle}></Label>
                    </div>
                    <div className="form-group row">
                      <Label for="name">Role</Label>
                      <MultiChipSelect />
                      <Label for="name" id="roleError" style={errorMsgStyle}></Label>
                    </div>
                    <div className="form-group row">
                      <button className="btn btn-block update-btn font" onClick={() => this.addNewMember()}>
                        Assign Role
                      </button>
                    </div>
                  </div>
                </div>
              </Modal>

              {/* add member message popup */}

              <Modal
                isOpen={this.state.showMessagePopup}
                toggle={false}
              >
                <div className="modal-header">
                  <h5 className="modal-title mt-0">Message</h5>
                  <button
                    type="button"
                    onClick={() =>
                      this.closeMessagePopup()
                    }
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div class="alert alert-danger" role="alert">
                    User Type &amp; Discount not assigned.
                                      </div>
                  <div class="alert alert-success" role="alert">
                    User Type &amp; Discount created successfully.
                  </div>
                </div>
              </Modal>


              {/* add member message popup */}

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
            </Col>
          </Row>

          {/* Table */}
          <Row>
            <Col xl={12}>
              <RoleData />
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}
const mapStatetoProps = state => {
  return {
    tableData: state.roleTableData,
    selectedRole: state.selectedRoles.roles,
    currentUserProvide: state.userProfileData.providerName,
    usersList: state.masterRoleTableData.roleUserList,
    racetableData: state.raceTableData
  };
};

const dispatchToProps = dispatch => {
  return {
    updateTableData: (type, payload) => {
      dispatch({ type: type, payload: payload })
    }
  }
}
export default withRouter(connect(mapStatetoProps, dispatchToProps)(Role));