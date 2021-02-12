import React, { Component } from "react";
import {
    Row,
    Col,
    Label,
    Input,
    Card,
    CardBody,
    CardHeader,
    Modal
} from "reactstrap";
import { Link } from "react-router-dom";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Editor } from "react-draft-wysiwyg";
import Select from "react-select";
import DataTable, { createTheme } from 'react-data-table-component';
import SearchData from '../../SubComponent/SearchData';
import { ValidationMessage }  from "../../CommonMessage";
import { connect } from "react-redux";
import { withRouter} from 'react-router-dom';

const UsersActvitiesData = [
    {
        id: 1,
        AODsTemplates: 'AODs Template 1',
       
    },
    {
        id: 2,
        AODsTemplates: 'AODs Template 2',
        
    },
    {
        id: 3,
        AODsTemplates: 'AODs Template 3',
        
    },
    {
        id: 4,
        AODsTemplates: 'AODs Template 4',
       
    },
    {
        id: 5,
        AODsTemplates: 'AODs Template 5',
       
    }
];
const headerStyle = {
   
    headCells: {
        style: {
            backgroundColor: "#EDECEC",
        },
    },
};
const columns = [
    {
        name: 'AODs Templates Name',
        selector: 'AODsTemplates',
        sortable: true,
        wrap: true
    },
    
];
const optionGroup = [
    {
        options: [
            { label: "Mustard", value: "Mustard" },
            { label: "Ketchup", value: "Ketchup" },
            { label: "Relish", value: "Relish" }
        ]
    }
];


