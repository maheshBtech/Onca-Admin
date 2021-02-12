import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Row, Col, Label, Input, } from "reactstrap";
import { Card, CardBody, CardHeader, Button } from "reactstrap";
import DataTable from 'react-data-table-component';
import MultiChipSelect from "../SubComponent/MultiChipSelect";
import { Modal } from "reactstrap";
import AppService from '../../../AppService'
import { assginRoleURL } from '../../../AppConfig'
import { connect } from "react-redux";
import store from '../../../store';
import CsvDownload from 'react-json-to-csv'
import _ from 'lodash';


const headerStyle = {
    headCells: {
        style: {
            backgroundColor: "#EDECEC",
        },
    },
};
const appService = new AppService()
const columns =  [
    {
        name: 'Member Name',
        selector: 'User_Name',
        sortable: true,
        maxWidth: "160px"
    },
    {
        name: 'Email ID',
        selector: 'Email_ID',
        sortable: true,
        maxWidth: "200px"
    },
    {
        name: 'Phone Number',
        selector: 'Telephone_No',
        sortable: true,
        maxWidth: "200px"
    },
    {
        name: 'Role',
        selector: 'Role_Name',
        sortable: true,
        wrap: true,
        allowOverflow: true,
        maxWidth: "150px"
    },
    {
        name: 'Action',
        cell: (row) => <Button variant="contained" color="light" onClick={() => { updateRole(row) }}>Update</Button>,
        button: true,
    },
    {
      cell: (row) => activateOrSuspend(row)
    },
    {
        cell: (row) => <Button variant="contained" color="light" >Remove</Button>,
        button: true,
    },
  ];
  const updateRole = (row)=>{     
      store.dispatch({type:"CHANGE_POPUP_VIEW", payload:true})
      store.dispatch({type:"CHANGE_POPUP_DATA", payload:{email:row.Email_ID, number:row.Telephone_No, roles:[{title: row.Role_Name, id:row.Role_ID, discription: row.Role_ID}]}})
  }
  const activateOrSuspend =(row)=>{
     
    var selectedButton =""
    {row.Role_Active_Flag.data[0] === 1 ?
      selectedButton = <Button variant="contained" color="light" onClick={()=>supspendAllRoles(row)}>Suspend</Button>
      :
      selectedButton = <Button variant="contained" color="success" onClick={()=>activateAllRoles(row)}>Activate</Button>
    }
    return selectedButton
  }

  const activateAllRoles =(row)=>{
     
    let mobNumber = row.Telephone_No
    let emailID = row.Email_ID
    let roles = row.Role_ID  
    let data = {mobNO: mobNumber, email:emailID, roles: roles, flag:1}
    appService.GetDataFromApiPost(assginRoleURL, data).then((response)=>{
      if(response.status == 200){
        appService.updateRoleMasterData()
      }
    })
    
  }
  const supspendAllRoles =(row)=>{
     
    let mobNumber = row.Telephone_No
    let emailID = row.Email_ID
    let roles = row.Role_ID  
    let data = {mobNO: mobNumber, email:emailID, roles: roles, flag:0}
    appService.GetDataFromApiPost(assginRoleURL, data).then((response)=>{
      if(response.status == 200){
        appService.updateRoleMasterData()
      }
    })
    
  }


