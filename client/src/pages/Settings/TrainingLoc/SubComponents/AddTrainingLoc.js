import React, { Component } from 'react';
import { Row, Col, Label, Input, Form } from "reactstrap";
import Select from "react-select";
import { Link } from "react-router-dom";

///Using hooks to set the data for the CSV Download and search
class AddTrainingLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFiles: []

        };
    }

    render() {
        const { CountryName } = this.state;
        return (
            <div className="modal-body">
                <div className="row">
                    <div className="col-sm-12">
                        {this.props.trainingLocationForm.Err ?
                            (<div class="alert alert-danger" role="alert" >
                                {this.props.trainingLocationForm.Err}
                                {/* User Type &amp; Discount not assigned. */}
                            </div>
                            ) : null}
                        {this.props.trainingLocationForm.ShowSuccessMessage ?
                            (<div class="alert alert-success" role="alert">
                                {/* User Type &amp; Discount created successfully. */}
                                {this.props.trainingLocationForm.ShowSuccessMessage}
                            </div>) : null}
                    </div>
                </div>
                <Form >
                    <Row>
                        <Col lg={12}>
                            <div className="form-group mb-3">
                                <Label for="name">Country Name <span className="text-danger">*</span></Label>
                                <Select id="CountryName" name="CountryName"
                                    value={this.props.trainingLocationForm.CountryNameOption}
                                    onChange={this.props.handleChangeSelectedOptionCountry}
                                    options={this.props.countryOptionGroup}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <Label for="name">State Name <span className="text-danger">*</span></Label>
                                <Select id="StateName" name="StateName"
                                    value={this.props.trainingLocationForm.StateNameOption}
                                    onChange={this.props.handleChangeSelectedOptionState}
                                    options={this.props.stateOptionGroup}
                                />
                            </div>
                            <div className="form-group">
                                <Label for="name">City Name <span className="text-danger">*</span></Label>
                                <Select id="CityName" name="CityName"
                                    value={this.props.trainingLocationForm.CityNameOption}
                                    onChange={this.props.handleChangeSelectedOptionCity}
                                    options={this.props.cityOptionGroup}
                                />
                            </div>
                            <div className="form-group mb-3">
                                < Label for="name">Location Name <span className="text-danger">*</span></Label>
                                <Input type="text" name="LocationName" id="LocationName"
                                    placeholder="Enter LocationName"
                                    onChange={this.props.handleChange}
                                    value={this.props.trainingLocationForm.LocationName}
                                />
                            </div>
                            <div className="form-group">
                                <Label for="name">Location Code <span className="text-danger">*</span></Label>
                                <Input type="text" name="LocationCode" id="LocationCode"
                                    placeholder="Enter LocationCode"
                                    onChange={this.props.handleChange}
                                    value={this.props.trainingLocationForm.LocationCode}
                                    maxLength='4'
                                />

                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <button className="btn btn-block update-btn font" type="submit" onClick={this.props.handleSubmit} >
                                Submit
                            </button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }

}

export default AddTrainingLocation;