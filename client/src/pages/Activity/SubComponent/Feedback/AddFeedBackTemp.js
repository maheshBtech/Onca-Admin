import React, { Component } from "react";
import Dropzone from "react-dropzone";
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  Label,
  Input,
} from "reactstrap";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Link } from "react-router-dom";

class AddFeedBackTemp extends Component {
  constructor(props) {
    super(props);
    this.handleAcceptedFiles = this.handleAcceptedFiles.bind(this);
    this.state = {
      selectedFiles: [],

      OptionNames: [
        { name: "Too Easy" },
        { name: "Too Hard" },
        { name: "Good" },
        { name: "Very Bad" }

      ]
    };
  }

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
        <Form>
          <Row>
            <Col lg={12}>
              <div className="form-group">
                <Label for="title">
                  Template Name <span className="text-danger">*</span>
                </Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter Template Name"
                // onChange={this.props.handleChange}
                // value={this.props.updateWishesData.P_WishesTitle}
                />
              </div>
              <div className="form-group">
                <Label for="title">
                  Rating Option Name <span className="text-danger">*</span>
                </Label>
                <Input
                  name="name"
                  placeholder="Enter Rating Option Name"
                />
              </div>
              <div className="form-group">
                <Label className="mt-1" for="group">Upload Rating Option Icon <span className="text-danger font-size-10" >* (Approximately 1024px*500px)</span></Label>
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
              </div>


              <div className="form-group">
                <Button
                  className="btn btn-block update-btn"
                  type="submit"
                >
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

export default AddFeedBackTemp;