class ReminderAOD extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPreviousSectionFilled : true,
            duration_checkbox: false,
            selectedGroup: null,
            modal_center: false,
            modal_scroll: false,
            isFormValid:false,
            reminderActivityTitle:"", reminderActivityTitleError:"",reminderActivityTitleValid:false,
            description:"", descriptionError:"", descriptionValid:false,
            scheduledBeforeValue:10, scheduledBeforeValueError:"",scheduledBeforeValueValid:true,
            scheduledBeforeChecked:true,
            reminderAllowToGiveFeedback:false,
        };
        this.handleSelectGroup = this.handleSelectGroup.bind(this);
        // Modal Popup
        this.add_member = this.add_member.bind(this);
        this.tog_scroll = this.tog_scroll.bind(this);
        
    }
    //Select
    handleSelectGroup = selectedGroup => {
        this.setState({ selectedGroup });
    };
    // Modal
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
    componentDidUpdate(prevProps, prevState){
        if(prevProps.createAOD.aodIsValid!=this.props.createAOD.aodIsValid){
            this.setState({isPreviousSectionFilled:!this.props.createAOD.aodIsValid})
        }
    }
    handlereminderTitleChange(val){
        this.setState({reminderActivityTitle:val},()=>{this.validateReminderTitle()});
    }
    validateReminderTitle(){
        const{reminderActivityTitle}=this.state
        if(reminderActivityTitle == undefined || reminderActivityTitle ==''){
            this.setState({reminderActivityTitleValid:false, reminderActivityTitleError:'Reminder title cannot be empty'});
        }
        else if(reminderActivityTitle.length >30){
            this.setState({reminderActivityTitleValid:false, reminderActivityTitleError:'Reminder title cannot be greater than 30 charecter'});
        }
        else{
            this.setState({reminderActivityTitleValid:true, reminderActivityTitleError:''});

        }
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
      handleScheduleBeforeValueChange(val){
          this.setState({scheduledBeforeValue:val},()=>{this.validateScheduleBeforeValue()});
      }
      validateScheduleBeforeValue(){
          const{scheduledBeforeValue} = this.state
          if(scheduledBeforeValue == undefined || scheduledBeforeValue == ''){
              this.setState({scheduledBeforeValueValid:false, scheduledBeforeValueError:'Schedule cannot be empty.'});
          }
          else if(scheduledBeforeValue > 48){
            this.setState({scheduledBeforeValueValid:false, scheduledBeforeValueError:'Schedule cannot cannot be greater than 48.'});

          }
          else if(scheduledBeforeValue < 10){
            this.setState({scheduledBeforeValueValid:false, scheduledBeforeValueError:'Schedule cannot cannot be lesser than 10.'});

          }
          else{
            this.setState({scheduledBeforeValueValid:true, scheduledBeforeValueError:''});

          }
          this.validateForm()
      }
      handleScheduledBeforeCheck(e){
        this.setState({scheduledBeforeChecked:e}, ()=>{this.validateForm()})
      }
      handleAllowToGiveFeedBack(e){
          this.setState({reminderAllowToGiveFeedback:e}, ()=>{this.validateForm()})
      }
    validateForm(){
        const{reminderActivityTitleValid, descriptionValid, scheduledBeforeValueValid} = this.state
        this.isFormValid = reminderActivityTitleValid && descriptionValid && scheduledBeforeValueValid
        let data = JSON.parse(JSON.stringify(this.props.createAOD))
        data.reminderAODIsValid = this.isFormValid
        data.reminderAODData = {
                reminderActivityTitle: this.state.reminderActivityTitle,
                Description:this.state.description,
                scheduleBeforeCheckbox:this.state.scheduledBeforeChecked,
                scheduledBeforeValue: this.state.scheduledBeforeValue,
                reminderAllowToFeedback: this.state.reminderAllowToGiveFeedback
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
                        <Label for="mail-sub">Reminder Activity Title <span className="text-danger" >*</span></Label>
                        <Input type="text" id="mail-sub"
                            disabled={this.state.isPreviousSectionFilled}
                            placeholder="Enter Mail Subject"
                            name="MailSubject"
                            value={this.state.reminderActivityTitle}
                            onChange={(event)=>{this.handlereminderTitleChange(event.target.value)}}
                            onBlur={()=>{this.validateReminderTitle()}}
                        />
                <ValidationMessage valid={this.state.reminderActivityTitleValid} message={this.state.reminderActivityTitleError}/>
                    </div>
                    <div className="form-group">
                        <Label for="act-dec" className="d-block w-100">
                            Description <span className="text-danger" >*</span>
                            <Link className="float-right"
                            onClick={this.add_member}
                            data-toggle="modal"
                            data-target=".bs-example-modal-center"

                            >
                                Select Template
                            </Link>
                            <Modal
                        isOpen={this.state.modal_center}
                        toggle={this.add_member}
                    >
                        <div className="modal-header">
                            <h5 className="modal-title mt-0">AOD's Template</h5>
                            <button
                                type="button"
                                onClick={() =>
                                    this.setState({ modal_center: false })
                                }
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Card className="mini-stat text-white">
                                <CardHeader className="bl-bg">
                                    <b>AOD's Template List</b>
                                    {/* Search and CSV Download */}
                                    <span className="float-right">
                                        <SearchData searchAnything={this.searchAnything}></SearchData>
                                    </span>
                                </CardHeader>
                                <CardBody>
                                    <DataTable
                                        className="data-table"
                                        columns={columns}
                                        data={UsersActvitiesData}
                                        noHeader={true}
                                        customStyles={headerStyle}
                                        fixedHeader
                                        fixedHeaderScrollHeight="300px"
                                        pagination
                                        selectableRows
                                    />
                                    <button className="btn btn-block update-btn font mt-3">
                                        Select AOD Template
                                  </button>
                                </CardBody>
                            </Card>
                        </div>
                    </Modal>
                        </Label>
                        <Editor
                            readOnly={this.state.isPreviousSectionFilled}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onChange={(event)=>{this.handleDescription(event)}}
                            onBlur={()=>{this.validateDescription()}}
                            toolbar={{
                                inline: { inDropdown: true },
                                list: { inDropdown: true },
                                textAlign: { inDropdown: true },
                                link: { inDropdown: false },
                                emoji: { inDropdown: false },
                            }}
                        />
                <ValidationMessage valid={this.state.descriptionValid} message={this.state.descriptionError}/>
                </div>
                </Col>
                <Col lg={6}>
                    <div className="form-group">
                        <FormControlLabel
                        disabled={this.state.isPreviousSectionFilled}
                            value="SchedBefore"
                            control={<Checkbox color="primary" />}
                            label="Schedule Before"
                            checked={this.state.scheduledBeforeChecked}
                            onChange={(event)=>{this.handleScheduledBeforeCheck(event.target.checked)}}
                        />
                       <input className="form-control" type="number" 
                       disabled={this.state.isPreviousSectionFilled}
                        min="10" max="48"
                        id="aod-duration" 
                        placeholder="Enter Duration" 
                        name="AODActivityDuration" 
                        value={this.state.scheduledBeforeValue}
                        onChange={(event)=>this.handleScheduleBeforeValueChange(event.target.value)}
                        onBlur={()=>{this.validateScheduleBeforeValue()}}
                      />
                     <ValidationMessage valid={this.state.scheduledBeforeValueValid} message={this.state.scheduledBeforeValueError}/>

                        {/* <FormControlLabel
                        disabled={this.state.isPreviousSectionFilled}
                            value="AODFeedback"
                            control={<Checkbox color="primary" />}
                            label="Allow to give feedback"
                            checked={this.state.reminderAllowToGiveFeedback}
                            onChange={(event)=>{this.handleAllowToGiveFeedBack(event.target.checked)}}
                        /> will use later */}
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
export default withRouter(connect(mapStatetoProps, dispatchToProps) (ReminderAOD));
