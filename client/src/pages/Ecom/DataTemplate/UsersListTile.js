import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import UsersFilter from '../SubComponent/UsersFilter';
import {
  Card,
  Row,
  Col,
  CardBody,
  CardHeader,
  Label
} from "reactstrap";

class UserListTile extends Component {
  render() {
    return (
      <React.Fragment>
        <UsersFilter />
        <div className="container-fluid">
          <Card className="mini-stat">
            <CardHeader className="bl-bg">
              <Link to="#" className="text-white">
                <b>Role Table</b>
              </Link>
            </CardHeader>
            <CardBody>

            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(UserListTile);