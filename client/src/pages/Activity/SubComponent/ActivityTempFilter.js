import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Radio from "@material-ui/core/Radio";
import { Row, Col , Label,CardBody,Card } from "reactstrap";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

class ActivityTempFilter extends Component {
    render() {
        return (
            <React.Fragment>
               
                    <Card className="mini-stat">
                        <CardBody>
                                <Col lg={12}>
                                <div className="form-group">
                                   <Label for="Msg">
                                    Filter By
                                    </Label>           
                                    <RadioGroup
                                    row
                                    aria-label="runner"
                                    name="runner"
                                    defaultValue="Activity"
                                    >
                                    <FormControlLabel
                                        value="Activity"
                                        control={<Radio color="primary" />}
                                        label="Activity"
                                    />
                                    <FormControlLabel
                                        value="AOD"
                                        control={<Radio color="primary" />}
                                        label="AOD"
                                    />
                                    </RadioGroup> 
                                    </div>
                                 </Col>
                        </CardBody>
                    </Card>
              
            </React.Fragment>
        )
    }
}

export default withRouter(ActivityTempFilter);