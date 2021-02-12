import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import {
  Card,
  Row,
  Col,
  CardBody,
  CardHeader,
  Label,
  Button,
  Input,
  Form
} from "reactstrap";

class NewVendor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      rows1: [],
      NewVendorForm: {
        Vendor_ID: 0,
        Service_Provider_ID: 0,
        Vendor_Name: "",
        Email_ID: "",
        Telephone_No:"",
        Address:"",
        Location_ID:"",
        Company_Telephone_No:"",
        Pin_Code:"",
        GST_Code:"",
        PAN_No:"",
        Firm_Type_ID:"",
        Active_Flag:"",
        Delete_Flag:"",
        CreatedBy_ID:"",
        Created_Date:"",
        ModifiedBy_ID:"",
        Modified_Date:"",
        ///
        City:"",
        State:"",
        Country:"",
        Comments:"",
        Contact_Person_Name:"",
        Contact_Person_MobileNo:"",
        Contact_Person_EmailID:"",
        Department_Name:"",

      }
    }
     ///This function is for the form handling
     this.handleSubmit = this.handleSubmit.bind(this);
     this.handleChange = this.handleChange.bind(this);

    this.textareachange = this.textareachange.bind(this);
  }
  // Secondary Spoc Add Row
  handleAddRow = () => {
    const item = {
      name: ""
    };
    this.setState({
      rows: [...this.state.rows, item]
    });
  };
  handleRemoveRow = (e, idx) => {
    document.getElementById("addr" + idx).style.display = "none";
  };
