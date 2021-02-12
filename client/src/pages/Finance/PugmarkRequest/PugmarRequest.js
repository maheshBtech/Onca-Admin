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
  Label
} from "reactstrap";
import { connect } from "react-redux";
import { withRouter, Link, } from 'react-router-dom';
import { Modal } from "reactstrap";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { PugmarkServices } from './SubComponent/PugmarkServices';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import {getpugmarkrequestlistURL,ApproveRejectPMReq} from "../../../AppConfig"
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
      status: element.Approved_Flag !== null ? element.Approved_Flag["data"][0] > 0 ? "Approved":"Rejected": "Rejected", 
      ReqBy: '',
      statusComments: element.Reason_Text,//"Family Discount applicable only to immediate family member. LL Confirmed this was extended family", 
      comments: "NA", 
      isActivate: 0,
      isRejected: 0,//element.Activity_Delete_Flag["data"]["length"] > 0 ? element.Activity_Active_Flag["data"][0] : undefined

    });
  });

}
const PMRequestact=(event,data,action)=>{
  
  if(action==='Approve')
  {
    store.dispatch({type:'ACTION_TYPE', payload:"Approve"})
    store.dispatch({type:'PMEVENT', payload:event})
    store.dispatch({type:'PMREQUESTDATA',payload:data})
  }else if(action === 'Reject')
  {
    store.dispatch({type:'ACTION_TYPE', payload:"Reject"})
    store.dispatch({type:'PMEVENT', payload:event})
    store.dispatch({type:'PMREQUESTDATA',payload:data})
  }


}
class PugmarkRequest extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      { field: 'userDetail', header: 'User Details' },
      { field: 'pugmarks', header: 'Pugmarks' },
      { field: 'requestBy', header: 'Request By' },
      { field: 'requestDate', header: 'Request Date' },
      { field: 'statusChangedBy', header: 'Status Changed By' },
      { field: 'reason', header: 'Reason' },
      { field: 'status', header: 'Status' },
      { field: 'comments', header: 'Comments' },
    ];
    this.state = {
      selectedColumns: this.columns,
      customers: [],
      modal_center: false,
      modal_scroll: false,
      PugmarksList: [],
      PugmarksListBackup : [],
      urlpugmarkrequestTableData: getpugmarkrequestlistURL,
      loader : true,
      success_msg: false,
            modal_data: "",
            eventData: null,
            model_title: "",
            btn_call: "",
            reason:"",
            Err: "",
    };
    this.PugmarkServices = new PugmarkServices();
    this.onColumnToggle = this.onColumnToggle.bind(this);
    this.userDetailTemplate = this.userDetailTemplate.bind(this);
    this.reasonTemplate = this.reasonTemplate.bind(this);
    this.statusTemplate = this.statusTemplate.bind(this);
    this.add_FAQ = this.add_FAQ.bind(this);
    this.FAQ_scroll = this.FAQ_scroll.bind(this);
    this.approvePMRequest=this.approvePMRequest.bind(this);
    this.submitReason=this.submitReason.bind(this);
    this.getPugMarkRequestData();  

    
  }

  // Modal Popup
  removeBodyCss() {
    document.body.classList.add("no_padding");
  }
  add_FAQ() {
   
    this.setState((prevState) => ({
      modal_center: !prevState.modal_center,
    }));
    this.removeBodyCss();
  }
  FAQ_scroll() {
    this.setState((prevState) => ({
      modal_scroll: !prevState.modal_scroll,
    }));
    this.removeBodyCss();
  }
  show() {
    this.setState({ visible: true });
  }
  hide() {
    this.setState({ visible: false });
  }

  componentDidUpdate(){
    
if (this.props.action ==='Approve'){
  store.dispatch({type:'ACTION_TYPE', payload:"DND"})
  this.approvePMRequest(this.props.event,this.props.selectedData,'Approve');
 
}else if(this.props.action === 'Reject')
{ store.dispatch({type:'ACTION_TYPE', payload:"DND"})
  this.add_FAQ();

}
  }

  // Prime React Table

  onColumnToggle(event) {
      let selectedColumns = event.value;
      let orderedSelectedColumns = this.columns.filter(col => selectedColumns.some(sCol => sCol.field === col.field));
      this.setState({ selectedColumns: orderedSelectedColumns });
  }

  userDetailTemplate(rowData) {
    return <div className="row">
      <div className="col-12">{rowData.userName}</div>
      <div className="col-12">{rowData.userEmail}</div>
      <div className="col-12">{rowData.mobileNo}</div>
      <div className="col-12">{rowData.trainLoction}</div>
      </div>;
  }
  reasonTemplate(rowData) {
    return <div className="row">
      <div className="col-12">{rowData.pugmarkReason}</div>
      <div className="col-12">({rowData.activityName}/{rowData.referredBy})</div>
      </div>;
  }
  statusTemplate(rowData) {
    if(rowData.status === 'Approved'){
      return <div className="row">      
      <div className="col-12"><b className="color-box p-1 rounded bg-success text-white">{rowData.status}</b></div>
     
      </div>;
    }
    else{
      return <div className="row">
      
      <div className="col-12"><b className="color-box p-1 rounded bg-danger text-white">{rowData.status}</b></div>
      <div className="col-12 mt-3">{rowData.statusComments}</div>
      </div>;
    }
    
  }
  actionBodyTemplate(rowData) {
    if(rowData.status === 'Approved'){
    return (
        <React.Fragment>
            
        </React.Fragment>
        
    );
    }
    else{
      return (
        <React.Fragment>
            <Button className="btn update-btn mb-2" 
            onClick={(event) => PMRequestact(event, rowData,'Approve')}
            >Approve</Button>
            <Button 
              className="btn btn-danger"
              onClick={(event) => PMRequestact(event, rowData,'Reject')}
              data-toggle="modal"
              data-target=".bs-example-modal-center"
            >Reject</Button>
        </React.Fragment>
        
    );
    }
  }
  approvePMRequest = ( event,data, btnCall)=>  {
    
     event.preventDefault();
    //the condition message before delete
    this.setState({ btn_call: btnCall,eventData:event,  success_msg: true, modal_data: data, model_title: "Are you sure you want to Approve" });
  }
  rejectPMRequest = ( event,data, btnCall)=>  {
    
     event.preventDefault();
    //the condition message before delete
    this.setState({ btn_call: btnCall,eventData:event,  success_msg: true, modal_data: data, model_title: "Are you sure you want to Reject",modal_center:false });
  }

  onConfirmClick(){
        
    switch(this.state.btn_call){
      
      
        case "Approve": {
            this.state.eventData.preventDefault();
           
            this.setState({ success_msg: false });
            let objData = this.state.modal_data;

            let userID=this.props.UserSkeyID
            let Data ={
              Pugmark_ID:objData.Pugmark_ID,
              Approve_Flag:1,
              Reason:"",
              USerID:userID
            }
            // objData.isActivate = 1;
            this.PugmarkServices.approvePMRequestData(ApproveRejectPMReq,Data)
                .then(resp => {
                  pugmarksList= [];
                    this.getPugMarkRequestData();
                    
                    this.setState({ with_title: true,model_title: "Thanks, transaction is completed successfully!!!" });
                    console.log(resp);
                });
            break;
        }
        case "Reject": {

            this.state.eventData.preventDefault();
           
            this.setState({ success_msg: false });
             let objData = this.state.modal_data;
            let Data ={
              Pugmark_ID:objData.Pugmark_ID,
              Approve_Flag:0,
              Reason:this.state.reason,
              USerID:this.props.UserSkeyID
            }
            // objData.isRejected = 1;
            this.PugmarkServices.approvePMRequestData(ApproveRejectPMReq,Data)
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
    this.setState({ btn_call:"",  eventData: null,  success_msg: false,modal_data:null, model_title: "" ,reason:""});
    
}
CancelBtn() {
    this.setState({ success_msg: false ,reason:""});
}
Information_MessageBtn() {
    this.setState({with_title:false ,reason:""});
}
textareachange(event){
  
  this.setState({ reason: event.target.value })
}
 
 
  getPugMarkRequestData(){   
   
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

  submitReason= (e, index) => {
    
    e.preventDefault();
    let reason = this.state.reason;
    const isValid  = this.validate(reason)

    if(isValid){
      this.rejectPMRequest(this.props.event,this.props.selectedData,'Reject');
    }
  }

  validate = (reason) => {

    let reasontextError = "";   
    let Err = "";
  
    
    if (reason == "" || reason == null || reason == undefined  )
    {         
      reasontextError = "Reason not assigned.";
        Err = reasontextError;
    }
    if (Err) {
        if (Err !== "") {
            Err = Err;
        } else {
            Err = Err;
        }
        this.setState({ Err: Err });
      
        return false;
    }
    else {

        this.setState({ Err: "" });
        return true;
    }

}
  render() {
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
          {/* <Col xl={12} className="text-right mb-4">
                            <Link  className="btn update-btn font"  onClick={this.add_FAQ}>
                                Add PugMark
                        </Link>
                        </Col> */}
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
                  onClick={() => this.setState({ modal_center: false ,reason:""})}
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-sm-12">
                    {this.state.Err !== undefined && this.state.Err ?
                      (<div class="alert alert-danger" role="alert" >
                        {this.state.Err}
                      
                      </div>
                      ) : null}

                  </div>
                </div>
              <form className="contact-form-style"> 
                <div className="form-group">
                  <Label for="EmailID">Reason </Label>  
                    <Input
                      type="textarea"
                      id="textarea"
                      onChange={(event)=>this.textareachange(event)}
                      maxLength="225"
                      rows="3"
                      placeholder="This textarea has a limit of 225 chars."
                    />
                  
                 </div>
                  <div className="form-group row">
                    <button className="btn  btn-block update-btn font" onClick={(e)=>this.submitReason(e)}>
                      Reject
                    </button>
                  </div>
                </form>
              </div>
            </Modal>
          </Row>
        </div>
      </React.Fragment>
    )
  }
}
const rootElement = document.getElementById("root");
const mapStatetoProps = state => {
  
  return {  
  
    PMRequesttableData : state.PugMarkRequestResult.tableData ,
    ProviderID: state.currentPageName.roleAndProvider.selectedRole.Service_Provider_ID, 
    UserSkeyID: state.userProfileData != undefined ? state.userProfileData.ProfileData[0][0].User_Skey_ID :null,
    action: state.PugMarkRequestResult.action, 
    selectedData: state.PugMarkRequestResult.selecteddata, 
    event:state.PugMarkRequestResult.event


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
// export default PugmarkRequest;