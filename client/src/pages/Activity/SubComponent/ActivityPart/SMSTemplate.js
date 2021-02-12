import React, { Component } from "react";
import {
    Row,
    Col,
    Label,
    Input,
} from "reactstrap";

class SMSTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ActivitySMSTemplate: { ...this.props.ActivitySMSTemplate }
        };
        this.textareachange = this.textareachange.bind(this);
    }
    // using to send back the update object
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.ActivitySMSTemplate !== this.props.ActivitySMSTemplate) {
            this.setState({ ActivitySMSTemplate: this.props.ActivitySMSTemplate })
          }
        if (prevState.ActivitySMSTemplate !== this.state.ActivitySMSTemplate) {
            this.props.handleActivitySMSTemplate(this.state.ActivitySMSTemplate)
        }
    }
    // Text area
    textareachange(event) {
        let fname = event.target.name;
        let fvalue = event.target.value;
        this.setState(prevState => ({
            ActivitySMSTemplate: {
                ...prevState.ActivitySMSTemplate, [fname]: fvalue
            }
        }));
    }
    render() {
        const { selectedGroup } = this.state;
        return (
            <Row>
                <Col lg={6}>
                    <div className="form-group">
                        <Label for="mail-sub">
                            Activity Start Message <span className="text-danger" >(125 Character)</span>
                        </Label>
                        <Input
                            value={this.state.ActivitySMSTemplate.activityStartMessage}
                            type='textarea'
                            id="textarea"
                            name='activityStartMessage'
                            onChange={this.textareachange}
                            maxLength="125"
                            rows="3"
                            placeholder="This textarea has a limit of 125 chars."
                        />
                        {this.state.ActivitySMSTemplate.activityStartMessage.length > 0 ? (
                            <span className="badgecount">
                                {" "}
                                {this.state.ActivitySMSTemplate.activityStartMessage.length} / 125{" "}
                            </span>
                        ) : null}
                    </div>
                </Col>
                <Col lg={6}>
                    <div className="form-group">
                        <Label for="mail-sub">
                            Activity End Message <span className="text-danger" >(125 Character)</span>
                        </Label>
                        <Input
                            value={this.state.ActivitySMSTemplate.activityEndMessage}
                            type='textarea'
                            id="textarea"
                            name='activityEndMessage'
                            onChange={this.textareachange}
                            maxLength="125"
                            rows="3"
                            placeholder="This textarea has a limit of 125 chars."
                        />
                        {this.state.ActivitySMSTemplate.activityEndMessage.length > 0 ? (
                            <span className="badgecount">
                                {" "}
                                {this.state.ActivitySMSTemplate.activityEndMessage.length} / 125{" "}
                            </span>
                        ) : null}
                    </div>
                </Col>
            </Row>
        );
    }
}

export default SMSTemplate;
