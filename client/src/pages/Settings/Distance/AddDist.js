import React, { Component } from "react";
import {
    Row,
    Col,
    Button,
    Form,
    Label,
    Input
} from "reactstrap";

class AddDist extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
     
        console.log(this.props);
    }

    render() {
        return (
            <React.Fragment>
                <Form onSubmit={this.props.handleSubmit}>
                    <Row>

                        <Col lg={12}>
                            {this.props.distanceForm.Err ?
                                (<div class="alert alert-danger" role="alert" >
                                    {this.props.distanceForm.Err}
                                </div>
                                ) : null}
                            {this.props.distanceForm.ShowSuccessMessage ?
                                (<div class="alert alert-success" role="alert">
                                    {this.props.distanceForm.ShowSuccessMessage}
                                </div>) : null}
                        </Col>

                        <Col lg={12}>
                            <div className="form-group">
                                <Label for="DistanceOpt">Distance Option <span className="text-danger">*</span></Label>
                                <Input type="number" name="DistanceOpt" id="DistanceOpt"
                                    placeholder="Enter Distance in KM"
                                    onChange={this.props.handleChange}
                                    value={this.props.distanceForm.DistanceOpt}
                                />
                            </div>
                            <div className="form-group">
                                <Label for="DistanceMFTMFT">Minimum Finishing Time <span className="text-danger">*</span></Label>
                                <Input type="time" name="DistanceMFT" id="DistanceMFT" step="2"
                                    onChange={this.props.handleChange}
                                    value={this.props.distanceForm.DistanceMFT}
                                />
                            </div>
                            <div className="form-group">
                                <Button className="btn btn-block update-btn" type="submit" >
                                    Submit
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </React.Fragment>
        );
    }
}

export default AddDist;
