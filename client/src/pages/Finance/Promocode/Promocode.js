import React, { Component } from "react";
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Button
} from "reactstrap";
import { withRouter,Link } from "react-router-dom";
import DataTable from 'react-data-table-component';
import PromocodeService from './PromocodeService'
import {getPromocodeDropdownDataURL,GetPromocodeListURL,removePromocodeURL,isActivateSuspendPromocodeListURL} from '../../../AppConfig';
import Loader from "../../../components/Loader";
import store from "../../../store";
import { connect } from "react-redux";
import Confirmation_Message from "./SubComponent/Confirmation_Message";
import Information_Message from "./SubComponent/Information_Message"

const PromocodeData = [
  {
    Promocode: "WTS2020DELVKJ",
    Desc: "Onboarding fee waiver for new location at VASANT KUNJ - New Delhi",
    Validity: "13/10/2020 - 30/01/2021",
    Value: "500",
    Status: "Active",
  },
  {
    Promocode: "BEL2020",
    Desc: "Onboarding fee waiver for new location at VASANT KUNJ - New Delhi",
    Validity: "13/10/2020 - 30/01/2021",
    Value: "800",
    Status: "Active",
  },
  {
    Promocode: "WTS2020BLRSJR",
    Desc: "Onboarding fee waiver for new location at VASANT KUNJ - New Delhi",
    Validity: "13/10/2020 - 30/01/2021",
    Value: "800",
    Status: "Active",
  },
  {
    Promocode: "WTS2020SALSLM",
    Desc: "Onboarding fee waiver for new location at VASANT KUNJ - New Delhi",
    Validity: "13/10/2020 - 30/01/2021",
    Value: "1000",
    Status: "Active",
  },
];

var promocodesList = [];
var userID = "";
var promocodesListBackup= [];
 const customProps = { id: 'my-table-id' };

const promocodeListObject = (data) => {
    promocodesList=[];

  if (data === undefined) {
    return;
  }
  
  data.forEach(element => {
    var date = new Date((element.Validity_Start_Date));
    var dd = date.getDate(); 
    var mm =  date.getMonth() + 1; 
    var yyyy = date.getFullYear(); 
    if (dd < 10) { 
        dd = '0' + dd; 
    } 
    if (mm < 10) { 
        mm = '0' + mm; 
    } 
    var todate = new Date(element.Validity_End_Date);
    var dd1 = todate.getDate(); 
    var mm1 =  todate.getMonth() + 1; 
    var yyyy1 = todate.getFullYear(); 
    if (dd1 < 10) { 
        dd1 = '0' + dd1; 
    } 
    if (mm1 < 10) { 
        mm1 = '0' + mm1; 
    } 
    var finalStartDate = dd + '/' + mm + '/' + yyyy; 
    var finalEndDate = dd1 + '/' + mm1 + '/' + yyyy1; 

    var status="";
    if (element.Active_Flag["data"][0] > 0 ){
        status="Active";
    }
    else{
        status="Inactive";
    }
    let  selectedUserSkeyID=userID
    promocodesList.push({
      Promocode_ID: element.Promocode_ID,
      Promocode:element.Promocode,
      Description: element.Description,
      PromocodeValue:element.Promocode_Value,
      Validity:finalStartDate +"-"+ finalEndDate,
      Service_Provider_ID: element.Service_Provider_ID,
      isActivate: element.Active_Flag["data"]["length"] > 0 ? element.Active_Flag["data"][0] : undefined,
      Status:status,
      ActivityIDs:element.Activity_IDs,
      TrainingLocIds:element.Training_Location_IDs,
      isPromocodeDeleted:0,
      UserSkeyID:selectedUserSkeyID
     });
  });

}

