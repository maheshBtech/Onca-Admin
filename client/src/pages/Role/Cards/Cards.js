import React, { useState, useEffect, } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import AppService from '../../../AppService'
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { connect } from "react-redux";
import _ from 'lodash';





function Cards(props) {

const [adminMemberList, setAdminMemberList] = useState([]);
let adminMemberInitialList = [] 
const [financeMemberList, setFinanceMemberList] = useState([]);
let financeMemberInitialList = []
const [marketingMemberList, setMarketingMemberList] = useState([]);
let marketingMemberInitialList = []
const [supportMemberList, setSupportMemberList] = useState([]);
let supportMemberInitialList = []

const [countAdminMembers, setcountAdminMembers] = useState(0);
const [countFinanceMembers, setcountFinanceMembers] = useState(0);
const [countMarketingMembers, setcountMarketingMembers] = useState(0);
const [countSupportMembers, setcountSupportMembers] = useState(0);

const uniqueData = (arr, keyProps)=>{   
    let m =  _.uniqBy(arr, function(elem) {
       return JSON.stringify(_.pick(elem, keyProps));
   });
   return m;
    }
const makeInitils =(cardData)=>{
   /* var destArray = _.uniqBy(cardData, function (e) {
        return e.User_ID;
      });*/
    
    if(cardData !== "" && cardData.length > 0){   
        let admincount = 0     
        let financecount = 0
        let marketcount = 0 
        let supportcount = 0  
        cardData.forEach(obj => {
        
        if(obj.Role_Name.toLowerCase().includes("admin") && obj.User_Name !== null)
        {   if(adminMemberInitialList.length < 4)      {
            adminMemberInitialList.push(obj.User_Name.split(' ')[0][0]+obj.User_Name.split(' ')[1][0])
        }                  
           
            admincount = admincount+1            
        }
        if(obj.Role_Name.toLowerCase().includes("finance") && obj.User_Name !== null )
        {           
            if(financeMemberInitialList.length < 4)      {    
            financeMemberInitialList.push(obj.User_Name.split(' ')[0][0]+obj.User_Name.split(' ')[1][0])
            }
            financecount = financecount +1
           
        }
        if(obj.Role_Name.toLowerCase().includes("marketing") && obj.User_Name !== null )
        {   
            if(marketingMemberInitialList.length < 4)      {            
            marketingMemberInitialList.push(obj.User_Name.split(' ')[0][0]+obj.User_Name.split(' ')[1][0])
            }
            marketcount = marketcount+1
            
        }
        if(obj.Role_Name.toLowerCase().includes("support") && obj.User_Name !== null )
        {     
            if(supportMemberInitialList.length < 4)      {               
            supportMemberInitialList.push(obj.User_Name.split(' ')[0][0]+obj.User_Name.split(' ')[1][0])
            }
            supportcount = supportcount+1
            
        }

    });      
    setAdminMemberList(adminMemberInitialList)
    setFinanceMemberList(financeMemberInitialList)
    setMarketingMemberList(marketingMemberInitialList)
    setSupportMemberList(supportMemberInitialList)
    setcountAdminMembers(admincount)
    setcountFinanceMembers(financecount )
    setcountMarketingMembers(marketcount )
    setcountSupportMembers(supportcount)
}
}

useEffect(() => {        
let fileredData = uniqueData(props.cardData, ["Role_ID", "User_ID" ])
makeInitils(fileredData)
},[props.cardData]);

const changeTableMode = (mode, path) => {
props.onTableModeChange(mode, path)
}
   
return (
    <React.Fragment>
        <Row>
        {countAdminMembers > 0 ?
            <Col xl={3} md={6}>
             <Link to="roleTemplate"  onClick={()=> changeTableMode('admin', 'Admin')}>
                <Card className="mini-stat">
                    <CardHeader className="gray-bg">
                        Admin
                    </CardHeader>
                    <CardBody>
                    <Row>
                            <Col xl="12">
                            {
                               adminMemberList.map(el => <span className="name-circle"> {el} </span>)
                            }                           
                            {countAdminMembers < 10 ? 
                            
                            <span className="count-member font-weight-medium font-size-11">
                                {countAdminMembers} members
                            </span>
                            : 
                            <span className="count-member font-weight-medium font-size-11">
                                    +10 members
                            </span> 
                            } 
                            </Col>
                        </Row>                        
                    </CardBody>
                </Card>
                </Link>
            </Col>:
            null}
            {countFinanceMembers > 0 ?
            <Col xl={3} md={6} >
                <Link to="roleTemplate" >
                    <Card className="mini-stat"  onClick={()=> changeTableMode('finance', 'Finance')}>
                        <CardHeader className="gray-bg">
                            Finance
                        </CardHeader>
                        <CardBody>
                        <Row>
                            <Col xl="12">
                            {
                               financeMemberList.map(el => <span className="name-circle"> {el} </span>)
                            }

                            {countFinanceMembers < 10 ? 
                            
                            <span className="count-member font-weight-medium font-size-11">
                                {countFinanceMembers} members
                            </span>
                            : 
                            <span className="count-member font-weight-medium font-size-11">
                                    +10 members
                            </span> 
                            }  
                            </Col>
                        </Row> 
                        </CardBody>
                    </Card>
                </Link>
            </Col> 
            :
            null}
            {countMarketingMembers > 0 ?
            <Col xl={3} md={6}>
            <Link to="roleTemplate" >
                <Card className="mini-stat"    onClick={()=> changeTableMode('marketing', 'Marketing')} >
                    <CardHeader className="gray-bg">
                        Marketing
                    </CardHeader>
                    <CardBody>
                    <Row>
                    <Col xl="12">
                            {
                               marketingMemberList.map(el => <span className="name-circle"> {el} </span>)
                            }

                            {countMarketingMembers < 10 ? 
                            
                            <span className="count-member font-weight-medium font-size-11">
                                {countMarketingMembers} members
                            </span>
                            : 
                            <span className="count-member font-weight-medium font-size-11">
                                    +10 members
                            </span> 
                            }   
                            </Col>
                            </Row>
                    </CardBody>
                </Card>
                </Link>
            </Col>:
            null}
             {countSupportMembers > 0 ?
            <Col xl={3} md={6}>
            <Link to="roleTemplate">
                <Card className="mini-stat" onClick={()=> changeTableMode('support', 'Support')}>
                    <CardHeader className="gray-bg">
                        Support
                    </CardHeader>
                    <CardBody>
                    <Row>
                    <Col xl="12">
                            {
                               supportMemberList.map(el => <span className="name-circle"> {el} </span>)
                            }

                            {countSupportMembers < 10 ? 
                            
                            <span className="count-member font-weight-medium font-size-11">
                                {countSupportMembers} members
                            </span>
                            : 
                            <span className="count-member font-weight-medium font-size-11">
                                    +10 members
                            </span> 
                            } 
                            </Col>
                            </Row>
                    </CardBody>
                </Card>
                </Link>
            </Col>:
            null}
        </Row>
    </React.Fragment>
)


}




