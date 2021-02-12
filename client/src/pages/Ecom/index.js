import React, { Component } from "react";
import EcomAlias from "./DataTemplate/EcomAlias";
import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom';
import AppService from "../../AppService";
//import { userTableData} from "../../AppConfig";

const appService = new AppService()

class Ecom extends Component {
   constructor(props) {   
     super(props);
     this.state = {};
   }

   loadTableData(){
    this.props.updateTableData("CHANGE_ECOM_TABLEDATA", null)
   }

  // getTableData(){   
  //   if(this.props.userTableData ===""){
  //   console.log(userTableData) 
  //   appService.GetDataFromApiPost(userTableData,"")
  //   .then(response=>{
  //     if(response.status == 200){
  //         this.props.updateTableData("CHANGE_FIRST_USER_TABLE_DATA", response.data[0])
  //     }      
  //   })
  //   .catch(error=>{

  //   })
  // }
    
  // }

  render() {
    return (
      <React.Fragment>
          {/* Table */}
          <EcomAlias />
      </React.Fragment>
    );
  }
}
const mapStatetoProps = state => {
  return {  
  // userTableData : state.userPageData.firstTableData    
  };
};
const dispatchToProps = dispatch => {
  return {
      updateTableData: (type, payload) => {
          dispatch({ type: type, payload: payload })
      }
  }
}
export default withRouter(connect(mapStatetoProps, dispatchToProps)(Ecom));
