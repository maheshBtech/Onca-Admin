import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Label,
  Input,
  Row,
  Col
} from "reactstrap";
import { connect } from "react-redux";
import Switch from "react-switch";
import Select from "react-select";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ValidationMessage }  from "../CommonMessage"; 
import {updateUserDetails, ListLeadershipDropdownURL, roleUserList} from '../../../AppConfig'
import AppService from '../../../AppService';
import SweetAlert from "react-bootstrap-sweetalert";


const appDervice = new AppService();

const optionGroup = [
  {
    options: [
      { label: "Bangalore", value: "BLR" },
      { label: "Delhi", value: "Del" },
      { label: "Mumbai", value: "Mum" }
    ]
  }
];

const bloodGroup = [
  {
    options: [
      { label: "A+", value: 1 },
      { label: "A-", value: 2 },
      { label: "B+", value: 3 },
      { label: "B-", value: 4 },
      { label: "O+", value: 5 },
      { label: "O-", value: 6 },
      { label: "AB+", value: 7 },
      { label: "AB-", value: 8 },
    ]
  }
];

const tShirtSizeList = [
  {
    options: [
      { label: "XS", value: 1 },      
      { label: "S", value: 2 }, 
      { label: "M", value: 3 },   
      { label: "L", value: 4 },
      { label: "XL", value: 5 },        
      { label: "XXL", value: 6 },        
    ]
  }
];
class UserPersonalDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      switch1:false,
      userDetails:"",
      stateList:"",
      countryList:"",
      selectedState:"",
      cityList:"",
      selectedCountry:"",
      selectedCity:"",
      bloodGroup:"",
      emgContactNum:"",
      gender:'',
      emgContactPersonName:"",
      userType:'',
      userNameValid:true, userNameError:"",
      isFormValid: false,
      activityName:'',
      dob:'',
      tShirtSize:'',
      healthProblem:"",
      success_msg: false,
      fail_msg: false,
      alertBoxData: "",
      distanceList:[],
      selectedDistance:"",
      userWithFullDetails:"",
    };
    this.loadDistanceData();
    this.textareachange = this.textareachange.bind(this);
    this.loadStateAndCountryData();
    this.loadUserFullDetails();
    //console.log(this.props.userDetails)   
  }

  loadDistanceData(){
    
    let data = {
      provider: this.props.providerAndRoleData.Service_Provider_ID
    }
    appDervice.GetDataFromApiPost(ListLeadershipDropdownURL,data)
    
    .then(response=>{
      
      if (response === null) {
        this.setState({ modal_center: false })
        this.showError("Distance List API return NULL")
      }
      else if (response.status = 200) {
        this.setState({distanceList:response.data[8]});        
      }
      else {
        this.setState({ modal_center: false })
        this.showError("Error in transaction.")
      }
      
    })
  }

  loadUserFullDetails(){
    appDervice.GetDataFromApiPost(roleUserList,null)
    .then(response=>{
      if (response === null) {
        this.setState({ modal_center: false })
        this.showError("User full details API return NULL")
      }
      else if (response.status = 200) {
        
        this.setState({userWithFullDetails:response.data[0]}); 
        this.bindData()
        
      }
      else {
        this.setState({ modal_center: false })
        this.showError("Error in transaction.")
      }
      
    })
  }

  bindData(){
    
    let userVals = this.getUserDetails(this.state.userDetails.EmaiID)  
    this.state.dob =  userVals.Date_of_birth!==undefined?userVals.Date_of_birth.split('T')[0]:''
    //this.setState({dob:parseInt(userVals.Date_of_birth.split('T')[0])})
    this.setState({tShirtSize:parseInt(userVals.Tshirt_Size_ID)})
    this.setState({gender:parseInt(userVals.Gender_ID)})
    this.setState({userType:parseInt(userVals.User_Type_ID)})
    this.setState({bloodGroup:this.getBloodGroup(userVals.Blood_Group_ID)})   
    this.setState({emgContactNum:userVals.Emergancy_Telephone_No})    
    this.setState({emgContactPersonName:userVals.Emergancy_Name})
    this.setState({selectedDistance:userVals.Maximum_Distance_Run_Last_Year})
    this.setState({healthProblem:userVals.Health_Problem_Desc}) 
    this.setState({selectedCity:this.loadCity(userVals.City_ID)})   
    this.setState({selectedState:this.loadState(userVals.State_ID)})
    this.setState({selectedCountry:this.loadCountry(userVals.Country_ID)})
  }

  getBloodGroup(bloodGroupID){
    if(bloodGroupID!== undefined && bloodGroupID!==0){
    let retData = ''
    for(let i =0;  i< bloodGroup[0].options.length; i++){
      
      if(bloodGroup[0].options[i].value === bloodGroupID)
      {
        retData = bloodGroup[0].options[i]
        break
      }
    }
    return retData;
  }
  }
