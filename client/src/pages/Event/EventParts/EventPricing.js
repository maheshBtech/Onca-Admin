import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button } from "reactstrap";
//import Select from "react-select";
import AddIcon from '@material-ui/icons/Add';
import Autocomplete from "../AutocompleteEventPricing";
import { AllValidate } from '../../EventModel'

let localValidate = {
    PriceAPVTemp: false, TexAPVTemp: false, PriceRangeTemp: true, EventPriceAPVTemp: false, EventTaxAPVTemp: false,
}

class EventPricing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            EventPricing: [...this.props.EventPricing],
            ...AllValidate.APValidate
        };
        this.handleIChange = this.handleIChange.bind(this); //handle input field change
        this.handleALChange = this.handleALChange.bind(this); //handle select location filed change
        this.validateFunction = this.validateFunction.bind(this) // field validation
        this.internalValidateFunction = this.internalValidateFunction.bind(this) // internal validation
    }
    // using to send back the update object
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.EventPricing !== this.props.EventPricing) {
            this.setState({ EventPricing: this.props.EventPricing })
        }
        if (prevState.EventPricing !== this.state.EventPricing) {
            this.props.handleEventPricing(this.state.EventPricing)
        }
        if (prevProps.TriggrtVaidation !== this.props.TriggrtVaidation) {
            this.validateFunction()
        }
    }
    // validation function
    validateFunction = () => {
        // Validate Price
        if (this.state.EventPricing.Price === 0) {
            this.setState({ EventPriceAPV: 'Please Enter Event Price' })
            localValidate.EventPriceAPVTemp = false
        }
        else {
            this.setState({ EventPriceAPV: "" })
            localValidate.EventPriceAPVTemp = true
        }
        // Validate Event Type
        if (this.state.EventPricing.Tax === 0) {
            this.setState({ EventTaxAPV: 'Please Enter Event Type' })
            localValidate.EventTaxAPVTemp = false
        }
        else {
            this.setState({ EventTaxAPV: "" })
            localValidate.EventTaxAPVTemp = true
        }
        // validation summarized - final check
        if (localValidate.EventPriceAPVTemp === false || localValidate.EventTaxAPVTemp === false) {
            this.props.handleAllCompValidation('AP', false)
        }
        else {
            this.props.handleAllCompValidation('AP', true)
        }
    }
    // internal validation
    internalValidateFunction = (fname, fvalue) => {
        switch (fname) {
            case 'Price':
                // Validate Event Price
                if (fvalue === 0) {
                    this.setState({ EventTypeAIV: 'Please Enter Event Price' })
                    localValidate.EventTypeAIVTemp = false
                }
                else {
                    this.setState({ EventTypeAIV: "" })
                    localValidate.EventTypeAIVTemp = true
                }
                break
            case 'Tax':
                // Validate Event Tax
                if (fvalue === 0) {
                    this.setState({ EventTypeAIV: 'Please Enter Event Tax' })
                    localValidate.EventTypeAIVTemp = false
                }
                else {
                    this.setState({ EventTypeAIV: "" })
                    localValidate.EventTypeAIVTemp = true
                }
                break
            default:
                break
        }
    }
    //handle input field change
    handleIChange = (event) => {
        let eName = event.target.name;
        let eValue = event.target.value;
        if (eName === 'Price') {
            //let b = parseFloat(eValue)
            if (eValue > 99999) {
                this.setState({ PriceTexAPV: "Price cannot be more then 99999" })
                localValidate.PriceRangeTemp = false
            }
            else {
                this.setState(prevState => ({
                    EventPricing: {
                        ...prevState.EventPricing, [eName]: eValue
                    }
                }));
                this.setState({ PriceTexAPV: "" })
                localValidate.PriceRangeTemp = true
            }
        }
        else if (eName === 'Tax') {
            this.setState(prevState => ({
                EventPricing: {
                    ...prevState.EventPricing, [eName]: eValue
                }
            }));
        }
        this.internalValidateFunction(eName, eValue)
    };

    handleALChange = (value, name) => {
        this.setState(prevState => ({
            EventPricing: {
                ...prevState.EventPricing, [name]: value
            }
        }));
    };

    render() {
        return (
            <Row>
                <Col lg={6}>
                    <table style={{ width: "100%" }}>
                        <tbody>
                            <tr id={"addr" + item.id} key={item.id}>
                                <td>
                                    <Form
                                        className="repeater"
                                        enctype="multipart/form-data"
                                    >
                                        <div data-repeater-list="group-a">
                                            <Row data-repeater-item>
                                                <Col lg="6" className="form-group">
                                                    <Label for="name">Price <span className="text-danger" >*</span></Label>
                                                    <Input
                                                        type="number"
                                                        id="name"
                                                        name='Price'
                                                        value={this.state.EventPricing.Price} min="0" max="99999"
                                                        onChange={(e) => this.handleIChange(e)}
                                                    />
                                                </Col>
                                                <Col lg="6" className="form-group">
                                                    <Label for="tax">Tax <span className="text-danger" >*</span></Label>
                                                    <Input
                                                        type="number"
                                                        id="tax"
                                                        name='Tax'
                                                        value={this.state.EventPricing.Tax}
                                                        onChange={(e) => this.handleIChange(e)}
                                                    />
                                                </Col>
                                                <Col lg="8" className="form-group">
                                                    <Label for="location">Location</Label>
                                                    <Autocomplete
                                                        name="EventCity"
                                                        value={this.state.EventPricing.TrainingLocationID}
                                                        DataList={this.props.CityList}
                                                        ACType='City'
                                                        handleALChange={this.handleALChange} />
                                                </Col>
                                            </Row>
                                        </div>
                                    </Form>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div><span className="text-danger">{this.state.PriceTexAPV}</span></div>
                </Col>
            </Row>

        );
    }
}

export default EventPricing;
