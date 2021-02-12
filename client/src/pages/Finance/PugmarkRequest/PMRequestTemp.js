import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import ReactDOM from 'react-dom';
import React, { Component } from "react";
import {
  Row,
  Col,
  Input,
  Card,
  CardBody,
  CardHeader,
} from "reactstrap";
import { connect } from "react-redux";
import { withRouter, Link, } from 'react-router-dom';
import { Modal } from "reactstrap";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { PugmarkServices } from './SubComponent/PugmarkServices';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import {getpugmarkrequestlistURL} from "../../../AppConfig"
import store from "../../../store";
import Confirmation_Message from '../PugmarkRequest/SubComponent/Confirmation_Message';
import Information_Message from '../PugmarkRequest/SubComponent/Information_Message';
import Loader from "../../../components/Loader";



var pugmarksList = [];
var filterpugmarksList = [];
var pugmarksListBackup= [];

const pugmarkListObject = (data) => {
  pugmarksList=[];

  if (data === undefined) {
    return;
  }
  
  data.forEach(element => {
    
    var RequestedDate = new Date(element.Requested_Date);
    let date=  RequestedDate.toISOString().replace('Z', '').replace('T', ' ');
    // let datewithouttime= RequestedDate.toISOString().split('T')[0]
    // let time= RequestedDate.toISOString().split('T')[1].replace('Z', '')
    
    pugmarksList.push({
      Pugmark_ID:element.Pugmark_ID,
      userName: element.User_Name,
      userEmail: element.Email_ID,
      mobileNo: element.Telephone_No,
      trainLoction: '',
      pugmarks:element.Pugmarks,
      requestBy: '',
      requestDate: date,
      statusChangedBy:element.Status_Changed_By, //ActivitiesandRemove
      activityName: '', 
      referredBy: element.AddedBy_User_Name,
      pugmarkReason: element.Pugmark_Reason_Name,
      status: element.User_Active_Flag["data"]["length"] > 0 ? "Approved":"Rejected", 
      ReqBy: '',
      statusComments: '',//"Family Discount applicable only to immediate family member. LL Confirmed this was extended family", 
      comments: "NA", 
      isActivate: 0,
      isRejected: 0,//element.Activity_Delete_Flag["data"]["length"] > 0 ? element.Activity_Active_Flag["data"][0] : undefined

    });
  });

}
const approvePMRequest = (event, data, btnCall)=>  {
  
  event.preventDefault();
  //the condition message before delete
  this.setState({ btn_call: btnCall, eventData: event, success_msg: true, modal_data: data, model_title: "Are you sure you want to Approve" });
}
const PugmarkRequest = ()=> {
  
   

  // Modal Popup
function removeBodyCss() {
    document.body.classList.add("no_padding");
  }
  function add_FAQ() {
   
    // this.setState((prevState) => ({
    //   modal_center: !prevState.modal_center,
    // }));
    this.removeBodyCss();
  }
  const FAQ_scroll=()=> {
    this.setState((prevState) => ({
      modal_scroll: !prevState.modal_scroll,
    }));
    this.removeBodyCss();
  }
 const  show=() =>{
    this.setState({ visible: true });
  }
  const hide=()=> {
    this.setState({ visible: false });
  }

  // Prime React Table

  // componentDidMount() {
  //   this.PugmarkServices.getProductsSmall().then(data => this.setState({ products: data }));
  // }

 const onColumnToggle=(event) =>{
      let selectedColumns = event.value;
      let orderedSelectedColumns = this.columns.filter(col => selectedColumns.some(sCol => sCol.field === col.field));
      this.setState({ selectedColumns: orderedSelectedColumns });
  }

  function userDetailTemplate(rowData) {
    return <div className="row">
      <div className="col-12">{rowData.userName}</div>
      <div className="col-12">{rowData.userEmail}</div>
      <div className="col-12">{rowData.mobileNo}</div>
      <div className="col-12">{rowData.trainLoction}</div>
      </div>;
  }
  function reasonTemplate(rowData) {
    return <div className="row">
      <div className="col-12">{rowData.pugmarkReason}</div>
      <div className="col-12">({rowData.activityName}/{rowData.referredBy})</div>
      </div>;
  }
  function statusTemplate(rowData) {
    return <div className="row">
      <div className="col-12"><b className="color-box p-1 rounded bg-danger text-white">{rowData.status}</b></div>
      <div className="col-12 mt-3">{rowData.statusComments}</div>
      </div>;
  }
  function  actionBodyTemplate(rowData) {
    return (
        <React.Fragment>
            <Button className="btn update-btn mb-2" 
            onClick={(event) => approvePMRequest(event, rowData, "Approve")}
            >Approve</Button>
            <Button 
              className="btn btn-danger"
              onClick={this.add_FAQ}
              data-toggle="modal"
              data-target=".bs-example-modal-center"
            >Reject</Button>
        </React.Fragment>
    );
  }
  function onConfirmClick(){
        
    switch(this.state.btn_call){
      
      
        case "Approve": {
            this.state.eventData.preventDefault();
            let data =this.state.modal_data == "" || undefined ? "": this.state.modal_data;
            this.setState({ success_msg: false });
            let objData = this.state.modal_data;
            objData.isActivate = 1;
            this.userttypeservice.approvePMRequestData(objData)
                .then(resp => {
                  pugmarksList= [];
                    this.getPugMarkRequestData();
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

            objData.isRejected = 1;
            this.userttypeservice.RemoveUT(this.state.modal_data)
                .then(resp => {
                    pugmarksList = [];
                    this.getPugMarkRequestData();
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
function CancelBtn() {
    this.setState({ success_msg: false });
}
function Information_MessageBtn() {
    this.setState({with_title:false });
}
 
 
function getPugMarkRequestData(){   
   
    let data={ProviderID:this.props.ProviderID}
    this.PugmarkServices.GetPugMarkRequestList(this.state.urlpugmarkrequestTableData,data)
    .then((response) => {
      pugmarksList = [];
      pugmarkListObject(response);
      this.state.rawTableData = JSON.parse(JSON.stringify(pugmarksList));
      this.setState({PugmarksList: this.state.rawTableData,PugmarksListBackup: response});
    
      pugmarksListBackup = response; // This is to get the record in the external world

      this.state.rawTableData = JSON.parse(JSON.stringify(this.state.rawTableData));     
       store.dispatch({type:'TABLE_DATA_PUGMARKREQUEST', payload:this.state.rawTableData});        
      this.setState({loader:false})
    })    

  }
 
    const header = (
      <div style={{ textAlign:'left' }}>
          <MultiSelect value={this.state.selectedColumns} options={this.columns} optionLabel="header" onChange={this.onColumnToggle} style={{width:'20em'}}/>
      </div>
  );

  const columnComponents = this.state.selectedColumns.map(col=> {
    if (col.field === 'userDetail') {
      return <Column key={col.field} field={col.field} body={this.userDetailTemplate} header={col.header} headerStyle={{ width: '250px' }} sortable />
    }

    if (col.field === 'reason') {
      return <Column key={col.field} field={col.field} body={this.reasonTemplate} header={col.header} headerStyle={{ width: '250px' }} sortable />
    }
    if (col.field === 'status') {
      return <Column key={col.field} field={col.field} body={this.statusTemplate} header={col.header} headerStyle={{ width: '250px' }} sortable />
    }
    else {
        return <Column key={col.field} field={col.field} header={col.header} headerStyle={{ width: '120px' }} sortable />;
    }
  });
    return (
      <React.Fragment>
             {this.state.loader ?
        <Loader />:
        null
      }
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="#"> Finance</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    PugMarks Statement
                  </li>
                </ol>
              </div>
            </Col>
          </Row>
          <Col xl={12} className="text-right mb-4">
                            <Link  className="btn update-btn font"  onClick={this.add_FAQ}>
                                Add PugMark
                        </Link>
                        </Col>
          <Row>
            <Col xl={12}>
              <Card className="mini-stat">
                <CardHeader className="bl-bg">
                  <Link to="#" className="text-white">
                    <b>PugMarks Statement</b>
                  </Link>
                  <span className="float-right">

                  </span>
                </CardHeader>
                <CardBody>
                  <DataTable 
                    value={this.state.PugmarksList} 
                    header={header} 
                    scrollable scrollHeight="200px" style={{ width: '100%' }} 
                    className="p-datatable-gridlines"
                    paginator
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10,20,50]}
                  >
                    {columnComponents}
                    <Column header="Action" body={this.actionBodyTemplate} headerStyle={{ width: '150px' }} ></Column>
                  </DataTable>
                </CardBody>
              </Card>
            </Col>
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
            <Modal isOpen={this.state.modal_center} toggle={this.add_FAQ}>
                    <div className="modal-header">
                     <h5 className="modal-title">Add FAQ</h5>
                <button
                  type="button"
                  onClick={() => this.setState({ modal_center: false })}
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                test
              </div>
            </Modal>
          </Row>
        </div>
      </React.Fragment>
    )
  
}
const rootElement = document.getElementById("root");
const mapStatetoProps = state => {
  
  return {  
  
    PMRequesttableData :state.PugMarkRequestResult !=undefined ? state.PugMarkRequestResult.tableData :"",
    ProviderID: state.currentPageName.roleAndProvider.selectedRole.Service_Provider_ID, 
  };
};
const dispatchToProps = dispatch => {
  return {
      updateTableData: (type, payload) => {
          dispatch({ type: type, payload: payload })
      }
  }
}
 export default withRouter(connect(mapStatetoProps, dispatchToProps)(PugmarkRequest));
// // export default PugmarkRequest;