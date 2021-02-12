import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ActivityTempFilter from "./ActivityTempFilter"
class ActivityTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        {
          ATName: "TWTK Template",
          AType: "Run",
          CrtdBy: "Admin",
          CrtdOn: "15/12/2020",
        },
        {
          ATName: "WTS Template",
          AType: "Run",
          CrtdBy: "Admin",
          CrtdOn: "15/12/2020",
        },
        {
          ATName: "DILL SEY Template",
          AType: "Run",
          CrtdBy: "Admin",
          CrtdOn: "15/12/2020",
        }
      ]
    };
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this)
    this.editProduct = this.editProduct.bind(this)
    this.confirmDeleteProduct = this.confirmDeleteProduct.bind(this)
  }

  columns = [
    { field: 'ATName', header: 'Template Name' },
    { field: 'AType', header: 'Activity Type' },
    { field: 'CrtdBy', header: 'Created Date' },
    { field: 'CrtdOn', header: 'Created By' }
  ];

  editProduct(product) {
    this.setState({
      product: { ...product },
      productDialog: true
    });
  }

  confirmDeleteProduct(product) {
    this.setState({
      product,
      deleteProductDialog: true
    });
  }

  actionBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <Button className="btn update-btn mb-2"
          variant="contained"
          type="button">Use Template</Button>
        <Button
          className="btn remove-btn mb-2"
          variant="contained"
          type="button">Remove</Button>
      </React.Fragment>
    );
  }


  render() {

    const dynamicColumns = this.columns.map((col, i) => {
      return <Column key={col.field} field={col.field} header={col.header} sortable />;
    });
    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;
    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/#">Activity</Link>
                  </li>
                  <li className="breadcrumb-item active">Activity Template List</li>
                </ol>
              </div>
            </Col>
          </Row>
          <ActivityTempFilter />
          <Row>
            <Col lg={12}>
              <Card className="mini-stat">
                <CardHeader className="bl-bg text-white">
                  <b>Activity Template List</b>
                  <span className="float-right"></span>
                </CardHeader>
                <CardBody>
                  <DataTable value={this.state.products} paginator
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10, 20, 50]}>
                    {dynamicColumns}
                    <Column header="Actions" body={this.actionBodyTemplate}></Column>

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

export default ActivityTemplate;
