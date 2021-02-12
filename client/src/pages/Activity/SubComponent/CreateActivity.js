import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ActivityInformation from '../SubComponent/ActivityPart/ActivityInformation';
import Connectivity from '../SubComponent/ActivityPart/Connectivity';
import ActivityPricing from '../SubComponent/ActivityPart/ActivityPricing';
import Visibility from '../SubComponent/ActivityPart/Visibility';
import EmailTemplate from '../SubComponent/ActivityPart/EmailTemplate';
import SMSTemplate from '../SubComponent/ActivityPart/SMSTemplate';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { ActivityObject, AllDlls } from '../ActivityModel';
import { Card, Row, Col, CardBody, CardHeader, Label, Input } from "reactstrap";
import Switch from "react-switch";
import AppService from '../../../AppService';
import { GetNewActivityFormDDLsURL, GetEmailListURL } from '../../../AppConfig';
import { EditorState, convertToRaw, convertFromRaw, ContentState } from 'draft-js';
import ActivityService from '../ActivityService';
import Information_Message from './Information_Message'
const appService = new AppService();
const activityService = new ActivityService();

const compValidationStatus = {
  AIValidationStatusTemp: false, APValidationStatusTemp: false, AEValidationStatusTemp: false, TemplateNameValidateTemp: false,
  OverAllValidationStatusTemp: false
}
let ServiceProviderIDTemp;
class CreateActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...ActivityObject,
      ...AllDlls,
      switch1: true,
      error: {},
      selectedActTypeName: '',
      triggrtVaidation: false,
      buttonClickStatus: '',
      templateNameValidate: '',
      messageState: '',
      messageType: '', //warning / error / success
      activityTemplateList: [],
      registrationTemplateList: []
    }

    //This function is for the form handling
    this.handleActivityInformation = this.handleActivityInformation.bind(this); // Activity Information Tab Callback
    this.handleActivityConnectivity = this.handleActivityConnectivity.bind(this); // Activity Connectivity Tab Callback
    this.handleActivityPricing = this.handleActivityPricing.bind(this); // Activity Pricing Tab Callback
    this.handleActivityVisibility = this.handleActivityVisibility.bind(this); // Activity Visibility Tab Callback
    this.handleActivityEmailTemplate = this.handleActivityEmailTemplate.bind(this); // Activity Email Template Tab Callback
    this.handleActivitySMSTemplate = this.handleActivitySMSTemplate.bind(this) // Activity SMS Template Tab Callback
    this.handleAllCompValidation = this.handleAllCompValidation.bind(this); // Complete Activity Form validation
    this.handleActiVisibility = this.handleActiVisibility.bind(this); // handle the visiblity of activity - Activity Visibility Tab
    this.handleChange = this.handleChange.bind(this) // handle al input box change
    this.handleCBchange = this.handleCBchange.bind(this) // handle all checkbox
    this.finalSubmit = this.finalSubmit.bind(this) // final Submit - with param string "save as tempate" or "submit"
  }
  //Constructor end
  componentDidMount() {
    ServiceProviderIDTemp = this.props.providerAndRoleData.Service_Provider_ID
    let data = {
      ProviderId: ServiceProviderIDTemp
    }
    // get all DLLs required in Activity create form
    appService.GetDataFromApiPost(GetNewActivityFormDDLsURL, data)
      .then((response) => {
        if (response.status == 200) {
          this.setState({ ActivityTypeList: response.data[0] })
          this.setState({ WeekDayList: response.data[1] })
          this.setState({ GroupList: response.data[2] })
          this.setState({ TaxList: response.data[3] })
          this.setState({ TrainingLocationList: response.data[4] })
          this.setState({ CountryList: response.data[5] })
          this.setState({ StateList: response.data[6] })
          this.setState({ CityList: response.data[7] })
          this.setState({ UserList: response.data[8] })
          this.setState({ ActivityTemplList: response.data[9] })
          this.setState({ GroupSetGroupMap: response.data[11] })
        }
      })
      .catch(err => { console.log("error occured while getiing data of all ddls for new activity create") })

    let dataA = { ProviderID: ServiceProviderIDTemp }
    activityService.GetEmailList(GetEmailListURL, dataA)
      .then((response) => {
        let activitytemplatelist = response.filter(result => /^Activity/.test(result.Template_Type_Name));
        let registrationtemplatelist = response.filter(result => /^Registartion/.test(result.Template_Type_Name))
        this.setState({activityTemplateList: activitytemplatelist})
        this.setState({registrationTemplateList: registrationtemplatelist})
      })

    //get activity data by Id
    if (this.props.toUpdateActivityData.Activity_ID !== 0 && this.props.toUpdateActivityData.Activity_ID !== null && this.props.toUpdateActivityData.Activity_ID !== undefined) {
      activityService.GetActivityById(this.props.toUpdateActivityData.Activity_ID)
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
            requestId: actRes.Activity_ID,
            ActivityInformation: {
              activityName: actRes.Activity_Name,
              activityType: actRes.Activity_Type_ID,
              activityTag: actRes.Tag_Name !== null ? actRes.Tag_Name.replace(/\s/g, '').split(",") : [],
              activityAssignGroup: actRes.Group_Set_ID,
              activityDescription: EditorState.createWithContent(convertFromRaw(JSON.parse(actRes.Activity_Full_Desc))),//EditorState.createEmpty(), //resp[0].
              activityAdditionalDescription: EditorState.createWithContent(convertFromRaw(JSON.parse(actRes.Additional_Information))),
              activityFromDate: actRes.Start_Date.slice(0, 10),
              activityToDate: actRes.End_Date.slice(0, 10),
              activityStartTime: actRes.Start_Time,
              activityEndTime: actRes.End_Time,
              activityWeekDays: JSON.parse(actRes.Activity_Day_JSON),
              activityImgUpload: [],
            },
            ActivityConnectivity: {
              activityChat: actRes.Activity_Chat_Flag.data[0] === 1 ? true : false,
              activityGroupChat: actRes.Group_Chat_Flag.data[0] === 1 ? true : false,
              activityModeLive: actRes.Activity_Mode_Live_Flag.data[0] === 1 ? true : false,
              activityModeOnline: actRes.Activity_Mode_Online_Flag.data[0] === 1 ? true : false,
              activityModeOnGround: actRes.Activity_Mode_OnGround_Flag.data[0] === 1 ? true : false,
              activityECertificate: actRes.ECertificate_Flag.data[0] === 1 ? true : false,
              activityECertificateTemplate: actRes.ECertificate_Template_ID,
              activityRegistrationTemplate: actRes.Registration_Template_ID,
              activityRegSuccessMailTemplate: actRes.Registration_Success_Mail_Template_ID,
              activityRegFailMailTemplate: actRes.Registration_Failure_Mail_Template_ID,
            },
            ActivityPricing: actPricingRes, //Pricing
            ActivityVisibility: {
              activityVisibility: actRes.Visibility_Flag.data[0] === 1 ? true : false,
              activityCountry: actRes.Country_ID,
              activityState: actRes.State_ID,
              activityCity: actRes.City_ID,
              activityTrainingLocation: actRes.Training_Location_ID !== null ? actRes.Training_Location_ID.replace(/\s/g, '').split(",") : [],//actRes.Training_Location_ID,
              activityParticipentLimit: actRes.Max_User_Limit,
              activityWebsite: actRes.Website_Visibility_Flag.data[0] === 1 ? true : false,
              activityMobile: actRes.App_Visibility_Flag.data[0] === 1 ? true : false,
              activitySelectedUser: false,
              activitySelectedUserList: actMappedUser, // selected user list - not coming 
            },
            ActivityEmailTemplate: {
              activityStartMailSub: actRes.Start_Email_Subject,
              activityStartMailDesc: EditorState.createWithContent(convertFromRaw(JSON.parse(actRes.Start_Email_Description))), //EditorState.createEmpty(),
              activityAutoMailOnStart: actRes.Activity_Start_Mail_Flag[0] === 1 ? true : false,
              activityEndMailSub: actRes.End_Email_Subject,
              activityEndMailDesc: EditorState.createWithContent(convertFromRaw(JSON.parse(actRes.End_Email_Description))),
              activityAutoMailOnEnd: actRes.Activity_End_Mail_Flag[0] === 1 ? true : false,
            },
            ActivitySMSTemplate: {
              activityStartMessage: actRes.Start_SMS_Message,
              activityEndMessage: actRes.End_SMS_Message,
            },
            ActivityArchive: actRes.Archive_Flag[0] === 1 ? true : false,
            ActivityAutoArchive: actRes.Archive_Duration_Days === 30 ? true : false,
            ActivityTemplateName: '',
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
  // Activity Information Tab Callback
  handleActivityInformation = (InfoObject) => {
    this.setState({ ActivityInformation: InfoObject });
    if (InfoObject.activityType > 0 && this.state.ActivityTypeList.length > 0) {
      let temp = this.state.ActivityTypeList.filter(row => row.Activity_Type_ID === InfoObject.activityType)
      this.setState({ selectedActTypeName: temp[0].Activity_Type_Name })
    }
  }
  // Activity Connectivity Tab Callback
  handleActivityConnectivity = (InfoObject) => {
    this.setState({ ActivityConnectivity: InfoObject });
  }
  // Activity Pricing Tab Callback
  handleActivityPricing = (InfoObject) => {
    this.setState({ ActivityPricing: InfoObject });
  }
  // Activity Visibility Tab Callback
  handleActivityVisibility = (InfoObject) => {
    this.setState({ ActivityVisibility: InfoObject });
  }
  // Activity Email Template Tab Callback
  handleActivityEmailTemplate = (InfoObject) => {
    this.setState({ ActivityEmailTemplate: InfoObject });
  }
  // Activity SMS Template Tab Callback
  handleActivitySMSTemplate = (InfoObject) => {
    this.setState({ ActivitySMSTemplate: InfoObject });
  }
  // handle the visiblity of activity - Activity Visibility Tab
  handleActiVisibility = () => {
    this.setState(prevState => ({
      ActivityVisibility: {
        ...prevState.ActivityVisibility, activityVisibility: !this.state.ActivityVisibility.activityVisibility
      }
    }));
  }
  // handle all checkbox
  handleCBchange = (event) => {
    let fname = event.target.name;
    let fvalue = event.target.checked;
    this.setState({ [fname]: fvalue });
  }
  // handle Input Change
  handleChange = (event) => {
    let fname = event.target.name;
    let fvalue = event.target.value;
    this.setState({ [fname]: fvalue });
    if (fname === 'ActivityTemplateName') {
      this.setState({ templateNameValidate: '' })
      compValidationStatus.TemplateNameValidateTemp = true
    }
  }
  // final form submit
  finalSubmit = (param) => {
    // Validation Function call
    this.setState({ triggrtVaidation: !this.state.triggrtVaidation })
    this.setState({ buttonClickStatus: param })
    // handleAllCompValidation function will be called due to callback funtion 
  }
  // complete Activity form validation
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
      case 'AE': {
        compValidationStatus.AEValidationStatusTemp = validationStatus
        break;
      }
    }
    if (compValidationStatus.AIValidationStatusTemp && compValidationStatus.APValidationStatusTemp && compValidationStatus.AEValidationStatusTemp) {
      this.setState({ OverAllValidationStatus: true })
      compValidationStatus.OverAllValidationStatusTemp = true
    }
    else {
      this.setState({ OverAllValidationStatus: false })
      compValidationStatus.OverAllValidationStatusTemp = false
    }

    // final submit call
    if (compValidationStatus.OverAllValidationStatusTemp === true) {
      // Selected user for this activity - conversion from array of object to string logic - Start
      let selectedUserIdArr = this.state.ActivityVisibility.activitySelectedUserList
      let getSelectedIds = []
      let getSelectedIdsString = ''
      if (this.state.ActivityVisibility.activitySelectedUserList.length > 0) {
        getSelectedIds = selectedUserIdArr.map((row) => { return row.User_Skey_ID })
        getSelectedIdsString = getSelectedIds.toString()
      }
      // Selected user for this activity - conversion from array of object to string logic - End
      let data = {
        P_ActivityID: this.state.requestId,
        P_ServiceProviderID: ServiceProviderIDTemp,
        P_ActivityTypeID: this.state.ActivityInformation.activityType,
        P_ActivityName: this.state.ActivityInformation.activityName,
        P_ActivityShortDesc: JSON.stringify(convertToRaw(this.state.ActivityInformation.activityDescription.getCurrentContent())),
        P_ActivityFullDesc: JSON.stringify(convertToRaw(this.state.ActivityInformation.activityDescription.getCurrentContent())),
        P_GroupSetID: this.state.ActivityInformation.activityAssignGroup,
        P_StartDate: this.state.ActivityInformation.activityFromDate, //DATE: string
        P_EndDate: this.state.ActivityInformation.activityToDate, //DATE: string,
        P_StartTime: this.state.ActivityInformation.activityStartTime, //TIME: string,
        P_EndTime: this.state.ActivityInformation.activityEndTime, //TIME: string,
        P_ActivityDayJSON: JSON.stringify(this.state.ActivityInformation.activityWeekDays),
        P_Rating: 1, // default value
        P_CategoryID: 1,  // default value INT
        P_AdditionalInformation: JSON.stringify(convertToRaw(this.state.ActivityInformation.activityAdditionalDescription.getCurrentContent())),
        P_CountryID: this.state.ActivityVisibility.activityCountry,
        P_StateID: this.state.ActivityVisibility.activityState,
        P_CityID: this.state.ActivityVisibility.activityCity,
        P_TrainingLocationID: this.state.ActivityVisibility.activityTrainingLocation.toString(),
        P_RegistrationTemplateID: this.state.ActivityConnectivity.activityRegistrationTemplate,
        P_RegistrationSuccessMailTemplateID: this.state.ActivityConnectivity.activityRegSuccessMailTemplate,
        P_RegistrationFailureMailTemplateID: this.state.ActivityConnectivity.activityRegFailMailTemplate,
        P_ECertificateTemplateID: this.state.ActivityConnectivity.activityECertificateTemplate,
        P_MaxUserLimit: this.state.ActivityVisibility.activityParticipentLimit,
        P_ActivityAODFlag: this.state.switch1 === true ? 1 : 0,
        P_NewActivityFlag: this.state.requestId === 0 ? 1 : 0,
        P_ECertificateFlag: this.state.ActivityConnectivity.activityECertificate === true ? 1 : 0,
        P_WebsiteVisibilityFlag: this.state.ActivityVisibility.activityWebsite === true ? 1 : 0,
        P_AppVisibilityFlag: this.state.ActivityVisibility.activityMobile === true ? 1 : 0,
        P_VisibilityFlag: this.state.ActivityVisibility.activityVisibility === true ? 1 : 0,
        P_ActivityChatFlag: this.state.ActivityConnectivity.activityChat === true ? 1 : 0,
        P_GroupChatFlag: this.state.ActivityConnectivity.activityGroupChat === true ? 1 : 0,
        P_ArchiveFlag: this.state.ActivityArchive === true ? 1 : 0,
        P_ArchiveDurationDays: this.state.ActivityAutoArchive == true ? 30 : 0,
        P_Image: '', // pending
        P_Tags: this.state.ActivityInformation.activityTag.toString(),
        P_MappedUserSkeyIDs: getSelectedIdsString,
        P_ActivityPricing_JSON: JSON.stringify(this.state.ActivityPricing),
        P_StartEmailTemplateID: null,
        P_EndEmailTemplateID: null,
        P_StartEmailSubject: this.state.ActivityEmailTemplate.activityStartMailSub,
        P_StartEmailDescription: JSON.stringify(convertToRaw(this.state.ActivityEmailTemplate.activityStartMailDesc.getCurrentContent())),
        P_EndEmailSubject: this.state.ActivityEmailTemplate.activityEndMailSub,
        P_EndEmailDescription: JSON.stringify(convertToRaw(this.state.ActivityEmailTemplate.activityEndMailDesc.getCurrentContent())),
        P_ActivityStartMailFlag: this.state.ActivityEmailTemplate.activityAutoMailOnStart === true ? 1 : 0,
        P_ActivityEndMailFlag: this.state.ActivityEmailTemplate.activityAutoMailOnEnd === true ? 1 : 0,
        P_StartSMSMessage: this.state.ActivitySMSTemplate.activityStartMessage,
        P_EndSMSMessage: this.state.ActivitySMSTemplate.activityEndMessage,
        P_ActivityModeLiveFlag: this.state.ActivityConnectivity.activityModeLive === true ? 1 : 0,
        P_ActivityModeOnlineFlag: this.state.ActivityConnectivity.activityModeOnline === true ? 1 : 0,
        P_ActivityModeOnGroundFlag: this.state.ActivityConnectivity.activityModeOnGround === true ? 1 : 0,
        P_UserID: this.props.userProfileData[0][0].User_Skey_ID,
        //Template data
        P_ActivityTemplateID: null,
        P_ActivityTemplateName: this.state.ActivityTemplateName,
      }

      if (this.state.buttonClickStatus === 'SaveAsTemplate') {
        if (this.state.ActivityTemplateName === '') {
          this.setState({ templateNameValidate: 'Please Enter Template Name' })
          compValidationStatus.TemplateNameValidateTemp = false
          compValidationStatus.AIValidationStatusTemp = false
          compValidationStatus.APValidationStatusTemp = false
          compValidationStatus.AEValidationStatusTemp = false
        }
        if (compValidationStatus.TemplateNameValidateTemp) {
          activityService.ActivityAddTemplate(data).then((response) => {
            if (response.status === 200) {
              if (this.state.templateId === null) {
                this.setState({ messageState: 'Activity Template Created Successfully' })
                this.setState({ messageType: 'success' })
              }
              else {
                this.setState({ messageState: 'Activity Template Updated Successfully' })
                this.setState({ messageType: 'success' })
              }
            }
            else {
              this.setState({ messageState: 'Error occured' })
              this.setState({ messageType: 'warning' })
            }
            compValidationStatus.AIValidationStatusTemp = false
            compValidationStatus.APValidationStatusTemp = false
            compValidationStatus.AEValidationStatusTemp = false
            compValidationStatus.OverAllValidationStatusTemp = false
          })
        }
      }
      else if (this.state.buttonClickStatus === 'Submit') {
        activityService.ActivityAddUpdate(data).then((response) => {
          if (response.status === 200) {
            if (this.state.requestId === null) {
              this.setState({ messageState: 'Activity Created Successfully' })
              this.setState({ messageType: 'success' })
            }
            else {
              this.setState({ messageState: 'Activity Updated Successfully' })
              this.setState({ messageType: 'success' })
            }
          }
          else {
            this.setState({ messageState: 'Error occured' })
            this.setState({ messageType: 'warning' })
          }
          compValidationStatus.AIValidationStatusTemp = false
          compValidationStatus.APValidationStatusTemp = false
          compValidationStatus.AEValidationStatusTemp = false
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
    // Switch icons for Activity information tab
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
    // Switch icons for activity visibility tab
    const VisibilityOffSymbol = props => {
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
           Off
        </div>
      );
    };
    const VisibilityOnSymbol = props => {
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
           On
        </div>
      );
    };
    return (
      <React.Fragment>
        {/* Activity Information */}
        <Row>
          <Col lg={12}>
            <Card className="inner-card">
              <CardHeader className="bl-bg">
                <Link to="#" className="text-white">
                  <b>Activity Information</b>
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
                <ActivityInformation handleActivityInformation={this.handleActivityInformation}
                  ActivityInformation={this.state.ActivityInformation} WeekDayList={this.state.WeekDayList}
                  ActivityTypeList={this.state.ActivityTypeList} GroupList={this.state.GroupList}
                  GroupSetGroupMap={this.state.GroupSetGroupMap} handleAllCompValidation={this.handleAllCompValidation}
                  TriggrtVaidation={this.state.triggrtVaidation}></ActivityInformation>
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
                <Connectivity handleActivityConnectivity={this.handleActivityConnectivity}
                  ActivityConnectivity={this.state.ActivityConnectivity}
                  SelectedActivityType={this.state.selectedActTypeName} 
                  RegistrationTemplateList={this.state.registrationTemplateList}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* Activity Pricing and Discount */}
        <Row>
          <Col sm="12">
            <Card className="inner-card">
              <CardHeader className="bl-bg">
                <Link to="#" className="text-white">
                  <b>Activity Pricing and Discount</b>
                </Link>
              </CardHeader>
              <CardBody>
                <ActivityPricing handleActivityPricing={this.handleActivityPricing} ActivityPricing={this.state.ActivityPricing}
                  CityList={this.state.CityList} handleAllCompValidation={this.handleAllCompValidation}
                  TriggrtVaidation={this.state.triggrtVaidation} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* Activity Visibility */}
        <Row>
          <Col sm="12">
            <Card className="inner-card">
              <CardHeader className="bl-bg">
                <Link to="#" className="text-white">
                  <b>Activity Visibility</b>
                </Link>
                <span className="float-right">
                  <Switch
                    uncheckedIcon={<VisibilityOffSymbol />}
                    checkedIcon={<VisibilityOnSymbol />}
                    onColor="#00C15A"
                    width={115}
                    onChange={this.handleActiVisibility}
                    checked={this.state.ActivityVisibility.activityVisibility}
                  />
                </span>
              </CardHeader>
              <CardBody>
                <Visibility handleActivityVisibility={this.handleActivityVisibility} ActivityVisibility={this.state.ActivityVisibility}
                  CountryList={this.state.CountryList} StateList={this.state.StateList} CityList={this.state.CityList}
                  TrainingLocationList={this.state.TrainingLocationList} UserList={this.state.UserList} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* Activity Email Template */}
        <Row>
          <Col sm="12">
            <Card className="inner-card">
              <CardHeader className="bl-bg">
                <Link to="#" className="text-white">
                  <b>Activity Email Template</b>
                </Link>
              </CardHeader>
              <CardBody>
                <EmailTemplate handleActivityEmailTemplate={this.handleActivityEmailTemplate}
                  ActivityEmailTemplate={this.state.ActivityEmailTemplate} ActivityMailTemplateList={this.state.activityTemplateList}
                  handleAllCompValidation={this.handleAllCompValidation} TriggrtVaidation={this.state.triggrtVaidation} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* Activity SMS Template */}
        <Row>
          <Col sm="12">
            <Card className="inner-card">
              <CardHeader className="bl-bg">
                <Link to="#" className="text-white">
                  <b>Activity SMS Template</b>
                </Link>
              </CardHeader>
              <CardBody>
                <SMSTemplate handleActivitySMSTemplate={this.handleActivitySMSTemplate}
                  ActivitySMSTemplate={this.state.ActivitySMSTemplate} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* Other Fields */}
        <Row>
          <Col lg={6}>
            <Col lg={12}>
              <div className="form-group">
                <FormControlLabel
                  value="ActEnd"
                  control={<Checkbox color="primary" name='ActivityArchive' checked={this.state.ActivityArchive} onChange={this.handleCBchange} />}
                  label="Archive"
                />
                <FormControlLabel
                  value="ActEnd"
                  control={<Checkbox color="primary" name='ActivityAutoArchive' checked={this.state.ActivityAutoArchive} onChange={this.handleCBchange} />}
                  label="Auto-archive duration (30 days from end of activity)"
                  checked
                />
              </div>
              <div className="form-group">
                <Label for="act-temp">
                  Template Name
                </Label>
                <Input type="text" id="act-temp"
                  placeholder="Enter Template Name"
                  name="ActivityTemplateName"
                  value={this.state.ActivityTemplateName}
                  onChange={this.handleChange}
                />
                <span className="text-danger">{this.state.templateNameValidate}</span>
              </div>
              {this.state.messageState !== '' ?
                (<Information_Message title={this.state.messageState} messageType={this.state.messageType}
                  modelOkButtonClicked={() => this.Information_MessageBtn()} ></Information_Message>) :
                null}
              <button className="btn update-btn mr-3" type="submit" onClick={() => this.finalSubmit('SaveAsTemplate')}>
                Save as Template
              </button>
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
    toUpdateActivityData: state.activityReducer.ToUpdateActivityData
  }
}

const mapDispatchToProp = dispatch => {
  return {
    userIdData: () => dispatch({ type: 'USERID', payload: '0' })
  }
}

//This 
export default withRouter(connect(mapStateToProps, mapDispatchToProp)(CreateActivity));