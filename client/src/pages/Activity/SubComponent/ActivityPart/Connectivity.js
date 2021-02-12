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
      activityTypeList: [],
      ActivityConnectivity: { ...this.props.ActivityConnectivity },
      activityRegistrationTemplateList: [],
      activityRegSuccessMailTemplateList: [],
      activityRegFailMailTemplateList: [],
    };
    
    this.handleCBchange = this.handleCBchange.bind(this);
    this.handleACChange = this.handleACChange.bind(this);
  }
  // using to send back the update object
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.ActivityConnectivity !== this.props.ActivityConnectivity) {
      this.setState({ ActivityConnectivity: this.props.ActivityConnectivity })
    }
    if (prevState.ActivityConnectivity !== this.state.ActivityConnectivity) {
      this.props.handleActivityConnectivity(this.state.ActivityConnectivity);
    }
    if(prevProps.RegistrationTemplateList !== this.props.RegistrationTemplateList){
      this.setState({activityRegistrationTemplateList: this.props.RegistrationTemplateList.filter(elem => elem.Template_Type_ID === 7)})
      this.setState({activityRegSuccessMailTemplateList: this.props.RegistrationTemplateList.filter(elem => elem.Template_Type_ID === 8)})
      this.setState({activityRegFailMailTemplateList: this.props.RegistrationTemplateList.filter(elem => elem.Template_Type_ID === 9)})
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
        <Col lg={6}>
          <div className="form-group mb-0">
            <Label for="name">Chat Status</Label>
            <Col lg={12}>
              <FormControlLabel
                value="personalBest"
                control={
                  <Checkbox
                    color="primary"
                    name="activityChat"
                    checked={this.state.ActivityConnectivity.activityChat}
                    onChange={this.handleCBchange}
                  />
                }
                label="Activity Chat"
              />
              <FormControlLabel
                value="firstRun"
                control={
                  <Checkbox
                    color="primary"
                    name="activityGroupChat"
                    checked={this.state.ActivityConnectivity.activityGroupChat}
                    onChange={this.handleCBchange}
                  />
                }
                label="Group Chat"
              />
            </Col>
          </div>
          <div className="form-group mb-0">
            <Label for="name">Activity Mode</Label>
            <Col lg={12}>
              <FormControlLabel
                value="personalBest"
                control={
                  <Checkbox
                    color="primary"
                    name="activityModeLive"
                    checked={this.state.ActivityConnectivity.activityModeLive}
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
                    name="activityModeOnline"
                    checked={this.state.ActivityConnectivity.activityModeOnline}
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
                    name="activityModeOnGround"
                    checked={
                      this.state.ActivityConnectivity.activityModeOnGround
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
                    name="activityECertificate"
                    checked={
                      this.state.ActivityConnectivity.activityECertificate
                    }
                    onChange={this.handleCBchange}
                  />
                }
                label="E-Certificate"
              />
            </Col>
            {this.state.ActivityConnectivity.activityECertificate === true ? (
              <div className="form-group">
                <Label for="name">Choose E-Certificate Template</Label>
                <Autocomplete
                  name="activityECertificateTemplate"
                  value={
                    this.state.ActivityConnectivity.activityECertificateTemplate
                  }
                  DataList={optionGroup}
                  ACType="Activity E-Certificate Template"
                  handleACChange={this.handleACChange}
                />
              </div>
            ) : null}
          </div>
        </Col>
        <Col lg={6}>
          <h5>Choose Registration Template</h5>
          <Label>Activity Type</Label>
          <Col lg={12} className="pl-0 mt-2">
            {this.props.SelectedActivityType !== "" ? (
              <Chip label={this.props.SelectedActivityType} />
            ) : null}
          </Col>
          <div className="form-group mt-4">
            <Label for="name">Choose Registration Template</Label>
            <Autocomplete
              name="activityRegistrationTemplate"
              value={
                this.state.ActivityConnectivity.activityRegistrationTemplate
              }
              DataList={this.state.activityRegistrationTemplateList}
              ACType="Activity Registration Template"
              handleACChange={this.handleACChange}
            />
          </div>
          {this.state.ActivityConnectivity.activityRegistrationTemplate !==
          0 ? (
            <div>
              <h5>Registration Mail Template</h5>
              <div className="form-group mt-4">
                <Label for="name">
                  Choose Registration Success Mail Template
                </Label>
                <Autocomplete
                  name="activityRegSuccessMailTemplate"
                  value={
                    this.state.ActivityConnectivity
                      .activityRegSuccessMailTemplate
                  }
                  DataList={this.state.activityRegSuccessMailTemplateList}
                  ACType="Activity Registration Success Mail Template"
                  handleACChange={this.handleACChange}
                />
              </div>
              <div className="form-group mt-4">
                <Label for="name">
                  Choose Registration Failure Mail Template
                </Label>
                <Autocomplete
                  name="activityRegFailMailTemplate"
                  value={
                    this.state.ActivityConnectivity.activityRegFailMailTemplate
                  }
                  DataList={this.state.activityRegFailMailTemplateList}
                  ACType="Activity Registration Fail Mail Template"
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
