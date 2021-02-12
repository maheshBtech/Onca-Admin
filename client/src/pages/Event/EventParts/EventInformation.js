import React, { Component } from 'react';
import { withRouter, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Row, Col, Input, Label } from "reactstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import MultiChipSelect from "../MultiChipSelect";
import Autocomplete from "../Autocomplete";
import Dropzone from "react-dropzone";
import { AllValidate } from '../EventModel';
import { EditorState } from 'draft-js';

let localValidate = {
  EventNameAIVTemp: false, EventTypeAIVTemp: false, //EventTagAIVTemp: false,
  EventDescriptionAIVTemp: false, EventFromDateAIVTemp: false, EventToDateAIVTemp: false,
  EventStartTimeAIVTemp: false, EventEndTimeAIVTemp: false, //EventWeekDaysAIVTemp: false, 
  EventAddDescAIVTemp: true
}

class EventInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switch1: true,
      //groupChipsData: [],
      EventInformation: { ...this.props.EventInformation },
      ...AllValidate.AIValidate,
      minStartDate: '',
      maxStartDate: '',
      minEndDate: '',
      maxEndDate: '',
    };

    this.handleChange = this.handleChange.bind(this)
    this.handleACChange = this.handleACChange.bind(this)
    this.onEventDescStateChange = this.onEventDescStateChange.bind(this)
    this.onEventAddDescStateChange = this.onEventAddDescStateChange.bind(this)
    //this.handleMCSChange = this.handleMCSChange.bind(this)
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
    if (prevProps.EventInformation !== this.props.EventInformation) {
      this.setState({ EventInformation: this.props.EventInformation })
    }
    if (prevState.EventInformation !== this.state.EventInformation) {
      this.props.handleEventInformation(this.state.EventInformation)
    }
    if (prevProps.TriggrtVaidation !== this.props.TriggrtVaidation) {
      this.validateFunction()
    }
  }
  // validation function
  validateFunction = () => {
    // Validate Event Name
    if (this.state.EventInformation.EventName === '') {
      this.setState({ EventNameAIV: 'Please Enter Event Name' })
      localValidate.EventNameAIVTemp = false
    }
    else {
      this.setState({ EventNameAIV: "" })
      localValidate.EventNameAIVTemp = true
    }
    // Validate Event Type
    if (this.state.EventInformation.EventType === 0) {
      this.setState({ EventTypeAIV: 'Please Enter Event Type' })
      localValidate.EventTypeAIVTemp = false
    }
    else {
      this.setState({ EventTypeAIV: "" })
      localValidate.EventTypeAIVTemp = true
    }
    // Validate Event Description
    if (this.state.EventInformation.EventDescription.getCurrentContent().getPlainText().length === 0) {
      this.setState({ EventDescriptionAIV: 'Please Enter Event Description' })
      localValidate.EventDescriptionAIVTemp = false
    }
    else {
      this.setState({ EventDescriptionAIV: "" })
      localValidate.EventDescriptionAIVTemp = true
    }
    // Validate from date
    if (this.state.EventInformation.EventFromDate === '') {
      this.setState({ EventFromDateAIV: 'Please Enter From Date' })
      localValidate.EventFromDateAIVTemp = false
    }
    else {
      this.setState({ EventFromDateAIV: "" })
      localValidate.EventFromDateAIVTemp = true
    }
    // Validate to date
    if (this.state.EventInformation.EventToDate === '') {
      this.setState({ EventToDateAIV: 'Please Enter To Date' })
      localValidate.EventToDateAIVTemp = false
    }
    else {
      this.setState({ EventToDateAIV: "" })
      localValidate.EventToDateAIVTemp = true
    }
    // Validate start time
    if (this.state.EventInformation.EventStartTime === '') {
      this.setState({ EventStartTimeAIV: 'Please Enter Start Time' })
      localValidate.EventStartTimeAIVTemp = false
    }
    else {
      this.setState({ EventStartTimeAIV: "" })
      localValidate.EventStartTimeAIVTemp = true
    }
    // Validate end time
    if (this.state.EventInformation.EventEndTime === '') {
      this.setState({ EventEndTimeAIV: 'Please Enter End Time' })
      localValidate.EventEndTimeAIVTemp = false
    }
    else {
      this.setState({ EventEndTimeAIV: "" })
      localValidate.EventEndTimeAIVTemp = true
    }
    // final validate
    if (localValidate.EventNameAIVTemp === false || localValidate.EventTypeAIVTemp === false || // localValidate.EventTagAIVTemp === false ||
      localValidate.EventDescriptionAIVTemp === false || localValidate.EventFromDateAIVTemp === false || localValidate.EventToDateAIVTemp === false ||
      localValidate.EventStartTimeAIVTemp === false || localValidate.EventEndTimeAIVTemp === false //|| localValidate.EventWeekDaysAIVTemp === false
      || localValidate.EventAddDescAIVTemp == false) {
      this.props.handleAllCompValidation('AI', false)
    }
    else {
      this.props.handleAllCompValidation('AI', true)
    }
  }
  // internal validation - field wise
  internalValidateFunction = (fname, fvalue) => {
    switch (fname) {
      case 'EventName':
        // Validate Event Name
        if (fvalue === '') {
          this.setState({ EventNameAIV: 'Please Enter Event Name' })
          localValidate.EventNameAIVTemp = false
        }
        else {
          this.setState({ EventNameAIV: "" })
          localValidate.EventNameAIVTemp = true
        }
        break;
      case 'EventType':
        // Validate Event Type
        if (fvalue === 0) {
          this.setState({ EventTypeAIV: 'Please Enter Event Type' })
          localValidate.EventTypeAIVTemp = false
        }
        else {
          this.setState({ EventTypeAIV: "" })
          localValidate.EventTypeAIVTemp = true
        }
        break
      case 'EventDescription':
        // Validate Event Description
        if (fvalue.getCurrentContent().getPlainText().length === 0) {
          this.setState({ EventDescriptionAIV: 'Please Enter Event Description' })
          localValidate.EventDescriptionAIVTemp = false
        }
        else {
          this.setState({ EventDescriptionAIV: "" })
          localValidate.EventDescriptionAIVTemp = true
        }
        break
      case 'EventFromDate':
        // Validate from date
        if (fvalue === '') {
          this.setState({ EventFromDateAIV: 'Please Enter From Date' })
          localValidate.EventFromDateAIVTemp = false
        }
        else {
          this.setState({ EventFromDateAIV: "" })
          localValidate.EventFromDateAIVTemp = true
        }
        break;
      case 'EventToDate':
        // Validate to date
        if (fvalue === '') {
          this.setState({ EventToDateAIV: 'Please Enter To Date' })
          localValidate.EventToDateAIVTemp = false
        }
        else {
          this.setState({ EventToDateAIV: "" })
          localValidate.EventToDateAIVTemp = true
        }
        break
      case 'EventStartTime':
        // Validate start time
        if (fvalue === '') {
          this.setState({ EventStartTimeAIV: 'Please Enter Start Time' })
          localValidate.EventStartTimeAIVTemp = false
        }
        else {
          this.setState({ EventStartTimeAIV: "" })
          localValidate.EventStartTimeAIVTemp = true
        }
        break;
      case 'EventEndTime':
        // Validate end time
        if (fvalue === '') {
          this.setState({ EventEndTimeAIV: 'Please Enter End Time' })
          localValidate.EventEndTimeAIVTemp = false
        }
        else {
          this.setState({ EventEndTimeAIV: "" })
          localValidate.EventEndTimeAIVTemp = true
        }
        break
      default:
        break
    }
  }
  // handle Input Change
  handleChange = (event) => {
    let fname = event.target.name;
    let fvalue = event.target.value;
    if (fname === 'EventFromDate') {
      this.setState(prevState => ({
        EventInformation: {
          ...prevState.EventInformation, EventToDate: ''
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
      EventInformation: {
        ...prevState.EventInformation, [fname]: fvalue
      }
    }));
    this.internalValidateFunction(fname, fvalue)
  }
  // key input stop
  disableKeyPress = (e) => {
    e.preventDefault();
    return false
  }
  // handle Event type chnage
  handleACChange = (value, name) => {
    this.setState(prevState => ({
      EventInformation: {
        ...prevState.EventInformation, [name]: value
      }
    }));
    if(name === 'EventType'){
      this.internalValidateFunction(name, value)
    }
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
      EventInformation: {
        ...prevState.EventInformation, EventImgUpload: [...prevState.EventInformation.EventImgUpload, ...files]
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
  // Event Description Editor state change handle 
  onEventDescStateChange = (editorState) => {
    if (editorState.getCurrentContent().getPlainText().length > 750) {
      this.setState({ EventDescriptionAIV: 'Event Description cannot be greater then 750 characters' })
      localValidate.EventDescriptionAIVTemp = false
    }
    else {
      this.setState(prevState => ({
        EventInformation: {
          ...prevState.EventInformation, EventDescription: editorState
        }
      }));
      this.setState({ EventDescriptionAIV: '' })
      localValidate.EventDescriptionAIVTemp = true
    }
    this.internalValidateFunction('EventDescription', editorState)
  };
  
  render() {
    return (
      <form>
        <Row>
          <Col lg={6}>
            <div className="form-group">
              <Label for="act-name">Event Name <span className="text-danger" >*</span></Label>
              <Input type="text" id="act-name" name='EventName'
                placeholder="Enter Event Name"
                value={this.state.EventInformation.EventName}
                onChange={this.handleChange} maxLength="30" />
              <span className="text-danger">{this.state.EventNameAIV}</span>
            </div>
            <div className="form-group">
              <Label for="act-type">Event Type <span className="text-danger" >*</span></Label>
              <Autocomplete
                name="EventType"
                value={this.state.EventInformation.EventType}
                DataList={this.props.EventTypeList}
                ACType='Event Type'
                handleACChange={this.handleACChange} />
              <span className="text-danger">{this.state.EventTypeAIV}</span>
            </div>
            <div className="form-group mb-3">
              <Label for="act-dec">Description <span className="text-danger" >*</span></Label>
              <Editor
                editorState={this.state.EventInformation.EventDescription}
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
                onEditorStateChange={this.onEventDescStateChange} />
              <span className="text-danger">{this.state.EventDescriptionAIV}</span>
            </div>
          </Col>
          <Col lg={6}>
            <Row>
              <Col lg={6}>
                <div className="form-group">
                  <Label for="from-date">From Date <span className="text-danger" >*</span></Label>
                  <input className="form-control" type="date" id="from-date" min={this.state.minStartDate}
                    max={this.state.maxStartDate} name="EventFromDate"
                    value={this.state.EventInformation.EventFromDate}
                    onChange={this.handleChange} onKeyPress={this.disableKeyPress} />
                  <span className="text-danger">{this.state.EventFromDateAIV}</span>
                </div>
              </Col>
              <Col lg={6}>
                <div className="form-group row">
                  <Label for="to-date">To Date <span className="text-danger" >*</span></Label>
                  <input className="form-control" type="date" id="to-date"
                    name="EventToDate" min={this.state.minEndDate} max={this.state.maxEndDate}
                    value={this.state.EventInformation.EventToDate}
                    onChange={this.handleChange} onKeyPress={this.disableKeyPress} />
                  <span className="text-danger">{this.state.EventToDateAIV}</span>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={6}>
                <div className="form-group">
                  <Label for="start-date">Start Time <span className="text-danger" >*</span></Label>
                  <input className="form-control" type="time" id="start-date" defaultValue="00:00:00"
                    name="EventStartTime"
                    value={this.state.EventInformation.EventStartTime}
                    onChange={this.handleChange} onKeyPress={this.disableKeyPress} />
                  <span className="text-danger">{this.state.EventStartTimeAIV}</span>
                </div>
              </Col>
              <Col lg={6}>
                <div className="form-group row">
                  <Label for="end-date">End Time <span className="text-danger" >*</span></Label>
                  <input className="form-control" type="time" id="end-date" defaultValue="00:00:00"
                    name="EventEndTime"
                    value={this.state.EventInformation.EventEndTime}
                    onChange={this.handleChange} onKeyPress={this.disableKeyPress} />
                  <span className="text-danger">{this.state.EventEndTimeAIV}</span>
                </div>
              </Col>
            </Row>
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
                {this.state.EventInformation.EventImgUpload.map((f, i) => {
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

export default withRouter(EventInformation);