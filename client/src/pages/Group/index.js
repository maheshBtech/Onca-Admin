import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import ReactDOM from 'react-dom';
import React, { Component } from "react";
import {
  Row,
  Col,
  Label,
  Input,
  Card,
  CardBody,
  CardHeader
} from "reactstrap";
import { Link } from "react-router-dom";
import { Modal } from "reactstrap";
import AddGroupSet from '../Group/SubComponent/AddGroupSet';
import GroupService from '../Group/GroupService';
// Prime Data Table
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import GroupSetService from './SubComponent/GroupSetService';
//import ProductService from './SubComponent/ProductService';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Confirmation_Message from "./SubComponent/Confirmation_Message";
import Information_Message from "./SubComponent/Information_Message";
import { Redirect } from "react-router-dom";

//Varaiable declaration
var groupList = [];
var groupListBackup = [];
var serviceProviderID = 0;
const groupListObject = (data) => {
  //debugger;
  let getUniqueGroupSetId = [];
  if (data === undefined) {
    return;
  }

  //get the group set id,
  data.forEach((element) => {
    let grpSetId = element.Group_Set_ID;
    let isgrpSetId= false;
      getUniqueGroupSetId.forEach((elementgrp) => {
          if (elementgrp.Group_Set_ID == grpSetId){
            isgrpSetId = true;
            return isgrpSetId;
          }
      });
      if(!isgrpSetId) {
          getUniqueGroupSetId.push({
            Group_Set_ID: element.Group_Set_ID,
            Group_Set_Name: element.Group_Set_Name,
            Group_Set_Active_Flag: element.Group_Set_Active_Flag,
            isGroupDeleted: 0,
            Group_Active_Flag: element.Group_Active_Flag,
            Group_ID: element.Group_ID,
          });
      }
  });


  let orders = [];
  getUniqueGroupSetId.forEach((elementgrp) => {
    orders = [];
    data.forEach((element) => {
      let Male_FitnessGroup_JSON =  (element.Male_FitnessGroup_JSON != "" && element.Male_FitnessGroup_JSON  != null) ? JSON.parse(element.Male_FitnessGroup_JSON) :"";
      let Female_FitnessGroup_JSON = (element.Female_FitnessGroup_JSON != "" && element.Female_FitnessGroup_JSON  != null) ? JSON.parse(element.Female_FitnessGroup_JSON) : "";
      let MFJ_FEN10K = "";
      let MFJ_ST10K="";
      let MFJ_ET10K ="";

      let FFJ_FEN10K = "";
      let FFJ_ST10K="";
      let FFJ_ET10K ="";

      let MFJ_FENHM = "";
      let MFJ_STHM="";
      let MFJ_ETHM ="";

      let FFJ_FENHM = "";
      let FFJ_STHM="";
      let FFJ_ETHM ="";

      let MFJ_FENFM= "";
      let MFJ_STFM="";
      let MFJ_ETFM ="";

      let FFJ_FENFM= "";
      let FFJ_STFM="";
      let FFJ_ETFM ="";

    
    if( Male_FitnessGroup_JSON != "" && Male_FitnessGroup_JSON != undefined){
      MFJ_FEN10K = "M-" + Male_FitnessGroup_JSON[0].FitnessEventName;
      MFJ_ST10K = Male_FitnessGroup_JSON[0].StartTime;
      MFJ_ET10K = Male_FitnessGroup_JSON[0].EndTime;

      MFJ_FENHM = "M-" + Male_FitnessGroup_JSON[1].FitnessEventName;
      MFJ_STHM = Male_FitnessGroup_JSON[1].StartTime;
      MFJ_ETHM = Male_FitnessGroup_JSON[1].EndTime;

      MFJ_FENFM ="M-" + Male_FitnessGroup_JSON[2].FitnessEventName;
      MFJ_STFM = Male_FitnessGroup_JSON[2].StartTime;
      MFJ_ETFM = Male_FitnessGroup_JSON[2].EndTime;
    }
    if( Female_FitnessGroup_JSON != "" && Female_FitnessGroup_JSON != undefined){
      FFJ_FEN10K = "F-" +Female_FitnessGroup_JSON[0].FitnessEventName;
      FFJ_ST10K =Female_FitnessGroup_JSON[0].StartTime;
      FFJ_ET10K = Female_FitnessGroup_JSON[0].EndTime;

      FFJ_FENHM ="F-" + Female_FitnessGroup_JSON[1].FitnessEventName;
      FFJ_STHM = Female_FitnessGroup_JSON[1].StartTime;
      FFJ_ETHM = Female_FitnessGroup_JSON[1].EndTime;

      FFJ_FENFM = "F-" + Female_FitnessGroup_JSON[2].FitnessEventName;
      FFJ_STFM = Female_FitnessGroup_JSON[2].StartTime;
      FFJ_ETFM = Female_FitnessGroup_JSON[2].EndTime;
    }
      if (elementgrp.Group_Set_ID == element.Group_Set_ID) {
          orders.push({
            Group_ID: element.Group_ID,
            Group_Name: element.Group_Name,
            [MFJ_FEN10K]: MFJ_ST10K + "-" + MFJ_ET10K,
            [MFJ_FENHM]: MFJ_STHM + "-" + MFJ_ETHM,
            [MFJ_FENFM]:  MFJ_STFM + "-"+ MFJ_ETFM,

            [FFJ_FEN10K]: FFJ_ST10K + "-" + FFJ_ET10K,
            [FFJ_FENHM]: FFJ_STHM + "-" + FFJ_ETHM,
            [FFJ_FENFM]:  FFJ_STFM + "-"+ FFJ_ETFM,
        });
      }
      
    });
    groupList.push({
      Group_Set_ID:elementgrp.Group_Set_ID,
      Group_Set_Name: elementgrp.Group_Set_Name,
      Group_Set_Active_Flag: elementgrp.Group_Set_Active_Flag == null ? null : 
      elementgrp.Group_Set_Active_Flag["data"]["length"] > 0
      ? elementgrp.Group_Set_Active_Flag["data"][0]
      : undefined,
      isGroupDeleted: 0,
      Group_Active_Flag: elementgrp.Group_Active_Flag == null ? null : 
      elementgrp.Group_Active_Flag["data"]["length"] > 0
      ? elementgrp.Group_Active_Flag["data"][0]
      : undefined,
      Group_ID: elementgrp.Group_ID,
      orders: orders
    })
  });
};

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      GroupSet: false,
      modal_scroll: false,

      modal_center: false,
      success_msg: false,
      modal_data: "",
      eventData: null,
      model_title: "",
      btn_call: "",

      GroupSetForm: {
        GroupSetName: "",
        GroupSetNameError: "",
        Err: "",
        ShowSuccessMessage: ""
      },

      products: [],
      expandedRows: null,

      GroupList: [],
      GroupListBackup: [],
      GroupListRowData: [],

      GroupListForm: {
        GroupName: "",
        GroupDescription:""
      },

      GroupList_Redirect : null
    };

   
    this.newGroupSet = this.newGroupSet.bind(this);
    this.RemoveGroup = this.RemoveGroup.bind(this);
    this.ActivateSuspendGroup= this.ActivateSuspendGroup.bind(this);
    

    //Registering the service
    this.groupservice = new GroupService();
    ///This function is for the form handling
    this.handleSubmitGroupSet = this.handleSubmitGroupSet.bind(this);
    this.handleChangeGroupSet = this.handleChangeGroupSet.bind(this);

    this.getGroupList = this.getGroupList.bind(this);

    // Prime Data Table
    this.GroupSetService = new GroupSetService();
    this.amountBodyTemplate = this.amountBodyTemplate.bind(this);
    this.rowExpansionTemplate = this.rowExpansionTemplate.bind(this);
    this.imageBodyTemplate = this.imageBodyTemplate.bind(this);
    this.priceBodyTemplate = this.priceBodyTemplate.bind(this);
    this.ratingBodyTemplate = this.ratingBodyTemplate.bind(this);
    this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
    this.statusOrderBodyTemplate = this.statusOrderBodyTemplate.bind(this);
    this.onRowExpand = this.onRowExpand.bind(this);
    this.onRowCollapse = this.onRowCollapse.bind(this);
    this.expandAll = this.expandAll.bind(this);
    this.collapseAll = this.collapseAll.bind(this);

    this.userProfileData = this.props.userProfileData;
    this.props.updateTableData('CHANGE_CURRENT_PAGE_NAME', "Group");
    serviceProviderID = this.props.ProviderID;
    
  }

  validate = () => {
    let GroupSetNameError = "";
    let Err = "";
    let defaultError = "not assigned";

    if (this.state.GroupSetForm.GroupSetName == "" || this.state.GroupSetForm.GroupSetName == null) {
      GroupSetNameError = "Group set name";
      Err = GroupSetNameError;
    }

    if (Err) {
      if (Err !== "") {
        Err = Err + " " + defaultError;
      } else {
        Err = Err + " & " + defaultError;
      }

      this.setState({
        GroupSetForm: {
          ...this.state.GroupSetForm,
          GroupSetNameError: GroupSetNameError,
          Err: Err
        }
      });
      return false;
    }
    else {
      this.setState({

        GroupSetForm: {
          ...this.state.GroupSetForm,
          GroupSetNameError: "",
          Err: Err
        }
      });
      return true;
    }

  }

  handleChangeGroupSet = (event, inputIdentifier) => {

    
    if (inputIdentifier != undefined) {
      if (inputIdentifier.action = "select-option") {
        const value = event.value;
        const label = event.label;
        const name = inputIdentifier.name;

        this.setState({
          GroupSetForm: {
            ...this.state.GroupSetForm,
            [name]: value
          }
        });
      }
    }
    else {
      const target = event.target;
      const value = target.type === 'input' ? target.checked : target.value;
      const name = target.name;

      this.setState({
        GroupSetForm: {
          ...this.state.GroupSetForm,
          [name]: value
        }
      });
    }
  }

  ///This is my first submit forms
  handleSubmitGroupSet = (event) => {

    
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      let groupSetFormObj = this.state.GroupSetForm;
      this.groupservice.InsertUpdateGroupSet(groupSetFormObj)
        .then(resp => {
          groupList = [];
          this.setState({
            GroupSetForm: {
              ...this.state.GroupSetForm,
              ShowSuccessMessage: "Group Set is added successfully. "

            }
          });

          this.getGroupList();
        });
    }
  }
 
  ///This function
  getGroupList = () => {
    this.groupservice.GetGroupList().then((resp) => {
      //UserRoleData = this.props.UserRoleData;
      groupListObject(resp);
      this.setState({ GroupList: groupList, groupListBackup: resp });
      groupListBackup = resp; // This is to get the record in the external world
      console.log(groupList);
    });
  };

 

  ActivateSuspendGroup = (event, data, btnCall) => {
    event.preventDefault();
    let modalTitle = "";
    if (btnCall == "Sus") {
        modalTitle = "Are you sure you want to Suspend Group Set";
    }
    else if (btnCall == "Act") {
        modalTitle = "Are you sure you want to Activate Set";
    }
    //the condition message before delete
    this.setState({ btn_call: btnCall, eventData: event, success_msg: true, modal_data: data, model_title: modalTitle });
}

  RemoveGroup = (event, data, btnCall) => {

    
    event.preventDefault();
    //the condition message before delete
    this.setState({
      btn_call: btnCall,
      eventData: event,
      success_msg: true,
      modal_data: data,
      model_title: "Are you sure you want to remove",
    });
  };
  onConfirmClick() {

    
    switch (this.state.btn_call) {
      case "Sus": {
        this.state.eventData.preventDefault();
        let data = this.state.modal_data == "" || undefined ? "" : this.state.modal_data;
        this.setState({ success_msg: false });
        let objData = this.state.modal_data;
        objData.Group_Set_Active_Flag = 0;
        this.groupservice.ActivateSuspendGroup(objData)
            .then(resp => {
                groupList = [];
                this.getGroupList(this.serviceProviderID);
                this.setState({ with_title: true, model_title: "Thanks, transaction is completed successfully!!!" });
                console.log(resp);
            });

        break;
    }
    case "Act": {

        this.state.eventData.preventDefault();
        let data = this.state.modal_data == "" || undefined ? "" : this.state.modal_data;
        this.setState({ success_msg: false });
        let objData = this.state.modal_data;
        objData.Group_Set_Active_Flag = 1;
        this.groupservice.ActivateSuspendGroup(objData)
            .then(resp => {
                groupList = [];
                this.getGroupList(this.serviceProviderID);
                this.setState({ with_title: true, model_title: "Thanks, transaction is completed successfully!!!" });
                console.log(resp);
            });
        break;
    }
      case "Rmv": {
        this.state.eventData.preventDefault();
        let data =
          this.state.modal_data == "" || undefined ? "" : this.state.modal_data;
        this.setState({ success_msg: false });
        let objData = this.state.modal_data;

        objData.isGroupDeleted = 1;
        this.groupservice
          .RemoveGroup(this.state.modal_data, 1)
          .then((resp) => {
            groupList = [];
            this.getGroupList(this.serviceProviderID);
            this.setState({
              with_title: true,
              model_title: "Thanks, transaction is completed successfully!!!",
            });
            console.log(resp);
          });
        break;
      }
      default: {
        break;
      }
    }

    //Again reset the state
    this.setState({
      btn_call: "",
      eventData: null,
      success_msg: false,
      modal_data: null,
      model_title: "",
    });
  }
  Information_MessageBtn() {
    this.setState({ with_title: false });
  }

  CancelBtn() {
    this.setState({ success_msg: false });
  }
  // modal popup 
  newGroupSet() {
    this.setState(prevState => ({
      GroupSet: !prevState.GroupSet
    }));
    this.removeBodyCss();
  }
  popupScroll() {
    this.setState(prevState => ({
      modal_scroll: !prevState.modal_scroll
    }));
    this.removeBodyCss();
  }
  removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  show() {
    this.setState({ visible: true });
  }
  hide() {
    this.setState({ visible: false });
  }

  // Prime Data table Functions
  componentDidMount() {
   // this.GroupSetService.getProductsWithOrdersSmall().then(data => this.setState({ products: data }));
   
    groupList = [];
    if (this.userProfileData != null || this.userProfileData != undefined) {
      this.getGroupList();
    }
  }

  onRowExpand(event) {
    this.toast.show({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 });
  }

  onRowCollapse(event) {
    this.toast.show({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000 });
  }

  expandAll() {
    let expandedRows = {};
    this.state.products.forEach(p => expandedRows[`${p.id}`] = true);

    this.setState({
      expandedRows
    }, () => {
      this.toast.show({ severity: 'success', summary: 'All Rows Expanded', life: 3000 });
    });
  }

  collapseAll() {
    this.setState({
      expandedRows: null
    }, () => {
      this.toast.show({ severity: 'success', summary: 'All Rows Collapsed', life: 3000 });
    });
  }

  formatCurrency(value) {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  amountBodyTemplate(rowData) {
    return this.formatCurrency(rowData.amount);
  }

  statusOrderBodyTemplate(rowData) {
    return <span className={`order-badge order-${rowData.status.toLowerCase()}`}>{rowData.status}</span>;
  }

  imageBodyTemplate(rowData) {
    return <img src={`showcase/demo/images/product/${rowData.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image" />;
  }

  priceBodyTemplate(rowData) {
    return this.formatCurrency(rowData.price);
  }

  ratingBodyTemplate(rowData) {
    return <Rating value={rowData.rating} readonly cancel={false} />;
  }

  statusBodyTemplate(rowData) {
    return <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
  }

  rowExpansionTemplate(data) {
    let headerGroup = <ColumnGroup>
      <Row>
        <Column header="" colSpan={1} />
        <Column header="Male" colSpan={3} />
        <Column header="Female" colSpan={3} />
      </Row>
      <Row>
        <Column header="Group Name" />
        <Column header="10K Time" />
        <Column header="HM Time" />
        <Column header="FM Time" />
        <Column header="10K Time" />
        <Column header="HM Time" />
        <Column header="FM Time" />
      </Row>
    </ColumnGroup>;
    return (
      <div className="orders-subtable">
        <DataTable value={data.orders} headerColumnGroup={headerGroup}>
          <Column field="Group_Name" header="Group Name" sortable></Column>
          <Column field="M-10k" header="10K Time" sortable></Column>
          <Column field="M-HM" header="HM Time" sortable></Column>
          <Column field="M-FM" header="FM Time" sortable></Column>
          <Column field="F-10k" header="10K Time" sortable></Column>
          <Column field="F-HM" header="HM Time" sortable></Column>
          <Column field="F-FM" header="FM Time" sortable></Column>
        </DataTable>
      </div>
    );
  }
  actionBodyTemplate(rowData,globalThis) {

    
    return (
      <React.Fragment>
        <Link to={{pathname:"/group-list",state: {GroupListRowData:  rowData}}}
              className="btn update-btn mr-2">
              Update
              </Link>
        {/* <Button className="btn update-btn mr-2" 
         onClick={() => globalThis.data.updateMemberGroup(rowData)}
       >Update</Button>
         */}
        {(rowData.Group_Set_Active_Flag) ? <Button className="btn btn-primary mr-2" 
         onClick={(event) => globalThis.data.ActivateSuspendGroup(event, rowData, "Sus")}>Suspend
         </Button> : <Button className="btn btn-primary mr-2" 
         onClick={(event) => globalThis.data.ActivateSuspendGroup(event, rowData, "Act")}>Activate
         </Button>}

        <Button className="btn btn-danger mr-2" 
         onClick = {(event) => globalThis.data.RemoveGroup(event,rowData,'Rmv')}>Remove</Button>
      </React.Fragment>
    );
  }
  // inMemData = [
  //   {
  //     "id": "1000",
  //     "code": "f230fh0g3",
  //     "grpSetName": "HDHM",
  //     "description": "Product Description",
  //     "image": "bamboo-watch.jpg",
  //     "price": 65,
  //     "category": "Accessories",
  //     "quantity": 24,
  //     "inventoryStatus": "INSTOCK",
  //     "rating": 5,
  //     "orders": [
  //       {
  //         "grpName": "HDHM20 Indira",
  //         "M-10K": "01:00:01 - 01:20:00",
  //         "M-HM": "02:00:01 - 02:30:00",
  //         "M-FM": "04:30:01 - 05:00:00",
  //         "F-10K": "01:10:01 - 01:30:00",
  //         "F-HM": "02:18:01 - 02:40:00",
  //         "F-FM": "05:00:01 - 05:30:00",
  //       },
  //       {
  //         "grpName": "HDHM20 Luis",
  //         "M-10K": "01:20:01 - 01:40:00",
  //         "M-HM": "02:30:01 - 03:00:00",
  //         "M-FM": "05:00:01 - 05:30:00",
  //         "F-10K": "00:45:01 - 10:00:00",
  //         "F-HM": "01:10:01 - 10:00:00",
  //         "F-FM": "02:10:01 - 10:00:00",
  //       }
  //     ]
  //   },
  //   {
  //     "id": "1000",
  //     "code": "f230fh0g3",
  //     "grpSetName": "HDHM",
  //     "description": "Product Description",
  //     "image": "bamboo-watch.jpg",
  //     "price": 65,
  //     "category": "Accessories",
  //     "quantity": 24,
  //     "inventoryStatus": "INSTOCK",
  //     "rating": 5,
  //     "orders": [
  //       {
  //         "grpName": "HDHM20 Indira",
  //         "M-10K": "01:00:01 - 01:20:00",
  //         "M-HM": "02:00:01 - 02:30:00",
  //         "M-FM": "04:30:01 - 05:00:00",
  //         "F-10K": "01:10:01 - 01:30:00",
  //         "F-HM": "02:18:01 - 02:40:00",
  //         "F-FM": "05:00:01 - 05:30:00",
  //       },
  //       {
  //         "grpName": "HDHM20 Luis",
  //         "M-10K": "01:20:01 - 01:40:00",
  //         "M-HM": "02:30:01 - 03:00:00",
  //         "M-FM": "05:00:01 - 05:30:00",
  //         "F-10K": "00:45:01 - 10:00:00",
  //         "F-HM": "01:10:01 - 10:00:00",
  //         "F-FM": "02:10:01 - 10:00:00",
  //       }
  //     ]
  //   },
  // ]

  render() {
    const header = (
      <div className="table-header-container">
        <Button icon="pi pi-plus" label="Expand All" onClick={this.expandAll} className="p-mr-2" />
        <Button icon="pi pi-minus" label="Collapse All" onClick={this.collapseAll} />
      </div>
    );
    
    return (  
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/activities">Activity</Link>
                  </li>
                  <li className="breadcrumb-item active">Group Set</li>
                </ol>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={12} className="text-right">
              <button
                className="btn update-btn mb-3"
                onClick={this.newGroupSet}
                data-toggle="modal"
                data-target=".bs-example-modal-center"
              >
                Add Group Set
              </button>
              {/* <Link to={{pathname:"/group-list",state: {GroupList: this.state.GroupList}}}
              className="btn update-btn mb-3 ml-3"
              
              >
              
                Add Group
              </Link> */}
              {this.state.success_msg ? (
                <Confirmation_Message
                  title={this.state.model_title}
                  modelOkButtonClicked={this.onConfirmClick.bind(this)}
                  success_msg={true}
                  modelCancelButtonClicked={() => this.CancelBtn()}
                />
              ) : null}

              {this.state.with_title ? (
                <Information_Message
                  title={this.state.model_title}
                  modelOkButtonClicked={() => this.Information_MessageBtn()}
                ></Information_Message>
              ) : null}
              <Modal
                isOpen={this.state.GroupSet}
                toggle={this.newGroupSet}
              >
                <div className="modal-header">
                  <h5 className="modal-title mt-0"> Create New Group Set</h5>
                  <button
                    type="button"
                    onClick={() =>
                      this.setState({ GroupSet: false })
                    }
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <AddGroupSet
                    handleSubmit={this.handleSubmitGroupSet} handleChange={this.handleChangeGroupSet}
                    groupSetForm={this.state.GroupSetForm}
                  ></AddGroupSet>
                </div>
              </Modal>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Card className="mini-stat">
                <CardHeader className="bl-bg text-white">
                  <b>Group Set List</b>
                </CardHeader>
                <CardBody>
                  <Toast ref={(el) => this.toast = el} />
                  <DataTable
                    value={this.state.GroupList}
                    expandedRows={this.state.expandedRows}
                    onRowToggle={(e) => this.setState({ expandedRows: e.data })}
                    onRowExpand={this.onRowExpand}
                    onRowCollapse={this.onRowCollapse}
                    rowExpansionTemplate={this.rowExpansionTemplate}
                    dataKey="id"
                    paginator
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10, 20, 50]}
                  >
                    <Column expander style={{ width: '3em' }} />
                    <Column field="Group_Set_Name" header="Group Set Name" sortable style={{ width: '60%' }} />
                    <Column header="Action" body={ this.actionBodyTemplate} data={this}></Column>
                  </DataTable>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}
const mapStatetoProps = (state) => {
  return {
    userProfileData: state.userProfileData.ProfileData,
    ProviderID: state.currentPageName.roleAndProvider.selectedRole.Service_Provider_ID,
    UserSkeyID: state.userProfileData != undefined ? state.userProfileData.ProfileData[0][0].User_Skey_ID : null,
  };
};

const dispatchToProps = (dispatch) => {
  return {
    updateTableData: (type, payload) => {
      dispatch({ type: type, payload: payload });
    },
  };
};
export default withRouter(connect(mapStatetoProps, dispatchToProps)(Group));
