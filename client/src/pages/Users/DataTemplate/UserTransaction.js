import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import DataTable, { createTheme } from 'react-data-table-component';
import UsersFilter from '../SubComponent/UsersFilter';
import {
  Card,
  Row,
  Col,
  CardBody,
  CardHeader,
  Label,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import CsvDownload from 'react-json-to-csv'

const UserTransactionData = [
  {
    id: 1,
    Items: 'Srinidhi',
    Type: 'Vnsrinidhi@yahoo.com',
    TransDate: '2020-09-21 17:50:58',
    ItemAmt: 2356.00,
    ItmeTax: 300.00,
    ItemStatus: 'Paid',
    PaymentMode: 'PugMark, Payment Gateway',
  },
  {
    id: 2,
    Items: 'Prepare For Race',
    Type: 'Training',
    TransDate: '2020-09-21 17:50:58',
    ItemAmt: 8900.00,
    ItmeTax: 400.00,
    ItemStatus: 'Paid',
    PaymentMode: 'Payment Gateway',
  },
  {
    id: 3,
    Items: 'Yoga Mat',
    Type: 'Retail',
    TransDate: '2020-09-21 17:50:58',
    ItemAmt: 4000.00,
    ItmeTax: 720.00,
    ItemStatus: 'Unpaid',
    PaymentMode: 'NA',
  },
  {
    id: 4,
    Items: 'Watch',
    Type: 'Retail',
    TransDate: '2020-09-21 17:50:58',
    ItemAmt: 11000.00,
    ItmeTax: 1980.00,
    ItemStatus: 'Paid',
    PaymentMode: 'Payment Gateway',
  },
  {
    id: 5,
    Items: 'Feb Fitness 2018',
    Type: 'Training',
    TransDate: '2020-09-21 17:50:58',
    ItemAmt: 2439.00,
    ItmeTax: 200.00,
    ItemStatus: 'Paid',
    PaymentMode: 'Payment Gateway',
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
    name: 'Items',
    selector: 'Item_Name',
    sortable: true,
    wrap: true,
    width: '30%',
  },
  {
    name: 'Type',
    selector: 'Item_Type',
    sortable: true,
  },
  {
    name: 'Date & Time',
    selector: 'Transaction_Date_Time',
    sortable: true,
    wrap: true
  },
  {
    name: 'Amount (Before Tax)',
    selector: 'Amount',
    sortable: true,
    wrap: true,
  },
  {
    name: 'GST Amount',
    selector: 'GST_Amount',
    sortable: true
  },
  {
    name: 'Status',
    selector: 'Status',
    sortable: true,
    wrap: true
  },
  {
    name: 'Payment Mode',
    selector: 'Payment_Mode',
    sortable: true,
    wrap: true
  }
];
class UserTransaction extends Component {
  constructor(props) {   
    super(props);
    this.state = {
      rawTransactionData:"",
      filterTableData:""
    };
    this.loadTransactionData();
      }

  loadTransactionData(){    
    if(this.props.transactionData!==""){
    this.state.rawTransactionData = this.props.transactionData
    this.state.filterTableData = this.props.transactionData
  }
  }
  searchAnything(event){
    let rawData = this.state.rawTransactionData
    let searchKey = event.target.value.toLowerCase()
    var filteredItem =[]
    if(searchKey === "" || searchKey === " "){
      this.setState({filterTableData:rawData})   
  }
  else{
    filteredItem = []
    rawData.forEach(obj=>{
      if(obj.Item_Name.toLowerCase().includes(searchKey) || obj.Item_Type.toLowerCase().includes(searchKey) || obj.Transaction_Date_Time.toString().toLowerCase().includes(searchKey) || obj.Amount.toString().toLowerCase().includes(searchKey) || obj.GST_Amount.toString().toLowerCase().includes(searchKey) || obj.Status.toLowerCase().includes(searchKey) || obj.Payment_Mode.toLowerCase().includes(searchKey))
    {
      filteredItem.push(obj)
    }
    });
    this.setState({filterTableData:filteredItem})
  }
  }
  render() {
    return (
      <React.Fragment>
          <Card className="mini-stat">
            <CardHeader className="bl-bg">
              <Link to="#" className="text-white">
                <b>Transactions</b>
              </Link>
              <span className="float-right">
          <Input 
            className="search-elem"
            type="text" 
            id="searchData"
            placeholder={"Search..."} 
            onChange={(event)=>{this.searchAnything(event)}}
          />
          <CsvDownload 
            className="file-dwd ml-3" 
           data={this.state.filterTableData}
            filename={"Activity_Data.csv"}
          />
        </span>
            </CardHeader>
            <CardBody>
              <DataTable
                className="data-table"
                columns={columns}
                data={this.state.filterTableData}
                noHeader={true}
                customStyles={headerStyle}
                fixedHeader
                fixedHeaderScrollHeight="300px"
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
    transactionData : state.userPageData.transactionData    
  };
};
const dispatchToProps = dispatch => {
  return {
      updateTableData: (type, payload) => {
          dispatch({ type: type, payload: payload })
      }
  }
}
export default withRouter(connect(mapStatetoProps, dispatchToProps)(UserTransaction));