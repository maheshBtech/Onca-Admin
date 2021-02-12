import React, { Component } from "react";
import { Link } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Editor } from "react-draft-wysiwyg";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Checkbox from "@material-ui/core/Checkbox";

import {
  Row,
  Col,
  Form,
  Card,
  Label,
  Input,
  CardBody,
  CardHeader,
  Button,
} from "reactstrap";

class EventVisibility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Locations: [
        { location: "Banglore" },
        { location: "Hyderabad" },
        { location: "Chennai" },
      ],
    };
  }
  render() {
    return (
      <Row>
        <Col lg={12}>
          <Form>
            <Card className="mini-stat">
              <CardHeader className="bl-bg text-white justify-item-center ">
                <b>Event Visibility</b>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col lg={6}>
                    <div className="form-group">
                      <Label>
                        Filter by Location{" "}
                        <spam className="text-danger"> *</spam>
                      </Label>
                      <Autocomplete
                        options={this.state.Locations}
                        onInputChange={(event, value) => {
                          this.props.handleTopicNameChange(value);
                        }}
                        getOptionLabel={(option) => option.location}
                        renderInput={(params) => (
                          <div ref={params.InputProps.ref}>
                            <input
                              placeholder="Select Country"
                              value={this.state.Locations.location}
                              type="text"
                              {...params.inputProps}
                            />
                          </div>
                        )}
                      />
                    </div>
                    <div className="form-group">
                      <Autocomplete
                        options={this.state.Locations}
                        onInputChange={(event, value) => {
                          this.props.handleTopicNameChange(value);
                        }}
                        getOptionLabel={(option) => option.location}
                        renderInput={(params) => (
                          <div ref={params.InputProps.ref}>
                            <input
                              placeholder="Select State"
                              value={this.state.Locations.location}
                              type="text"
                              {...params.inputProps}
                            />
                          </div>
                        )}
                      />
                    </div>
                    <div className="form-group">
                      <Autocomplete
                        options={this.state.Locations}
                        onInputChange={(event, value) => {
                          this.props.handleTopicNameChange(value);
                        }}
                        getOptionLabel={(option) => option.location}
                        renderInput={(params) => (
                          <div ref={params.InputProps.ref}>
                            <input
                              placeholder="Select City"
                              value={this.state.Locations.location}
                              type="text"
                              {...params.inputProps}
                            />
                          </div>
                        )}
                      />
                    </div>
                    <div className="form-group">
                      <RadioGroup
                        row
                        aria-label="users"
                        name="users"
                        defaultValue="Mobile"
                      >
                        <FormControlLabel
                          value="Mobile"
                          control={<Checkbox color="primary" />}
                          label="Mobile"
                        />
                        <FormControlLabel
                          value="Website"
                          control={<Checkbox color="primary" />}
                          label="Website"
                        />
                      </RadioGroup>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="form-group">
                      <Label>
                        {" "}
                        Event Venue Details
                        <spam className="text-danger"> *</spam>
                      </Label>
                      <Editor
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        toolbar={{
                          inline: { inDropdown: true },
                          list: { inDropdown: true },
                          textAlign: { inDropdown: true },
                          link: { inDropdown: false },
                          emoji: { inDropdown: false },
                        }}
                      />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Row>
              <Col>
                <div className="form-group">
                  <Button className="btn update-btn">Submit</Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default EventVisibility;
