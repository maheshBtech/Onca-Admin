import React, { Component } from "react";
import {
    Card,
    CardBody,
} from "reactstrap";

class WYHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <Card className="timeline-h">
                    <CardBody>
                        <h3 className="mt-0">2021</h3>
                    </CardBody>
                </Card>
                <Card className="timeline-h">
                    <CardBody>
                        <h4 className="card-title mt-2 mb-0">Monday</h4>
                    </CardBody>
                </Card>
                <Card className="timeline-h">
                    <CardBody>
                        <h4 className="card-title mt-2 mb-0">Tuesday</h4>
                    </CardBody>
                </Card>
                <Card className="timeline-h">
                    <CardBody>
                        <h4 className="card-title mt-2 mb-0">wednesday</h4>
                    </CardBody>
                </Card>
                <Card className="timeline-h">
                    <CardBody>
                        <h4 className="card-title mt-2 mb-0">Thursday</h4>
                    </CardBody>
                </Card>
                <Card className="timeline-h">
                    <CardBody>
                        <h4 className="card-title mt-2 mb-0">Friday</h4>
                    </CardBody>
                </Card>
                <Card className="timeline-h">
                    <CardBody>
                        <h4 className="card-title mt-2 mb-0">Saturday</h4>
                    </CardBody>
                </Card>
                <Card className="timeline-h">
                    <CardBody>
                        <h4 className="card-title mt-2 mb-0">Sunday</h4>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default WYHeader;
