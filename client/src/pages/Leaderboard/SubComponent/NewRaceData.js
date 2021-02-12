import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import CsvDataDownload from './CSVDataDownload';
import SearchData from './SearchData';
import { ValidationMessage }  from "./CommonMessage";
import {
    Card,
    Row,
    Col,
    CardBody,
    CardHeader,
    Label,
    Input,
} from "reactstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Select from "react-select";
import Dropzone from "react-dropzone";
import MultiChipSelect from "./MultiChipSelect";
import { connect } from "react-redux";

var addReaceList = [];
const optionGroup = [
    {
        label: "Select Distance",
        options: [
            { label: "10K", value: "10K" },
            { label: "20K", value: "20K" },
            { label: "42K", value: "42K" },
            { label: "HM", value: "HM" },
            { label: "FM", value: "FM" },
           
        ]
    }
];

const activityType = [
    { title: 'Run', year: 1994 },
    { title: 'Cycle', year: 1972 },
    { title: 'Gym', year: 1974 },
    { title: 'Yoga', year: 2008 },
    { title: 'Zomba', year: 1957 },
    { title: "Dance", year: 1993 },
  ];


class NewRaceData extends Component {
    constructor(props) {
        super(props);
        this.handleAcceptedFiles = this.handleAcceptedFiles.bind(this);
        this.state = {
            modal_center: false,
            modal_scroll: false,
            customActiveTab: "1",
            selectedGroup: null,
            selectedFiles: [],
            race_title: "",
            race_title_valid: "",
            link_with_activity: "",
            link_activity_valid: "",
            race_description: "",
            race_description_valid: "",
            race_venue: "",
            from_date: "",
            from_date_valid: "",
            duration: "",
            duration_valid: "",
            start_time: "",
            start_time_valid: "",
            distance: "",
            distance_valid: "",
            program_image: "",
            program_image_valid: "",
            duration_checkbox: false,
            error: {},
            stateData: {
                isFromUpdate: false
            }
        };
        this.add_member = this.add_member.bind(this);
        this.tog_scroll = this.tog_scroll.bind(this);
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
    toggleCustom(tab) {
        if (this.state.customActiveTab !== tab) {
            this.setState({
                customActiveTab: tab
            });
        }
    }

    //Race Title *
    handleRaceTitle = (event) => {
        this.setState({race_title: event.target.value}, this.validateRaceTitle)
        //console.log(this.state.race_title);
    }

    validateRaceTitle = () => {
        let error = {...this.state.error}
        if (!this.state.race_title) {
            error.race_title_msg = "Please enter race title";
            this.state.race_title_valid = false;
        } else {
            this.state.race_title_valid = true;
        }
        
        this.setState({error});
    }

    //Link With Activity
    validateLinkWithActivity(value){
        this.setState({
            link_with_activity: value
        }, ()=>{this.handleLinkActivityError()})
    }

    handleLinkActivityError() {
        let error = {...this.state.error}
        if (!this.state.link_with_activity || this.state.link_with_activity === "")  {
            error.link_activity_msg = "Please enter race activity";
            this.state.link_activity_valid = false;
        } else {
            this.state.link_activity_valid  = true;
        }
        
        this.setState({error});
    }

    //Race Description *
    handleRaceDescription = (event) => {
        this.setState({race_description: event.blocks[0].text}, this.validateRaceDescription)
        //console.log(event.blocks[0].text);
    }

    validateRaceDescription = () => {
        let error = {...this.state.error}
        
        if (!this.state.race_description) {
            error.race_description_msg = "Please enter race description";
            this.state.race_description_valid = false;
        } else {
            this.state.race_description_valid  = true;
        }
        
        this.setState({error});
    }

    //Race Venue
    handleRaceVenue = (event) => {
        this.setState({race_venue: event.blocks[0].text}, this.validateRaceDescription)
        //console.log(event.blocks[0].text);
    }

    //from Date
    handleFromDate = (event) => {
        this.setState({from_date: event.target.value}, this.validateFromDate);
        //console.log('from_date', event.target.value);
    };

    validateFromDate = () => {
        let error = {...this.state.error}
        if (!this.state.from_date) {
            error.from_date_msg = "Please select correct date";
            this.state.from_date_valid = false;
        } else {
            this.state.from_date_valid  = true;
        }
        
        this.setState({error});
    }

    disableKeyPress =  (e) => {
        e.preventDefault();
        return false
    }

    //Duration (in hours)
    handleDuration = (event) => {
        this.setState({duration: event.target.value}, this.validateDuration)
        //console.log(event.target.value);
    }

    validateDuration = () => {
        let error = {...this.state.error}
        
        if (this.state.duration <= 0) {
            error.duration_msg = "Please enter valid duration";
            this.state.duration_valid = false;
        } else {
            this.state.duration_valid = true;
        }
        
        this.setState({error});
    }

    //Start Time
    handleStartTime = (event) => {
        this.setState({start_time: event.target.value}, this.validateStartTime);
        //console.log('from_date', event.target.value);
    };

    validateStartTime = () => {
        let error = {...this.state.error}
        
        if (!this.state.start_time) {
            error.start_time_msg = "Please select correct time";
            this.state.start_time_valid = false;
        } else {
            this.state.start_time_valid  = true;
        }
        
        this.setState({error});
    }

    //Distance
    handleDistance = (event) => {
        this.setState({distance: event.value}, this.validateDistance)
        //console.log(event.value);
    }

    validateDistance = () => {
        let error = {...this.state.error}
        
        if (!this.state.distance) {
            error.distance_msg = "Please enter valid race distance";
            this.state.distance_valid = false;
        } else {
            this.state.distance_valid  = true;
        }
        
        this.setState({error});
    }

    //Upload Program Image
    handleAcceptedFiles = files => {
        let error = {...this.state.error}
        let status = false;

        files.map(file => {
            if (file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                    formattedSize: this.formatBytes(file.size)
                });
                this.setState({ selectedFiles: files });
            } else {
                status = true;
            }
        });