const headerStyle = {
  rows: {
    style: {
      minHeight: "110px", // override the row height
    },
  },
  headCells: {
    style: {
      backgroundColor: "#EDECEC",
    },
  },
};

    
class Promocode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PromocodesList:[],
            PromocodesListBackup : [],
            loader:true,
            success_msg: false,
            modal_data: "",
            eventData: null,
            model_title: "",
            btn_call:"",
            promocodedropdownData:"",
            PromocodesList:"",

        };
        this.promocodeService = new PromocodeService();
        this.getPromocodeData();
        this.getDropdownList();
        this.props.updateTableData('CHANGE_CURRENT_PAGE_NAME', 'Promocode')
        
        }
        
         columns = [
            {
                name:'Promocode',
                selector: 'Promocode',
                sortable: true,
                wrap: true,
            },
            {
                name: 'Description',
                selector: 'Description',
                sortable: true,
                wrap: true,
            },
            {
              name: 'Validity',
              selector: 'Validity',
              sortable: true,
              wrap: true,
          },
          {
            name: 'Value',
            selector: 'PromocodeValue',
            sortable: true,
            wrap: true,
        },
        {
          name: 'Status',
          selector: 'Status',
          sortable: true,
          wrap: true,
        },
            {
                name: 'Action',
                cell: (row) =>
                  <div className="col-12">
                   <Link to="/finance-addpromocode"><Button className="btn update-btn" variant="contained" type="button" onClick={() => this.viewandupdatePromocode(row)} data-toggle="modal" data-target=".bs-example-modal-center">Update</Button></Link> 
                    {this.activateOrSuspend(row)}
                    <Button className="btn remove-btn" variant="contained" type="button" onClick={(event)=>this.RemovePromocode(event,row,"Rmv")}>Remove</Button>
                  </div>
                ,
                button: true,
            }
        
        ];
        
        activateOrSuspend =(row)=>{
          
            var selectedButton =""
            {row.isActivate ?
              selectedButton = <Button className="btn btn-warning" variant="contained" onClick={(event) => this.ActivateSuspendPromocode(event,row,"Sus")}>Suspend</Button>
              :
              selectedButton = <Button className="btn btn-success" variant="contained" onClick={(event) => this.ActivateSuspendPromocode(event,row,"Act")}>Activate</Button>
            }
            return selectedButton
            }
            
            viewandupdatePromocode = (row) => {
                 ;
                let PromocodeID = row.Promocode_ID;
            
                let data = { PromocodeID: PromocodeID }
              
                let selectedData=[],promocodelist=[]
            
                 promocodelist=this.props.promocodeviewData 
                 selectedData = promocodelist.filter(promocodedata => promocodedata.Promocode_ID === PromocodeID)[0]
                 store.dispatch({ type: "VIEW_PROMOCODE_DATA", payload: selectedData})
              
            }
            
    ActivateSuspendPromocode = (event,data,btnCall) => {
        event.preventDefault();
        let modalTitle = "";
        if(btnCall == "Sus") {
            modalTitle = "Are you sure you want to Suspend Promocode";
        }
        else if(btnCall == "Act"){
            modalTitle = "Are you sure you want to Activate Promocode";
        }
         //the condition message before delete
        this.setState({ btn_call:btnCall,eventData: event,  success_msg: true,modal_data:data, model_title: modalTitle});
    }


    RemovePromocode = (event,data,btnCall) => {
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
                this.promocodeService.ActivateSuspendPromocode(objData)
                    .then(resp => {
                        promocodesList= [];
                        this.updatePromocodeData();
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
                this.promocodeService.ActivateSuspendPromocode(objData)
                    .then(resp => {
                        promocodesList= [];
                        this.updatePromocodeData();
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

                objData.isPromocodeDeleted = 1;
                this.promocodeService.RemovePromocode(this.state.modal_data)
                    .then(resp => {
                        promocodesList = [];
                        this.updatePromocodeData();
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


        getDropdownList() {
     ;
            if (this.props.activities != "") {
              this.state.activitydropdownData = this.props.activities
              this.state.locationdropdownData = this.props.traininglocations        
            }
            else {
              let data = {
                ProviderID: this.props.ProviderID
              }
        
              this.promocodeService.getPromocodeDropdownDataList(getPromocodeDropdownDataURL, data)
                .then((response) => {
                  this.state.activitydropdownData = JSON.parse(JSON.stringify(response.data[0]));
                  this.state.locationdropdownData = JSON.parse(JSON.stringify(response.data[1]));                 
                  store.dispatch({ type: 'ACTIVITY_DATA_PROMOCODE', payload: this.state.activitydropdownData });
                  store.dispatch({ type: 'TRAINING_DATA_PROMOCODE', payload: this.state.locationdropdownData });
        
                })
            }
          }
        getPromocodeData(){
         ;   
        
            let  selectedProviderID=this.props.ProviderID
             userID= this.props.UserSkeyID
            let  data={ProviderID:selectedProviderID}
            this.promocodeService.GetPromocodeList(GetPromocodeListURL,data)
        .then((response) => {
            console.log(response)
          this.state.responsedata = JSON.parse(JSON.stringify(response));
          store.dispatch({type:'TABLE_ALL_DATA_PROMOCODE', payload:this.state.responsedata});   
          promocodesList = [];
          promocodeListObject(response);
          this.state.rawTableData = JSON.parse(JSON.stringify(promocodesList));
          this.setState({PromocodesList: this.state.rawTableData,PromocodesListBackup: response});
          promocodesListBackup = response; // This is to get the record in the external world
    
         // this.state.rawTableData = JSON.parse(JSON.stringify(this.state.rawTableData));     
          store.dispatch({type:'TABLE_DATA_PROMOCODE', payload:this.state.rawTableData});        
          this.setState({loader:false})
        })    
    //  }
          }

      updatePromocodeData(){       
               
        let  selectedProviderID=this.props.ProviderID
            
        let  data={ProviderID:selectedProviderID}
        this.promocodeService.GetPromocodeList(GetPromocodeListURL,data)
       .then((response) => {
        console.log(response)
      this.state.responsedata = JSON.parse(JSON.stringify(response));
      store.dispatch({type:'TABLE_ALL_DATA_PROMOCODE', payload:this.state.responsedata});   
      promocodesList = [];
      promocodeListObject(response);
      this.state.rawTableData = JSON.parse(JSON.stringify(promocodesList));
      this.setState({PromocodesList: this.state.rawTableData,PromocodesListBackup: response});
      promocodesListBackup = response; // This is to get the record in the external world

     // this.state.rawTableData = JSON.parse(JSON.stringify(this.state.rawTableData));     
      store.dispatch({type:'TABLE_DATA_PROMOCODE', payload:this.state.rawTableData});        
      this.setState({loader:false})
    })    
        
          }

    render() {
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
                                        <Link to="/#">Finance</Link>
                                    </li>
                                    <li className="breadcrumb-item active">Promocode</li>
                                </ol>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                      <Col xl={12} className="text-right mb-2">
                          <Link to="/finance-addpromocode" className="btn update-btn">
                              Add Promocode
                          </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <Card className="mini-stat">
                                <CardHeader className="bl-bg text-white">
                                    <b>Promocode List</b>
                                    <span className="float-right">
                                    </span>
                                </CardHeader>
                                <CardBody>
                                    <DataTable
                                        className="data-table"
                                        columns={this.columns}
                                        data={this.state.PromocodesList}
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
                </div>
            </React.Fragment>
        );
    }
}
const mapStatetoProps = state => {
  
    return {
  
      ProviderID: state.currentPageName.roleAndProvider.selectedRole.Service_Provider_ID,
      UserSkeyID: state.userProfileData != undefined ? state.userProfileData.ProfileData[0][0].User_Skey_ID : null,
      promocodeTableData: state.Promocode != undefined ? state.Promocode.tableData : "",
      promocodeviewData: state.Promocode != undefined ? state.Promocode.allcolumndata : "",
      activities: state.Promocode != undefined ? state.Promocode.activities : "",
      traininglocations: state.Promocode != undefined ? state.Promocode.traininglocations : "",    
     
     
    };
    
  };
  
const dispatchToProps = dispatch => {
    return {
      updateTableData: (type, payload) => {
        dispatch({ type: type, payload: payload })
      }
    }
  }
  
  
  export default withRouter(connect(mapStatetoProps, dispatchToProps)(Promocode));
  
