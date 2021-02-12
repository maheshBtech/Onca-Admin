import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  Label,
  Input
} from "reactstrap";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Dropzone from "react-dropzone";
import Race from "../../../Leaderboard/DataTemplate/Race";

class Addactivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TopicList:[
        {Topic_Name:"Running"},
        {Topic_Name:"Swimming"},
        {Topic_Name:"Cycling"},
        {Topic_Name:"Zumba"},
      ],
      selectedFiles:[]

      }
      this.handleAcceptedFiles = this.handleAcceptedFiles.bind(this);
    };
    handleAcceptedFiles = files => {
      files.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          formattedSize: this.formatBytes(file.size)
        })
      );
  
      this.setState({ selectedFiles: files });
    };
  
    /**
     * Formats the size
     */
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
      <React.Fragment>
      <Form >
          <Row>

              <Col lg={12}>
                  <div className="form-group">
                      <Label for="DistanceOpt">Activity Type Name <span className="text-danger">*</span></Label>
                      <Autocomplete
                      options={this.state.TopicList}
                      onInputChange={(event, value) => {
                        this.props.handleTopicNameChange(value);
                      }}
                      getOptionLabel={(option) => option.Topic_Name}
                      renderInput={(params) => (
                        <div ref={params.InputProps.ref}>
                          <input
                            placeholder="Select Activity"
                            //value={this.state.TopicList.topicName}
                            type="text"
                            {...params.inputProps}
                          />
                        </div>
                      )}
                    />
                  </div>
                  </Col>
                    <Col lg={12}>
                    <Label className = "mt-1" for="group">Upload Image &amp; Videos <span className="text-danger font-size-10" >* (Approximately 1024px*500px)</span></Label>
                           <Dropzone onDrop={acceptedFiles => this.handleAcceptedFiles(acceptedFiles)}>
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
                  <div className="form-group">
                      <Button className="btn btn-block update-btn" type="submit" >
                          Submit
                      </Button>
                  </div>
              </Col>
          </Row>
      </Form>
  </React.Fragment>
    );
  }
}

export default Addactivity;
