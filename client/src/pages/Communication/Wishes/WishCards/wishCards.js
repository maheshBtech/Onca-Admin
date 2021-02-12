import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import Information_Message from "./Information_Message";
import store from "../../../../store/index";

import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
  Modal,
} from "reactstrap";
import AddWishes from "./addWishCards";
import WishesServices from "./wishesServices";
class WishCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal_center: false,
      modal_scroll: false,
      WishesList: [],
      WishesListBackup: [],
      modal_title: "",
      delSuccessMsg: false,
      button: false,

      updateWishesData: {
        P_WishesTitle: "",
        P_Message: "",
        button: false,
        title: "",
      },
    };

    this.add_wishcard = this.add_wishcard.bind(this);
    this.distance_scroll = this.wishcard_scroll.bind(this);
    this.getCommWishesList = this.getCommWishesList.bind(this);
    this.wishesListObject = this.wishesListObject.bind(this);
    this.removeWishes = this.removeWishes.bind(this);
    this.closeDelSuccessMsg = this.closeDelSuccessMsg.bind(this);
    this.updateWishes = this.updateWishes.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.service = new WishesServices();
    this.userProfileData = this.props.userProfileData;
    this.spID = this.props.ProviderID;
    this.usersKeyID = this.props.UserSkeyID;
    store.dispatch({ type: "CHANGE_CURRENT_PAGE_NAME", payload: "Wishes" });
  }

  closeDelSuccessMsg() {
    this.setState({ delSuccessMsg: false });
  }

  componentDidMount() {
    if (this.userProfileData != null || this.userProfileData != undefined) {
      this.getCommWishesList(this.spID);
    }
  }

  getCommWishesList(spID) {
    this.service.getWishesList(spID).then((res) => {
      this.wishesListObject(res);
    });
  }

  wishesListObject(res) {
    if (res === undefined) {
      return;
    }
    this.setState({ WishesList: [] });
    let data = Object.assign([], this.state.WishesList);
    res.forEach((item) => {
      data.push({
        Message: item.Message,
        Wishes_Title: item.Wishes_Title,
        Service_Provider_ID: item.Service_Provider_ID,
        Provider_Name: item.Provider_Name,
        Provider_Wishes_ID: item.Provider_Wishes_ID,
        Active_Flag: item.Active_Flag,
        Delete_Flag: item.Delete_Flag,
        UserSkeyID: this.usersKeyID,
      });
      this.setState({
        WishesList: data,
        WishesListBackup: res,
      });
    });
  }

  removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  wishcard_scroll() {
    this.setState((prevState) => ({
      modal_scroll: !prevState.modal_scroll,
    }));
    this.removeBodyCss();
  }
  show() {
    this.setState({ visible: true });
  }
  hide() {
    this.setState({ visible: false });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "input" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      updateWishesData: {
        ...this.state.updateWishesData,
        [name]: value,
      },
    });
  }
  //to delete cards
  removeWishes(e, item) {
    let dataobj = {
      ...item,
      Active_Flag: 1,
      Delete_Flag: 1,
      P_UserSkeyID: this.usersKeyID,
    };
    this.service.RemoveWishes(dataobj).then((res) => {
      this.setState({ delSuccessMsg: true, model_title: "Deleted !!!" });
      this.getCommWishesList(this.spID);
    });
  }

  add_wishcard() {
    this.setState({
      updateWishesData: {
        button: false,
        title: "Add Wishes",
      },
    });

    this.setState((prevState) => ({
      modal_center: !prevState.modal_center,
    }));
    this.removeBodyCss();
  }
  // to update the cards
  updateWishes(item) {
    this.setState({
      updateWishesData: {
        P_WishesTitle: item.Wishes_Title,
        P_Message: item.Message,
        Provider_Wishes_ID: item.Provider_Wishes_ID,
        P_ServiceProviderID: item.Service_Provider_ID,
        P_UserSkeyID: item.UserSkeyID,
        addWishesButton: true,
        button: true,
        title: "Update Wishes",
      },
    });
    this.setState((prevState) => ({
      modal_center: !prevState.modal_center,
    }));
    this.removeBodyCss();
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col lg={12} className="text-right">
            <button
              className="btn update-btn mb-3"
              onClick={this.add_wishcard}
              data-toggle="modal"
              data-target=".bs-example-modal-center"
            >
              Add Wishes
            </button>

            {this.state.delSuccessMsg ? (
              <Information_Message
                title={this.state.model_title}
                modelOkButtonClicked={() => this.closeDelSuccessMsg()}
              ></Information_Message>
            ) : null}
            <Modal
              isOpen={this.state.modal_center}
              toggle={(this.add_wishcard, this.updateWishes)}
            >
              <div className="modal-header">
                <h5 className="modal-title">
                  {" "}
                  {this.state.updateWishesData.title}
                </h5>
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
                <AddWishes
                  spID={this.spID}
                  usersKeyID={this.usersKeyID}
                  wishesListObject={(e) => this.getCommWishesList(e)}
                  updateWishesData={this.state.updateWishesData}
                  handleChange={this.handleChange}
                />
              </div>
            </Modal>
          </Col>
        </Row>

        <Row>
          {this.state.WishesList.map((item, i) => (
            <Col xl={4} md={6} key={i}>
              <Card className="mini-stat">
                <CardHeader className="gray-bg">{item.Wishes_Title}</CardHeader>
                <CardBody>
                  <Row>
                    <Col>
                      <p className="font-size-12">{item.Message}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Button
                      onClick={() => this.updateWishes(item)}
                      data-toggle="modal"
                      data-target=".bs-example-modal-center"
                      className="btn update-btn"
                    >
                      update
                    </Button>
                    <Button
                      onClick={(e) => this.removeWishes(e, item)}
                      className="btn remove-btn ml-3"
                    >
                      Remove
                    </Button>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
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

const dispatchToProps = (dispatch) => {
  return {
    updateTableData: (type, payload) => {
      dispatch({ type: type, payload: payload });
    },
  };
};
export default withRouter(connect(mapStatetoProps, dispatchToProps)(WishCards));
