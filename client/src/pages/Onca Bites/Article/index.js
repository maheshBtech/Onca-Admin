import React, { Component } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Button,
  } from "reactstrap";
const blogData = [
    {
      blgName: "Running",
      actType:"run",
      crtBy: "Admin",
      crtdOn: "12/12/2020"
    },
    {
        blgName: "Yoga",
        actType:"Yoga",
        crtBy: "Admin",
        crtdOn: "12/12/2020"
    },
    {
      
        blgName: "Zumba",
        actType:"Zumba",
        crtBy: "Admin",
        crtdOn: "12/12/2020"
    }
  ];
  const headerStyle = {
    rows: {
      style: {
        minHeight: "110px", // override the row height
      },
    },
    headCells: {
      style: {
        backgroundColor: "#EDECEC",
      },
    },
  };
const columns = [
    {
      name: "Blog Name",
      selector: "blgName",
      sortable: true,
      wrap: true,
    },
    {
      name: "Related To",
      selector:"actType",
      sortable: true,
      wrap: true,
    },
    {
      name: "Created By",
      selector: "crtBy",
      sortable: true,
      wrap: true,
    },
    {
      name: "Created On",
      selector:"crtdOn",
      sortable: true,
      wrap: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="col-12">
          <Button
            className="btn update-btn mb-2 mt-2"
            variant="contained"
            type="button"
            data-toggle="modal"
            data-target=".bs-example-modal-center"
          >
            View &amp; Update
          </Button>
          <Button
            className="btn remove-btn mb-2"
            variant="contained"
            type="button"
          >
            Remove
          </Button>
        </div>
      ),
      button: true,
    },
  ];
class Blogs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.callAddBlog = this.callAddBlog.bind(this);
  }
  callAddBlog()
  {

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
           <Row>
            <Col lg={12}>
              <Card className="mini-stat">
                <CardHeader className="bl-bg text-white">
                  <b>Blog List</b>
                  <span className="float-right"></span>
                </CardHeader>
                <CardBody>
                  <DataTable
                    className="data-table"
                    columns={columns}
                    data={blogData}
                    noHeader={true}
                    customStyles={headerStyle}
                    fixedHeader
                    fixedHeaderScrollHeight="300px"
                    pagination
                  />
                </CardBody>
              </Card>
            </Col>   
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default Blogs;
