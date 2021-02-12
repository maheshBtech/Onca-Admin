import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import {
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Card,
    Row,
    Col,
    CardBody,
    CardHeader,
} from "reactstrap";
import classnames from "classnames";
import { Modal } from "reactstrap";
import CreateActivity from "./CreateActivity";
import ActivitySchedule from "./ActivitySchedule";
import CreateAOD from "./CreateAOD";
import DataTable, { createTheme } from 'react-data-table-component';
// Activity Templates
const ActivityTemplatesData = [
    {
        id: 1,
        ActivityTemplates: 'Activity Template 1',
    },
    {
        id: 2,
        ActivityTemplates: 'Activity Template 2',
    },
    {
        id: 3,
        ActivityTemplates: 'Activity Template 3',
    },
    {
        id: 4,
        ActivityTemplates: 'Activity Template 4',
    },
    {
        id: 5,
        ActivityTemplates: 'Activity Template 5',
    }
];
const ActivityHeaderStyle = {
    headCells: {
        style: {
            backgroundColor: "#EDECEC",
        },
    },
};
const ActivityColumns = [
    {
        name: 'Activity Templates Name',
        selector: 'ActivityTemplates',
        sortable: true,
        wrap: true
    },

];

// AOD Template
const AODTemplateData = [
    {
        id: 1,
        AODTemplates: 'AODs Template 1',
    },
    {
        id: 2,
        AODTemplates: 'AODs Template 2',
    },
    {
        id: 3,
        AODTemplates: 'AODs Template 3',
    },
    {
        id: 4,
        AODTemplates: 'AODs Template 4',
    },
    {
        id: 5,
        AODTemplates: 'AODs Template 5',
    }
];
const AODHeaderStyle = {
    headCells: {
        style: {
            backgroundColor: "#EDECEC",
        },
    },
};
const AODColumns = [
    {
        name: 'AOD Templates Name',
        selector: 'AODTemplates',
        sortable: true,
        wrap: true
    },

];

class NewActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_AOD: false,
            modal_Activity: false,
            modal_scroll: false,
            customActiveTab: "1",
            aodToggelStatus: true,
            stateData: {
                isFromUpdate: false
            },
        };
        this.add_activity = this.add_activity.bind(this);
        this.add_AOD = this.add_AOD.bind(this);
        this.tog_scroll = this.tog_scroll.bind(this);
        this.aodToggelCheck = this.aodToggelCheck.bind(this);
    }
    aodToggelCheck(aodCheckValue){
        this.setState({aodToggelStatus: aodCheckValue})
    }
    removeBodyCss() {
        document.body.classList.add("no_padding");
    }
    add_activity() {
        this.setState(prevState => ({
            modal_Activity: !prevState.modal_Activity
        }));
        this.removeBodyCss();
    }
    add_AOD() {
        this.setState(prevState => ({
            modal_AOD: !prevState.modal_AOD
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
        if(this.state.aodToggelStatus === true){
            if (this.state.customActiveTab !== tab) {
                this.setState({
                    customActiveTab: tab
                });
            }
        }
        // if (this.state.customActiveTab !== tab) {
        //     this.setState({
        //         customActiveTab: tab
        //     });
        // }
    }
    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <Row className="align-items-center">
                        <Col sm={6}>
                            <div className="page-title-box">
                                <ol className="breadcrumb mb-0">
                                    <li className="breadcrumb-item">
                                        <Link to="/activity">Activity</Link>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        New Activity
                                    </li>
                                </ol>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={12} className="text-right mb-4">
                            {this.state.customActiveTab === "1" ?
                                <button
                                type="button"
                                className="btn update-btn font"
                                onClick={this.add_activity}
                                data-toggle="modal"
                                data-target=".bs-example-modal-center"
                            >
                                New Activity From Template
                            </button>:null}                       
                            {this.state.customActiveTab === "3"?
                            <button
                            type="button"
                            className="btn update-btn font ml-3"
                            onClick={this.add_AOD}
                            data-toggle="modal"
                            data-target=".bs-example-modal-center"
                        >
                            New AOD From Template
                        </button>
                            :null}
                            
                            <Link to="/activity">
                                <span role="button" className="btn update-btn font ml-3">
                                    Back
                                </span>
                            </Link>
                            <Modal
                                isOpen={this.state.modal_Activity}
                                toggle={this.add_activity}
                            >
                                <div className="modal-header">
                                    <h5 className="modal-title mt-0">Activity Template</h5>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            this.setState({ modal_Activity: false })
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
                                            <b>Activity Template List</b>
                                        </CardHeader>
                                        <CardBody>
                                            <DataTable
                                                className="data-table"
                                                columns={ActivityColumns}
                                                data={ActivityTemplatesData}
                                                noHeader={true}
                                                customStyles={ActivityHeaderStyle}
                                                fixedHeader
                                                fixedHeaderScrollHeight="300px"
                                                pagination
                                                selectableRows
                                            />
                                            <button className="btn btn-block update-btn font mt-3">
                                                Select Template
                                            </button>
                                        </CardBody>
                                    </Card>
                                </div>
                            </Modal>
                            <Modal
                                isOpen={this.state.modal_AOD}
                                toggle={this.add_AOD}
                            >
                                <div className="modal-header">
                                    <h5 className="modal-title mt-0">AOD Template</h5>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            this.setState({ modal_AOD: false })
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
                                            <b>AOD Template List</b>
                                        </CardHeader>
                                        <CardBody>
                                            <DataTable
                                                className="data-table"
                                                columns={AODColumns}
                                                data={AODTemplateData}
                                                noHeader={true}
                                                customStyles={AODHeaderStyle}
                                                fixedHeader
                                                fixedHeaderScrollHeight="300px"
                                                pagination
                                                selectableRows
                                            />
                                            <button className="btn btn-block update-btn font mt-3">
                                                Select Template
                                            </button>
                                        </CardBody>
                                    </Card>
                                </div>
                            </Modal>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={12}>
                            <Card className="activity-card">
                                <CardBody>
                                    <Nav tabs className="nav-tabs-custom">
                                        <NavItem>
                                            <NavLink
                                                className={classnames({
                                                    active: this.state.customActiveTab === "1"
                                                })}
                                                onClick={() => {
                                                    this.toggleCustom("1");
                                                }}
                                            >
                                                <span className="d-none d-sm-block">New Activity</span>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({
                                                    active: this.state.customActiveTab === "2"
                                                })}
                                                onClick={() => {
                                                    this.toggleCustom("2");
                                                }}
                                            >
                                                <span className="d-none d-sm-block">AOD Schedule</span>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({
                                                    active: this.state.customActiveTab === "3"
                                                })}
                                                onClick={() => {
                                                    this.toggleCustom("3");
                                                }}
                                            >
                                                <span className="d-none d-sm-block">Create AOD</span>
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                    <TabContent activeTab={this.state.customActiveTab}>
                                        <TabPane tabId="1">
                                            <CreateActivity isFromUpdate aodToggelCheck={this.aodToggelCheck}/>
                                        </TabPane>
                                        <TabPane tabId="2">
                                            <Row>
                                                <Col sm="12">
                                                    <Card className="inner-card">
                                                        <CardHeader className="bl-bg">
                                                            <Link to="#" className="text-white">
                                                                <b>Activity Name - AOD Schedule</b>
                                                            </Link>
                                                        </CardHeader>
                                                        <CardBody>
                                                            <ActivitySchedule />
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </TabPane>
                                        <TabPane tabId="3">
                                            <Row>
                                                <Col sm="12">
                                                    <CreateAOD />
                                                </Col>
                                            </Row>
                                        </TabPane>
                                    </TabContent>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(NewActivity);