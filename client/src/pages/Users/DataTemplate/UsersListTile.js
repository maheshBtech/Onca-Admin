import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import UsersFilter from '../SubComponent/UsersFilter';
import {
  Card,
  Row,
  Col,
  CardBody,
  CardHeader,
  Label
} from "reactstrap";
import { connect } from "react-redux";

// import images
import user1 from "../../../assets/images/users/user-1.jpg";
import user2 from "../../../assets/images/users/user-2.jpg";
import user3 from "../../../assets/images/users/user-3.jpg";
import user4 from "../../../assets/images/users/user-4.jpg";
import user5 from "../../../assets/images/users/user-5.jpg";
import user6 from "../../../assets/images/users/user-6.jpg";
import user7 from "../../../assets/images/users/user-7.jpg";
import user8 from "../../../assets/images/users/user-8.jpg";
import user9 from "../../../assets/images/users/user-9.jpg";
import user10 from "../../../assets/images/users/user-10.jpg";

class UserListTile extends Component {
  constructor(props) {   
    super(props);
    this.state = {
      userList:"",
    };
    this.getData();
  }
  componentDidUpdate(prevProps, prevState)
  {
    if(prevProps.userTableData !==  this.props.userTableData){
      this.setState({userList:this.props.userTableData});
      this.state.userList = this.props.userTableData
    }
  }
  getData(){    
    this.state.userList = this.props.userTableData
    console.log('data loaded')
    console.log(this.state.userList)
  }
  getCardList(){
    const{userList} = this.state
    let k = null
    if(userList.length>0){
      k =[]
      userList.forEach(obj=>{
        k.push(<Col xl={4} md={6}>
          <Card className="directory-card">
            <CardBody className="p-0">
              <div className="text-center mt-3">
                <img
                  src={user1}
                  alt=""
                  
                  className={"img-fluid img-thumbnail rounded-circle avatar-md"+(obj.user_Active_Flag.data[0]===1?" active":null)}
                />
              </div>
              <div className="text-center">
                <h5 className="text-primary font-size-18 mt-0 mb-1">
                  {obj.User_Name}
              </h5>
              </div>
              <hr />
              <div className="p-2">
                <div className="row mb-2">
                  <div className="col-sm-4">
                    <b>Email ID:</b>
                  </div>
                  <div className="col-sm-8">
                  {obj.Email_ID}
              </div>
                </div>
                <div className="row mb-2">
                  <div className="col-sm-4">
                    <b>Mobile No.:</b>
                  </div>
                  <div className="col-sm-8">
                    {obj.Telephone_No}
              </div>
                </div>
                <div className="row mb-2">
                  <div className="col-sm-4">
                    <b>Location:</b>
                  </div>
                  <div className="col-sm-8">
                    {obj.Location_Name}
              </div>
                </div>
                <div className="row mb-2">
                  <div className="col-sm-4">
                    <b>Activity:</b>
                  </div>
                  <div className="col-sm-8">
                    {obj.Activity_Name}
              </div>
                </div>
                <div className="row mb-2">
                  <div className="col-sm-4">
                    <b>Pugmark:</b>
                  </div>
                  <div className="col-sm-8">
                   {obj.Pugmarks}
              </div>
                </div>
                <div className="row mb-2">
                  <div className="col-sm-4">
                    <b>Sign-up Date:</b>
                  </div>
                  <div className="col-sm-8">
                    {obj.User_SignUp_Date.split('T')[0]}
              </div>
                </div>
              </div>
              <hr />
              <p className="text-center">
                <Link to="/user-profile" onClick={()=>{this.sendPropsToStore(obj)}} className="text-primary">
                  {" "}
              Read More
            </Link>
              </p>
            </CardBody>
          </Card>
        </Col>)
      });     
    }
    return k;
  }
  sendPropsToStore(val){
    this.props.updateTableData("CHANGE_USER_PROFILE_VALUE", val);    
  }
  render() {
    return (
      <React.Fragment>
        <UsersFilter />
        <div className="container-fluid">
          <Card className="mini-stat">
            <CardHeader className="bl-bg">
              <Link to="#" className="text-white">
                <b>Users List</b>
              </Link>
            </CardHeader>
            <CardBody>
              <Row>

                {this.getCardList()}
                
              </Row>
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
export default withRouter(connect(mapStatetoProps, dispatchToProps)(UserListTile));