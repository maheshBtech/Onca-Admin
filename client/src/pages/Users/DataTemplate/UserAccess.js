import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import {
    Card,
    CardBody,
    CardHeader,
    Button,
    Row,
    Col,
    Label
} from "reactstrap";
import { connect } from "react-redux";
import MultiChipSelect from "../SubComponent/MultiChipSelect";
import {assginRoleURL} from './../../../AppConfig'
import AppService from '../../../AppService'
import SweetAlert from "react-bootstrap-sweetalert";
import store from '../../../store/index'

const appService = new AppService();

class UserPersonalDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            success_msg:false,
            fail_msg:false,
            alertBoxData:"",
        };
    }

 getPreviousRole (){
        let roles =""
        let previoususerRoleList = store.getState().masterRoleTableData.masterRoleTableDataRaw;
        if(previoususerRoleList){
        for(let i=0; i<previoususerRoleList.length; i++)
        {
          if(previoususerRoleList[i].Email_ID === store.getState().userPageData.userProfileData.Email_ID)
          {
            roles = previoususerRoleList[i].Role_ID
            break;
          }
        }
        let roleIdArray = roles.split(',')
        if(roleIdArray){
        let totalRoleList = store.getState().masterRoleTableData.totalRoleList;
        let provider = store.getState().userProfileData.providerName
        let previousRRoleList = []
        roleIdArray.forEach(obj=>{
  
          for(let i=0; i<totalRoleList.length;i++){
            if(parseInt(obj) === totalRoleList[i].Role_ID)
            {
              previousRRoleList.push({title: totalRoleList[i].Role_Name, id: totalRoleList[i].Role_ID, discription: totalRoleList[i].Role_Desc});
            }
          }
        })
        return previousRRoleList
      }
      }
      }

    updateRole(){
       
        let personOfOperation = this.props.userProfileData
        let totalSelectedRoles = this.props.selectedRoles
        let totalRoleToRemove = this.props.roleToRemove    
        let previousRole = this.getPreviousRole()
        //if role which is to removed is already present in the previous role of users only then keep the role 
        //else remove it
        if(totalRoleToRemove){
        let availbleRoleToRemove =[];
        totalRoleToRemove.forEach((obj1, idx)=>{
            let isAvailable= false;
            previousRole.forEach(obj2=>{
                if(obj2.id === obj1.id){ isAvailable = true }
            })
            if(isAvailable){ availbleRoleToRemove.push(obj1) }
        });
        if(availbleRoleToRemove.length>0){
        let rejectedRoleIDString = ""
        totalRoleToRemove.forEach(obj=>{
            rejectedRoleIDString = obj.id+','+rejectedRoleIDString
        })
        rejectedRoleIDString = rejectedRoleIDString.substring(0, rejectedRoleIDString.length-1)
        let data = {mobNO: personOfOperation.PhNumber, email:personOfOperation.EmaiID, roles: rejectedRoleIDString, activeFlag:0, userActiveFlag:1, roleDeleteFlag:1}
        appService.GetDataFromApiPost(assginRoleURL, data)
        .then(response=>{
            if(response.status == 200){
            appService.updateRoleMasterData()
            this.setState({alertBoxData:"Role modified."})
            this.setState({success_msg:true})            
        }
        else{
            this.showErrorMessage();
        }
        });
    }
        //API call TO remove
    }

        //if the role which is to add should not present in previous role, is it is present then remove the roles
       if(totalSelectedRoles){
        let availableRoleToAdd=[];
        totalSelectedRoles.forEach((obj1, idx)=>{
            let isAvailable= false;
            previousRole.forEach(obj2=>{
                if(obj2.id === obj1.id){ isAvailable = true }
            })
            if(!isAvailable){ availableRoleToAdd.push(obj1) }
        });
        //API call to add 
        if(availableRoleToAdd.length>0){
        let newRoleIdString ="";
        availableRoleToAdd.forEach(obj=>{
            newRoleIdString = obj.id+','+newRoleIdString
        })
        newRoleIdString = newRoleIdString.substring(0,newRoleIdString.length-1)
        let data = {mobNO: personOfOperation.PhNumber, email:personOfOperation.EmaiID, roles: newRoleIdString, activeFlag:1, userActiveFlag:1, roleDeleteFlag:0}
        appService.GetDataFromApiPost(assginRoleURL, data)
        .then(response=>{
            if(response.status == 200){
            appService.updateRoleMasterData()
            this.setState({alertBoxData:"Role modified."})
            this.setState({success_msg:true})           
        }
        else{
            this.showErrorMessage();
        }
        });
        }
        }

    }
    showErrorMessage(){
        this.setState({alertBoxData:"Some Error Occured."})
        this.setState({fail_msg:true})
       this.setState({success_msg:false}) 
    }

    closeAlertBox(){         
        this.setState({success_msg:false})
        this.setState({alertBoxData:""})       
        this.setState({fail_msg:false})
      }

    render() {
        return (
            <React.Fragment>
                 {this.state.success_msg ? (
                        <SweetAlert
                          title="Success!"
                          success                                                 
                          onConfirm={() => this.closeAlertBox()}                          
                        >
                          {this.state.alertBoxData}
                        </SweetAlert>
                      ) : null}
                      {this.state.fail_msg ? (
                        <SweetAlert
                          title="Error!"
                          warning                                                 
                          onConfirm={() => this.closeAlertBox()}                          
                        >
                          {this.state.alertBoxData}
                        </SweetAlert>
                      ) : null}



                <Card className="mini-stat">
                    <CardHeader className="bl-bg text-white">
                        User Permission
                    </CardHeader>
                    <CardBody>
                        <div className="container-fluid pl-4 pr-4 mt-3">
                            <Row>
                                <Col lg={6}>
                                    <div className="form-group">
                                        <Label for="UniqueID">Assign Role</Label>
                                        <MultiChipSelect />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </CardBody>
                </Card>
                <div className="container-fluid pl-4 pr-4">
                    <Button className="btn update-btn mr-3" type="submit" onClick={()=>{this.updateRole()}}>
                        Update Permission
                    </Button>
                </div>
            </React.Fragment>
        )
    }
}
const mapStatetoProps = state => {
    return {
        selectedRoles: state.selectedRoles.roles,
        roleToRemove:state.selectedRoles.roleToRemove,        
        userProfileData: state.userPageData.userProfileData,
    };
};
const dispatchToProps = dispatch => {
    return {
        updateTableData: (type, payload) => {
            dispatch({ type: type, payload: payload })
        }
    }
}
export default withRouter(connect(mapStatetoProps, dispatchToProps)(UserPersonalDetails));