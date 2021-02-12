import React, { Component } from "react";
import { Row, Col, Button, Input, Label, Form } from "reactstrap";
import WishesServices from "./wishesServices";
const errorMsgStyle = {
  color: "red",
  fontSize: "12px",
};
class AddWishCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SuccessMessage: "",
      ShowMessage: false,
    };
    this.service = new WishesServices();
  }

  validatePopupForm(title, msg) {
    let message = [];
    let section = [];
    let status = true;
    if (title === "" || title === null || title === undefined) {
      message.push("*title cannot be empty.");
      section.push("titleError");
      status = false;
    }
    if (msg === "" || msg === null || msg === undefined) {
      message.push("*Message cannot be empty.");
      section.push("msgError");
      status = false;
    }
    return {
      status: status,
      message: message,
      section: section,
    };
  }

  //adding Wishes card
  addWishCard = (e) => {
    e.preventDefault();
    let dataObj = {
      P_WishesTitle: this.props.updateWishesData.P_WishesTitle,
      P_Message: this.props.updateWishesData.P_Message,
      Provider_Wishes_ID: 0,
      P_ServiceProviderID: this.props.spID,
      P_UserSkeyID: this.props.usersKeyID,
    };

    let title = dataObj.P_WishesTitle;
    let msg = dataObj.P_Message;
    let validate = this.validatePopupForm(title, msg);
    document.getElementById("titleError").innerHTML = "";
    document.getElementById("msgError").innerHTML = "";
    if (validate.status == false) {
      validate.section.forEach((obj, idx) => {
        document.getElementById(obj).innerHTML = validate.message[idx];
      });
    } else {
      this.service.CreateUpdateWishes(dataObj).then((res) => {
        this.props.wishesListObject(this.props.spID);

        this.setState({
          ShowMessage: true,
          P_WishesTitle: "",
          P_Message: "",
          SuccessMessage: "Successfully Added",
        });
      });
    }
  };

  UpdateWishes(e) {
    e.preventDefault();
    let objData = {
      P_WishesTitle: this.props.updateWishesData.P_WishesTitle,
      P_Message: this.props.updateWishesData.P_Message,
      Provider_Wishes_ID: this.props.updateWishesData.Provider_Wishes_ID,
      P_ServiceProviderID: this.props.updateWishesData.P_ServiceProviderID,
      P_UserSkeyID: this.props.updateWishesData.P_UserSkeyID,
    };

    let title = objData.P_WishesTitle;
    let msg = objData.P_Message;
    let validate = this.validatePopupForm(title, msg);
    document.getElementById("titleError").innerHTML = "";
    document.getElementById("msgError").innerHTML = "";

    if (validate.status == false) {
      validate.section.forEach((obj, idx) => {
        document.getElementById(obj).innerHTML = validate.message[idx];
      });
    } else {
      this.service.CreateUpdateWishes(objData).then((res) => {
        this.props.wishesListObject(this.props.spID);

        this.setState({
          ShowMessage: true,
          SuccessMessage: "Successfully Updated",
        });
      });
    }
  }

  //updating Wishes cards

  render() {
    console.log(this.state);
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
        </div>
        <Form>
          <Row>
            <Col lg={12}>
              <div className="form-group">
                <Label for="title">
                  Wishes Title <span className="text-danger">*</span>
                </Label>
                <Input
                  type="text"
                  name="P_WishesTitle"
                  id="title"
                  placeholder="Enter Wishes Title"
                  onChange={this.props.handleChange}
                  value={this.props.updateWishesData.P_WishesTitle}
                />
                <Label
                  for="title"
                  id="titleError"
                  style={errorMsgStyle}
                ></Label>
              </div>
              <div className="form-group">
                <Label for="Msg">
                  Message<span className="text-danger">*</span>
                </Label>
                <Input
                  type="textarea"
                  id="msg"
                  name="P_Message"
                  onChange={this.props.handleChange}
                  value={this.props.updateWishesData.P_Message}
                  maxLength="100"
                  rows="3"
                  placeholder="This textarea has a limit of 100 chars."
                />
                {this.state.P_Message ? (
                  <span className="badgecount">
                    {" "}
                    {this.state.P_Message.length} / 100{" "}
                  </span>
                ) : null}
                <Label for="msg" id="msgError" style={errorMsgStyle}></Label>
              </div>
              <div className="form-group">
                {this.props.updateWishesData.button ? (
                  <Button
                    onClick={(e) => this.UpdateWishes(e)}
                    className="btn btn-block update-btn"
                    type="submit"
                  >
                    Update
                  </Button>
                ) : (
                    <Button
                      onClick={(e) => this.addWishCard(e)}
                      className="btn btn-block update-btn"
                      type="submit"
                    >
                      Submit
                    </Button>
                  )}
              </div>
            </Col>
          </Row>
        </Form>
      </React.Fragment>
    );
  }
}

export default AddWishCard;
