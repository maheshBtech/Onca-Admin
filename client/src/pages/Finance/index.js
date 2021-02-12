import React, { Component } from "react";
import { withRouter, Link } from 'react-router-dom';
import { Row, Col, Label, Input, } from "reactstrap";
import PugmarkData from "./SubComponent/PugmarkData";
import { Modal } from "reactstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
class Pugmark extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal_add_provider: false,
          modal_invite_provider: false,
          modal_scroll: false,
        };

        this.add_provider = this.add_provider.bind(this);
        this.invite_provider = this.invite_provider.bind(this);
        this.tog_scroll = this.tog_scroll.bind(this);
        
      }

      
      removeBodyCss() {
          document.body.classList.add("no_padding");
      }
      add_provider() {
        this.setState(prevState => ({
          modal_add_provider: !prevState.modal_add_provider
        }));
        this.removeBodyCss();
      }
      invite_provider() {
        this.setState(prevState => ({
          modal_invite_provider: !prevState.modal_invite_provider
        }));
        this.removeBodyCss();
      }
      tog_scroll() {
        this.setState(prevState => ({
          modal_scroll: !prevState.modal_scroll
        }));
        this.removeBodyCss();
      }
      show() {
        this.setState({ visible: true });
      }
      hide() {
        this.setState({ visible: false });
      }
    render() {
      return (
        <React.Fragment>
            <div className="container-fluid">
                <Row className="align-items-center">
                    <Col sm={6}>
                        <div className="page-title-box">
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item active">
                                    Provider
                                </li>
                            </ol>
                        </div>
                    </Col>
                </Row>


                {/* Add User Type */}
                <Row>
                    <Col xl={12} className="text-right mb-4">
                      {/* Add New Provider */}
                        <button
                          type="button"
                          className="btn update-btn font"
                          onClick={this.add_provider}
                          data-toggle="modal"
                          data-target=".bs-example-modal-center"
                        >
                          Add New Provider
                        </button>
                        
                        <Modal
                          className="modal-lg"
                          isOpen={this.state.modal_add_provider}
                          toggle={this.add_provider}
                        >
                          <div className="modal-header">
                            <h5 className="modal-title mt-0">Add New Provider</h5>
                            <button
                              type="button"
                              onClick={() =>
                                this.setState({ modal_add_provider: false })
                              }
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            
                            <Row>
                              <Col xl={6} sm={6}>
                                  <div className="form-group">
                                      <Label for="ProviderName">Provider Name</Label>
                                      <Input type="text" id="ProviderName" />
                                  </div>
                                  <div className="form-group">
                                      <Label for="subdomain">Enter Subdomain</Label>
                                      <Input type="text" id="subdomain" />
                                  </div>
                                  <div className="form-group">
                                      <Label for="address">Address</Label>
                                      <Input type="address" id="address" />
                                  </div>
                              </Col>
                              <Col xl={6} sm={12}>
                                  <div className="form-group">
                                      <Label for="ContactPerson">Contact Person</Label>
                                      <Input type="text" id="ContactPerson" />
                                  </div>
                                  <div className="form-group">
                                      <Label for="ContactNumber">Contact Number</Label>
                                      <Input type="number" id="ContactNumber" />
                                  </div>
                                  <div className="form-group">
                                      <Label for="EmailID">Email ID</Label>
                                      <Input type="Email" id="EmailID" />
                                  </div>
                              </Col>
                              <Col sm={12}>
                                <div class="custom-control custom-checkbox float-left">
                                  <input type="checkbox" class="custom-control-input" id="ECommerce" />
                                  <label class="custom-control-label" for="ECommerce">E-Commerce</label>
                                </div>
                                <div class="custom-control custom-checkbox float-left ml-3">
                                  <input type="checkbox" class="custom-control-input" id="Training" />
                                  <label class="custom-control-label" for="Training">Training</label>
                                </div>
                              </Col>
                              <Col sm={12}>
                                  <button className="btn btn-block update-btn font mt-3">
                                    Assign Provider
                                  </button>
                              </Col>
                            </Row>
                        </div>
                      </Modal>
                      {/* Invite Provider */}
                        <button
                          type="button"
                          className="btn update-btn font ml-2"
                          onClick={this.invite_provider}
                          data-toggle="modal"
                          data-target=".bs-example-modal-center"
                        >
                          Invite Provider
                        </button>
                        <Modal
                          isOpen={this.state.modal_invite_provider}
                          toggle={this.invite_provider}
                        >
                          <div className="modal-header">
                            <h5 className="modal-title mt-0">Invite Provider</h5>
                            <button
                              type="button"
                              onClick={() =>
                                this.setState({ modal_invite_provider: false })
                              }
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <Col sm={12}>
                                <div className="form-group row">
                                    <Label for="name">Email ID</Label>
                                    <Input type="email" id="email" />
                                </div>
                                <div className="form-group row">
                                    <Label for="name">Invitation Note</Label>
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
                                <div className="form-group row mt-9">
                                  <Link to="provider-signup" className="btn btn-block update-btn font">
                                    Invite Provider
                                  </Link>
                                </div>
                            </Col>
                        </div>
                      </Modal>
                    </Col>
                </Row>

                {/* Table */}
                <Row>
                    <Col xl={12}>
                        <PugmarkData />
                    </Col>
                </Row>
            </div>
        </React.Fragment>
      );
    }
}


export default withRouter((Pugmark));