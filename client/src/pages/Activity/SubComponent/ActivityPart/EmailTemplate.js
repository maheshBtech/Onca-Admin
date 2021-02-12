import React, { Component } from "react";
import { Row, Col, Label, Input, Card, CardBody, CardHeader, Modal } from "reactstrap";
import { Link } from "react-router-dom";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DataTable, { createTheme } from 'react-data-table-component';
import SearchData from '../../SubComponent/SearchData';
import { Editor } from "react-draft-wysiwyg";
import { AllValidate } from '../../ActivityModel';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, ContentState } from 'draft-js';

const UsersActvitiesData = [
    {
        id: 1,
        AODsTemplateName: 'AODs Template 1',

    },
    {
        id: 2,
        AODsTemplateName: 'AODs Template 2',

    },
    {
        id: 3,
        AODsTemplateName: 'AODs Template 3',

    },
    {
        id: 4,
        AODsTemplateName: 'AODs Template 4',

    },
    {
        id: 5,
        AODsTemplateName: 'AODs Template 5',

    }
];
const headerStyle = {

    headCells: {
        style: {
            backgroundColor: "#EDECEC",
        },
    },
};
const columnsStartMail = [
    {
        name: 'Activity Start Mail Template',
        selector: 'Template_Type_Name',
        sortable: true,
        wrap: true
    },

];
const columnsEndMail = [
    {
        name: 'Activity End Mail Template',
        selector: 'Template_Type_Name',
        sortable: true,
        wrap: true
    },
];
let localValidate = {
    actStartMailSubAEVTemp: false, actStartMailDescAEVTemp: false, actEndMailSubAEVTemp: false,
    actEndMailDescAEVTemp: false
}
let SelectedRow = {}

class EmailTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            duration_checkbox: false,
            modal_centerOne: false,
            modal_centerTwo: false,
            modal_scroll: false,
            ActivityEmailTemplate: { ...this.props.ActivityEmailTemplate },
            ...AllValidate.AEValidate,
            actiStartMailTempList: [],
            actiEndmailTempList: []
        };
        this.handleInputchange = this.handleInputchange.bind(this);
        this.handleCBchange = this.handleCBchange.bind(this);
        this.onActivityStartMailDecStateChange = this.onActivityStartMailDecStateChange.bind(this)
        this.onActivityEndMailDecStateChange = this.onActivityEndMailDecStateChange.bind(this)
        this.validateFunction = this.validateFunction.bind(this)
        this.internalValidation = this.internalValidation.bind(this)
        this.handleSelectedRows = this.handleSelectedRows.bind(this)
        this.SelectedSubmitOne = this.SelectedSubmitOne.bind(this)
        this.SelectedSubmitTwo = this.SelectedSubmitTwo.bind(this)

        // Modal Popup
        this.add_memberOne = this.add_memberOne.bind(this);
        this.add_memberTwo = this.add_memberTwo.bind(this);
        this.tog_scroll = this.tog_scroll.bind(this);
    }
    // using to send back the update object
    componentDidUpdate(prevProps, prevState) {
        if (prevState.ActivityEmailTemplate !== this.state.ActivityEmailTemplate) {
            this.props.handleActivityEmailTemplate(this.state.ActivityEmailTemplate)
        }
        if (prevProps.TriggrtVaidation !== this.props.TriggrtVaidation) {
            this.validateFunction()
        }
        if (prevProps.ActivityEmailTemplate !== this.props.ActivityEmailTemplate) {
            this.setState({ ActivityEmailTemplate: this.props.ActivityEmailTemplate })
        }
        if (prevProps.ActivityMailTemplateList !== this.props.ActivityMailTemplateList) {
            this.setState({ actiStartMailTempList: this.props.ActivityMailTemplateList.filter(elem => elem.Template_Type_ID === 5) })
            this.setState({ actiEndmailTempList: this.props.ActivityMailTemplateList.filter(elem => elem.Template_Type_ID === 6) })
        }
    }
    // validation function
    validateFunction = () => {
        // Validate Activity start mail subject
        if (this.state.ActivityEmailTemplate.activityStartMailSub === '') {
            this.setState({ activityStartMailSubAEV: 'Please Enter Activity Start Mail Subject' })
            localValidate.actStartMailSubAEVTemp = false
        }
        else {
            this.setState({ activityStartMailSubAEV: "" })
            localValidate.actStartMailSubAEVTemp = true
        }
        // Validate Activity start mail Description
        if (this.state.ActivityEmailTemplate.activityStartMailDesc.getCurrentContent().getPlainText().length === 0) {
            this.setState({ activityStartMailDescAEV: 'Please Enter Activity Start Mail Description' })
            localValidate.actStartMailDescAEVTemp = false
        }
        else {
            this.setState({ activityStartMailDescAEV: "" })
            localValidate.actStartMailDescAEVTemp = true
        }
        // Validate Activity End mail subject
        if (this.state.ActivityEmailTemplate.activityEndMailSub === '') {
            this.setState({ activityEndMailSubAEV: 'Please Enter Activity End Mail Subject' })
            localValidate.actEndMailSubAEVTemp = false
        }
        else {
            this.setState({ activityEndMailSubAEV: "" })
            localValidate.actEndMailSubAEVTemp = true
        }
        // Validate Activity End mail Description
        if (this.state.ActivityEmailTemplate.activityEndMailDesc.getCurrentContent().getPlainText().length === 0) {
            this.setState({ activityEndMailDescAEV: 'Please Enter Activity End Mail Description' })
            localValidate.actEndMailDescAEVTemp = false
        }
        else {
            this.setState({ activityEndMailDescAEV: "" })
            localValidate.actEndMailDescAEVTemp = true
        }
        // final validation
        if (localValidate.actStartMailSubAEVTemp === false || localValidate.actStartMailDescAEVTemp === false ||
            localValidate.actEndMailSubAEVTemp === false || localValidate.actEndMailDescAEVTemp === false) {
            this.props.handleAllCompValidation('AE', false)
        }
        else {
            this.props.handleAllCompValidation('AE', true)
        }
    }
    //internal validation 
    internalValidation = (name, value) => {
        switch (name) {
            case 'activityStartMailSub':
                // Validate Activity start mail subject
                if (value === '') {
                    this.setState({ activityStartMailSubAEV: 'Please Enter Activity Start Mail Subject' })
                    localValidate.actStartMailSubAEVTemp = false
                }
                else {
                    this.setState({ activityStartMailSubAEV: "" })
                    localValidate.actStartMailSubAEVTemp = true
                }
                break
            case 'activityStartMailDesc':
                // Validate Activity start mail Description
                if (value.getCurrentContent().getPlainText().length === 0) {
                    this.setState({ activityStartMailDescAEV: 'Please Enter Activity Start Mail Description' })
                    localValidate.actStartMailDescAEVTemp = false
                }
                else {
                    this.setState({ activityStartMailDescAEV: "" })
                    localValidate.actStartMailDescAEVTemp = true
                }
                break
            case 'activityEndMailSub':
                // Validate Activity End mail subject
                if (value === '') {
                    this.setState({ activityEndMailSubAEV: 'Please Enter Activity End Mail Subject' })
                    localValidate.actEndMailSubAEVTemp = false
                }
                else {
                    this.setState({ activityEndMailSubAEV: "" })
                    localValidate.actEndMailSubAEVTemp = true
                }
                break
            case 'activityEndMailDesc':
                // Validate Activity End mail Description
                if (value.getCurrentContent().getPlainText().length === 0) {
                    this.setState({ activityEndMailDescAEV: 'Please Enter Activity End Mail Description' })
                    localValidate.actEndMailDescAEVTemp = false
                }
                else {
                    this.setState({ activityEndMailDescAEV: "" })
                    localValidate.actEndMailDescAEVTemp = true
                }
                break
            default:
                break
        }
    }
    // handle all Input box change
    handleInputchange = (event) => {
        let fname = event.target.name;
        let fvalue = event.target.value;
        this.setState(prevState => ({
            ActivityEmailTemplate: {
                ...prevState.ActivityEmailTemplate, [fname]: fvalue
            }
        }));
        this.internalValidation(fname, fvalue)
    };
    // handle all checkbox
    handleCBchange = (event) => {
        let fname = event.target.name;
        let fvalue = event.target.checked;
        this.setState(prevState => ({
            ActivityEmailTemplate: {
                ...prevState.ActivityEmailTemplate, [fname]: fvalue
            }
        }));
    }
    // Modal
    removeBodyCss() {
        document.body.classList.add("no_padding");
    }
    add_memberOne() {
        this.setState(prevState => ({
            modal_centerOne: !prevState.modal_centerOne
        }));
        this.removeBodyCss();
    }
    add_memberTwo() {
        this.setState(prevState => ({
            modal_centerTwo: !prevState.modal_centerTwo
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
    // Activity Start Mail Description Editor state change handle 
    onActivityStartMailDecStateChange = (editorState) => {
        // if (editorState.getCurrentContent().getPlainText().length > 1000) {
        //     this.setState({ activityStartMailDescAEV: 'Activity start mail description cannot be greater then 1000 characters' })
        //     localValidate.actStartMailDescAEVTemp = false
        // }
        // else {
            this.setState(prevState => ({
                ActivityEmailTemplate: {
                    ...prevState.ActivityEmailTemplate, activityStartMailDesc: editorState
                }
            }));
            //this.setState({ activityStartMailDescAEV: '' })
            //localValidate.actStartMailDescAEVTemp = true
        //}
        this.internalValidation('activityStartMailDesc', editorState)
    };
    // Activity End Mail Description Editor state change handle 
    onActivityEndMailDecStateChange = (editorState) => {

        // if (editorState.getCurrentContent().getPlainText().length > 1000) {
        //     this.setState({ activityEndMailDescAEV: 'Activity end mail description cannot be greater then 1000 characters' })
        //     localValidate.actEndMailDescAEVTemp = false
        // }
        // else {
            this.setState(prevState => ({
                ActivityEmailTemplate: {
                    ...prevState.ActivityEmailTemplate, activityEndMailDesc: editorState
                }
            }));
            //this.setState({ activityEndMailDescAEV: '' })
            //localValidate.actEndMailDescAEVTemp = true
        //}
        this.internalValidation('activityEndMailDesc', editorState)
    };
    handleSelectedRows = (selectedrow) => {
        SelectedRow = selectedrow.selectedRows[0]
    }
    SelectedSubmitOne = () => {
        this.setState(prevState => ({
            ActivityEmailTemplate: {
                ...prevState.ActivityEmailTemplate, activityStartMailSub: SelectedRow.Subject
            }
        }));
        let contentBlock = htmlToDraft(SelectedRow.Description);
        let contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        let editorStateForm = EditorState.createWithContent(contentState);
        this.setState(prevState => ({
            ActivityEmailTemplate: {
                ...prevState.ActivityEmailTemplate, activityStartMailDesc: editorStateForm
            }
        }));
        this.setState({ modal_centerOne: false })
    }
    SelectedSubmitTwo = () => {
        this.setState(prevState => ({
            ActivityEmailTemplate: {
                ...prevState.ActivityEmailTemplate, activityEndMailSub: SelectedRow.Subject
            }
        }));
        let contentBlock = htmlToDraft(SelectedRow.Description);
        let contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        let editorStateForm = EditorState.createWithContent(contentState);
        this.setState(prevState => ({
            ActivityEmailTemplate: {
                ...prevState.ActivityEmailTemplate, activityEndMailDesc: editorStateForm
            }
        }));
        this.setState({ modal_centerTwo: false })
    }
    render() {
        return (
            <Row>
                <Col lg={6}>
                    <div className="form-group">
                        <Label for="mail-sub">Activity Start Mail Subject <span className="text-danger" >*</span></Label>
                        <Input type="text" id="mail-sub"
                            placeholder="Enter Mail Subject"
                            name="activityStartMailSub"
                            value={this.state.ActivityEmailTemplate.activityStartMailSub}
                            onChange={this.handleInputchange} maxLength="50" />
                        <span className="text-danger">{this.state.activityStartMailSubAEV}</span>
                    </div>
                    <div className="form-group">
                        <Label for="act-dec" className="d-block w-100">
                            Description <span className="text-danger" >*</span>
                            <Link className="float-right"
                                onClick={this.add_memberOne}
                                data-toggle="modal"
                                data-target=".bs-example-modal-center">
                                Select Template
                            </Link>
                            <Modal
                                isOpen={this.state.modal_centerOne}
                                toggle={this.add_memberOne}>
                                <div className="modal-header">
                                    <h5 className="modal-title mt-0">Activity Start Mail Template</h5>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            this.setState({ modal_centerOne: false })
                                        }
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <Card className="mini-stat text-white">
                                        <CardHeader className="bl-bg">
                                            <b>Activity Start Mail Template List</b>
                                            {/* Search and CSV Download */}
                                            <span className="float-right">
                                                <SearchData searchAnything={this.searchAnything}></SearchData>
                                            </span>
                                        </CardHeader>
                                        <CardBody>
                                            <DataTable
                                                className="data-table"
                                                columns={columnsStartMail}
                                                data={this.state.actiStartMailTempList}
                                                noHeader={true}
                                                customStyles={headerStyle}
                                                fixedHeader
                                                fixedHeaderScrollHeight="300px"
                                                pagination
                                                selectableRows
                                                onSelectedRowsChange={state => this.handleSelectedRows(state)}
                                            />
                                            <button className="btn btn-block update-btn font mt-3" onClick={() => this.SelectedSubmitOne()}>
                                                Select Activity Start Mail Template
                                    </button>
                                        </CardBody>
                                    </Card>
                                </div>
                            </Modal>
                        </Label>
                        <Editor
                            editorState={this.state.ActivityEmailTemplate.activityStartMailDesc}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            toolbar={{
                                inline: { inDropdown: true },
                                list: { inDropdown: true },
                                textAlign: { inDropdown: true },
                                link: { inDropdown: false },
                            }}
                            onEditorStateChange={this.onActivityStartMailDecStateChange}
                        />
                        <span className="text-danger">{this.state.activityStartMailDescAEV}</span>
                        <FormControlLabel
                            value="ActStart"
                            control={<Checkbox color="primary" name='activityAutoMailOnStart' checked={this.state.ActivityEmailTemplate.activityAutoMailOnStart} onChange={this.handleCBchange} />}
                            label="Auto Mail for Activity Start"
                            checked
                        />
                    </div>
                </Col>
                <Col lg={6}>
                    <div className="form-group">
                        <Label for="mail-sub">
                            Activity End Mail Subject <span className="text-danger" >*</span>
                        </Label>
                        <Input type="text" id="mail-sub"
                            placeholder="Enter Mail Subject"
                            name="activityEndMailSub"
                            value={this.state.ActivityEmailTemplate.activityEndMailSub}
                            onChange={this.handleInputchange} maxLength="50" />
                        <span className="text-danger">{this.state.activityEndMailSubAEV}</span>
                    </div>
                    <div className="form-group">
                        <Label for="act-dec" className="d-block w-100">
                            Description <span className="text-danger" >*</span>
                            <Link className="float-right"
                                onClick={this.add_memberTwo}
                                data-toggle="modal"
                                data-target=".bs-example-modal-center"
                            >
                                Select Template
                            </Link>
                            <Modal
                                isOpen={this.state.modal_centerTwo}
                                toggle={this.add_memberTwo}
                            >
                                <div className="modal-header">
                                    <h5 className="modal-title mt-0">Activity End Mail Template</h5>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            this.setState({ modal_centerTwo: false })
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
                                            <b>Activity End Mail Template list</b>
                                            {/* Search and CSV Download */}
                                            <span className="float-right">
                                                <SearchData searchAnything={this.searchAnything}></SearchData>
                                            </span>
                                        </CardHeader>
                                        <CardBody>
                                            <DataTable
                                                className="data-table"
                                                columns={columnsEndMail}
                                                data={this.state.actiEndmailTempList}
                                                noHeader={true}
                                                customStyles={headerStyle}
                                                fixedHeader
                                                fixedHeaderScrollHeight="300px"
                                                pagination
                                                selectableRows
                                                onSelectedRowsChange={state => this.handleSelectedRows(state)}
                                            />
                                            <button className="btn btn-block update-btn font mt-3" onClick={() => this.SelectedSubmitTwo()}>
                                                Select Activity End Mail Template
                                    </button>
                                        </CardBody>
                                    </Card>
                                </div>
                            </Modal>

                        </Label>
                        <Editor
                            editorState={this.state.ActivityEmailTemplate.activityEndMailDesc}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            toolbar={{
                                inline: { inDropdown: true },
                                list: { inDropdown: true },
                                textAlign: { inDropdown: true },
                                link: { inDropdown: false },
                            }}
                            onEditorStateChange={this.onActivityEndMailDecStateChange}
                        />
                        <div><span className="text-danger">{this.state.activityEndMailDescAEV}</span></div>
                        <FormControlLabel
                            value="ActEnd"
                            control={<Checkbox color="primary" name='activityAutoMailOnEnd' checked={this.state.ActivityEmailTemplate.activityAutoMailOnEnd} onChange={this.handleCBchange} />}
                            label="Auto Mail for Activity End"
                        />
                    </div>
                </Col>
            </Row>
        );
    }
}

export default EmailTemplate;
