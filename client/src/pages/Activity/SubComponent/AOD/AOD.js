import React, { Component } from "react";
import { 
    Row, 
    Col, 
    Label,
    Input, } from "reactstrap";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ValidationMessage }  from "../../CommonMessage";
import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom';


class AOD extends Component {
    constructor(props) {
        super(props);
        this.handleAcceptedFiles = this.handleAcceptedFiles.bind(this);
        this.state = {
            selectedFiles: [],
            priorityList:[{type:"Low", id:1},{type:"Medium", id:2},{type:"High", id:3}],
            isAODFormValid:false,
            priority:"", priorityError:"",priorityValid:false,
            duration:"", durationError:"",durationValid:false,
            aodTitle:"", aodTitleError:"", aodTitleValid:false,
            description:"", descriptionError:"", descriptionValid:false,
        };
        
    }
    handleAcceptedFiles = files => {
        files.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            formattedSize: this.formatBytes(file.size)
          })
        );
    
        this.setState({ selectedFiles: files });
      };
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
      handlePriorityChange(value){ 
        if(value === 'Low'){value = 1}
        else if (value === 'Medium'){value = 1}
        else if(value === "High"){value = 3}        
        this.setState({priority:value},()=>{this.validatePriorities()})
      }
      validatePriorities(){
        const {priority} = this.state;
        if(priority == undefined || priority === ''){
          this.setState({priorityValid:false,priorityError:'Priority cannot be empty.' });
        }
        else{
          this.setState({priorityValid:true,priorityError:'' });
        }
        this.validateForm();
      }
      handleDurationChange(val){
        this.setState({duration:val},()=>{this.validateDuration()})
      }
      validateDuration(){
        const{duration}= this.state;
        if(duration == undefined || duration === ''){
          this.setState({durationValid:false,durationError:'Duration cannot be empty.' });
        }
        else if (duration > 48){
          this.setState({durationValid:false,durationError:'Duration cannot be greater than 48.' });
         
        }
        else if (duration < 8){
          this.setState({durationValid:false,durationError:'Duration cannot be less than 8.' });         
        }
        else{
          this.setState({durationValid:true,durationError:'' });
        }
        this.validateForm();
      }
      handleAodTitle(val){
        this.setState({aodTitle:val},()=>{this.validateAodTitle()})
      }
      validateAodTitle(){
        const{aodTitle} = this.state;
        if(aodTitle == undefined || aodTitle === ''){
          this.setState({aodTitleValid:false,aodTitleError:'AOD Title cannot be empty.' });
        }
        else if(aodTitle.length > 30){
          this.setState({aodTitleValid:false,aodTitleError:'AOD Title cannot greater than 30 characters.' });
        }
        else{
          this.setState({aodTitleValid:true,aodTitleError:'' });
        }
        this.validateForm()
      }
      handleDescription(event){
        this.state.description =  JSON.stringify(event)
        this.validateDescription()
      }
      validateDescription(){
        const{description} = this.state
        if(JSON.parse(description).blocks[0].text == undefined || JSON.parse(description).blocks[0].text ==''){
          this.setState({descriptionValid:false, descriptionError:'Description cannot be empty.'})
        }
        else if(JSON.parse(description).blocks[0].text.length >500){
          this.setState({descriptionValid:false, descriptionError:'Description cannot be greater than 500 charecter.'})
      }
        else{
          this.setState({descriptionValid:true, descriptionError:''})
        }
        this.validateForm()
      }
      validateForm(){
        const{priorityValid, durationValid, aodTitleValid, descriptionValid} = this.state
        this.isAODFormValid = priorityValid && priorityValid && aodTitleValid && descriptionValid
        let data = JSON.parse(JSON.stringify(this.props.createAOD))
                 
          data.aodIsValid = this.isAODFormValid;
          data.aodData = {
            activityName:"",
            startDate:"",
            startTIme:"",
            activityType:"", 
            aodDesc: this.state.description,
            duration:this.state.duration,
            aodTitle:this.state.aodTitle,
            priority:this.state.priority
          }
         
                
        this.props.updateTableData('UPDATE_CREATE_AOD_FORM_DATA', data)
        console.log(this.props.createAOD)
      }
    render() {
        const { selectedGroup } = this.state;
        return (
            <Row>
                  <Col lg={6}>
                    <div className="form-group">
                      <Label for="act-name">Activity Name <span className="text-danger" >*</span></Label>
                      <Input type="text" 
                      id="act-name" 
                      placeholder="Activity Name" 
                      disabled 
                      name="AODActivityName" 
                     // value={this.state.AODActivityForm.AODActivityName}
                      onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                      <Label for="act-type">Activity Type <span className="text-danger" >*</span></Label>
                      <Input type="text" 
                      id="act-type" 
                      placeholder="Activity Type" 
                      disabled 
                      name="AODActivityType" 
                      //value={this.state.AODActivityForm.AODActivityType}
                      onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                      <Label for="aod-title">AOD Title<span className="text-danger" >*</span></Label>
                      <Input type="text" 
                      id="aod-title" 
                      placeholder="Enter AOD Title" 
                      name="AODActivityTitle" 
                      value={this.state.aodTitle}
                      onBlur={()=>{this.validateAodTitle()}}
                      onChange={(e)=>{this.handleAodTitle(e.target.value)}}/>
                      <ValidationMessage valid={this.state.aodTitleValid} message={this.state.aodTitleError}/>

                    </div>
                    <div className="form-group mb-3">
                      <Label for="act-dec">Description <span className="text-danger" >*</span></Label>
                      <Editor
                        name="AODActivityDescription"                         
                        onChange={(event)=>{this.handleDescription(event)}} 
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
                      onBlur={()=>{this.validateDescription()}}
                      />
                     <ValidationMessage valid={this.state.descriptionValid} message={this.state.descriptionError}/>

                    </div>
                  </Col>
                  <Col lg={6}>
                    <Row>
                      <Col lg={6}>
                        <div className="form-group">
                          <Label for="to-date">Start Date <span className="text-danger" >*</span></Label>
                          <input className="form-control" type="date" id="to-date" 
                           name="AODActivityStartDate" 
                          // value={this.state.AODActivityForm.AODActivityStartDate}
                           onChange={this.handleChange}
                           disabled />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="form-group">
                          <Label for="start-time">Start Time <span className="text-danger" >*</span></Label>
                          <input className="form-control" type="time" id="start-time" 
                          defaultValue="00:00:00" 
                          disabled 
                          name="AODActivityStartTime" 
                           //value={this.state.AODActivityForm.AODActivityStartTime}
                           onChange={this.handleChange}/>
                        </div>
                      </Col>
                    </Row>
                    <div className="form-group">
                      <Label for="aod-duration">Duration (in Hours)<span className="text-danger" >*</span></Label>
                      <input className="form-control" type="number" 
                        min="10" max="48"
                      id="aod-duration" 
                      placeholder="Enter Duration" 
                      name="AODActivityDuration" 
                     value={this.state.duration}
                      onChange={(event)=>this.handleDurationChange(event.target.value)}
                      onBlur={()=>{this.validateDuration()}}
                      />
                      <ValidationMessage valid={this.state.durationValid} message={this.state.durationError}/>

                    </div>
                    <div className="form-group">
                      <Label for="act-type">Priority <span className="text-danger">*</span></Label>
                      <Autocomplete 
                                      className="d-block w-100" 
                                      options={this.state.priorityList}
                                       onInputChange={(event, value)=>{this.handlePriorityChange(value)                                      
                                      }}
                                      onBlur={() => this.validatePriorities()}
                                      getOptionLabel={(option) => option.type}
                                      renderInput={(params) => (
                                        <div ref={params.InputProps.ref}>
                                          <input  value={this.state.priority} style={{ width: 200 }} type="text" {...params.inputProps} />
                                        </div>
                                      )}
                                      />
                        <ValidationMessage valid={this.state.priorityValid} message={this.state.priorityError}/>
                    </div>
                  </Col>
                </Row>
        );
    }
}
const mapStatetoProps = state => {
  return {
    createAOD : state.activityReducer.createAOD
  };
};
const dispatchToProps = dispatch => {
  return {
      updateTableData: (type, payload) => {
          dispatch({ type: type, payload: payload })
      }
  }
}
export default withRouter(connect(mapStatetoProps, dispatchToProps)(AOD));
