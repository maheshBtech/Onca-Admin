import React, { Component } from "react";
import {
    Row,
    Col,
    Label,
    Input,
    Card,
    CardBody,
    CardHeader,
    Modal
} from "reactstrap";
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import { withRouter} from 'react-router-dom';
import store from "../../../../store/index";



class AODPic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFiles: [],
            isPreviousSectionFilled:!false,
        };
    }

    // Drop Zone
    handleAcceptedFiles = files => {
        let blobFile = ""
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = function () {            
        blobFile = reader.result
        store.getState().activityReducer.createAOD.aodImageIsValid = true
        store.getState().activityReducer.createAOD.aodImageData = blobFile
        console.log(store.getState().activityReducer.createAOD)
        // let data = JSON.parse(JSON.stringify(store.getState().activityReducer.createAOD))
        // data.aodImageIsValid = true
        // data.aodImageData = blobFile
        // store.dispatch('UPDATE_CREATE_AOD_FORM_DATA', data)
        // console.log(store.getState().activityReducer.createAOD)
            };
           
        files.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            formattedSize: this.formatBytes(file.size)
          })
        );
    
        this.setState({ selectedFiles: files });
        console.log(this.state.selectedFiles)
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

      componentDidUpdate(prevProps, prevState){
        if(prevProps.createAOD.reminderAODIsValid!=this.props.createAOD.reminderAODIsValid){
            this.setState({isPreviousSectionFilled:!this.props.createAOD.reminderAODIsValid})
        }
    }
    
      validate = () => {
    
      }
    render() {
        const { selectedGroup } = this.state;
        return (
            <Row>
                <Col lg={6}>
                    {/* File Upload Section */}
                    <div className="form-group">
                        <Label for="group">Upload Program Image <span className="text-danger font-size-10" >* (Approximately 1024px*500px)</span></Label>
                        <Dropzone disabled={this.state.isPreviousSectionFilled} multiple={false} onDrop={acceptedFiles => this.handleAcceptedFiles(acceptedFiles)} >
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
                        <div className="dropzone-previews mt-3" id="file-previews">
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
        );
    }
}
const mapStatetoProps = state => {
    return {
      createAOD : state.activityReducer.createAOD
    };
  };
  const dispatchToProps = dispatch => {
    return {
        updateTableData: (type, payload) => {
            dispatch({ type: type, payload: payload })
        }
    }
  }
export default withRouter(connect(mapStatetoProps, dispatchToProps)(AODPic));
