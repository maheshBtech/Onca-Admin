import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import ReactDOM from 'react-dom';
import React, { Component } from "react";
import SettingMenu from "../Shared/SettingMenu";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import ProductService from './SubComponent/ProductService';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

class TablePrime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            expandedRows: null
        };
        this.productService = new ProductService();
        this.amountBodyTemplate = this.amountBodyTemplate.bind(this);
        this.rowExpansionTemplate = this.rowExpansionTemplate.bind(this);
        this.imageBodyTemplate = this.imageBodyTemplate.bind(this);
        this.priceBodyTemplate = this.priceBodyTemplate.bind(this);
        this.ratingBodyTemplate = this.ratingBodyTemplate.bind(this);
        this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
        this.statusOrderBodyTemplate = this.statusOrderBodyTemplate.bind(this);
        this.onRowExpand = this.onRowExpand.bind(this);
        this.onRowCollapse = this.onRowCollapse.bind(this);
        this.expandAll = this.expandAll.bind(this);
        this.collapseAll = this.collapseAll.bind(this);
    }
    componentDidMount() {
        this.productService.getProductsWithOrdersSmall().then(data => this.setState({ products: data }));
    }

    onRowExpand(event) {
        this.toast.show({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 });
    }

    onRowCollapse(event) {
        this.toast.show({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000 });
    }

    expandAll() {
        let expandedRows = {};
        this.state.products.forEach(p => expandedRows[`${p.id}`] = true);

        this.setState({
            expandedRows
        }, () => {
            this.toast.show({ severity: 'success', summary: 'All Rows Expanded', life: 3000 });
        });
    }

    collapseAll() {
        this.setState({
            expandedRows: null
        }, () => {
            this.toast.show({ severity: 'success', summary: 'All Rows Collapsed', life: 3000 });
        });
    }

    formatCurrency(value) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    amountBodyTemplate(rowData) {
        return this.formatCurrency(rowData.amount);
    }

    statusOrderBodyTemplate(rowData) {
        return <span className={`order-badge order-${rowData.status.toLowerCase()}`}>{rowData.status}</span>;
    }

    imageBodyTemplate(rowData) {
        return <img src={`showcase/demo/images/product/${rowData.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image" />;
    }

    priceBodyTemplate(rowData) {
        return this.formatCurrency(rowData.price);
    }

    ratingBodyTemplate(rowData) {
        return <Rating value={rowData.rating} readonly cancel={false} />;
    }

    statusBodyTemplate(rowData) {
        return <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
    }

    rowExpansionTemplate(data) {
        let headerGroup = <ColumnGroup>
            <Row>
                <Column header="" colSpan={1} />
                <Column header="Male" colSpan={3} />
                <Column header="Female" colSpan={3} />
            </Row>
            <Row>
                <Column header="Group Name"/>
                <Column header="10K Time"/>
                <Column header="HM Time"/>
                <Column header="FM Time"/>
                <Column header="10K Time"/>
                <Column header="HM Time"/>
                <Column header="FM Time"/>
            </Row>
        </ColumnGroup>;
        return (
            <div className="orders-subtable">
                <DataTable value={data.orders} headerColumnGroup={headerGroup}>
                    <Column field="grpName" header="Group Name" sortable></Column>
                    <Column field="M-10K" header="10K Time" sortable></Column>
                    <Column field="M-HM" header="HM Time" sortable></Column>
                    <Column field="M-FM" header="FM Time" sortable></Column>
                    <Column field="F-10K" header="10K Time" sortable></Column>
                    <Column field="F-HM" header="HM Time" sortable></Column>
                    <Column field="F-FM" header="FM Time" sortable></Column>
                </DataTable>
            </div>
        );
    }
    actionBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <Button className="btn update-btn mr-2">Update</Button>
                <Button className="btn btn-primary mr-2">Suspend</Button>
                <Button className="btn btn-danger mr-2">Remove</Button>
            </React.Fragment>
        );
    }
    inMemData = [
        { 
            "id": "1000", 
            "code": "f230fh0g3", 
            "grpSetName": "HDHM", 
            "description": "Product Description", 
            "image": "bamboo-watch.jpg", 
            "price": 65, 
            "category": "Accessories", 
            "quantity": 24, 
            "inventoryStatus": "INSTOCK", 
            "rating": 5, 
            "orders": [
                { 
                    "grpName": "HDHM20 Indira",
                    "M-10K": "01:00:01 - 01:20:00",
                    "M-HM": "02:00:01 - 02:30:00",
                    "M-FM": "04:30:01 - 05:00:00",
                    "F-10K": "01:10:01 - 01:30:00",
                    "F-HM": "02:18:01 - 02:40:00",
                    "F-FM": "05:00:01 - 05:30:00",
                }, 
                { 
                    "grpName": "HDHM20 Luis",
                    "M-10K": "01:20:01 - 01:40:00",
                    "M-HM": "02:30:01 - 03:00:00",
                    "M-FM": "05:00:01 - 05:30:00",
                    "F-10K": "00:45:01 - 10:00:00",
                    "F-HM": "01:10:01 - 10:00:00",
                    "F-FM": "02:10:01 - 10:00:00",
                }
            ] 
        },
    ]

    render() {
        
        const header = (
            <div className="table-header-container">
                <Button icon="pi pi-plus" label="Expand All" onClick={this.expandAll} className="p-mr-2" />
                <Button icon="pi pi-minus" label="Collapse All" onClick={this.collapseAll} />
            </div>
        );
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <Row className="align-items-center">
                        <Col sm={6}>
                            <div className="page-title-box">
                                <h4 className="font-size-18">Basic Tables</h4>
                                <ol className="breadcrumb mb-0">
                                    <li className="breadcrumb-item">
                                        <Link to="/#">Veltrix</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <Link to="/#">Tables</Link>
                                    </li>
                                    <li className="breadcrumb-item active">Basic Tables</li>
                                </ol>
                            </div>
                        </Col>

                        <Col sm="6">
                            <div className="float-right d-none d-md-block">
                                <SettingMenu />
                            </div>
                        </Col>
                    </Row>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="datatable-rowexpansion-demo">
                                <Toast ref={(el) => this.toast = el} />
                                <div className="card">
                                    <DataTable
                                        value={this.inMemData}
                                        expandedRows={this.state.expandedRows}
                                        onRowToggle={(e) => this.setState({ expandedRows: e.data })}
                                        onRowExpand={this.onRowExpand}
                                        onRowCollapse={this.onRowCollapse}
                                        rowExpansionTemplate={this.rowExpansionTemplate}
                                        dataKey="id"
                                        paginator
                                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10, 20, 50]}
                                    >
                                        <Column expander style={{ width: '3em' }} />
                                        <Column field="grpSetName" header="Group Set Name" sortable style={{ width: '60%' }} />
                                        <Column body={this.actionBodyTemplate}></Column>
                                    </DataTable>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default TablePrime;
