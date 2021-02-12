import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import AddFeedBackTemp from "./AddFeedBackTemp";
import ReactDOM from "react-dom";
import React, { Component } from "react";
import { Row, Col, Card, CardHeader, CardBody, Modal } from "reactstrap";
import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import FeedbackService from "./Services/FeedbackService";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
class FeedbackTemp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      expandedRows: null,
      modal_center: false,
    };
    this.FeedbackService = new FeedbackService();
    this.amountBodyTemplate = this.amountBodyTemplate.bind(this);
    this.rowExpansionTemplate = this.rowExpansionTemplate.bind(this);
    this.searchBodyTemplate = this.searchBodyTemplate.bind(this);
    this.imageBodyTemplate = this.imageBodyTemplate.bind(this);
    this.priceBodyTemplate = this.priceBodyTemplate.bind(this);
    this.ratingBodyTemplate = this.ratingBodyTemplate.bind(this);
    this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
    this.statusOrderBodyTemplate = this.statusOrderBodyTemplate.bind(this);
    this.onRowExpand = this.onRowExpand.bind(this);
    this.onRowCollapse = this.onRowCollapse.bind(this);
    this.expandAll = this.expandAll.bind(this);
    this.collapseAll = this.collapseAll.bind(this);
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
    this.add_feedbackTemplate = this.add_feedbackTemplate.bind(this);
  }
  componentDidMount() {
    this.FeedbackService.getProductsWithOrdersSmall().then((data) =>
      this.setState({ products: data })
    );
  }

  onRowExpand(event) {
    this.toast.show({
      severity: "info",
      summary: "Product Expanded",
      detail: event.data.name,
      life: 3000,
    });
  }

  onRowCollapse(event) {
    this.toast.show({
      severity: "success",
      summary: "Product Collapsed",
      detail: event.data.name,
      life: 3000,
    });
  }

  expandAll() {
    let expandedRows = {};
    this.state.products.forEach((p) => (expandedRows[`${p.id}`] = true));

    this.setState(
      {
        expandedRows,
      },
      () => {
        this.toast.show({
          severity: "success",
          summary: "All Rows Expanded",
          life: 3000,
        });
      }
    );
  }

  collapseAll() {
    this.setState(
      {
        expandedRows: null,
      },
      () => {
        this.toast.show({
          severity: "success",
          summary: "All Rows Collapsed",
          life: 3000,
        });
      }
    );
  }

  formatCurrency(value) {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }

  amountBodyTemplate(rowData) {
    return this.formatCurrency(rowData.amount);
  }

  statusOrderBodyTemplate(rowData) {
    return (
      <span className={`order-badge order-${rowData.status.toLowerCase()}`}>
        {rowData.status}
      </span>
    );
  }

  searchBodyTemplate() {
    return <Button icon="pi pi-search" />;
  }

  imageBodyTemplate(rowData) {
    return (
      <img
        src={`/Icons/${rowData.icon}`}
        width="50px"
        height="50px"
        onError={(e) =>
          (e.target.src =
            "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
        }
        alt={rowData.image}
        className="product-image"
      />
    );
  }

  priceBodyTemplate(rowData) {
    return this.formatCurrency(rowData.price);
  }

  ratingBodyTemplate(rowData) {
    return <Rating value={rowData.rating} readonly cancel={false} />;
  }

  statusBodyTemplate(rowData) {
    return (
      <span
        className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}
      >
        {rowData.inventoryStatus}
      </span>
    );
  }

  add_feedbackTemplate() {
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

  rowExpansionTemplate(data) {
    return (
      <div className="orders-subtable">
        <DataTable value={data.fedTemp}>
          <Column
            body={this.imageBodyTemplate}
            header="Rating Option Icons"
            sortable
          ></Column>
          <Column
            field="ratingOptionName"
            header="Rating Option Name"
            sortable
            style={{ width: "500px" }}
          ></Column>
          <Column body={this.actionsInColums} header="Actions"></Column>
        </DataTable>
      </div>
    );
  }

  inMetaData = [
    {
      name: "Run",
      fedTemp: [
        {
          icon: "smile.png",
          ratingOptionName: "In my zone - Just Right!",
        },
        {
          icon: "tug.png",
          ratingOptionName: "Too Easy",
        },
        {
          icon: "sad.png",
          ratingOptionName: "Could Not Complete",
        },
        {
          icon: "cry.png",
          ratingOptionName: "Phew! Barely made it!",
        },
      ],
    },
    {
      name: "Yoga",
      fedTemp: [
        {
          icon: "tug.png",
          ratingOptionName: "Too Hard",
        },
      ],
    },
    {
      name: "Cycling",
      fedTemp: [
        {
          icon: "sad.png",
          ratingOptionName: "Good",
        },
      ],
    },
  ];

  actionBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <Button className="btn update-btn mr-2 mb-1">View &amp; Update</Button>
        <Button className="btn btn-danger mb-1">Remove</Button>
      </React.Fragment>
    );
  }
  actionsInColums(rowData) {
    return (
      <React.Fragment>
        <Button className="btn btn-danger">Remove</Button>
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">Activity</li>
                  <li className="breadcrumb-item active">Feedback Template</li>
                </ol>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="12" className="text-right">
              <button
                className="btn update-btn mb-3"
                onClick={this.add_feedbackTemplate}
              >
                Add Feedback Template
              </button>
              <Modal
                isOpen={this.state.modal_center}
                toggle={this.add_feedbackTemplate}
              >
                <div className="modal-header">
                  <h5 className="modal-title">Add Feedback Template</h5>
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
                  <AddFeedBackTemp />
                </div>
              </Modal>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Card className="mini-stat">
                <CardHeader className="bl-bg text-white">
                  <b>Feedback Template List</b>
                  <span className="float-right"></span>
                </CardHeader>
                <CardBody>
                  <Toast ref={(el) => (this.toast = el)} />
                  <DataTable
                    value={this.inMetaData}
                    expandedRows={this.state.expandedRows}
                    onRowToggle={(e) => this.setState({ expandedRows: e.data })}
                    onRowExpand={this.onRowExpand}
                    onRowCollapse={this.onRowCollapse}
                    rowExpansionTemplate={this.rowExpansionTemplate}
                    dataKey="id"
                  >
                    <Column expander style={{ width: "3em" }} />
                    <Column
                      field="name"
                      header="Template List"
                      sortable
                      style={{ width: "710px" }}
                    />
                    <Column header="Actions" body={this.actionBodyTemplate} />
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
const rootElement = document.getElementById("root");
export default FeedbackTemp;
