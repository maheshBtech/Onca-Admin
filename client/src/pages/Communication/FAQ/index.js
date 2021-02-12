import React, { Component } from "react";
import { EditorState } from "draft-js";
import FAQCard from "./FAQCard";
import {
  Row,
  Col,
  Card,
  CardBody,
  Collapse,
  CardHeader,
  Button,
  Modal,
} from "reactstrap";
import store from "../../../store/index";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UsersFilter from "./subComponent/UsersFilter";
import AddFAQ from "./subComponent/AddFAQ";
import { withRouter } from "react-router-dom";
import FaqService from "./FaqService";

class Faqs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal_center: false,
      modal_scroll: false,
      FAQList: [],
      TopicList: [],
      addFAQData: {
        topic: "oldTopic",
        topicName: "",
        question: "",
        answer: EditorState.createEmpty(),
      },
    };
    this.add_FAQ = this.add_FAQ.bind(this);
    this.services = new FaqService();
    this.userProfileData = this.props.userProfileData;
    this.spID = this.props.ProviderID;
    this.usersKeyID = this.props.UserSkeyID;
    this.handleChange = this.handleChange.bind(this);
    store.dispatch({ type: "CHANGE_CURRENT_PAGE_NAME", payload: "FAQ's" });
    this.onFAQEditorStateChange = this.onFAQEditorStateChange.bind(this);
    this.handleTopicNameChange = this.handleTopicNameChange.bind(this);
    this.getCommFAQList = this.getCommFAQList.bind(this);
  }

  componentDidMount() {
    if (this.userProfileData != null || this.userProfileData != undefined) {
      this.getCommFAQList(this.spID, this.state.addFAQData.topicName);
    }
  }

  onFAQEditorStateChange = (editorState) => {
    this.setState({
      addFAQData: {
        ...this.state.addFAQData,
        answer: editorState,
      },
    });
  };

  handleTopicNameChange = (value) => {
    this.setState({
      addFAQData: {
        ...this.state.addFAQData,
        topicName: value,
      },
    });
  };

  getCommFAQList(spID, topicName) {
    const objData = {
      Service_Provider_ID: spID,
      Topic_Name: topicName,
    };

    this.services.getFAQList(objData).then((res) => {
      this.FAQListObject(res);
    });
  }

  FAQListObject(res) {
    if (res === undefined) {
      return;
    }

    this.setState({ FAQList: [] });
    let data = Object.assign([], this.state.FAQList);

    res[0].forEach((item) => {
      data.push({
        FAQ_ID: item.FAQ_ID,
        Topic_Name: item.Topic_Name,
        Service_Provider_ID: item.Service_Provider_ID,
        Answer: item.Answer,
        Question: item.Question,
      });
      this.setState({
        FAQList: data,
        TopicList: res[1],
      });
    });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "input" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      addFAQData: {
        ...this.state.addFAQData,
        [name]: value,
      },
    });
  }

  // Modal Popup
  removeBodyCss() {
    document.body.classList.add("no_padding");
  }
  add_FAQ() {
    this.setState((prevState) => ({
      modal_center: !prevState.modal_center,
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
                  <li className="breadcrumb-item">
                    <Link to="/#">Communications</Link>
                  </li>
                  <li className="breadcrumb-item active">FAQS</li>
                </ol>
              </div>
            </Col>
          </Row>
          <UsersFilter
            getCommFAQList={this.getCommFAQList}
            spID={this.spID}
            topicName={this.state.addFAQData.topicName}
            handleTopicNameChange={this.handleTopicNameChange}
            TopicList={this.state.TopicList}
          />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader className="bl-bg text-white justify-item-center ">
                  <b>FAQ's List</b>
                  <button
                    className="btn update-btn float-right"
                    onClick={this.add_FAQ}
                    data-toggle="modal"
                    data-target=".bs-example-modal-center"
                  >
                    Add FAQ
                  </button>
                  <Modal isOpen={this.state.modal_center} toggle={this.add_FAQ}>
                    <div className="modal-header">
                      <h5 className="modal-title">Add FAQ</h5>
                      <button
                        type="button"
                        onClick={() => this.setState({ modal_center: false })}
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <AddFAQ
                        addFAQData={this.state.addFAQData}
                        spID={this.spID}
                        usersKeyID={this.usersKeyID}
                        handleChange={this.handleChange}
                        TopicList={this.state.TopicList}
                        handleTopicNameChange={this.handleTopicNameChange}
                        onFAQEditorStateChange={this.onFAQEditorStateChange}
                        getCommFAQList={this.getCommFAQList}
                      />
                    </div>
                  </Modal>
                </CardHeader>

                <CardBody className="p-0">
                  <Row>
                    {this.state.FAQList.map((item, i) => {
                      return (
                        <Col key={i} lg={6}>
                          <FAQCard details={item} />
                        </Col>
                      );
                    })}
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    userProfileData: state.userProfileData.ProfileData,
    ProviderID:
      state.currentPageName.roleAndProvider.selectedRole.Service_Provider_ID,
    UserSkeyID:
      state.userProfileData != undefined
        ? state.userProfileData.ProfileData[0][0].User_Skey_ID
        : null,
  };
};
export default withRouter(connect(mapStatetoProps)(Faqs));
