import React, { Component } from "react";
import CardHeader from "reactstrap/lib/CardHeader";
import CardBody from "reactstrap/lib/CardBody";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Dropzone from "react-dropzone";
import { Editor } from "react-draft-wysiwyg";
import { Link } from "react-router-dom";
import { Row, Col, Form, Card, Label, Input } from "reactstrap";

export class EventInformation extends Component {
  constructor(props) {
    super(props);
    this.handleAcceptedFiles = this.handleAcceptedFiles.bind(this);
    this.state = { selectedFiles: [] };
  }
  handleAcceptedFiles = (files) => {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: this.formatBytes(file.size),
      })
    );

    this.setState({ selectedFiles: files });
  };

  formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  render() {
    return (
      <div>
        <Row>
          <Col lg={12}>
            <Form>
              <Card className="mini-stat">
                <CardHeader className="bl-bg text-white justify-item-center ">
                  <b>Event Information</b>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col lg={6}>
                      <div className="form-group">
                        <RadioGroup
                          row
                          aria-label="users"
                          name="users"
                          defaultValue="free"
                        >
                          <FormControlLabel
                            value="free"
                            control={<Radio color="primary" />}
                            label="Free Event"
                          />
                          <FormControlLabel
                            value="Paid"
                            control={<Radio color="primary" />}
                            label="Paid Event"
                          />
                        </RadioGroup>
                      </div>
                      <div className="form-group">
                        <Label for="eventName">
                          Event Name<spam className="text-danger"> *</spam>
                        </Label>
                        <Input
                          type="text"
                          placeholder="Enter Event Name"
                          name="eventName"
                          id="eventName"
                        />
                      </div>
                      <div className="form-group">
                        <Label for="eventName">
                          Event Activity Type<spam className="text-danger"> *</spam>
                        </Label>
                        <Input
                          type="text"
                          placeholder="Enter Activity Type"
                          name="activityType"
                          id="activityType"
                        />
                      </div>
                      <div className="form-group">
                        <Label for="eventName">
                          Event Details<spam className="text-danger"> *</spam>
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
                    <Col lg={6}>
                      <Row>
                        <Col lg={6}>
                          <div className="form-group">
                            <Label for="eventName">
                              Start Date
                              <spam className="text-danger"> *</spam>
                            </Label>
                            <Input
                              type="date"
                              name="startDate"
                              id="startDate"
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="form-group">
                            <Label for="eventName">
                              End Date
                              <spam className="text-danger"> *</spam>
                            </Label>
                            <Input type="date" name="endDate" id="endDate" />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={6}>
                          <div className="form-group">
                            <Label for="eventName">
                              Start Time
                              <spam className="text-danger"> *</spam>
                            </Label>
                            <Input
                              type="time"
                              name="startDate"
                              id="startDate"
                              step="2"
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="form-group">
                            <Label for="eventName">
                              End Time
                              <spam className="text-danger"> *</spam>
                            </Label>
                            <Input
                              type="time"
                              name="endDate"
                              id="endDate"
                              step="2"
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={12}>
                          <Label className="mt-1" for="group">
                            Upload Image &amp; Videos{" "}
                            <span className="text-danger font-size-10">
                              * (Approximately 1024px*500px)
                            </span>
                          </Label>
                          <Dropzone
                            onDrop={(acceptedFiles) =>
                              this.handleAcceptedFiles(acceptedFiles)
                            }
                          >
                            {({ getRootProps, getInputProps }) => (
                              <div className="dropzone">
                                <div
                                  className="dz-message needsclick"
                                  {...getRootProps()}
                                >
                                  <input {...getInputProps()} />
                                  <h3>Drop files here or click to upload.</h3>
                                </div>
                              </div>
                            )}
                          </Dropzone>
                          <div
                            className="dropzone-previews mt-3"
                            id="file-previews"
                          >
                            {this.state.selectedFiles.map((f, i) => {
                              return (
                                <Card
                                  className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                  key={i + "-file"}
                                >
                                  <div className="p-2">
                                    <Row className="align-items-center">
                                      <Col className="col-auto">
                                        <img
                                          data-dz-thumbnail=""
                                          height="80"
                                          className="avatar-sm rounded bg-light"
                                          alt={f.name}
                                          src={f.preview}
                                        />
                                      </Col>
                                      <Col>
                                        <Link
                                          to="#"
                                          className="text-muted font-weight-bold"
                                        >
                                          {f.name}
                                        </Link>
                                        <p className="mb-0">
                                          <strong>{f.formattedSize}</strong>
                                        </p>
                                      </Col>
                                    </Row>
                                  </div>
                                </Card>
                              );
                            })}
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default EventInformation;
