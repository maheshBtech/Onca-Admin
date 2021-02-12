
import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { withRouter, Link } from 'react-router-dom';
import { connect } from "react-redux";
import store from "../store"
// users
import user4 from '../assets/images/users/user-4.jpg';

import AppService from "../AppService"
import {profileDetails,ListLeadershipDropdownURL} from "../AppConfig"

import Cookies from 'universal-cookie';

const cookies = new Cookies();
class ProfileMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: false,
            userProfileData:"",
            userRoleDetails:""
        };
        console.log(this.props.userProfileData)
        this.appService = new AppService()
        this.toggle = this.toggle.bind(this);
        console.log(this.props.profileMaster)
        this.getUserProfileData();
        
    }
/**
   * 
   * To get profile data of logged in user
   */
  getUserProfileData(){

    if(this.props.userProfileData === ""){

    console.log("cookie check")
    
    let email =""
    if(this.props.userEmail!=="")
    {
        email  = this.props.userEmail
    }
    else{
        email = cookies.get('userEmail')
    }
    let data = {
        email:email,
        pass:"123456"
    }
    console.log(email)
    this.appService.GetDataFromApiPost(profileDetails,data)
    .then((response)=>{      
          
        this.state.userProfileData = response.data[0][0];
        this.state.userRoleDetails = response.data[1];
        this.props.updateTableData("CHANGE_USER_PROFILE_DATA",response.data)   

       
        
    })
}
else{
    this.state.userProfileData = this.props.userProfileData[0][0];
    this.state.userRoleDetails =this.props.userProfileData[1];
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
                        {this.state.userProfileData == undefined || null ? "" :  this.state.userProfileData.User_Name} <i className="mdi mdi-chevron-down"></i>
                        <img className="rounded-circle header-profile-user ml-2" src={user4} alt="Header Avatar" />
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem tag="a" href="#"><i className="mdi mdi-account-circle font-size-17 align-middle mr-1"></i>Profile</DropdownItem>
                        <div className="dropdown-divider"></div>
                        <Link
                            to='/logout'
                            className="dropdown-item">
                            <i className="mdi mdi-logout font-size-17 align-middle mr-1"></i>
                            <span>Logout</span>
                        </Link>
                    </DropdownMenu>
                </Dropdown>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {    
    return { 
        userEmail: state.currentPageName.userEmail,
        userProfileData: state.userProfileData.ProfileData,
        dropdowndata:state.LeaderboardResult !=undefined ? state.LeaderboardResult.grouplist :""
    };
  };

  const dispatchToProps = dispatch => {
    return{
      updateTableData:(type, payload)=> {      
          dispatch({type:type, payload:payload})
      } 
    }
    }

export default withRouter(connect(mapStatetoProps, dispatchToProps)(ProfileMenu));


