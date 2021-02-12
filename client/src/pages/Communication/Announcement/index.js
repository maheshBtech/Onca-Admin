import React, { Component } from "react";
import { Row, Col, Card, CardHeader, CardBody, Button, Modal } from "reactstrap";
import { Link } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import AddAnnouncement from "./subComponent/addAnnouncement";
class Announcement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal_center: false,
      announcementData: [
        {
          notifyType: "Add",
          type: "Run",
          date: "12/12/2020",
          mobile: "Yes",
          web: "Yes",
          admin: "Yes"
        },
        {
          notifyType: "Modify",
          type: "Yoga",
          date: "12/12/2020",
          mobile: "No",
          web: "No",
          admin: "Yes"
        },
        {
          notifyType: "Delete",
          type: "Nutrition",
          date: "12/12/2020",
          mobile: "No",
          web: "No",
          admin: "Yes"
        }
      ]
    };
    this.add_announcement = this.add_announcement.bind(this)
  }

  columns = [
    { field: 'notifyType', header: 'Activity Type' },
    { field: 'type', header: 'Name' },
    { field: 'date', header: 'Date' },
    { field: 'mobile', header: 'Mobile App' },
    { field: 'web', header: 'WebSite' },
    { field: 'admin', header: 'Admin' }
  ];
  add_announcement() {
    this.setState((prevState) => ({
      modal_center: !prevState.modal_center,
    }));
    this.removeBodyCss();
  }
  removeBodyCss() {
    document.body.classList.add("no_padding");
  }
  show() {
    this.setState({ visible: true });
  }
  hide() {
    this.setState({ visible: false });
  }

  render() {
    const dynamicColumns = this.columns.map((col, i) => {
      return <Column key={col.field} field={col.field} header={col.header} sortable />;
    });

    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">

                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/#">Communication</Link>
                  </li>
                  <li className="breadcrumb-item active">Announcement</li>
                </ol>
              </div>
            </Col>
          </Row>

          <Col lg={12} className="text-right">
            <button
              className="btn update-btn mb-3"
              onClick={this.add_announcement}
              data-toggle="modal"
              data-target=".bs-example-modal-center"
            >
              Add Announcement
            </button>
          </Col>
          <Modal isOpen={this.state.modal_center} toggle={this.add_announcement}>
            <div className="modal-header">
              <h5 className="modal-title mt-0">Add Announcement</h5>
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
              <AddAnnouncement />

            </div>
          </Modal>


          <Row>

            <Col lg={12}>
              <Card className="mini-stat">
                <CardHeader className="bl-bg text-white">
                  <b>Announcement List</b>
                  <span className="float-right"></span>
                </CardHeader>
                <CardBody>
                  <DataTable value={this.state.announcementData} paginator
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10, 20, 50]}>
                    {dynamicColumns}
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

export default Announcement;
