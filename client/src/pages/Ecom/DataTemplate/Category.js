import React, { Component } from 'react';
import { withRouter, Link, } from 'react-router-dom';
import DataTable, { createTheme } from 'react-data-table-component';
import CsvDownload from 'react-json-to-csv';
import { connect } from "react-redux";
import { Row, Col, Modal } from "reactstrap";
import Dropzone from "react-dropzone";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Label
} from "reactstrap";

// import users
import user1 from "../../../assets/images/users/user-1.jpg";
import user2 from "../../../assets/images/users/user-2.jpg";
import user3 from "../../../assets/images/users/user-3.jpg";
import user4 from "../../../assets/images/users/user-4.jpg";

const UsersActvitiesData = [
  {
    id: 1,
    CategoryIcon: user1,
    CategoryName: 'Apparels',
    SubCategoryCount: 5,
    ProductQuality: 1000,
    Status: 'Active',

  },
  {
    id: 2,
    CategoryIcon: user2,
    CategoryName: 'Books',
    SubCategoryCount: 1,
    ProductQuality: 5000,
    Status: 'Active',

  },
  {
    id: 3,
    CategoryIcon: user3,
    CategoryName: 'Accessories',
    SubCategoryCount: 10,
    ProductQuality: 2000,
    Status: 'Active',

  },
  {
    id: 4,
    CategoryIcon: user4,
    CategoryName: 'Nutrition',
    SubCategoryCount: 5,
    ProductQuality: 1000,
    Status: 'Active',

  }
];
const headerStyle = {
  rows: {
    style: {
      minHeight: '100px', // override the row height
    }
  },
  headCells: {
    style: {
      backgroundColor: "#EDECEC",
    },
  },
};

const columns = [
  {
    name: 'Category Icon',

    cell: (row) =>
      <div className="col-12">
        <img src={row.CategoryIcon} alt="user" className="avatar-sm rounded-circle" />
      </div>
  },
  {
    name: 'Category Name',
    selector: 'CategoryName',
    sortable: true,
    wrap: true,

  },
  {
    name: 'Sub Category count',
    selector: 'SubCategoryCount',
    sortable: true,

  },
  {
    name: 'Product Quality',
    selector: 'ProductQuality',
    sortable: true,
    wrap: true,

  },
  {
    name: 'Status',
    selector: 'Status',
    sortable: true,
    wrap: true,

  },
  {
    name: 'Action',
    width: '13.5%',
    cell: (row) =>
      <div className="col-12">
        <Button className="mb-1 btn update-btn">
          View &amp; Update
      </Button>
        <Button className="mb-1 btn">
          Suspend
      </Button>
        <Button className="mb-2 btn">
          Remove
      </Button>
      </div>
    ,
    button: true,
  },
];
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal_center: false,
      modal_scroll: false
    };
    this.add_member = this.add_member.bind(this);
    this.tog_scroll = this.tog_scroll.bind(this);
    this.handleAcceptedFiles = this.handleAcceptedFiles.bind(this);
    this.state = { selectedFiles: [] };
  }

  // File Upload
  handleAcceptedFiles = files => {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: this.formatBytes(file.size)
      })
    );

    this.setState({ selectedFiles: files });
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

  // MOdal
  removeBodyCss() {
    document.body.classList.add("no_padding");
  }
  add_member() {
    this.setState(prevState => ({
      modal_center: !prevState.modal_center
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
        <Card className="mini-stat">
          <CardHeader className="bl-bg">
            <Link to="#" className="text-white">
              <b>Category List</b>
            </Link>

            <span className="float-right">
              <Button type="button"
                className="btn update-btn font"
                onClick={this.add_member}
                data-toggle="modal"
                data-target=".bs-example-modal-center">
                Add Category
              </Button>
              <Modal
                isOpen={this.state.modal_center}
                toggle={this.add_member}
              >
                <div className="modal-header">
                  <h5 className="modal-title mt-0">Add Category</h5>
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

                  <div className="col-sm-12">

                    <div className="form-group row">
                      <Label for="catName">Category Name</Label>
                      <Input type="text" id="catName" />
                    </div>
                  </div>
                  <div className="mb-3">
                    <Label for="name">Upload Category Icon</Label>
                    <Dropzone
                      onDrop={acceptedFiles =>
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
                  </div>
                  <div className="col-sm-12">
                    <button className="btn btn-block update-btn font">
                      Add
                      </button>
                  </div>
                </div>
              </Modal>
              {/* <Input
                className="search-elem"
                type="text"
                id="searchData"
                placeholder={"Search..."}
                onChange={(event) => { this.searchAnything(event) }}
              /> */}
              <CsvDownload
                className="file-dwd ml-3"
              //      data={this.state.searchedData}
              //       filename={"user_Data.csv"}
              />
            </span>
          </CardHeader>
          <CardBody>
            <DataTable
              className="data-table"
              columns={columns}
              data={UsersActvitiesData}
              noHeader={true}
              customStyles={headerStyle}
              fixedHeader
              fixedHeaderScrollHeight="1100px"
              pagination
            />
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}
const mapStatetoProps = state => {
  return {
    // TableData:state.EcomData.TableData   
  };
};
const dispatchToProps = dispatch => {
  return {
    updateTableData: (type, payload) => {
      dispatch({ type: type, payload: payload })
    }
  }
}
export default withRouter(connect(mapStatetoProps, dispatchToProps)(Category));