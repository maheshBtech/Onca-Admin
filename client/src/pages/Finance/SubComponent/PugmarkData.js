import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Button } from "reactstrap";
import DataTable from 'react-data-table-component';

const providerList = [
    { 
        id: 1,
        ProviderName: 'Prasad Rao',
        ContactName: 'Prasad Rao',
        EmailID: 'pachchu@gmail.com',
        PhNumber: 9845726002,
        Location: 'Jayanagar, Bangalore (KA)'
    },
    { 
        id: 2,
        ProviderName: 'Lingamani',
        ContactName: 'Lingamani',
        EmailID: 'lingamani3005@gmail.com',
        PhNumber: 9952721161,
        Location: 'Navi Mumbai, Mumbai (MH)'
    },
    { 
        id: 3,
        ProviderName: 'Coach Pramod',
        ContactName: 'Coach Pramod',
        EmailID: 'pramodvdeshpande@hotmail.com',
        PhNumber: 9986071806,
        Location: 'Jayanagar, Bangalore (KA)'
    },
    { 
        id: 4,
        ProviderName: 'Ajay Jaishankar J',
        ContactName: 'Ajay Jaishankar J',
        EmailID: 'ajayjaishankar@gmail.com',
        PhNumber: 9900055108,
        Location: 'Jayanagar, Bangalore (KA)'
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
    name: 'Provider Name',
    selector: 'ProviderName',
    sortable: true,
    maxWidth: "160px"
  },
  {
    name: 'Contact Name',
    selector: 'ContactName',
    sortable: true,
    maxWidth: "160px"
  },
  {
    name: 'Email ID',
    selector: 'EmailID',
    sortable: true,
    maxWidth: "200px"
  },
  {
    name: 'Phone Number',
    selector: 'PhNumber',
    sortable: true,
    maxWidth: "200px"
  },
  {
    name: 'Location',
    selector: 'Location',
    sortable: true,
    wrap: true,
    allowOverflow: true,
    maxWidth: "150px"
  },
  {
    name: 'Action',
    cell: () => <Button variant="contained" color="light">Update</Button>,
    button: true,
  },
  {
    cell: () => <Button variant="contained" color="success">Activate</Button>,
    button: true,
  },
  {
    cell: () => <Button variant="contained" color="light">Remove</Button>,
    button: true,
  },
];
class PugmarkData extends Component {
    render() {
        return (
            <React.Fragment>
              <Card className="mini-stat">
                <CardHeader className="bl-bg">
                  <Link to="#" className="text-white">
                    <b>Provider List Table</b>
                  </Link>
                  <span className="float-right">
                    Latest 10 Log
                  </span>
                </CardHeader>
                <CardBody>
                  <DataTable
                      className="data-table"
                      columns={columns}
                      data={providerList}
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

export default withRouter(PugmarkData);