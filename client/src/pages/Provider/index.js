import React, { Component } from "react";
import { withRouter, Link } from 'react-router-dom';
import { Row, Col, Label, Input, Button } from "reactstrap";
import Cards from "./Cards/Cards";
import ProviderData from "./SubComponent/ProviderData";
import { Modal } from "reactstrap";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ValidationMessage } from "./CommonMessage";
import { AddProvider, mailer } from "../../AppConfig";
import AppService from "../../AppService";
import { listRoleURL, generateAuthenticationCode, inserttAuthenticationCode } from '../../AppConfig'
import { connect } from "react-redux";
import store from "../../store";
import SweetAlert from "react-bootstrap-sweetalert";

class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal_add_provider: false,
      modal_invite_provider: false,
      modal_scroll: false,
      ProviderName: '', ProviderNameValid: false,
      subdomain: '', subdomainValid: false,
      address: '', addressValid: false,
      ContactPerson: '', ContactPersonValid: false,
      ContactNumber: '', ContactNumberValid: false,
      EmailId: '', EmailIdValid: false,
      SetPassword: "", SetPasswordValid: false,
      country: '', countryValid: false,
      city: '', cityValid: false,
      InvitationEmailId: '', InvitationEmailIdValid: false,
      formValid: false,
      errorMsg: {},
      ECommerce: false,
      Training: false,
      websiteUrl: '', websiteUrlValid: true,
      AddProviderUrl: AddProvider,
      providerId: "",
      newProviderCreationFlag: 1,
      success_msg: false,
      with_title: false,
      alertBoxData: "",
      notGoneOnce: true,
      mail: { toMail: "", subject: "", body: "", from: "" },
      rawCountryList: "",
      rawCityList: "",
      cityList: '',
      enableCity: false
    };
    this.add_provider = this.add_provider.bind(this);
    this.invite_provider = this.invite_provider.bind(this);
    this.tog_scroll = this.tog_scroll.bind(this);
    this.addProvider = this.addProvider.bind(this);
    this.AppService = new AppService();
    store.dispatch({ type: 'CHANGE_CURRENT_PAGE_NAME', payload: "Provider" });
    this.getCountryAndStateList();
  }
  removeBodyCss() {
    document.body.classList.add("no_padding");
  }
  getDropDownList() {

  }
  add_provider() {
    if (this.props.countryList == '' || this.props.countryList == undefined) {
      this.getCountryAndStateList();
    }
    this.deleteAllFormData()
    this.setState(prevState => ({
      modal_add_provider: !prevState.modal_add_provider
    }));
    this.removeBodyCss();
  }
  // to load country and city
  getCountryAndStateList() {
    //
    this.AppService.GetDataFromApiPost(listRoleURL, null)
      .then((response) => {
        if (response.status == 200) {
          store.dispatch({ type: 'CHANGE_COUNTRY_LIST', payload: response.data[8] })
          store.dispatch({ type: 'CHANGE_STATE_LIST', payload: response.data[9] })   
          store.dispatch({ type: 'CHANGE_CITY_LIST', payload: response.data[10] })  
          this.state.rawCountryList = response.data[8];
          this.state.rawCityList = response.data[9];
          // this.setState({rawCountryList:response.data[9]});
          // this.setState({rawCityList:response.data[10]});

        }
      })
  }
  invite_provider() {
    this.setState(prevState => ({
      modal_invite_provider: !prevState.modal_invite_provider
    }));
    this.removeBodyCss();
    this.setState({ InvitationEmailId: "" })
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
  deleteAllFormData() {
    //this.setState({modal_add_provider:true})
    this.setState({ ProviderName: "" })
    this.setState({ ContactPerson: "" })
    this.setState({ EmailId: "" })
    this.setState({ ContactNumber: "" })
    this.setState({ subdomain: "" })
    this.setState({ address: "" })
    this.setState({ city: "" })
    this.setState({ country: "" })
    store.dispatch({ type: "CHANGE_PROVIDER_UPDATE_FLAG", payload: false })
  }
  /* Provider name validation methods */
  updateProviderName = (ProviderName) => {
    this.setState({ ProviderName }, this.validateProviderName)
  }
  validateProviderName = () => {
    const { ProviderName } = this.state;
    let ProviderNameValid = true;
    let errorMsg = { ...this.state.errorMsg }

    if (ProviderName.length == 0) {
      ProviderNameValid = false;
      errorMsg.ProviderName = 'Provider name cannot be blank';
    }
    this.setState({ ProviderNameValid, errorMsg }, this.validateForm)
  }

  handleProviderNameChange = (e) => {
    this.setState({ ProviderName: e.target.value });
  }

  /* Subdomain validation methods */
  updatesubdomain = (subdomain) => {
    this.setState({ subdomain }, this.validatesubdomain)
  }
  validatesubdomain = () => {
    const { subdomain } = this.state;
    let subdomainValid = true;
    let errorMsg = { ...this.state.errorMsg }

    if (subdomain.length == 0) {
      subdomainValid = false;
      errorMsg.subdomain = 'Sub domain cannot be blank';
    }
    else if (this.validSubdomain(subdomain) == false) {
      subdomainValid = false;
      errorMsg.subdomain = 'Sub domain name is not correct';
    }
    this.setState({ subdomainValid, errorMsg }, this.validateForm)
  }
  validSubdomain(name) {
    var re = /[^a-z0-9\-]/;
    var val = name;
    if (re.test(val)) {
      return false
    }
    else {
      return true
    }
  }

  handlesubdomainChange = (e) => {
    this.setState({ subdomain: e.target.value });
  }
  handleCountryChange = (value) => {
    this.setState({ country: value }, () => {
      this.prepareCityList();
    })
  }

  /* address validation methods */
  updateaddress = (address) => {
    this.setState({ address }, this.validateaddress)
  }
  validateaddress = () => {
    const { address } = this.state;
    let addressValid = true;
    let errorMsg = { ...this.state.errorMsg }

    if (address.length == 0) {
      addressValid = false;
      errorMsg.address = 'Address cannot be blank';
    } else if (address.length > 100) {
      addressValid = false;
      errorMsg.address = 'Address is too long';
    }
    this.setState({ addressValid, errorMsg }, this.validateForm)
  }

  handleaddressChange = (e) => {
    this.setState({ address: e.target.value });
  }

  /* ContactPerson validation methods */
  updateContactPerson = (ContactPerson) => {
    this.setState({ ContactPerson }, this.validateContactPerson)
  }
  validateContactPerson = () => {
    const { ContactPerson } = this.state;
    let ContactPersonValid = true;
    let errorMsg = { ...this.state.errorMsg }

    if (ContactPerson.length == 0) {
      ContactPersonValid = false;
      errorMsg.ContactPerson = 'Contact Person cannot be blank';
    }
    this.setState({ ContactPersonValid, errorMsg }, this.validateForm)
  }

  handleContactPersonChange = (e) => {
    this.setState({ ContactPerson: e.target.value });
  }

  /* ContactNumber validation methods */
  updateContactNumber = (ContactNumber) => {
    this.setState({ ContactNumber }, this.validateContactNumber)
  }
  validateContactNumber = () => {
    const { ContactNumber } = this.state;
    let ContactNumberValid = true;
    let errorMsg = { ...this.state.errorMsg }

    if (ContactNumber.length == 0) {
      ContactNumberValid = false;
      errorMsg.ContactNumber = 'Contact number cannot be blank';
    } else if (ContactNumber.length != 10) {
      ContactNumberValid = false;
      errorMsg.ContactNumber = 'Contact number should be 10 digit';
    }
    this.setState({ ContactNumberValid, errorMsg }, this.validateForm)
  }

  handleContactNumberChange = (e) => {
    this.setState({ ContactNumber: e.target.value });
  }

  /* EmailId validation methods */
  updateEmailId = (EmailId) => {
    this.setState({ EmailId }, this.validateEmailId)
  }
  // updateSetPassword = (EmailId) => {
  //   this.setState({EmailId}, this.validateEmailId)
  // }

  updateWebsiteUrl = (websiteUrl) => {
    this.setState({ websiteUrl })
  }
  updateCityId = (city) => {
    this.setState({ city }, this.validateCity)
  }
  updateCountry = (country) => {
    this.setState({ country }, this.validateCountry)
  }
  validateCity() {

    const { city } = this.state;
    let cityValid = false
    let errorMsg = { ...this.state.errorMsg }
    if (city === "") {
      cityValid = false
      errorMsg.city = "Please provide city name"
    }
    else {
      cityValid = true
    }
    this.setState({ cityValid, errorMsg }, this.validateForm)
  }
  validateCountry() {
    const { country } = this.state;
    let countryValid = false
    let errorMsg = { ...this.state.errorMsg }
    if (country === "") {
      countryValid = false
      errorMsg.country = "Please provide country name"
      this.state.enableCity = false
    }
    else {
      countryValid = true
      this.state.enableCity = true
    }
    this.setState({ countryValid, errorMsg }, this.validateForm)
  }

  validateEmailId = () => {
    const { EmailId } = this.state;
    let EmailIdValid = true;
    let errorMsg = { ...this.state.errorMsg }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(EmailId)) {
      EmailIdValid = false;
      errorMsg.EmailId = 'Please enter valid email';
    }
    this.setState({ EmailIdValid, errorMsg }, this.validateForm)
  }

  handleEmailIdChange = (e) => {
    this.setState({ EmailId: e.target.value });
  }
  handleSetPasswordChange = (e) => {
    this.setState({ SetPassword: e.target.value });
  }
  handleCityChange = (value) => {
    this.setState({ city: value });
  }
  handleWebsiteUrldChange = (e) => {
    this.setState({ websiteUrl: e.target.value });
  }

  /* Invitation EmailId validation methods */
  updateInvitationEmailId = (InvitationEmailId) => {
    this.setState({ InvitationEmailId }, this.validateInvitationEmailId)
  }
  validateInvitationEmailId = () => {
    const { InvitationEmailId } = this.state;
    let InvitationEmailIdValid = true;
    let errorMsg = { ...this.state.errorMsg }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(InvitationEmailId)) {
      InvitationEmailIdValid = false;
      errorMsg.InvitationEmailId = 'Please enter valid email';
    }
    this.setState({ InvitationEmailIdValid, errorMsg }, this.validateForm)
  }

  handleInvitationEmailIdChange = (e) => {
    this.setState({ InvitationEmailId: e.target.value });
  }

  /* ECommerce Validation*/
  handleECommerceChange = (e) => {
    this.setState({ ECommerce: e.target.checked });
  }

  /* Training validation */
  handleTraningChange = (e) => {
    this.setState({ Training: e.target.checked });
  }

  /* validate form method */
  validateForm = () => {
    const { ProviderNameValid, subdomainValid, addressValid, ContactPersonValid, ContactNumberValid, EmailIdValid, countryValid, cityValid } = this.state;
    this.setState({
      formValid: ProviderNameValid && subdomainValid && addressValid && ContactPersonValid && ContactNumberValid && EmailIdValid && countryValid && cityValid
    })
  }

  /* Send Data to DB onSubmit */
  async addProvider() {
    const providerData = {
      "providerID": this.state.providerId === "" ? null : this.state.providerId,
      "Provider_Name": this.state.ProviderName,
      "Contact_Number": this.state.ContactNumber,
      "Email_Id": this.state.EmailId,
      "Contact_Person": this.state.ContactPerson,
      "subDomain": this.state.subdomain,
      "address": this.state.address,
      "websiteUrl": this.state.websiteUrl,
      "city": this.state.city,
      "country": this.state.country,
      "newProvider": this.state.newProviderCreationFlag
    }
    if (this.state.formValid) {
      await this.AppService.GetDataFromApiPost(this.state.AddProviderUrl, providerData)
        .then(response => {
          if (response.status === 200) {
            this.setState({ modal_add_provider: false })
            this.props.updateTableData("CHANGE_REFRESH_PROVIDER_TABLE", true)
            this.setState({ alertBoxData: "Provider data updated" })
            this.setState({ success_msg: true })
            this.setState({ with_title: false })
            this.props.updateTableData("RESET_PROVIDER_CARD_DATA", true);
          }
        })
        .catch(err => {
          this.setState({ success_msg: false })
          this.setState({ alertBoxData: "" })
          this.setState({ with_title: true })
        })
      console.log("Response received ");
    } else {
      console.log("Invalid data");
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if ((this.props.updateFlag !== prevProps.updateFlag) && this.props.updateFlag !== false) {
      const { ContactName, EmailID, Location, PhNumber, ProviderName, Service_Provider_ID, wesiteUrl, Sub_Domain_Name, Provider_Address, City_Name, Country_Name } = this.props.updateProviderData
      this.setState({ modal_add_provider: true })
      this.setState({ ProviderName: ProviderName })
      this.setState({ ContactPerson: ContactName })
      this.setState({ EmailId: EmailID })
      this.setState({ ContactNumber: PhNumber })
      this.setState({ subdomain: Sub_Domain_Name })
      this.setState({ address: Provider_Address })
      this.setState({ city: City_Name })
      this.setState({ country: Country_Name })
      this.setState({ newProviderCreationFlag: 0 })
      this.setState({ websiteUrl: wesiteUrl })
      this.setState({ providerId: Service_Provider_ID }, this.validationDuringBinding)
      store.dispatch({ type: "CHANGE_PROVIDER_UPDATE_FLAG", payload: false })
    }
    if (this.props.alertBoxData != "" && this.state.notGoneOnce === true) {
      if (this.props.alertBoxData.split(',')[0] == "success") {
        this.setState({ alertBoxData: this.props.alertBoxData.split(',')[1] })
        this.setState({ success_msg: true })
        this.setState({ notGoneOnce: false })
      }
      else {
        this.setState({ with_title: true })
      }
    }
  }
  validationDuringBinding() {
    this.validateProviderName();
    this.validateContactPerson();
    this.validateEmailId();
    this.validateContactNumber();
    this.validatesubdomain();
    this.validateaddress();
    this.validateCity();
    this.validateCountry();
    this.validateForm();
  }
  closeAlertBox() {
    this.props.updateTableData("SHOW_ALERT_BOX_DATA", "")
    this.setState({ success_msg: false })
    this.setState({ alertBoxData: "" })
    this.setState({ notGoneOnce: true })
  }
  updateTextValue(event) {

    let { mail } = this.state;
    let fullText = "";
    if (event.blocks) {
      event.blocks.forEach((obj, idx) => {
        fullText = fullText + obj.text + '\n';
      });
    }
    mail.body = fullText;
    this.setState({ mail })

  }
  sendMail() {

    let data = this.state.mail;
    data.toMail = this.state.InvitationEmailId;
    data.subject = "Invitaion as Provider on Onca Active!"
    data.type = "Email";
    data.body = data.body + '\n\n\n\n\n Please click on the link to signup:- http://admin.allapp.co.in/provider-signup';
    this.props.updateTableData('CHANGE_PROVIDER_EMAIL_DATA', data)
    console.log(data)
    if (this.state.InvitationEmailIdValid) {
      this.AppService.GetDataFromApiPost(generateAuthenticationCode, null)
        .then(response => {
          if (response.status = 200) {
            let code = response.data[0][0].Provider_Authentication_Code
            let emailData = this.props.emailData;
            emailData.body = emailData.body + '?authenticationCode="' + code + '"';
            this.props.updateTableData('CHANGE_PROVIDER_EMAIL_DATA', emailData)
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = yyyy + '-' + mm + '-' + dd;
            //for end date
            var someDate = new Date();
            var numberOfDaysToAdd = 2;
            someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
            dd = someDate.getDate();
            mm = someDate.getMonth() + 1;
            yyyy = someDate.getFullYear();
            var endDate = yyyy + '-' + mm + '-' + dd;
            let data = {
              code: code,
              email: this.props.emailData.toMail,
              startDate: today,
              endDate: endDate
            }
            this.AppService.GetDataFromApiPost(inserttAuthenticationCode, data)
              .then(response => {
                if (response.status = 200) {
                  let emailData = this.props.emailData;
                  this.AppService.GetDataFromApiPost(mailer, emailData)
                    .then(response => {
                      if (response.status = 200) {
                        store.dispatch({ type: "SHOW_ALERT_BOX_DATA", payload: "success, Invitation for Provider sent." })
                        this.setState({ modal_invite_provider: false })
                      }
                    })
                }
              });
          }
        })
    }
    else {
      this.validateInvitationEmailId()
    }
  }
  // prepare list of city as per selected country
  prepareCityList() {
    let { rawCityList } = this.state;
    let countryID = this.getCountryIDofCountry();
    if (countryID) {
      let cityList = [];
      if (countryID) {
        rawCityList.forEach(obj => {
          if (obj.Country_ID == countryID) {
            cityList.push(obj);
          }
        });
      }

      this.setState({ cityList: cityList });
    }
  }
  // returns id of selected country
  getCountryIDofCountry() {
    let { country } = this.state;
    let countryID = '';
    if (country) {
      let { rawCountryList } = this.state;
      if (country) {
        for (let i = 0; i < rawCountryList.length; i++) {
          if (rawCountryList[i].Country_Name.toLowerCase() == country.toLowerCase()) {
            countryID = rawCountryList[i].Country_ID;
            break;
          }
        }
      }
    }
    return countryID;

  }
  testMethod() {
    alert();
    console.log(this.state)

  }
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item active">
                    Provider
                                </li>
                </ol>
              </div>
            </Col>
            <Col sm={6} className="text-right">
              <Link to="/providers-cards" className="btn update-btn">
                Settings
                        </Link>
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
              {/* Add New Provider */}
              <button
                type="button"
                className="btn update-btn font"
                onClick={this.add_provider}
                data-toggle="modal"
                data-target=".bs-example-modal-center"
              >
                Add New Provider
                        </button>
              <Modal
                className="modal-lg"
                isOpen={this.state.modal_add_provider}
                toggle={this.add_provider}
              >
                <div className="modal-header">
                  <h5 className="modal-title mt-0">Add New Provider</h5>
                  <button
                    type="button"
                    onClick={() =>
                      this.setState({ modal_add_provider: false })
                    }
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <Row>
                    <Col lg={6}>
                      <div className="form-group">
                        <Label for="ContactPerson">Contact Person</Label>
                        <Input type="text" id="ContactPerson" name="ContactPerson"
                          value={this.state.ContactPerson} onChange={this.handleContactPersonChange} onBlur={(e) => this.updateContactPerson(this.state.ContactPerson)} />
                        <ValidationMessage valid={this.state.ContactPersonValid} message={this.state.errorMsg.ContactPerson} />
                      </div>
                      <div className="form-group">
                        <Label for="ContactNumber">Contact Number</Label>
                        <Input type="number" id="ContactNumber" name="ContactNumberValid"
                          value={this.state.ContactNumber} onChange={this.handleContactNumberChange} onBlur={(e) => this.updateContactNumber(this.state.ContactNumber)} />
                        <ValidationMessage valid={this.state.ContactNumberValid} message={this.state.errorMsg.ContactNumber} />
                      </div>
                      <div className="form-group">
                        <Label for="EmailId">Email ID</Label>
                        <Input type="Email" id="EmailId" name="EmailId"
                          value={this.state.EmailId} onChange={this.handleEmailIdChange} onBlur={(e) => this.updateEmailId(this.state.EmailId)} />
                        <ValidationMessage valid={this.state.EmailIdValid} message={this.state.errorMsg.EmailId} />
                      </div>


                      {/* Made UI changes... */}
                      <div className="form-group">
                        <Label for="AssignRole">Assign Role</Label>
                        <Input type="text" id="AssignRole" name="AssignRole"
                          value="Provider Admin" disabled />
                        {/* <ValidationMessage valid={this.state.EmailIdValid} message={this.state.errorMsg.EmailId} /> */}
                      </div>
                      <div className="form-group">
                        <Label for="SetPassword">Set Password</Label>
                        <Input type="password" id="SetPassword" name="SetPassword"
                          value={this.state.SetPassword} onChange={this.handleSetPasswordChange} />
                        {/* <ValidationMessage valid={this.state.SetPassword} message={this.state.errorMsg.SetPassword}/> */}
                      </div>


                      <Col sm={12}>
                        <div class="custom-control custom-checkbox float-left">
                          <input type="checkbox" className="custom-control-input" id="ECommerce" onChange={this.handleECommerceChange} />
                          <label class="custom-control-label" for="ECommerce">E-Commerce</label>
                        </div>
                        <div class="custom-control custom-checkbox float-left ml-3">
                          <input type="checkbox" className="custom-control-input" id="Training" onChange={this.handleTraningChange} />
                          <label class="custom-control-label" for="Training">Training</label>
                        </div>
                      </Col>
                    </Col>

                    <Col lg={6} >
                      <div className="form-group">
                        <Label for="ProviderName">Provider Name</Label>
                        <Input type="text" id="ProviderName" name="ProviderName"
                          value={this.state.ProviderName} onChange={this.handleProviderNameChange} onBlur={(e) => this.updateProviderName(this.state.ProviderName)} />
                        <ValidationMessage valid={this.state.ProviderNameValid} message={this.state.errorMsg.ProviderName} />
                      </div>
                      <div className="form-group">
                        <Label for="subdomain">Enter Subdomain</Label>
                        <Input type="text" id="subdomain" name="subdomain"
                          value={this.state.subdomain} onChange={this.handlesubdomainChange} onBlur={(e) => this.updatesubdomain(this.state.subdomain)} />
                        <ValidationMessage valid={this.state.subdomainValid} message={this.state.errorMsg.subdomain} />
                      </div>


                      <div className="form-group">
                        <Label for="EmailId">Website URL</Label>
                        <Input type="text" id="websiteUrl" name="websiteUrl"
                          value={this.state.websiteUrl} onChange={this.handleWebsiteUrldChange} onBlur={(e) => this.updateWebsiteUrl(this.state.websiteUrl)} />
                        <ValidationMessage /*valid={this.state.EmailIdValid} message={this.state.errorMsg.EmailId}*/ />
                      </div>
                      <div className="form-group">
                        <Label for="address">Address</Label>
                        <Input type="address" id="address" name="address"
                          value={this.state.address} onChange={this.handleaddressChange} onBlur={(e) => this.updateaddress(this.state.address)} />
                        <ValidationMessage valid={this.state.addressValid} message={this.state.errorMsg.address} />
                      </div>

                      <div className="form-group">
                        <Label for="country">Country</Label>
                        {/* <Input type="text" id="country" name="country"
                                      value={this.state.country} onChange={this.handleCountryChange} onBlur={(e) => this.updateCountry(this.state.country)}/> */}
                        <Autocomplete

                          options={this.state.rawCountryList}
                          onInputChange={(event, value) => {
                            this.handleCountryChange(value)
                          }}
                          onBlur={(e) => this.updateCountry(this.state.country)}
                          getOptionLabel={(option) => option.Country_Name}
                          renderInput={(params) => (
                            <div ref={params.InputProps.ref}>
                              <input value={this.state.country} type="text" {...params.inputProps} />
                            </div>
                          )}
                        />
                        <ValidationMessage valid={this.state.countryValid} message={this.state.errorMsg.country} />
                      </div>

                      <div className="form-group">
                        <Label for="City">State</Label>
                        {/* <Input type="text" id="City" name="City"
                                      value={this.state.city} onChange={this.handleCityChange} onBlur={(e) => this.updateCityId(this.state.city)}/> */}
                        <Autocomplete
                          disabled={!this.state.enableCity}
                          options={this.state.cityList}
                          onInputChange={(event, value) => this.handleCityChange(value)}
                          onBlur={(e) => this.updateCityId(this.state.city)}
                          getOptionLabel={(option) => option.State_Name}
                          renderInput={(params) => (
                            <div ref={params.InputProps.ref}>
                              <input value={this.state.city} type="text" {...params.inputProps} />
                            </div>
                          )}
                        />
                        <ValidationMessage valid={this.state.cityValid} message={this.state.errorMsg.city} />
                      </div>
                    </Col>



                    <Col sm={12}>
                      <button className="btn btn-block update-btn font mt-3" type='submit' disabled={!this.state.formValid} onClick={this.addProvider}>
                        Assign Provider
                                  </button>
                    </Col>
                  </Row>
                </div>
              </Modal>

              {/* Alert Box                        */}

              {this.state.success_msg ? (
                <SweetAlert
                  title="Success!"
                  success
                  showCancel
                  onConfirm={() => this.closeAlertBox()}
                >
                  {this.state.alertBoxData}
                </SweetAlert>
              ) : null}

              {this.state.with_title ? (
                <SweetAlert
                  title="Error!"
                  warning
                  onConfirm={() => this.setState({ with_title: false })}
                >
                  Some Error occure.
                </SweetAlert>
              ) : null}


              {/* Invite Provider */}
              <button
                type="button"
                className="btn update-btn font ml-2"
                onClick={this.invite_provider}
                data-toggle="modal"
                data-target=".bs-example-modal-center"
              >
                Invite Provider
                        </button>
              <Modal
                isOpen={this.state.modal_invite_provider}
                toggle={this.invite_provider}
              >
                <div className="modal-header">
                  <h5 className="modal-title mt-0">Invite Provider</h5>
                  <button
                    type="button"
                    onClick={() =>
                      this.setState({ modal_invite_provider: false })
                    }
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <Col sm={12}>
                    <div className="form-group row">
                      <Label for="name">Email ID</Label>
                      <Input type="Email" id="EmailId" name="EmailId"
                        value={this.state.InvitationEmailId} onChange={this.handleInvitationEmailIdChange} onBlur={(e) => this.updateInvitationEmailId(this.state.InvitationEmailId)} />
                      <ValidationMessage valid={this.state.InvitationEmailIdValid} message={this.state.errorMsg.InvitationEmailId} />
                    </div>
                    <div className="form-group row">
                      <Label for="name">Invitation Note</Label>
                      <Editor
                        onContentStateChange={(event) => this.updateTextValue(event)}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        toolbar={{
                          inline: { inDropdown: true },
                          list: { inDropdown: true },
                          textAlign: { inDropdown: true },
                          link: { inDropdown: false },
                          emoji: { inDropdown: false },
                        }}
                      />
                    </div>
                    <div className="form-group row mt-9">
                      <Link /*to="provider-signup"*/ className="btn btn-block update-btn font" onClick={() => { this.sendMail() }}>
                        Invite Provider
                                  </Link>
                    </div>
                  </Col>
                </div>
              </Modal>
            </Col>
          </Row>

          {/* Table */}
          <Row>
            <Col xl={12}>
              <ProviderData />
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}
const mapStatetoProps = state => {
  return {
    updateFlag: state.reloadProviderTableData.updateFlag,
    updateProviderData: state.reloadProviderTableData.updateProviderData,
    alertBoxData: state.reloadProviderTableData.alertBoxData,
    countryList: state.generalData.countryList,
    stateList: state.generalData.stateList,
    emailData: state.userProfileData.emailData
  };
};
const dispatchToProps = dispatch => {
  return {
    updateTableData: (type, payload) => {
      dispatch({ type: type, payload: payload })
    }
  }
}
export default withRouter(connect(mapStatetoProps, dispatchToProps)(Provider));