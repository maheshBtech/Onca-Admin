import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from "react-redux";
import DataTable, { createTheme } from 'react-data-table-component';
import UsersFilter from '../SubComponent/UsersFilter';
import CsvDownload from 'react-json-to-csv';
import {
  Card,
  Row,
  Col,
  CardBody,
  CardHeader,
  Label,
  Input
} from "reactstrap";

const UsersData = [
  {
    id: 1,
    UserName: 'Srinidhi',
    EmaiID: 'Vnsrinidhi@yahoo.com',
    PhNumber: 9008707172,
    Area: 'Vasant Kunj',
    City: 'DEL1',
    Activity: '',
    PugMarkBalance: 0,
    UserStatus: 'Active',
    SignUpDate: '2020-09-21 17:50:58'
  },
  {
    id: 2,
    UserName: 'Chaitra Raghu',
    EmaiID: 'chaitra.praveen2007@gmail.com',
    PhNumber: 9900191841,
    Area: '',
    City: 'BLR',
    Activity: '',
    PugMarkBalance: 0,
    UserStatus: 'Active',
    SignUpDate: '2020-09-21 15:19:59'
  },
  {
    id: 3,
    UserName: 'Srikanth V Yelkur',
    EmaiID: 'v_shreekanth@rediffmail.com',
    PhNumber: 9972094628,
    Area: 'K. R. Puram',
    City: 'BLR',
    Activity: '10K WTS 2020 A',
    PugMarkBalance: 0,
    UserStatus: 'Active',
    SignUpDate: '2020-09-21 13:48:06'
  },
  {
    id: 4,
    UserName: 'Srikanth V Yelkur',
    EmaiID: 's.venugopalyelkur@gmail.com',
    PhNumber: 9972094628,
    Area: '',
    City: 'BLR',
    Activity: '',
    PugMarkBalance: 0,
    UserStatus: 'Active',
    SignUpDate: '2020-09-21 13:47:23'
  },
  {
    id: 5,
    UserName: 'Nilesh Vaknalli',
    EmaiID: 'nilesh.vaknalli@gmail.com',
    PhNumber: 9769846842,
    Area: '',
    City: 'BLR',
    Activity: '',
    PugMarkBalance: 0,
    UserStatus: 'Active',
    SignUpDate: '2020-09-21 06:46:34'
  }
];
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
const columns = [
  {
    name: 'User Details',
    selector: 'UserDetails',
    sortable: true,
    wrap: true
    },
  {
    name: 'Location',
    selector: 'Location',
    sortable: true,
    cell: row => <div><p className={'m-0'}>{row.Area}</p><p className={'m-0'}>{row.City}</p></div>,
  },
  {
    name: 'Activity',
    selector: 'Activity',
    sortable: true,
    wrap: false,
  },
  {
    name: 'PugMark Balance',
    selector: 'PugMarkBalance',
    sortable: true
  },
  {
    name: 'User Status',
    selector: 'UserStatus',
    sortable: true,
    wrap: true
  },
  {
    name: 'SignUp Date',
    selector: 'SignUpDate',
    sortable: true,
    wrap: true
  }
];
class UsersList extends Component {

  constructor(props) {   
    super(props);
    this.state = {
      rawTableData:"",
      modifiedTableData:"",
      searchedData:"",
    };
    
  }

componentDidUpdate(prevProps, prevState)
{
  if(prevProps.userTableData !== this.props.userTableData){
    this.setState({rawTableData:this.props.userTableData},()=>{
      this.modifyDataForTable()
    })
  }

}

modifyDataForTable(){
let jsonRaw = this.state.rawTableData;
let json = { UserName:"", EmaiID:"", PhNumber:"",  Location:"", Activity:"", PugMarkBalance:"", UserStatus:"", SignUpDate:"" }
let modifiedData = []
jsonRaw.forEach((obj, idx)=>{  
  json.UserName = (obj.User_Name===null?' ' : obj.User_Name);
  json.EmaiID =(obj.Email_ID===null?' ' : obj.Email_ID);
  json.PhNumber = (obj.Telephone_No===null?' ' : obj.Telephone_No);
  json.City = (obj.City_Name===null?' ' : obj.City_Name);
  json.Activity =(obj.Activity_Name===null?' ' : obj.Activity_Name);
  json.PugMarkBalance =(obj.Pugmarks===null?' ' : obj.Pugmarks);
  json.UserStatus = this.userStatusToString(obj.user_Active_Flag.data[0]);
  json.SignUpDate =  (obj.User_SignUp_Date===null?' ' : obj.User_SignUp_Date.toString().replace('.000Z','').replace('T',' '));
  modifiedData.push(JSON.parse(JSON.stringify(json)))
})
this.setState({modifiedTableData:modifiedData});
this.setState({searchedData:modifiedData})
}

userStatusToString(id){
  if(id===1){return 'Active'}
  if(id===0){return 'Inactive'}
}
searchAnything(event){
  
  let searchKey = event.target.value.toString().toLowerCase();
  let modified = this.state.modifiedTableData;
  let searchedData=[]
  if(searchKey==''){
    this.setState({searchedData:modified})
  }
  else{
    modified.forEach(obj=>{
    if(
       obj.UserName.toLowerCase().includes(searchKey) 
    || obj.EmaiID.toLowerCase().includes(searchKey) 
    || obj.PhNumber.toLowerCase().includes(searchKey)    
    || obj.City.toLowerCase().includes(searchKey)  
    || obj.Activity.toLowerCase().includes(searchKey)   
    || obj.PugMarkBalance.toString().toLowerCase().includes(searchKey)    
    || obj.UserStatus.toLowerCase().includes(searchKey)  
    || obj.SignUpDate.toLowerCase().includes(searchKey) ) 
    {
      searchedData.push(obj)
    }
  });
  this.setState({searchedData:searchedData})
}

}


  render() {
    return (
      <React.Fragment>        
        <UsersFilter />
        <div className="container-fluid">
          <Card className="mini-stat">
            <CardHeader className="bl-bg">
              <Link to="#" className="text-white">
                <b>Role Table</b>
              </Link>
              <span className="float-right">                
                <Input 
            className="search-elem"
            type="text" 
            id="searchData"
            placeholder={"Search..."} 
            onChange={(event)=>{this.searchAnything(event)}}
          />
          <CsvDownload 
            className="file-dwd ml-3" 
           data={this.state.searchedData}
            filename={"user_Data.csv"}
          />
                  </span>
            </CardHeader>
            <CardBody>
              <DataTable
                className="data-table"
                columns={columns}
                data={this.state.searchedData}
                noHeader={true}
                customStyles={headerStyle}
                fixedHeader
                fixedHeaderScrollHeight="300px"
                pagination
              />
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    )
  }
}
const mapStatetoProps = state => {
  return {
    userTableData : state.userPageData.firstTableData
  };
};
const dispatchToProps = dispatch => {
  return {
      updateTableData: (type, payload) => {
          dispatch({ type: type, payload: payload })
      }
  }
}
export default withRouter(connect(mapStatetoProps, dispatchToProps)(UsersList));