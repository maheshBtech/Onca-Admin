import React, { Component } from 'react';
import { Row, Col, Card, Label, Input, } from "reactstrap";
import Autocomplete from './Autocomplete';
import { Editor } from "react-draft-wysiwyg";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";

class CreateGroupForm extends Component {
    constructor(props) {
        super(props);
        //debugger;
        this.handleAcceptedFiles = this.handleAcceptedFiles.bind(this);
        this.state = { selectedFiles: [],
          GroupList: this.props.GroupList,
          RowOrderData: this.props.groupFormRowOrderData
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
            <Row>
                <Col lg={12}>
                    <div className="form-group">
                        <Label for="GroupName">Group Name <span className="text-danger">*</span></Label>
                        <Input type="text" name="GroupName" id="GroupName" 
                            placeholder="Enter Group Name"                            
                            onChange={this.props.handleChange}
                            value={this.props.groupForm.GroupName}
                            
                        />
                    </div>
                    <div className="form-group">
                        <Label for="GroupName">Assign Captain</Label>
                        <Autocomplete  />
                    </div>
                    <div className="form-group">
                        <Label for="GroupDescription">Description</Label>
                        <Editor
                        name="AODActivityDescription"                         
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
                        placeholder="Enter GroupDescription"                            
                        onChange={this.props.handleChange}
                        value={this.props.groupForm.GroupDescription}
                           
                        />
                    </div>
                    <div className="from-group">
                    <Dropzone
                        onDrop={acceptedFiles =>
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
                    </div>
                </Col>
            </Row>
        )
    }

}

export default CreateGroupForm;