///This is my first submit forms
handleSubmit = (event) => {
}
///This is my first submit forms
handleChange = (event) => {
}
  textareachange(event) {
    var count = event.target.value.length;
    if (count > 0) {
      this.setState({ textareabadge: true });
    } else {
      this.setState({ textareabadge: false });
    }
    this.setState({ textcount: event.target.value.length });
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
                    <Link to="/attributes">E-Commerce</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    <Link to="/attributes">Configuration</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    Add Vendor
                  </li>
                </ol>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Card className="mini-stat">
                <CardHeader className="bl-bg">
                  <b className="text-white">Add Vendor</b>
                </CardHeader>
                <CardBody>
                  <form onSubmit={this.handleSubmit}>
                  <Row>
                    <Col lg={6}>
                      <div className="form-group">
                        <Label for="act-name">Vendor ID <span className="text-danger" ></span></Label>
                        <Input type="text" 
                          id="act-name"
                          placeholder="Enter Vendor ID"
                          onChange={this.handleChange}
                          value={this.state.NewVendorForm.Vendor_ID}
                        />
                      </div>
                      <div className="form-group">
                        <Label for="act-name">Vendor Name<span className="text-danger" ></span></Label>
                        <Input type="text" id="act-name"
                          placeholder="Enter Name"
                          onChange={this.handleChange}
                          value={this.state.NewVendorForm.Vendor_Name}
                        />
                      </div>
                      <div className="form-group">
                        <Label for="act-name">GST Number <span className="text-danger" ></span></Label>
                        <Input type="text" id="act-name"
                          placeholder="Vendor GST Number"
                          onChange={this.handleChange}
                          value={this.state.NewVendorForm.GST_Code}
                        />
                      </div>
                      <div className="form-group">
                        <Label for="act-name">PAN No. <span className="text-danger" ></span></Label>
                        <Input type="text" id="act-name"
                          placeholder="Enter PAN Number"
                          onChange={this.handleChange}
                          value={this.state.NewVendorForm.PAN_No}
                        />
                      </div>
                      <div className="form-group">
                        <Label for="act-name">Address <span className="text-danger" ></span></Label>
                        <Input type="text" id="act-name"
                          placeholder="Vendor office Address"
                          onChange={this.handleChange}
                          value={this.state.NewVendorForm.Address}
                        />
                      </div>
                      <div className="form-group">
                        <Label for="act-name">Pincode <span className="text-danger" ></span></Label>
                        <Input type="text" id="act-name"
                          placeholder="Enter Pincode"
                          onChange={this.handleChange}
                          value={this.state.NewVendorForm.Pin_Code}
                        />
                      </div>
                      <div className="form-group">
                        <Label for="act-name">City <span className="text-danger" ></span></Label>
                        <Input type="text" id="act-name"
                          placeholder="City name"
                          onChange={this.handleChange}
                          value={this.state.NewVendorForm.City}
                        />
                      </div>
                      <div className="form-group">
                        <Label for="act-name">State <span className="text-danger" ></span></Label>
                        <Input type="text" id="act-name"
                          placeholder="State Name"
                          onChange={this.handleChange}
                          value={this.state.NewVendorForm.State}
                        />
                      </div>
                      <div className="form-group">
                        <Label for="act-name">Country<span className="text-danger" ></span></Label>
                        <Input type="text" id="act-name"
                          placeholder="Country Name"
                          onChange={this.handleChange}
                          value={this.state.NewVendorForm.Country}
                        />
                      </div>
                      <div className="form-group">
                        <Label for="act-name">Comments<span className="text-danger" ></span></Label>
                        <Input
                          type="textarea"
                          id="textarea"
                          onChange={this.textareachange}
                          maxLength="225"
                          rows="3"
                          placeholder="This textarea has a limit of 225 chars."
                          onChange={this.handleChange}
                          value={this.state.NewVendorForm.Comments}
                        />
                        {this.state.textareabadge ? (
                          <span className="badgecount">
                            {" "}
                            {this.state.textcount} / 225{" "}
                          </span>
                        ) : null}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <b>Primary SPOC Details</b>
                      <div className="form-group mt-3">
                        <Label for="act-name">Contact Person Name<span className="text-danger"></span></Label>
                        <Input type="text" id="act-name"
                          placeholder="Enter Name"
                          onChange={this.handleChange}
                          value={this.state.NewVendorForm.Contact_Person_Name}
                        />
                      </div>
                      <div className="form-group">
                        <Label for="act-name">Contact Person Mobile Number<span className="text-danger" ></span></Label>
                        <Input type="text" id="act-name"
                          placeholder="Enter Contact Number"
                          onChange={this.handleChange}
                          value={this.state.NewVendorForm.Contact_Person_MobileNo}
                        />
                      </div>
                      <div className="form-group">
                        <Label for="act-name">Contact Person Email ID <span className="text-danger" ></span></Label>
                        <Input type="text" id="act-name"
                          placeholder="Enter Email ID"
                          onChange={this.handleChange}
                          value={this.state.NewVendorForm.Contact_Person_EmailID}
                        />
                      </div>
                      <div className="form-group">
                        <Label for="act-name">Department Name<span className="text-danger" ></span></Label>
                        <Input type="text" id="act-name"
                          placeholder="Enter Department Name"
                          onChange={this.handleChange}
                          value={this.state.NewVendorForm.Department_Name}
                        />
                      </div>
                      <b>Secondary SPOC Details</b>
                      {/* Form Repeater */}
                      <table className="w-100 mt-3">
                    <tbody>
                      <tr id="addr0" key="">
                        <td>
                          <Form
                            className="repeater"
                            enctype="multipart/form-data"
                          >
                            <div data-repeater-list="group-a">
                              <Row data-repeater-item>
                                <Col lg="12" className="form-group">
                                  <Label for="act-name">Contact Person Name <span className="text-danger" ></span></Label>
                                  <Input type="text" id="act-name"
                                    placeholder="Enter Name"
                                    onChange={this.handleChange}
                                    value={this.state.NewVendorForm.Contact}
                                  />
                                </Col>

                                <Col lg="12" className="form-group">
                                  <Label for="act-name">Contact Person Mobile Number<span className="text-danger" ></span></Label>
                                  <Input type="text" id="act-name"
                                    placeholder="Enter Contact Number"
                                    onChange={this.handleChange}
                                    value={this.state.NewVendorForm.Vendor_ID}
                                  />
                                </Col>

                                <Col lg="12" className="form-group">
                                  <Label for="act-name">City <span className="text-danger" ></span></Label>
                                  <Input type="text" id="act-name"
                                    placeholder="City name"
                                    onChange={this.handleChange}
                                    value={this.state.NewVendorForm.City}
                                  />
                                </Col>

                                <Col lg="12" className="form-group">
                                  <Label for="act-name">Contact Person Email ID <span className="text-danger" ></span></Label>
                                  <Input type="text" id="act-name"
                                    placeholder="Enter Email ID"
                                    onChange={this.handleChange}
                                    value={this.state.NewVendorForm.Contact_Person_EmailID}
                                  />
                                </Col>

                                <Col lg="12" className="form-group">
                                  <Label for="act-name">Department Name<span className="text-danger" ></span></Label>
                                  <Input type="text" id="act-name"
                                    placeholder="Enter Departmant Name"
                                    onChange={this.handleChange}
                                    value={this.state.NewVendorForm.Department_Name}
                                  />
                                </Col>
                              </Row>
                            </div>
                          </Form>
                        </td>
                      </tr>

                      {this.state.rows.map((item, idx) => (
                        <tr id={"addr" + idx} key={idx}>
                          <td>
                            <hr />
                            <Form
                              className="repeater"
                              enctype="multipart/form-data"
                            >
                              <div data-repeater-list="group-a">
                                <Row data-repeater-item>
                                  <Col lg="12" className="form-group">
                                  <Label for="act-name">Contact Person Name <span className="text-danger" ></span></Label>
                                  <Input type="text" id="act-name"
                                    placeholder="Enter Name"
                                    onChange={this.handleChange}
                                    value={this.state.NewVendorForm.Contact}
                                  />
                                </Col>

                                <Col lg="12" className="form-group">
                                  <Label for="act-name">Contact Person Mobile Number<span className="text-danger" ></span></Label>
                                  <Input type="text" id="act-name"
                                    placeholder="Enter Contact Number"
                                    onChange={this.handleChange}
                                    value={this.state.NewVendorForm.Vendor_ID}
                                  />
                                </Col>

                                <Col lg="12" className="form-group">
                                  <Label for="act-name">City <span className="text-danger" ></span></Label>
                                  <Input type="text" id="act-name"
                                    placeholder="City name"
                                    onChange={this.handleChange}
                                    value={this.state.NewVendorForm.City}
                                  />
                                </Col>

                                <Col lg="12" className="form-group">
                                  <Label for="act-name">Contact Person Email ID <span className="text-danger" ></span></Label>
                                  <Input type="text" id="act-name"
                                    placeholder="Enter Email ID"
                                    onChange={this.handleChange}
                                    value={this.state.NewVendorForm.Contact_Person_EmailID}
                                  />
                                </Col>

                                <Col lg="12" className="form-group">
                                  <Label for="act-name">Department Name<span className="text-danger" ></span></Label>
                                  <Input type="text" id="act-name"
                                    placeholder="Enter Departmant Name"
                                    onChange={this.handleChange}
                                    value={this.state.NewVendorForm.Department_Name}
                                  />
                                </Col>
                                  <Col
                                    lg="12"
                                    className="form-group align-self-center"
                                  >
                                    <Button
                                      onClick={e =>
                                        this.handleRemoveRow(e, idx)
                                      }
                                      color="primary"
                                      className="mt-3"
                                      style={{ width: "100%" }}
                                    >
                                      {" "}
                                      Delete{" "}
                                    </Button>
                                  </Col>
                                </Row>
                              </div>
                            </Form>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Button onClick={this.handleAddRow} className="btn btn-block update-btn font" type="submit">
                    Add Spoc{" "}
                  </Button>{" "}
                    </Col>
                  </Row>
                  </form>
                </CardBody>
              </Card>
              <Row>
                <Col lg={12}>
                  <div className="form-group">
                    <button className="btn update-btn font" type="submit" >
                      Submit
                    </button>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(NewVendor);