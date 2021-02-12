import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import DataTable, { createTheme } from "react-data-table-component";
import UsersFilter from "../SubComponent/UsersFilter";
import { Card, Row, Col, CardBody, CardHeader, Label } from "reactstrap";

const UserReferalData = [
  {
    id: 1,
    UserName: "Arivoli",
    EmaiID: "arivoli@gmail.com",
    PhNumber: 9945336332,
    ReferralType: "Buddy Referral",
    Relation: "NA",
    ActivityName: "HDTK 2020",
    AvailPugmark: 300.0,
    DateTime: "2020-09-21 17:50:58",
  },
  {
    id: 2,
    UserName: "Arivoli",
    EmaiID: "arivoli@gmail.com",
    PhNumber: 9945336332,
    ReferralType: "Buddy Referral",
    Relation: "NA",
    ActivityName: "HDTK 2020",
    AvailPugmark: 300.0,
    DateTime: "2020-09-21 17:50:58",
  },
  {
    id: 3,
    UserName: "Arivoli",
    EmaiID: "arivoli@gmail.com",
    PhNumber: 9945336332,
    ReferralType: "Buddy Referral",
    Relation: "NA",
    ActivityName: "HDTK 2020",
    AvailPugmark: 300.0,
    DateTime: "2020-09-21 17:50:58",
  },
  {
    id: 4,
    UserName: "Arivoli",
    EmaiID: "arivoli@gmail.com",
    PhNumber: 9945336332,
    ReferralType: "Buddy Referral",
    Relation: "NA",
    ActivityName: "HDTK 2020",
    AvailPugmark: 300.0,
    DateTime: "2020-09-21 17:50:58",
  },
  {
    id: 5,
    UserName: "Arivoli",
    EmaiID: "arivoli@gmail.com",
    PhNumber: 9945336332,
    ReferralType: "Buddy Referral",
    Relation: "NA",
    ActivityName: "HDTK 2020",
    AvailPugmark: 300.0,
    DateTime: "2020-09-21 17:50:58",
  },
];
const headerStyle = {
  rows: {
    style: {
      minHeight: "100px", // override the row height
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
    name: "User Details",
    selector: "UserDetails",
    sortable: true,
    wrap: true,
    cell: (row) => (
      <div>
        <p className={"m-0"}>{row.UserName}</p>
        <p className={"m-0"}>{row.EmaiID}</p>
        <p className={"m-0"}>{row.PhNumber}</p>
      </div>
    ),
  },
  {
    name: "Referral Type",
    selector: "ReferralType",
    sortable: true,
  },
  {
    name: "Relation",
    selector: "Relation",
    sortable: true,
    wrap: true,
  },
  {
    name: "Activity Name",
    selector: "ActivityName",
    sortable: true,
  },
  {
    name: "Availed PugMark",
    selector: "AvailPugmark",
    sortable: true,
    wrap: true,
  },
  {
    name: "Date & Time",
    selector: "DateTime",
    sortable: true,
    wrap: true,
  },
];
class UserReferal extends Component {
  render() {
    return (
      <React.Fragment>
        <Card className="mini-stat">
          <CardHeader className="bl-bg">
            <Link to="#" className="text-white">
              <b>Referral</b>
            </Link>
          </CardHeader>
          <CardBody>
            <DataTable
              className="data-table"
              columns={columns}
              data={UserReferalData}
              noHeader={true}
              customStyles={headerStyle}
              fixedHeader
              fixedHeaderScrollHeight="300px"
              pagination
            />
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default withRouter(UserReferal);
