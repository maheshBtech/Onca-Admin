import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Card, Row, Col, CardBody, Label } from "reactstrap";

class UsersFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ShowErrorMsg: false,
      ErrorMessage: "* Select Topic",
    };
    this.filter_FAQS = this.filter_FAQS.bind(this);
  }
  filter_FAQS() {
    if (this.props.topicName === "") {
      this.setState({
        ShowErrorMsg: true,
      });
    } else {
      this.props.getCommFAQList(this.props.spID, this.props.topicName);
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <Card className="mini-stat">
            <CardBody>
              <Row>
                <Col lg={12}>
                  <Row>
                    <Col lg={10}>
                      <div className="form-group">
                        <Label for="act-type">Topic</Label>
                        <Autocomplete
                          options={this.props.TopicList}
                          onInputChange={(event, value) => {
                            this.props.handleTopicNameChange(value);
                          }}
                          getOptionLabel={(option) => option.Topic_Name}
                          renderInput={(params) => (
                            <div ref={params.InputProps.ref}>
                              <input
                                placeholder="Select Topic"
                                value={this.props.topicName}
                                type="text"
                                {...params.inputProps}
                              />
                            </div>
                          )}
                        />
                      </div>
                      {this.state.ShowErrorMsg ? (
                        <spam class="text-danger">
                          {this.state.ErrorMessage}
                        </spam>
                      ) : null}
                    </Col>
                    <Col lg={2}>
                      <div className="form-group text-right">
                        <button
                          className="btn w-50 update-btn mt-2-5 mr-4"
                          type="submit"
                          onClick={() => this.filter_FAQS()}
                        >
                          Filter FAQ
                        </button>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(UsersFilter);
