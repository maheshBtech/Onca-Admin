import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ValidationMessage } from "./CommonMessage";
import {
    Row,
    Col,
    Label,
    Input,
} from "reactstrap";

const activityType = [
    { title: 'Run', year: 1994 },
    { title: 'Cycle', year: 1972 },
    { title: 'Gym', year: 1974 },
    { title: 'Yoga', year: 2008 },
    { title: 'Zomba', year: 1957 },
    { title: "Dance", year: 1993 },
];

class Buddy extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
            modal_center: false,
            modal_scroll: false,
            customActiveTab: "1",
            selectedGroup: null,
            selectedbuddyuserdetails:"",
            user_name:"",
            mobile_number:"",

            error: {},
            stateData: {
                isFromUpdate: false
            }
        };
        this.add_member = this.add_member.bind(this);
        this.tog_scroll = this.tog_scroll.bind(this);
    }

    removeBodyCss() {
        document.body.classList.add("no_padding");
    }
    add_member() {
        this.setState(prevState => ({
            modal_center: !prevState.modal_center
        }));
        this.removeBodyCss();
    }
    tog_scroll() {
        this.setState(prevState => ({
            modal_scroll: !prevState.modal_scroll
        }));
        this.removeBodyCss();
    }
    show() {
        this.setState({ visible: true });
    }
    hide() {
        this.setState({ visible: false });
    }
    toggleCustom(tab) {
        if (this.state.customActiveTab !== tab) {
            this.setState({
                customActiveTab: tab
            });
        }
    }


    render() {
        const { selectedGroup } = this.state;
        return (
            <React.Fragment>
                <Row>
                    <Col lg={12}>
                        <div className="form-group">
                            <Label for="EmailID">Buddy Email ID <span className="text-danger" >*</span></Label>
                            {/* <Autocomplete /> */}

                            <Autocomplete
                                className="d-block w-100"
                                options={this.props.buddydetails}
                                onChange={(event, value) => {
                                    console.log('value ' + value)
                                    // this.setState({ selecteduserdetails: value });
                                    // this.GetbuddyUserDetails(value);
                                    {this.props.GetbuddyUserDetails(value)}
                                    
                                }}
                                value={this.props.buddydata.selectedbuddyuserdetails}
                                getOptionLabel={(option) => option.Email_ID}
                                id="emailID"
                                renderInput={(params) => (
                                    <div ref={params.InputProps.ref}>
                                        <input type="EmailID" placeholder="select Email ID" id="act" type="text" {...params.inputProps} />
                                    </div>
                                )} />
                        </div>
                        <div className="form-group">
                            <Label for="BuddyName">Buddy Name </Label>
                            <Input type="email" id="BuddyName"
                                placeholder="Buddy Name"
                                value={this.props.buddydata.user_name}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <Label for="BuddyMobNum">Buddy Mobile Number</Label>
                            <Input type="number" id="BuddyMobNum"
                                placeholder="Buddy Mobile Number"
                                value={this.props.buddydata.mobile_number}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <Label for="BuddyTraiLoc">Buddy Location</Label>
                            <Input type="text" id="BuddyTraiLoc"
                                placeholder="Buddy Location"
                                value={this.props.buddydata.Location}
                                disabled
                            />
                        </div>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default withRouter(Buddy);