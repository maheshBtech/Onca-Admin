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
                                </ol>
                            </div>
                        </Col>
                        {/* <Col sm={6} className="text-right">
                            <Link to="/user-profile">
                                Table
                            </Link>
                            <Link to="/users-list-tile">
                                Tile
                            </Link>
                        </Col> */}
                    </Row>
                    <Card className="mini-stat">
                        <CardBody>
                            <Row>
                                <Col lg={12}>
                                    <Row>
                                        <Col lg={3}>
                                            <div className="form-group">
                                                <Label for="act-type">Category Name</Label>
                                                <Autocomplete />
                                            </div>
                                        </Col>
                                        <Col lg={3}>
                                            <div className="form-group">
                                                <Label for="act-type">Sub Category Name</Label>
                                                <Autocomplete />
                                            </div>
                                        </Col>
                                        <Col lg={3}>
                                            <div className="form-group">
                                                <Label for="act-type">Brand Name</Label>
                                                <Autocomplete />
                                            </div>
                                        </Col>
                                        <Col lg={3}>
                                            <div className="form-group">
                                                <button className="btn btn-block update-btn mt-2-5">
                                                    Filter Record
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