import React, { Component } from "react";
import {
    Row,
    Col,
    Card,
    CardBody,
    CardHeader,
    Button,
    Modal,
    Label,
    Input
} from "reactstrap";
import { withRouter } from 'react-router-dom';
import Loader from "../../../components/Loader";
import store from "../../../store";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import DataTable, { createTheme } from 'react-data-table-component';
import { EditorState, convertToRaw, convertFromRaw, ContentState } from 'draft-js';
import draftToHtml from "draftjs-to-html";
import htmlToDraft from 'html-to-draftjs';
import PredefinedStrService from '../PredefinedStr/PredefinedStrService'
import { setAddUpdatePreStrURL, setGetPreStrListURL, removeSetPreStrURL } from '../../../AppConfig';
import Confirmation_Message from './SubComponents/Confirmation_Message';
import Information_Message from './SubComponents/Information_Message';
import ReactHtmlParser from 'react-html-parser';

const BalanceData = [
    {
        id: 1,
        predefinedStr: '%SLR%',
        Description: 'Slow Long Run - Slow Long Run is meant for ...'
    },
    {
        id: 1,
        predefinedStr: '%Steps%',
        Description: 'Include Step Workouts during the run at least 40% - 50% of mileage should be climbing up and down the steps.'
    }
];
var prestrsList = [];
var filterprestrsList = [];
var prestrsListBackup = [];
const customProps = { id: 'my-table-id' };

const prestrListObject = (data) => {
    prestrsList = [];

    if (data === undefined) {
        return;
    }

    data.forEach(element => {
        const contentBlock = htmlToDraft(element.Description);

        prestrsList.push({
            Predefined_String: element.Predefined_String,
            Description: element.Description,
            Predefined_String_ID: element.Predefined_String_ID,
            Active_Flag: element.Active_Flag,
            Service_Provider_ID: element.Service_Provider_ID,
            descflag: element.Description_Flag["data"][0],
            valueflag: element.Value_Flag["data"][0]
        });
    });

}
const headerStyle = {
    rows: {
        style: {
            minHeight: '100px', // override the row height
        }
    },
    headCells: {
        style: {
            backgroundColor: "#EDECEC",
        },
    },
};

