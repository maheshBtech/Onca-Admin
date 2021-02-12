import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Row, Col, Label, Input, } from "reactstrap";
import { Card, CardBody, CardHeader, Button } from "reactstrap";
import { DataTable } from 'primereact/datatable';
import { MultiSelect } from 'primereact/multiselect';
import { Column } from 'primereact/column';
import { PugmarkServices } from '../PugmarkRequest/SubComponent/PugmarkServices';
import {OrderRazorpay,baseUrl,DropdownDataPMSegment} from "../../../AppConfig"
import store from "../../../store";
import { connect } from "react-redux";


var pugmarksList = [];
var filterpugmarksList = [];
var pugmarksListBackup = [];

const pugmarkListObject = (data) => {
    pugmarksList = [];

    if (data === undefined) {
        return;
    }

    data.forEach(element => {
        var RequestedDate = new Date(element.Requested_Date);

        let datewithouttime = RequestedDate.toISOString().split('T')[0]
        let time = RequestedDate.toISOString().split('T')[1]

        pugmarksList.push({
            Pugmark_ID: element.Pugmark_ID,
            userName: element.User_Name,
            userEmail: element.Email_ID,
            mobileNo: element.Telephone_No,
            trainLoction: '',
            pugmarks: element.Pugmarks,
            requestBy: '',
            requestDate: datewithouttime + " " + time,
            statusChangedBy: element.Status_Changed_By, //ActivitiesandRemove
            activityName: "BRUR for JJS",
            referredBy: '',//element.Activity_Delete_Flag,
            pugmarkReason: element.Reason_Text,
            status: "Rejected",
            ReqBy: '',
            statusComments: "Family Discount applicable only to immediate family member. LL Confirmed this was extended family",
            comments: "NA",
            isActivate: 0,
            isRejected: 0,//element.Activity_Delete_Flag["data"]["length"] > 0 ? element.Activity_Active_Flag["data"][0] : undefined

        });
    });

}
const BalanceData = [
    {
        id: 1,
        UserName: 'Arivoli',
        EmaiID: 'arivoli@gmail.com',
        PhNumber: 9945336332,
        Credit: 0,
        Debit: 200,
        Balance: 0,
        DateTime: '2020-09-08 06:51:03',
        AddedBy: 'ONCA Orders',
        ReferralName: "Family Discount",
        ReferralActiviti: "DilSe2 2020",
        ReferredBy: "Navay Shankar"
    }
];
const headerStyle = {
    headCells: {
        style: {
            backgroundColor: "#EDECEC",
        },
    },
};
// const columns = [
//     {
//         name: 'User Details',
//         selector: 'UserDetails',
//         sortable: true,
//         wrap: true,
//         cell: row => <div><p className={'m-0'}>{row.UserName}</p><p className={'m-0'}>{row.EmaiID}</p><p className={'m-0'}>{row.PhNumber}</p></div>,
//     },
//     {
//         name: 'Credit',
//         selector: 'Credit',
//         sortable: true
//     },
//     {
//         name: 'Debit',
//         selector: 'Debit',
//         sortable: true
//     },
//     {
//         name: 'Balance',
//         selector: 'Balance',
//         sortable: true
//     },
//     {
//         name: 'Date & Time',
//         selector: 'DateTime',
//         sortable: true,
//         wrap: true
//     },
//     {
//         name: 'Added By',
//         selector: 'AddedBy',
//         sortable: true,
//         wrap: true,
//     },
//     {
//         name: 'Reason',
//         selector: 'Reason',
//         sortable: true,
//         wrap: true,
//         cell: (row) => <div><p className={'m-0'}>{row.ReferralName}</p><p className={'m-0'}>({row.ReferralActiviti} / </p><p className={'m-0'}>{row.ReferredBy})</p></div>
//     }
// ];
var Pugmarkservices = new PugmarkServices();
class PugMarkList extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            { field: 'userDetail', header: 'User Details' },
            { field: 'credit', header: 'Credit' },
            { field: 'debit', header: 'Debit' },
            { field: 'balance', header: 'Balance' },
            { field: 'datetime', header: 'Date & Time' },
            { field: 'addedby', header: 'Added By' },
            { field: 'reason', header: 'Reason' }
        ];
        this.state = {
            selectedColumns: this.columns,
            customers: [],
            modal_center: false,
            modal_scroll: false,
            PugmarksList: [],
            PugmarksListBackup: [],
            // urlpugmarksegmentTableData: getpugmarksegmentlistURL,
            loader: true,
            razorpayorderresponse:""
        };
        // this.PugmarkServices = new PugmarkServices();
        this.onColumnToggle = this.onColumnToggle.bind(this);
        this.userDetailTemplate = this.userDetailTemplate.bind(this);
        this.reasonTemplate = this.reasonTemplate.bind(this);

           this.getPugMarkSegmentDropDownData()
        // this.getPugMarkSegmentData();
    }
    inMemData = [
        {
            "userName": 'Nisita Saxena Sehgal',
            "userEmail": "nishita.saxena26@gmail.com",
            "mobileNo": 9741353089,
            "trainLoction": "JAL",
            "pugmarks": 300,
            "requestBy": "Laxman",
            "requestDate": "31-08-2020 13:47:23",
            "statusChangedBy": "Navya Shankar",
            "pugmarkReason": "Buddy Referral",
            "activityName": "BRUR for JJS",
            "referredBy": "Deepak Kumar",
            "status": "Rejected",
            "statusComments": "Family Discount applicable only to immediate family member. LL Confirmed this was extended family",
            "comments": "NA",
        },
    ]
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
    getPugMarkSegmentData() {

            Pugmarkservices.GetPugMarkSegmentList(this.state.urlpugmarksegmentTableData)
                .then((response) => {
                    pugmarksList = [];
                    pugmarkListObject(response);
                    this.state.rawTableData = JSON.parse(JSON.stringify(pugmarksList));
                    this.setState({ PugmarksList: this.state.rawTableData, PugmarksListBackup: response });

                    pugmarksListBackup = response; // This is to get the record in the external world

                    this.state.rawTableData = JSON.parse(JSON.stringify(this.state.rawTableData));
                    store.dispatch({ type: 'TABLE_DATA_PUGMARKSEGMENT', payload: this.state.rawTableData });
                    this.setState({ loader: false })
                })
        
    }
    
    getPugMarkSegmentDropDownData() {
        
        let data={ProviderID:this.props.ProviderID}

        Pugmarkservices.GetPMDropdownList(DropdownDataPMSegment,data)
            .then((response) => {
               
                this.state.rawTableData = JSON.parse(JSON.stringify(response.data));
              //Email_ID Telephone_No  User_ID User_Skey_ID
                 store.dispatch({ type: 'USER_DATA_PUGMARKSTATEMENT', payload: this.state.rawTableData[0] });
                 store.dispatch({ type: 'PUGMARKREASONS', payload: this.state.rawTableData[1] });
                 store.dispatch({ type: 'ACTIVITIES_PUGMARKSTATEMENT', payload: this.state.rawTableData[2] });
                 store.dispatch({ type: 'REFERALDATA', payload: this.state.rawTableData[3] });
                // this.setState({ loader: false })
            })
    
}
    render() {
        const header = (
            <div style={{ textAlign: 'left' }}>
                <MultiSelect value={this.state.selectedColumns} options={this.columns} optionLabel="header" onChange={this.onColumnToggle} style={{ width: '20em' }} />
            </div>
        );

        const columnComponents = this.state.selectedColumns.map(col => {
            if (col.field === 'userDetail') {
                return <Column key={col.field} field={col.field} body={this.userDetailTemplate} header={col.header} headerStyle={{ width: '250px' }} sortable />
            }
             if (col.field === 'reason') {
                return <Column key={col.field} field={col.field} body={this.reasonTemplate} header={col.header} headerStyle={{ width: '250px' }} sortable />
              }
            else {
                return <Column key={col.field} field={col.field} header={col.header} headerStyle={{ width: '120px' }} sortable />;
            }
        });
// const loadScript=(src)=>{

//     return new Promise(resolve => {
//     const script=document.createElement('script')
//     script.src=src



//     script.onload =()=>{
//         resolve(true)
//     }
//     script.onerror =()=>{
//         resolve(false)
//     }
//     document.body.appendChild(script)


// })
// }

// async  function displayRazorpay(){
//     
//     const res =await loadScript('https://checkout.razorpay.com/v1/checkout.js')

//     if(!res){
//         alert('Razorpay SDK failed to load. Are you Online')
//     return
//  }

//  var data={
//     amount:499,
//     currency:"INR",

//  }

// // const data1 =Pugmarkservices.Razorpaypayment(OrderRazorpay,data)
// // .then((response) => {
// //     response.JSON();
   
// //     // this.state.razorpayorderresponse = JSON.parse(JSON.stringify(response.data));
// // })
// let Authtoken = sessionStorage.getItem("token");
// const abc= await fetch ('http://localhost:3001/pugmark/pugmarkrequest/data/Razorpay', {method :'POST', headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': baseUrl,
// 'Vary': 'Origin', 'Access-Control-Request-Method' : 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,Authorization','Authorization':'Bearer ' + Authtoken}}).then((t)=>
// t.json())

// // console.log(data1);
//  //rzp_test_bW1zTsp1Pxih92
//  //3qPCikbfYouPLdPhP1D6EANK
//     const options = {
//         "key": "rzp_test_bW1zTsp1Pxih92", // Enter the Key ID generated from the Dashboard
//         "amount": abc.amount,
//         "currency": abc.currency,
//         "name": "Acme Corp",
//         "description": "Test Transaction",
//        "image": "https://example.com/your_logo",
//         "order_id": abc.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
//         "handler": function (response){
//             alert(response.razorpay_payment_id);
//             alert(response.razorpay_order_id);
//             alert(response.razorpay_signature)
//         },
//         "prefill": {
//             "name": "Gaurav Kumar",
//             "email": "gaurav.kumar@example.com",
//             "contact": "9999999999"
//         },
        
//     };
//     const razorObject    = new window.Razorpay(options);
//     razorObject.open();
// }
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <Row className="align-items-center">
                        <Col sm={6}>
                            <div className="page-title-box">
                                <ol className="breadcrumb mb-0">
                                    <li className="breadcrumb-item active">
                                        PugMark Statement
                                </li>
                                </ol>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={12} className="text-right mb-4">
                            {/* <Link  className="btn update-btn font" onClick={displayRazorpay}>
                               pay Money
                        </Link> */}
                        </Col>
                        <Col xl={12} className="text-right mb-4">
                            <Link to="/add-pugmark" className="btn update-btn font">
                                Add PugMark
                        </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={12}>
                            <Card className="mini-stat">
                                <CardHeader className="bl-bg">
                                    <Link to="#" className="text-white">
                                        <b>PugMark Statement</b>
                                    </Link>
                                    <span className="float-right">
                                    </span>
                                </CardHeader>
                                <CardBody>
                                    <DataTable
                                        value={this.inMemData}
                                        header={header}
                                        scrollable scrollHeight="200px" style={{ width: '100%' }}
                                        className="p-datatable-gridlines"
                                        paginator
                                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10, 20, 50]}
                                    >
                                        {columnComponents}
                                       </DataTable>

                                    {/* <DataTable
                                className="data-table"
                                columns={columns}
                                data={BalanceData}
                                noHeader={true}
                                customStyles={headerStyle}
                                fixedHeader
                                fixedHeaderScrollHeight="300px"
                                pagination
                            /> */}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}
const mapStatetoProps = state => {
  
    return {  
    
    //   PMRequesttableData : state.PugMarkRequestResult.tableData ,
      ProviderID: state.currentPageName.roleAndProvider.selectedRole.Service_Provider_ID, 
      UserSkeyID: state.userProfileData != undefined ? state.userProfileData.ProfileData[0][0].User_Skey_ID :null,
      
    };
  };
  const dispatchToProps = dispatch => {
    return {
        updateTableData: (type, payload) => {
            dispatch({ type: type, payload: payload })
        }
    }
  }
  export default withRouter(connect(mapStatetoProps, dispatchToProps)(PugMarkList));
// export default withRouter(PugMarkList);