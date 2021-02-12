import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import CsvDataDownload from './CSVDataDownload';
import SearchData from './SearchData';
import { ValidationMessage } from "./CommonMessage";
import store from "../../../store";
import { Modal } from "reactstrap";
import { EditorState, convertToRaw, convertFromRaw ,ContentState} from 'draft-js';
import draftToHtml from "draftjs-to-html";
import {  Card,  Row,
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
import { leaderboardAddRace } from '../../../AppConfig'
import AppService from '../../../AppService'
import dateFormat from 'dateformat';
import moment from 'moment';
import htmlToDraft from 'html-to-draftjs';

var addReaceList = [];
const optionGroup = [
    {
        label: "Select Distance",
        options: [
            { label: "10K", value: "1" },
            { label: "20K", value: "2" },
            { label: "42K", value: "3" },
            { label: "HM", value: "4" },
            { label: "FM", value: "5" },

        ]
    }
];



const appService = new AppService()

class NewRace extends Component {
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
            race_title_valid: false,
            link_with_activity: [],
            link_activity_valid: "",
            race_description: '',
            race_description_valid: false,
            race_venue: "",
            race_venue_valid: false,
            from_date: "",
            from_date_valid: false,
            duration: "",
            duration_valid: false,
            start_time: "",
            finalstarttime: "",
            start_time_valid: false,
            distance: "",
            distance_valid: false,
            program_image: "",
            program_image_valid: false,
            duration_checkbox: false,
            error: {},
            stateData: {
                isFromUpdate: false
            },
            showMessagePopup:false,
            alertData:"",
            editorState:EditorState.createEmpty(),
            editorStaterace: EditorState.createEmpty(),
            race_descriptionjson:"",
            race_venuejson:"",
            fitnessDetailID :null,
            DistanceList:""
           
        };
        this.add_member = this.add_member.bind(this);
        this.tog_scroll = this.tog_scroll.bind(this);
        this.DisatnceDropdown();
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
    
    componentDidMount(){

        let updateddata=store.getState().raceData.RaceDetails;
   //   
      if (updateddata != "") {
     
          document.getElementById('race-title').value = updateddata.Fitness_Event_Name
          this.state.fitnessDetailID=updateddata.Fitness_Detail_ID
          this.state.race_title =updateddata.Fitness_Event_Name
          this.state.race_title_valid = true;
          
           if (updateddata.Fitness_Event_Desc) {
            const contentBlock = htmlToDraft(updateddata.Fitness_Event_Desc);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            this.state.editorState = EditorState.createWithContent(contentState);
         
            this.state.race_descriptionjson = updateddata.Fitness_Event_Desc
            // this.state.editorState=EditorState.createWithContent(convertFromRaw(JSON.parse(updateddata.Fitness_Event_Desc)))
            // this.state.race_descriptionjson=updateddata.Fitness_Event_Desc
           
            this.state.race_description_valid = true;            
          } 
          if (updateddata.Fitness_Event_Venue) {
            const contentBlock = htmlToDraft(updateddata.Fitness_Event_Venue);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            this.state.editorStaterace = EditorState.createWithContent(contentState);
            this.state.race_venuejson= updateddata.Fitness_Event_Venue
           
            this.state.race_venue_valid = true;            
          } 

          var localTime =moment(updateddata.From_Date).format('YYYY-MM-DD')
        //    new Date(updateddata.From_Date).toISOString().slice(0,10);
          this.state.from_date =localTime
          this.state.from_date_valid = true;
         

          
          this.state.start_time =updateddata.Start_Time
          this.state.start_time_valid = true;

         
          this.state.duration =updateddata.Duration_In_Hours
          this.state.duration_valid = true;

         let DistanceList=store.getState().LeaderboardResult.distancelist
          this.state.distance = DistanceList.filter(item => item.Distance_Option_ID === updateddata.Distance_Option_ID)[0]
   
        }


     
    }
     componentDidUpdate(prevProps, prevState){
       if(prevProps.successmessage !==""  && prevProps.successmessage !==undefined){
           this.state.alertData = this.props.successmessage
           this.state.showMessagePopup =true
       }
       let updateddata=store.getState().raceData.RaceDetails;
     //this.setState({upracedata:updateddata})
    

   
      }

      DisatnceDropdown(){
           
           this.state.DistanceList = store.getState().LeaderboardResult.distancelist}
      
     closeMessageBox =()=>{
        this.setState({ showMessagePopup: false })
        // setShowMessagePopup(false)
        store.dispatch({ type: "CHANGE_MESSAGE_POPUP_DATA", payload: "" })
    }
    //Race Title *
    handleRaceTitle = (event) => {
        this.setState({ race_title: event.target.value }, this.validateRaceTitle)
        //console.log(this.state.race_title);
    }

    validateRaceTitle = () => {
        let error = { ...this.state.error }
        if (!this.state.race_title) {
            error.race_title_msg = "Please enter race title";
            this.state.race_title_valid = false;
        } else {
            this.state.race_title_valid = true;
        }

        this.setState({ error });
    }

    //Link With Activity
    validateLinkWithActivity(value) {
        this.setState({
            link_with_activity: value
        }, () => { this.handleLinkActivityError() })
    }

    handleLinkActivityError() {
        let error = { ...this.state.error }
        if (!this.state.link_with_activity || this.state.link_with_activity === "" || this.state.link_with_activity.length === 0) {
            error.link_activity_msg = "Please enter race activity";
            this.state.link_activity_valid = false;
        } else {
            this.state.link_activity_valid = true;
        }

        this.setState({ error });
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
            const value = currentContent.hasText() ? draftToHtml(contentRaw) : "";
        
              this.saveContent(value);})
           // this.props.onChange(fakeEvent);
          
    };

    saveContent = (content) => {
      
        this.setState({ race_description: content }, this.validateRaceDescription)
        this.setState({ race_descriptionjson: content })

    }
    onEditorStateChangerace = (editorStaterace) => {
        // const contentState = editorStaterace.getCurrentContent();
        // console.log('content state', convertToRaw(contentState))
        // this.saveContentrace(contentState);
        // this.setState({
        //     editorStaterace,
        // });
        const contentState = editorStaterace.getCurrentContent();
        console.log('content state', convertToRaw(contentState))
    
        this.setState({
            editorStaterace,
        });
        var value = ""
        this.setState({ editorStaterace }, () => {
          const currentContent = editorStaterace.getCurrentContent();
          const contentRaw = convertToRaw(currentContent);
          value = currentContent.hasText() ? draftToHtml(contentRaw) : "";
    
          this.saveContentrace(value);})
        

    };
  
    //   saveContent = (value) => {
    //     this.setState({ Description: value })
    //   }
    saveContentrace = (content) => {
        
        this.setState({ race_venue: content }, this.validateRaceVenue)
        this.setState({ race_venuejson: content })

    }
    //Race Description *
    handleRaceDescription = (event) => {
        if (event === undefined) { this.setState({ race_description: "" }, this.validateRaceDescription) }
        else {
            this.setState({ race_description: event.blocks[0].text }, this.validateRaceDescription)
        }

        //console.log(event.blocks[0].text);
    }

    validateRaceDescription = () => {
     
        let error = { ...this.state.error }

        if ((!this.state.race_description) || (this.state.race_description === '""')) {
            error.race_description_msg = "Please enter race description";
            this.state.race_description_valid = false;
        } else {
            this.state.race_description_valid = true;
        }

        this.setState({ error });
    }

    //Race Venue
    handleRaceVenue = (event) => {
        
        if (event === undefined) { this.setState({ race_venue: "" }, this.validateRaceVenue) }
        else {
            this.setState({ race_venue: event.blocks[0].text }, this.validateRaceVenue)
        }
        //console.log(event.blocks[0].text);
    }
    validateRaceVenue = () => {
        let error = { ...this.state.error }

        if ((!this.state.race_venue) || (this.state.race_venue === '""')) {
            error.race_venue_msg = "Please enter race venue";
            this.state.race_venue_valid = false;
        } else {
            this.state.race_venue_valid = true;
        }

        this.setState({ error });
    }

    //from Date
    handleFromDate = (event) => {
        if (event === undefined) {
            this.setState({ from_date: "" }, this.validateFromDate)
        }
        else {
            this.setState({ from_date: event.target.value }, this.validateFromDate)
        }

        //console.log('from_date', event.target.value);
    };

    validateFromDate = () => {
        let error = { ...this.state.error }
        var now = new Date()
         let nowdatewithouttime = now.toISOString().split('T')[0]
        let fromdate = new Date(this.state.from_date)
        let fromdatedatewithouttime=""
        if(this.state.from_date){
          fromdatedatewithouttime = fromdate.toISOString().split('T')[0]
           }
         if (!this.state.from_date) {
            error.from_date_msg = "Please select correct date";
            this.state.from_date_valid = false;
        } else if (fromdatedatewithouttime < nowdatewithouttime) {
            error.from_date_msg = "Please select correct date";
            this.state.from_date_valid = false;

        }
        else {
            this.state.from_date_valid = true;
        }

        this.setState({ error });
    }

    disableKeyPress = (e) => {
        e.preventDefault();
        return false
    }

    //Duration (in hours)
    handleDuration = (event) => {

        if (event === undefined) { this.setState({ duration: "" }, this.validateDuration) }
        else {
            this.setState({ duration: event.target.value }, this.validateDuration)
        }


        //console.log(event.target.value);
    }

    validateDuration = () => {
        let error = { ...this.state.error }

        if (this.state.duration <= 0) {
            error.duration_msg = "Please enter valid duration";
            this.state.duration_valid = false;
        } else {
            this.state.duration_valid = true;
        }

        this.setState({ error });
    }

    //Start Time
    handleStartTime = (event) => {
        if (event === undefined) {
            this.setState({ start_time: "" }, this.validateStartTime)
        }
        else {
            let time = event.target.value
            if (event.target.valueAsDate !== undefined) {
                if (event.target.valueAsDate.getTime() < 43200000) {
                    time = event.target.value + " AM"
                }
                else {
                    time = event.target.value + " PM"
                }
            }

            this.setState({ finalstarttime: time })
            this.setState({ start_time: event.target.value }, this.validateStartTime);
        }


        //console.log('from_date', event.target.value);
    };

    validateStartTime = () => {
  
        let error = { ...this.state.error }
        var now = new Date()
        let nowdatewithouttime = now.toISOString().split('T')[0]
       let fromdate = new Date(this.state.from_date)
       let fromdatedatewithouttime=""
       if(this.state.from_date){
         fromdatedatewithouttime = fromdate.toISOString().split('T')[0]
          }
          if(fromdatedatewithouttime === nowdatewithouttime){
        var d = new Date();
        var m = d.getMinutes();
        var h = d.getHours();
        if(h == '0') {h = 24}
        
        var currentTime = h+"."+m;

        //input time 
        var time = (this.state.start_time).split(":");
        var hour = time[0];
        if(hour == '00') {hour = 24}
        var min = time[1];
      if(min<10){
      var finalmin=min.split("0")
      min=finalmin[1]
        }
  var inputTime = hour+"."+min;
  //var totalTime = currentTime - inputTime;
 
        if (!this.state.start_time || (currentTime > inputTime)) {
            error.start_time_msg = "Please select correct time";
            this.state.start_time_valid = false;
        } else {
            this.state.start_time_valid = true;            
          
        }

        this.setState({ error });
    }else{
        if (!this.state.start_time ) {
            error.start_time_msg = "Please select correct time";
            this.state.start_time_valid = false;
        } else {
            this.state.start_time_valid = true;            
          
        }
    }}
    

    //Distance
    handleDistance = (event) => {
        if (event === undefined) {
            this.setState({ distance: "" }, this.validateDistance)
        }
        else {
            this.setState({ distance: event.value }, this.validateDistance)
        }

        //console.log(event.value);
    }

    validateDistance = () => {

        let error = { ...this.state.error }

        if (this.state.distance==="" || this.state.distance === null || this.state.distance ===undefined ) {
            error.distance_msg = "Please enter valid race distance";
            this.state.distance_valid = false;
        } else {
            this.state.distance_valid = true;
        }

        this.setState({ error });
    }

    //Upload Program Image
    handleAcceptedFiles = files => {
       
        let error = { ...this.state.error }
        let status = false;
      const currentFile=files[0]
      const myFileItemReader =new FileReader()
      
      myFileItemReader.addEventListener("Load", ()=>{
          console.log(myFileItemReader.result)

      },false)
      const reader = new FileReader()
 
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr)
      }
      reader.readAsArrayBuffer(currentFile)
      myFileItemReader.readAsDataURL(currentFile)
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

        this.setState({ error });
    };

    //checkbox-non-editable
    durationCheckbox = (event) => {
        if (event.target.checked) {
            this.setState({ duration_checkbox: true });
        } else {
            this.setState({ duration_checkbox: false });
        }
    }

    changeCheckBoxValue() {
        if (this.state.duration_checkbox === false) {
            this.setState({ duration_checkbox: true });
        } else {
            this.setState({ duration_checkbox: false });
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
    submitNewRaceForm = (evt) => {
      
        evt.preventDefault()
        if (this.state.race_title_valid === false) {
            this.validateRaceTitle();
            return false;
        }
        let Activities = this.props.selectedActivities
        if (Activities.length === 0) {
            return false;
        }
        if (this.state.race_description_valid === false) {
            this.handleRaceDescription();
            return false;
        }
        if (this.state.race_venue_valid === false) {
            this.handleRaceVenue();
            return false;
        }
        if (this.state.from_date_valid === false) {
            this.handleFromDate();
            return false;
        }
        if (this.state.duration_valid === false) {
            this.handleDuration();
            return false;
        }
        if (this.state.start_time_valid === false) {
            this.handleStartTime();
            return false;
        } 
        let distanceID=""
      
        if (this.state.distance === "" || this.state.distance === undefined ||this.state.distance === null) {
            this.handleDistance();
            return false;
        }else{
            distanceID=this.state.distance.Distance_Option_ID
        }
        if (this.state.program_image_valid === false) {
            let error = { ...this.state.error }
            this.state.program_image_valid = false;
            error.program_image_msg = "Please upload image file";
            this.setState({ error })
            return false;
        }


        if (this.state.race_title_valid === true && this.state.race_description_valid === true && this.state.race_venue_valid === true
            && this.state.from_date_valid === true && this.state.duration_valid === true && this.state.start_time_valid === true &&
            this.state.program_image_valid === true) {
                let selectedactivities = ""
                if(Activities.length>0){

                    Activities.forEach(obj => { 
                       
                              selectedactivities = selectedactivities+obj.id+','
                     });
                     selectedactivities = selectedactivities.substring(0, selectedactivities.length -1 )  
                    }     
                     let data = {fitnessDetailID: this.state.fitnessDetailID, fitnesseventname:this.state.race_title, fitnesseventdesc: this.state.race_descriptionjson, fitnesseventvenue: this.state.race_venuejson, fromdate:this.state.from_date, starttime:this.state.start_time,
                        durationinhrs :this.state.duration,fitnesseventID :distanceID,imagepath:this.state.selectedFiles[0].path,activitiesID:selectedactivities,checkbox:this.state.duration_checkbox}
                        appService.GetDataFromApiPost(leaderboardAddRace, data)
                       
                    .then((response) => {
                        if (response.status == 200) {
                            this.state.showMessagePopup = true
                            store.dispatch({ type: "CHANGE_MESSAGE_POPUP_DATA", payload: "success, Race Added." })
                            appService.updateRaceMasterData()
                        }
                    })
                    .catch(err => { alert("error occured") })

            
        }


    }
    render() {
        // // const { editorState } = this.state.editorState;
       // const { editorStaterace } = this.state.editorStaterace;
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
                                                        onChange={this.handleRaceTitle}
                                                        value={this.state.race_title}
                                                        onBlur={this.validateRaceTitle}
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
                                                    {/* <ValidationMessage valid={this.state.link_activity_valid} message={this.state.error.link_activity_msg} /> */}
                                                </div>

                                                <div className="form-group mb-3">
                                                    <Label for="act-dec">Race Description <span className="text-danger" >*</span></Label>
                                                    <Editor
                                                        // toolbarClassName="toolbarClassName"
                                                        // wrapperClassName="wrapperClassName"
                                                        // editorClassName="editorClassName"
                                                        // onChange={this.handleRaceDescription}
                                                        // value={this.state.race_description}
                                                        // onBlur={this.validateRaceDescription}
                                                        editorState={this.state.editorState}
                                                        wrapperClassName="demo-wrapper"
                                                        editorClassName="demo-editor"
                                                        onEditorStateChange={this.onEditorStateChange}
                                                        toolbar={{
                                                            inline: { inDropdown: true },
                                                            list: { inDropdown: true },
                                                            textAlign: { inDropdown: true },
                                                            link: { inDropdown: true },
                                                            emoji: { inDropdown: true },
                                                        }}
                                                    />
                                                    <ValidationMessage valid={this.state.race_description_valid} message={this.state.error.race_description_msg} />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <Label for="act-adddec">Race Venue</Label>
                                                    <Editor
                                                         editorState={this.state.editorStaterace}
                                                         wrapperClassName="demo-wrapper"
                                                         editorClassName="demo-editor"
                                                         onEditorStateChange={this.onEditorStateChangerace}
                                                         toolbar={{
                                                             inline: { inDropdown: true },
                                                             list: { inDropdown: true },
                                                             textAlign: { inDropdown: true },
                                                             link: { inDropdown: true },
                                                             emoji: { inDropdown: true },
                                                         }}               
                                                    />
                                                    <ValidationMessage valid={this.state.race_venue_valid} message={this.state.error.race_venue_msg} />

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
                                                            {/* <Select
                                                                options={optionGroup}
                                                                onChange={this.handleDistance}
                                                                selected={this.state.distance}
                                                                onBlur={this.validateDistance}
                                                            /> */}
                                                             <Autocomplete
                                                                className="d-block w-100"
                                                                options={this.state.DistanceList}
                                                                onChange={(event, value) => {
                                                                    this.state.distance=value;
                                                                    this.setState({ distance: value });
                                                                  this.validateDistance();
                                                                }}
                                                                value={this.state.distance}
                                                                getOptionLabel={(option) => option.Distance_Option}
                                                                id="distancelist"
                                                                renderInput={(params) => (
                                                                    <div ref={params.InputProps.ref}>
                                                                        <input type="distance list" placeholder="Enter Distance" id="act" type="text" {...params.inputProps} />
                                                                    </div>
                                                                )} />
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
                                name="act-name"
                                defaultChecked
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                onChange={this.durationCheckbox}
                                checked={this.state.duration_checkbox}
                            />
                            <Label htmlFor="act-name" onClick={() => { this.changeCheckBoxValue() }}>Auto non-editable duration (15 days from end of the race)</Label>
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

                <Modal
                    isOpen={this.state.showMessagePopup}
                    toggle={false}
                >
                    <div className="modal-header">
                        <h5 className="modal-title mt-0">Message</h5>
                        <button
                            type="button"
                            onClick={() =>
                                this.closeMessageBox()
                            }
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    {this.props.successmessage !== "" && this.props.successmessage !== undefined ?
                        <div className="modal-body">
                            {this.props.successmessage.split(',')[0] !== "success" ?
                                <div class="alert alert-danger" role="alert">
                                    Some error occured
                                      </div>
                                :
                                <div class="alert alert-success" role="alert">
                                    {this.props.successmessage.split(',')[1]}
                                </div>
                            }
                        </div>
                        : null}
                </Modal>
            </React.Fragment>
        )
    }
}
const mapStatetoProps = state => {
    return {

        selectedActivities: state.selectedActivity != undefined ? state.selectedActivity.activities : null,
        successmessage: state.raceData !== undefined ? state.raceData.successmessage : ""
    };
};
const dispatchToProps = dispatch => {
    return {
        updateTableData: (type, payload) => {
            dispatch({ type: type, payload: payload })
        }
    }
}

export default withRouter(connect(mapStatetoProps, dispatchToProps)(NewRace));

