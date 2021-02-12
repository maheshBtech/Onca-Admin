import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import ReactDOM from 'react-dom';
import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Modal
} from "reactstrap";
import AddTemplate from "./SubComponents/addTemplate";
import { Link } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import TermService from './SubComponents/TermService';

class Terms extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      { field: 'ServType', header: 'Service Type' },
      { field: 'Type', header: 'Type' },
      { field: 'TemplateName', header: 'Template Name' },
      { field: 'Desc', header: 'Description' }
    ];
    this.state = {
      products: [],
      modal_center: false,
      modal_scroll: false,
    };
    this.add_template = this.add_template.bind(this);
    this.template_scroll = this.template_scroll.bind(this);
    this.TermService = new TermService();
  }
  componentDidMount() {
    this.TermService.getProductsSmall().then(data => this.setState({ products: data }));
  }


  // Modal Popup
  removeBodyCss() {
    document.body.classList.add("no_padding");
  }
  add_template() {
    this.setState((prevState) => ({
      modal_center: !prevState.modal_center,
    }));
    this.removeBodyCss();
  }
  template_scroll() {
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
        <Button className="btn update-btn mb-2">View &amp; Update</Button>
        <Button className="btn btn-seondary mb-2">Assign</Button>
        <Button className="btn btn-danger">Remove</Button>
      </React.Fragment>
    );
  }
  inMemData = [
    {
      "ServType": "Training",
      "Type": "Run",
      "TemplateName": "Run Terms & Condition",
      "Desc": "On boarding for waiver for new location",
    },
    {
      "ServType": "Training",
      "Type": "Yoga",
      "TemplateName": "Ypoga Terms & Condition",
      "Desc": "On boarding for waiver for new location",
    },
    {
      "ServType": "Ecommerce",
      "Type": "Nutrition",
      "TemplateName": "Nutrition Terms & Condition",
      "Desc": "On boarding for waiver for new location",
    }
  ]

  render() {
    const dynamicColumns = this.columns.map((col, i) => {
      if (col.field === 'ServType') {
        return <Column key={col.field} field={col.field} body={this.userDetailTemplate} header={col.header} headerStyle={{ width: '100px' }} sortable />
      }
      if (col.field === 'Type') {
        return <Column key={col.field} field={col.field} body={this.userDetailTemplate} header={col.header} headerStyle={{ width: '100px' }} sortable />
      }
      if (col.field === 'TemplateName') {
        return <Column key={col.field} field={col.field} body={this.userDetailTemplate} header={col.header} headerStyle={{ width: '150px' }} sortable />
      }
      else{
        return <Column key={col.field} field={col.field} header={col.header} sortable />;
      }
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
                  <li className="breadcrumb-item active">Terms &amp; Condition</li>
                </ol>
              </div>
            </Col>
          </Row>


          <Col lg={12} className="text-right">
            <button
              className="btn update-btn mb-3"
              onClick={this.add_template}
              data-toggle="modal"
              data-target=".bs-example-modal-center"
            >
              Add Template
            </button>
            <Modal isOpen={this.state.modal_center} toggle={this.add_template}>
              <div className="modal-header">
                <h5 className="modal-title mt-0">Add Template</h5>
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
                <AddTemplate />
              </div>
            </Modal>
          </Col>


          <Row>
            <Col lg={12}>
              <Card className="mini-stat">
                <CardHeader className="bl-bg text-white">
                  <b>Term &amp; Condition Template List</b>
                  <span className="float-right"></span>
                </CardHeader>
                <CardBody>
                  <DataTable 
                    value={this.inMemData} 
                    scrollable scrollHeight="500px" style={{ width: '100%' }} 
                    className="p-datatable-gridlines"
                    paginator
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10,20,50]}
                  >
                    {dynamicColumns}
                    <Column header="Action" style={{ width: '150px' }} body={this.actionBodyTemplate}></Column>
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

export default Terms;