loadCity(cityCode){
if(!(cityCode!==undefined && cityCode !==0)){
  let retData = ''
    for(let i =0;  i< this.state.cityList.length; i++){
      
      if(this.state.cityList[i].City_ID === cityCode)
      {
        retData = {label: this.state.cityList[i].City_Name, value: this.state.cityList[i].City_ID}
        break
      }
    }
    return retData;
}
}
  
loadState(stateCode){
  if(stateCode!==undefined && stateCode !==0){
    let retData = ''
      for(let i =0;  i< this.state.stateList.length; i++){
        
        if(this.state.stateList[i].State_ID === stateCode)
        {
          retData = {label: this.state.stateList[i].State_Name, value: this.state.stateList[i].State_ID}
          break
        }
      }
      return retData;
  }
  }

  loadCountry(countryCode){
    if(countryCode!==undefined && countryCode !==0){
      let retData = ''
        for(let i =0;  i< this.state.stateList.length; i++){
          
          if(this.state.countryList[i].Country_ID === countryCode)
          {
            retData = {label: this.state.countryList[i].Country_Name, value: this.state.countryList[i].Country_ID}
            break 
          }
        }
        return retData;
    }
    }

  loadStateAndCountryData(){   
   
    this.state.stateList = this.props.stateList
    this.state.countryList = this.props.countryList
    this.state.cityList = this.props.cityList
    //this.setState({userDetails:this.props.userDetails},()=>{this.forceUpdate()});
    this.state.userDetails=this.props.userDetails
    }
    
 
  //Select
  handleSelectGroup = selectedGroup => {
    this.setState({ selectedGroup });
  };

  // Text area
  textareachange(event) {
    var count = event.target.value.length;
    if (count > 0) {
      this.setState({ textareabadge: true });
    } else {
      this.setState({ textareabadge: false });
    }
    this.setState({ textcount: event.target.value.length });
  }
  editableSwitch(){
    this.validateUserName()
    // alert(this.state.switch1)
    // console.log()
  }

  componentDidUpdate(prevProps, prevState) {
  
    if (prevProps.stateList !== this.props.stateList) {
      this.loadStateAndCountryData();
    }
  }
  updateState(event){
    this.setState({selectedState:event})  
  }
  updateCountry(event){
    this.setState({selectedCountry:event})    
  }

  handleUserNameChange(val){
    let uname = this.state.userDetails
    uname.UserName = val
    this.setState({userDetails:uname},()=>{this.validateUserName()})
  }
  validateUserName(){
   const {userDetails} = this.state
   let userNameValid = true
   let userNameError = ""
   if(userDetails.UserName.length <= 0){
    userNameValid = false;
    userNameError = "User Name cannot be empty";
   }
   else{
    userNameValid = true;
    userNameError = "";
   }
   this.setState({userNameValid,userNameError},()=>{this.isFormValid()})
  }
  handleGender(gender){
    
    gender = parseInt(gender);
    this.setState({gender})
  }
  handleUserType(userType){
    
    userType = parseInt(userType);
    this.setState({userType})
  }

  handleBloodGroup(event){
    
    this.setState({bloodGroup:event});
  }
  handleEmgContactPersonName(val){
    this.setState({emgContactPersonName:val})
  }

  handleEmgContNum(val){   
    if(String(val).length<=10) {this.setState({emgContactNum:val});  }    
  }

  ActivityChange(val){
  let val1 = this.state.userDetails
  val1.Activity_Name = val 
  this.setState({userDetails:val1})
  }
 
  haleDob(val){
    this.setState({dob:val})
  }

  handleHealthProblem(val){  
    if(val.length<=255)
    this.setState({healthProblem:val})
  }
  handleDistanceChange(val){
    this.setState({selectedDistance:val})
  }
  

  handleTshirtChange(val){this.setState({tShirtSize:parseInt(val)})}

  handleCityChange(val){this.setState({selectedCity:val})}
  
  isFormValid(){
    const {userNameValid} = this.state
    let isFormValid = userNameValid 
    this.setState({isFormValid});
  }


  updateProfile(){
    
    const {selectedCity, userDetails, emgContactPersonName, gender, emgContactNum, dob,
      selectedCountry, selectedState, tShirtSize, bloodGroup, healthProblem, selectedDistance} = this.state
    let userFullDetails = this.getUserDetails(userDetails.EmaiID)
    const{userType} = this.state
    let data= {
      userID:userFullDetails.User_Skey_ID,
      email:userDetails.EmaiID ,
      userTypeID:userType,
      phoneNumber:userDetails.PhNumber,
      emergencyPhoneNumber:emgContactNum,
      genderID:gender,
      address:userDetails.City,
      dob:dob,
      locationID:1,
      countryID:(selectedCountry.value===undefined?'':selectedCountry.value),
      stateID:(selectedState.value===undefined?'':selectedState.value),
      cityID:(selectedCity.value===undefined?'':selectedCity.value),
      tShirtSizeID:tShirtSize,
      bloodGroupID:(bloodGroup.value===undefined?'':bloodGroup.value),
      referalEmailID:'not provided',
      emergencyName:emgContactPersonName,
      userTypeVerifiedFlag:1,
      firstName:userFullDetails.First_Name,
      lastName:userFullDetails.Last_Name,
      unqueUserID:userFullDetails.User_ID,
      password:123456,
      health:healthProblem,
      maxDistLast:selectedDistance
    }
    appDervice.GetDataFromApiPost(updateUserDetails, data)
    .then(response=>{
      if (response === null) {
        this.setState({ modal_center: false })
        this.showError("User Profile API return NULL")
      }
      else if (response.status = 200) {
        this.setState({ modal_center: false })
        this.setState({ alertBoxData: "Transaction completed successfully." })
        this.setState({ fail_msg: false })
        this.setState({ success_msg: true })        
      }
      else {
        this.setState({ modal_center: false })
        this.showError("Error in transaction.")
      }
    })
  }
  getUserDetails(email){
    
    const{userWithFullDetails} = this.state
    let data = ''
    if(userWithFullDetails){
      for(let i=0; i<userWithFullDetails.length;i++)
      {
        if(userWithFullDetails[i].Email_ID ==email)
          data = userWithFullDetails[i];
          break;
        }
    }
    return data;
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
  render() {

    const{selectedCountry, selectedState, selectedCity, cityList, selectedDistance, distanceList,healthProblem, tShirtSize, dob, activityName, emgContactNum, emgContactPersonName, userType,gender, isFormValid, selectedGroup, switch1,countryList, stateList,userNameValid,userNameError } = this.state;
    const Offsymbol = props => {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            fontSize: 13,
            color: "#fff",
            paddingRight: 10
          }}
        >
          {" "}
                Non Editable
        </div>
      );
    };

    const OnSymbol = props => {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            fontSize: 13,
            color: "#fff",
            paddingRight: 20
          }}
        >
          {" "}
                Editable
        </div>
      );
    };
    const {userDetails} = this.state
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
        <Card className="mini-stat">
          <CardHeader className="bl-bg text-white">
            <b>User Information</b>
            <span className="float-right"><Switch
              uncheckedIcon={<Offsymbol />}
              checkedIcon={<OnSymbol />}
              onColor="#00C15A"
              width={115}
              onChange={() =>{
                this.editableSwitch()
                this.setState({ switch1: !this.state.switch1 })
                }}
              checked={this.state.switch1}
            />
            </span>
          </CardHeader>
          <CardBody>
            <h2 className="font-size-18 mt-4 pl-3">
              Personal Information
            </h2>
            <hr />
            <div className="container-fluid pl-4 pr-4">
              <Row>
                <Col lg={6}>
                  <Row>
                    <Col lg={6}>
                      <div className="form-group mb-0">
                        <Label for="UniqueID">User Unique ID</Label>
                        <Input type="text" id="UniqueID"
                          placeholder="DEL1VKJ2020"
                          name="UniqueID"
                          disabled
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="form-group mb-0">
                        <Label for="UserStatus">User Status</Label>
                        <Input type="UserStatus" id="UserStatus"
                          placeholder={userDetails.UserStatus}
                          name="UserStatus"
                          disabled
                        />
                      </div>
                    </Col>
                  </Row>
                  <div className="form-group mt-2">
                    <Label for="user-name">Name</Label>
                    <Input type="text" id="user-name"
                      onChange={(event)=>{this.handleUserNameChange(event.target.value)}}
                      onBlur={()=>{this.validateUserName()}}
                      disabled={!switch1}
                      placeholder={userDetails.UserName}
                      value={userDetails.UserName}
                      name="UserName"                     
                    />
                   <ValidationMessage valid={userNameValid} message={userNameError}/>

                  </div>
                  <div className="form-group mt-2">
                    <Label for="user-email">Email ID</Label>
                    <Input type="email" id="user-email"
                      disabled={!switch1}
                      placeholder={userDetails.EmaiID}
                      name="UserEmail"
                    />
                  </div>
                  <div className="form-group mt-2">
                    <Label for="user-Mob">Mobile Number</Label>
                    <Input type="number" id="user-Mob"
                     disabled={!switch1}
                      placeholder={userDetails.PhNumber}
                      name="UserMob"
                    />
                  </div>
                  <div className="form-group mt-2">
                    <Label for="User-Add">Address</Label>
                    <Input type="text" id="User-Add"
                     disabled={!switch1}
                      placeholder={userDetails.City}
                      name="UserAdd"
                    />
                  </div>
                   <div className="form-group mt-2">
                    <Label for="name">City</Label>
                    <Select
                     isDisabled={!switch1}
                      value={selectedCity}
                      onChange={(event)=>{this.handleCityChange(event)}}
                      options={this.state.cityList.map(obj=>{
                        return { label: obj.City_Name, value: obj.City_ID };
                      })}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <Label for="name">State</Label>                    
                    <Select
                     isDisabled={!switch1}
                      onChange={(event)=>{this.updateState(event)}}
                      //onChange={this.handleSelectGroup}
                      value={selectedState}
                      options={this.state.stateList.map(obj=>{
                        return { label: obj.State_Name, value: obj.State_ID };
                      })}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <Label for="name">Country</Label>
                    <Select
                     isDisabled={!switch1}
                      value={selectedCountry}
                      onChange={(event)=>{this.updateCountry(event)}}
                      options={this.state.countryList.map(obj=>{
                        return { label: obj.Country_Name, value: obj.Country_ID };
                      })}
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <Row>
                    <Col lg={6}>
                      <div className="form-group mb-0">
                        <Label for="SignUpDate">Sign Up Date</Label>
                        <Input type="Date" id="SignUpDate"
                          placeholder={userDetails.User_SignUp_Date}
                          value={userDetails.User_SignUp_Date.split('T')[0]}
                          name="SignUpDate"
                          disabled
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="form-group mb-0">
                        <Label for="RegDate">Registration Date</Label>
                        <Input type="RegDate" id="RegDate"
                          placeholder="2020-11-24 20:16:49"
                          name="RegDate"
                          disabled
                        />
                      </div>
                    </Col>
                  </Row>
                  <div className="form-group mt-2">
                    <Label for="UserDOB">Date of Birth</Label>
                    <Input type="date" id="UserDOB"
                     disabled={!switch1}
                      placeholder="23-07-1983"
                      name="UserDOB"
                      value={dob}
                      onChange={(event)=>{this.haleDob(event.target.value)}}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <Label for="UserDOB">Gender</Label>
                    <div className="col-s12">
                    <RadioGroup aria-label="gender" name="gender1" value={gender} onChange={(event)=>{this.handleGender(event.target.value)}}>
                      <FormControlLabel  disabled={!switch1} value={1} control={<Radio color="primary" />} label="Male" />
                      <FormControlLabel  disabled={!switch1} value={2} control={<Radio color="primary" />} label="Female" />
                      <FormControlLabel  disabled={!switch1} value={3} control={<Radio color="primary" />} label="Others" />
                    </RadioGroup>
                    </div>
                  </div>
                  <div className="form-group mt-2">
                    <Label for="UserDOB">User Type</Label>
                    <div className="col-s12">
                    <RadioGroup aria-label="userType" name="userType" value={userType} onChange={(event)=>{this.handleUserType(event.target.value)}}>
                      <FormControlLabel  disabled={!switch1} value={3} control={<Radio color="primary" />} label="Student" />
                      <FormControlLabel  disabled={!switch1} value={2} control={<Radio color="primary" />} label="Senior Citizen" />
                      <FormControlLabel  disabled={!switch1}  value={1} control={<Radio color="primary" />} label="General" />
                    </RadioGroup>
                    </div>
                  </div>
                  <div className="form-group mt-2">
                    <Label for="BloodGrp">Blood Group</Label>
                    <Select
                     isDisabled={!switch1}
                      onChange={(event)=>{this.handleBloodGroup(event)}    }                  
                      options={bloodGroup}
                      value={this.state.bloodGroup}
                    />
                    
                  </div>
                  <div className="form-group mt-2">
                    <Label for="EcontPer">Emergency Contact Person</Label>
                    <Input type="text" id="EcontPer"
                     disabled={!switch1}
                      placeholder="Person Name"
                      name="EcontPer"
                      onChange={(event)=>{this.handleEmgContactPersonName(event.target.value)}}
                      value={emgContactPersonName}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <Label for="EcontNo">Emergency Contact Number</Label>
                    <Input type="number" id="EcontNo"
                     disabled={!switch1}
                      placeholder="Phone Number"
                      name="EcontNo"
                      value={emgContactNum}
                      onChange={(event)=>{this.handleEmgContNum(event.target.value)}}
                    />
                    
                  </div>
                  <div className="form-group mt-2">
                    <Label for="ActName">Activity Name (Recently Joined)</Label>
                    <Input type="text" id="ActName"
                     disabled
                      placeholder={'Activity Name'}
                      value = {userDetails.Activity_Name}
                      name="ActName"
                      onChange={()=>{this.ActivityChange()}}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <Label for="GroupName">Group Name (Recently Joined)</Label>
                    <Input type="text" id="GroupName"
                     disabled={!switch1}
                      placeholder="group name"
                      name="GroupName"
                    />
                  </div>
                </Col>
              </Row>
            </div>
            <h2 className="font-size-18 mt-4 pl-3">
              Fitness Information
            </h2>
            <hr />
            <div className="container-fluid pl-4 pr-4 mb-3">
              <Row>
                <Col lg={6}>
                  <div className="form-group mt-2">
                    <Label for="UserDOB">T-shirt Size</Label>
                    <div className="col-s12">
                    <RadioGroup aria-label="userType" name="userType" value={tShirtSize} onChange={(event)=>{this.handleTshirtChange(event.target.value)}}>

                      <FormControlLabel disabled={!switch1} value={1} control={<Radio color="primary" />} label="XS" />
                      <FormControlLabel disabled={!switch1} value={2} control={<Radio color="primary" />} label="S" />
                      <FormControlLabel disabled={!switch1} value={3} control={<Radio color="primary" />} label="M" />
                      <FormControlLabel disabled={!switch1} value={4} control={<Radio color="primary" />} label="L" />
                      <FormControlLabel disabled={!switch1} value={5} control={<Radio color="primary" />} label="XL" />
                      <FormControlLabel disabled={!switch1} value={6} control={<Radio color="primary" />} label="XXL" />
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="form-group mt-2">
                    <Label for="name">Personal Best Event</Label>
                    <Select
                      value={selectedGroup}
                      onChange={this.handleSelectGroup}
                      options={optionGroup}
                    />
                  </div>
                </Col>
                <Col lg={6}>   
                {distanceList.length>0?              
                  <div className="form-group mt-2">
                    <Label for="UserDOB">Maximum Distance Run in Last Year</Label>
                    <div className="col-s12">
                    <RadioGroup aria-label="userType" name="userType" value={selectedDistance} onChange={(event)=>{this.handleDistanceChange(event.target.value)}}>
                    {                    
                       distanceList.map((item,idx)=>
                        <FormControlLabel disabled={!switch1} value={item.Distance_Option} control={<Radio color="primary" />} label={item.Distance_Option} />)
                       
                    }                     
                      
                    </RadioGroup>
                    </div>
                  </div>
                  :null} 
                  <div className="form-group mt-2">
                    <Label for="name">Personal Best Timing</Label>
                    <Input type="time" id="UserDOB"
                      placeholder="23-07-1983"
                      name="UserDOB"
                    />
                  </div>
                </Col>
                <Col lg={12}>
                  <Label for="name">Specify health problem (if any) that might hamper running</Label>
                  <Input
                  disabled={!switch1}
                      type="textarea"
                      id="textarea"                      
                      maxLength="225"
                      rows="3"
                      placeholder="This textarea has a limit of 225 chars."
                      value={healthProblem}
                      onChange={(event)=>{this.handleHealthProblem(event.target.value)}}
                    />
                    {this.state.textareabadge ? (
                      <span className="badgecount">
                        {" "}
                        {this.state.textcount} / 225{" "}
                      </span>
                    ) : null}
                </Col>
              </Row>
            </div>
          </CardBody>
        </Card>
        <div className="container-fluid pl-4 pr-4 mb-3">
          <Button className="btn update-btn mr-3" type="submit" 
          onClick={()=>{this.updateProfile()}}
          disabled={!isFormValid}
          >
            Update Profile
          </Button>
        </div>
      </React.Fragment>
    )
  }
}
const mapStatetoProps = state => {
  return {
    activityTableData: state.userPageData.activityTableData,
    stateList: state.generalData.stateList,
    countryList :  state.generalData.countryList,
    cityList :  state.generalData.cityList,
    userDetails: state.userPageData.userProfileData,
    userInformation : state.userProfileData.ProfileData[0],
    providerAndRoleData: state.currentPageName.roleAndProvider.selectedRole,    
  };
};
const dispatchToProps = dispatch => {
  return {
    updateTableData: (type, payload) => {
      dispatch({ type: type, payload: payload })
    }
  }
}
export default withRouter(connect(mapStatetoProps, dispatchToProps)(UserPersonalDetails));