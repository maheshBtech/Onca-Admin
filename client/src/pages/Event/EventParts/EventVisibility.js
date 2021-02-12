import React, { Component } from "react";
import { Row, Col, Label, Input, Card, CardBody, CardHeader, Modal, Button } from "reactstrap";
//import { Link } from "react-router-dom";
import MultiChipSelect from "../MultiChipSelect";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Autocomplete from "../Autocomplete";

let localValidate = {
    EventCountryAVVTemp: false, EventStateAVVTemp: false, EventCityAVVTemp: false,
    EventVenueAVVTemp: false, EventVenueDetailAVVTemp: false
}

class Visibility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            duration_checkbox: false,
            selectedGroup: null,
            modal_center: false,
            modal_scroll: false,
            EventVisibility: { ...this.props.EventVisibility },
            UserList: { ...this.props.UserList },
            ...AllValidate.AVValidate
        };

        this.handleACChange = this.handleACChange.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleCBchange = this.handleCBchange.bind(this)
        this.validateFunction = this.validateFunction.bind(this)
        this.internalValidateFunction = this.internalValidateFunction.bind(this)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.EventVisibility !== this.props.EventVisibility) {
            this.setState({ EventVisibility: this.props.EventVisibility })
        }
        if (prevState.EventVisibility !== this.state.EventVisibility) {
            this.props.handleEventVisibility(this.state.EventVisibility)
        }
        if (prevProps.TriggrtVaidation !== this.props.TriggrtVaidation) {
            this.validateFunction()
        }
    }

    // validation function
    validateFunction = () => {
        // Validate Location - Country
        if (this.state.EventVisibility.EventCountry === 0) {
            this.setState({ EventCountryAVV: 'Please Enter Event Country' })
            localValidate.EventCountryAVVTemp = false
        }
        else {
            this.setState({ EventCountryAVV: "" })
            localValidate.EventCountryAVVTemp = true
        }
        // Validate Location - State
        if (this.state.EventVisibility.EventState === 0) {
            this.setState({ EventStateAVV: 'Please Enter Event State' })
            localValidate.EventStateAVVTemp = false
        }
        else {
            this.setState({ EventStateAVV: "" })
            localValidate.EventStateAVVTemp = true
        }
        // Validate Location - City
        if (this.state.EventVisibility.EventCity === 0) {
            this.setState({ EventStateAVV: 'Please Enter Event City' })
            localValidate.EventStateAVVTemp = false
        }
        else {
            this.setState({ EventStateAVV: "" })
            localValidate.EventStateAVVTemp = true
        }
        // Validate Geo Location
        if (this.state.EventVisibility.EventTrainingLocation === "") {
            this.setState({ EventVenueAVV: 'Please Enter Event Geo Location' })
            localValidate.EventVenueAVVTemp = false
        }
        else {
            this.setState({ EventVenueAVV: "" })
            localValidate.EventVenueAVVTemp = true
        }
        // Validate Event Description
        if (this.state.EventVisibility.EventVenuDetail.getCurrentContent().getPlainText().length === 0) {
            this.setState({ EventVenueDetailAVV: 'Please Enter Event Venue Details' })
            localValidate.EventVenueDetailAVVTemp = false
        }
        else {
            this.setState({ EventVenueDetailAVV: "" })
            localValidate.EventVenueDetailAVVTemp = true
        }
        // final validation
        if (localValidate.EventCountryAVVTemp === false || localValidate.EventStateAVVTemp === false ||
            localValidate.EventCityAVVTemp === false || localValidate.EventVenueAVVTemp === false ||
            localValidate.EventVenueDetailAVVTemp === false) {
            this.props.handleAllCompValidation('AV', false)
        }
        else {
            this.props.handleAllCompValidation('AV', true)
        }
    }

    // internal validation
    internalValidateFunction = (fname, fvalue) => {
        switch (fname) {
            case 'EventCountry':
                // Validate Location - Country
                if (fvalue === 0) {
                    this.setState({ EventCountryAVV: 'Please Enter Event Country' })
                    localValidate.EventCountryAVVTemp = false
                }
                else {
                    this.setState({ EventCountryAVV: "" })
                    localValidate.EventCountryAVVTemp = true
                }
                break
            case 'EventState':
                // Validate Location - State
                if (fvalue === 0) {
                    this.setState({ EventStateAVV: 'Please Enter Event State' })
                    localValidate.EventStateAVVTemp = false
                }
                else {
                    this.setState({ EventStateAVV: "" })
                    localValidate.EventStateAVVTemp = true
                }
                break
            case 'EventCity':
                // Validate Location - City
                if (fvalue === 0) {
                    this.setState({ EventStateAVV: 'Please Enter Event City' })
                    localValidate.EventStateAVVTemp = false
                }
                else {
                    this.setState({ EventStateAVV: "" })
                    localValidate.EventStateAVVTemp = true
                }
                break
            case 'EventTrainingLocation':
                // Validate Geo Location
                if (fvalue === "") {
                    this.setState({ EventVenueAVV: 'Please Enter Event Geo Location' })
                    localValidate.EventVenueAVVTemp = false
                }
                else {
                    this.setState({ EventVenueAVV: "" })
                    localValidate.EventVenueAVVTemp = true
                }
                break
            case 'EventVenuDetail':
                // Validate Event Description
                if (fvalue.getCurrentContent().getPlainText().length === 0) {
                    this.setState({ EventVenueDetailAVV: 'Please Enter Event Venue Details' })
                    localValidate.EventVenueDetailAVVTemp = false
                }
                else {
                    this.setState({ EventVenueDetailAVV: "" })
                    localValidate.EventVenueDetailAVVTemp = true
                }
                break
            default:
                break
        }
    }
    // handle all checkbox
    handleCBchange = (event) => {
        let fname = event.target.name;
        let fvalue = event.target.checked;
        this.setState(prevState => ({
            EventVisibility: {
                ...prevState.EventVisibility, [fname]: fvalue
            }
        }));
    }
    // handle Event tag
    handleInputChange = (event) => {
        let Iname = event.target.name
        let Ivalue = event.target.value
        this.setState(prevState => ({
            EventVisibility: {
                ...prevState.EventVisibility, [Iname]: Ivalue
            }
        }));
        this.internalValidateFunction(Iname, Ivalue)
    }
    // handle all Autocomplete
    handleACChange = (value, name) => {
        this.setState(prevState => ({
            EventVisibility: {
                ...prevState.EventVisibility, [name]: value
            }
        }));
        this.internalValidateFunction(name, value)
    }

    render() {
        const { selectedGroup } = this.state;
        return (
            <Row>
                <Col lg={6}>
                    <div className="form-group">
                        <Label for="name">Filter by Location</Label>
                        <Autocomplete
                            name="EventCountry"
                            value={this.state.EventVisibility.EventCountry}
                            DataList={this.props.CountryList}
                            ACType='Country'
                            handleACChange={this.handleACChange} />
                    </div>
                    <div className="form-group">
                        <Autocomplete
                            name="EventState"
                            value={this.state.EventVisibility.EventState}
                            DataList={this.props.StateList}
                            ACType='State'
                            handleACChange={this.handleACChange} />
                    </div>
                    <div className="form-group">
                        <Autocomplete
                            name="EventCity"
                            value={this.state.EventVisibility.EventCity}
                            DataList={this.props.CityList}
                            ACType='City'
                            handleACChange={this.handleACChange} />
                    </div>
                    <div className="form-group">
                        <Input type="text" name='EventTrainingLocation' id="eventTrainingLocation" value={this.state.EventVisibility.EventTrainingLocation}
                            placeholder='Select Training Locations' onChange={(e) => this.handleInputChange(e)} />
                    </div>
                    <div className="form-group mb-0">
                        <Row>
                            <Col lg={7}>
                                <Label for="participants">Maximum Limit of participants </Label>
                                <Input type="number" name='EventParticipentLimit' id="participants" value={this.state.EventVisibility.EventParticipentLimit}
                                    placeholder='Enter no of participents' onChange={(e) => this.handleInputChange(e)} />
                            </Col>
                            <Col lg={5} className="pl-0 mt-4">
                                <FormControlLabel
                                    value="personalBest"
                                    control={<Checkbox color="primary" name='EventWebsite' checked={this.state.EventVisibility.EventWebsite} onChange={this.handleCBchange} />}
                                    label="Website"
                                />
                                <FormControlLabel
                                    value="personalBest"
                                    control={<Checkbox color="primary" name='EventMobile' checked={this.state.EventVisibility.EventMobile} onChange={this.handleCBchange} />}
                                    label="Mobile App"
                                />
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default Visibility;