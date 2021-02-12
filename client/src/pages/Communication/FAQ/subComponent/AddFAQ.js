import React, { Component } from "react";
import { Row, Col, Button, Input, Label, Form } from "reactstrap";
import { Editor } from "react-draft-wysiwyg";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FAQServices from "../FaqService";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { EditorState } from "draft-js";
const errorMsgStyle = {
  color: "red",
  fontSize: "12px",
};
class AddFAQ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SuccessMessage: "",
      ShowMessage: false,
      ErrorMessage: "",
      ShowErrorMessage: false,

      topic: "",
    };
    this.services = new FAQServices();
    this.add_FAQ = this.add_FAQ.bind(this);
    this.validatePopupForm = this.validatePopupForm.bind(this);
  }

  validatePopupForm(topicName, ques, ans) {
    let status = true;
    if (topicName === "" || topicName === null || topicName === undefined) {
      status = false;
    }
    if (ques === "" || ques === null || ques === undefined) {
      status = false;
    }
    if (!ans.hasText()) {
      status = false;
    }

    return {
      status: status,
    };
  }

  add_FAQ(e) {
    e.preventDefault();
    let topicName = this.props.addFAQData.topicName;
    let ques = this.props.addFAQData.question;
    let ans = this.props.addFAQData.answer.getCurrentContent();

    let validate = this.validatePopupForm(topicName, ques, ans);

    if (validate.status == false) {
      this.setState({
        ShowErrorMessage: true,
        ErrorMessage: "Please Fill All The Labels !!!",
      });
      this.props.addFAQData.answer = "";
      this.props.addFAQData.question = "";
      this.props.addFAQData.topicName = "";
    } else {
      let obj = {
        P_TopicName: this.props.addFAQData.topicName,
        P_Question: this.props.addFAQData.question,
        P_Answer: draftToHtml(
          convertToRaw(this.props.addFAQData.answer.getCurrentContent())
        ),
        P_ServiceProviderID: this.props.spID,
        P_UserSKeyID: this.props.usersKeyID,
        P_FAQID: 0,
      };
      this.services.CreateUpdateFAQs(obj).then((res) => {
        this.props.getCommFAQList(
          this.props.spID,
          this.props.addFAQData.topicName
        );
        this.setState({
          ShowMessage: true,
          SuccessMessage: "Successfully Added !!!",
          ShowErrorMessage: false,
        });

        this.props.addFAQData.answer = "";
        this.props.addFAQData.question = "";
        this.props.addFAQData.topicName = "";
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-sm-12">
            {this.state.ShowMessage ? (
              <div class="alert alert-success" role="alert">
                {this.state.SuccessMessage}
              </div>
            ) : null}
          </div>
          <div className="col-sm-12">
            {this.state.ShowErrorMessage ? (
              <div class="alert alert-danger" role="alert">
                {this.state.ErrorMessage}
              </div>
            ) : null}
          </div>
        </div>
        <Form>
          <Row>
            <Col lg={12}>
              <div className="form-group">
                <RadioGroup row aria-label="runner" name="runner">
                  <FormControlLabel
                    control={
                      <Radio
                        color="primary"
                        name="topic"
                        value="oldTopic"
                        checked={this.props.addFAQData.topic === "oldTopic"}
                        onChange={this.props.handleChange}
                      />
                    }
                    label="Old FAQ Topic"
                  />
                  <FormControlLabel
                    control={
                      <Radio
                        color="primary"
                        name="topic"
                        value="newTopic"
                        checked={this.props.addFAQData.topic === "newTopic"}
                        onChange={this.props.handleChange}
                      />
                    }
                    label="New FAQ Topic"
                  />
                </RadioGroup>
              </div>
              <div className="form-group">
                {this.props.addFAQData.topic === "oldTopic" ? (
                  <div className="form-group">
                    <Label for="topic">
                      Select Topic <span className="text-danger">*</span>
                    </Label>
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
                            value={this.props.addFAQData.topicName}
                            type="text"
                            {...params.inputProps}
                          />
                        </div>
                      )}
                    />
                  </div>
                ) : (
                  <div className="form-group">
                    <Label for="topic">
                      New Topic <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="text"
                      name="topicName"
                      id="topicName"
                      value={this.props.addFAQData.topicName}
                      onChange={this.props.handleChange}
                      placeholder="Enter New Topic"
                    />
                  </div>
                )}
              </div>
              <div className="form-group">
                <Label for="question">
                  Question <span className="text-danger">*</span>
                </Label>
                <Input
                  type="text"
                  name="question"
                  id="question"
                  value={this.props.addFAQData.question}
                  onChange={this.props.handleChange}
                  placeholder="Enter Question"
                />
              </div>

              <div className="form-group">
                <Label for="ans">
                  Answer<span className="text-danger">*</span>
                </Label>
                <Editor
                  editorState={this.props.addFAQData.answer}
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
                  onEditorStateChange={this.props.onFAQEditorStateChange}
                />
              </div>
              <div className="form-group">
                <Button
                  className="btn btn-block update-btn"
                  onClick={(e) => this.add_FAQ(e)}
                  type="submit"
                >
                  Add
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </React.Fragment>
    );
  }
}

export default AddFAQ;
