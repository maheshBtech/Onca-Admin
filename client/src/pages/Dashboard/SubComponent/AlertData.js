import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Card, CardBody, CardHeader } from "reactstrap";
import DataTable from 'react-data-table-component';
// Add the App service products that you want to use
import AppService from '../../../AppService';
import {alertData_dash} from '../../../AppConfig';
//const data =[];



// const data = [
//     { 
//         id: 1,
//         DateTime: '2020-07-06:17:06:25',
//         UserID: 'Lingamani',
//         Provider: 'Jayanagar Jaguars',
//         Role: 'Admin',
//         Priority: "High",
//         Description: 'Resumable Session Suspended',
//     },
//     { 
//         id: 2,
//         DateTime: '2020-07-06:17:06:25',
//         UserID: 'Ajay J',
//         Provider: 'Onca Active',
//         Role: 'Admin',
//         Priority: "Medium",
//         Description: 'Recovery Area Space Usage',
//     },
//     { 
//         id: 3,
//         DateTime: '2020-07-06:17:06:25',
//         UserID: 'Prasad Rao',
//         Provider: 'Onca Active',
//         Role: 'Admin',
//         Priority: "Medium",
//         Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis luctus ipsum.',
//     },
//     { 
//         id: 4,
//         DateTime: '2020-07-06:17:06:25',
//         UserID: 'Coach Pramod',
//         Provider: 'Onca Active',
//         Role: 'Admin',
//         Priority: "Low",
//         Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis luctus ipsum.',
//     },
//     { 
//         id: 5,
//         DateTime: '2020-07-06:17:06:25',
//         UserID: 'Deepak Kumar',
//         Provider: 'Jayanagar Jaguars',
//         Role: 'Admin',
//         Priority: "High",
//         Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis luctus ipsum.',
//     }
// ];
const conditionalRowStyles = [
    {
      when: row => row.Priority == "High",
      style: {
        backgroundColor: 'red',
        color: 'white'
      },
    },
    {
      when: row => row.Priority == "Medium",
      style: {
        backgroundColor: 'orange',
        color: 'white'
      },
    }
  ];
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
    maxWidth: "150px"
  },
  {
    name: 'Priority',
    selector: 'Priority',
    sortable: true,
    omit : true
  },
  {
    name: 'Description',
    selector: 'Description',
    sortable: false,
    wrap: true,
    allowOverflow: true,
  },
];
class AlertData extends Component {
  state={
    data: []
  }

  componentDidMount(){
    this.AppService = new AppService();

    this.AppService.getDataFetch(alertData_dash)
    .then((response) => response.json())
    .then(datalist =>{
      this.setState({data: datalist[0]})
    })
  }


  
  // componentDidMount() {
  //   this.callApi()
  //     .then(res => this.setState({data:res}))
  //     .catch(err => console.log(err));
  // }
  
  // // callApi = async () => {
  // //   const response = await fetch('http://localhost:3001/api/logTable');
  // //   const body = await response.json();
  // //   if (response.status !== 200) throw Error(body.message);
    
  // //   return body;
  // // };
    render() {
        return (
            <React.Fragment>
              <Card className="mini-stat">
                <CardHeader className="bl-bg">
                  <Link to="#" className="text-white">
                    <b>Alert Data Table</b>
                  </Link>
                  <span className="float-right">
                    Latest 5 Alert
                  </span>
                </CardHeader>
                <CardBody>
                  <DataTable
                      className="data-table"
                      columns={columns}
                      data={this.state.data}
                      conditionalRowStyles={conditionalRowStyles}
                      noHeader={true}
                      customStyles={headerStyle}
                  />
                </CardBody>
              </Card>
            </React.Fragment>
        )
    }
}
export default withRouter(AlertData);