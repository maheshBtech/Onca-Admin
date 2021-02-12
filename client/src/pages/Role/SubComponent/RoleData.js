import React, { useState, useEffect, Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Button } from "reactstrap";
import DataTable from 'react-data-table-component';
import { connect } from "react-redux";
import AppService from '../../../AppService'
import {removeUserURL, roleDataURL, assginRoleURL} from '../../../AppConfig'
import store from '../../../store/index'
import { Modal } from "reactstrap";
import { Row, Col, Label, Input, } from "reactstrap";
import MultiChipSelect from "../SubComponent/MultiChipSelect";
import CsvDownload from 'react-json-to-csv'
import _ from 'lodash';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const RoleHeaderStyle = {
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

const appService = new AppService();

const removeUser = (row)=>{
  let mobNumber = row.Telephone_No;
  let emailID = row.Email_ID;
  let roles = row.Role_ID;
let data = {mobNO: mobNumber, email:emailID, roles: roles, activeFlag:0, userActiveFlag:0, roleDeleteFlag:1}
appService.GetDataFromApiPost(assginRoleURL, data)
.then(response=>{
  if(response.status == 200){
    appService.updateRoleMasterData()
    store.dispatch({type:"CHANGE_CHECKBOX_MESSAGE_POPUP_DATA", payload:"success,User removed successfully."})
  }
})
}


const showHidePopup = (row)=>{
let k =[]
let sRoles = row.Role_ID.split(',');    
let sTitle = row.Role_Name.split(',');
sRoles.forEach((obj, idx) =>{
      k.push({title:sTitle[idx] , id:obj, discription: findDescFroRole(sTitle[idx])})
    })
store.dispatch({type:'CHANGE_POPUP_VIEW', payload:true}) 
store.dispatch({type:"CHANGE_POPUP_DATA", payload:{email:row.Email_ID, number:row.Telephone_No, roles:k}}) 

}
const findDescFroRole=(roleName)=>{
let totalRole = store.getState().masterRoleTableData.totalRoleList
let desc = ""
totalRole.forEach(obj=>{
  if(obj.Role_Name.toLowerCase() == roleName.toLowerCase()){
    desc = obj.Role_Desc
  }
})
return desc
}


const columns = [
{
  name: 'Member Name',
  selector: 'User_Name',
  sortable: true,
},
{
  name: 'Email ID',
  selector: 'Email_ID',
  sortable: true,
},
{
  name: 'Phone Number',
  selector: 'Telephone_No',
  sortable: true,
  width:'12%',
},
{
  name: 'Role',
  selector: 'Role_Name',
  sortable: true,
  wrap: true,
  allowOverflow: true,
  width:'30%',
},
{
  name: 'Action',
  cell: (row) =>
    <div className="col-12">
      <Button className="btn update-btn" variant="contained" onClick={() => showHidePopup(row)}>View &amp; Update</Button>
      <Button className="btn remove-btn" variant="contained" onClick={() => removeUser(row)}>Remove</Button>
      {activateOrSuspend(row)}
    </div>
  ,
  button: true,
 },
// {
// cell: (row) => activateOrSuspend(row),  
//   button: true,
// }
];

const activateOrSuspend =(row)=>{
  
var selectedButton =""
{row.Role_Active_Flag.data[0] === 1 ?
  selectedButton = <Button className="btn btn-warning" variant="contained" onClick={()=>supspendAllRoles(row)}>Suspend</Button>
  :
  selectedButton = <Button className="btn btn-success" variant="contained" onClick={()=>activateAllRoles(row)}>Activate</Button>
}
return selectedButton
}
const activateAllRoles =(row)=>{
  store.dispatch({type:"SHOW_CHECKBOX_POPUP", payload:true})
  store.dispatch({type:"DATA_CHECKBOX_POPUP", payload:row})
  }

const supspendAllRoles =(row)=>{
store.dispatch({type:"SHOW_CHECKBOX_POPUP", payload:true})
store.dispatch({type:"DATA_CHECKBOX_POPUP", payload:row})
}

function RoleData(props) {
const[showMessagePopup,setShowMessagePopup]= useState(false);
const [rawTableData, setrawTableData] = useState();
const [bindingPopup, setbindingPopup] = useState(true)
const [toCSV, setToCSV] = useState(null)
const [filteredDataForTable, setFilteredDataForTable] = useState(rawTableData)
const [checkBoxModal, setCheckBoxModal] = useState(false)
const [dataForPopUp, setDataForPopUp] = useState([])
const [alertData, setAlertData] = useState("")
const CloseForm =()=>{
  props.updateTableData('CHANGE_POPUP_VIEW', false)
  props.updateTableData('CHANGE_POPUP_DATA', "") 
  props.updateTableData('CHANGE_SELECTED_ROLES', "")
  //refreshMasterTable()
}
const closeMessageBox =()=>{
  setShowMessagePopup(false)
  store.dispatch({type:"CHANGE_CHECKBOX_MESSAGE_POPUP_DATA", payload:""})
}
const closeCkeckboxModal=()=>{
  store.dispatch({type:"DATA_CHECKBOX_POPUP", payload:""})
store.dispatch({type:"SHOW_CHECKBOX_POPUP", payload:false})  
}
useEffect(()=>{
  if(props.popupMessaage !== ""){
    setAlertData(props.popupMessaage)
    setShowMessagePopup(true)
  }
},[props.popupMessaage])

useEffect(() => {
  setrawTableData(props.tableData)
  var result = uniqueData(JSON.parse(JSON.stringify(props.tableData)), ["Role_ID", "User_ID"])  
  props.updateTableData('CHANGE_USERS_LIST',result);
  console.log(result)
  setrawTableData(result)
  setFilteredDataForTable(result)
  prepareFileToDownload(result)
}, [props.tableData]);


useEffect(() => {
  if(props.dataCheckBox !== ""){
    manupulateCheckBoxData(props.dataCheckBox)
  }  
  setCheckBoxModal(props.showCheckboxPopup)
}, [props.showCheckboxPopup]);

const manupulateCheckBoxData=(row)=>{
  let totalData = []
  var dataJson = {userID:"", roleID:"", roleName:"", roleIsActive: false}
  let roleID = row.Role_ID.split(',');
  row.Role_Name.split(',').forEach((obj,idx)=>{
    dataJson.userID  = row.User_ID
    dataJson.roleID = roleID[idx]
    dataJson.roleName = obj
    dataJson.roleIsActive = getRoleIsActive(roleID[idx], row.User_ID)
    totalData.push(JSON.parse(JSON.stringify(dataJson)))
  })
  setDataForPopUp(totalData)
  
}

const getRoleIsActive=(roleID, userID)=>{
  let data = props.rawTableData
  let status = false
  for(let i =0; i < data.length ; i++){
    if(data[i].Role_ID == roleID && data[i].User_ID == userID){
      if( data[i].Role_Active_Flag.data[0]==1)
      {status = true}
      break
    }
  }
return status
}

useEffect(() => {    
      
  let updatedData = props.popupData
  console.log(props.popupData)
  if (updatedData != "") {
    if (document.getElementById('button1')) {
      document.getElementById('email').value = updatedData.email
      document.getElementById('number').value = updatedData.number
      document.getElementById('button1').innerHTML = "Update Role"
    }
    if (updatedData === "") {
      if (document.getElementById('button1')) {
        document.getElementById('button1').innerHTML = "Assign Role"
      }
    }
  }
});

const uniqueData = (arr, keyProps) => {
  let m = _.uniqBy(arr, function (elem) {
    return JSON.stringify(_.pick(elem, keyProps));
  });
  return m;
}

const getRoleActOrDeact = (roleId, email)=>{
  let masterData = props.rawTableData
  let status = 0
  for(let i =0 ; i< masterData.length; i++)
  {
      if(masterData[i].Role_ID == roleId && masterData[i].Email_ID == email)
      {
        status = masterData[i].Role_Active_Flag.data[0];
      }
  }
return status
}

const addNewMember = ()=>{
setbindingPopup(true)
let emailID = document.getElementById("email").value
  let phNumber = document.getElementById("number").value
  document.getElementById("emailError").innerHTML = ""
  document.getElementById("numberError").innerHTML = ""
  document.getElementById("roleError").innerHTML = ""
  let role = props.selectedRole   
  let revRoles = props.rolesToRemove 
  let validate = appService.validatePopupForm(emailID, phNumber, role)   
  if(validate.status == true){
  let selectRoleID = ""
  let rejectedRoles = ""
  let bothStatus=[]
  if(role.length>0){




  role.forEach(obj => { 
   let data = {mobNO: phNumber, email:emailID, roles: obj.id, activeFlag:getRoleActOrDeact(obj.id, emailID), userActiveFlag:1, roleDeleteFlag:0}
   appService.GetDataFromApiPost(assginRoleURL, data)
   .then(response=>{
     appService.updateRoleMasterData()
   })
  });  
  }
try{
  if(revRoles.length>0){
    revRoles.forEach(obj => {
      rejectedRoles = rejectedRoles+obj.id+','
    });
    rejectedRoles = rejectedRoles.substring(0, rejectedRoles.length -1 )  

    let data = {mobNO: phNumber, email:emailID, roles: rejectedRoles, activeFlag:0, userActiveFlag:1, roleDeleteFlag:1}
    
  appService.GetDataFromApiPost(assginRoleURL, data)
  .then(response=>{
    appService.updateRoleMasterData()
  })
  }
props.updateTableData('CHANGE_POPUP_VIEW', false)
props.updateTableData('CHANGE_SELECTED_ROLES', "")
props.updateTableData('CHANGE_POPUP_DATA', "") 
store.dispatch({type:"CHANGE_CHECKBOX_MESSAGE_POPUP_DATA", payload:"success, Roles updated."})
}
catch(err){
  store.dispatch({type:"CHANGE_CHECKBOX_MESSAGE_POPUP_DATA", payload:"fail, "})
}
}
else{
  validate.section.forEach((obj,idx) =>{
    document.getElementById(obj).innerHTML = validate.message[idx]
})
}


}
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
const prepareFileToDownload= (rawData) =>{
    
  if((rawData !=="" || rawData !== undefined || rawData !== null )&& rawData.length > 0){
  let filterData = []
  rawData.forEach(obj =>{
    filterData.push({"Member Name": obj.User_Name, "Email ID":obj.Email_ID, "Phone Number":obj.Telephone_No, Role: obj.Role_Name}) 
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
    let searchData = JSON.parse(JSON.stringify(rawTableData))
    searchData.forEach(obj => {
      obj.User_Name = (obj.User_Name == null?'NA':obj.User_Name)
      obj.Email_ID = (obj.Email_ID == null?'NA':obj.Email_ID)
      obj.Telephone_No = (obj.Telephone_No == null?'NA':obj.Telephone_No)
      obj.Role_Name = (obj.Role_Name == null?'NA':obj.Role_Name)
      
      if (obj.User_Name.toLowerCase().includes(thingToSearch.toLowerCase()) || obj.Email_ID.toLowerCase().includes(thingToSearch.toLowerCase()) || obj.Telephone_No.toLowerCase().includes(thingToSearch.toLowerCase()) || obj.Role_Name.toLowerCase().includes(thingToSearch.toLowerCase())) {
        filterDataToShow.push(obj)
      }
    });
    setFilteredDataForTable(filterDataToShow)
    prepareFileToDownload(filterDataToShow)
  }

}
const removeOrAllow = (event, idx)=>{
  const preData  = [...dataForPopUp];
  preData[idx].roleIsActive = !preData[idx].roleIsActive
  setDataForPopUp(preData)  
}

const suspendOrActivateCheckboxRoles = () => { 
  let roleToActivate = ""
  let rolesToDeactivate = ""  
  dataForPopUp.forEach((obj)=>{
    if(obj.roleIsActive){
      roleToActivate = roleToActivate + obj.roleID+","
    }
    else{
      rolesToDeactivate = rolesToDeactivate + obj.roleID+","
    }
  })
  roleToActivate = roleToActivate.substr(0,roleToActivate.length-1)
  rolesToDeactivate = rolesToDeactivate.substr(0,rolesToDeactivate.length-1)
let row = props.dataCheckBox
let mobNumber = row.Telephone_No
let emailID = row.Email_ID
if(rolesToDeactivate){
let data = {mobNO: mobNumber, email:emailID, roles: rolesToDeactivate, activeFlag:0, userActiveFlag:1, roleDeleteFlag:0}
appService.GetDataFromApiPost(assginRoleURL, data).then((response)=>{
  if(response.status == 200){
    appService.updateRoleMasterData()
  }
})
}
if(roleToActivate){
  let data = {mobNO: mobNumber, email:emailID, roles: roleToActivate, activeFlag:1, userActiveFlag:1, roleDeleteFlag:0}
  appService.GetDataFromApiPost(assginRoleURL, data).then((response)=>{
    if(response.status == 200){
      appService.updateRoleMasterData()
    }
  })
}
console.log(props)
store.dispatch({type:"DATA_CHECKBOX_POPUP", payload:""})
store.dispatch({type:"SHOW_CHECKBOX_POPUP", payload:false})
store.dispatch({type:"CHANGE_CHECKBOX_MESSAGE_POPUP_DATA", payload:"success, Roles updated."})
}

return (

  <React.Fragment>
    <Card className="mini-stat">
    <CardHeader className="bl-bg">
        <h4 className="title-text">Role Data</h4>
        {/* Search and CSV Download */}
        <span className="float-right">
          <Input 
            className="search-elem"
            type="text" 
            id="searchData"
            placeholder={"Search..."} 
            onChange={()=>{searchAnything()}}
          />
          <CsvDownload 
            className="file-dwd ml-3" 
            data={toCSV}
            filename={"Role_Data.csv"}
          />
        </span>
      </CardHeader>
      <CardBody>
      <Modal
                  isOpen={props.showRolePoupup}
                  toggle={true}
                >
                  <div className="modal-header">
                    <h5 className="modal-title mt-0">Invite New Member</h5>
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
                      <div className="col-sm-12">
                          <div className="form-group row">
                          <Label for="name">Email ID</Label>
                          <Input type="email" id="email" placeholder="Enter email id" />
                              <Label for="name" id="emailError" style={errorMsgStyle}></Label>
                          </div>
                          <div className="form-group row">
                          <Label for="name">Phone Number</Label>
                            <Input type="number" id="number" placeholder="Enter mobile number" />
                              <Label for="name" id="numberError" style={errorMsgStyle}></Label>
                          </div>
                          <div className="form-group row">
                              <Label for="name">Role</Label>
                              <MultiChipSelect />
                              <Label for="name" id="roleError" style={errorMsgStyle}></Label>
                          </div>
                          <div className="form-group row">
                            <button className="btn btn-block update-btn font" onClick={()=>{addNewMember()}} id="button1">
                              Assign Role
                            </button>
                          </div>
                      </div>
                  </div>
                </Modal>



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
                          { alertData !== "" ?
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

                                    {/* modal for checkbox*/}
                                    <Modal
                          isOpen={checkBoxModal}
                          /*toggle={false}*/
                      >
                          <div className="modal-header">
                              <h5 className="modal-title mt-0">Message</h5>
                              <button
                                  type="button"
                                  onClick={() =>
                                    closeCkeckboxModal()
                                  }
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                              >
                                  <span aria-hidden="true">&times;</span>
                              </button>
                          </div>
                          <div className="modal-body">
                          {dataForPopUp.map((item,idx)=>
                                <FormControlLabel
                                control={
                                       <Checkbox                                      
                                       checked={item.roleIsActive}
                                         onChange={(event)=>removeOrAllow(event, idx)}
                                         name={"checkBox"+item.roleID}
                                         primary
                                           />
                                           }
                                         label={item.roleName}
                                           />
                          )}
                        
                          </div>
                          <div className="form-group row">
                            <button className="btn btn-block update-btn font" onClick={()=>{suspendOrActivateCheckboxRoles()}} id="button1">
                            Proceed
                            </button>
                          </div>
                      </Modal>



                <DataTable
            className="data-table"
            columns={columns}
            data={filteredDataForTable}
            noHeader={true}
            customStyles={RoleHeaderStyle}
            fixedHeader
            fixedHeaderScrollHeight="500px"
            pagination
        />         
        
      </CardBody>
    </Card>
  </React.Fragment>
)
}
const mapStatetoProps = state => { 
return { 
    tableData : state.masterRoleTableData.masterRoleTableDataRaw,
    showRolePoupup : state.rolePopup.showRolePoupup,
    popupData : state.rolePopupData.popupData,
    selectedRole : state.selectedRoles.roles,
    rolesToRemove : state.selectedRoles.roleToRemove,
    showCheckboxPopup : state.masterRoleTableData.showCheckboxPopup,
    dataCheckBox : state.masterRoleTableData.dataCheckBox,
    rawTableData : state.roleTableData.tableData,
    popupMessaage : state.rolePopupData.checkBoxmessage
};
};
const dispatchToProps = dispatch => {
return {
  updateTableData: (type, payload) => {
    dispatch({ type: type, payload: payload })
  }
}
}

export default withRouter(connect(mapStatetoProps, dispatchToProps)(RoleData));

//export default RoleData;