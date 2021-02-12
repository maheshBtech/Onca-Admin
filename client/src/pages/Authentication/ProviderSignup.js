import React, { Component } from "react";
import { Row, Col, Card, CardBody, Alert } from "reactstrap";

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import store from '../../store/index'

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

import Loader from "../../components/Loader";
// actions
import { loginUser } from "../../store/actions";

// import images
import logoSm from "../../assets/images/Onca-Logo.png";

import { ValidationMessage } from "../Provider/CommonMessage";
import queryString from 'query-string'
import AppService from "../../AppService";
import {getAuthenticationCodeDetails, addProviderFromProviderSignup, deactivateAuthenticationCode} from '../../AppConfig'
import SweetAlert from "react-bootstrap-sweetalert";

const appService = new AppService()

class ProviderSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ProviderName: '', ProviderNameValid: false,
      subdomain: '', subdomainValid: false,
      address: '', addressValid: false,
      ContactPerson: '', ContactPersonValid: false,
      ContactNumber: '', ContactNumberValid: false,
      EmailId:'', EmailIdValid: false,
      formValid: false,
      errorMsg: {},
      ECommerce : false,
      Training : false,
      isCodeValid: false,
      success_msg:false,
      fail_msg:false,
      alertBoxData:""
    };

    // handleValidSubmit
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.getAuthenticationCode();
  }

  //to GetAuthentication Code and check if code is not expired
  getAuthenticationCode(){
    let code = queryString.parse(this.props.location.search).authenticationCode;
    let data ={
      authenticationCode:code
    }
    if(code){
    appService.GetDataFromApiPost(getAuthenticationCodeDetails, data)
    .then(
      response=>{        
        if(response.status = 200){
          if(response.data[0][0] !== undefined){
          this.checkIfAuthenticated(response.data[0][0]) 
        }
          else{
            this.showInvitationError()
          }         
        }
        
      }
    );
  }
  }

  checkIfAuthenticated(data){    
    let endDate="";
    let currentDate = this.getCurrenDate();
    if(data.hasOwnProperty('End_Date') && data.End_Date){
      endDate = data.End_Date.split('T')[0]
    endDate = endDate.split('-')[1]+'/'+endDate.split('-')[2]+'/'+endDate.split('-')[0] 
    if(currentDate > endDate || data.End_Date === undefined){
      this.showInvitationError()
    }
    else{
      store.dispatch({type:'CHANGE_CURRENT_PROVIDER_SIGNUP_DATA', payload:data})
      this.setState({isCodeValid:true});
      this.setState({EmailId:data.Email_ID})
    }   
  }
  else{
    this.showInvitationError()
  }

  }

  showInvitationError(){
    this.setState({alertBoxData:"Invitation is not valid."})
    this.setState({fail_msg:true})
   this.setState({success_msg:false})
  }

  getCurrenDate(){
    var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
    return today = mm+'/'+dd+'/'+yyyy
  }

  // handleValidSubmit
  handleValidSubmit(event, values) {
    this.props.loginUser(values, this.props.history);
  }

  /* Provider name validation methods */
  updateProviderName = (ProviderName) => {
    this.setState({ProviderName}, this.validateProviderName)
  }
  validateProviderName = () => {
    const {ProviderName} = this.state;
    let ProviderNameValid = true;
    let errorMsg = {...this.state.errorMsg}
  
    /*if(ProviderName.length==0){
      ProviderNameValid = false;
      errorMsg.ProviderName = 'Provider name cannot be blank';
    }*/
    this.setState({ProviderNameValid, errorMsg}, this.validateForm)
  }

  handleProviderNameChange=(e)=>{
    this.setState({ProviderName: e.target.value});
  }

  /* Subdomain validation methods */
  updatesubdomain = (subdomain) => {
    this.setState({subdomain}, this.validatesubdomain)
  }
  validatesubdomain = () => {
    const {subdomain} = this.state;
    let subdomainValid = true;
    let errorMsg = {...this.state.errorMsg}
  
    // if(subdomain.length==0){
    //   subdomainValid = false;
    //   errorMsg.subdomain = 'Sub domain cannot be blank';
    // } 
    if(this.validSubdomain(subdomain) == false){
      subdomainValid = false;
      errorMsg.subdomain = 'Sub domain name is not correct';
    }
    this.setState({subdomainValid, errorMsg}, this.validateForm)
  }

  validSubdomain(name) {
    var re = /[^a-z0-9\-]/;
    var val = name;
    if(re.test(val)) {
       return false
    }
    else{
      return true
    }
}

  handlesubdomainChange=(e)=>{
    this.setState({subdomain: e.target.value});
  }

  /* address validation methods */
  updateaddress = (address) => {
    this.setState({address}, this.validateaddress)
  }
  validateaddress = () => {
    const {address} = this.state;
    let addressValid = true;
    let errorMsg = {...this.state.errorMsg}
  
    /* if(address.length==0){
      addressValid = false;
      errorMsg.address = 'Address cannot be blank';
    } else  */if (address.length>100){
      addressValid = false;
      errorMsg.address = 'Address is too long';
    }
    this.setState({addressValid, errorMsg}, this.validateForm)
  }

  handleaddressChange=(e)=>{
    this.setState({address: e.target.value});
  }

   /* ContactPerson validation methods */
   updateContactPerson = (ContactPerson) => {
    this.setState({ContactPerson}, this.validateContactPerson)
  }
  validateContactPerson = () => {
    const {ContactPerson} = this.state;
    let ContactPersonValid = true;
    let errorMsg = {...this.state.errorMsg}
  
/*     if(ContactPerson.length==0){
      ContactPersonValid = false;
      errorMsg.ContactPerson = 'Contact Person cannot be blank';
    } */
    this.setState({ContactPersonValid, errorMsg}, this.validateForm)
  }

  handleContactPersonChange=(e)=>{
    this.setState({ContactPerson: e.target.value});
  }

  /* ContactNumber validation methods */
  updateContactNumber = (ContactNumber) => {
    this.setState({ContactNumber}, this.validateContactNumber)
  }
  validateContactNumber = () => {
    const {ContactNumber} = this.state;
    let ContactNumberValid = true;
    let errorMsg = {...this.state.errorMsg}
  
    /* if(ContactNumber.length==0){
      ContactNumberValid = false;
      errorMsg.ContactNumber = 'Contact number cannot be blank';
    } else  */if (ContactNumber.length>=1 && ContactNumber.length!=10){
      ContactNumberValid = false;
      errorMsg.ContactNumber = 'Contact number should be 10 digit';
    }
    this.setState({ContactNumberValid, errorMsg}, this.validateForm)
  }

  handleContactNumberChange=(e)=>{
    this.setState({ContactNumber: e.target.value});
  }

  /* EmailId validation methods */
  updateEmailId = (EmailId) => {
    this.setState({EmailId}, this.validateEmailId)
  }
  validateEmailId = () => {
    const {EmailId} = this.state;
    let EmailIdValid = true;
    let errorMsg = {...this.state.errorMsg}
  
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(EmailId)){
      EmailIdValid = false;
      errorMsg.EmailId = 'Please enter valid email';
    }
    this.setState({EmailIdValid, errorMsg}, this.validateForm)
  }

  handleEmailIdChange=(e)=>{
    this.setState({EmailId: e.target.value});
  }

  /* ECommerce Validation*/
  handleECommerceChange=(e)=>{
    this.setState({ECommerce: e.target.checked});
  }

  /* Training validation */
  handleTraningChange=(e)=>{
    this.setState({Training: e.target.checked});
  }

   /* validate form method */
   validateForm = () => {
    const {ProviderNameValid, subdomainValid, addressValid, ContactPersonValid, ContactNumberValid, EmailIdValid} = this.state;
    this.setState({
      formValid: ProviderNameValid && subdomainValid && addressValid && ContactPersonValid && ContactNumberValid && EmailIdValid
    })
  } 
 addNewProvider(){
   let data = {
    providerID: null,
    Provider_Name:this.state.ProviderName,
    Contact_Number:this.state.ContactNumber,
    Email_Id:this.state.EmailId,
    Contact_Person:this.state.ContactPerson,
    subDomain:this.state.subdomain,
    websiteUrl: null,
    address:this.state.address,
    newProvider: 1
    }
    appService.GetDataFromApiPost(addProviderFromProviderSignup, data)
    .then(response=>{
      if(response.status == 200){
       this.setState({alertBoxData:"Provider Added."})
       this.setState({success_msg:true})       
       let codeData = store.getState().generalData.providerSignUP;
       let data ={
        AuthenticationCode:codeData.Authentication_Code,
        deleteFlag:1,
        activeFlag:0
       }
       appService.GetDataFromApiPost(deactivateAuthenticationCode, data)
       .then(res=>{
        if(response.status == 200){ this.redirectTo(); }
       });
      }
      else{
        this.setState({alertBoxData:"Some Error Occured."})
        this.setState({fail_msg:true})
       this.setState({success_msg:false})    
      }
    });

 }
