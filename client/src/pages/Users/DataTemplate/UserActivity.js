import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import DataTable, { createTheme } from 'react-data-table-component';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import CsvDownload from 'react-json-to-csv'

const UsersActvitiesData = [
  {
    id: 1,
    ActivityName: 'Prepare For Race',
    GroupName: 'R2F',
    RegDate: '2020-09-21 17:50:58',
    PaymentStatus: 'Paid',
    PaymentMode: 'PugMark, Payment Gateway',
  },
  {
    id: 2,
    ActivityName: 'Feb Fitness 2018',
    GroupName: 'Feb Fitness',
    RegDate: '2020-09-21 17:50:58',
    PaymentStatus: 'Paid',
    PaymentMode: 'Payment Gateway',
  },
  {
    id: 3,
    ActivityName: 'BRUR For JJS',
    GroupName: '',
    RegDate: '2020-09-21 17:50:58',
    PaymentStatus: 'Unpaid',
    PaymentMode: 'NA',
  },
  {
    id: 4,
    ActivityName: 'TWTK 2018',
    GroupName: 'TWTK Debut',
    RegDate: '2020-09-21 17:50:58',
    PaymentStatus: 'Paid',
    PaymentMode: 'Payment Gateway',
  },
  {
    id: 5,
    ActivityName: 'FTR Fitness Thru Running',
    GroupName: 'FTR19 June',
    RegDate: '2020-09-21 17:50:58',
    PaymentStatus: 'Paid',
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
    name: 'Activity Name',
    selector: 'Activity_Name',
    sortable: true,
    wrap: true,
  },
  {
    name: 'Group Name',
    selector: 'Group_Name',
    sortable: true
  },
  {
    name: 'Registration Date & Time',
    selector: 'Activity_Registration_DateTime',
    sortable: true,
    wrap: true
  },
  {
    name: 'Payment Status',
    selector: 'Payment_Status',
    sortable: true,
    wrap: true
  },
  {
    name: 'Payment Mode',
    selector: 'Payment_Mode',
    sortable: true,
    wrap: true
  },
  {
    name: 'Action',
    cell: (row) => 
    <div className="col-12">
      <Button className="mb-1 btn update-btn">
        Update
      </Button>
      <Button className="mb-1 btn">
        Suspend
      </Button>
    </div>
    ,
    button: true,
  },
];
class UserActivity extends Component {

  constructor(props) {   
    super(props);
    this.state = {
      rwaActivityTableData:"",
      filterTableData:""
    };    
    this.loadActivityTableData();
  }

  loadActivityTableData(){    
    if(this.props.activityTableData!==""){
      this.state.rwaActivityTableData = this.props.activityTableData
      this.state.filterTableData = this.props.activityTableData
    }
  }
  searchAnything(event){
    let rawData = this.state.rwaActivityTableData
    let searchKey = event.target.value.toLowerCase()
    var filteredItem =[]
    if(searchKey === "" || searchKey === " "){
      this.setState({filterTableData:rawData})
      this.setState({toCSV:rawData})
  }
  else{
    filteredItem = []
    rawData.forEach(obj=>{
      if(obj.Activity_Name.toLowerCase().includes(searchKey) || obj.Group_Name.toLowerCase().includes(searchKey) || obj.Payment_Status.toLowerCase().includes(searchKey) || obj.Payment_Mode.toLowerCase().includes(searchKey) || obj.Activity_Registration_DateTime.toString().toLowerCase().includes(searchKey))
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
                <b>Actvities</b>
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
    activityTableData : state.userPageData.activityTableData    
  };
};
const dispatchToProps = dispatch => {
  return {
      updateTableData: (type, payload) => {
          dispatch({ type: type, payload: payload })
      }
  }
}
 export default withRouter(connect(mapStatetoProps, dispatchToProps)(UserActivity));