import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Row, Col, Label, Input, } from "reactstrap";
import { Card, CardBody, CardHeader, Button } from "reactstrap";
import DataTable from 'react-data-table-component';
import { Modal } from "reactstrap";
import { connect } from 'react-redux';
import UserTypeService from '../UserType/UserTypeService';
import CsvDataDownload from '../UserType/SubComponent/CSVDataDownload';
import SearchData from '../UserType/SubComponent/SearchData';
import AddUserType from '../UserType/SubComponent/AddUserType';
import Confirmation_Message from '../UserType/SubComponent/Confirmation_Message';
import Information_Message from '../UserType/SubComponent/Information_Message';
import  store from '../../../store/index';
//Varaiable declaration
var userTypeList = [];
var filterUserTypeList = [];
var UserRoleData = [];
var userTypeListBackup = [];
var getActivityToUpdate;
const customProps = { ID: 'my-table-id' };

const userTypeListObject = (data) => {
    if (data === undefined) {
        return;
    }
    data.forEach(element => {
        userTypeList.push({
            UserTypeID: element.User_Type_ID,
            UserTypeName: element.User_Type_Name,
            UserTypeDesc:element.User_Type_Desc,
            Discount: element.Discount,
            isUserTypeActive: element.User_Type_Active_Flag,
            ServiceProviderID: element.Service_Provider_ID,
            isActivate: element.User_Type_Active_Flag["data"]["length"] > 0 ? element.User_Type_Active_Flag["data"][0] : undefined,
            isUserTypeDeleted: 0
        });
    });
}

const headerStyle = {
    rows: {
        style: {
          minHeight: '100px', // override the row height
        }
      },
      headCells: {
        style: {
          backgroundColor: "#EDECEC",
        },
      },
};

