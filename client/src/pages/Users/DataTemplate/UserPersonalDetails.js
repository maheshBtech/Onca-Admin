import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import {
    Card,
    CardBody,
    CardHeader,
    Button,
    Input
} from "reactstrap";
import { connect } from "react-redux";
import UserInfo from "./UserInfo";
import UserAccess from "./UserAccess";

class UserPersonalDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <React.Fragment>
                <UserInfo />
                <UserAccess />
            </React.Fragment>
        )
    }
}
const mapStatetoProps = state => {
    return {
        activityTableData: state.userPageData.activityTableData
    };
};
const dispatchToProps = dispatch => {
    return {
        updateTableData: (type, payload) => {
            dispatch({ type: type, payload: payload })
        }
    }
}
export default withRouter(connect(mapStatetoProps, dispatchToProps)(UserPersonalDetails));