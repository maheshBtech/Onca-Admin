
import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { connect } from "react-redux";

class RoleMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      currentProvider:"",
      rawRoleList:"",
      roleList:"",
      firstRole:""
    };
    this.toggle = this.toggle.bind(this);
    // to check if role is already set
    if(this.props.roleAndProviderData.isRoleInitialized == true){
      this.bindData(this.props.roleAndProviderData);
    }    
  }
  bindData(data){
    this.state.roleList = data.roleList;
    this.state.firstRole = data.selectedRole;   
  }

componentDidUpdate(prevProps, prevState){
 console.log(this.props)
//  initiallay load roledata
//  if((prevProps.userRoleData !== this.props.userRoleData)){
//     this.rawRoleList = this.props.userRoleData[1];    
//     this.getRoleAccordingToProvider();
//  }
 if(prevProps.currentUserProvide !== this.props.currentUserProvide)
 {
  this.getRoleAccordingToProvider();
 }
}

getRoleAccordingToProvider(){
let provider = this.props.currentUserProvide;
let data = this.props.roleAndProviderData;
if(provider){
  this.state.rawRoleList = this.props.userRoleData[1];
  this.state.roleList=[];
  this.state.firstRole="";
  this.state.rawRoleList.forEach(obj=>{
    if(obj.Provider_Name == provider){
      this.state.roleList.push(obj);
    }
  });
  this.showSelectedList(this.state.roleList[0]);
  data.roleList =  this.state.roleList;
  data.isRoleInitialized = true;
  this.props.updateProfileData('CHANGE_ROLE_AND_PROVIDER', data);
}
}

showSelectedList(roleJson){
  if(roleJson){
  let data = this.props.roleAndProviderData;
  data.selectedRole = roleJson;
  this.props.updateProfileData('CHANGE_ROLE_AND_PROVIDER', data);
  this.setState({firstRole:roleJson});
  this.props.updateProfileData('CHANGE_CURRENT_ROLE',{roleName:roleJson.Role_Name});
}
}

  toggle() {
    this.setState(prevState => ({
      menu: !prevState.menu
    }));
  }

  render() {
    return (
      <React.Fragment>
        <Dropdown isOpen={this.state.menu} toggle={this.toggle} className="d-inline-block" >
          
          <DropdownToggle className="btn header-item waves-effect" id="page-header-user-dropdown" tag="button">
            { this.state.firstRole? this.state.firstRole.Role_Name:null} <i className="mdi mdi-chevron-down"></i>
            
          </DropdownToggle>
          
          {this.state.roleList.length > 0 ?
           <DropdownMenu right>           
               { this.state.roleList?
               this.state.roleList.map((data) => {
                 if(data.Role_Name !== this.state.firstRole.Role_Name){
                 return <DropdownItem tag="a" href="#" onClick={()=>this.showSelectedList(data)}>                   
                {data.Role_Name}
                </DropdownItem>
                }                
                })  
                :null
                     
                } 
                      
         </DropdownMenu>
          :null}



         
        </Dropdown>        
      </React.Fragment>
    );
  }
}
const mapStatetoProps = state => {    
  return { 
      userRoleData : state.userProfileData.ProfileData,
      currentUserProvide: state.userProfileData.providerName,
      roleAndProviderData: state.currentPageName.roleAndProvider    
  };
};

const dispatchToProps = dispatch => {
  return{
    updateProfileData:(type, payload)=> {      
        dispatch({type:type, payload:payload})
    } 
  }
  }
export default withRouter(connect(mapStatetoProps, dispatchToProps)(RoleMenu));