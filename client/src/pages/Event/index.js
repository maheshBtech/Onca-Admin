import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import EventInformation from './EventParts/EventInformation';
import Connectivity from './EventParts/EventConnectivity';
import EventPricing from './EventParts/EventPricing';
import Visibility from './EventParts/EventVisibility';
import { EventObject, AllDlls } from './EventModel';
import { Card, Row, Col, CardBody, CardHeader, Label, Input } from "reactstrap";
import Switch from "react-switch";
import AppService from '../../AppService';
import { GetNewEventFormDDLsURL, GetEmailListURL } from '../../AppConfig';
import { EditorState, convertToRaw, convertFromRaw, ContentState } from 'draft-js';
import EventService from './EventService';
import Information_Message from './Event_Information_Message'
const appService = new AppService();
const EventService = new EventService();

const compValidationStatus = {
  AIValidationStatusTemp: false, APValidationStatusTemp: false, AVValidationStatusTemp = false,
  OverAllValidationStatusTemp: false
}
let ServiceProviderIDTemp;
class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...EventObject,
      ...AllDlls,
      switch1: true,
      error: {},
      selectedActTypeName: '',
      triggrtVaidation: false,
      buttonClickStatus: '',
      templateNameValidate: '',
      messageState: '',
      messageType: '', //warning / error / success
      EventTemplateList: [],
      registrationTemplateList: []
    }

    //This function is for the form handling
    this.handleEventInformation = this.handleEventInformation.bind(this); // Event Information Tab Callback
    this.handleEventConnectivity = this.handleEventConnectivity.bind(this); // Event Connectivity Tab Callback
    this.handleEventPricing = this.handleEventPricing.bind(this); // Event Pricing Tab Callback
    this.handleEventVisibility = this.handleEventVisibility.bind(this); // Event Visibility Tab Callback
    this.handleEventEmailTemplate = this.handleEventEmailTemplate.bind(this); // Event Email Template Tab Callback
    this.handleEventSMSTemplate = this.handleEventSMSTemplate.bind(this) // Event SMS Template Tab Callback
    this.handleAllCompValidation = this.handleAllCompValidation.bind(this); // Complete Event Form validation
    this.finalSubmit = this.finalSubmit.bind(this) // final Submit - with param string "save as tempate" or "submit"
  }
  //Constructor end
  componentDidMount() {
    ServiceProviderIDTemp = this.props.providerAndRoleData.Service_Provider_ID
    let data = {
      ProviderId: ServiceProviderIDTemp
    }
    // get all DLLs required in Event create form
    appService.GetDataFromApiPost(GetNewEventFormDDLsURL, data)
      .then((response) => {
        if (response.status == 200) {
          this.setState({ EventTypeList: response.data[0] })
          this.setState({ CountryList: response.data[5] })
          this.setState({ StateList: response.data[6] })
          this.setState({ CityList: response.data[7] })
        }
      })
      .catch(err => { console.log("error occured while getiing data of all ddls for new Event create") })

    let dataA = { ProviderID: ServiceProviderIDTemp }
    EventService.GetEmailList(GetEmailListURL, dataA)
      .then((response) => {
        let Eventtemplatelist = response.filter(result => /^Event/.test(result.Template_Type_Name));
        let registrationtemplatelist = response.filter(result => /^Registartion/.test(result.Template_Type_Name))
        this.setState({EventTemplateList: Eventtemplatelist})
        this.setState({registrationTemplateList: registrationtemplatelist})
      })

    //get Event data by Id
    if (this.props.toUpdateEventData.Event_ID !== 0 && this.props.toUpdateEventData.Event_ID !== null && this.props.toUpdateEventData.Event_ID !== undefined) {
      EventService.GetEventById(this.props.toUpdateEventData.Event_ID)
        .then(resp => {
          console.log(resp)
          let actRes = resp[0][0];
          let actPricingRes = resp[1];
          let actMappedUser = resp[2];
          if (actPricingRes.length > 0) {
            actPricingRes.forEach((elem, index) => {
              actPricingRes[index].id = index
              actPricingRes[index].TaxID = elem.Tax_ID
              actPricingRes[index].TrainingLocationID = elem.Training_Location_ID
            })
          }
          const bindbackData = {
            requestId: actRes.Event_ID,
            EventInformation: {
              EventName: actRes.Event_Name,
              EventType: actRes.Event_Type_ID,
              EventDescription: EditorState.createWithContent(convertFromRaw(JSON.parse(actRes.Event_Full_Desc))),//EditorState.createEmpty(), //resp[0].
              EventFromDate: actRes.Start_Date.slice(0, 10),
              EventToDate: actRes.End_Date.slice(0, 10),
              EventStartTime: actRes.Start_Time,
              EventEndTime: actRes.End_Time,
              EventImgUpload: [],
            },
            EventConnectivity: {
              EventModeLive: actRes.Event_Mode_Live_Flag.data[0] === 1 ? true : false,
              EventModeOnline: actRes.Event_Mode_Online_Flag.data[0] === 1 ? true : false,
              EventModeOnGround: actRes.Event_Mode_OnGround_Flag.data[0] === 1 ? true : false,
              EventECertificate: actRes.ECertificate_Flag.data[0] === 1 ? true : false,
              EventECertificateTemplate: actRes.ECertificate_Template_ID,
              EventRegistrationTemplate: actRes.Registration_Template_ID,
              EventRegSuccessMailTemplate: actRes.Registration_Success_Mail_Template_ID,
              EventRegFailMailTemplate: actRes.Registration_Failure_Mail_Template_ID,
            },
            EventPricing: actPricingRes, //Pricing
            EventVisibility: {
              EventCountry: actRes.Country_ID,
              EventState: actRes.State_ID,
              EventCity: actRes.City_ID,
              EventTrainingLocation: actRes.Training_Location_ID !== null ? actRes.Training_Location_ID.replace(/\s/g, '').split(",") : [],//actRes.Training_Location_ID,
              EventParticipentLimit: actRes.Max_User_Limit,
              EventWebsite: actRes.Website_Visibility_Flag.data[0] === 1 ? true : false,
              EventMobile: actRes.App_Visibility_Flag.data[0] === 1 ? true : false,
            },
            EventEmailTemplate: {
              EventStartMailSub: actRes.Start_Email_Subject,
              EventStartMailDesc: EditorState.createWithContent(convertFromRaw(JSON.parse(actRes.Start_Email_Description))), //EditorState.createEmpty(),
              EventAutoMailOnStart: actRes.Event_Start_Mail_Flag[0] === 1 ? true : false,
              EventEndMailSub: actRes.End_Email_Subject,
              EventEndMailDesc: EditorState.createWithContent(convertFromRaw(JSON.parse(actRes.End_Email_Description))),
              EventAutoMailOnEnd: actRes.Event_End_Mail_Flag[0] === 1 ? true : false,
            },
            EventSMSTemplate: {
              EventStartMessage: actRes.Start_SMS_Message,
              EventEndMessage: actRes.End_SMS_Message,
            },
            EventArchive: actRes.Archive_Flag[0] === 1 ? true : false,
            EventAutoArchive: actRes.Archive_Duration_Days === 30 ? true : false,
            EventTemplateName: '',
          }
          this.setState({ ...bindbackData })
        });
    }
  }
  //
  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      console.log(this.state)
    }
  }
  // Event Information Tab Callback
  handleEventInformation = (InfoObject) => {
    this.setState({ EventInformation: InfoObject });
    if (InfoObject.EventType > 0 && this.state.EventTypeList.length > 0) {
      let temp = this.state.EventTypeList.filter(row => row.Event_Type_ID === InfoObject.EventType)
      this.setState({ selectedActTypeName: temp[0].Event_Type_Name })
    }
  }
  // Event Connectivity Tab Callback
  handleEventConnectivity = (InfoObject) => {
    this.setState({ EventConnectivity: InfoObject });
  }
  // Event Pricing Tab Callback
  handleEventPricing = (InfoObject) => {
    this.setState({ EventPricing: InfoObject });
  }
  // Event Visibility Tab Callback
  handleEventVisibility = (InfoObject) => {
    this.setState({ EventVisibility: InfoObject });
  }
  // Event Email Template Tab Callback
  handleEventEmailTemplate = (InfoObject) => {
    this.setState({ EventEmailTemplate: InfoObject });
  }
  // Event SMS Template Tab Callback
  handleEventSMSTemplate = (InfoObject) => {
    this.setState({ EventSMSTemplate: InfoObject });
  }

  // final form submit
  finalSubmit = (param) => {
    // Validation Function call
    this.setState({ triggrtVaidation: !this.state.triggrtVaidation })
    this.setState({ buttonClickStatus: param })
    // handleAllCompValidation function will be called due to callback funtion 
  }
  // complete Event form validation
  handleAllCompValidation = (componentName, validationStatus) => {
    switch (componentName) {
      case 'AI': {
        compValidationStatus.AIValidationStatusTemp = validationStatus
        break;
      }
      case 'AP': {
        compValidationStatus.APValidationStatusTemp = validationStatus
        break;
      }
      case 'AV' : {
        compValidationStatus.AVValidationStatusTemp = validationStatus
      }
    }
    if (compValidationStatus.AIValidationStatusTemp && compValidationStatus.APValidationStatusTemp && compValidationStatus.AVValidationStatusTemp) {
      this.setState({ OverAllValidationStatus: true })
      compValidationStatus.OverAllValidationStatusTemp = true
    }
    else {
      this.setState({ OverAllValidationStatus: false })
      compValidationStatus.OverAllValidationStatusTemp = false
    }

    // final submit call
    if (compValidationStatus.OverAllValidationStatusTemp === true) {
      // Selected user for this Event - conversion from array of object to string logic - End
      let data = {
        P_EventID: this.state.requestId,
        P_ServiceProviderID: ServiceProviderIDTemp,
        P_EventTypeID: this.state.EventInformation.EventType,
        P_EventName: this.state.EventInformation.EventName,
        P_EventShortDesc: JSON.stringify(convertToRaw(this.state.EventInformation.EventDescription.getCurrentContent())),
        P_EventFullDesc: JSON.stringify(convertToRaw(this.state.EventInformation.EventDescription.getCurrentContent())),
        P_StartDate: this.state.EventInformation.EventFromDate, //DATE: string
        P_EndDate: this.state.EventInformation.EventToDate, //DATE: string,
        P_StartTime: this.state.EventInformation.EventStartTime, //TIME: string,
        P_EndTime: this.state.EventInformation.EventEndTime, //TIME: string,
        P_Rating: 1, // default value
        P_CategoryID: 1,  // default value INT
        P_CountryID: this.state.EventVisibility.EventCountry,
        P_StateID: this.state.EventVisibility.EventState,
        P_CityID: this.state.EventVisibility.EventCity,
        P_TrainingLocationID: this.state.EventVisibility.EventTrainingLocation.toString(),
        P_RegistrationTemplateID: this.state.EventConnectivity.EventRegistrationTemplate,
        P_RegistrationSuccessMailTemplateID: this.state.EventConnectivity.EventRegSuccessMailTemplate,
        P_RegistrationFailureMailTemplateID: this.state.EventConnectivity.EventRegFailMailTemplate,
        P_ECertificateTemplateID: this.state.EventConnectivity.EventECertificateTemplate,
        P_MaxUserLimit: this.state.EventVisibility.EventParticipentLimit,
        P_EventAODFlag: this.state.switch1 === true ? 1 : 0,
        P_NewEventFlag: this.state.requestId === 0 ? 1 : 0,
        P_ECertificateFlag: this.state.EventConnectivity.EventECertificate === true ? 1 : 0,
        P_WebsiteVisibilityFlag: this.state.EventVisibility.EventWebsite === true ? 1 : 0,
        P_AppVisibilityFlag: this.state.EventVisibility.EventMobile === true ? 1 : 0,
        P_ArchiveFlag: this.state.EventArchive === true ? 1 : 0,
        P_ArchiveDurationDays: this.state.EventAutoArchive == true ? 30 : 0,
        P_Image: '', // pending
        P_EventPricing_JSON: JSON.stringify(this.state.EventPricing),
        P_StartEmailTemplateID: null,
        P_EndEmailTemplateID: null,
        P_StartEmailSubject: this.state.EventEmailTemplate.EventStartMailSub,
        P_StartEmailDescription: JSON.stringify(convertToRaw(this.state.EventEmailTemplate.EventStartMailDesc.getCurrentContent())),
        P_EndEmailSubject: this.state.EventEmailTemplate.EventEndMailSub,
        P_EndEmailDescription: JSON.stringify(convertToRaw(this.state.EventEmailTemplate.EventEndMailDesc.getCurrentContent())),
        P_EventStartMailFlag: this.state.EventEmailTemplate.EventAutoMailOnStart === true ? 1 : 0,
        P_EventEndMailFlag: this.state.EventEmailTemplate.EventAutoMailOnEnd === true ? 1 : 0,
        P_StartSMSMessage: this.state.EventSMSTemplate.EventStartMessage,
        P_EndSMSMessage: this.state.EventSMSTemplate.EventEndMessage,
        P_EventModeLiveFlag: this.state.EventConnectivity.EventModeLive === true ? 1 : 0,
        P_EventModeOnlineFlag: this.state.EventConnectivity.EventModeOnline === true ? 1 : 0,
        P_EventModeOnGroundFlag: this.state.EventConnectivity.EventModeOnGround === true ? 1 : 0,
        P_UserID: this.props.userProfileData[0][0].User_Skey_ID,
        //Template data
        P_EventTemplateID: null,
        P_EventTemplateName: this.state.EventTemplateName,
      }
     
      if (this.state.buttonClickStatus === 'Submit') {
        EventService.EventAddUpdate(data).then((response) => {
          if (response.status === 200) {
            if (this.state.requestId === null) {
              this.setState({ messageState: 'Event Created Successfully' })
              this.setState({ messageType: 'success' })
            }
            else {
              this.setState({ messageState: 'Event Updated Successfully' })
              this.setState({ messageType: 'success' })
            }
          }
          else {
            this.setState({ messageState: 'Error occured' })
            this.setState({ messageType: 'warning' })
          }
          compValidationStatus.AIValidationStatusTemp = false
          compValidationStatus.APValidationStatusTemp = false
          compValidationStatus.AVValidationStatusTemp = false
          compValidationStatus.OverAllValidationStatusTemp = false
        })
      }
    }
    else {
      this.setState({ messageState: 'Please fill all the required fields' })
      this.setState({ messageType: 'warning' })
    }
  }
  Information_MessageBtn() {
    this.setState({ messageState: '' });
    this.setState({ messageType: '' })
  }
  render() {
    // Switch icons for Event information tab
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
           AOD Disabled
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
           AOD Enabled
        </div>
      );
    };
  
    return (
      <React.Fragment>
        {/* Event Information */}
        <Row>
          <Col lg={12}>
            <Card className="inner-card">
              <CardHeader className="bl-bg">
                <Link to="#" className="text-white">
                  <b>Event Information</b>
                </Link>
                <span className="float-right">
                  {this.props.isFromUpdate ?
                    <Switch
                      uncheckedIcon={<Offsymbol />}
                      checkedIcon={<OnSymbol />}
                      onColor="#00C15A"
                      width={115}
                      onChange={() => { this.props.aodToggelCheck(!this.state.switch1); this.setState({ switch1: !this.state.switch1 }); }
                      }
                      checked={this.state.switch1}
                    /> : ""}
                </span>
              </CardHeader>
              <CardBody>
                <EventInformation handleEventInformation={this.handleEventInformation}
                  EventInformation={this.state.EventInformation}
                  EventTypeList={this.state.EventTypeList}
                  handleAllCompValidation={this.handleAllCompValidation}
                  TriggrtVaidation={this.state.triggrtVaidation}></EventInformation>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* Connectivity */}
        <Row>
          <Col sm="12">
            <Card className="inner-card">
              <CardHeader className="bl-bg">
                <Link to="#" className="text-white">
                  <b>Connectivity</b>
                </Link>
              </CardHeader>
              <CardBody>
                <Connectivity handleEventConnectivity={this.handleEventConnectivity}
                  EventConnectivity={this.state.EventConnectivity}
                  SelectedEventType={this.state.selectedActTypeName} 
                  RegistrationTemplateList={this.state.registrationTemplateList}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* Event Pricing and Discount */}
        <Row>
          <Col sm="12">
            <Card className="inner-card">
              <CardHeader className="bl-bg">
                <Link to="#" className="text-white">
                  <b>Event Pricing and Discount</b>
                </Link>
              </CardHeader>
              <CardBody>
                <EventPricing handleEventPricing={this.handleEventPricing} EventPricing={this.state.EventPricing}
                  CityList={this.state.CityList} handleAllCompValidation={this.handleAllCompValidation}
                  TriggrtVaidation={this.state.triggrtVaidation} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* Event Visibility */}
        <Row>
          <Col sm="12">
            <Card className="inner-card">
              <CardHeader className="bl-bg">
                <Link to="#" className="text-white">
                  <b>Event Visibility</b>
                </Link>
              </CardHeader>
              <CardBody>
                <Visibility handleEventVisibility={this.handleEventVisibility} EventVisibility={this.state.EventVisibility}
                  CountryList={this.state.CountryList} StateList={this.state.StateList} CityList={this.state.CityList}
                  handleAllCompValidation={this.handleAllCompValidation}//UserList={this.state.UserList} 
                  TriggrtVaidation={this.state.triggrtVaidation} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* Other Fields */}
        <Row>
          <Col lg={6}>
            <Col lg={12}>
              <div className="form-group">
                <span className="text-danger">{this.state.templateNameValidate}</span>
              </div>
              {this.state.messageState !== '' ?
                (<Information_Message title={this.state.messageState} messageType={this.state.messageType}
                  modelOkButtonClicked={() => this.Information_MessageBtn()} ></Information_Message>) :
                null}
              <button className="btn update-btn font" type="submit" onClick={() => this.finalSubmit('Submit')}>
                Submit
              </button>
            </Col>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    userProfileData: state.userProfileData.ProfileData,
    providerAndRoleData: state.currentPageName.roleAndProvider.selectedRole,//.Service_Provider_ID,
    toUpdateEventData: state.EventReducer.ToUpdateEventData
  }
}

const mapDispatchToProp = dispatch => {
  return {
    userIdData: () => dispatch({ type: 'USERID', payload: '0' })
  }
}

//This 
export default withRouter(connect(mapStateToProps, mapDispatchToProp)(CreateEvent));