import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button } from "reactstrap";
//import Select from "react-select";
import AddIcon from '@material-ui/icons/Add';
import Autocomplete from "../AutocompleteActivityPricing";
import { AllValidate } from '../../ActivityModel'

let localValidate = {
    PriceAPVTemp: false, TexAPVTemp: false, PriceRangeTemp: true
}

class ActivityPricing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ActivityPricing: [...this.props.ActivityPricing],
            ...AllValidate.APValidate
        };
        this.handleIChange = this.handleIChange.bind(this); //handle input field change
        this.handleALChange = this.handleALChange.bind(this); //handle select location filed change
        this.validateFunction = this.validateFunction.bind(this) // field validation
    }
    // using to send back the update object
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.ActivityPricing !== this.props.ActivityPricing) {
            this.setState({ ActivityPricing: this.props.ActivityPricing })
          }
        if(prevState.ActivityPricing !== this.state.ActivityPricing) {
            this.props.handleActivityPricing(this.state.ActivityPricing)
        }
        if(prevProps.TriggrtVaidation !== this.props.TriggrtVaidation) {
            this.validateFunction()
        }
        // if(prevState.ActivityPricing !== this.state.ActivityPricing){
        //     this.validateFunction()
        // }
    }
    // validation function
    validateFunction = () => {
        let a = [];
        // validate array of object
        this.state.ActivityPricing.forEach((row, index) => {
            if (row.Price === '') {
                localValidate.PriceAPVTemp = false
            }
            else {
                localValidate.PriceAPVTemp = true
            }
            if (row.TaxID === '') {
                localValidate.TexAPVTemp = false
            }
            else{
                localValidate.TexAPVTemp = true
            }
            let temp = {PriceAPVTemp: localValidate.PriceAPVTemp, TexAPVTemp: localValidate.TexAPVTemp, PriceRangeTemp: localValidate.PriceRangeTemp}
            a.push(temp)
        })
        // fianl validate 
        let c = JSON.stringify(a)
        let b = JSON.stringify(a).includes('false')
        if(b){
            this.setState({ PriceTexAPV: "Please fill the Price and Tex Fields"})
            this.props.handleAllCompValidation('AP', false)
        }
        else{
            this.setState({ PriceTexAPV: ""})
            this.props.handleAllCompValidation('AP', true)
        }
    }
    // Add Row
    handleAddRow = () => {
        const item = {
            id: this.state.ActivityPricing.length + 1, Price: '', TaxID: '', TrainingLocationID: '', Discount: '0'
        };
        this.setState({
            ActivityPricing: [...this.state.ActivityPricing, item]
        });
    };
    // Remove Row
    handleRemoveRow = (e, idx) => {
        //this.state.ActivityPricing.splice(idx, 1);
        let temp = this.state.ActivityPricing.filter(item => item.id !== idx)
        this.setState({ ActivityPricing: temp })
    };
    //handle input field change
    handleIChange = (event, Id) => {
        let temp = this.state.ActivityPricing
        let eName = event.target.name;
        let eValue = event.target.value;
        for (let a of temp) {
            if (a.id == Id) {
                if (eName === 'Price') {
                    let b = parseFloat(eValue)
                    if(b > 99999){
                        this.setState({ PriceTexAPV: "Price cannot be more then 99999"})
                        localValidate.PriceRangeTemp = false
                    }
                    else{
                        a.Price = eValue
                        this.setState({ PriceTexAPV: ""})
                        localValidate.PriceRangeTemp = true
                    }
                    
                }
                else if (eName === 'TaxID') {
                    a.TaxID = eValue
                }
            }
        }
        this.setState({ ActivityPricing: temp });
    };
    handleALChange = (Value, Id) => {
        let temp = this.state.ActivityPricing
        for (let a of temp) {
            if (a.id == Id) {
                a.TrainingLocationID = Id.toString()
            }
        }
        this.setState({ ActivityPricing: temp });
    };
    render() {
        return (
            <Row>
                <Col lg={6}>
                    <table style={{ width: "100%" }}>
                        <tbody>
                            {this.state.ActivityPricing.map((item) => (
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
                                                            value={item.Price} min="0" max="99999"
                                                            onChange={(e) => this.handleIChange(e, item.id)}
                                                        />
                                                    </Col>
                                                    <Col lg="6" className="form-group">
                                                        <Label for="tax">Tax <span className="text-danger" >*</span></Label>
                                                        <Input
                                                            type="number"
                                                            id="tax"
                                                            name='TaxID'
                                                            value={item.TaxID}
                                                            onChange={(e) => this.handleIChange(e, item.id)}
                                                        />
                                                    </Col>
                                                    <Col lg="8" className="form-group">
                                                        <Label for="location">Location</Label>
                                                        <Autocomplete
                                                            name="TrainingLocationID"
                                                            value={item.TrainingLocationID}
                                                            DataList={this.props.CityList}
                                                            ACType='Activity Location'
                                                            ItemId={item.id}
                                                            handleALChange={this.handleALChange} />
                                                    </Col>
                                                    <Col lg="4" className="form-group align-self-center mt-4" >
                                                        <Button
                                                            onClick={e =>
                                                                this.handleRemoveRow(e, item.id)
                                                            }
                                                            className="update-btn"
                                                        >
                                                            {" "}
                                                            Delete{" "}
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Form>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div><span className="text-danger">{this.state.PriceTexAPV}</span></div>
                    <Link onClick={this.handleAddRow}>
                        <AddIcon className="float-left" style={{ fontSize: 20 }} /> <span className="float-left">Add Pricing (For Other Location)</span>
                    </Link>
                </Col>
            </Row>

        );
    }
}

export default ActivityPricing;
