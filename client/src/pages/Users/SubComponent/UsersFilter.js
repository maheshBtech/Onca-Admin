import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Autocomplete from "./Autocomplete";
import { Link } from "react-router-dom";
import {
    Card,
    Row,
    Col,
    CardBody,
    CardHeader,
    Label
} from "reactstrap";

class UsersFilter extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <Row className="align-items-center">
                        <Col sm={6}>
                            <div className="page-title-box">
                                <ol className="breadcrumb mb-0">
                                    <li className="breadcrumb-item active">
                                        Users
                                    </li>
                                </ol>
                            </div>
                        </Col>
                        <Col sm={6} className="text-right">
                            <Link to="/users">
                                <i class="fa fa-table font-size-24" aria-hidden="true"></i>
                            </Link>
                            <Link to="/users-list-tile">
                                <i class="fa fa-th font-size-24 ml-3" aria-hidden="true"></i>
                            </Link>
                        </Col>
                    </Row>
                    <Card className="mini-stat">
                        <CardBody>
                            <Row>
                                <Col lg={12}>
                                    <Row>
                                        <Col lg={3}>
                                            <div className="form-group">
                                                <Label for="act-type">User Status</Label>
                                                <Autocomplete />
                                            </div>
                                        </Col>
                                        <Col lg={3}>
                                            <div className="form-group">
                                                <Label for="act-type">Location</Label>
                                                <Autocomplete />
                                            </div>
                                        </Col>
                                        <Col lg={3}>
                                            <div className="form-group">
                                                <Label for="act-type">Activity</Label>
                                                <Autocomplete />
                                            </div>
                                        </Col>
                                        <Col lg={3}>
                                            <div className="form-group text-right">
                                                <button className="btn w-50 update-btn mt-2-5">
                                                    Filter Record
                                                </button>
                                                <button className="btn update-btn mt-2-5 ml-2">
                                                    Reset
                                                </button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(UsersFilter);