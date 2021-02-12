import React, { Component } from "react";
import { Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap";
import { Modal } from "reactstrap";
import { Link } from "react-router-dom";
import Add_Activity_Type from "./sub components/Add_Activity_Type";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const products = [
  {
    ATIcon: 1,
    ATName: "Running",
  },
  {
    ATIcon: 2,
    ATName: "Cycling",
  },
  {
    ATIcon: 3,
    ATName: "Swimming",
  },
  {
    ATIcon: 4,
    ATName: "Zumba",
  },
  {
    ATIcon: 5,
    ATName: "Gym",
  },
];
const headerStyle = {
  rows: {
    style: {
      minHeight: "80px", // override the row height
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
      name: "Activity Type Icon",
      selector: "id",
      sortable: true,
      wrap: true,
    },
    {
      name: "Activity Type Name",
      selector: "DistanceOpt",
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
            onClick={() => this.updateMemberDistance(row)}
          >
            View &amp; Update
          </Button>

          <Button
            className="btn remove-btn mb-2"
            variant="contained"
            type="button"
            onClick={(event) => this.RemoveDistance(event, row, "Rmv")}
          >
            Remove
          </Button>
        </div>
      ),
      button: true,
    },
  ];

class SettingsActivityType extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modal_center: false,
        modal_scroll: false,
    };
    this.add_activity = this.add_activity.bind(this);
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this)
    
  }
  removeBodyCss() {
    document.body.classList.add("no_padding");
  }
  add_activity() {
    this.setState((prevState) => ({
      modal_center: !prevState.modal_center
    }));
    this.removeBodyCss();
  }
  activity_scroll() {
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
  actionBodyTemplate(rowData) {
    return (
        <React.Fragment>
            <Button  className="btn update-btn mb-2"
            variant="contained"
            type="button"> View &amp; Update</Button>
             <Button
             className="btn btn-warning mb-2"
             variant="contained"
             type="button">Suspend</Button>
            <Button
             className="btn remove-btn mb-2"
             variant="contained"
             type="button">Remove</Button>
        </React.Fragment>
    );
}
columns = [
    {field: 'ATIcon', header: 'Activity Type Icon'},
    {field: 'ATName', header: 'Activity Type Name'},
   
];


  render() {
    const dynamicColumns = this.columns.map((col,i) => {
        return <Column  key={col.field} field={col.field} header={col.header} sortable/>;
    });
    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
               
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/#">Settings</Link>
                  </li>
                  <li className="breadcrumb-item active">Activity Type</li>
                </ol>
              </div>
            </Col>

          </Row>
          <Row>
          <Col lg={12} className="text-right">
          <button
                className="btn update-btn mb-3"
                onClick={this.add_activity}
                data-toggle="modal"
                data-target=".bs-example-modal-center"
              >
                Add Activity Type
              </button>
              <Modal
                isOpen={this.state.modal_center}
                toggle={this.add_activity}
              >
                <div className="modal-header">
                  <h5 className="modal-title mt-0">Add Activity Type</h5>
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
                  <Add_Activity_Type
                    
                  />
                </div>
              </Modal>

              </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Card className="mini-stat">
                <CardHeader className="bl-bg text-white">
                  <b>Activity Type List</b>
                  <span className="float-right"></span>
                </CardHeader>
                <CardBody>
                <DataTable value={products} paginator className="p-datatable-gridlines"
                 paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                 currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10, 20, 50]}>
                        {dynamicColumns}
                        <Column style = {{width:"200px"}} header = "Actions" body={this.actionBodyTemplate}></Column>
                      
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

export default SettingsActivityType;
