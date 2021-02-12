import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Form,
  Label,
  Input,
} from "reactstrap";
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import RadioGroup from '@material-ui/core/RadioGroup';
import MultiChipSelect from './SubComponent/MultiChipSelect';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { ValidationMessage } from "./SubComponent/CommonMessage";
import LocationMultiChipSelect from "./SubComponent/LocationMultiChipSelect"
import PromocodeService from './PromocodeService'
import Information_Message from './SubComponent/Information_Message';
import { connect } from "react-redux";
import store from "../../../store";
import moment from 'moment';

const promocodeService = new PromocodeService()


class AddPromocode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            promocode: "",
            promocode_value: "",
            promocode_desc: "",
            from_date: "",
            to_date: "",
            selected: "SignUp",
            newsignupflag: true,
            registereduserflag: false,
            Interesteduserflag: false,
            yesOldrunnerflag: false,
            noOldrunnerflag: false,
            hidepromocodeflag: false,
            promocode_valid: false,
            promocode_value_valid: false,
            promocode_desc_valid: false,
            from_date_valid: false,
            to_date_valid: false,
            showBlock: false,
            selectedforOldprogramme: false,
            error: {},
            oldrunnerflag: false,
            promocodeID: null,
            success_msg: false,
            modal_data: "",
            eventData: null,
            model_title: "",
            btn_call: "",

        };


    }
    CancelBtn() {
        this.setState({ success_msg: false });
    }
    Information_MessageBtn() {
        this.setState({ with_title: false });
    }
    componentDidMount(){
         
        let updateddata=store.getState().Promocode.selecteddata ;
     
      if (updateddata !== "" ) {
     
        
          this.state.promocodeID=updateddata.Promocode_ID
          this.state.promocode =updateddata.Promocode
          this.state.promocode_valid = true;
          
          this.state.promocode_value =updateddata.Promocode_Value
          this.state.promocode_value_valid = true;

          this.state.promocode_desc =updateddata.Description
          this.state.promocode_desc_valid = true;
          
        //   var localTime = new Date(updateddata.Validity_Start_Date).toISOString().slice(0,10);
          this.state.from_date =moment(updateddata.Validity_Start_Date).format('YYYY-MM-DD')
        //   updateddata.Validity_Start_Date.format('YYYY-MM-DD')
          this.state.from_date_valid = true;
         
        //   var localendTime = new Date(updateddata.Validity_End_Date).toISOString().slice(0,10);
          this.state.to_date =moment(updateddata.Validity_End_Date).format('YYYY-MM-DD')
          this.state.to_date_valid = true;
         
          this.state.maxuserlimit=updateddata.Max_User_Limit

          this.state.newsignupflag = updateddata.New_Signup_Flag["data"][0]

          if (updateddata.New_Signup_Flag["data"][0] > 0) {
              this.state.selected = 'SignUp'
          }

          this.state.registereduserflag = updateddata.Registered_Users_Flag["data"][0]

          this.state.oldrunnerflag = updateddata.Old_Runners_Flag !== null? updateddata.Old_Runners_Flag["data"][0]:false
         
          this.state.hidepromocodeflag=updateddata.Visibility_Flag["data"][0]

          if (updateddata.Registered_Users_Flag["data"][0] > 0) {
              this.state.selected = 'Registered'
            this.setState({  showBlock: true });
              
              if (updateddata.Old_Runners_Flag !== null && updateddata.Old_Runners_Flag["data"][0] > 0) {
                  this.state.selectedforOldprogramme = 'Yes'
                  this.state.yesOldrunnerflag=true
              }
              else {
                  this.state.selectedforOldprogramme = 'No'
                  this.state.noOldrunnerflag=true
              }            

          }
       
          this.state.Interesteduserflag = updateddata.Interested_Users_Flag["data"][0]

          if (updateddata.Interested_Users_Flag["data"][0] > 0) {
              this.state.selected = 'Interested'
          }
         

        }
     
    }


    //promocode
    handlePromocode = (event) => {
         
        this.setState({ promocode: event.target.value }, this.validatePromocode)

    }

    validatePromocode = () => {
         
        let error = { ...this.state.error }
        // var promocodeRGEX = /^([a-zA-Z0-9_-]){8,30}$/;
        var promocodeRGEX = /^[0-9a-zA-Z]+$/;

        var promocodeResult = promocodeRGEX.test(this.state.promocode);
      
        if (!this.state.promocode || (10>(this.state.promocode.length)) || ((this.state.promocode.length)>35) || promocodeResult === false ) {
            error.promocode_msg = "Promocode should be Alphanumeric of length between 8 to 30";
            this.state.promocode_valid = false;
        } else {
            this.state.promocode_valid = true;
        }

        this.setState({ error });
    }

    handlePromocodeValue = (event) => {
         
        this.setState({ promocode_value: event.target.value }, this.validatePromocodeValue)

    }

    validatePromocodeValue = () => {
         
        let error = { ...this.state.error }

        if (!this.state.promocode_value || (this.state.promocode_value > 9999)) {
            error.promocode_value_msg = "Promocode value should be between 0 to 9999 range";
            this.state.promocode_value_valid = false;
        } else {
            this.state.promocode_value_valid = true;
        }

        this.setState({ error });
    }
    handlePromocodeDesc = (event) => {
         
        this.setState({ promocode_desc: event.target.value }, this.validatePromocodeDesc)

    }

    validatePromocodeDesc = () => {
         
        let error = { ...this.state.error }

        if (!this.state.promocode_desc || this.state.promocode_desc.length>250) {
            error.promocode_desc_msg = "Please enter valid Promocode Description of 250 Characters";
            this.state.promocode_desc_valid = false;
        } else {
            this.state.promocode_desc_valid = true;
        }

        this.setState({ error });
    }

    handleFromDate = (event) => {
         
        if (event === undefined) {
            this.setState({ from_date: "" }, this.validateFromDate)
        }
        else {
            this.setState({ from_date: event.target.value }, this.validateFromDate)
        }
    };

    validateFromDate = () => {
         
        let error = { ...this.state.error }
        var now = new Date()
       
        let fromdate = new Date(this.state.from_date)
     

        if (!this.state.from_date) {
            error.from_date_msg = "Please select correct date";
            this.state.from_date_valid = false;
        } else if (fromdate < now) {
            error.from_date_msg = "Please select correct date";
            this.state.from_date_valid = false;

        }
        else {
            this.state.from_date_valid = true;
        }

        this.setState({ error });
    }

    handleToDate = (event) => {
         
        if (event === undefined) {
            this.setState({ to_date: "" }, this.validateToDate)
        }
        else {
            this.setState({ to_date: event.target.value }, this.validateToDate)
        }
    };

    validateToDate = () => {
         
        let error = { ...this.state.error }
        var now = new Date()
       
        let todate = new Date(this.state.to_date)
      
        let fromdate = new Date(this.state.from_date)
      
        if (!this.state.to_date) {
            error.to_date_msg = "Please select correct date";
            this.state.to_date_valid = false;
        } else if (todate < now) {
            error.to_date_msg = "Please select correct date";
            this.state.to_date_valid = false;

        } else if (fromdate > todate) {
            error.to_date_msg = "Please select correct date";
            this.state.to_date_valid = false;
        }
        else {
            this.state.to_date_valid = true;
        }

        this.setState({ error });
    }

    handleChange = ev => {
         
        this.setState({ selected: ev.target.value });
        this.radiochecked(ev.target.value);

    };

    handleUserlimit = ev => {
         
        this.setState({ maxuserlimit: ev.target.value });

    };
    radiochecked(radiovalue) {
         
        if (radiovalue === 'SignUp') {
            this.setState({ newsignupflag: true, registereduserflag: false, Interesteduserflag: false, showBlock: false,oldrunnerflag:false,hidepromocodeflag:false });
        }
        else if (radiovalue === 'Registered') {
            this.setState({ newsignupflag: false, registereduserflag: true, Interesteduserflag: false, showBlock: true });
        }
        else {
            this.setState({ newsignupflag: false, registereduserflag: false, Interesteduserflag: true, showBlock: false ,oldrunnerflag:false,hidepromocodeflag:false});

        }

    }
    oldprogrammeradiohandleChange = ev => {
         
        this.setState({ selectedforOldprogramme: ev.target.value });
        this.oldprogrammeradiochecked(ev.target.value);

    };
    oldprogrammeradiochecked(radiovalue) {
         
        if (radiovalue === 'Yes') {
            this.setState({ oldrunnerflag: true, yesOldrunnerflag: true, noOldrunnerflag: false });
        }
        else {
            this.setState({ oldrunnerflag: false, yesOldrunnerflag: false, noOldrunnerflag: true });
        }
    }
    HidePromocodeChecked(ev) {
         
        this.setState(prevState => ({
            hidepromocodeflag: !prevState.hidepromocodeflag,

        }));
    }


    disableKeyPress = (e) => {
        e.preventDefault();
        return false
    }

    submitNewPromocodeForm = (evt) => {
         
        evt.preventDefault()
      
        if (this.state.promocode_valid === false) {
            this.validatePromocode();
            return false;
        }
       
        if (this.state.promocode_value_valid === false) {
            this.validatePromocodeValue();
            return false;
        }
        if (this.state.promocode_desc_valid === false) {
            this.validatePromocodeDesc();
            return false;
        }

        if (this.state.from_date_valid === false) {
            this.validateFromDate();
            return false;
        }
        if (this.state.to_date_valid === false) {
            this.validateToDate();
            return false;
        }
        let error = { ...this.state.error }
        if ((this.state.newsignupflag === false && this.state.registereduserflag === false && this.state.Interesteduserflag === false)||(this.state.newsignupflag === 0 && this.state.registereduserflag === 0 && this.state.Interesteduserflag === 0)) {
            error.to_radio_msg = "Please select at least one Input";
            this.state.radioflag_valid = false;
            this.setState({ error }); 
            return false;
        }
        else {
            this.state.radioflag_valid = true;
            error.to_radio_msg = "";
            this.setState({ error }); 
        }

        
        let Activities = "";
        let locations = "";

        if (this.state.registereduserflag === true || this.state.registereduserflag === 1) {
          
            locations = this.props.selectedLocations
            if (locations.length === 0) {
                return false;
            }
              Activities = this.props.selectedActivities
            if (Activities.length === 0) {
                return false;
            }
            let error = { ...this.state.error }
            if ((this.state.yesOldrunnerflag === false && this.state.noOldrunnerflag === false)||( this.state.yesOldrunnerflag === 0 || this.state.noOldrunnerflag === 0)) {
                error.to_radioyesno_msg = "Please select Visibility Flag";
                this.state.radioyesno_valid = false;
                this.setState({ error }); 
                return false;
            }
            else {
                this.state.radioyesno_valid = true;
                error.to_radioyesno_msg = "";
                this.setState({ error }); 
            }

        }

        if (this.state.promocode_valid === true && this.state.promocode_value_valid === true && this.state.promocode_desc_valid === true
            && this.state.radioflag_valid === true) {
            let selectedactivities = null
            if (Activities.length > 0) {

                Activities.forEach(obj => {

                    selectedactivities = selectedactivities + obj.id + ','
                });
                selectedactivities = selectedactivities.substring(0, selectedactivities.length - 1)
            }
            let selectedlocations = null;
            if (locations.length > 0) {

                locations.forEach(obj => {

                    selectedlocations = selectedlocations + obj.id + ','
                });
                selectedlocations = selectedlocations.substring(0, selectedlocations.length - 1)
            }
            let UserSkeyID = this.props.UserSkeyID
            let provider_ID = this.props.ProviderID

            let data = {
                promocodeID: this.state.promocodeID, provider_ID: provider_ID, promocode: this.state.promocode, promocodevalue: this.state.promocode_value, promocodeDesc: this.state.promocode_desc, startdate: this.state.from_date,
                todate: this.state.to_date, maxuserlimit: this.state.maxuserlimit, signupflag: this.state.newsignupflag, registeredflag: this.state.registereduserflag, interesteduserflag: this.state.Interesteduserflag,
                oldrunnerflag: this.state.oldrunnerflag, visibilityflag: this.state.hidepromocodeflag, traininglocationIds: selectedlocations, activityids: selectedactivities, UserSkeyID: UserSkeyID
            }
            promocodeService.CreateUpdatePromocode(data)

                .then((response) => {
                    if (response.status == 200) {
                        this.setState({ with_title: true, model_title: "Thanks, transaction is completed successfully!!!" });
                    }
                })
                .catch(err => { alert("error occured") })


        }


    }

    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <Row className="align-items-center">
                        <Col sm={6}>
                            <div className="page-title-box">
                                <ol className="breadcrumb mb-0">
                                    <li className="breadcrumb-item">
                                        Finance
                                    </li>
                                    <li className="breadcrumb-item">
                                        <Link to="/finance-promocode">Promocode</Link>
                                    </li>
                                    <li className="breadcrumb-item active">Add Promocode</li>
                                </ol>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Row>
                    <Col xl={12} className="text-right mb-4">
                        <Link to="/finance-promocode">
                            <span role="button" className="btn update-btn font ml-3">
                                Back
                            </span>
                        </Link>
                    </Col>
                </Row>

                <Row>
                    <Col lg={12}>
                        <Form onSubmit={this.submitNewPromocodeForm}>
                            <Card className="mini-stat">
                                <CardHeader className="bl-bg text-white">
                                    <b>Add Promocode</b>
                                </CardHeader>
                                <CardBody>

                                    <Row>
                                        <Col lg={6}>
                                            <div className="form-group">
                                                <Label for="Promocode">Promocode <span className="text-danger"> *</span></Label>
                                                <Input type="text" name="promocode" id="promocode"
                                                    placeholder="Enter Promocode"
                                                    onChange={this.handlePromocode}
                                                    value={this.state.promocode}
                                                    onBlur={this.validatePromocode}
                                                />
                                                <ValidationMessage valid={this.state.promocode_valid} message={this.state.error.promocode_msg} />
                                            </div>

                                            <div className="form-group">
                                                <Label for="Promovalue">Promocode Value <span className="text-danger"> *</span></Label>
                                                <Input type="number" name="promovalue" id="promovalue"
                                                    placeholder="Enter Promocode Value"
                                                    onChange={this.handlePromocodeValue}
                                                    value={this.state.promocode_value}
                                                    onBlur={this.validatePromocodeValue}
                                                />
                                                <ValidationMessage valid={this.state.promocode_value_valid} message={this.state.error.promocode_value_msg} />
                                            </div>
                                            <div className="form-group">
                                                <Label for="Desc">Text Area <span className="text-danger"> *</span></Label>
                                                <Input type="textarea" name="Desc" id="Desc"
                                                    placeholder="Enter Description"
                                                    onChange={this.handlePromocodeDesc}
                                                    value={this.state.promocode_desc}
                                                    onBlur={this.validatePromocodeDesc}
                                                />
                                                <ValidationMessage valid={this.state.promocode_desc_valid} message={this.state.error.promocode_desc_msg} />
                                            </div>
                                            <Row>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <Label for="valFrom">Valid From<spam className="text-danger"> *</spam></Label>
                                                        <Input type="date" name="valFrom" id="valFrom"
                                                            onChange={this.handleFromDate}
                                                            onBlur={this.validateFromDate}
                                                            onKeyPress={this.disableKeyPress}
                                                            value={this.state.from_date}
                                                        // min={(new Date()).toISOString().split('T')[0]}
                                                        />
                                                        <ValidationMessage valid={this.state.from_date_valid} message={this.state.error.from_date_msg} />

                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <Label for="valTo">Valid To<spam className="text-danger"> *</spam></Label>
                                                        <Input type="date" name="valTo" id="valTo"
                                                            onChange={this.handleToDate}
                                                            onBlur={this.validateToDate}
                                                            onKeyPress={this.disableKeyPress}
                                                            value={this.state.to_date}
                                                        />
                                                        <ValidationMessage valid={this.state.to_date_valid} message={this.state.error.to_date_msg} />

                                                    </div>
                                                </div>
                                            </Row>
                                            <div className="form-group">
                                                <Label for="maxLimit">Maximum Limit of participants </Label>
                                                <Input type="number" name="maxLimit" id="maxLimit" value={this.state.maxuserlimit}
                                                    onChange={this.handleUserlimit} />
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <RadioGroup row aria-label="users" name="users" defaultValue="top" onChange={this.handleChange} value={this.state.selected}>
                                                <FormControlLabel
                                                    value="SignUp"
                                                    control={<Radio color="primary"
                                                    //  checked={this.state.newsignupflag}
                                                    // onChange={(event)=>newsignupChecked(event)}
                                                    />}
                                                    label="Only for new Sign Up"
                                                    className="w-100"
                                                />
                                                <FormControlLabel
                                                    value="Registered"
                                                    control={<Radio color="primary"
                                                    // checked={this.state.registereduser}
                                                    // onChange={(event)=>registereduserChecked(event)}
                                                    />}
                                                    label="Only Registered Users"
                                                    className="w-100"
                                                />
                                                <FormControlLabel
                                                    value="Interested"
                                                    control={<Radio color="primary"
                                                    // checked={this.state.Interesteduser}
                                                    // onChange={(event)=>InteresteduserChecked(event)} 
                                                    />}
                                                    label="Only Interested Users"
                                                    className="w-100"
                                                />
                                     <ValidationMessage valid={this.state.radioflag_valid} message={this.state.error.to_radio_msg} />

                                            </RadioGroup>
                                            {this.state.showBlock === true ?
                                                <div>
                                                    <div className="form-group">
                                                        <Label for="location">Location</Label>
                                                        <LocationMultiChipSelect />
                                                    </div>
                                                    <div className="form-group">
                                                        <Label for="location">Activity</Label>
                                                        <MultiChipSelect />
                                                    </div>
                                                    <div className="form-group">
                                                        <Label for="location">Promocode for Old Program Runners <span className="text-danger">*</span></Label>
                                                        <RadioGroup row aria-label="runner" name="runner" defaultValue="top" onChange={this.oldprogrammeradiohandleChange} value={this.state.selectedforOldprogramme}>
                                                            <FormControlLabel
                                                                value="Yes"
                                                                control={<Radio color="primary"
                                                                // checked={this.state.yesOldrunnerflag}
                                                                // onChange={(event)=>yesOldrunnerflagChecked(event)} 
                                                                />}
                                                                label="Yes"
                                                            />
                                                            <FormControlLabel
                                                                value="No"
                                                                control={<Radio color="primary"
                                                                // checked={this.state.noOldrunnerflag}
                                                                // onChange={(event)=>noOldrunnerflagChecked(event)} 
                                                                />}
                                                                label="No"
                                                            />
                                          <ValidationMessage valid={this.state.radioyesno_valid} message={this.state.error.to_radioyesno_msg} />

                                                        </RadioGroup>
                                                    </div>
                                                    {/* <div className="form-group">
                                                        <FormControlLabel
                                                            value="hide"
                                                            control={<Checkbox color="primary"
                                                                checked={this.state.hidepromocodeflag}
                                                                onChange={(event) => this.HidePromocodeChecked(event)} />}
                                                            label="Hide this Promocode"
                                                        />
                                                    </div> */}

                                                </div>
                                                :
                                                null
                                            }
                                            <div className="form-group">
                                                        <FormControlLabel
                                                            value="hide"
                                                            control={<Checkbox color="primary"
                                                                checked={this.state.hidepromocodeflag}
                                                                onChange={(event) => this.HidePromocodeChecked(event)} />}
                                                            label="Hide this Promocode"
                                                        />
                                             </div>

                                        </Col>
                                    </Row>

                                </CardBody>
                            </Card>
                            <div className="form-group">
                                <Button className="btn update-btn">
                                    Add Promocode
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>


                {this.state.with_title ? (
                    <Information_Message title={this.state.model_title}
                        modelOkButtonClicked={() => this.Information_MessageBtn()}
                    ></Information_Message>
                ) : null}

            </React.Fragment>
        );
    }
}


const mapStatetoProps = state => {
    return {
        ProviderID: state.currentPageName.roleAndProvider.selectedRole.Service_Provider_ID, 
        UserSkeyID: state.userProfileData != undefined ? state.userProfileData.ProfileData[0][0].User_Skey_ID : null,
        selectedActivities: state.Promocode.selectedactivities !=undefined ? state.Promocode.selectedactivities :"",
        selectedLocations: state.Promocode.selectedlocations !=undefined ? state.Promocode.selectedlocations :"",
        promocodeviewData: state.Promocode != undefined ? state.Promocode.allcolumndata : "",
    };
};


export default withRouter(connect(mapStatetoProps, null)(AddPromocode));


