import React, { Component } from "react";
import { Row, Col, Label } from "reactstrap";
import { Link } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Chip from "@material-ui/core/Chip";
import Select from "react-select";
import Autocomplete from "../Autocomplete";

const optionGroup = [
  { label: "Mustard", value: "Mustard", id: 1 },
  { label: "Ketchup", value: "Ketchup", id: 2 },
  { label: "Relish", value: "Relish", id: 3 },
];
class Connectivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      duration_checkbox: false,
      EventTypeList: [],
      EventConnectivity: { ...this.props.EventConnectivity },
      EventRegistrationTemplateList: [],
      EventRegSuccessMailTemplateList: [],
      EventRegFailMailTemplateList: [],
    };
    
    this.handleCBchange = this.handleCBchange.bind(this);
    this.handleACChange = this.handleACChange.bind(this);
  }
  // using to send back the update object
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.EventConnectivity !== this.props.EventConnectivity) {
      this.setState({ EventConnectivity: this.props.EventConnectivity })
    }
    if (prevState.EventConnectivity !== this.state.EventConnectivity) {
      this.props.handleEventConnectivity(this.state.EventConnectivity);
    }
    if(prevProps.RegistrationTemplateList !== this.props.RegistrationTemplateList){
      this.setState({EventRegistrationTemplateList: this.props.RegistrationTemplateList.filter(elem => elem.Template_Type_ID === 7)})
      this.setState({EventRegSuccessMailTemplateList: this.props.RegistrationTemplateList.filter(elem => elem.Template_Type_ID === 8)})
      this.setState({EventRegFailMailTemplateList: this.props.RegistrationTemplateList.filter(elem => elem.Template_Type_ID === 9)})
    }
  }
  // handle all checkbox
  handleCBchange = (event) => {
    let fname = event.target.name;
    let fvalue = event.target.checked;
    this.setState((prevState) => ({
      EventConnectivity: {
        ...prevState.EventConnectivity,
        [fname]: fvalue,
      },
    }));
  };
  // handle all dropdowns
  handleACChange = (value, name) => {
    this.setState((prevState) => ({
      EventConnectivity: {
        ...prevState.EventConnectivity,
        [name]: value,
      },
    }));
  };

  render() {
    return (
      <Row>
        <Col lg={6}>
          <div className="form-group mb-0">
            <Label for="name">Event Mode</Label>
            <Col lg={12}>
              <FormControlLabel
                value="personalBest"
                control={
                  <Checkbox
                    color="primary"
                    name="EventModeLive"
                    checked={this.state.EventConnectivity.EventModeLive}
                    onChange={this.handleCBchange}
                  />
                }
                label="Live"
              />
              <FormControlLabel
                value="firstRun"
                control={
                  <Checkbox
                    color="primary"
                    name="EventModeOnline"
                    checked={this.state.EventConnectivity.EventModeOnline}
                    onChange={this.handleCBchange}
                  />
                }
                label="Online"
              />
              <FormControlLabel
                value="firstRun"
                control={
                  <Checkbox
                    color="primary"
                    name="EventModeOnGround"
                    checked={
                      this.state.EventConnectivity.EventModeOnGround
                    }
                    onChange={this.handleCBchange}
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
                    name="EventECertificate"
                    checked={
                      this.state.EventConnectivity.EventECertificate
                    }
                    onChange={this.handleCBchange}
                  />
                }
                label="E-Certificate"
              />
            </Col>
            {this.state.EventConnectivity.EventECertificate === true ? (
              <div className="form-group">
                <Label for="name">Choose E-Certificate Template</Label>
                <Autocomplete
                  name="EventECertificateTemplate"
                  value={
                    this.state.EventConnectivity.EventECertificateTemplate
                  }
                  DataList={optionGroup}
                  ACType="Event E-Certificate Template"
                  handleACChange={this.handleACChange}
                />
              </div>
            ) : null}
          </div>
        </Col>
        <Col lg={6}>
          <h5>Choose Registration Template</h5>
          <Label>Event Type</Label>
          <Col lg={12} className="pl-0 mt-2">
            {this.props.SelectedEventType !== "" ? (
              <Chip label={this.props.SelectedEventType} />
            ) : null}
          </Col>
          <div className="form-group mt-4">
            <Label for="name">Choose Registration Template</Label>
            <Autocomplete
              name="EventRegistrationTemplate"
              value={
                this.state.EventConnectivity.EventRegistrationTemplate
              }
              DataList={this.state.EventRegistrationTemplateList}
              ACType="Event Registration Template"
              handleACChange={this.handleACChange}
            />
          </div>
          {this.state.EventConnectivity.EventRegistrationTemplate !==
          0 ? (
            <div>
              <h5>Registration Mail Template</h5>
              <div className="form-group mt-4">
                <Label for="name">
                  Choose Registration Success Mail Template
                </Label>
                <Autocomplete
                  name="EventRegSuccessMailTemplate"
                  value={
                    this.state.EventConnectivity
                      .EventRegSuccessMailTemplate
                  }
                  DataList={this.state.EventRegSuccessMailTemplateList}
                  ACType="Event Registration Success Mail Template"
                  handleACChange={this.handleACChange}
                />
              </div>
              <div className="form-group mt-4">
                <Label for="name">
                  Choose Registration Failure Mail Template
                </Label>
                <Autocomplete
                  name="EventRegFailMailTemplate"
                  value={
                    this.state.EventConnectivity.EventRegFailMailTemplate
                  }
                  DataList={this.state.EventRegFailMailTemplateList}
                  ACType="Event Registration Fail Mail Template"
                  handleACChange={this.handleACChange}
                />
              </div>
            </div>
          ) : null}
        </Col>
      </Row>
    );
  }
}

export default Connectivity;
