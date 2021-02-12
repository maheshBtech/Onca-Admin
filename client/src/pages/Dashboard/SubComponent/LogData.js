import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Card, CardBody, CardHeader } from "reactstrap";
import DataTable from 'react-data-table-component';
// Add the App service products that you want to use
import AppService from '../../../AppService';
import {logData_dash} from '../../../AppConfig';
 //const data = [];
//     { 
//         id: 1,
//         DateTime: '2020-07-06:17:06:25',
//         UserID: 'Lingamani',
//         Provider: 'Jayanagar Jaguars',
//         Role: 'Admin',
//         TableName: 'Resumable Session Suspended',
//         OperationType: "RFSP 10K"
//     },
//     { 
//         id: 2,
//         DateTime: '2020-07-06:17:06:25',
//         UserID: 'Ajay J',
//         Provider: 'Onca Active',
//         Role: 'Admin',
//         TableName: 'Recovery Area Space Usage',
//         OperationType: "Lingamani as Provider Admin for JJs"
//     },
//     { 
//         id: 3,
//         DateTime: '2020-07-06:17:06:25',
//         UserID: 'Prasad Rao',
//         Provider: 'Onca Active',
//         Role: 'Admin',
//         TableName: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis luctus ipsum.',
//         OperationType: "RFSP 10K"
//     },
//     { 
//         id: 4,
//         DateTime: '2020-07-06:17:06:25',
//         UserID: 'Coach Pramod',
//         Provider: 'Onca Active',
//         Role: 'Admin',
//         TableName: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis luctus ipsum.',
//         OperationType: "RFSP 20K"
//     },
//     { 
//         id: 5,
//         DateTime: '2020-07-06:17:06:25',
//         UserID: 'Deepak Kumar',
//         Provider: 'Jayanagar Jaguars',
//         Role: 'Admin',
//         TableName: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis luctus ipsum.',
//         OperationType: "Lingamani as Provider Admin for JJs"
//     }
// ];
const headerStyle = {
  headCells: {
    style: {
      backgroundColor: "#EDECEC",
      
    },
  },
};
const columns = [
  {
    name: 'Date-Time',
    selector: 'DateTime',
    sortable: true,
    maxWidth: "160px"
  },
  {
    name: 'User ID',
    selector: 'UserID',
    sortable: true,
    maxWidth: "200px"
  },
  {
    name: 'Provider',
    selector: 'Provider',
    sortable: true,
    maxWidth: "200px"
  },
  {
    name: 'Role',
    selector: 'Role',
    sortable: true,
    wrap: true,
    allowOverflow: true,
    maxWidth: "150px"
  },
  {
    name: 'Table Name',
    selector: 'TableName',
    sortable: true,
    wrap: true,
    allowOverflow: true,
    maxWidth: "150px"
  },
  {
    name: 'Operation Type',
    selector: 'OperationType',
    sortable: false,
    wrap: true,
    allowOverflow: true,
    maxWidth: "340px"
  }
];
class LogData extends Component {

  state={
    data: []
  }

  componentDidMount(){
    this.AppService = new AppService();

    this.AppService.getDataFetch(logData_dash)
    .then((response) => response.json())
    .then(datalist =>{
      this.setState({data: datalist[0]})
    })
  }

    render() {
        return (
            <React.Fragment>
              <Card className="mini-stat">
                <CardHeader className="bl-bg">
                  <Link to="#" className="text-white">
                    <b>Log Data Table</b>
                  </Link>
                  <span className="float-right">
                    Latest 10 Log
                  </span>
                </CardHeader>
                <CardBody>
                  <DataTable
                      className="data-table"
                      columns={columns}
                      data={this.state.data}
                      noHeader={true}
                      customStyles={headerStyle}
                  />
                </CardBody>
              </Card>
            </React.Fragment>
        )
    }
}

export default withRouter(LogData);