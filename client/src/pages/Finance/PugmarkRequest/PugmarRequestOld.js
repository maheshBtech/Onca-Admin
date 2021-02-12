import React, { Component } from "react";
import { Row, Col,Input } from "reactstrap";
import { connect } from "react-redux";
import { withRouter, Link, } from 'react-router-dom';
import PugMarkRequestService from "../PugmarkRequest/PugmarkRequestService"
import { Modal } from "reactstrap";
import {getpugmarkrequestlistURL} from "../../../AppConfig"
import Loader from "../../../components/Loader";
import store from "../../../store";
import Cookies from 'universal-cookie';
import { Card, CardBody, CardHeader, Button } from "reactstrap";
import DataTable from 'react-data-table-component';

const cookies = new Cookies();

var pugmarksList = [];
var filterpugmarksList = [];
var pugmarksListBackup= [];
 const customProps = { id: 'my-table-id' };

const pugmarkListObject = (data) => {
  pugmarksList=[];

  if (data === undefined) {
    return;
  }
  
  data.forEach(element => {
    var RequestedDate = new Date(element.Requested_Date);
   
    let datewithouttime= RequestedDate.toISOString().split('T')[0]
    let time= RequestedDate.toISOString().split('T')[1]
    
    pugmarksList.push({
      Pugmark_ID:element.Pugmark_ID,
      User_Name: element.User_Name,
      Email_ID: element.Email_ID,
      Telephone_No: element.Telephone_No,
      Training_Loc: '',
      Pugmarks:element.Pugmarks,
      Requested_By: '',
      Requested_Date: datewithouttime +" "+time,
      Status_Changed_By:element.Status_Changed_By, //ActivitiesandRemove
      ReferralName: '',//element.Activity_Delete_Flag,
      Reason_Text: element.Reason_Text,
      ReqBy: '',
      isActivate: 0,
      isRejected: 0,//element.Activity_Delete_Flag["data"]["length"] > 0 ? element.Activity_Active_Flag["data"][0] : undefined
    });
  });

}

const roleData = [
  {
    id: 1,
    UserName: 'Srinidhi',
    EmaiID: 'Vnsrinidhi@yahoo.com',
    PhNumber: 9008707172,
    StatusUpdBy: 'Navya Shankar',
    TrainingLoc: 'BLR',
    Pugmark: 0,
    ReqDateandTime: '2020-09-21 13:47:23',
    AddedBy: "ONCA Orders",
    ReferralName: "Buddy Referral",
    ReferralActiviti: "BRUR FOR JJS",
    ReqBy: "Deepak Kumar"
  }
];
const headerStyle = {
  rows: {
    style: {
      minHeight: '115px', // override the row height
    }
  },
  headCells: {
    style: {
      backgroundColor: "#EDECEC",
    },
  },
};



class PugmarkRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PugmarksList: [],
      PugmarksListBackup : [],
      urlpugmarkrequestTableData: getpugmarkrequestlistURL,
      loader : true,
    };
    this.pugmarkService = new PugMarkRequestService();
    this.getPugMarkRequestData();  
   // this.onActivateSuspendButtonHandleClick = this.onActivateSuspendButtonHandleClick.bind(this);
  }
  columns = [
    {
      name: 'User Details',
      selector: 'User_Name',
      sortable: true,
      wrap: true,
      width: '25%',
       cell: (row) => <div><p className={'m-0'}>{row.User_Name}</p><p className={'m-0'}>{row.Email_ID}</p><p className={'m-0'}>{row.Telephone_No}</p><p className={'m-0'}>{row.abc}</p></div>,
    },
    {
      name: 'Pugmark',
      selector: 'Pugmarks',
      sortable: true,
      width: '7%',
    },
    {
      name: 'Requested By',
      selector: 'Reason_Text',
      sortable: true,
      wrap: true,
      wrap: true,
      width: '15%'
  
    },
    {
      name: 'Requested Date',
      selector: 'Requested_Date',
      sortable: true,
      wrap: true,
      width: '14%'
  
    },
    {
      name: 'Status Changed By',
      selector: 'Reason_Text',
      sortable: true,
      wrap: true,
      wrap: true,
      width: '17%'
  
    },
    {
      name: 'Reason',
      selector: 'Reason_Text',
      sortable: true,
      wrap: true,
      wrap: true,
       cell: (row) => <div><p className={'m-0'}>{row.ReferralName}</p><p className={'m-0'}>({row.Reason_Text} / </p><p className={'m-0'}>{row.ReqBy})</p></div>
    },
    {
      name: 'Action',
      cell: (row) =>
        <div className="col-12">
          <Button className="mb-1 btn update-btn" >
            Approve
        </Button>
        <Button className="mb-2 btn">
            Reject
        </Button>
        <Button className="mb-2 btn">
            More
        </Button>
        </div>
      ,
      button: true,
    },
  ];
  // componentDidUpdate(prevProps, prevState,snapShot) {
  //   if (this.props.PMRequesttableData !== prevProps.PMRequesttableData)
  //   {
  //     pugmarkListObject(this.props.PMRequesttableData);
     
  //     this.setState({PugmarksList: pugmarksList,PugmarksListBackup: this.props.PMRequesttableData});
  //     pugmarksListBackup = this.props.PMRequesttableData; // This is to get the record in the external world
  //   }
  // }

  getPugMarkRequestData(){
    
    if(this.props.PMRequesttableData != "")
    {       
      this.state.PugmarksList = this.props.PMRequesttableData
      this.state.loader = false
    }
    else{    
      
    this.pugmarkService.GetPugMarkRequestList(this.state.urlpugmarkrequestTableData)
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
  }

   //SEarch 
  //  searchAnything = () => {
  //   let thingToSearch = document.getElementById("searchData").value;
  //   pugmarksList = []; 
  //   if (thingToSearch != ""){
  //     filterpugmarksList = this.pugmarkService.filterByValue(this.state.PugmarksListBackup,thingToSearch);
  //     pugmarkListObject(filterpugmarksList);
  //   }
  //   else{
      
  //     pugmarkListObject(this.state.PugmarksListBackup);
  //   }
  //   this.setState({PugmarksList: pugmarksList});
  // }

 
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
                    <Link to="#"> Finance</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    PugMarks Statement
                                </li>
                </ol>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xl={12} className="text-right mb-4">
              <Link to="/add-pugmark">
                <span role="button" className="btn update-btn font ml-3">
                  Add Pugmark
                            </span>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col xl={12}>
              <Card className="mini-stat">
                <CardHeader className="bl-bg">
                  <Link to="#" className="text-white">
                    <b>PugMarks Statement</b>
                  </Link>
                  <span className="float-right">
                    <Input
                      className="search-elem"
                      type="text"
                      id="searchData"
                      placeholder={"Search..."}
                      // onChange={(event) => { this.searchAnything(event) }}
                    />
                  </span>
                </CardHeader>
                <CardBody>
                <DataTable
                      className="data-table"
                      columns={this.columns}
                      data={this.state.PugmarksList}
                      noHeader={true}
                      customStyles={headerStyle}
                      fixedHeader
                      fixedHeaderScrollHeight="300px"
                      pagination
                       getProps={() => customProps}
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
const mapStatetoProps = state => {
  
  return {  
  
    PMRequesttableData :state.PugMarkRequestResult !=undefined ? state.PugMarkRequestResult.tableData :""
  
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


// export default withRouter(PugmarkRequest);
