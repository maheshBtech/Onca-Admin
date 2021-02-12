import React, { Component } from "react";
import { Link } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";


import {
    Row,
    Col,
    Form,
    Card,
    Label,
    Input,
    CardBody,
    CardHeader,
    Button
} from "reactstrap";

class EventPricing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Locations: [
                { location: "Banglore" },
                { location: "Hyderabad" },
                { location: "Chennai" },

            ]
        };

    }
    render() {
        return (
            <Row>
                <Col lg={12}>
                    <Form>
                        <Card className="mini-stat">
                            <CardHeader className="bl-bg text-white justify-item-center ">
                                <b>Event Pricing</b>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col lg={6}>
                                        <Row>
                                            <Col lg={6}>
                                                <div className="form-group">

                                                    <Label for="price">
                                                        Price <spam className="text-danger"> *</spam>
                                                    </Label>
                                                    <Input
                                                        type="number"
                                                        name="price"
                                                        placeholder="Enter Price"
                                                        id="price"
                                                    />
                                                </div>


                                            </Col>

                                            <Col lg={6}>
                                                <div className="form-group">
                                                    <Label for="tax">
                                                        Tax <spam className="text-danger"> *</spam>
                                                    </Label>
                                                    <Input
                                                        type="number"
                                                        placeholder="Enter Tax"
                                                        id="tax"
                                                        name="tax"
                                                    />
                                                </div>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col lg={12}>
                                                <div className="form-group"></div>
                                                <Label>Enter Location <spam className="text-danger"> *</spam></Label>
                                                <Autocomplete
                                                    options={this.state.Locations}
                                                    onInputChange={(event, value) => {
                                                        this.props.handleTopicNameChange(value);
                                                    }}
                                                    getOptionLabel={(option) => option.location}
                                                    renderInput={(params) => (
                                                        <div ref={params.InputProps.ref}>
                                                            <input
                                                                placeholder="Select Topic"
                                                                value={this.state.Locations.location}
                                                                type="text"
                                                                {...params.inputProps}
                                                            />
                                                        </div>
                                                    )}
                                                />
                                            </Col>


                                        </Row>




                                    </Col>
                                </Row>

                            </CardBody>
                        </Card>
                    </Form>
                </Col>
            </Row>

        );
    }
}

export default EventPricing;
