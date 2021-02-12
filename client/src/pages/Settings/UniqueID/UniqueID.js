import React, { Component } from "react";
import {
  Row,
  Col,
  Label,
  Input,
  Card,
  CardBody,
  CardHeader,
  Modal,
  Button
} from "reactstrap";
import { Link } from "react-router-dom";
import DataTable, { createTheme } from 'react-data-table-component';
import { ValidationMessage } from "./CommonMessage";
import AppService from "../../../AppService";
import { insertUniqueID, uniqueIDTableData, suspendOrRemoveUniqueID } from "../../../AppConfig";
import SweetAlert from "react-bootstrap-sweetalert";
import CsvDownload from 'react-json-to-csv'
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import store from '../../../store/index'
import { ThemeConsumer } from "styled-components";

const appService = new AppService();

const UsersActvitiesData = [
  {
    id: 1,
    ProviderCode: 'BAC',
    Variable1: 'SC2018',
    Variable2: '0001',
    CreatedBy: "Admin",
    CreatedDate: "19-02-2018"

  },
  {
    id: 2,
    ProviderCode: 'BAC',
    Variable1: 'SC2019',
    Variable2: '0001',
    CreatedBy: "Admin",
    CreatedDate: "19-02-2019"

  },
  {
    id: 3,
    ProviderCode: 'BAC',
    Variable1: 'SC2020',
    Variable2: '0001',
    CreatedBy: "Admin",
    CreatedDate: "19-02-2020"

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
const columns = [
  {
    name: 'UniqueID',
    selector: 'uniqueID',
    sortable: true,
    wrap: true,
    cell: (row) => <div>{row.Provider_Code}-{row.Input_Variable1}-{row.Input_Variable2}</div>
  },
  {
    name: 'Created By',
    selector: 'SubmittedBy_User',
    sortable: true,
    wrap: true,
  },
  {
    name: 'Created Date',
    sortable: true,
    cell: (row) => <div>{row.Submitted_Date.split('T')[0]}</div>
  },
  {
    name: 'Action',
    cell: (row) => renderButtons(row)
  }
];
const renderButtons= (row)=>{

  if(row.New_Unique_User_ID_Flag === 1){
    if(row.User_Registered_Flag.data[0] === 1){
     return( <div className="col-12">
        <Button className="mb-1 btn update-btn" onClick={()=>{viewAndUpdateUniqueID(row)}}>
          View 
        </Button>        
        <Button className="mb-2 btn" onClick={()=>{removeOrSuspendUniqueID('remove',row)}}>
          Remove
      </Button>
      </div>)
    }
    else {
      if(row.Active_Flag.data[0]===1){
      return (
        <div className="col-12">
          <Button className="mb-1 btn update-btn" onClick={() => { viewAndUpdateUniqueID(row) }}>
            View &amp; Update
      </Button>
          <Button color="warning" className="mb-1  btn btn-warning" onClick={() => { removeOrSuspendUniqueID('suspend', row) }}>
            Suspend
    </Button>
          <Button className="mb-1 btn remove-btn" onClick={() => { removeOrSuspendUniqueID('remove', row) }}>
            Remove
    </Button>
        </div>
      )
    }
    else{
      return (
        <div className="col-12">
          <Button className="mb-1 btn update-btn" onClick={() => { viewAndUpdateUniqueID(row) }}>
            View &amp; Update
      </Button>
          <Button color="warning" className="mb-1  btn btn-warning" onClick={() => { removeOrSuspendUniqueID('activate', row) }}>
            Activate
    </Button>
          <Button className="mb-1 btn remove-btn" onClick={() => { removeOrSuspendUniqueID('remove', row) }}>
            Remove
    </Button>
        </div>
      )
    }
    }
  }
  else {
    return (
      <div className="col-12">
        <Button className="mb-1 btn update-btn" onClick={() => { viewAndUpdateUniqueID(row) }}>
          View
        </Button>
      </div>
    )

  }
}

const removeOrSuspendUniqueID = (type, row) => {
  let data = JSON.parse(JSON.stringify(store.getState().uniqueID.removeOrSuspendUniqueID))
  data.type = type
  data.data = row
  store.dispatch({ type: 'CHANGE_REMOVE_SUSPEND_UNIQUE_ID', payload: data })
}
const viewAndUpdateUniqueID = (row) => {
  let data = JSON.parse(JSON.stringify(store.getState().uniqueID.viewUniqueID))
  if (row.New_Unique_User_ID_Flag === 1 && row.User_Registered_Flag.data[0] !== 1) {
    data.canEdit = true
    data.data = row
  }
  else {
    data.canEdit = false
    data.data = row
  }
  store.dispatch({ type: 'CHANGE_VIEW_UNIQUE_ID', payload: data })
}

class PagesBlank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal_center: false,
      modal_scroll: false,
      providerCode: "", providerCodeValid: false, providerError: "",
      variable1: "", variable1Valid: false, variable1Error: "",
      variable2: "", variable2Valid: false, variable2Error: "",
      isFormValid: false,
      success_msg: false,
      fail_msg: false,
      alertBoxData: "",
      rawTableData: "",
      filterTableData: "",
      toCSV: "",
      isFieldsDisabled: false,
      uniqueUserID: null,
      conformation: false,
    };
    // Modal Popup
    this.props.updateTableData('CHANGE_CURRENT_PAGE_NAME', 'Unique ID')
    this.add_member = this.add_member.bind(this);
    this.tog_scroll = this.tog_scroll.bind(this);
    this.getData();
  }
  //toLoadTableData
  getData(){
    
    let data={
      providerID:this.props.providerAndRoleData.Service_Provider_ID
    }
    appService.GetDataFromApiPost(uniqueIDTableData,data)
    .then(response=>{
      if(response=== null){
        this.setState({ modal_center: false })
        this.showError("Table API returns NULL.")
      }
      else if(response.status = 200){         
            
            this.setState({rawTableData:response.data[0]});   
            this.setState({toCSV:response.data[0]});
            this.setState({filterTableData:response.data[0]},()=>{this.generateUniqueID()})        
      }
      else{
        this.setState({ modal_center: false })
        this.showError("Error in loading table data.")
      }
    });
  }
  generateUniqueID() {
    const { rawTableData } = this.state;
    let temp = rawTableData;
    temp.forEach(obj => {
      obj.uniqueID = obj.Provider_Code + '-' + obj.Input_Variable1 + '-' + obj.Input_Variable2
    });
    this.setState({ filterTableData: temp })
  }

  searchAnything(event) {
    let rawData = this.state.rawTableData
    let searchKey = event.target.value
    var filteredItem = []
    if (searchKey === "" || searchKey === " ") {
      this.setState({ filterTableData: rawData }, () => { this.deleteExtraCSVKeys() })
    }
    else {
      filteredItem = []
      rawData.forEach(obj => {
        obj.uniqueID = obj.uniqueID == null ? 'N/A' : obj.uniqueID
        obj.Provider_Code = obj.Provider_Code == null ? 'N/A' : obj.Provider_Code
        obj.Input_Variable1 = obj.Input_Variable1 == null ? 'N/A' : obj.Input_Variable1
        obj.Input_Variable2 = obj.Input_Variable2 == null ? 'N/A' : obj.Input_Variable2
        obj.SubmittedBy_User = obj.SubmittedBy_User == null ? 'N/A' : obj.SubmittedBy_User
        obj.Submitted_Date = obj.Submitted_Date == null ? 'N/A' : obj.Submitted_Date
        if (obj.uniqueID.toString().toLowerCase().includes(searchKey) || obj.Provider_Code.toLowerCase().includes(searchKey) || obj.Input_Variable1.toLowerCase().includes(searchKey) || obj.Input_Variable2.toString().toLowerCase().includes(searchKey) || obj.SubmittedBy_User.toLowerCase().includes(searchKey) || obj.Submitted_Date.toString().toLowerCase().includes(searchKey)) {
          filteredItem.push(obj)
        }
      });
      this.setState({ filterTableData: filteredItem }, () => { this.deleteExtraCSVKeys() })
    }
  }

  deleteExtraCSVKeys() {
    const { filterTableData } = this.state
    const data = []
    if (filterTableData.length > 0) {
      filterTableData.forEach(obj => {
        let json = {
          "Unique ID": obj.uniqueID,
          "Created By": obj.SubmittedBy_User,
          "Created Date(m/d/y)": obj.Submitted_Date.split('T')[0],
        }
        data.push(JSON.parse(JSON.stringify(json)))
      });

      this.setState({ toCSV: data })
    }
  }

  clearFields() {
    this.setState({ providerCode: "" })
    this.setState({ variable1: "" })
    this.setState({ variable2: "" })
  }
  // Modal
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
  updateProviderCodeValue(event) {
    const { providerCode } = this.state
    this.setState({ providerCode: event.target.value }, () => { this.validateProviderCode() })
  }
  validateProviderCode() {
    const { providerCode } = this.state
    let status = false
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]+/;
    if (providerCode == undefined || providerCode === null || providerCode.length === 0) {
      this.state.providerError = "Provider code caannot be empty.";
      status = false
    }
    else if (format.test(providerCode)) {
      this.state.providerError = "Provider Code cannot contain any special charecter or numbers.";
      status = false
    }
    else {
      this.state.providerError = "";
      status = true
    }
    this.setState({ providerCodeValid: status }, () => { this.isFormValid() })
  }
  updateVar1CodeValue(event) {
    const { variable1 } = this.state
    this.setState({ variable1: event.target.value }, () => { this.validateVariable1() })
  }
  validateVariable1() {
    const { variable1 } = this.state
    let status = false
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (variable1 == undefined || variable1 === null || variable1.length === 0) {
      this.state.variable1Error = "Variable 1 caannot be empty.";
      status = false
    }
    else if (format.test(variable1)) {
      this.state.variable1Error = "Variable 1 cannot contain any special charecter.";
      status = false
    }
    else {
      this.state.variable1Error = "";
      status = true
    }
    this.setState({ variable1Valid: status }, () => { this.isFormValid() })
  }
  updateVar2Value(event) {
    const { variable2 } = this.state
    this.setState({ variable2: event.target.value }, () => { this.validateVariable2() })
  }
  validateVariable2() {
    const { variable2 } = this.state
    let status = false
    if (variable2 == undefined || variable2 === null || variable2.length === 0) {
      this.state.variable2Error = "Variable 2 cannot be empty.";
      status = false
    }
    else {
      this.state.variable2Error = "";
      status = true
    }
    this.setState({ variable2Valid: status }, () => { this.isFormValid() })
  }

  isFormValid() {
    const { providerCodeValid, variable1Valid, variable2Valid } = this.state
    let isFormValid = providerCodeValid && variable1Valid && variable2Valid
    this.setState({ isFormValid });
  }

  getCurrenDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return today = yyyy + '-' + mm + '-' + dd
  }

  submitForm() {
    const { uniqueUserID, isFormValid, providerCode, variable1, variable2 } = this.state
    if (isFormValid) {
      let data = {
        uniqueUserID: uniqueUserID,
        providerCode: providerCode,
        variableCode1: variable1,
        variableCode2: variable2,
        submitDate: this.getCurrenDate(),
        userID: this.props.userDetails[0].User_Skey_ID,
        providerID: this.props.providerAndRoleData.Service_Provider_ID
      }
      appService.GetDataFromApiPost(insertUniqueID, data)
        .then(response => {
          if (response === null) {
            this.setState({ modal_center: false })
            this.showError("Form API returns NULL.")
          }
          else if (response.status = 200) {
            this.setState({ modal_center: false })
            this.setState({ alertBoxData: "Transaction completed successfully." })
            this.setState({ fail_msg: false })
            this.setState({ success_msg: true })
            this.clearFields();
            this.getData();
          }
          else {
            this.setState({ modal_center: false })
            this.showError("Error in inserting new unique ID.")
          }

        });


    }
  }
  showError(message) {
    this.setState({ alertBoxData: message })
    this.setState({ fail_msg: true })
    this.setState({ success_msg: false })
  }
  closeAlertBox() {
    this.setState({ success_msg: false })
    this.setState({ alertBoxData: "" })
    this.setState({ fail_msg: false })
    this.setState({ conformation: false })
  }
  componentDidUpdate(prevProps, prevState){
    
    if(prevProps.viewUniqueId !== this.props.viewUniqueId){
      this.setState({uniqueUserID:null})      
      this.bindData();
    }
    if (prevProps.removeOrSuspendID !== this.props.removeOrSuspendID) {
      this.setState({ uniqueUserID: this.props.removeOrSuspendID.data.Unique_User_ID })
      this.conformationBox();
    }
  }
  bindData(){ 
    this.setState({providerCode:this.props.viewUniqueId.data.Provider_Code})
    this.setState({variable1:this.props.viewUniqueId.data.Input_Variable1})
    if(this.props.viewUniqueId.canEdit === false){
      this.setState({isFieldsDisabled:true})
      this.setState({isFormValid:false})
    }
    else {
      this.setState({ uniqueUserID: this.props.viewUniqueId.data.Unique_User_ID })
      this.setState({ isFieldsDisabled: false }, () => {
        this.validateProviderCode(); this.validateVariable1(); this.validateVariable2();
      })
    }
    this.setState({ variable2: this.props.viewUniqueId.data.Input_Variable2 }, () => { this.add_member() })
  }
  conformationBox() {
    let txt = "";
    if (this.props.removeOrSuspendID.type === 'remove') { txt = "Are you sure want to remove Unique ID?" }
    else if (this.props.removeOrSuspendID.type === 'activate') { txt = "Are you sure want to activate Unique ID?" }
    else { txt = "Are you sure want to suspend Unique ID?" }

    this.setState({ alertBoxData: txt })
    this.setState({ conformation: true })
  }


  removeOrSuspendID() {
    this.closeAlertBox();
    let data1 = JSON.parse(JSON.stringify(this.props.removeOrSuspendID));
    let data = {
      uniqueUserID: this.state.uniqueUserID,
      activeFlag: 0,
      deleteFlag: 0,
      userSkyID: this.props.userDetails[0].User_Skey_ID,
    }
    if (data1.type === 'remove') {
      data.deleteFlag = 1
    }
    else if(data1.type === 'activate')
    {
      data.activeFlag = 1
    }
    appService.GetDataFromApiPost(suspendOrRemoveUniqueID, data)
      .then(response => {
        if (response === null) {
          this.setState({ modal_center: false })
          this.showError("Form API returns NULL.")
        }
        else if (response.status = 200) {
          this.setState({ modal_center: false })
          let txt = "";
          if (this.props.removeOrSuspendID.type === 'remove') { txt = "Unique ID removed." }
          else if (this.props.removeOrSuspendID.type === 'activate') { txt = "Unique ID Activated." }
          else { txt = "Unique ID suspended." }
          this.setState({ alertBoxData: txt })
          this.setState({ fail_msg: false })
          this.setState({ success_msg: true })
          this.getData();
        }
        else {
          this.setState({ modal_center: false })
          this.showError("Error in modifying values.")
        }

      });

  }
  render() {
    const { isFieldsDisabled, toCSV, filterTableData, providerCode, providerCodeValid, providerError, variable1, variable1Error, variable1Valid, variable2, variable2Valid, variable2Error, isFormValid } = this.state
    return (
      <React.Fragment>
        {this.state.success_msg ? (
          <SweetAlert
            title="Success!"
            success
            onConfirm={() => this.closeAlertBox()}
          >
            {this.state.alertBoxData}
          </SweetAlert>
        ) : null}
        {this.state.fail_msg ? (
          <SweetAlert
            title="Error!"
            warning
            onConfirm={() => this.closeAlertBox()}
          >
            {this.state.alertBoxData}
          </SweetAlert>
        ) : null}
        {this.state.conformation ? (
          <SweetAlert
            title="Conformation"
            warning
            onConfirm={() => this.removeOrSuspendID()}
          >
            {this.state.alertBoxData}
          </SweetAlert>
        ) : null}

        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    Settings
                  </li>
                  <li className="breadcrumb-item active">
                    Unique ID
                  </li>
                </ol>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xl={12} className="text-right mb-4">
              <button
                className="btn update-btn"
                onClick={this.add_member}
                data-toggle="modal"
                data-target=".bs-example-modal-center"
              >
                Create Unique ID
                </button>
              <Modal
                isOpen={this.state.modal_center}
                toggle={this.add_member}
              >
                <div className="modal-header">
                  <h5 className="modal-title mt-0">Configure Unique ID </h5>
                  <button
                    type="button"
                    onClick={() => {
                      this.setState({ modal_center: false });
                      this.clearFields()
                    }
                    }
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <Label for="ProviderCode">Provider Code <span className="text-danger" >*</span></Label>
                    <Input type="text" id="ProviderCode"
                      disabled={isFieldsDisabled}
                      name="providerCode"
                      placeholder="Enter Provider Code"
                      value={providerCode}
                      onChange={(event) => { this.updateProviderCodeValue(event) }}
                      onBlur={() => { this.validateProviderCode() }}
                    />
                    <ValidationMessage valid={providerCodeValid} message={providerError} />
                  </div>
                  <div className="form-group">
                    <Label for="Variable1">Variable 1 <span className="text-danger" >*</span></Label>
                    <Input type="Variable1" id="Variable1"
                      disabled={isFieldsDisabled}
                      placeholder="Enter Variable 1"
                      value={variable1}
                      onChange={(event) => { this.updateVar1CodeValue(event) }}
                      onBlur={() => { this.validateVariable1() }}
                    />
                    <ValidationMessage valid={variable1Valid} message={variable1Error} />
                  </div>
                  <div className="form-group">
                    <Label for="Variable1">Variable2 <span className="text-danger" >*</span></Label>
                    <Input type="text" id="Variable2"
                      disabled={isFieldsDisabled}
                      placeholder="Enter Variable 2"
                      value={variable2}
                      type="number"
                      onChange={(event) => { this.updateVar2Value(event) }}
                      onBlur={() => { this.validateVariable2() }}
                    />
                    <ValidationMessage valid={variable2Valid} message={variable2Error} />
                  </div>
                  <button className="btn btn-block update-btn font mt-3"
                    disabled={!isFormValid}
                    onClick={() => { this.submitForm() }}
                  >
                    Submit
                  </button>
                </div>
              </Modal>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Card className="mini-stat text-white">
                <CardHeader className="bl-bg">
                  <b>Unique ID List</b>
                  <span className="float-right">
                    <Input
                      className="search-elem"
                      type="text"
                      id="searchData"
                      placeholder={"Search..."}
                      onChange={(event) => { this.searchAnything(event) }}
                    />
                    <CsvDownload
                      className="file-dwd ml-3"
                      data={toCSV}
                      filename={"unique_id.csv"}
                    />
                  </span>
                  <span className="float-right">
                  </span>
                </CardHeader>
                <CardBody>
                  <DataTable
                    className="data-table"
                    columns={columns}
                    data={filterTableData}
                    noHeader={true}
                    customStyles={headerStyle}
                    fixedHeader
                    fixedHeaderScrollHeight="300px"
                    pagination
                    selectableRows
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
    providerAndRoleData: state.currentPageName.roleAndProvider.selectedRole,
    userDetails: state.userProfileData.ProfileData[0],
    viewUniqueId: state.uniqueID.viewUniqueID,
    removeOrSuspendID: state.uniqueID.removeOrSuspendUniqueID,
  };
};
const dispatchToProps = dispatch => {
  return {
    updateTableData: (type, payload) => {
      dispatch({ type: type, payload: payload })
    }
  }
}

export default withRouter(connect(mapStatetoProps, dispatchToProps)(PagesBlank));