class predefinedStr extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_center: false,
            modal_scroll: false,
            PreDefDesc_checkbox: false,
            editorState: EditorState.createEmpty(),
            full_form: "",
            value_checkbox: false,
            PreStrsList: [],
            PreStrsListBackup: [],
            loader: true,
            success_msg: false,
            modal_data: "",
            eventData: null,
            model_title: "",
            btn_call: "",
            PreStrForm: {
                PreStrNameError: "",
                PreStrFullformError: "",
                PreStrCheckboxError: "",
                Err: ""
            },
            Err: "",
            editorState: EditorState.createEmpty(),
            valuecheckbox: false,
            Pre_Str: "",
            prestrID: null

        };
        this.predefinedstrService = new PredefinedStrService();
        this.add_PrdStr = this.add_PrdStr.bind(this);
        this.tog_scroll = this.tog_scroll.bind(this);
        this.getPredefinedStrData()
        this.RemoveUT = this.RemoveUT.bind(this);
        this.props.updateTableData('CHANGE_CURRENT_PAGE_NAME', 'Predefined String')
    }
    CancelBtn() {
        this.setState({ success_msg: false });
    }
    Information_MessageBtn() {
        this.setState({ with_title: false });
    }

    removeBodyCss() {
        document.body.classList.add("no_padding");
    }
    add_PrdStr() {
        this.setState(prevState => ({
            modal_center: !prevState.modal_center
        }));
        this.removeBodyCss();
        this.setState({ PreDefDesc_checkbox: false });
        this.setState({ value_checkbox: false });
        this.setState({ editorState: EditorState.createEmpty() });
        this.state.Pre_Str = "";
        this.state.valuecheckbox = false;
        this.state.desccheckbox = false;
        this.state.prestrID = null
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
    columns = [
        {
            name: 'Predefined String',
            selector: 'Predefined_String',
            sortable: true,
            wrap: true,
            width: '20%',


        },
        {
            name: 'Description',
            // selector: 'Description',
            sortable: true,
            wrap: true,
            cell: (row) => <div>{ReactHtmlParser(row.Description)}</div>,

        },
        {
            name: 'Action',
            cell: (row) =>
                <div className="col-12">
                    <Button className="mb-1 btn update-btn" id="but" onClick={() => this.updateMemberUT(row)}>
                        View &amp; Update
            </Button>
                    <Button className="mb-1 btn remove-btn" onClick={(event) => this.RemoveUT(event, row, "Rmv")}>
                        {/* RemovePreStr */}
                Remove
            </Button>
                </div>
            ,
            button: true,
        },
    ];
    updateMemberUT(data) {
      
        const contentBlock = htmlToDraft(data.Description);
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        this.state.editorState = EditorState.createWithContent(contentState);
        // this.state.valuecheckbox=true
        this.state.full_form=data.Description
        this.state.prestrID=data.Predefined_String_ID
      
      let predefinedstring= data.Predefined_String.replace(/[^a-zA-Z ]/g, "")
        this.setState({           
            Pre_Str: predefinedstring,               
        });
        if (data.valueflag === 1) {
            this.state.valuecheckbox = true
        }
        else {
            this.state.valuecheckbox = false
        }
        if (data.descflag === 1) {
            this.state.desccheckbox = true
        }
        else {
            this.state.desccheckbox = false
        }
        this.setState(prevState => ({
            modal_center: !prevState.modal_center
        }));
        this.removeBodyCss();
    }
    RemoveUT = (event, data, btnCall) => {
        event.preventDefault();
        //the condition message before delete
        this.setState({ btn_call: btnCall, eventData: event, success_msg: true, modal_data: data, model_title: "Are you sure you want to remove" });
    }
    onConfirmClick() {

        switch (this.state.btn_call) {

            case "Rmv": {

                this.state.eventData.preventDefault();
                // let data =this.state.modal_data == "" || undefined ? "": this.state.modal_data;
                this.setState({ success_msg: false });
                let selectedUserSkeyID = this.props.UserSkeyID
                let PreStr_ID = this.state.modal_data.Predefined_String_ID
                let data = {
                    prestrId: PreStr_ID,
                    UserSkeyID: selectedUserSkeyID,
                    Is_deleted: 1,
                    Is_active: 0
                }
                let objData = this.state.modal_data.ID;

                // objData.isUserTypeDeleted = 1;
                this.predefinedstrService.RemovePreStr(data)
                    .then(resp => {
                        prestrsList = [];
                        this.updatePredefinedStrData();
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

    getPredefinedStrData() {

        if (this.props.preStrTableData != "") {
            this.state.PreStrsList = this.props.preStrTableData
            this.state.loader = false
        }
        else {
            let selectedProviderID = this.props.ProviderID

            let data = { ProviderID: selectedProviderID }
            this.predefinedstrService.GetPredefinedStringList(setGetPreStrListURL, data)
                .then((response) => {
                    console.log(response)
                    prestrsList = [];
                    prestrListObject(response);
                    this.state.rawTableData = JSON.parse(JSON.stringify(prestrsList));
                    this.setState({ PreStrsList: this.state.rawTableData, PreStrsListBackup: response });
                    prestrsListBackup = response; // This is to get the record in the external world

                    // this.state.rawTableData = JSON.parse(JSON.stringify(this.state.rawTableData));     
                    store.dispatch({ type: 'TABLE_DATA_PRESTR', payload: this.state.rawTableData });
                    this.setState({ loader: false })
                })
        }
    }

    updatePredefinedStrData() {

        let selectedProviderID = this.props.ProviderID

        let data = { ProviderID: selectedProviderID }
        this.predefinedstrService.GetPredefinedStringList(setGetPreStrListURL, data)
            .then((response) => {
                console.log(response)
                prestrsList = [];
                prestrListObject(response);
                this.state.rawTableData = JSON.parse(JSON.stringify(prestrsList));
                this.setState({ PreStrsList: this.state.rawTableData, PreStrsListBackup: response });
                prestrsListBackup = response; // This is to get the record in the external world
                store.dispatch({ type: 'TABLE_DATA_PRESTR', payload: this.state.rawTableData });
                this.setState({ loader: false })
            })

    }

    saveContent = (value) => {
        this.setState({ full_form: value })
    }

    PreDefDescCheckedBox = (e, index) => {

        this.setState(prevState => ({
            desccheckbox: !prevState.desccheckbox
        }));

        // if (e.target.checked) {
        //     this.setState({PreDefDesc_checkbox : true });
        // } else {
        //     this.setState({ PreDefDesc_checkbox: false });
        // }
    };
    valueCheckedBox = (e, index) => {


        this.setState(prevState => ({
            valuecheckbox: !prevState.valuecheckbox
        }));
        // if (e.target.checked) {
        //     this.setState({ value_checkbox: true });
        // } else {
        //     this.setState({ value_checkbox: false });
        // }
    };

    validate = (prestr, fullform, PreDefDesccheckedValue, valuecheckedValue) => {

        let PreStrNameError = "";
        let PreStrFullformError = "";
        let PreStrCheckboxError = "";
        let Err = "";
        let defaultError = "not assigned";
        //  var prestrRGEX = /[%]([A-Za-z]{1,})[^\s]*[%]$/;
         var prestrRGEX =  /^[A-Za-z]+$/;
         var prestrResult = prestrRGEX.test(prestr);
        if (prestr == "" || prestr == null || prestr == undefined ||(2>(prestr.length)) || ((prestr.length)>10) )
        {         
            PreStrNameError = "PreDefined String length should be between 2 to 10";
            Err = PreStrNameError;
        }else if ( prestrResult === false )
          {
              PreStrNameError = "PreDefined String should contains only alphabets";
              Err = PreStrNameError;
          }
        // else if (prestrResult === false){
        //     PreStrNameError = "PreDefined String should start and end with %";
        //     Err = PreStrNameError;
        // }

        if (fullform == "" || fullform == null || fullform == undefined)
        {          
            PreStrFullformError = "Full Form";
            if (Err === "") {
                Err = PreStrFullformError + " " + defaultError;
            }
            else {
                Err = Err;
            }
        }
        if (PreDefDesccheckedValue == 0 && valuecheckedValue == 0) {
            PreStrCheckboxError = "Select at least one Checkbox";
            if (Err === "") {
                Err = PreStrCheckboxError;
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
    //Race Title *
    handlePreStr = (event) => {
        this.setState({ Pre_Str: event.target.value })
        //console.log(this.state.race_title);
    }


    AddPredefinedString = (e, index) => {

        let prestr = this.state.Pre_Str;

        let fullform = this.state.full_form;
        var PreDefDesccheckedValue = 0
        if (this.state.desccheckbox === true) {
            PreDefDesccheckedValue = 1
        }
        var valuecheckedValue = 0
        if (this.state.valuecheckbox === true) {
            valuecheckedValue = 1
        }
           
       
        const isValid  = this.validate(prestr, fullform, PreDefDesccheckedValue,valuecheckedValue)
        if(isValid){
            let Finalprestr="";
    
                 Finalprestr= '%' + prestr +'%';
           
       
            let ProviderID=this.props.ProviderID
            let UserSkeyID=this.props.UserSkeyID
        let data = {prestrID : this.state.prestrID ,provider_ID:ProviderID,prestr: Finalprestr, fullform:fullform,UserSkeyID:UserSkeyID, PreDefDesccheckedValue: PreDefDesccheckedValue,valuecheckedValue:valuecheckedValue}
        this.predefinedstrService.CreateUpdateSettingPredStr( data)
        .then((response)=>{
          if(response.status ==200 ){        
            this.setState({modal_center: false})
            prestrsList = [];
            this.updatePredefinedStrData();
            this.setState({ with_title: true,model_title: "Thanks, transaction is completed successfully!!!" });            
            this.setState({ PreDefDesc_checkbox: false });
            this.setState({ value_checkbox: false });
          }
        })
        .catch(err=>{ this.setState({ with_title: true,model_title: "Thanks, transaction is failed!!!" });
    })
      }
    //   else{
    //     validate.section.forEach((obj,idx) =>{
    //       document.getElementById(obj).innerHTML = validate.message[idx]
    //   })
    //   }
        
      }
    render() {
        const errorMsgStyle = {
            color: "red",
            fontSize: "12px"
        }
        return (
            <React.Fragment>
                {this.state.loader ?
                    <Loader /> :
                    null
                }
                <div className="container-fluid">
                    <Row className="align-items-center">
                        <Col sm={6}>
                            <div className="page-title-box">
                                <ol className="breadcrumb mb-0">
                                    <li className="breadcrumb-item">
                                        Settings
                                    </li>
                                    <li className="breadcrumb-item active">Predefined String</li>
                                </ol>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={12} className="text-right mb-4">
                            <Button
                                type="button"
                                className="btn update-btn font"
                                onClick={this.add_PrdStr}
                                data-toggle="modal"
                                data-target=".bs-example-modal-center"
                            >
                                Add Predefined String
                        </Button>
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
                            <Modal
                                isOpen={this.state.modal_center}
                                toggle={this.add_PrdStr}
                            >
                                <div className="modal-header">
                                    <h5 className="modal-title mt-0">Add Predefined String</h5>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            this.setState({ modal_center: false, desccheckbox: false, valuecheckbox: false, Pre_Str: "", prestrID: null })

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
                                    {/* <form className="contact-form-style" onSubmit={this.AddPredefinedString}> */}
                                    <div className="col-sm-12">

                                        <div className="form-group row">
                                            <Label for="PreStr">Predefined String <span className="text-danger">*</span></Label>
                                            {/* <Input type="text" id="PreStr" /> */}
                                            <Input type="text" id="PreStr" placeholder="Enter Predefined String"
                                                onChange={this.handlePreStr}
                                                value={this.state.Pre_Str} />

                                        </div>
                                        <div className="form-group row">
                                            <Label for="full-form">Full Form <span className="text-danger">*</span></Label>
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
                                            <Label for="fullform" id="fullformError" style={errorMsgStyle}></Label>
                                        </div>

                                        <div className="form-group row mt-9 mb-0">
                                            <FormControlLabel
                                                value="PreDefDesc"
                                                control={<Checkbox color="primary" checked={this.state.desccheckbox} />}
                                                label="Description"
                                                onClick={e => this.PreDefDescCheckedBox(e)}
                                            />
                                            <FormControlLabel
                                                value="value"
                                                control={<Checkbox color="primary" checked={this.state.valuecheckbox} />}
                                                label="Value"
                                                onClick={e => this.valueCheckedBox(e)}
                                            />
                                            <Label for="checkbox" id="checkboxError" style={errorMsgStyle}></Label>
                                        </div>
                                        {/* <Label for="checkbox" id="checkboxError" style={errorMsgStyle}></Label> */}

                                        <div className="form-group row">
                                            <button className="btn  btn-block update-btn font" onClick={this.AddPredefinedString} >
                                                Submit
                                   </button>
                                        </div>
                                    </div>
                                    {/* </form> */}
                                </div>

                            </Modal>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={12}>
                            <Card className="mini-stat">
                                <CardHeader className="bl-bg">
                                    <Link to="#" className="text-white">
                                        <b>PugMark Statement</b>
                                    </Link>
                                    <span className="float-right">
                                    </span>
                                </CardHeader>
                                <CardBody>
                                    <DataTable
                                        className="data-table"
                                        columns={this.columns}
                                        data={this.state.PreStrsList}
                                        noHeader={true}
                                        customStyles={headerStyle}
                                        fixedHeader
                                        fixedHeaderScrollHeight="300px"
                                        pagination
                                    />
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

        preStrTableData: state.PreStrTableData != undefined ? state.PreStrTableData.tableData : "",
        ProviderID: state.currentPageName.roleAndProvider.selectedRole.Service_Provider_ID, 
        UserSkeyID: state.userProfileData != undefined ? state.userProfileData.ProfileData[0][0].User_Skey_ID :null,
        

    };
};
const dispatchToProps = dispatch => {
    return {
        updateTableData: (type, payload) => {
            dispatch({ type: type, payload: payload })
        }
    }
}

export default withRouter(connect(mapStatetoProps, dispatchToProps)(predefinedStr));



