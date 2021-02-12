import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Card, Row, Col, CardBody, CardHeader, Label } from "reactstrap";

const UserWorkoutData = [
  {
    OverallRank: 1,
    GroupRank: 1,
    GenderRank: 1,
    UserName: "Arun TD",
    Distance: "10KMs",
    Timing: "00:39:14",
    PB: "N",
    Debut: "N",
  },
  {
    OverallRank: 2,
    GroupRank: 1,
    GenderRank: 2,
    UserName: "Nava Shankar",
    Distance: "10KMs",
    Timing: "00:40:58",
    PB: "N",
    Debut: "N",
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
    name: "Overall Rank",
    selector: "OverallRank",
    sortable: true,
    wrap: true,
  },
  {
    name: "Group Rank",
    selector: "GroupRank",
    sortable: true,
    wrap: true,
  },
  {
    name: "Gender Rank",
    selector: "GenderRank",
    sortable: true,
    wrap: true,
  },
  {
    name: "Distance",
    selector: "Distance",
    sortable: true,
    wrap: true,
  },
  {
    name: "Time",
    selector: "Timing",
    sortable: true,
    wrap: true,
  },
  {
    name: "PB (Y/N)",
    selector: "PB",
    sortable: true,
    wrap: true,
  },
  {
    name: "Debut (Y/N)",
    selector: "Debut",
    sortable: true,
  },
];
class UserWorkout extends Component {
  render() {
    return (
      <React.Fragment>
        <Card className="mini-stat">
          <CardHeader className="bl-bg">
            <Link to="#" className="text-white">
              <b>Workout</b>
            </Link>
          </CardHeader>
          <CardBody>
            <DataTable
              className="data-table"
              columns={columns}
              data={UserWorkoutData}
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

export default withRouter(UserWorkout);
