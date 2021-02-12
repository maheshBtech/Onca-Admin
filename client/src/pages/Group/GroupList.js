import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import ReactDOM from 'react-dom';
import React, { Component } from "react";
import {
    Row,
    Col,
    Card,
    CardBody,
    CardHeader,
    Form
} from "reactstrap";
import { Link } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import GroupNameService from './SubComponent/GroupNameService';
import { ColumnGroup } from 'primereact/columngroup';
import { Button } from 'primereact/button';
import CreateGroupForm from './SubComponent/CreateGroupForm';
import SplitTime from './SubComponent/SplitTime';

class GroupList extends Component {
    constructor(props) {
        super(props);
        //debugger;
        this.state = {
            GroupNameService: [],
            GroupList: [],
            SelectedGroupList: [],
            GroupListRowData: props.location.state.GroupListRowData,


            GroupForm: {
                GroupName: "",
                GroupDescription:"",
                AssignCaption:"",
                RowOrderData: "",
                PreviousOrderData: ""
              },
        };


        this.columns = [
            { field: 'Group_Name', header: 'Group Name' },
            { field: 'M-10k', header: 'Name' },
            { field: 'M-HM', header: 'Category' },
            { field: 'M-FM', header: 'Quantity' },
            { field: 'F-10k', header: '10K Time' },
            { field: 'F-HM', header: 'HM Time' },
            { field: 'F-FM', header: 'FM Time' },
        ];
        this.GroupNameService = new GroupNameService();
        
        this.SplitGroup = this.SplitGroup.bind(this);
        this.EditGroup = this.EditGroup.bind(this);
        this.MergeGroup = this.MergeGroup.bind(this);
    }

    //This is for the split group
    SplitGroup  =(e,rowData) =>{
        console.log(rowData);
    }

    //this for the edit group
    EditGroup =(e,rowData)=> {
        //debugger;
        this.setState({
            GroupForm: {
                GroupName: rowData.Group_Name,
                GroupDescription:"",
                AssignCaption:"",
                RowOrderData: rowData,
                PreviousOrderData: ""
            },
          });
    }

    //This is for the merge group
    MergeGroup = (e,rowData) => {
        console.log(rowData);
    }

    componentDidMount() {
       
    }
    actionBodyTemplate(rowData,globalThis) {
        return (
            <React.Fragment>
                <Button className="btn update-btn mr-2" onClick={(event) =>  globalThis.data.SplitGroup(event,rowData)}>Split</Button>
                <Button className="btn btn-primary mr-2" onClick={(event) =>  globalThis.data.EditGroup(event,rowData)}>Edit</Button>
                <Button className="btn btn-danger mr-2" onClick={(event) =>  globalThis.data.MergeGroup(event,rowData)}>Merge</Button>
            </React.Fragment>
        );
    }
    // inMemData = [
    //     {
    //         "grpName": "Group Name",
    //         "M-10K": "00:35:00 - 10:00:00",
    //         "M-HM": "01:00:00 - 10:00:00",
    //         "M-FM": "02:00:00 - 10:00:00",
    //         "F-10K": "00:45:00 - 10:00:00",
    //         "F-HM": "01:10:00 - 10:00:00",
    //         "F-FM": "02:10:00 - 10:00:00",
    //     },
    //     {
    //         "grpName": "HDHM20 Indira",
    //         "M-10K": "01:00:01 - 01:20:00",
    //         "M-HM": "02:00:01 - 02:30:00",
    //         "M-FM": "04:30:01 - 05:00:00",
    //         "F-10K": "01:10:01 - 01:30:00",
    //         "F-HM": "02:18:01 - 02:40:00",
    //         "F-FM": "05:00:01 - 05:30:00",
    //     },
    //     {
    //         "grpName": "HDHM20 Luis",
    //         "M-10K": "01:20:01 - 01:40:00",
    //         "M-HM": "02:30:01 - 03:00:00",
    //         "M-FM": "05:00:01 - 05:30:00",
    //         "F-10K": "00:45:01 - 10:00:00",
    //         "F-HM": "01:10:01 - 10:00:00",
    //         "F-FM": "02:10:01 - 10:00:00",
    //     }
    // ]

    render() {
        let headerGroup = <ColumnGroup>
            <Row>
                <Column header="" colSpan={1} />
                <Column header="Male" colSpan={3} />
                <Column header="Female" colSpan={3} />
                <Column header="" colSpan={1} />
            </Row>
            <Row>
                <Column header="Group Name" />
                <Column header="10K Time" />
                <Column header="HM Time" />
                <Column header="FM Time" />
                <Column header="10K Time" />
                <Column header="HM Time" />
                <Column header="FM Time" />
                <Column header="Action" />
            </Row>
        </ColumnGroup>;
        const dynamicColumns = this.columns.map((col, i) => {
            return <Column key={col.field} field={col.field} header={col.header} />;
        });
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <Row className="align-items-center">
                        <Col sm={6}>
                            <div className="page-title-box">
                                <ol className="breadcrumb mb-0">
                                    <li className="breadcrumb-item">
                                        <Link to="/#">Activity</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <Link to="/group">Group Set</Link>
                                    </li>
                                    <li className="breadcrumb-item active">Group List</li>
                                </ol>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12} className="text-right">s
                            <Link to="/group" className="btn update-btn mb-3">
                                Back
                            </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <Card className="mini-stat">
                                <CardHeader className="bl-bg text-white">
                                    <b>Group List</b>
                                </CardHeader>
                                <CardBody>
                                    <DataTable value={this.state.GroupListRowData.orders} headerColumnGroup={headerGroup}>
                                        {dynamicColumns}
                                        <Column header="Action" body={this.actionBodyTemplate} data={this}></Column>
                                    </DataTable>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Form>
                        <Row>
                            <Col lg={12}>
                                <Card className="mini-stat">
                                    <CardHeader className="bl-bg text-white">
                                        <b>Add New Group</b>
                                    </CardHeader>
                                    <CardBody>
                                        <Row>
                                            <Col lg={7}>
                                                <SplitTime handleSubmit={this.handleSubmit}
                                                handleChange={this.handleChange}
                                                groupForm={this.state.GroupForm}
                                                />
                                            </Col>
                                            <Col lg={5}>
                                                <CreateGroupForm 
                                                handleSubmit={this.handleSubmit}
                                                handleChange={this.handleChange}
                                                groupForm={this.state.GroupForm}
                                                />
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12}>
                                <button className="btn update-btn">
                                    Create Group
                                </button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </React.Fragment>
        );
    }
}

export default GroupList;
