import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import store from "../../../store/index";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap";
import BlogServices from "./blogServices";
import Information_Message from "./Information_Message";
import ReactHtmlParser from "react-html-parser";

const columns = [
  {
    field: "Blog_Title",
    header: "Blog Name",
  },
  {
    header: "Related To",
    field: "Activity_Type_Name",
  },
  {
    header: "Description",
    field: "Description",
  },
  {
    header: "Created By",
    field: "Created_By",
  },
  {
    header: "Created On",
    field: "Created_Date",
  },
];

class Blogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogList: [],
      delSuccessMsg: false,
    };
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
    store.dispatch({ type: "CHANGE_CURRENT_PAGE_NAME", payload: "Blogs" });
    this.service = new BlogServices();
    this.userProfileData = this.props.userProfileData;
    this.spID = this.props.ProviderID;
    this.usersKeyID = this.props.UserSkeyID;
    this.GetBlogList = this.GetBlogList.bind(this);
    this.BlogListObj = this.BlogListObj.bind(this);
    this.closeDelSuccessMsg = this.closeDelSuccessMsg.bind(this);
  }
  componentDidMount() {
    if (this.userProfileData != null || this.userProfileData != undefined) {
      this.GetBlogList(this.spID);
    }
  }
  GetBlogList(spID) {
    this.service.getBlogList(spID).then((res) => {
      this.BlogListObj(res);
    });
  }

  BlogListObj(res) {
    this.setState({ blogList: [] });
    const obj = Object.assign([], this.state.blogList);
    res[0].forEach((item) => {
      obj.push({
        Visibility_Flag: item.Visibility_Flag,
        Service_Provider_ID: item.Activity_Type_ID,
        Mobile_Visibility_Flag: item.Mobile_Visibility_Flag,
        Website_Visibility_Flag: item.Website_Visibility_Flag,
        Image_Path: item.Image_Path,
        Description: item.Description,
        Created_Date: item.Created_Date,
        Created_By: item.Created_By,
        Blog_Title: item.Blog_Title,
        Blog_ID: item.Blog_ID,
        Activity_Type_Name: item.Activity_Type_Name,
        Activity_Type_ID: item.Activity_Type_ID,
        Active_Flag: item.Active_Flag,
      });
    });

    store.dispatch({ type: "BLOG_TABLE_DATA", payload: obj });
    store.dispatch({ type: "ACTIVITY_TYPES", payload: res[1] });
    store.dispatch({ type: "SELECTED_BLOG_DATA", payload: null });
    this.setState({
      blogList: obj,
    });
  }

  blog_Update(rowData) {
    let blogData = this.props.blog_List;
    let data = blogData.find((i) => i.Blog_ID === rowData.Blog_ID);
    store.dispatch({ type: "SELECTED_BLOG_DATA", payload: data });
  }

  actionBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <Link to="/onca-addblog">
          <Button
            className="btn update-btn mb-2"
            variant="contained"
            type="button"
            onClick={() => {
              this.blog_Update(rowData);
            }}
          >
            View &amp; Update
          </Button>
        </Link>

        <Button
          className="btn remove-btn mb-2"
          variant="contained"
          type="button"
          onClick={() => {
            this.removeBlog(rowData);
          }}
        >
          Remove
        </Button>
      </React.Fragment>
    );
  }
  removeBlog(rowdata) {
    let obj = {
      P_BlogID: rowdata.Blog_ID,
      P_ActiveFlag: rowdata.Active_Flag.data[0],
      P_DeleteFlag: 1,
      P_UserSKeyID: this.usersKeyID,
    };

    this.service.RemoveFAQs(obj).then((res) => {
      this.setState({ delSuccessMsg: true, model_title: "Deleted !!!" });
      this.GetBlogList(this.spID);
    });
  }

  closeDelSuccessMsg() {
    this.setState({ delSuccessMsg: false });
  }

  render() {
    const dynamicColumns = columns.map((col) => {
      return (
        <Column
          key={col.field}
          field={col.field}
          header={col.header}
          sortable
        />
      );
    });

    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/#">Onca-Bites</Link>
                  </li>
                  <li className="breadcrumb-item active">Blogs</li>
                </ol>
              </div>
            </Col>
          </Row>

          <Row>
            <Col xl={12} className="text-right mb-2 float-right">
              <Link to="/onca-addblog" className="btn update-btn">
                Add Blog
              </Link>
            </Col>
          </Row>
          {this.state.delSuccessMsg ? (
            <Information_Message
              title={this.state.model_title}
              modelOkButtonClicked={() => this.closeDelSuccessMsg()}
            ></Information_Message>
          ) : null}
          <Row>
            <Col lg={12}>
              <Card className="mini-stat">
                <CardHeader className="bl-bg text-white">
                  <b>Blog List</b>
                  <span className="float-right"></span>
                </CardHeader>
                <CardBody>
                  <DataTable
                    className="p-datatable-gridlines"
                    value={this.state.blogList}
                    paginator
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                    rows={10}
                    rowsPerPageOptions={[10, 20, 50]}
                  >
                    {dynamicColumns}
                    <Column
                      header="Actions"
                      body={this.actionBodyTemplate}
                    ></Column>
                  </DataTable>
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
    blog_List: state.Blogs != undefined ? state.Blogs.blogList : null,
    userProfileData: state.userProfileData.ProfileData,
    ProviderID:
      state.currentPageName.roleAndProvider.selectedRole.Service_Provider_ID,
    UserSkeyID:
      state.userProfileData != undefined
        ? state.userProfileData.ProfileData[0][0].User_Skey_ID
        : null,
  };
};
export default withRouter(connect(mapStatetoProps)(Blogs));
