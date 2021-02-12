import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Button,
    Form,
    Label,
    Input,
  } from "reactstrap";
import { Link } from "react-router-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Dropzone from "react-dropzone";
class AddBlog extends Component {
  constructor(props) {
    super(props);
    this.handleAcceptedFiles = this.handleAcceptedFiles.bind(this);
    this.state = { selectedFiles: [] };
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
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/#">Onca Bites</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/onca-blogs">Blogs</Link>
                  </li>
                  <li className="breadcrumb-item active">Add blog</li>
                </ol>
              </div>
            </Col>
          </Row>

          <Row>
            <Col xl={12} className="text-right mb-2 float-right">
              <Link to="/onca-blogs" className="btn update-btn">
                Back
              </Link>
            </Col>
          </Row>
          <Row>
          <Col lg={12}>
            <Card className="mini-stat">
              <CardHeader className="bl-bg text-white">
                <b>Add Blog</b>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col lg={6}>
                      <div className="form-group">
                        <Label for="title">
                          Blog Title <span className="text-danger"> *</span>
                        </Label>
                        <Input
                          type="text"
                          name="title"
                          id="title"
                          placeholder="Enter Blog Title"
                        />
                      </div>
                      <div className="form-group">
                        <Label for="type">
                          Activity Type
                          <span className="text-danger"> *</span>
                        </Label>
                        <Input
                          type="text"
                          name="type"
                          id="type"
                          placeholder="Enter Promocode Value"
                        />
                      </div>
                      <div className="form-group mb-3">
                      <Label for="act-dec">Description <span className="text-danger" >*</span></Label>
                      <Editor
                        name="AODActivityDescription"                         
                        // onChange={(event)=>{this.handleDescription(event)}} 
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
                     {/* <ValidationMessage valid={this.state.descriptionValid} message={this.state.descriptionError}/> */}

                    </div>
                     
                      
                    </Col>
                    <Col lg={6}>
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
                        
                        <div className="form-group mt-3">
                        <FormControlLabel
                          value="hide Blog"
                          control={<Checkbox color="primary" />}
                          label="Hide Blog"
                        />
                        <FormControlLabel
                          value="website"
                          control={<Checkbox color="primary" />}
                          label="Website"
                        />
                    
                        <FormControlLabel
                          value="mobile"
                          control={<Checkbox color="primary" />}
                          label="Mobile"
                        />
                      </div>
                    
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
            <div className="form-group">
              <Button className="btn update-btn">Submit</Button>
            </div>
          </Col>
        </Row>

        </div>
      </React.Fragment>
    );
  }
}

export default AddBlog;
