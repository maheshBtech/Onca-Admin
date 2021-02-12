import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import DataTable, { createTheme } from 'react-data-table-component';
import CsvDataDownload from '../../SubComponent/CSVDataDownload';
import SearchData from '../../SubComponent/SearchData';
import NewVendorService from '../../DataTemplate/NewVendor/NewVendorService';
import Confirmation_Message from '../../SubComponent/Confirmation_Message';
import Information_Message from '../../SubComponent/Information_Message';
import { connect } from 'react-redux';
import { Modal } from "reactstrap";
import {
  Card,
  Row,
  Col,
  CardBody,
  CardHeader,
  Label,
  Button,
  Input
} from "reactstrap";

var vendorList = [];
var vendorListBackup = [];
var filterUserTypeList = [];

const vendorListObject = (data) => {
  if (data === undefined) {
      return;
  }

  data.forEach(element => {
    vendorList.push({
      VendorID: element.Vendor_ID,
      VendorName: element.Vendor_Name,
      OfficeDetail: element.Address,
      SPOCDetails: element.Address,
      GSTNumber: element.GST_Code,
      isActivate: element.Active_Flag["data"]["length"] > 0 ? element.Active_Flag["data"][0] : undefined,
      });
  });
}
class VendorTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
       VendorList: [],
       VendorListBackup: []
  };
  this.state = {
    modal_center: false,
    modal_scroll: false,
    success_msg: false,
    modal_data: "",
    eventData: null,
    model_title: "",
    btn_call:"",
};
    this.getEcomVendorList = this.getEcomVendorList.bind(this)
    this.newvendorservice = new NewVendorService();
    this.searchAnything = this.searchAnything.bind(this);

    //Grid button click event object
    this.RemoveEV = this.RemoveEV.bind(this);
    this.ActivateSuspendEV= this.ActivateSuspendEV.bind(this);

    
    this.tog_scroll = this.tog_scroll.bind(this);
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
  componentDidMount() {
    vendorList = [];
    this.getEcomVendorList();
} 
 ///This function 
 getEcomVendorList = () => {
  this.newvendorservice.GetEcomVendorList()
      .then(resp => {
          vendorListObject(resp);
          this.setState({ VendorList: vendorList, VendorListBackup: resp });
          vendorListBackup = resp; // This is to get the record in the external world
      });
}
//SEarch 
searchAnything = () => {
  let thingToSearch = document.getElementById("searchData").value;
  vendorList = [];
  if (thingToSearch != "") {
      filterUserTypeList = this.newvendorservice.filterByValue(this.state.VendorListBackup, thingToSearch);
      vendorListObject(filterUserTypeList);
  }
  else {

    vendorListObject(this.state.VendorListBackup);
  }
  this.setState({ VendorList: vendorList });
}

  //  UserTransactionData = [
  //   {
  //     id: 1,
  //     VendorID: '001-WCE',
  //     VendorName: 'WILD CHILD ENTERPRISE',
  //     OfficeDetail: 'c/o Sheetal Swaroop,#164 Phase 2, Classic Orchards, Bannerughatta Road, Banglore, Karnataka, India 8861004712',
  //     SPOCDetails: 'Shilpa Kona ShilpaKona@gmail.com 9886717737 Department:Sales & Marketing',
  //     GSTNumber: '29ACVPK3940Q1ZK',
  //   },
  //   {
  //     id: 2,
  //     VendorID: '002-RMJJ',
  //     VendorName: 'Run Matters-JJ',
  //     OfficeDetail: 'D-30, SBI Colony,9th C cross, I Phase JP Nagar, Bangalore, Karnataka, India 9845510664',
  //     SPOCDetails: 'Kiran Jagdish Kiranvrn79@gmail.com 9845510664 Department:Admin',
  //     GSTNumber: '29AAMFJ0342C1ZM',
  //   },
  //   {
  //     id: 3,
  //     VendorID: '003-ASP',
  //     VendorName: 'AERONUTRIX SPORTS PRODUCTS PRIVATE LIMITED',
  //     OfficeDetail: '315 WOOD ROW PLOTI9C TC B44/19 VLG AMBIVA LI ANDHERI WESTVEERA DESAI ROAD, SHAH INDUSTRIAL ESTATE MUMBAI, Maharastra, India 9980878007',
  //     SPOCDetails: 'Vijayaragvan Venugopal vijay@aeronutrix.com  9916900081 Department:Sales & Marketing',
  //     GSTNumber: '27AANCA6802C1ZV',
  //   },
  //   {
  //     id: 4,
  //     VendorID: '0001-AURZP',
  //     VendorName: 'AURZP Pharmaceuticals',
  //     OfficeDetail: 'No.527, 1st floor, Anjaneya Temple Street, Bangalore, Karnataka,India 9845269699',
  //     SPOCDetails: 'BN Ramesh aurznutrition@gmail.com 8861055466 Department:Sales & Marketing',
  //     GSTNumber: '29ABIFA3344C1ZP',
  //   },
  //   {
  //     id: 5,
  //     VendorID: '0001-SL',
  //     VendorName: 'Supra LifeSciences',
  //     OfficeDetail: '6/92, 38TH Main,9th "B" Cross, SBI colony, JP Nagar 1st Phase, Bangalore, Karnataka, India 9164400999',
  //     SPOCDetails: 'Prasanna Kumar gvprasanna11@gmail.com 9632719459 Department:Director',
  //     GSTNumber: '29FTBPS5041C1ZP',
  //   }
  // ];

  updateMemberEV(data) {
    // this.setState({
    //     UserTypeForm: {
    //         Discount: data.Discount,
    //         UserTypeName: data.UserTypeName,
    //         UserTypeDesc: data.UserTypeDesc,
    //         UserTypeID: data.UserTypeID,
    //         ServiceProviderID: data.UserTypeID
            
    //     }
    // });
    // this.setState(prevState => ({
    //     modal_center: !prevState.modal_center
    // }));
    // this.removeBodyCss();
}
ActivateSuspendEV = (event,data,btnCall) => {
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

RemoveEV = (event,data,btnCall) => {
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
              this.newvendorservice.ActivateSuspendEV(objData)
                  .then(resp => {
                      vendorList= [];
                      this.getEcomVendorList();
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
              this.newvendorservice.ActivateSuspendEV(objData)
                  .then(resp => {
                    vendorList= [];
                      this.getEcomVendorList();
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
              this.newvendorservice.RemoveEV(this.state.modal_data)
                  .then(resp => {
                    vendorList= [];
                      this.getEcomVendorList();
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

   headerStyle = {
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
   columns = [
    {
      name: 'Vendor ID',
      selector: 'VendorID',
      sortable: true,
      wrap: true,
    },
    {
      name: 'Vendor Name',
      selector: 'VendorName',
      sortable: true,
    },
    {
      name: 'Office Detail',
      selector: 'OfficeDetail',
      sortable: true,
      wrap: true
    },
    {
      name: 'SPOC Details',
      selector: 'SPOCDetails',
      sortable: true,
      wrap: true,
    },
    {
      name: 'GST Number',
      selector: 'GSTNumber',
      sortable: true
    },
  
    {
      name: 'Action',
      cell: (row) => 
      <div className="col-12">
         {/* <Button className="mb-1 btn update-btn">
        View &amp; Update
        </Button> */}
        <span>
        <Button className="mb-1 btn update-btn"
                type="button"
                onClick={() => this.updateMemberEV(row)}>View &amp; Update</Button>
        </span>
        <span>{
          (row.isActivate) ?
        <Button className="mb-1 btn"  variant="contained" onClick={(event) => this.ActivateSuspendEV(event,row,"Sus")}>Suspend</Button>
        : <Button className="mb-1 btn activate-btn"  variant="contained"  onClick={(event) => this.ActivateSuspendEV(event,row,"Act")}>Activate</Button>
        }
        </span>
        <span>
        <Button variant="contained" color="light" onClick={(event)=>this.RemoveEV(event,row,"Rmv")}>Remove</Button>
        </span>
        
        {/* <Button className="mb-1 btn">
          Suspend
        </Button> */}
        {/* <Button className="mb-2 btn">
          Remove
        </Button> */}
      </div>
      ,
      button: true,
    },
  
  ];
  render() {
    return (
      
      <React.Fragment>
          <Card className="mini-stat">
             <CardHeader className="bl-bg">
              <Link to="#" className="text-white">
                <b>Vendor List</b>
              </Link>
              <span className="float-right">
              
              <Button className="btn update-btn font">
                <Link to="/add-vendor" className="text-white">
                Add Vendor
                </Link>
              </Button> 
              <span className="float-right">
                                        <SearchData searchAnything={this.searchAnything}></SearchData>
                                        <CsvDataDownload UserTypeListToDownload={vendorList} />
              </span>
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
       
    </Modal>
            </span>
            </CardHeader> 
            <CardBody>
              <DataTable
                className="data-table"
                columns={this.columns}
                data={this.state.VendorList}
                noHeader={true}
                customStyles={this.headerStyle}
                fixedHeader
                fixedHeaderScrollHeight="600px"
                pagination
              />
            </CardBody>
          </Card>
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
      profileData: state.userProfileData
  }
}
export default withRouter(connect(mapStateToProps)(VendorTransaction));
