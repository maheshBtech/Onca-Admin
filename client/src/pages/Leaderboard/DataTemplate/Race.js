import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom';
import AppService from "../../../AppService";
import { Modal } from "reactstrap";
import {leaderboardRace,ListLeadershipDropdownURL} from "../../../AppConfig"
import Loader from "../../../components/Loader";
import store from "../../../store";
import Cookies from 'universal-cookie';
import RaceData from "../SubComponent/RaceData"

const appService = new AppService()
const cookies = new Cookies();

class Race extends Component {
  constructor(props) {   
    super(props);
    this.state = {
    urlraceTableData: leaderboardRace,
    loader : true,
  };
  this.appService = new AppService();
  this.getRaceData();
  //this.getActivityListData();
  this.props.updateTableData('CHANGE_CURRENT_PAGE_NAME', 'Race')
  this.loadDropdownList();
  }

  getRaceData(){
    if(this.props.racetableData != "")
    {       
      this.state.racetableData = this.props.racetableData
      this.state.loader = false
    }
    else{    
    this.appService.GetraceDataFromApiget(this.state.urlraceTableData,null)
    .then((response) => {
      this.state.rawTableData = JSON.parse(JSON.stringify(response.data[0]));     
      store.dispatch({type:'TABLE_DATA_RACE', payload:this.state.rawTableData});        
      //this.props.updateTableData('TABLE_DATA_RACE', this.state.rawTableData)
      this.setState({loader:false})
    })    
}
  }
  loadDropdownList = () => {              
    let ProviderID=  this.props.ProviderID
          let data={
            provider :ProviderID
          }
          this.appService.GetWorkoutDataFromApiget(ListLeadershipDropdownURL, data)
              .then(response => {
   
                  if (response.status == 200) {
                    store.dispatch({ type: 'LIST_RUNNER_DATA', payload: response.data[4] }); 
                      store.dispatch({ type: 'LIST_GROUP_DATA', payload: response.data[1] });                
                      store.dispatch({ type: 'LIST_LOCATION_DATA', payload: response.data[3] });              
                      store.dispatch({type:'Activity_DATA_RACE', payload:response.data[5]}); 
                      store.dispatch({type:'LIST_GENDER_DATA', payload:response.data[2]});   
                      store.dispatch({type:'LIST_DISTANCE_DATA', payload:response.data[8]}); 
                      this.state.GroupList = store.getState().LeaderboardResult.grouplist
                      this.state.LocationList = store.getState().LeaderboardResult.locationlist
                      this.state.Activity = store.getState().raceData.activities
                      this.state.GenderList = store.getState().LeaderboardResult.genderlist
                      this.state.runnerList = store.getState().LeaderboardResult.runnerslist               
                  }
       });
      

      

    }


  render() {
    return (
      
      <React.Fragment>
         {this.state.loader ?
        <Loader />:
        null
      }
          {/* Table */}
         
                    <RaceData />
              
      </React.Fragment>
    );
  }
}
const mapStatetoProps = state => {
  return {  
    userTableData : state.userPageData.firstTableData,
    racetableData :state.raceTableData !=undefined ? state.raceTableData.tableData :null,
    ProviderID: state.currentPageName.roleAndProvider.selectedRole.Service_Provider_ID 
  };
};
const dispatchToProps = dispatch => {
  return {
      updateTableData: (type, payload) => {
          dispatch({ type: type, payload: payload })
      }
  }
}
export default withRouter(connect(mapStatetoProps, dispatchToProps)(Race));
