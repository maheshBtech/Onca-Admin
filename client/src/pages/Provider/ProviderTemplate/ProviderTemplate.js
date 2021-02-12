import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Row, Col, Label, Input, } from "reactstrap";
import { Card, CardBody, CardHeader, Button } from "reactstrap";
import DataTable from 'react-data-table-component';
import MultiChipSelect from "../SubComponent/MultiChipSelect";
import { Modal } from "reactstrap";
const roleData = [
    {
        id: 1,
        MemberName: 'Prasad Rao',
        EmailID: 'pachchu@gmail.com',
        PhNumber: 9845726002,
        Role: 'Admin'
    },
    {
        id: 2,
        MemberName: 'Lingamani',
        EmailID: 'lingamani3005@gmail.com',
        PhNumber: 9952721161,
        Role: 'Admin'
    },
    {
        id: 3,
        MemberName: 'Coach Pramod',
        EmailID: 'pramodvdeshpande@hotmail.com',
        PhNumber: 9986071806,
        Role: 'Admin'
    },
    {
        id: 4,
        MemberName: 'Ajay Jaishankar J',
        EmailID: 'ajayjaishankar@gmail.com',
        PhNumber: 9900055108,
        Role: 'Admin, Marketing'
    },
    {
        id: 5,
        MemberName: 'Deepak Kumar',
        EmailID: 'deepak.kumar@securexpert.in',
        PhNumber: 8317377694,
        Role: 'Admin'
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
        name: 'Member Name',
        selector: 'MemberName',
        sortable: true,
        maxWidth: "160px"
    },
    {
        name: 'Email ID',
        selector: 'EmailID',
        sortable: true,
        maxWidth: "200px"
    },
    {
        name: 'Phone Number',
        selector: 'PhNumber',
        sortable: true,
        maxWidth: "200px"
    },
    {
        name: 'Role',
        selector: 'Role',
        sortable: true,
        wrap: true,
        allowOverflow: true,
        maxWidth: "150px"
    },
    {
        name: 'Action',
        cell: () => <Button variant="contained" color="light">Update</Button>,
        button: true,
    },
    {
        cell: () => <Button variant="contained" color="success">Activate</Button>,
        button: true,
    },
    {
        cell: () => <Button variant="contained" color="light">Remove</Button>,
        button: true,
    },
];
class RoleTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_center: false,
            modal_scroll: false
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
    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">
                <Row className="align-items-center">
                    <Col sm={6}>
                        <div className="page-title-box">
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item">
                                    <Link to="/role">Role</Link>
                                </li>
                                <li className="breadcrumb-item active">
                                    Finance
                                </li>
                            </ol>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xl={12} className="text-right mb-4">
                        <button
                            type="button"
                            className="btn update-btn font"
                            onClick={this.add_member}
                            data-toggle="modal"
                            data-target=".bs-example-modal-center"
                        >
                            Add New Member
                        </button>
                        <Link to="/role">
                            <span role="button" className="btn update-btn font ml-3">
                                Back
                            </span>
                        </Link>
                        <Modal
                            isOpen={this.state.modal_center}
                            toggle={this.add_member}
                        >
                            <div className="modal-header">
                                <h5 className="modal-title mt-0">Invite New Member</h5>
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
                                <div className="col-sm-12">
                                    <div className="form-group row">
                                        <Label for="name">Email ID</Label>
                                        <Input type="email" id="email" />
                                    </div>
                                    <div className="form-group row">
                                        <Label for="name">Phone Number</Label>
                                        <Input type="number" id="number" />
                                    </div>
                                    <div className="form-group row">
                                        <Label for="name">Role</Label>
                                        <MultiChipSelect />
                                    </div>
                                    <div className="form-group row">
                                        <button className="btn btn-block update-btn font">
                                            Assign Role
                                  </button>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    </Col>
                </Row>
                <Row>
                    <Col xl={12}>
                    <Card className="mini-stat">
                        <CardHeader className="bl-bg">
                            <Link to="#" className="text-white">
                                <b>Finance Role Data</b>
                            </Link>
                            <span className="float-right">
                                Latest 10 Log
                        </span>
                        </CardHeader>
                        <CardBody>
                            <DataTable
                                className="data-table"
                                columns={columns}
                                data={roleData}
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
        )
    }
}

export default withRouter(RoleTemplate);