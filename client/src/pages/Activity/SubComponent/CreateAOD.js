import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import {
  Card,
  Row,
  Col,
  CardBody,
  CardHeader,
  Label,
  Input,
} from "reactstrap";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import AOD from "../SubComponent/AOD/AOD";
import ReminderAOD from "../SubComponent/AOD/ReminderAOD";
import AODPic from "../SubComponent/AOD/AODPic";
import Select from "react-select";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { connect } from "react-redux";
import { ValidationMessage }  from "../CommonMessage";
// import {insertCreateAOD} from'./../../../AppConfig' 
import AppService from'../../../AppService'
import SweetAlert from "react-bootstrap-sweetalert";

const appService = new AppService();
const optionGroup = [
    {
      options: [
        { label: "Mustard", value: "Mustard" },
        { label: "Ketchup", value: "Ketchup" },
        { label: "Relish", value: "Relish" }
      ]
    }
  ];

class activityList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGroup: null,
      activateOptions:true,
      AODActivityForm: {
        AODActivityTemplateName: "",
        ShowSuccessMessage: "",
        isFromUpdate: false
      },
      isFormValid:false,
      imageAllowToGiveFeedback:false,
      imageIsActive:true,
      aodTempletName:"", aodTempletNameError:"", aodTempletNameValid:false,
      feedBackTemplet:"", feedBackTempletError:"", feedBackTempletValid:true,
      success_msg:false,
      fail_msg:false,
      alertBoxData:"",
    }
    this.handleSelectGroup = this.handleSelectGroup.bind(this);

  }//constructor end

  //Select
  handleSelectGroup = selectedGroup => {
      this.setState({ selectedGroup });
  };
  validate = () => {

  }
  handleAllowToGiveFeedback(val){    
    this.setState({imageAllowToGiveFeedback:val});
  }
  handleActiveChange(val){
    this.setState({imageIsActive:val});
  }
  componentDidUpdate(prevProps, prevState)
  {
    if(prevProps.createAOD !== this.props.createAOD)
    {      
      let k = !(this.props.createAOD.aodIsValid && this.props.createAOD.reminderAODIsValid)
      this.setState({activateOptions:k})
    }

  }
  handleTempletrName(val){
this.setState({aodTempletName:val},()=>{this.validateTempletName()})
  }
  validateTempletName(){
    const{aodTempletName} =this.state
    if(aodTempletName == undefined || aodTempletName === '')
    {
      this.setState({aodTempletNameValid:false, aodTempletNameError:"Templet Name cannot be empty."})
    }
    else if(aodTempletName.length>30)
    {
      this.setState({aodTempletNameValid:false, aodTempletNameError:"Templet Name cannot be greater than 30."})

    }
    else{
      this.setState({aodTempletNameValid:true, aodTempletNameError:""})

    }
    this.validateForm()
  }
  handleFeedbackTemplet(e){   
    this.setState({feedBackTemplet:e})
  }
  validateForm(){
    const{aodTempletNameValid, activateOptions} =this.state
    this.state.isFormValid = aodTempletNameValid && !activateOptions
    //this.setState({isFormValid:aodTempletNameValid && !activateOptions})
  }
  addNewMember(){
    let data = this.props.createAOD;
   // let url = insertCreateAOD;
   let url=null
    var d = new Date();
    var n = d.getHours()+':'+d.getMinutes()
    let dataTOInsert = {
      activityID: 1,
      activityScheduleID:1,
      AODTypeID:1,
      AODStartDate:'2020-2-2',
      AODEndDate:'2020-2-2',
      startTime:n,
      endTime:n,
      aodTitle:data.aodData.aodTitle,
      AODDesc:data.aodData.aodDesc,
      duration:data.aodData.duration,
      priorityID:data.aodData.priority,
      reminderActivityTempletID:1,
      reminderID:1,
      reminderDesc:data.reminderAODData.Description,
      feedbackTempletID:1,
      scheduledBeforeID:data.reminderAODData.scheduledBeforeValue,
      imagePath:'test path',
      scheduledBeforeFlag:data.reminderAODData.scheduleBeforeCheckbox,
      allowedFeedbackFlag:this.state.imageAllowToGiveFeedback,
      archiveFlag:this.state.imageIsActive,
      userID:1      
      }

      appService.GetDataFromApiPost(url, dataTOInsert)
      .then(response=>{
        if(response !==null){
        if(response.status == 200){
          this.state.alertBoxData = "AOD Created."
          this.setState({success_msg:true})      
          }
        }
        else{
          this.showErrorMessage();
        }
      });
  }
  showErrorMessage(){
    this.state.alertBoxData = "Some error occured."
    this.setState({fail_msg:false})
  }
  closeAlertBox(){         
    this.setState({success_msg:false})
    this.setState({alertBoxData:""})       
    this.setState({fail_msg:false})
  }
  render() {
    const { selectedGroup } = this.state;
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

        <Row>
          <Col sm={12}>
            <Card className="inner-card">
              <CardHeader className="bl-bg">
                <Link to="#" className="text-white">
                  <b>Activity Of The Day</b>
                </Link>
              </CardHeader>
              <CardBody>
                <AOD />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Card className="inner-card">
              <CardHeader className="bl-bg">
                <Link to="#" className="text-white">
                  <b>Reminder Activity</b>
                </Link>
              </CardHeader>
              <CardBody>
                <ReminderAOD />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Card className="inner-card">
              <CardHeader className="bl-bg">
                <Link to="#" className="text-white">
                  <b>AOD Images</b>
                </Link>
              </CardHeader>
              <CardBody>
                <AODPic />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <Col lg={12}>
              <div className="form-group mb-0">
                <FormControlLabel
                  value="personalBest"
                  control={<Checkbox color="primary" />}
                  label="Active"
                  checked={this.state.imageIsActive}
                  disabled={this.state.activateOptions}
                  onChange={(event)=>{this.handleActiveChange(event.target.checked)}}
                />
                <FormControlLabel
                  value="firstRun"
                  control={<Checkbox color="primary" />}
                  label="Allow to give feedback"
                  checked={this.state.imageAllowToGiveFeedback}
                  disabled={this.state.activateOptions}
                  onChange={(event)=>{this.handleAllowToGiveFeedback(event.target.checked)}}
                  onBlur={()=>{this.validateTempletName()}}
                />
              </div>
              {this.state.imageAllowToGiveFeedback===true?
              <div className="form-group">
              <Label for="fed-temp">Choose Feedback Template</Label>
              <Select
                value={this.state.feedBackTemplet}               
                options={optionGroup}
                onChange={(event)=>{this.handleFeedbackTemplet(event)}}
              />
            </div>
              :null}
              
              <div className="form-group">
                <Label for="aod-temp-name">AOD Template Name <span className="text-danger" >*</span></Label>
                <Input type="text" id="aod-temp-name"
                  placeholder="Enter AOD template name"
                  name="AODActivityTemplateName"
                  value={this.stateaodTempletName}
                  onChange={(event)=>{this.handleTempletrName(event.target.value)}} />
              <ValidationMessage valid={this.state.aodTempletNameValid} message={this.state.aodTempletNameError}/>

              </div>
              <Row>
                <Col sm={6}>
                  <div className="form-group">
                    <button className="btn btn-block update-btn font" onClick={() => this.addNewMember()}>
                      Save As Template
                              </button>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="form-group">
                    <button disabled={!this.state.isFormValid} className="btn btn-block update-btn font" onClick={() => this.addNewMember()}>
                      Submit
                    </button>
                  </div>
                </Col>
              </Row>
            </Col>
          </Col>
        </Row>
      </React.Fragment>
    )
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
export default withRouter(connect(mapStatetoProps, dispatchToProps)(activityList));