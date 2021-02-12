import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import UserData from "./DataTemplate/UserData";
import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom';
import AppService from "../../AppService";
import {listRoleURL, roleDataURL} from "../../AppConfig"
import { userTableData, activityTableData} from "../../AppConfig";
import Cookies from 'universal-cookie';
import store from '../../store/index'

const cookies = new Cookies();

const appService = new AppService()

class Users extends Component {
  constructor(props) {   
    super(props);
    this.state = {};
    this.loadTotalRoleData();
    this.getTableData();
    this.getActivityTableData();
    this.props.updateTableData('CHANGE_CURRENT_PAGE_NAME', "Users")
  }

  getTableData(){   
    
    if(this.props.userTableData ===""){    
    appService.GetDataFromApiPost(userTableData,"")
    .then(response=>{
      if(response.status == 200){
          this.props.updateTableData("CHANGE_FIRST_USER_TABLE_DATA", response.data[0])
      }      
    })
    .catch(error=>{

    })
  }
    
  }
  //to update role list 
  loadTotalRoleData() {
    appService.GetDataFromApiPost(listRoleURL, null)
      .then((response) => {
        
        if (response.status == 200) {
          this.props.updateTableData('TOTAL_ROLE_LIST',response.data[1]); 
          store.dispatch({ type: 'CHANGE_COUNTRY_LIST', payload: response.data[8] })
          store.dispatch({ type: 'CHANGE_STATE_LIST', payload: response.data[9] })   
          store.dispatch({ type: 'CHANGE_CITY_LIST', payload: response.data[10] })      
        }
      })
      appService.GetDataFromApiPost(roleDataURL, null)
        .then((response) => {this.removeLoginUserData(response)});
        }
        removeLoginUserData(response) {
          let email = cookies.get('userEmail')
          let data = []
          response.data[1].forEach((obj, idx) => {
            if (obj.Email_ID !== email) {
              data.push(obj)
            }
          });
          this.state.rawTableData = JSON.parse(JSON.stringify(data));
          this.props.updateTableData('CHANGE_TABLE_DATA', this.state.rawTableData)
          data = []
          response.data[0].forEach((obj, idx) => {
            if (obj.Email_ID !== email) {
              data.push(obj)
            }
          });
          this.state.MasterRoletableData = JSON.parse(JSON.stringify(data));
          this.props.updateTableData('CHANGE_MASTER_ROLE_TABLE_DATA', this.state.MasterRoletableData)
      
          //console.log(this.state.rawTableData)   
          this.setState({ loader: false })
        }
  // to get the table data for activity 
  getActivityTableData(){
    let data ={
      email:cookies.get('userEmail'),
      password:"123456"
    }
    if(this.props.activityTableData===""){      
      appService.GetDataFromApiPost(activityTableData,data)
      .then(response=>{
        if(response.status == 200){    
          if(response !== null)     {          
            this.props.updateTableData("CHANGE_ACTIVITY_TABLE_DATA", response.data[2])
            this.props.updateTableData("CHANGE_TRANSACTIONS_TABLE_DATA", response.data[3])
          }
        }      
      })
      .catch(error=>{
  
      })
    }

  }

  render() {
    return (
      <React.Fragment>
          {/* Table */}
          <UserData />
      </React.Fragment>
    );
  }
}
const mapStatetoProps = state => {
  return {  
    userTableData : state.userPageData.firstTableData,
    activityTableData : state.userPageData.activityTableData    
  };
};
const dispatchToProps = dispatch => {
  return {
      updateTableData: (type, payload) => {
          dispatch({ type: type, payload: payload })
      }
  }
}
export default withRouter(connect(mapStatetoProps, dispatchToProps)(Users));