/*class Cards extends Component {

constructor(props){
super(props);
this.state={
    adminInitials:"",
    financeInitials:"",
    marketingInitials:"",
    supportInitials:"",
    adminCount:"",
    financeCount:"",
    markeingCount :"",
    supportCount:"",
    valueOfTableMode:""
}
console.log("Card Data Value")
//console.log(this.props.cardData)
this.appService = new AppService();
this.makeInitials()
}
makeInitials(){        
var aI=[];
var fI=[];
var mI=[];
var sI=[];        
var rawData = this.appService.getRoleData()[2];       
var memberCount = this.appService.getRoleData()[3];
rawData.forEach(element => {
    if(element.Role == 2 && aI.length < 5){
        let ini = element.MemberName.split(' ')[0][0]+element.MemberName.split(' ')[1][0]
        aI.push(ini)
    }
    else if(element.Role == 3 && fI.length < 5){
        let ini = element.MemberName.split(' ')[0][0]+element.MemberName.split(' ')[1][0]
        fI.push(ini)
    }
    else if(element.Role == 4 && mI.length < 5){
        let ini = element.MemberName.split(' ')[0][0]+element.MemberName.split(' ')[1][0]
        mI.push(ini)
    }
    else if(element.Role == 5 && sI.length < 5){
        let ini = element.MemberName.split(' ')[0][0]+element.MemberName.split(' ')[1][0]
        sI.push(ini)
    }         

});      
    this.state.adminInitials=aI
    this.state.financeInitials=fI
    this.state.marketingInitials=mI
    this.state.supportInitials=sI
    this.state.adminCount = memberCount[0].num
    this.state.financeCount = memberCount[1].num
    this.state.markeingCount = memberCount[2].num
    this.state.supportCount = memberCount[3].num             
}
changeMode(mode){
this.props.onTableModeChange(mode)
}
render() {
return (
    <React.Fragment>
        <Row>
            <Col xl={3} md={6}>
            <Link to="roleTemplate" onClick={() => this.changeMode(3)}>
                <Card className="mini-stat">
                    <CardHeader className="gray-bg">
                        Admin
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col xl="12">
                            {
                                this.state.adminInitials.map(el => <span className="name-circle"> {el} </span>)
                            }

                            {this.state.adminCount < 10 ? 
                            
                                <span className="count-member font-weight-medium font-size-11">
                                    {this.state.adminCount} members
                                </span>
                                : 
                                <span className="count-member font-weight-medium font-size-11">
                                        +10 members
                                </span> 
                            }
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                </Link>
            </Col>
            <Col xl={3} md={6} >
                <Link to="roleTemplate" onClick={() => this.changeMode(5)}>
                    <Card className="mini-stat">
                        <CardHeader className="gray-bg">
                            Finance
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col xl="12">
                                {
                                this.state.financeInitials.map(el => <span className="name-circle"> {el} </span>)
                            }
                                        {this.state.financeCount < 10 ? 
                            
                            <span className="count-member font-weight-medium font-size-11">
                                {this.state.financeCount} members
                            </span>
                            : 
                            <span className="count-member font-weight-medium font-size-11">
                                    +10 members
                            </span> 
                        }
                                    </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Link>
            </Col>
            <Col xl={3} md={6}>
            <Link to="roleTemplate" onClick={() => this.changeMode(4)}>
                <Card className="mini-stat">
                    <CardHeader className="gray-bg">
                        Marketing
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col xl="12">
                            {
                                this.state.marketingInitials.map(el => <span className="name-circle"> {el} </span>)
                            }
                                    {this.state.markeingCount < 10 ? 
                            
                            <span className="count-member font-weight-medium font-size-11">
                                {this.state.markeingCount} members
                            </span>
                            : 
                            <span className="count-member font-weight-medium font-size-11">
                                    +10 members
                            </span> 
                        }
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                </Link>
            </Col>
            <Col xl={3} md={6}>
            <Link to="roleTemplate" onClick={() => this.changeMode(6)}>
                <Card className="mini-stat">
                    <CardHeader className="gray-bg">
                        Support
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col xl="12">
                            {
                                this.state.supportInitials.map(el => <span className="name-circle"> {el} </span>)
                            }
                                {this.state.supportCount < 10 ? 
                            
                            <span className="count-member font-weight-medium font-size-11">
                                {this.state.supportCount} members
                            </span>
                            : 
                            <span className="count-member font-weight-medium font-size-11">
                                    +10 members
                            </span> 
                        }
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                </Link>
            </Col>
        </Row>
    </React.Fragment>
)
}
}
*/
const dispatchToProps = dispatch => {
return{     
    onTableModeChange:(mode, path)=> {        
        dispatch({type:'CHANGE_TABLE_MODE', payload: mode, path: path})
    } 
}
}
const mapStatetoProps = state => {    
return { 
    cardData : state.roleTableData.tableData
    
};
};

export default withRouter(connect(mapStatetoProps,dispatchToProps)(Cards));