import React, { Component } from 'react';
import { Row, Col, Card, Label, Input, } from "reactstrap";
import { Link } from "react-router-dom";

class SplitTime extends Component {
    constructor(props) {
        super(props);
        debugger;
        this.state = {
            RowOrderData:  this.props.groupForm.RowOrderData
        };
    }

    splitTimeValueStartEnd = (data,start_end) => {
        debugger;
        if (data != null){
            let splitData = data.split('-');
          
            if (start_end == "s"){
                return splitData[0];
            }
            else {
                return splitData[1];
            }
        }else{
            return "";
        }
    }
    
    render() {
        return (
            <Row>
                <Col lg={12}>
                    <Row>
                        <Col lg={12}>
                            <Label>
                                <b>{this.props.groupForm.GroupName}</b>
                            </Label>
                        </Col>
                    </Row>
                    <div className="group-box w-100">
                        <span>
                            <b>Male</b>
                        </span>
                        <Row>
                            <Col lg={2}>
                                <Label for="10KST" className="font-size-11">10K Start Time</Label>
                                <Input type="time" name="10KST" id="10KST" step="2" value="00:35:00" className="font-size-10 p-1" disabled />
                            </Col>
                            <Col lg={2} className="pl-0">
                                <Label for="10KET" className="font-size-11">10K End Time</Label>
                                <Input type="time" name="10KET" id="10KET" step="2" value="10:00:00" className="font-size-10 p-1" disabled />
                            </Col>
                            <Col lg={2} className="pl-0">
                                <Label for="HMKST" className="font-size-11">HM Start Time</Label>
                                <Input type="time" name="HMKST" id="HMKST" step="2" value="01:00:00" className="font-size-10 p-1" disabled />
                            </Col>
                            <Col lg={2} className="pl-0">
                                <Label for="HMKET" className="font-size-11">HM End Time</Label>
                                <Input type="time" name="HMKET" id="HMKET" step="2" value="10:10:00" className="font-size-10 p-1" disabled />
                            </Col>
                            <Col lg={2} className="pl-0">
                                <Label for="FMKST" className="font-size-11">FM Start Time</Label>
                                <Input type="time" name="FMKST" id="FMKST" step="2" value="02:00:00" className="font-size-10 p-1" disabled />
                            </Col>
                            <Col lg={2} className="pl-0">
                                <Label for="FMKET" className="font-size-11">FM End Time</Label>
                                <Input type="time" name="FMKET" id="FMKET" step="2" value="10:00:00" className="font-size-10 p-1" disabled />
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={2}>
                                
                                <Label for="10KST" className="font-size-11">10K Start Time</Label>
                                <Input type="time" name="10KST" id="10KST" step="2" className="font-size-10 p-1" value={this.splitTimeValueStartEnd(this.props.groupForm.RowOrderData['M-10k'],"s")}  />
                            </Col>
                            <Col lg={2} className="pl-0">
                                <Label for="10KET" className="font-size-11">10K End Time</Label>
                                <Input type="time" name="10KET" id="10KET" step="2" className="font-size-10 p-1" value={this.splitTimeValueStartEnd(this.props.groupForm.RowOrderData['M-10k'],"e")}/>
                            </Col>
                            <Col lg={2} className="pl-0">
                                <Label for="HMKST" className="font-size-11">HM Start Time</Label>
                                <Input type="time" name="HMKST" id="HMKST" step="2" className="font-size-10 p-1" value={this.splitTimeValueStartEnd(this.props.groupForm.RowOrderData['M-HM'],"s")}/>
                            </Col>
                            <Col lg={2} className="pl-0">
                                <Label for="HMKET" className="font-size-11">HM End Time</Label>
                                <Input type="time" name="HMKET" id="HMKET" step="2" className="font-size-10 p-1" value={this.splitTimeValueStartEnd(this.props.groupForm.RowOrderData['M-HM'],"e")}/>
                            </Col>
                            <Col lg={2} className="pl-0">
                                <Label for="FMKST" className="font-size-11">FM Start Time</Label>
                                <Input type="time" name="FMKST" id="FMKST" step="2" className="font-size-10 p-1" value={this.splitTimeValueStartEnd(this.props.groupForm.RowOrderData['M-FM'],"s")}/>
                            </Col>
                            <Col lg={2} className="pl-0">
                                <Label for="FMKET" className="font-size-11">FM End Time</Label>
                                <Input type="time" name="FMKET" id="FMKET" step="2" className="font-size-10 p-1" value={this.splitTimeValueStartEnd(this.props.groupForm.RowOrderData['M-FM'],"e")}/>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col lg={12} className="mt-3">
                    <div className="group-box w-100">
                        <span>
                            <b>Female</b>
                        </span>
                        <Row>
                            <Col lg={2}>
                                <Label for="10KST" className="font-size-11">10K Start Time</Label>
                                <Input type="time" name="10KST" id="10KST" step="2" value="00:35:00" className="font-size-10 p-1" disabled />
                            </Col>
                            <Col lg={2} className="pl-0">
                                <Label for="10KET" className="font-size-11">10K End Time</Label>
                                <Input type="time" name="10KET" id="10KET" step="2" value="10:00:00" className="font-size-10 p-1" disabled />
                            </Col>
                            <Col lg={2} className="pl-0">
                                <Label for="HMKST" className="font-size-11">HM Start Time</Label>
                                <Input type="time" name="HMKST" id="HMKST" step="2" value="01:00:00" className="font-size-10 p-1" disabled />
                            </Col>
                            <Col lg={2} className="pl-0">
                                <Label for="HMKET" className="font-size-11">HM End Time</Label>
                                <Input type="time" name="HMKET" id="HMKET" step="2" value="10:10:00" className="font-size-10 p-1" disabled />
                            </Col>
                            <Col lg={2} className="pl-0">
                                <Label for="FMKST" className="font-size-11">FM Start Time</Label>
                                <Input type="time" name="FMKST" id="FMKST" step="2" value="02:00:00" className="font-size-10 p-1" disabled />
                            </Col>
                            <Col lg={2} className="pl-0">
                                <Label for="FMKET" className="font-size-11">FM End Time</Label>
                                <Input type="time" name="FMKET" id="FMKET" step="2" value="10:00:00" className="font-size-10 p-1" disabled />
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={2}>
                                <Label for="10KST" className="font-size-11">10K Start Time</Label>
                                <Input type="time" name="10KST" id="10KST" step="2" className="font-size-10 p-1" value={this.splitTimeValueStartEnd(this.props.groupForm.RowOrderData['F-10k'],"s")}/>
                            </Col>
                            <Col lg={2} className="pl-0">
                                <Label for="10KET" className="font-size-11">10K End Time</Label>
                                <Input type="time" name="10KET" id="10KET" step="2" className="font-size-10 p-1" value={this.splitTimeValueStartEnd(this.props.groupForm.RowOrderData['F-10k'],"e")}/>
                            </Col>
                            <Col lg={2} className="pl-0">
                                <Label for="HMKST" className="font-size-11">HM Start Time</Label>
                                <Input type="time" name="HMKST" id="HMKST" step="2" className="font-size-10 p-1" value={this.splitTimeValueStartEnd(this.props.groupForm.RowOrderData['F-HM'],"s")}/>
                            </Col>
                            <Col lg={2} className="pl-0">
                                <Label for="HMKET" className="font-size-11">HM End Time</Label>
                                <Input type="time" name="HMKET" id="HMKET" step="2" className="font-size-10 p-1" value={this.splitTimeValueStartEnd(this.props.groupForm.RowOrderData['F-HM'],"e")}/>
                            </Col>
                            <Col lg={2} className="pl-0">
                                <Label for="FMKST" className="font-size-11">FM Start Time</Label>
                                <Input type="time" name="FMKST" id="FMKST" step="2" className="font-size-10 p-1" value={this.splitTimeValueStartEnd(this.props.groupForm.RowOrderData['F-FM'],"s")}/>
                            </Col>
                            <Col lg={2} className="pl-0">
                                <Label for="FMKET" className="font-size-11">FM End Time</Label>
                                <Input type="time" name="FMKET" id="FMKET" step="2" className="font-size-10 p-1" value={this.splitTimeValueStartEnd(this.props.groupForm.RowOrderData['F-FM'],"e")}/>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        )
    }

}

export default SplitTime;