class UserType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_center: false,
            modal_scroll: false,
            success_msg: false,
            modal_data: "",
            eventData: null,
            model_title: "",
            btn_call:"",
        };
        this.add_member = this.add_member.bind(this);
        this.tog_scroll = this.tog_scroll.bind(this);

        this.state = {
            UserRoleData: '',
            UserTypeList: [],
            UserTypeListBackup: []
        };
        this.userttypeservice = new UserTypeService();
        this.getUserTypeList = this.getUserTypeList.bind(this)
        this.searchAnything = this.searchAnything.bind(this);

        ///This function is for the form handling
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        //Grid button click event object
        this.RemoveUT = this.RemoveUT.bind(this);
        this.ActivateSuspendUT= this.ActivateSuspendUT.bind(this);
        store.dispatch({type:'CHANGE_CURRENT_PAGE_NAME',payload: "UserType"})
        //
        this.state = {
            UserTypeForm: {
                UserTypeName: "",
                Discount: 0,
                UserTypeDesc: "",
                UserTypeID: 0,
                ServiceProviderID: 0,
                UserTypeNameError: "",
                UserTypeDiscountError: "",
                //UsertTypeDescError:"",
                Err:"",
                ShowSuccessMessage: ""
            }
        };
    }

    //this function will add the columns
    columns = [
        {
            name: 'UserType',
            selector: 'UserTypeName',
            sortable: true
        },
        {
            name: 'Discount %',
            selector: 'Discount',
            sortable: true
        },
        {
            name: 'Description',
            selector: 'UserTypeDesc',
            sortable: true
        },
        {
          name: 'Action',
          cell: (row) =>
            <div className="col-12">
              <Button className="btn update-btn" variant="contained" type="button" onClick={() => this.updateMemberUT(row)} data-toggle="modal" data-target=".bs-example-modal-center">Update</Button>
              {this.activateOrSuspend(row)}
              <Button className="btn remove-btn" variant="contained" type="button" onClick={(event)=>this.RemoveUT(event,row,"Rmv")}>Remove</Button>
            </div>
          ,
          button: true,
         }
    ];
     activateOrSuspend =(row)=>{
  
        var selectedButton =""
        {row.isActivate ?
          selectedButton = <Button className="btn btn-warning" variant="contained" onClick={(event) => this.ActivateSuspendUT(event,row,"Sus")}>Suspend</Button>
          :
          selectedButton = <Button className="btn btn-success" variant="contained" onClick={(event) => this.ActivateSuspendUT(event,row,"Act")}>Activate</Button>
        }
        return selectedButton
        }

    validate = () => {
        let UserTypeDiscountError = "";
        let UsertTypeDescError="";
        let UserTypeNameError="";
        let Err = "";
        let defaultError = "not assigned";

        if (this.state.UserTypeForm.UserTypeName == "" || this.state.UserTypeForm.UserTypeName == null)
        {
            UserTypeNameError = "User Type Name";
            Err = UserTypeNameError;
        }

        if (this.state.UserTypeForm.Discount == "" || this.state.UserTypeForm.Discount == null)
        {
            UserTypeDiscountError = "Discount ";
            if(Err === "") {
                Err = UserTypeDiscountError;
            }
            else{
                Err = Err + " & " + UserTypeDiscountError;
            }
        }
        // if (this.state.UserTypeForm.UserTypeDesc == "" || this.state.UserTypeForm.UserTypeDesc == null)
        // {
        //     UsertTypeDescError = "User Type Desc";
        //     if(Err === "") {
        //         Err = UsertTypeDescError;
        //     }
        //     else{
        //         Err = Err + " & " + UsertTypeDescError;
        //     }
        // }



        

        if (Err) {
            if (Err !== "") {
                Err =  Err + " " + defaultError;
            }else{
                Err = Err +  " & " + defaultError;
            }
            
            this.setState({
                UserTypeForm: {
                    ...this.state.UserTypeForm,
                    UserTypeNameError: UserTypeNameError,
                    UserTypeDiscountError: UserTypeDiscountError,
                    //UsertTypeDescError: UsertTypeDescError,
                    Err: Err
                }
            });
            return false;
        }
        else {
            this.setState({

                UserTypeForm: {
                    ...this.state.UserTypeForm,
                    UserTypeDiscountError: "",
                    UserTypeNameError: "",
                    //UserTypeDescError: "",
                    Err: Err
                }
            });
            return true;
        }

    }

    ///This is my first submit forms
    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {

            let userTypeFormObj = this.state.UserTypeForm;
            this.userttypeservice.CreateUpdatePugMarkUserType(userTypeFormObj)
                .then(resp => {
                    userTypeList = [];
                    this.getUserTypeList();
                    console.log(resp);
                    this.setState({
                        
                        
                        UserTypeForm: {
                            ...this.state.UserTypeForm,
                            ShowSuccessMessage: "User Type and Discount and Desc created successfully."
                            
                        }
                        
                    });
                    this.setState(prevState => ({
                        modal_center: !prevState.modal_center
                    }));
                   

                    // Refresh the grid
                });
        }
       
    }

    handleChange = (event, inputIdentifier) => {

        const target = event.target;
        const value = target.type === 'input' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            UserTypeForm: {
                ...this.state.UserTypeForm,
                [name]: value
            }
        });

    }

    //SEarch 
    searchAnything = () => {
        let thingToSearch = document.getElementById("searchData").value;
        userTypeList = [];
        if (thingToSearch != "") {
            filterUserTypeList = this.userttypeservice.filterByValue(this.state.UserTypeListBackup, thingToSearch);
            userTypeListObject(filterUserTypeList);
        }
        else {

            userTypeListObject(this.state.UserTypeListBackup);
        }
        this.setState({ UserTypeList: userTypeList });
    }

    componentDidMount() {
        userTypeList = [];
        this.getUserTypeList();
    }

    ///This function 
    getUserTypeList = () => {
        this.userttypeservice.GetPugMarkUserTypeList()
            .then(resp => {
                UserRoleData = this.props.UserRoleData;
                userTypeListObject(resp);
                this.setState({ UserTypeList: userTypeList, UserRoleData: this.props.profileData, UserTypeListBackup: resp });
                userTypeListBackup = resp; // This is to get the record in the external world
            });
    }

    removeBodyCss() {
        document.body.classList.add("no_padding");
    }
    add_member() {
        this.setState(prevState => ({
            modal_center: !prevState.modal_center,
            UserTypeForm: {
                UserTypeName: "",
                Discount: 0,
                UserTypeDesc: "",
                UserTypeID: 0,
                ServiceProviderID: 0,
                UserTypeNameError: "",
                UserTypeDiscountError: "",
                UsertTypeDescError:"",
                Err:"",
                ShowSuccessMessage: ""
            }
        }));
        this.removeBodyCss();
    }
    updateMemberUT(data) {
        this.setState({
            UserTypeForm: {
                Discount: data.Discount,
                UserTypeName: data.UserTypeName,
                UserTypeDesc: data.UserTypeDesc,
                UserTypeID: data.UserTypeID,
                ServiceProviderID: data.UserTypeID
                
            }
        });
        this.setState(prevState => ({
            modal_center: !prevState.modal_center
        }));
        this.removeBodyCss();
    }

    ActivateSuspendUT = (event,data,btnCall) => {
        event.preventDefault();
        let modalTitle = "";
        if(btnCall == "Sus") {
            modalTitle = "Are you sure you want to Suspend UserType";
        }
        else if(btnCall == "Act"){
            modalTitle = "Are you sure you want to Activate UserType";
        }
         //the condition message before delete
        this.setState({ btn_call:btnCall,eventData: event,  success_msg: true,modal_data:data, model_title: modalTitle});
    }


    RemoveUT = (event,data,btnCall) => {
        event.preventDefault();
        //the condition message before delete
        this.setState({ btn_call:btnCall,  eventData: event,  success_msg: true,modal_data:data, model_title: "Are you sure you want to remove"});
    }

    
     onConfirmClick(){
        
        switch(this.state.btn_call){
          
            case "Sus": {
                this.state.eventData.preventDefault();
                let data =this.state.modal_data == "" || undefined ? "": this.state.modal_data;
                this.setState({ success_msg: false });
                let objData = this.state.modal_data;
                objData.isActivate = 0;
                this.userttypeservice.ActivateSuspendUT(objData)
                    .then(resp => {
                        userTypeList= [];
                        this.getUserTypeList();
                        this.setState({ with_title: true,model_title: "Thanks, transaction is completed successfully!!!" });
                        console.log(resp);
                    });

                break;
            }
            case "Act": {
                this.state.eventData.preventDefault();
                let data =this.state.modal_data == "" || undefined ? "": this.state.modal_data;
                this.setState({ success_msg: false });
                let objData = this.state.modal_data;
                objData.isActivate = 1;
                this.userttypeservice.ActivateSuspendUT(objData)
                    .then(resp => {
                        userTypeList= [];
                        this.getUserTypeList();
                        this.setState({ with_title: true,model_title: "Thanks, transaction is completed successfully!!!" });
                        console.log(resp);
                    });
                break;
            }
            case "Rmv": {

                this.state.eventData.preventDefault();
                let data =this.state.modal_data == "" || undefined ? "": this.state.modal_data;
                this.setState({ success_msg: false });
                let objData = this.state.modal_data;

                objData.isUserTypeDeleted = 1;
                this.userttypeservice.RemoveUT(this.state.modal_data)
                    .then(resp => {
                        userTypeList = [];
                        this.getUserTypeList();
                        this.setState({ with_title: true,model_title: "Thanks, transaction is completed successfully!!!" });
                        console.log(resp);
                    });
                break;
            }
            default:{
                break;
            }

        }
        
        //Again reset the state
        this.setState({ btn_call:"",  eventData: null,  success_msg: false,modal_data:null, model_title: "" });
        
    }
    CancelBtn() {
        this.setState({ success_msg: false });
    }
    Information_MessageBtn() {
        this.setState({with_title:false });
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
                                    <li className="breadcrumb-item active">
                                        User Type
                                    </li>
                                </ol>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={12} className="text-right mb-4">
                            <button
                                type="button"
                                className="btn update-btn font"
                                onClick={this.add_member}
                                data-toggle="modal"
                                data-target=".bs-example-modal-center"
                            >
                                Add User Type &amp; Discount
                        </button>
                           
                            {this.state.success_msg ? (
                                <Confirmation_Message title={this.state.model_title} 
                                modelOkButtonClicked={this.onConfirmClick.bind(this)} 
                                success_msg={true} modelCancelButtonClicked={() => this.CancelBtn()} />                               
                                ) : null}
                            
                            {this.state.with_title ? (
                                <Information_Message title={this.state.model_title} 
                                    modelOkButtonClicked={() => this.Information_MessageBtn()}
                                ></Information_Message>
                            ) : null}
                            <Modal
                                isOpen={this.state.modal_center}
                                toggle={this.add_member}
                            >
                                <div className="modal-header">
                                    <h5 className="modal-title mt-0">Add User Type &amp; Discount</h5>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            this.setState({
                                                modal_center: false,
                                                UserTypeForm: {
                                                    ShowSuccessMessage: ""
                                                }
                                            })
                                        }
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <AddUserType handleSubmit={this.handleSubmit} handleChange={this.handleChange} userTypeForm={this.state.UserTypeForm}></AddUserType>
                            </Modal>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={12}>
                            <Card className="mini-stat">
                                <CardHeader className="bl-bg">
                                    <Link to="#" className="text-white">
                                        <b>User Type &amp; Discount List</b>
                                    </Link>
                                    <span className="float-right">
                                        <SearchData searchAnything={this.searchAnything}></SearchData>
                                        <CsvDataDownload UserTypeListToDownload={userTypeList} />
                                    </span>
                                </CardHeader>
                                <CardBody>
                                    <DataTable
                                        className="data-table"
                                        columns={this.columns}
                                        data={this.state.UserTypeList}
                                        noHeader={true}
                                        customStyles={headerStyle}
                                        fixedHeader
                                        fixedHeaderScrollHeight="300px"
                                        pagination
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => {
    return {
        profileData: state.userProfileData,
        UserSkeyID: state.userProfileData != undefined ? state.userProfileData.ProfileData[0][0].User_Skey_ID :null,
        
    }
}
export default withRouter(connect(mapStateToProps)(UserType));