class RoleTemplate extends Component {
    constructor(props) {
        super(props);
        this.appService = new AppService();
        this.state = {
            modal_center: false,
            modal_scroll: false,
            refrehedTableData: "",
            rawTableData: "",
            popupData: "",
            showPopup: "",
            dataToDownload: "",
            filteredDataForTable: ""
        };
        this.add_member = this.add_member.bind(this);
        this.tog_scroll = this.tog_scroll.bind(this);  
         
        this.state.showPopup = this.props.showRolePoupup

    }

      
    refreshTableData( rawTableData){  
                
        this.state.rawTableData = this.props.tableData
        let mode = this.props.tableMode;
        let filterData = []
         
        rawTableData.forEach(element => {
            if (element.Role_Name.toLowerCase().includes(mode.toLowerCase())) {
                filterData.push(element)
            }
        });

        this.state.refrehedTableData = filterData
        //this.state.refrehedTableData =JSON.parse(JSON.stringify(filterData))
        console.log("new Updated state")
        console.log(this.state.refrehedTableData)
        let result = this.uniqueData(JSON.parse(JSON.stringify(this.state.refrehedTableData)), ["Role_ID", "User_ID"])
        this.state.filteredDataForTable = result
        this.setState({ refrehedTableData: result });
        this.state.refrehedTableData = result
    }
    uniqueData(arr, keyProps){   
         
        let m =  _.uniqBy(arr, function(elem) {
           return JSON.stringify(_.pick(elem, keyProps));
       });
       return m;
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

    componentDidUpdate(prevProps, prevState){
         
        if(prevProps.tableData !== this.state.rawTableData )
        {
            
            this.refreshTableData(prevProps.tableData)
            this.prepareFileToDownload(this.state.refrehedTableData)
        }
        if (prevProps.selectedRole !== this.props.selectedRole) {
             
            let updatedData = this.props.popupData
            if (updatedData !== "") {
                document.getElementById('email').value = updatedData.email
                document.getElementById('number').value = updatedData.number
                document.getElementById('button1').innerHTML = "Update Role"
            }
            if (updatedData === "") {
                document.getElementById('button1').innerHTML = "Assign Role"
            }
        }
    }

    assignRole(){
                 
        let emailID = document.getElementById("email").value
        let phNumber = document.getElementById("number").value
        document.getElementById("emailError").innerHTML = ""
        document.getElementById("numberError").innerHTML = ""
        document.getElementById("roleError").innerHTML = ""

        let role = this.props.selectedRole
        let validate = this.appService.validatePopupForm(emailID, phNumber, role)
        if(validate.status == true){
        let selectRoleID = ""
        role.forEach(obj => {
            selectRoleID = selectRoleID+obj.id+','

          });
          selectRoleID = selectRoleID.substring(0, selectRoleID.length -1 )
          this.appService.GetDataFromApiPost(assginRoleURL, {mobNO:phNumber, email: emailID, roles: selectRoleID, flag:1})
          .then((response)=>{
            if(response.status ==200 ){
              alert("user has given role")
              store.dispatch({type:"CHANGE_POPUP_VIEW", payload:false})
              store.dispatch({type:"CHANGE_POPUP_DATA", payload:""})
              this.props.updateTableData('CHANGE_SELECTED_ROLES', "")
              this.appService.updateRoleMasterData()
            }
          })
        }
        else{
            
            validate.section.forEach((obj,idx) =>{
                document.getElementById(obj).innerHTML = validate.message[idx]
            })
          
        }
    }
    closeForm() {
        this.props.updateTableData("CHANGE_POPUP_VIEW", false)
        this.props.updateTableData("CHANGE_POPUP_DATA", "")
        this.props.updateTableData('CHANGE_SELECTED_ROLES', "")
    }
    openForm() {
        this.props.updateTableData("CHANGE_POPUP_VIEW", true)

    }
    
    prepareFileToDownload(rawData){
         
        if((rawData !=="" || rawData !== undefined || rawData !== null )&& rawData.length > 0){
            let filterData = []
            rawData.forEach(obj => {
                filterData.push({ "Member Name": obj.User_Name, "Email ID": obj.Email_ID, "Phone Number": obj.Telephone_No, Role: obj.Role_Name })
            })
            this.state.dataToDownload = filterData
        }
    }
    searchAnything(){        
         
        let thingToSearch = document.getElementById("searchData").value;
        let filterDataToShow = []
        if (thingToSearch == "") {
            this.setState({ filteredDataForTable: this.state.refrehedTableData })
            this.prepareFileToDownload(this.state.refrehedTableData)
        }
        else {
            this.state.refrehedTableData.forEach(obj => {
                if (obj.User_Name.toLowerCase().includes(thingToSearch.toLowerCase()) || obj.Email_ID.toLowerCase().includes(thingToSearch.toLowerCase()) || obj.Telephone_No.toLowerCase().includes(thingToSearch.toLowerCase()) || obj.Role_Name.toLowerCase().includes(thingToSearch.toLowerCase())) {
                    filterDataToShow.push(obj)
                }
            });
            this.setState({ filteredDataForTable: filterDataToShow })
            this.prepareFileToDownload(filterDataToShow)
        }
    }


    render() {
        const errorMsgStyle = {
            color: "red",
            fontSize: "12px"

        }
        const spacingButton = {
            marginTop: "2%",
            float: "right"
          }
          const searchBar = {
            width: "15%",
            float: "right",
            marginBottom: "2%"
        
          }
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <Row className="align-items-center">
                        <Col sm={6}>
                            <div className="page-title-box">
                                <ol className="breadcrumb mb-0">
                                    <li className="breadcrumb-item">
                                        <Link to="/role">Role</Link>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        {this.props.path}
                                    </li>
                                </ol>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={12} className="text-right mb-4">
                            <button
                                type="button"
                                className="btn update-btn font"
                                onClick={() => { this.openForm() }}
                                data-toggle="modal"
                                data-target=".bs-example-modal-center"
                            >
                                Add New Member
                        </button>
                            <Link to="/role">
                                <span role="button" className="btn update-btn font ml-3">
                                    Back
                            </span>
                        </Link>
                        <Modal
                            isOpen={this.props.showRolePoupup}
                            toggle={this.add_member}
                        >
                            <div className="modal-header">
                                <h5 className="modal-title mt-0">Invite New Member <span style={errorMsgStyle}>(*all fields are mandetory)</span></h5>
                                <button
                                    type="button"
                                    onClick={() =>
                                        this.closeForm()
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
                                <div className="col-sm-12">
                                    <div className="form-group row">
                                    <Label for="email">Email ID</Label>
                                    <Input type="email" id="email" placeholder="Enter email id" />
                                    <Label for="name" id="emailError" style={errorMsgStyle}></Label>
                                    </div>
                                    <div className="form-group row">
                                    <Label for="number">Phone Number</Label>
                                    <Input type="number" id="number" placeholder="Enter mobile number"/>
                                    <Label for="name" id="numberError" style={errorMsgStyle}></Label>
                                    </div>
                                    <div className="form-group row">
                                        <Label for="name">Role</Label>
                                        <MultiChipSelect />
                                        <Label for="name" id="roleError" style={errorMsgStyle}></Label>
                                    </div>
                                    <div className="form-group row">
                                        <button className="btn btn-block update-btn font"  onClick={()=>{this.assignRole()}} id="button1">
                                            Assign Role
                                  </button>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    </Col>
                </Row>
                <Row>
                    <Col xl={12}>
                    <Card className="mini-stat">
                    <CardHeader className="bl-bg">
                                    <h4 className="title-text">{this.props.path} Role Data</h4>
                                    {/* Search and CSV Download */}
                                    <span className="float-right">
                                        <Input
                                            className="search-elem"
                                            type="email" 
                                            id="searchData" 
                                            placeholder={"Search..."} 
                                            onChange={()=>{this.searchAnything()}}
                                        />
                                        <CsvDownload 
                                            className="file-dwd ml-3" 
                                            data={this.state.dataToDownload} 
                                            filename={this.props.path + "_Data.csv"} 
                                        />
                                    </span>
                                </CardHeader>
                        <CardBody>
                            <DataTable
                                className="data-table"
                                columns={columns}
                                data={this.state.filteredDataForTable}
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
        )
    }
}

const mapStatetoProps = state => {
    return {
        tableMode: state.roleTableMode.tableMode,
        tableData: state.roleTableData.tableData,
        path: state.roleTableMode.path,
        selectedRole: state.selectedRoles.roles,
        showRolePoupup: state.rolePopup.showRolePoupup,
        popupData: state.rolePopupData.popupData

    };
};
const dispatchToProps = dispatch => {
    return {
        updateTableData: (type, payload) => {
            dispatch({ type: type, payload: payload })
        }
    }
}
export default withRouter(connect(mapStatetoProps, dispatchToProps)(RoleTemplate));