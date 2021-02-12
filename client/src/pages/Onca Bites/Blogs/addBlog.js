import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState } from "draft-js";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import BlogServices from "./blogServices";
import Autocomplete from "@material-ui/lab/Autocomplete";
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

    this.state = {
      selected_Data: this.props.selected_Data,
      desc: EditorState.createEmpty(),
      selectedFiles: [],
      blogTitle: "",
      activityType: "",
      blogID: 0,
      hideBlog: false,
      webSite: false,
      mobile: false,
      ShowMessage: false,
      SuccessMessage: "",
      cardHeader: "Add Blog",
      addBlogButton: true,
      showErrorMessage: false,
      validateImg: true,
      errorMessage: "",
      updateImg: false,
      update: false,
    };

    this.handleAcceptedFiles = this.handleAcceptedFiles.bind(this);
    this.onBlogEditorStateChange = this.onBlogEditorStateChange.bind(this);
    this.handleActivityTypeChange = this.handleActivityTypeChange.bind(this);
    this.getActivityTypeName = this.getActivityTypeName.bind(this);
    this.getActivityTypeID = this.getActivityTypeID.bind(this);
    this.allValidations = this.allValidations.bind(this);
    this.userProfileData = this.props.userProfileData;
    this.handleChange = this.handleChange.bind(this);
    this.image_Update = this.image_Update.bind(this);
    this.Update_Blog = this.Update_Blog.bind(this);
    this.Add_Blog = this.Add_Blog.bind(this);
    this.UserSkeyID = this.props.UserSkeyID;
    this.service = new BlogServices();
    this.spID = this.props.ProviderID;

  }
  componentDidMount() {

    if (this.props.selected_Data) {

      const { selected_Data } = this.props;
      this.setState({
        update: true,
        updateImg: true,
        cardHeader: "Update Blog",
        addBlogButton: false,
        blogID: selected_Data.Blog_ID,
        imgPath: selected_Data.Image_Path,
        blogTitle: selected_Data.Blog_Title,
        activityType: this.getActivityTypeName(selected_Data.Activity_Type_ID),
        desc: EditorState.createWithContent(
          ContentState.createFromText(selected_Data.Description)
        ),
        hideBlog: selected_Data.Visibility_Flag.data[0] > 0 ? true : false,
        webSite:
          selected_Data.Website_Visibility_Flag.data[0] > 0 ? true : false,
        mobile: selected_Data.Mobile_Visibility_Flag.data[0] > 0 ? true : false,
      });
    }
  }

  async Update_Blog(e) {
    await this.setState({ validateImg: false });
    e.preventDefault();
    if (this.allValidations()) {
      let obj = {
        P_ServiceProviderID: this.spID,
        P_BlogTitle: this.state.blogTitle,
        P_Description: this.state.desc.getCurrentContent().getPlainText(),
        P_MobileVisibilityFlag: this.state.mobile ? 1 : 0,
        P_WebsiteVisibilityFlag: this.state.webSite ? 1 : 0,
        P_VisibilityFlag: this.state.hideBlog ? 1 : 0,
        P_ImagePath: this.props.selected_Data.Image_Path,
        P_BlogID: this.state.blogID,
        P_UserSkeyID: this.UserSkeyID,
        P_ActivityTypeID: this.getActivityTypeID(this.state.activityType),
      };
      this.service.CreateUpdateBlogDetails(obj).then((res) => {
        this.setState({
          SuccessMessage: "Successfully Updated !!",
          ShowMessage: true,
        });
        // this.props.history.push("/onca-blogs");
      });
    } else {
      this.setState({
        showErrorMessage: true,
      });
    }
  }

  Add_Blog(e) {
    e.preventDefault();
    if (this.allValidations()) {
      let objData = [
        {
          item: "P_ServiceProviderID",
          value: this.spID,
        },
        {
          item: "P_BlogTitle",
          value: this.state.blogTitle,
        },
        {
          item: "P_MobileVisibilityFlag",
          value: this.state.mobile ? 1 : 0,
        },
        {
          item: "P_WebsiteVisibilityFlag",
          value: this.state.webSite ? 1 : 0,
        },
        {
          item: "P_VisibilityFlag",
          value: this.state.hideBlog ? 1 : 0,
        },
        {
          item: "P_Description",
          value: this.state.desc.getCurrentContent().getPlainText(),
        },
        {
          item: "P_BlogID",
          value: this.state.blogID,
        },
        {
          item: "P_UserSkeyID",
          value: this.UserSkeyID,
        },
        {
          item: "P_ActivityTypeID",
          value: this.getActivityTypeID(this.state.activityType),
        },
        {
          item: "img",
          value: this.state.selectedFiles[0],
        },
      ];

      //To Uplode Image
      const data = new FormData();
      objData.forEach((i) => {
        data.append(`${i.item}`, i.value);
      });

      this.service.CreateUpdateBlogs(data).then((res) => {
        if (this.state.updateImg) {
          this.setState({
            SuccessMessage: "Successfully Updated !!",
            ShowMessage: true,
          });
        } else {
          this.setState({
            SuccessMessage: "Successfully Added !!",
            ShowMessage: true,
            showErrorMessage: false,
          });
        }
        this.setState({
          blogTitle: "",
          mobile: false,
          hideBlog: false,
          webSite: false,
          selectedFiles: [],
          desc: "",
        });
        // this.props.history.push("/onca-blogs");
      });
    } else {
      this.setState({
        showErrorMessage: true,
      });
    }
  }

  //validations
  allValidations() {
    if (!this.state.blogTitle) {
      this.state.errorMessage = "Please Enter Blog Title";
      return false;
    }
    if (!this.state.activityType) {
      this.state.errorMessage = "Please Select Activity Type";
      return false;
    }
    if (this.state.desc.getCurrentContent().getPlainText().length === 0) {
      this.state.errorMessage = "Please Enter Description";
      return false;
    }

    if (this.state.validateImg) {
      if (this.state.selectedFiles.length === 0) {
        this.state.errorMessage = "Please Select Image";
        return false;
      }
      if (this.state.selectedFiles[0].size > 1572222) {
        this.state.errorMessage = "File is too large ";
        return false;
      }
    }

    return true;
  }

  getActivityTypeID(actType) {
    let activity = this.props.activity_Types.find(
      (i) => i.Activity_Type_Name === actType
    );
    return activity.Activity_Type_ID;
  }
  getActivityTypeName(id) {
    let activity = this.props.activity_Types.find(
      (i) => i.Activity_Type_ID === id
    );
    return activity.Activity_Type_Name;
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "input" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      ...this.state,
      [name]: value,
    });
  }

  // handle all checkbox
  handleCBchange = (event) => {
    let fname = event.target.name;
    let fvalue = event.target.checked;
    this.setState({
      ...this.state,
      [fname]: fvalue,
    });
  };

  onBlogEditorStateChange = (editorState) => {
    this.setState({
      ...this.state,
      desc: editorState,
    });
  };
  image_Update() {
    this.setState({
      updateImg: false,
      validateImg: true,
    });
  }

  handleActivityTypeChange = (value) => {
    this.setState({
      ...this.state,
      activityType: value,
    });
  };

  handleAcceptedFiles = (files) => {
    files.map((file) => {
      if (file.name.match(/\.(jpg|jpeg|png|gif|JPG)$/)) {
        this.setState({ showErrorMessage: false });
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          formattedSize: this.formatBytes(file.size),
        });
        this.setState({ selectedFiles: files });
        let state = this.state.selectedFiles;
      } else {
        this.setState({
          showErrorMessage: true,
          errorMessage: "This Type of File Format Not Supported",
        });
      }
    });

    this.setState({ selectedFiles: files });
  };

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
                  <li className="breadcrumb-item active">
                    {this.state.cardHeader}
                  </li>
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
                  <b>{this.state.cardHeader}</b>
                </CardHeader>
                <Row>
                  <Col sm={12}>
                    {this.state.ShowMessage ? (
                      <div class="alert alert-success" role="alert">
                        {this.state.SuccessMessage}
                      </div>
                    ) : null}
                    {this.state.showErrorMessage ? (
                      <div class="alert alert-danger" role="alert">
                        {this.state.errorMessage}
                      </div>
                    ) : null}
                  </Col>
                </Row>
                <CardBody>
                  <Form>
                    <Row>
                      <Col lg={6}>
                        <div className="form-group">
                          <Label for="blogTitle">
                            Blog Title <span className="text-danger"> *</span>
                          </Label>
                          <Input
                            type="text"
                            name="blogTitle"
                            id="blogTitle"
                            onChange={this.handleChange}
                            value={this.state.blogTitle}
                            placeholder="Enter Blog Title"
                          />
                        </div>

                        <div className="form-group">
                          <Label for="activityType">
                            Activity Type
                            <span className="text-danger"> *</span>
                          </Label>

                          <Autocomplete
                            options={this.props.activity_Types}
                            onInputChange={(event, value) => {
                              this.handleActivityTypeChange(value);
                            }}
                            getOptionLabel={(option) =>
                              option.Activity_Type_Name
                            }
                            renderInput={(params) => (
                              <div ref={params.InputProps.ref}>
                                <input
                                  placeholder="Select Activity Type"
                                  value={this.state.activityType}
                                  type="text"
                                  {...params.inputProps}
                                />
                              </div>
                            )}
                          />
                        </div>
                        <div className="form-group ">
                          <Label for="act-dec">
                            Description <span className="text-danger">*</span>
                          </Label>
                          <Editor
                            name="AODActivityDescription"
                            editorState={this.state.desc}
                            onEditorStateChange={this.onBlogEditorStateChange}
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
                      </Col>
                      <Col lg={6}>
                        {this.state.updateImg ? (
                          <div>
                            <img
                              src={this.props.selected_Data.Image_Path}
                              width="200px"
                              height="200px"
                              onError={(e) =>
                                (e.target.src =
                                  "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
                              }
                              alt=""
                              className="product-image"
                            />
                            <Button
                              className="btn update-btn ml-5"
                              onClick={() => this.image_Update()}
                            >
                              Change Image{" "}
                            </Button>
                          </div>
                        ) : (
                            <div>
                              <Label className="mt-1" for="group">
                                Upload Image{" "}
                                <span className="text-danger font-size-10">
                                  * (Approximately 1024px*500px)
                              </span>
                              </Label>
                              <Dropzone
                                onDrop={(acceptedFiles) =>
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
                            </div>
                          )}

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
                            name="hideBlog"
                            control={
                              <Checkbox
                                color="primary"
                                onChange={this.handleCBchange}
                                checked={this.state.hideBlog}
                              />
                            }
                            label="Hide Blog"
                          />
                          <FormControlLabel
                            name="webSite"
                            control={
                              <Checkbox
                                color="primary"
                                onChange={this.handleCBchange}
                                checked={this.state.webSite}
                              />
                            }
                            label="Website"
                          />

                          <FormControlLabel
                            name="mobile"
                            control={
                              <Checkbox
                                color="primary"
                                onChange={this.handleCBchange}
                                checked={this.state.mobile}
                              />
                            }
                            label="Mobile"
                          />
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
              <div className="form-group">
                {this.state.addBlogButton ? (
                  <Button
                    onClick={(e) => this.Add_Blog(e)}
                    className="btn update-btn"
                  >
                    Submit
                  </Button>
                ) : (
                    <div>
                      {this.state.updateImg ? (
                        <Button
                          onClick={(e) => this.Update_Blog(e)}
                          className="btn update-btn"
                        >
                          Update
                        </Button>
                      ) : (
                          <Button
                            onClick={(e) => this.Add_Blog(e)}
                            className="btn update-btn"
                          >
                            Update
                          </Button>
                        )}
                    </div>
                  )}
              </div>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    activity_Types: state.Blogs != undefined ? state.Blogs.activiyTypes : null,
    selected_Data: state.Blogs != undefined ? state.Blogs.selectedData : null,
    userProfileData: state.userProfileData.ProfileData,
    ProviderID:
      state.currentPageName.roleAndProvider.selectedRole.Service_Provider_ID,
    UserSkeyID:
      state.userProfileData != undefined
        ? state.userProfileData.ProfileData[0][0].User_Skey_ID
        : null,
  };
};

export default withRouter(connect(mapStatetoProps)(AddBlog));
