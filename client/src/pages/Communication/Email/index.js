import React, { Component } from "react";

import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Collapse,
  Label,
  Button,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import { withRouter, Link } from "react-router-dom";
import { Modal } from "reactstrap";
// import Autocomplete from "./Autocomplete";
import Autocomplete from '@material-ui/lab/Autocomplete';
import MultichipSelect from "./MultiChipSelect";
import store from "../../../store";
// Form Editor
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { connect } from "react-redux";
import { getDropdownDataURL, GetEmailListURL } from "../../../AppConfig"
import EmailService from '../../Communication/Email/EmailService'
import { EditorState, convertToRaw, convertFromRaw, ContentState } from 'draft-js';
import draftToHtml from "draftjs-to-html";
import htmlToDraft from 'html-to-draftjs';
import Confirmation_Message from './SubComponents/Confirmation_Message';
import Information_Message from './SubComponents/Information_Message';
import ReactHtmlParser from 'react-html-parser';
import Loader from "../../../components/Loader";



class EmailTemp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      col1: true,
      col2: false,
      col3: false,
      col5: true,
      EmailTemp: false,
      modal_scroll: false,
      AssignEmailTemp: false,
      activeTabJustify: "1",
      templatedropdownData: "",
      editorState: EditorState.createEmpty(),
      subject: "",
      templatename: '',
      Description: "",
      Err: "",
      assignTemplateErr: "",
      templateID: null,
      selectedActivitytemplate: "",
      activitytemplatelist: [],
      registrationtemplate: [],
      registrationtemplatelist: [],
      remindertemplatelist: [],
      othertemplatelist: [],
      remindertemplate: [],
      othertemplate: [],
      setting: [],
      loader: true,
      activitytypeslist: [],
      success_msg: false,
      modal_data: "",
      eventData: null,
      model_title: "",
      btn_call: "",
      selectedActivity: [],
      selectedActivitytype: [],
      templatetypeID: null


    };
    this.newEmailTemp = this.newEmailTemp.bind(this);
    this.popupScroll = this.popupScroll.bind(this);
    this.AssignEmailTemp = this.AssignEmailTemp.bind(this);
    this.toggleCustomJustified = this.toggleCustomJustified.bind(this);
    this.toggleCustom = this.toggleCustom.bind(this);


    this.t_col1 = this.t_col1.bind(this);
    this.t_col2 = this.t_col2.bind(this);
    this.t_col3 = this.t_col3.bind(this);
    this.t_col5 = this.t_col5.bind(this);
    this.emailService = new EmailService();

    this.getDropdownList();
    this.getemailtemplatelistData();
    this.props.updateTableData('CHANGE_CURRENT_PAGE_NAME', 'Email Templates')


  }
  // modal popup 
  newEmailTemp() {
    this.state.templateID = null;
    this.setState(prevState => ({
      EmailTemp: !prevState.EmailTemp
    }));
    this.removeBodyCss();

  }

  //asign Email temp
  AssignEmailTemp() {
    this.state.templateID = null;
    this.setState(prevState => ({
      AssignEmailTemp: !prevState.AssignEmailTemp
    }));
    this.removeBodyCss();
  }

  // AssignEmailTempData(data) {

  //   this.setState(prevState => ({
  //     AssignEmailTemp: !prevState.AssignEmailTemp,

  //   }));
  //   this.removeBodyCss();
  // }
  popupScroll() {
    this.setState(prevState => ({
      modal_scroll: !prevState.modal_scroll
    }));
    this.removeBodyCss();
  }
  removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  show() {
    this.setState({ visible: true });
  }
  hide() {
    this.setState({ visible: false });
  }

  // Tabs
  toggleCustomJustified(tab) {
    if (this.state.activeTabJustify !== tab) {
      this.setState({
        activeTabJustify: tab
      });
    }
  }

  toggleCustom(tab) {
    if (this.state.customActiveTab !== tab) {
      this.setState({
        customActiveTab: tab
      });
    }
  }



  //collapsable
  t_col1() {
    this.setState({ col1: !this.state.col1 });
  }
  t_col2() {
    this.setState({ col2: !this.state.col2 });
  }
  t_col3() {
    this.setState({ col3: !this.state.col3 });
  }
  t_col5() {
    this.setState({ col5: !this.state.col5 });
  }

  componentDidMount() { }
  getDropdownList() {

    // if (this.props.templateData != "") {
    //   this.state.templatedropdownData = this.props.templateData

    // }
    // else {
    let data = {
      Provider_ID: this.props.ProviderID
    }

    this.emailService.GetdropdownDataFromApipost(getDropdownDataURL, data)
      .then((response) => {
        this.state.templatedropdownData = JSON.parse(JSON.stringify(response.data[0]));
        this.state.filteredActivitybyactivitytypes = JSON.parse(JSON.stringify(response.data[1]));
        this.state.templateActivityData = this.state.filteredActivitybyactivitytypes
        this.GetActivityTypes(this.state.filteredActivitybyactivitytypes)
        store.dispatch({ type: 'LIST_TEMPATE_TYPE_DATA', payload: this.state.templatedropdownData });
        store.dispatch({ type: 'LIST_ACTIVITY_TYPE_DATA', payload: this.state.activitytypeslist });
        store.dispatch({ type: 'LIST_ACTIVITY_DATA', payload: this.state.filteredActivitybyactivitytypes });

      })
    // }
  }
  findUnique(arr, predicate) {
    var found = {};
    arr.forEach(d => {
      found[predicate(d)] = d;
    });
    return Object.keys(found).map(key => found[key]);
  }
  GetActivityTypes(filteredActivitybyactivitytypes) {

    let ActivityTypes = [];
    filteredActivitybyactivitytypes &&
      filteredActivitybyactivitytypes.map(activitylist => {
        return (
          ActivityTypes.push({ activitytype: activitylist.Activity_Type_Name, ID: activitylist.Activity_Type_ID })
        );
      });
    var result = this.findUnique(ActivityTypes, d => d.activitytype);
    this.state.activitytypeslist = JSON.parse(JSON.stringify(result));

  }

  handlesubject = (event) => {
    this.setState({ subject: event.target.value })
    //console.log(this.state.race_title);
  }

  handletemplatename = (event) => {
    this.setState({ templatename: event.target.value })
    //console.log(this.state.race_title);
  }

  onEditorStateChange = (editorState) => {

    const contentState = editorState.getCurrentContent();
    console.log('content state', convertToRaw(contentState))

    this.setState({
      editorState,
    });
    console.log(editorState)
    var value = ""
    this.setState({ editorState }, () => {
      const currentContent = editorState.getCurrentContent();
      const contentRaw = convertToRaw(currentContent);
      value = currentContent.hasText() ? draftToHtml(contentRaw) : "";

      this.saveContent(value);
    });
    //    this.setState({ race_descriptionjson: JSON.stringify(convertToRaw(content)) })
  };
  saveContent = (value) => {
    this.setState({ Description: value })
  }
  CancelBtn() {
    this.setState({ success_msg: false });
  }
  Information_MessageBtn() {
    this.setState({ with_title: false });
  }

  validate = (templatetypeID, templatename, subject, description) => {

    let templatetypeIDError = "";
    let templatenameError = "";
    let descriptionError = "";
    let subjectError = "";
    let Err = "";
    let defaultError = "not assigned";

    // var prestrResult = prestrRGEX.test(prestr);
    if (templatetypeID == "" || templatetypeID == null || templatetypeID == undefined) {
      templatetypeIDError = "Select at least one template type";
      Err = templatetypeIDError;
    }

    if (templatename == "" || templatename == null || templatename == undefined) {
      templatenameError = "Template Name";
      if (Err === "") {
        Err = templatenameError + " " + defaultError;
      }
      else {
        Err = Err;
      }
    }
    if (subject == "" || subject == null || subject == undefined) {
      subjectError = "subject";
      if (Err === "") {
        Err = subjectError + " " + defaultError;
      }
      else {
        Err = Err;
      }
    }
    if (description == "" || description == null || description == undefined) {
      descriptionError = "Description";
      if (Err === "") {
        Err = descriptionError + " " + defaultError;
      }
      else {
        Err = Err;
      }
    }

    if (Err) {
      if (Err !== "") {
        Err = Err;
      } else {
        Err = Err;
      }
      this.setState({ Err: Err });
      // this.setState({
      // });
      return false;
    }
    else {

      this.setState({ Err: "" });
      return true;
    }

  }

  validateassignTemplate = (activitytypeID, activityID) => {

    let activitytypeIDError = "";
    let activityIDError = "";
    let Err = "";
    let defaultError = "not assigned";

    // var prestrResult = prestrRGEX.test(prestr);
    if (activitytypeID == "" || activitytypeID == null || activitytypeID == undefined) {
      activitytypeIDError = "Select at least one activity type";
      Err = activitytypeIDError;
    }

    if (activityID == "" || activityID == null || activityID == undefined) {
      activityIDError = "Activity Name";
      if (Err === "") {
        Err = activityIDError + " " + defaultError;
      }
      else {
        Err = Err;
      }
    }

    if (Err) {
      if (Err !== "") {
        Err = Err;
      } else {
        Err = Err;
      }
      this.setState({ assignTemplateErr: Err });
      // this.setState({
      // });
      return false;
    }
    else {

      this.setState({ assignTemplateErr: "" });
      return true;
    }

  }
  getemailtemplatelistData() {

    if (this.props.emailtemplatelistdata != undefined) {
      this.state.emailtemplatelist = this.props.emailtemplatelistData
      this.state.activitytemplatelist = this.props.activityemailtemplatelistData
      this.state.registrationtemplatelist = this.props.registrationemailtemlistData
      this.state.remindertemplatelist = this.props.reminderemailtemlistData
      this.state.othertemplatelist = this.props.otheremailtemlistData

      this.state.loader = false
    }
    else {
      let selectedProviderID = this.props.ProviderID

      let data = { ProviderID: selectedProviderID }
      this.emailService.GetEmailList(GetEmailListURL, data)
        .then((response) => {
          console.log(response)
          this.setsetting(response);
          this.state.activitytemplatelist = response.filter(result => /^Activity/.test(result.Template_Type_Name));
          store.dispatch({ type: 'LIST_ACTIVITY_EMAIL_TEMPLATE_DATA', payload: this.state.activitytemplatelist });

          this.state.registrationtemplatelist = response.filter(result => /^Registartion/.test(result.Template_Type_Name))
          store.dispatch({ type: 'LIST_REGISTRATION_EMAIL_TEMPLATE_DATA', payload: this.state.registrationtemplatelist });

          // this.state.remindertemplatelist = response.filter(result => result.Template_Type_Name.includes('Reminder'))
          this.state.remindertemplatelist = response.filter(result => /^Reminder/.test(result.Template_Type_Name));

          store.dispatch({ type: 'LIST_REMINDER_EMAIL_TEMPLATE_DATA', payload: this.state.remindertemplatelist });

          this.state.othertemplatelist = response.filter(result => /^Other/.test(result.Template_Type_Name))
          store.dispatch({ type: 'LIST_OTHER_EMAIL_TEMPLATE_DATA', payload: this.state.othertemplatelist });


          this.state.rawTableData = JSON.parse(JSON.stringify(response));
          store.dispatch({ type: 'LIST_DATA_EMAIL_TEMPLATE', payload: this.state.rawTableData });
          this.setState({ loader: false })
        })
    }
  }
  setsetting = (response) => {

    response.forEach(obj => {
      this.state.setting.push({ "id": obj.Template_ID, "open": false })
    })
    // this.setState({
    //   setting: {          
    //       [name]: value
    //   }
    // });
  }
  handleClick = id => {

    this.setState(state => ({
      ...this.state.setting,
      setting: this.state.setting.map(item =>
        item.id === id ? { ...item, open: !item.open } : item
      )
    }));
  };
  updateEmailtemplatelistData() {

    let selectedProviderID = this.props.ProviderID

    let data = { ProviderID: selectedProviderID }
    this.emailService.GetEmailList(GetEmailListURL, data)
      .then((response) => {
        console.log(response)
        this.setsetting(response);
        this.state.activitytemplatelist = response.filter(result => /^Activity/.test(result.Template_Type_Name));
        store.dispatch({ type: 'LIST_ACTIVITY_EMAIL_TEMPLATE_DATA', payload: this.state.activitytemplatelist });

        this.state.registrationtemplatelist = response.filter(result => /^Registartion/.test(result.Template_Type_Name));
        store.dispatch({ type: 'LIST_REGISTRATION_EMAIL_TEMPLATE_DATA', payload: this.state.registrationtemplatelist });

        this.state.remindertemplatelist = response.filter(result => /^Reminder/.test(result.Template_Type_Name));
        store.dispatch({ type: 'LIST_REMINDER_EMAIL_TEMPLATE_DATA', payload: this.state.remindertemplatelist });

        this.state.othertemplatelist = response.filter(result => /^Other/.test(result.Template_Type_Name))
        store.dispatch({ type: 'LIST_OTHER_EMAIL_TEMPLATE_DATA', payload: this.state.othertemplatelist });

        this.state.rawTableData = JSON.parse(JSON.stringify(response));
        //this.setState({PreStrsList: this.state.rawTableData,PreStrsListBackup: response});
        store.dispatch({ type: 'LIST_DATA_EMAIL_TEMPLATE', payload: this.state.rawTableData });
        this.setState({ loader: false })
      })

  }

  AddEmailTemplate = (e, index) => {

    let templatetypeID = null

    if (this.state.selectedActivitytemplate !== "") {
      templatetypeID = this.state.selectedActivitytemplate.Template_Type_ID;

    }
    else {
      templatetypeID = null
    }
    // let templatetypeID =this.state.selectedActivitytemplate.Activity_Template_ID;   
    let templatename = this.state.templatename;
    let subject = this.state.subject;
    let description = this.state.Description;



    const isValid = this.validate(templatetypeID, templatename, subject, description)
    if (isValid) {

      let ProviderID = this.props.ProviderID
      let UserSkeyID = this.props.UserSkeyID
      let data = { templateID: this.state.templateID, templatetypeID: templatetypeID, provider_ID: ProviderID, templatename: templatename, subject: subject, description: description, UserSkeyID: UserSkeyID }
      this.emailService.CreateUpdateEmail(data)
        .then((response) => {
          if (response.status == 200) {
            this.setState(prevState => ({
              EmailTemp: !prevState.EmailTemp
            }));
            // prestrsList = [];
            this.updateEmailtemplatelistData();
            this.setState({ with_title: true, model_title: "Thanks, transaction is completed successfully!!!" });
            this.setState({ PreDefDesc_checkbox: false });
            this.setState({ value_checkbox: false });
            this.setState({ templateID: null, selectedActivitytemplate: [], subject: "", templatename: "", description: "", editorState: EditorState.createEmpty() });
          }
        })
        .catch(err => {
          this.setState({ with_title: true, model_title: "Thanks, transaction is failed!!!" });
          this.setState({
            templateID: null, selectedActivitytemplate: [], subject: "", templatename: "", description: "", editorState: EditorState.createEmpty()
          });
        })
    }
    //   else{
    //     validate.section.forEach((obj,idx) =>{
    //       document.getElementById(obj).innerHTML = validate.message[idx]
    //   })
    //   }

  }
  updateEmailTemplate(data) {

    const contentBlock = htmlToDraft(data.Description);
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    this.state.editorState = EditorState.createWithContent(contentState);
    // this.state.valuecheckbox=true
    this.state.description = data.Description
    this.state.templatename = data.Template_Name
    this.state.templateID = data.Template_ID
    this.state.selectedActivitytemplate = this.state.templatedropdownData.filter(item => item.Template_Type_ID === data.Template_Type_ID)[0]
    this.setState({
      subject: data.Subject,
    });


    this.setState(prevState => ({
      EmailTemp: !prevState.EmailTemp
    }));
    this.removeBodyCss();

  }


  AssignEmailTempData(data) {

    this.state.templatetypeID = data.Template_Type_ID
    this.state.templateID = data.Template_ID

    this.setState(prevState => ({
      AssignEmailTemp: !prevState.AssignEmailTemp,

    }));
    this.removeBodyCss();

  }


  RemoveTemplate = (event, data, btnCall) => {
    event.preventDefault();
    //the condition message before delete
    this.setState({ btn_call: btnCall, eventData: event, success_msg: true, modal_data: data, model_title: "Are you sure you want to remove" });
  }
  onConfirmClick() {

    switch (this.state.btn_call) {

      case "Rmv": {

        this.state.eventData.preventDefault();

        this.setState({ success_msg: false });
        let selectedUserSkeyID = this.props.UserSkeyID
        let emailtemplateID = this.state.modal_data.Template_ID
        let data = {
          emailtemplateId: emailtemplateID,
          UserSkeyID: selectedUserSkeyID,
          Is_deleted: 1,
          Is_active: 1
        }

        this.emailService.RemoveEmailTemplate(data)
          .then(resp => {
            this.updateEmailtemplatelistData();
            this.setState({ with_title: true, model_title: "Thanks, transaction is completed successfully!!!" });
            console.log(resp);
          }).catch(err => {
            this.setState({ with_title: true, model_title: "Thanks, transaction is failed!!!" });
          });;
        break;
      }
      default: {
        break;
      }

    }

    //Again reset the state
    this.setState({ btn_call: "", eventData: null, success_msg: false, modal_data: null, model_title: "" });

  }
  AssignTemplate = (e, index) => {

    let activitytypeID = null

    if (this.state.selectedActivitytype !== "") {
      activitytypeID = this.state.selectedActivitytype.ID;

    }
    else {
      activitytypeID = null
    }

    let activityID = null

    if (this.state.selectedActivity !== "") {
      activityID = this.state.selectedActivity.Activity_ID;

    }
    else {
      activityID = null
    }

    const isValid = this.validateassignTemplate(activitytypeID, activityID)
    if (isValid) {
      let UserSkeyID = this.props.UserSkeyID
      let data = { templateID: this.state.templateID, templatetypeID: this.state.templatetypeID, activityID: activityID, UserSkeyID: UserSkeyID }
      this.emailService.AssignEmailtoActivity(data)
        .then((response) => {
          if (response.status == 200) {
            this.setState(prevState => ({
              AssignEmailTemp: !prevState.AssignEmailTemp
            }));
            // prestrsList = [];
            this.updateEmailtemplatelistData();
            this.setState({ with_title: true, model_title: "Thanks, transaction is completed successfully!!!" });
            this.setState({ templateID: null, selectedActivity: [], selectedActivitytype: [] });
          }
        })
        .catch(err => {
          this.setState({ with_title: true, model_title: "Thanks, transaction is failed!!!" });
          // this.setState({ templateID:null,selectedActivitytemplate:[],subject: "", templatename:"",   description:""     ,editorState : EditorState.createEmpty()
          // });
          this.setState({ templateID: null, selectedActivity: [], selectedActivitytype: [] });

        })
    }
    //   else{
    //     validate.section.forEach((obj,idx) =>{
    //       document.getElementById(obj).innerHTML = validate.message[idx]
    //   })
    //   }

  }
  GetActivitybyactivitytype(value) {

    this.state.filteredActivitybyactivitytypes = this.state.templateActivityData;
    this.setState({ selectedActivitytype: value });
    this.state.selectedActivitytype = value
    let activitytypeID = null;

    if (this.state.selectedActivitytype !== "" && this.state.selectedActivitytype !== null) {
      activitytypeID = this.state.selectedActivitytype.ID;
      this.state.filteredActivitybyactivitytypes = this.state.filteredActivitybyactivitytypes.filter(item => item.Activity_Type_ID === activitytypeID)

    }
    else {
      this.state.filteredActivitybyactivitytypes = this.state.templateActivityData;
    }

  }


  render() {

    return (
      <React.Fragment>
        {this.state.loader ?
          <Loader /> :
          null
        }
        <div className="container-fluid">
          <div className="row align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    Communication
                  </li>
                  <li className="breadcrumb-item active">
                    Email Templates
                  </li>
                </ol>
              </div>
            </Col>
          </div>
          <Row>
            <Col lg={12}>
              <Card className="mini-stat">
                <CardHeader className="bl-bg text-white">
                  <b>Email Template List</b>
                  <span className="float-right">
                    <button
                      className="btn update-btn float-right"
                      onClick={this.newEmailTemp}
                      data-toggle="modal"
                      data-target=".bs-example-modal-center"
                    >
                      Create New Email Template
                    </button>
                  </span>
                  <Modal
                    isOpen={this.state.EmailTemp}
                    toggle={this.newEmailTemp}
                  >
                    <div className="modal-header">
                      <h5 className="modal-title mt-0"> Create New Email Template</h5>
                      <button
                        type="button"
                        onClick={() =>
                          this.setState({ EmailTemp: false })
                        }
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="row">
                        <div className="col-sm-12">
                          {this.state.Err !== undefined && this.state.Err ?
                            (<div class="alert alert-danger" role="alert" >
                              {this.state.Err}
                              {/* User Type &amp; Discount not assigned. */}
                            </div>
                            ) : null}

                        </div>
                      </div>
                      <Row>
                        <Col lg={12}>
                          <div className="form-group">
                            <Label for="TempName">Template Type <span className="text-danger">*</span></Label>
                            <Autocomplete
                              className="d-block w-100"
                              options={this.state.templatedropdownData}
                              onChange={(event, value) => {
                                console.log('value ' + value)
                                this.setState({ selectedActivitytemplate: value });

                              }}
                              value={this.state.selectedActivitytemplate}
                              getOptionLabel={(option) => option.Template_Type_Name}
                              id="activitytemplate"
                              renderInput={(params) => (
                                <div ref={params.InputProps.ref}>
                                  <input type="activity template" placeholder="Enter activity template" id="act" type="text" {...params.inputProps} />
                                </div>
                              )} />

                          </div>
                          <div className="form-group">
                            <Label for="TempName">Template Name <span className="text-danger">*</span></Label>
                            <Input type="text" id="TempName" value={this.state.templatename} onChange={this.handletemplatename} />
                          </div>
                          <div className="form-group">
                            <Label for="EmailSub">Subject <span className="text-danger">*</span></Label>
                            <Input type="text" id="EmailSub" value={this.state.subject} onChange={this.handlesubject} />
                          </div>
                          <div className="form-group">
                            <Label for="EmailDesc">Description <span className="text-danger">*</span></Label>
                            <Editor
                              editorState={this.state.editorState}
                              wrapperClassName="demo-wrapper"
                              editorClassName="demo-editor"
                              onEditorStateChange={e => this.onEditorStateChange(e)}
                              toolbar={{
                                inline: { inDropdown: true },
                                list: { inDropdown: true },
                                textAlign: { inDropdown: true },
                                link: { inDropdown: true },
                                emoji: { inDropdown: false },
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <Button className="btn update-btn w-100" onClick={this.AddEmailTemplate} >
                              Save
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Modal>
                </CardHeader>
                <Modal
                  isOpen={this.state.AssignEmailTemp}
                  toggle={this.AssignEmailTemp}
                >
                  <div className="modal-header">
                    <h5 className="modal-title mt-0"> Assign Email Template</h5>
                    <button
                      type="button"
                      onClick={() =>
                        this.setState({ AssignEmailTemp: false, templateID: null })
                      }
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-sm-12">
                        {this.state.assignTemplateErr !== undefined && this.state.assignTemplateErr ?
                          (<div class="alert alert-danger" role="alert" >
                            {this.state.assignTemplateErr}
                            {/* User Type &amp; Discount not assigned. */}
                          </div>
                          ) : null}

                      </div>
                    </div>
                    <Row>
                      <Col lg={12}>
                        <div className="form-group">
                          <Label for="TempName">Select Activity Type <span className="text-danger">*</span></Label>

                          <Autocomplete
                            className="d-block w-100"
                            options={this.state.activitytypeslist}
                            onChange={(event, value) => {
                              console.log('value ' + value)
                              // this.setState({ selectedActivitytype: value });
                              this.GetActivitybyactivitytype(value);
                            }}
                            value={this.state.selectedActivitytype}
                            getOptionLabel={(option) => option.activitytype}
                            id="activitytype"
                            renderInput={(params) => (
                              <div ref={params.InputProps.ref}>
                                <input type="activitytype" placeholder="Enter activity" id="act" type="text" {...params.inputProps} />
                              </div>
                            )} />
                        </div>
                        <div className="form-group">
                          <Label for="TempName">Select Activity Name <span className="text-danger">*</span></Label>
                          {/* <MultichipSelect /> */}
                          <Autocomplete
                            className="d-block w-100"
                            options={this.state.filteredActivitybyactivitytypes}
                            onChange={(event, value) => {
                              console.log('value ' + value)
                              this.setState({ selectedActivity: value });

                            }}
                            value={this.state.selectedActivity}
                            getOptionLabel={(option) => option.Activity_Name}
                            id="activitytype"
                            renderInput={(params) => (
                              <div ref={params.InputProps.ref}>
                                <input type="activitytype" placeholder="Enter activity" id="act" type="text" {...params.inputProps} />
                              </div>
                            )} />
                        </div>
                        <div className="form-group">
                          <Button className="btn update-btn w-100" onClick={this.AssignTemplate}>
                            Assign Template
                                      </Button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Modal>
                {this.state.success_msg ? (
                  <Confirmation_Message title={this.state.model_title}
                    modelOkButtonClicked={this.onConfirmClick.bind(this)}
                    success_msg={true} modelCancelButtonClicked={() => this.CancelBtn()} />
                ) : null}

                {this.state.with_title ? (
                  <Information_Message title={this.state.model_title}
                    modelOkButtonClicked={() => this.Information_MessageBtn()}
                  ></Information_Message>
                ) : null}
                <CardBody className="p-0">
                  <Nav tabs className="nav-tabs-custom nav-justified mt-3">
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTabJustify === "1"
                        })}
                        onClick={() => {
                          this.toggleCustomJustified("1");
                        }}
                      >
                        <span class="d-none d-sm-block">Activity Notification</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTabJustify === "2"
                        })}
                        onClick={() => {
                          this.toggleCustomJustified("2");
                        }}
                      >
                        <span class="d-none d-sm-block">Registration Template</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTabJustify === "3"
                        })}
                        onClick={() => {
                          this.toggleCustomJustified("3");
                        }}
                      >
                        <span class="d-none d-sm-block">Reminder Template</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTabJustify === "4"
                        })}
                        onClick={() => {
                          this.toggleCustomJustified("4");
                        }}
                      >
                        <span class="d-none d-sm-block">Other Template</span>
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={this.state.activeTabJustify}>
                    <TabPane tabId="1" className="p-3">
                      <Row>
                        <Col sm="12">
                          {this.state.activitytemplatelist &&
                            this.state.activitytemplatelist.map((single, key) => {
                              return (
                                <div id="accordion">
                                  <div className="card mb-1">
                                    <div className="card-header p-3" id="headingOne">
                                      <h6 className="m-0 font-14">
                                        <span onClick={() => this.handleClick(single.Template_ID)} className="text-dark">
                                          {single.Template_Name}
                                        </span>
                                        <span className="float-right">
                                          <button
                                            className="btn update-btn mr-2"
                                            // onClick={this.newEmailTemp}
                                            onClick={() => this.updateEmailTemplate(single)}
                                            data-toggle="modal"
                                            data-target=".bs-example-modal-center"
                                          >
                                            View &amp; Update
                              </button>
                                          <button className="btn update-btn mr-2"
                                            // onClick={this.AssignEmailTemp}
                                            onClick={() => this.AssignEmailTempData(single)}

                                            // onClick={this.AssignEmailTempData}
                                            data-toggle="modal"
                                            data-target=".bs-example-modal-center">
                                            Use Email Template
                                     </button>



                                          <button className="btn update-btn mr-2" onClick={(event) => this.RemoveTemplate(event, single, "Rmv")}>
                                            Remove Email Template
                              </button>

                                        </span>
                                      </h6>
                                    </div>

                                    <Collapse isOpen={this.state.setting.filter(item => item.id === single.Template_ID)[0].open}>
                                      <Card>
                                        <CardBody>
                                          <table
                                            className="main"
                                            width="100%"
                                            cellPadding="0"
                                            cellSpacing="0"
                                            style={{
                                              fontFamily:
                                                "Helvetica Neue,Helvetica,Arial,sans-serif",
                                              boxSizing: "border-box",
                                              fontSize: "14px",
                                              borderRadius: "3px",
                                              backgroundColor: "#fff",
                                              margin: "0",
                                              border: "1px solid #e9e9e9"
                                            }}
                                          >
                                            <tbody>
                                              <tr
                                                style={{
                                                  fontFamily:
                                                    "Helvetica Neue,Helvetica,Arial,sans-serif",
                                                  boxSizing: "border-box",
                                                  fontSize: "14px",
                                                  margin: "0"
                                                }}
                                              >
                                                <td
                                                  className="alert alert-success"
                                                  style={{
                                                    fontFamily:
                                                      "Helvetica Neue,Helvetica,Arial,sans-serif",
                                                  }}
                                                  valign="top"
                                                >
                                                  {single.Subject}
                                                </td>
                                              </tr>
                                              <tr
                                                style={{
                                                  fontFamily:
                                                    "Helvetica Neue,Helvetica,Arial,sans-serif",
                                                  boxSizing: "border-box",
                                                  fontSize: "14px",
                                                  margin: "0"
                                                }}
                                              >
                                                <td
                                                  className="content-wrap"
                                                  style={{
                                                    fontFamily:
                                                      "Helvetica Neue,Helvetica,Arial,sans-serif",
                                                    boxSizing: "border-box",
                                                    fontSize: "14px",
                                                    verticalAlign: "top",
                                                    margin: "0",
                                                    padding: "20px"
                                                  }}
                                                  valign="top"
                                                >
                                                  <table
                                                    width="100%"
                                                    cellPadding="0"
                                                    cellSpacing="0"
                                                    style={{
                                                      fontFamily:
                                                        "Helvetica Neue,Helvetica,Arial,sans-serif",
                                                      boxSizing: "border-box",
                                                      fontSize: "14px",
                                                      margin: "0"
                                                    }}
                                                  >
                                                    <tbody>
                                                      {ReactHtmlParser(single.Description)}
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </CardBody>
                                      </Card>
                                    </Collapse>
                                  </div>


                                </div>
                              );
                            })}

                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2" className="p-3">
                      <Row>
                        <Col sm="12">
                          {this.state.registrationtemplatelist &&
                            this.state.registrationtemplatelist.map((single, key) => {
                              return (
                                <div id="accordion">
                                  <div className="card mb-1">
                                    <div className="card-header p-3" id="headingOne">
                                      <h6 className="m-0 font-14">
                                        <span onClick={() => this.handleClick(single.Template_ID)} className="text-dark">
                                          {single.Template_Name}
                                        </span>
                                        <span className="float-right">
                                          <button
                                            className="btn update-btn mr-2"
                                            // onClick={this.newEmailTemp}
                                            onClick={() => this.updateEmailTemplate(single)}
                                            data-toggle="modal"
                                            data-target=".bs-example-modal-center"
                                          >
                                            View &amp; Update
                              </button>
                                          <button className="btn update-btn mr-2"
                                            // onClick={this.AssignEmailTemp}
                                            onClick={() => this.AssignEmailTempData(single)}

                                            // onClick={this.AssignEmailTempData}
                                            data-toggle="modal"
                                            data-target=".bs-example-modal-center">
                                            Use Email Template
                                     </button>



                                          <button className="btn update-btn mr-2" onClick={(event) => this.RemoveTemplate(event, single, "Rmv")}>
                                            Remove Email Template
                              </button>

                                        </span>
                                      </h6>
                                    </div>

                                    <Collapse isOpen={this.state.setting.filter(item => item.id === single.Template_ID)[0].open}>
                                      <Card>
                                        <CardBody>
                                          <table
                                            className="main"
                                            width="100%"
                                            cellPadding="0"
                                            cellSpacing="0"
                                            style={{
                                              fontFamily:
                                                "Helvetica Neue,Helvetica,Arial,sans-serif",
                                              boxSizing: "border-box",
                                              fontSize: "14px",
                                              borderRadius: "3px",
                                              backgroundColor: "#fff",
                                              margin: "0",
                                              border: "1px solid #e9e9e9"
                                            }}
                                          >
                                            <tbody>
                                              <tr
                                                style={{
                                                  fontFamily:
                                                    "Helvetica Neue,Helvetica,Arial,sans-serif",
                                                  boxSizing: "border-box",
                                                  fontSize: "14px",
                                                  margin: "0"
                                                }}
                                              >
                                                <td
                                                  className="alert alert-success"
                                                  style={{
                                                    fontFamily:
                                                      "Helvetica Neue,Helvetica,Arial,sans-serif",
                                                  }}
                                                  valign="top"
                                                >
                                                  {single.Subject}
                                                </td>
                                              </tr>
                                              <tr
                                                style={{
                                                  fontFamily:
                                                    "Helvetica Neue,Helvetica,Arial,sans-serif",
                                                  boxSizing: "border-box",
                                                  fontSize: "14px",
                                                  margin: "0"
                                                }}
                                              >
                                                <td
                                                  className="content-wrap"
                                                  style={{
                                                    fontFamily:
                                                      "Helvetica Neue,Helvetica,Arial,sans-serif",
                                                    boxSizing: "border-box",
                                                    fontSize: "14px",
                                                    verticalAlign: "top",
                                                    margin: "0",
                                                    padding: "20px"
                                                  }}
                                                  valign="top"
                                                >
                                                  <table
                                                    width="100%"
                                                    cellPadding="0"
                                                    cellSpacing="0"
                                                    style={{
                                                      fontFamily:
                                                        "Helvetica Neue,Helvetica,Arial,sans-serif",
                                                      boxSizing: "border-box",
                                                      fontSize: "14px",
                                                      margin: "0"
                                                    }}
                                                  >
                                                    <tbody>
                                                      {ReactHtmlParser(single.Description)}
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </CardBody>
                                      </Card>
                                    </Collapse>
                                  </div>


                                </div>
                              );
                            })} </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="3" className="p-3">
                      <Row>
                        <Col sm="12">
                          {this.state.remindertemplatelist &&
                            this.state.remindertemplatelist.map((single, key) => {
                              return (
                                <div id="accordion">
                                  <div className="card mb-1">
                                    <div className="card-header p-3" id="headingOne">
                                      <h6 className="m-0 font-14">
                                        <span onClick={() => this.handleClick(single.Template_ID)} className="text-dark">
                                          {single.Template_Name}
                                        </span>
                                        <span className="float-right">
                                          <button
                                            className="btn update-btn mr-2"
                                            // onClick={this.newEmailTemp}
                                            onClick={() => this.updateEmailTemplate(single)}
                                            data-toggle="modal"
                                            data-target=".bs-example-modal-center"
                                          >
                                            View &amp; Update
                              </button>
                                          <button className="btn update-btn mr-2"
                                            // onClick={this.AssignEmailTemp}
                                            onClick={() => this.AssignEmailTempData(single)}

                                            // onClick={this.AssignEmailTempData}
                                            data-toggle="modal"
                                            data-target=".bs-example-modal-center">
                                            Use Email Template
                                     </button>



                                          <button className="btn update-btn mr-2" onClick={(event) => this.RemoveTemplate(event, single, "Rmv")}>
                                            Remove Email Template
                              </button>

                                        </span>
                                      </h6>
                                    </div>

                                    <Collapse isOpen={this.state.setting.filter(item => item.id === single.Template_ID)[0].open}>
                                      <Card>
                                        <CardBody>
                                          <table
                                            className="main"
                                            width="100%"
                                            cellPadding="0"
                                            cellSpacing="0"
                                            style={{
                                              fontFamily:
                                                "Helvetica Neue,Helvetica,Arial,sans-serif",
                                              boxSizing: "border-box",
                                              fontSize: "14px",
                                              borderRadius: "3px",
                                              backgroundColor: "#fff",
                                              margin: "0",
                                              border: "1px solid #e9e9e9"
                                            }}
                                          >
                                            <tbody>
                                              <tr
                                                style={{
                                                  fontFamily:
                                                    "Helvetica Neue,Helvetica,Arial,sans-serif",
                                                  boxSizing: "border-box",
                                                  fontSize: "14px",
                                                  margin: "0"
                                                }}
                                              >
                                                <td
                                                  className="alert alert-success"
                                                  style={{
                                                    fontFamily:
                                                      "Helvetica Neue,Helvetica,Arial,sans-serif",
                                                  }}
                                                  valign="top"
                                                >
                                                  {single.Subject}
                                                </td>
                                              </tr>
                                              <tr
                                                style={{
                                                  fontFamily:
                                                    "Helvetica Neue,Helvetica,Arial,sans-serif",
                                                  boxSizing: "border-box",
                                                  fontSize: "14px",
                                                  margin: "0"
                                                }}
                                              >
                                                <td
                                                  className="content-wrap"
                                                  style={{
                                                    fontFamily:
                                                      "Helvetica Neue,Helvetica,Arial,sans-serif",
                                                    boxSizing: "border-box",
                                                    fontSize: "14px",
                                                    verticalAlign: "top",
                                                    margin: "0",
                                                    padding: "20px"
                                                  }}
                                                  valign="top"
                                                >
                                                  <table
                                                    width="100%"
                                                    cellPadding="0"
                                                    cellSpacing="0"
                                                    style={{
                                                      fontFamily:
                                                        "Helvetica Neue,Helvetica,Arial,sans-serif",
                                                      boxSizing: "border-box",
                                                      fontSize: "14px",
                                                      margin: "0"
                                                    }}
                                                  >
                                                    <tbody>
                                                      {ReactHtmlParser(single.Description)}
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </CardBody>
                                      </Card>
                                    </Collapse>
                                  </div>


                                </div>
                              );
                            })} </Col>

                      </Row>
                    </TabPane>
                    <TabPane tabId="4" className="p-3">
                      <Row>
                        <Col sm="12">
                          {this.state.othertemplatelist &&
                            this.state.othertemplatelist.map((single, key) => {
                              return (
                                <div id="accordion">
                                  <div className="card mb-1">
                                    <div className="card-header p-3" id="headingOne">
                                      <h6 className="m-0 font-14">
                                        <span onClick={() => this.handleClick(single.Template_ID)} className="text-dark">
                                          {single.Template_Name}
                                        </span>
                                        <span className="float-right">
                                          <button
                                            className="btn update-btn mr-2"
                                            // onClick={this.newEmailTemp}
                                            onClick={() => this.updateEmailTemplate(single)}
                                            data-toggle="modal"
                                            data-target=".bs-example-modal-center"
                                          >
                                            View &amp; Update
                              </button>
                                          <button className="btn update-btn mr-2"
                                            // onClick={this.AssignEmailTemp}
                                            onClick={() => this.AssignEmailTempData(single)}

                                            // onClick={this.AssignEmailTempData}
                                            data-toggle="modal"
                                            data-target=".bs-example-modal-center">
                                            Use Email Template
                                     </button>



                                          <button className="btn update-btn mr-2" onClick={(event) => this.RemoveTemplate(event, single, "Rmv")}>
                                            Remove Email Template
                              </button>

                                        </span>
                                      </h6>
                                    </div>

                                    <Collapse isOpen={this.state.setting.filter(item => item.id === single.Template_ID)[0].open}>
                                      <Card>
                                        <CardBody>
                                          <table
                                            className="main"
                                            width="100%"
                                            cellPadding="0"
                                            cellSpacing="0"
                                            style={{
                                              fontFamily:
                                                "Helvetica Neue,Helvetica,Arial,sans-serif",
                                              boxSizing: "border-box",
                                              fontSize: "14px",
                                              borderRadius: "3px",
                                              backgroundColor: "#fff",
                                              margin: "0",
                                              border: "1px solid #e9e9e9"
                                            }}
                                          >
                                            <tbody>
                                              <tr
                                                style={{
                                                  fontFamily:
                                                    "Helvetica Neue,Helvetica,Arial,sans-serif",
                                                  boxSizing: "border-box",
                                                  fontSize: "14px",
                                                  margin: "0"
                                                }}
                                              >
                                                <td
                                                  className="alert alert-success"
                                                  style={{
                                                    fontFamily:
                                                      "Helvetica Neue,Helvetica,Arial,sans-serif",
                                                  }}
                                                  valign="top"
                                                >
                                                  {single.Subject}
                                                </td>
                                              </tr>
                                              <tr
                                                style={{
                                                  fontFamily:
                                                    "Helvetica Neue,Helvetica,Arial,sans-serif",
                                                  boxSizing: "border-box",
                                                  fontSize: "14px",
                                                  margin: "0"
                                                }}
                                              >
                                                <td
                                                  className="content-wrap"
                                                  style={{
                                                    fontFamily:
                                                      "Helvetica Neue,Helvetica,Arial,sans-serif",
                                                    boxSizing: "border-box",
                                                    fontSize: "14px",
                                                    verticalAlign: "top",
                                                    margin: "0",
                                                    padding: "20px"
                                                  }}
                                                  valign="top"
                                                >
                                                  <table
                                                    width="100%"
                                                    cellPadding="0"
                                                    cellSpacing="0"
                                                    style={{
                                                      fontFamily:
                                                        "Helvetica Neue,Helvetica,Arial,sans-serif",
                                                      boxSizing: "border-box",
                                                      fontSize: "14px",
                                                      margin: "0"
                                                    }}
                                                  >
                                                    <tbody>
                                                      {ReactHtmlParser(single.Description)}
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </CardBody>
                                      </Card>
                                    </Collapse>
                                  </div>


                                </div>
                              );
                            })} </Col>


                      </Row>
                    </TabPane>
                  </TabContent>
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

    ProviderID: state.currentPageName.roleAndProvider.selectedRole.Service_Provider_ID,
    UserSkeyID: state.userProfileData != undefined ? state.userProfileData.ProfileData[0][0].User_Skey_ID : null,
    templateData: state.Email != undefined ? state.Email.templatetypelist : "",
    emailtemplatelistData: state.Email.emailtemplatelist,
    activityemailtemplatelistData: state.Email.activityemailtemplatelist,
    registrationemailtemlistData: state.Email.registrationemailtemlist,
    reminderemailtemlistData: state.Email.reminderemailtemlist,
    otheremailtemlistData: state.Email.otheremailtemlist
  };
};
const dispatchToProps = dispatch => {
  return {
    updateTableData: (type, payload) => {
      dispatch({ type: type, payload: payload })
    }
  }
}


export default withRouter(connect(mapStatetoProps, dispatchToProps)(EmailTemp));

