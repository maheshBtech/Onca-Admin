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

class Family extends Component {
    constructor(props) {
        super(props);
     
        this.state = {
            modal_center: false,
            modal_scroll: false,
            customActiveTab: "1",
            selectedGroup: null,
          
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
                            <Label for="EmailID">Family Email ID <span className="text-danger" >*</span></Label>
                            <Autocomplete
                                className="d-block w-100"
                                options={this.props.familydetails}
                                onChange={(event, value) => {
                                    console.log('value ' + value)
                                    // this.setState({ selecteduserdetails: value });
                                    // this.GetfamilyUserDetails(value);
                                    {this.props.GetfamilyUserDetails(value)}
                                    
                                }}
                                value={this.props.familydata.selectedfamilyuserdetails}
                                getOptionLabel={(option) => option.Email_ID}
                                id="emailID"
                                renderInput={(params) => (
                                    <div ref={params.InputProps.ref}>
                                        <input type="EmailID" placeholder="select Email ID" id="act" type="text" {...params.inputProps} />
                                    </div>
                                )} />
                        </div>
                        <div className="form-group">
                            <Label for="FamilyName">Family Name </Label>
                            <Input type="email" id="FamilyName"
                                placeholder="Family Name"
                                value={this.props.familydata.user_name}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <Label for="FamilyMobNum">Family Mobile Number</Label>
                            <Input type="number" id="FamilyMobNum"
                                placeholder="Family Mobile Number"
                                value={this.props.familydata.mobile_number}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <Label for="EmailID">Relationship <span className="text-danger" >*</span></Label>
                            <Input type="number" id="FamilyMobNum"
                                placeholder="Family Mobile Number"
                                value={this.props.familydata.relation}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <Label for="FamilyTraiLoc">Family Location</Label>
                            <Input type="text" id="FamilyTraiLoc"
                                placeholder="Family Location"
                                value={this.props.familydata.Location}
                                disabled
                            />
                        </div>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default withRouter(Family);