redirectTo(){
  window.location.href = "http://www.google.com";
}

 closeAlertBox(){         
  this.setState({success_msg:false})
  this.setState({alertBoxData:""})       
  this.setState({fail_msg:false})
}

  render() {
    return (
      <React.Fragment>
                      {this.state.success_msg ? (
                        <SweetAlert
                          title="Success!"
                          success                                                 
                          onConfirm={() => this.redirectTo()}                          
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


        <div className="signup-pages mt-3 clearfix">
          <div className="left-container">
            <img src={logoSm} height="75" alt="logo" />
            <h1>
              Onca <span>Active</span>
            </h1>
          </div>
          <div className="right-container">
            <Row className="justify-content-center">
              <Col sm={12} lg={9} xl={8} md={12}>
                <div className="position-relative">
                  {this.props.loading ? <Loader /> : null}
                  <Card className="overflow-hidden">
                    <CardBody className="p-4">
                      <div className="p-3">
                        <h2>
                            Sign Up
                        </h2>
                        <AvForm
                          className="form-horizontal mt-4"
                          // onValidSubmit={this.handleValidSubmit}
                        >
                          {this.props.error ? (
                            <Alert color="danger">{this.props.error}</Alert>
                          ) : null}

                          <div className="form-group">
                            <AvField
                            disabled={!this.state.isCodeValid}
                              name="ProviderName"
                              label="Provider Name"
                              className="form-control"
                              value=""
                              placeholder="Enter Provider Name"
                              type="text"
                              required
                              value={this.state.ProviderName} 
                              onChange={this.handleProviderNameChange} 
                              onBlur={(e) => this.updateProviderName(this.state.ProviderName)}/>
                              <ValidationMessage valid={this.state.ProviderNameValid} message={this.state.errorMsg.ProviderName}
                            />
                          </div>
                          <div className="form-group">
                            <AvField
                            disabled={!this.state.Em}
                              name="EmailID"
                              label="Email ID"
                              className="form-control"
                              value=""                              
                              type="email"
                              disabled
                              value={this.state.EmailId} 
                            />
                          </div>
                          <div className="form-group">
                            <AvField
                            disabled={!this.state.isCodeValid}
                              name="subdomain"
                              label="Enter Subdomain"
                              type="text"
                              required
                              value=""
                              placeholder="Enter Subdomain"
                              value={this.state.subdomain} 
                              onChange={this.handlesubdomainChange} 
                              onBlur={(e) => this.updatesubdomain(this.state.subdomain)}/>
                              <ValidationMessage valid={this.state.subdomainValid} message={this.state.errorMsg.subdomain}
                            />
                          </div>
                          <div className="form-group">
                            <AvField
                            disabled={!this.state.isCodeValid}
                              name="address"
                              label="Enter Address"
                              type="text"
                              required
                              value=""
                              placeholder="Enter Address"
                              value={this.state.address} 
                              onChange={this.handleaddressChange} 
                              onBlur={(e) => this.updateaddress(this.state.address)}/>
                              <ValidationMessage valid={this.state.addressValid} message={this.state.errorMsg.address}
                            />
                          </div>
                          <div className="form-group">
                            <AvField
                            disabled={!this.state.isCodeValid}
                              name="ContactPerson"
                              label="Contact Person Name"
                              type="text"
                              required
                              value=""
                              placeholder="Enter Contact Person Name"
                              value={this.state.ContactPerson} 
                              onChange={this.handleContactPersonChange} 
                              onBlur={(e) => this.updateContactPerson(this.state.ContactPerson)}/>
                              <ValidationMessage valid={this.state.ContactPersonValid} message={this.state.errorMsg.ContactPerson}
                            />
                          </div>
                          <div className="form-group">
                            <AvField
                            disabled={!this.state.isCodeValid}
                              name="ContactNumber"
                              label="Contact Number"
                              type="number"
                              required
                              value=""
                              placeholder="Enter Contact Number"
                              value={this.state.ContactNumber} 
                              onChange={this.handleContactNumberChange} 
                              onBlur={(e) => this.updateContactNumber(this.state.ContactNumber)}/>
                              <ValidationMessage valid={this.state.ContactNumberValid} message={this.state.errorMsg.ContactNumber}
                            />
                          </div>
                            <Row>
                                <Col sm={12}>
                                    <div class="custom-control custom-checkbox float-left">
                                        <input disabled={!this.state.isCodeValid}  type="checkbox" class="custom-control-input" id="ECommerce" onChange={this.handleECommerceChange}/>
                                        <label class="custom-control-label" for="ECommerce">E-Commerce</label>
                                    </div>
                                    <div class="custom-control custom-checkbox float-left ml-3">
                                        <input disabled={!this.state.isCodeValid} type="checkbox" class="custom-control-input" id="Training" onChange={this.handleTraningChange}/>
                                        <label class="custom-control-label" for="Training">Training</label>
                                    </div>
                                </Col>
                            </Row>
                          <Row className="form-group">
                            <Col sm={12}>
                              <button disabled={!this.state.isCodeValid} onClick={()=>{this.addNewProvider()}}
                                className="btn btn-orange btn-block w-md waves-effect waves-light mt-3"
                                type="submit"
                              >
                                Register
                              </button>
                            </Col>
                          </Row>
                        </AvForm>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="text-center mt-3">
          <p className="mb-0">
            © {new Date().getFullYear()} Onca Active{" "}
          </p>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  const { error, loading } = state.Login;
  return { error, loading };
};

export default withRouter(connect(mapStatetoProps, { loginUser })(ProviderSignup));