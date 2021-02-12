
import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import _ from 'lodash';
import {CHANGE_USER_PROFILE_DATA, CHANGE_USER_PROVIDER_DATA} from '../../src/store/profileData/actionTypes'


class PortalMenu extends Component {
  
    constructor(props) {
        super(props);        
        this.state = {
            menu: false,
            rawProviderList:"",
            filterdData:"",
            firstProvider:"",
            restProviders:"",
            roleList:"",
            providerList:"",
            rolesToBeDisplayed:""
        };            
        
        this.toggle = this.toggle.bind(this);     
        console.log(this.props.roleAndProviderData)  
        console.log(this.props.userRoleData)
        console.log(this.props.roleAndProviderData)  
        // call this function on contructor only if value are set yo store
        if(this.props.roleAndProviderData.isProviderInitialized){
        this.checkIfRoleAndProviderSet();   
      }    
    }
    //to check if data for provider and role is already loaded and role and data is selected or not
    checkIfRoleAndProviderSet(){
      let roleAndProviderData = this.props.roleAndProviderData;
      let uniqueProviders = "";
      //if role and provider is not set
      if(roleAndProviderData.isProviderInitialized === false){
         let roleData = this.props.userRoleData[1];
        //  getting unique providers
         uniqueProviders =  _.uniqBy(roleData, function (e) {
          return e.Provider_Name;          
        }); 
       if(uniqueProviders){
        uniqueProviders.forEach((obj, idx)=>{
          if(obj.Provider_Name == null){
            uniqueProviders[idx].Provider_Name = "Onca"
          }
        });
       }
      
      // pushing name of different providers to array
      let listoFProviders = [];
      uniqueProviders.forEach(obj=>{
        listoFProviders.push(obj.Provider_Name);
      });
      // passing value to provider list varible
      this.setState({providerList:listoFProviders},()=>{
        this.showSelectedProvider(this.state.providerList[0])
      });
    }
    else{
      this.bindData();
    }

    }
    bindData(){ 
      let data = this.props.roleAndProviderData;
      this.state.providerList = data.providerList;
      this.state.firstProvider = data.selectedProvider; 
      
    }

    // it will show the selected provider on top nav
    showSelectedProvider(providerName){
      let roleAndProviderData = this.props.roleAndProviderData;
      if(providerName){
        this.setState({firstProvider:providerName});   
        if(roleAndProviderData.isProviderInitialized== false){     
        roleAndProviderData.isProviderInitialized= true;
        roleAndProviderData.providerList= this.state.providerList;
        roleAndProviderData.selectedProvider= providerName;  
      } 
      else{
        roleAndProviderData.selectedProvider= providerName; 
      }
        this.props.updateProfileData('CHANGE_ROLE_AND_PROVIDER' ,roleAndProviderData);
        this.props.updateProfileData('CHANGE_USER_PROVIDER_DATA',providerName)
      }
      console.log(this.props.roleAndProviderData);
    }

    componentDidUpdate(prevProps, prevState){     
       
       console.log(this.props)
       if(prevProps.userRoleData != this.props.userRoleData)
       {
        this.checkIfRoleAndProviderSet();
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
                 {this.state.firstProvider?
                 this.state.firstProvider
                 :
                 null
                 }                
                 <i className="mdi mdi-chevron-down"></i>
                 
                </DropdownToggle>
                <DropdownMenu right>                
                {this.state.providerList.length > 0 ?
                this.state.providerList.map((data,i) => {
                                  
                 if(data !== this.state.firstProvider) {

                return <DropdownItem key={i} tag="a" href="#" onClick={()=>this.showSelectedProvider(data)}>
                {data}
                </DropdownItem>  
                }      
               
              })
                :
                null              
              }
              </DropdownMenu>
               {/* <DropdownMenu right>
                  <DropdownItem tag="a" href="#" onClick={(event)=>this.selectedProvider(event.target.innerText)}>
                    JJS
                  </DropdownItem>
                  <DropdownItem tag="a" href="#" onClick={(event)=>this.selectedProvider(event.target.innerText)}>
                    Runners Academy
                  </DropdownItem>
                </DropdownMenu>              */}
                
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
export default withRouter(connect(mapStatetoProps, dispatchToProps)(PortalMenu));


