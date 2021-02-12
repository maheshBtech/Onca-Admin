import React, { Component } from "react";
import { Link } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Chip from "@material-ui/core/Chip";
import Select from "react-select";
import Autocomplete from "./Autocomplete";
import {
  Row,
  Col,
  Form,
  Card,
  Label,
  Input,
  CardBody,
  CardHeader,
} from "reactstrap";

const optionGroup = [
  { label: "Mustard", value: "Mustard", id: 1 },
  { label: "Ketchup", value: "Ketchup", id: 2 },
  { label: "Relish", value: "Relish", id: 3 },
];
class EventConnectivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      duration_checkbox: false,
      activityTypeList: [],
      ActivityConnectivity: { ...this.props.ActivityConnectivity },
    };

    this.handleCBchange = this.handleCBchange.bind(this);
    this.handleACChange = this.handleACChange.bind(this);
  }
  // using to send back the update object
  componentDidUpdate(prevProps, prevState) {
    if (prevState.ActivityConnectivity !== this.state.ActivityConnectivity) {
      this.props.handleActivityConnectivity(this.state.ActivityConnectivity);
    }
  }
  // handle all checkbox
  handleCBchange = (event) => {
    let fname = event.target.name;
    let fvalue = event.target.checked;
    this.setState((prevState) => ({
      ActivityConnectivity: {
        ...prevState.ActivityConnectivity,
        [fname]: fvalue,
      },
    }));
  };
  // handle all dropdowns
  handleACChange = (value, name) => {
    this.setState((prevState) => ({
      ActivityConnectivity: {
        ...prevState.ActivityConnectivity,
        [name]: value,
      },
    }));
  };

  render() {
    return (
      <Row>
        <Col lg={12}>
          <Form>
            <Card className="mini-stat">
              <CardHeader className="bl-bg text-white justify-item-center ">
                <b>Connectivity</b>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col lg={6}>

                    <div className="form-group mb-0">
                      <Label for="name">Activity Mode</Label>
                      <Col lg={12}>
                        <FormControlLabel
                          value="personalBest"
                          control={
                            <Checkbox
                              color="primary"
                              name="activityModeLive"
                              checked={
                                true
                              }
                            // onChange={this.handleCBchange}
                            />
                          }
                          label="Live"
                        />
                        <FormControlLabel
                          value="firstRun"
                          control={
                            <Checkbox
                              color="primary"
                              name="activityModeOnline"
                              checked={false}
                            // onChange={this.handleCBchange}
                            />
                          }
                          label="Online"
                        />
                        <FormControlLabel
                          value="firstRun"
                          control={
                            <Checkbox
                              color="primary"
                              name="activityModeOnGround"
                              checked={false}
                            // onChange={this.handleCBchange}
                            />
                          }
                          label="Ground"
                        />
                      </Col>
                    </div>
                    <div className="form-group mb-0">
                      <Label for="name">E-Certificate</Label>
                      <Col lg={12}>
                        <FormControlLabel
                          value="personalBest"
                          control={
                            <Checkbox
                              color="primary"
                              name="activityECertificate"
                              checked={false}
                            // onChange={this.handleCBchange}
                            />
                          }
                          label="E-Certificate"
                        />
                      </Col>
                      {/* {this.state.ActivityConnectivity.activityECertificate ===
                        true ? (
                          <div className="form-group">
                            <Label for="name">
                              Choose E-Certificate Template
                          </Label>
                            <Autocomplete
                              name="activityECertificateTemplate"
                              value={
                                this.state.ActivityConnectivity
                                  .activityECertificateTemplate
                              }
                              DataList={optionGroup}
                              ACType="Activity E-Certificate Template"
                              handleACChange={this.handleACChange}
                            />
                          </div>
                        ) : null} */}
                    </div>
                  </Col>
                  <Col lg={6}>
                    <h5>Choose Registration Template</h5>
                    <Label>Activity Type</Label>

                    <div className="form-group mt-4">
                      <Label for="name">Choose Registration Template</Label>
                      <Autocomplete
                        name="activityRegistrationTemplate"
                        value={
                          this.state.ActivityConnectivity
                            .activityRegistrationTemplate
                        }
                        DataList={optionGroup}
                        ACType="Activity Registration Template"
                        handleACChange={this.handleACChange}
                      />
                    </div>

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

export default EventConnectivity;
