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

class WrongCredit extends Component {
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
                            <Label for="Activity">Select Activiy Name <span className="text-danger" >*</span></Label>
                            <Autocomplete
                                className="d-block w-100"
                                options={this.props.wrongcreditsdetails}
                                onChange={(event, value) => {
                                    console.log('value ' + value)
                                  
                                    {this.props.GetwrongcreditsDetails(value)}
                                    
                                }}
                                // onChange={this.props.handleChange}
                                value={this.props.wrongcreditsdata.selectedchangedactivitydetails}
                                getOptionLabel={(option) => option.activityName}
                                id="Activity"
                                renderInput={(params) => (
                                    <div ref={params.InputProps.ref}>
                                        <input type="Activity" placeholder="select Changed Activity" id="act" type="text" {...params.inputProps} />
                                    </div>
                                )} />
                        </div>
                        <div className="form-group">
                            <Label for="comments">Comments <span className="text-danger" >*</span></Label>
                            <Input
                                type="textarea"
                                id="comments"
                                value={this.props.wrongcreditsdata.comments}
                                // onChange={this.props.GetcommentDetails()}
                                onChange={(event, value) => {
                                    console.log('value ' + value)
                                  
                                    {this.props.GetwrongcreditscommentDetails(event)}
                                    
                                }}
                                // onChange={this.props.handleChange}
                                maxLength="225"
                                rows="3"
                                placeholder="This textarea has a limit of 225 chars."
                            />
                        
                        </div>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default withRouter(WrongCredit);