        if (status) {
            this.state.program_image_valid = false;
            error.program_image_msg = "Please upload only image file";
        } else {
            this.state.program_image_valid = true;
        }

        this.setState({error});
    };

    //checkbox-non-editable
    durationCheckbox = (event) => {
        if (event.target.checked) {
            this.setState({duration_checkbox: true});
        } else {
            this.setState({duration_checkbox: false});
        }
    }

    changeCheckBoxValue(){
        if (this.state.duration_checkbox === false){ 
            this.setState({duration_checkbox: true});
        } else {
        this.setState({duration_checkbox: false});
        }
    }
    /**
     * Formats the size
     */
    formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    };
     submitNewRaceForm = (evt) =>{
      evt.preventDefault()
  
      this.validateRaceTitle();
      let Activities = this.props.selectedActivities   
     
  
      // if(Email === "" && Phone === ""){
      //   setNoInput(<p style={{ color: 'red' }}>Please Enter EmailId or Mobile No</p>)
      // }
      // else{
      //   setNoInput("")
      //   if(Email !== ""){
      //     validateEmailId(Email)
      //   }
      //   if(Phone !== ""){
      //     validateMobileNo(Phone)
      //   }
      //   if(validateEmail === true || validatePhone === true){
      //     const data = {
      //       Name : Name,
      //       Email: Email,
      //       Phone: Phone,
      //       Message: Message
           
      //     }
      //     let Url = postUserQuery //"http://localhost:4001/api/user/postUserQuery"
  
      //     axios.post(Url, data).then(Response => {
            
      //       if (Response.data.message === "SUCCESS") {
      //           console.log("SUCCESS");
      //           setCommonMsg(<p style={{ color: 'green' }}>Message sent successfully</p>)
      //       }
      //       else {
      //           console.log("FAIL");
      //           setCommonMsg(<p style={{ color: 'red' }}>Error in message sent</p>)
      //       }
      //   }).catch(error => { console.log(error) })
      //   }
      // }
    }
    render() {
        const { selectedGroup } = this.state;
        return (
            <React.Fragment>
                  <form className="contact-form-style" onSubmit={this.submitNewRaceForm}>
                <div className="container-fluid">
                    <Row className="align-items-center">
                        <Col sm={6}>
                            <div className="page-title-box">
                                <ol className="breadcrumb mb-0">
                                    <li className="breadcrumb-item">
                                        <Link to="/race">Race List</Link>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        Add Race
                                    </li>
                                </ol>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={12} className="text-right mb-4">
                            <Link to="/race">
                                <span role="button" className="btn update-btn font ml-3">
                                    Back
                                </span>
                            </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={12}>
                            <Card className="inner-card">
                                <CardHeader className="bl-bg">
                                    <b className="text-white">Add Race</b>
                                    <span className="float-right">
                                        <SearchData searchAnything={this.searchAnything}></SearchData>
                                        <CsvDataDownload AddRaceListToDownload={addReaceList} />
                                    </span>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col lg={6}>
                                            <div className="form-group">
                                                <Label for="act-name">Race Title <span className="text-danger" >*</span></Label>
                                                <Input type="text" id="race-title"
                                                    placeholder="Enter Race Title"
                                                    onChange = {this.handleRaceTitle}
                                                    value = {this.state.race_title}
                                                    onBlur = {this.validateRaceTitle}
                                                />
                                                <ValidationMessage valid={this.state.race_title_valid} message={this.state.error.race_title_msg} />
                                            </div>
                                            <div className="form-group">
                                                <Label for="act-name">Link With Activity Name <span className="text-danger" >*</span></Label>
                                                {/* <Autocomplete 
                                                    className="d-block w-100" 
                                                    options={activityType}
                                                    onInputChange={(event, value)=>this.validateLinkWithActivity(value)}
                                                    onBlur = {()=>{this.validateLinkWithActivity()}}
                                                    getOptionLabel={(option) => option.title}
                                                    renderInput={(params) => (
                                                <div ref={params.InputProps.ref}>
                                                <input  value={this.state.link_with_activity} style={{ width: 200 }} type="text" {...params.inputProps} />
                                                </div>
                                      )}
                                      /> */}
                                         <MultiChipSelect />
                                                 <ValidationMessage valid={this.state.link_activity_valid} message={this.state.error.link_activity_msg} />
                                            </div> 
                                            <div className="form-group mb-3">
                                                <Label for="act-dec">Race Description <span className="text-danger" >*</span></Label>
                                                <Editor
                                                    toolbarClassName="toolbarClassName"
                                                    wrapperClassName="wrapperClassName"
                                                    editorClassName="editorClassName"
                                                    onChange = {this.handleRaceDescription}
                                                    value = {this.state.race_description}
                                                    onBlur = {this.validateRaceDescription}
                                                    toolbar={{
                                                        inline: { inDropdown: true },
                                                        list: { inDropdown: true },
                                                        textAlign: { inDropdown: true },
                                                        link: { inDropdown: false },
                                                        emoji: { inDropdown: false },
                                                    }}
                                                />
                                                <ValidationMessage valid={this.state.race_description_valid} message={this.state.error.race_description_msg} />
                                            </div>
                                            <div className="form-group mb-3">
                                                <Label for="act-adddec">Race Venue</Label>
                                                <Editor
                                                    toolbarClassName="toolbarClassName"
                                                    wrapperClassName="wrapperClassName"
                                                    editorClassName="editorClassName"
                                                    value={this.state.race_venue}
                                                    onChange={this.handleRaceVenue}
                                                    toolbar={{
                                                        inline: { inDropdown: true },
                                                        list: { inDropdown: true },
                                                        textAlign: { inDropdown: true },
                                                        link: { inDropdown: false },
                                                        emoji: { inDropdown: false },
                                                    }}
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <Row>
                                                <Col lg={6}>
                                                    <div className="form-group">
                                                        <Label for="act-name">From Date <span className="text-danger" >*</span></Label>
                                                        <input className="form-control" type="date" id="from-date" name="RaceDate"
                                                                onChange={this.handleFromDate}
                                                                onBlur={this.validateFromDate}
                                                                onKeyPress={this.disableKeyPress}
                                                                value={this.state.from_date}
                                                                min={(new Date()).toISOString().split('T')[0]}
                                                        />
                                                        <ValidationMessage valid={this.state.from_date_valid} message={this.state.error.from_date_msg} />
                                                    </div>
                                                </Col>
                                                <Col lg={6}>
                                                    <div className="form-group">
                                                        <Label for="race-duration">Duration (in hours) <span className="text-danger" >*</span></Label>
                                                        <Input type="number" id="race-duration"
                                                            placeholder="Enter Duration"
                                                            onChange={this.handleDuration}
                                                            onBlur={this.validateDuration}
                                                            value={this.state.duration}
                                                            min="0"
                                                        />
                                                        <ValidationMessage valid={this.state.duration_valid} message={this.state.error.duration_msg} />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg={6}>
                                                    <div className="form-group">
                                                        <Label for="race-time">Start Time <span className="text-danger" >*</span></Label>
                                                        <input className="form-control" type="time" id="race-time"
                                                            name="RaceTime"
                                                            onChange={this.handleStartTime}
                                                            onBlur={this.validateStartTime}
                                                            onKeyPress={this.disableKeyPress}
                                                            value={this.state.start_time}
                                                            
                                                        />
                                                        <ValidationMessage valid={this.state.start_time_valid} message={this.state.error.start_time_msg} />
                                                    </div>
                                                </Col>
                                                <Col lg={6}>
                                                    <div className="form-group">
                                                        <Label for="race-distance">Distance <span className="text-danger" >*</span></Label>
                                                        <Select
                                                            options={optionGroup}
                                                            onChange = {this.handleDistance}
                                                            selected = {this.state.distance}
                                                            onBlur = {this.validateDistance}
                                                        />
                                                         <ValidationMessage valid={this.state.distance_valid} message={this.state.error.distance_msg} />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg={12}>
                                                    {/* File Upload Section */}
                                                    <div className="form-group">
                                                        <Label for="group">Upload Program Image <span className="text-danger font-size-10" >* (Approximately 1024px*500px)</span></Label>
                                                        <Dropzone onDrop={acceptedFiles => this.handleAcceptedFiles(acceptedFiles)}>
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
                                                        <ValidationMessage valid={this.state.program_image_valid} message={this.state.error.program_image_msg} />
                                                        <div className="dropzone-previews mt-3" id="file-previews">
                                                            {this.state.selectedFiles.map((f, i) => {
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
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Col lg={12}>
                        <Checkbox
                            name = "act-name"
                            defaultChecked
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                            onChange={this.durationCheckbox}
                            checked ={this.state.duration_checkbox}
                        />
                        <Label htmlFor="act-name" onClick={()=>{this.changeCheckBoxValue()}}>Auto non-editable duration (15 days from end of the race)</Label>
                    </Col>
                    <Col lg={12}>
                        <div className="form-group row">
                            <button className="btn update-btn font" type="submit" >
                                Submit
                            </button>
                        </div>
                    </Col>
                </div>
                </form>
            </React.Fragment>
        )
    }
}
const mapStatetoProps = state => { 
  return { 
     
      selectedActivities : state.selectedActivity !=undefined ? state.selectedActivity.activities :null,
      
  };
  };
  const dispatchToProps = dispatch => {
  return {
    updateTableData: (type, payload) => {
      dispatch({ type: type, payload: payload })
    }
  }
  }
  
  export default withRouter(connect(mapStatetoProps, dispatchToProps)(NewRaceData));
  
