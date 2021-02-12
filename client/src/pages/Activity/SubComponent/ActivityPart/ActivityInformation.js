import React, { Component } from 'react';
import { withRouter, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Row, Col, Input, Label } from "reactstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import MultiChipSelect from "../MultiChipSelect";
import Autocomplete from "../Autocomplete";
import Dropzone from "react-dropzone";
import ChipInput from "material-ui-chip-input";
import Chip from '@material-ui/core/Chip';
import { AllValidate } from '../../ActivityModel';
import { EditorState } from 'draft-js';

let localValidate = {
  activityNameAIVTemp: false, activityTypeAIVTemp: false, activityTagAIVTemp: false,
  activityDescriptionAIVTemp: false, activityFromDateAIVTemp: false, activityToDateAIVTemp: false,
  activityStartTimeAIVTemp: false, activityEndTimeAIVTemp: false, activityWeekDaysAIVTemp: false, activityAddDescAIVTemp: true
}

class ActivityInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switch1: true,
      groupChipsData: [],
      ActivityInformation: { ...this.props.ActivityInformation },
      ...AllValidate.AIValidate,
      minStartDate: '',
      maxStartDate: '',
      minEndDate: '',
      maxEndDate: '',
    };

    this.handleChange = this.handleChange.bind(this)
    this.handleACChange = this.handleACChange.bind(this)
    this.onActivityDescStateChange = this.onActivityDescStateChange.bind(this)
    this.onActivityAddDescStateChange = this.onActivityAddDescStateChange.bind(this)
    this.handleMCSChange = this.handleMCSChange.bind(this)
    this.handleAcceptedFiles = this.handleAcceptedFiles.bind(this);
    this.validateFunction = this.validateFunction.bind(this)
    this.internalValidateFunction = this.internalValidateFunction.bind(this)
  }

  componentDidMount() {
    let d = new Date();
    let currMonth = d.getMonth() + 1;
    if (currMonth.length < 2) {
      currMonth = "0" + currMonth
    }
    let currYear = d.getFullYear();
    let currYearPlusOne = parseInt(currYear) + 1
    let miDate = `${currYear}-${currMonth}-01`
    let mxDate = `${currYearPlusOne}-${currMonth}-01`
    this.setState({ minStartDate: miDate })
    this.setState({ maxStartDate: mxDate })
  }
  // using to send back the update object
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.ActivityInformation !== this.props.ActivityInformation) {
      this.setState({ ActivityInformation: this.props.ActivityInformation })
      if(this.props.ActivityInformation.activityAssignGroup !== ''){
        let tempData = this.props.GroupSetGroupMap.filter(row => row.Group_Set_ID === this.props.ActivityInformation.activityAssignGroup)
        this.setState({ groupChipsData: tempData })
      }
    }
    if (prevState.ActivityInformation !== this.state.ActivityInformation) {
      this.props.handleActivityInformation(this.state.ActivityInformation)
    }
    if (prevProps.TriggrtVaidation !== this.props.TriggrtVaidation) {
      this.validateFunction()
    }
    // if(prevState.ActivityInformation !== this.state.ActivityInformation){
    //   this.validateFunction()
    // }
  }
  // validation function
  validateFunction = () => {
    // Validate Activity Name
    if (this.state.ActivityInformation.activityName === '') {
      this.setState({ activityNameAIV: 'Please Enter Activity Name' })
      localValidate.activityNameAIVTemp = false
    }
    else {
      this.setState({ activityNameAIV: "" })
      localValidate.activityNameAIVTemp = true
    }
    // Validate Activity Type
    if (this.state.ActivityInformation.activityType === 0) {
      this.setState({ activityTypeAIV: 'Please Enter Activity Type' })
      localValidate.activityTypeAIVTemp = false
    }
    else {
      this.setState({ activityTypeAIV: "" })
      localValidate.activityTypeAIVTemp = true
    }
    // Vaalidate Activity Tags
    if (this.state.ActivityInformation.activityTag.length === 0) {
      this.setState({ activityTagAIV: 'Please Enter Activity Tags' })
      localValidate.activityTagAIVTemp = false
    }
    else {
      this.setState({ activityTagAIV: "" })
      localValidate.activityTagAIVTemp = true
    }
    // Validate Activity Description
    if (this.state.ActivityInformation.activityDescription.getCurrentContent().getPlainText().length === 0) {
      this.setState({ activityDescriptionAIV: 'Please Enter Activity Description' })
      localValidate.activityDescriptionAIVTemp = false
    }
    else {
      this.setState({ activityDescriptionAIV: "" })
      localValidate.activityDescriptionAIVTemp = true
    }
    // Validate from date
    if (this.state.ActivityInformation.activityFromDate === '') {
      this.setState({ activityFromDateAIV: 'Please Enter From Date' })
      localValidate.activityFromDateAIVTemp = false
    }
    else {
      this.setState({ activityFromDateAIV: "" })
      localValidate.activityFromDateAIVTemp = true
    }
    // Validate to date
    if (this.state.ActivityInformation.activityToDate === '') {
      this.setState({ activityToDateAIV: 'Please Enter To Date' })
      localValidate.activityToDateAIVTemp = false
    }
    else {
      this.setState({ activityToDateAIV: "" })
      localValidate.activityToDateAIVTemp = true
    }
    // Validate start time
    if (this.state.ActivityInformation.activityStartTime === '') {
      this.setState({ activityStartTimeAIV: 'Please Enter Start Time' })
      localValidate.activityStartTimeAIVTemp = false
    }
    else {
      this.setState({ activityStartTimeAIV: "" })
      localValidate.activityStartTimeAIVTemp = true
    }
    // Validate end time
    if (this.state.ActivityInformation.activityEndTime === '') {
      this.setState({ activityEndTimeAIV: 'Please Enter End Time' })
      localValidate.activityEndTimeAIVTemp = false
    }
    else {
      this.setState({ activityEndTimeAIV: "" })
      localValidate.activityEndTimeAIVTemp = true
    }
    // Validate Week Days
    if (this.state.ActivityInformation.activityWeekDays.length === 0) {
      this.setState({ activityWeekDaysAIV: 'Please Select Week Days' })
      localValidate.activityWeekDaysAIVTemp = false
    }
    else {
      this.setState({ activityWeekDaysAIV: "" })
      localValidate.activityWeekDaysAIVTemp = true
    }
    // final validate
    if (localValidate.activityNameAIVTemp === false || localValidate.activityTypeAIVTemp === false || localValidate.activityTagAIVTemp === false ||
      localValidate.activityDescriptionAIVTemp === false || localValidate.activityFromDateAIVTemp === false || localValidate.activityToDateAIVTemp === false ||
      localValidate.activityStartTimeAIVTemp === false || localValidate.activityEndTimeAIVTemp === false || localValidate.activityWeekDaysAIVTemp === false
      || localValidate.activityAddDescAIVTemp == false) {
      this.props.handleAllCompValidation('AI', false)
    }
    else {
      this.props.handleAllCompValidation('AI', true)
    }
  }
  // internal validation - field wise
  internalValidateFunction = (fname, fvalue) => {
    switch (fname) {
      case 'activityName':
        // Validate Activity Name
        if (fvalue === '') {
          this.setState({ activityNameAIV: 'Please Enter Activity Name' })
          localValidate.activityNameAIVTemp = false
        }
        else {
          this.setState({ activityNameAIV: "" })
          localValidate.activityNameAIVTemp = true
        }
        break;
      case 'activityType':
        // Validate Activity Type
        if (fvalue === 0) {
          this.setState({ activityTypeAIV: 'Please Enter Activity Type' })
          localValidate.activityTypeAIVTemp = false
        }
        else {
          this.setState({ activityTypeAIV: "" })
          localValidate.activityTypeAIVTemp = true
        }
        break
      case 'activityTag':
        // Vaalidate Activity Tags
        if (fvalue.length === 0) {
          this.setState({ activityTagAIV: 'Please Enter Activity Tags' })
          localValidate.activityTagAIVTemp = false
        }
        else {
          this.setState({ activityTagAIV: "" })
          localValidate.activityTagAIVTemp = true
        }
        break;
      case 'activityDescription':
        // Validate Activity Description
        if (fvalue.getCurrentContent().getPlainText().length === 0) {
          this.setState({ activityDescriptionAIV: 'Please Enter Activity Description' })
          localValidate.activityDescriptionAIVTemp = false
        }
        else {
          this.setState({ activityDescriptionAIV: "" })
          localValidate.activityDescriptionAIVTemp = true
        }
        break
      case 'activityFromDate':
        // Validate from date
        if (fvalue === '') {
          this.setState({ activityFromDateAIV: 'Please Enter From Date' })
          localValidate.activityFromDateAIVTemp = false
        }
        else {
          this.setState({ activityFromDateAIV: "" })
          localValidate.activityFromDateAIVTemp = true
        }
        break;
      case 'activityToDate':
        // Validate to date
        if (fvalue === '') {
          this.setState({ activityToDateAIV: 'Please Enter To Date' })
          localValidate.activityToDateAIVTemp = false
        }
        else {
          this.setState({ activityToDateAIV: "" })
          localValidate.activityToDateAIVTemp = true
        }
        break
      case 'activityStartTime':
        // Validate start time
        if (fvalue === '') {
          this.setState({ activityStartTimeAIV: 'Please Enter Start Time' })
          localValidate.activityStartTimeAIVTemp = false
        }
        else {
          this.setState({ activityStartTimeAIV: "" })
          localValidate.activityStartTimeAIVTemp = true
        }
        break;
      case 'activityEndTime':
        // Validate end time
        if (fvalue === '') {
          this.setState({ activityEndTimeAIV: 'Please Enter End Time' })
          localValidate.activityEndTimeAIVTemp = false
        }
        else {
          this.setState({ activityEndTimeAIV: "" })
          localValidate.activityEndTimeAIVTemp = true
        }
        break
      case 'activityWeekDays':
        // Validate Week Days
        if (fvalue.length === 0) {
          this.setState({ activityWeekDaysAIV: 'Please Select Week Days' })
          localValidate.activityWeekDaysAIVTemp = false
        }
        else {
          this.setState({ activityWeekDaysAIV: "" })
          localValidate.activityWeekDaysAIVTemp = true
        }
        break;
      default:
        break
    }
  }
  // handle Input Change
  handleChange = (event) => {
    let fname = event.target.name;
    let fvalue = event.target.value;
    if (fname === 'activityFromDate') {
      this.setState(prevState => ({
        ActivityInformation: {
          ...prevState.ActivityInformation, activityToDate: ''
        }
      }));
      this.setState({ minEndDate: fvalue })
      let p = new Date(fvalue)
      let q = parseInt(p.getFullYear()) + 1
      let r = p.getMonth() + 1
      if (r.length < 2) {
        r = "0" + r
      }
      let s = p.getDate()
      if (s.length < 2) {
        s = "0" + s
      }
      let t = `${q}-${r}-${s}`
      this.setState({ maxEndDate: t })
    }
    this.setState(prevState => ({
      ActivityInformation: {
        ...prevState.ActivityInformation, [fname]: fvalue
      }
    }));
    this.internalValidateFunction(fname, fvalue)
  }
  // key input stop
  disableKeyPress = (e) => {
    e.preventDefault();
    return false
  }
  // handle activity type chnage
  handleACChange = (value, name) => {
    this.setState(prevState => ({
      ActivityInformation: {
        ...prevState.ActivityInformation, [name]: value
      }
    }));
    if (name === 'activityAssignGroup') {
      let tempData = this.props.GroupSetGroupMap.filter(row => row.Group_Set_ID === value)
      this.setState({ groupChipsData: tempData })
    }
    if(name === 'activityType'){
      this.internalValidateFunction(name, value)
    }
  }
  //handle weekdays / assign group - Multi chip select
  handleMCSChange = (value) => {
    let temp = value
    this.setState(prevState => ({
      ActivityInformation: {
        ...prevState.ActivityInformation, activityWeekDays: value
      }
    }));
    this.internalValidateFunction('activityWeekDays', temp)
  }
  // handle file Upload
  handleAcceptedFiles = files => {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: this.formatBytes(file.size)
      })
    );

    //this.setState({ selectedFiles: files });
    this.setState(prevState => ({
      ActivityInformation: {
        ...prevState.ActivityInformation, activityImgUpload: [...prevState.ActivityInformation.activityImgUpload, ...files]
      }
    }));
  };
  /** * Formats the size */
  formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };
  // Add Chips
  handleAddChip = (chip) => {
    let temp = [...this.state.ActivityInformation.activityTag, chip]
    this.setState(prevState => ({
      ActivityInformation: {
        ...prevState.ActivityInformation, activityTag: [...prevState.ActivityInformation.activityTag, chip]
      }
    }))
    this.internalValidateFunction('activityTag', temp)
  }
  // Delete Chips
  handleDeleteChip = (chip) => {
    const _ = require("underscore");
    let temp = _.without(this.state.ActivityInformation.activityTag, chip)
    this.setState(prevState => ({
      ActivityInformation: {
        ...prevState.ActivityInformation, activityTag: _.without(prevState.ActivityInformation.activityTag, chip)
      }
    }))
    this.internalValidateFunction('activityTag', temp)
  }
  // Activity Description Editor state change handle 
  onActivityDescStateChange = (editorState) => {
    // if (editorState.getCurrentContent().getPlainText().length > 750) {
    //   this.setState({ activityDescriptionAIV: 'Activity Description cannot be greater then 750 characters' })
    //   localValidate.activityDescriptionAIVTemp = false
    // }
    // else {
      this.setState(prevState => ({
        ActivityInformation: {
          ...prevState.ActivityInformation, activityDescription: editorState
        }
      }));
      //this.setState({ activityDescriptionAIV: '' })
      //localValidate.activityDescriptionAIVTemp = true
    //}
    this.internalValidateFunction('activityDescription', editorState)
  };
  // Activity Additional Description Editor state change handle 
  onActivityAddDescStateChange = (editorState) => {
    // if (editorState.getCurrentContent().getPlainText().length > 750) {
    //   this.setState({ activityAddDescAIV: 'Activity Description cannot be greater then 750 characters' })
    //   localValidate.activityAddDescAIVTemp = false
    // }
    // else {
      this.setState(prevState => ({
        ActivityInformation: {
          ...prevState.ActivityInformation, activityAdditionalDescription: editorState
        }
      }));
      //this.setState({ activityAddDescAIV: '' })
      //localValidate.activityAddDescAIVTemp = true
    //}
  };

  render() {
    return (
      <form>
        <Row>
          <Col lg={6}>
            <div className="form-group">
              <Label for="act-name">Activity Name <span className="text-danger" >*</span></Label>
              <Input type="text" id="act-name" name='activityName'
                placeholder="Enter Activity Name"
                value={this.state.ActivityInformation.activityName}
                onChange={this.handleChange} maxLength="30" />
              <span className="text-danger">{this.state.activityNameAIV}</span>
            </div>
            <div className="form-group">
              <Label for="act-type">Activity Type <span className="text-danger" >*</span></Label>
              <Autocomplete
                name="activityType"
                value={this.state.ActivityInformation.activityType}
                DataList={this.props.ActivityTypeList}
                ACType='Activity Type'
                handleACChange={this.handleACChange} />
              <span className="text-danger">{this.state.activityTypeAIV}</span>
            </div>
            <div className="form-group">
              <Label for="act-tag">Activity Tag <span className="text-danger" >*</span></Label>
              <ChipInput
                value={this.state.ActivityInformation.activityTag}
                onAdd={(chip) => this.handleAddChip(chip)}
                onDelete={(chip, index) => this.handleDeleteChip(chip, index)}
                placeholder="Enter Activity Tag. e.g. Run, Marathon"
                className="chips-input" />
              <span className="text-danger">{this.state.activityTagAIV}</span>
            </div>
            <div className="form-group mb-3">
              <Label for="act-dec">Description <span className="text-danger" >*</span></Label>
              <Editor
                editorState={this.state.ActivityInformation.activityDescription}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                toolbar={{
                  inline: { inDropdown: true },
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                  link: { inDropdown: false },
                }}
                onEditorStateChange={this.onActivityDescStateChange} />
              <span className="text-danger">{this.state.activityDescriptionAIV}</span>
            </div>
            <div className="form-group mb-3">
              <Label for="act-adddec">Additional Description</Label>
              <Editor
                editorState={this.state.ActivityInformation.activityAdditionalDescription}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                toolbar={{
                  inline: { inDropdown: true },
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                  link: { inDropdown: false },
                }}
                onEditorStateChange={this.onActivityAddDescStateChange}
              />
            </div>
          </Col>
          <Col lg={6}>
            <Row>
              <Col lg={6}>
                <div className="form-group">
                  <Label for="from-date">From Date <span className="text-danger" >*</span></Label>
                  <input className="form-control" type="date" id="from-date" min={this.state.minStartDate}
                    max={this.state.maxStartDate} name="activityFromDate"
                    value={this.state.ActivityInformation.activityFromDate}
                    onChange={this.handleChange} onKeyPress={this.disableKeyPress} />
                  <span className="text-danger">{this.state.activityFromDateAIV}</span>
                </div>
              </Col>
              <Col lg={6}>
                <div className="form-group row">
                  <Label for="to-date">To Date <span className="text-danger" >*</span></Label>
                  <input className="form-control" type="date" id="to-date"
                    name="activityToDate" min={this.state.minEndDate} max={this.state.maxEndDate}
                    value={this.state.ActivityInformation.activityToDate}
                    onChange={this.handleChange} onKeyPress={this.disableKeyPress} />
                  <span className="text-danger">{this.state.activityToDateAIV}</span>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={6}>
                <div className="form-group">
                  <Label for="start-date">Start Time <span className="text-danger" >*</span></Label>
                  <input className="form-control" type="time" id="start-date" defaultValue="00:00:00"
                    name="activityStartTime"
                    value={this.state.ActivityInformation.activityStartTime}
                    onChange={this.handleChange} onKeyPress={this.disableKeyPress} />
                  <span className="text-danger">{this.state.activityStartTimeAIV}</span>
                </div>
              </Col>
              <Col lg={6}>
                <div className="form-group row">
                  <Label for="end-date">End Time <span className="text-danger" >*</span></Label>
                  <input className="form-control" type="time" id="end-date" defaultValue="00:00:00"
                    name="activityEndTime"
                    value={this.state.ActivityInformation.activityEndTime}
                    onChange={this.handleChange} onKeyPress={this.disableKeyPress} />
                  <span className="text-danger">{this.state.activityEndTimeAIV}</span>
                </div>
              </Col>
            </Row>
            <div className="form-group">
              <Label for="act-tag">Choose Weekday(s) <span className="text-danger" >*</span></Label>
              <MultiChipSelect
                name="activityWeekDays"
                value={this.state.ActivityInformation.activityWeekDays}
                handleMCSChange={this.handleMCSChange} DataList={this.props.WeekDayList} />
              <span className="text-danger">{this.state.activityWeekDaysAIV}</span>
            </div>
            <div className="form-group">
              <Label for="group">Assign Group Set</Label>
              <Autocomplete
                name="activityAssignGroup"
                value={this.state.ActivityInformation.activityAssignGroup}
                DataList={this.props.GroupList}
                ACType='Group Set'
                handleACChange={this.handleACChange} />
            </div>
            <div className="form-group">
              <Label for="group">Groups in Group Set</Label>
              {this.state.groupChipsData.length > 0 ?
                this.state.groupChipsData.map((value, index) => (<Chip id={index} key={index} label={value.Group_Name} />))
                : null}
            </div>
            {/* File Upload Section */}
            <div className="form-group">
              <Label for="group">Upload Program Image <span className="text-danger font-size-10" >* (Approximately 1024px*500px)</span></Label>
              <Dropzone onDrop={acceptedFiles => this.handleAcceptedFiles(acceptedFiles)} accept='image/*'>
                {({ getRootProps, getInputProps }) => (
                  <div className="dropzone">
                    <div
                      className="dz-message needsclick"
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      <h3>Drop files here or click to upload.</h3>
                    </div>
                  </div>
                )}
              </Dropzone>
              <div className="dropzone-previews mt-3" id="file-previews">
                {this.state.ActivityInformation.activityImgUpload.map((f, i) => {
                  return (
                    <Card
                      className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                      key={i + "-file"}
                    >
                      <div className="p-2">
                        <Row className="align-items-center">
                          <Col className="col-auto">
                            <img
                              data-dz-thumbnail=""
                              height="80"
                              className="avatar-sm rounded bg-light"
                              alt={f.name}
                              src={f.preview}
                            />
                          </Col>
                          <Col>
                            <Link
                              to="#"
                              className="text-muted font-weight-bold"
                            >
                              {f.name}
                            </Link>
                            <p className="mb-0">
                              <strong>{f.formattedSize}</strong>
                            </p>
                          </Col>
                        </Row>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </Col>
        </Row>
      </form>
    )

  }
}

export default withRouter(ActivityInformation);