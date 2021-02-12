import React, { Component } from "react";
import {
    Row,
    Col,
    Card,
    CardBody,
    CardHeader,
    CardFooter
} from "reactstrap";
import Rating from "react-rating";
import { Link } from "react-router-dom";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


class ProviderCardTile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
                                        <Link to="/provider">Provider</Link>
                                    </li>
                                    <li className="breadcrumb-item active">Provider Tiles</li>
                                </ol>
                            </div>
                        </Col>

                        <Col sm="6">
                            <div className="float-right d-none d-md-block">
                                <Link to="/provider" className="btn update-btn">
                                    Back
                                </Link>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={3} md={6}>
                            <Card className="mini-stat">
                                <CardHeader className="gray-bg">
                                <FormControlLabel
                                    value="top"
                                    control={<Checkbox color="primary" />}
                                    label="Mumbai Runners"
                                />
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col xl="7">
                                            <h4 className="font-weight-medium font-size-16">
                                                <b>128</b>
                                            </h4>
                                            <h4 className="font-weight-medium font-size-11">
                                                Total Active Users
                                            </h4>
                                        </Col>
                                        <Col xl="5">
                                            <label className="status-lbl font-size-12 bg-red text-white">
                                                Monthly
                                            </label>
                                            <h4 className="font-weight-medium font-size-12 text-center">
                                                20%
                                                <i className="mdi mdi-arrow-down text-danger font-size-14 ml-2"></i>
                                            </h4>
                                        </Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Col xl="5 pr-0">
                                            <p className="font-size-10">Customer Ratings</p>
                                        </Col>
                                        <Col xl="7 pr-0">
                                            <Rating
                                                stop={5}
                                                emptySymbol="mdi mdi-star fa-1x text-muted"
                                                fullSymbol={[
                                                    "mdi mdi-star fa-1x text-primary",
                                                    "mdi mdi-star fa-1x text-primary",
                                                    "mdi mdi-star fa-1x text-primary",
                                                    "mdi mdi-star fa-1x text-primary"
                                                ]}
                                                readonly={true}
                                                initialRating={3}
                                            />
                                            <span className="font-size-11">(48,520)</span>
                                        </Col>
                                    </Row>
                                </CardBody>
                                <CardFooter>
                                    <span className="font-12">2 days ago</span>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        );
    }
}

export default ProviderCardTile;
