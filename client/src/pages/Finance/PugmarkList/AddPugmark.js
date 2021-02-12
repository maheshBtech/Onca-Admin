import { connect } from "react-redux";
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
// import Autocomplete from '../SubComponent/Autocomplete';
import { ValidationMessage } from "./CommonMessage";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {
    Card,
    Row,
    Col,
    CardBody,
    CardHeader,
    Label,
    Input,
    Alert,
    Modal
} from "reactstrap";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Buddy from './SubComponent/Buddy';
import Family from './SubComponent/Family';
import Captain from './SubComponent/Captain';
import SrCitizen from './SubComponent/SrCitizen';
import Student from './SubComponent/Student';
import Instructor from './SubComponent/Instructor';
import ActivityChage from './SubComponent/ActivityChage';
import ActivityCancellation from './SubComponent/ActivityCancellation';
import WrongCredit from './SubComponent/WrongCredit';
import store from "../../../store";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TableBasic from "../../Tables/TableBasic";
const UsersActvitiesData = [
    {
        id: 1,
        ActivityName: 'Prepare For Race',
        Duration: 2,
        RegDate: "18-11-2017"

    },
    {
        id: 2,
        ActivityName: 'AODs Template 2',
        Duration: 2,
        RegDate: "02-02-2018"

    },
    {
        id: 3,
        ActivityName: 'AODs Template 3',
        Duration: 3,
        RegDate: "18-11-2017"

    }
];

var activityListtemp = [];
var filteractivityListtemp = [];
var activityListtempBackup = [];

function monthDiff(dateFrom, dateTo) {
    return dateTo.getMonth() - dateFrom.getMonth() + 
      (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
   }
const activityListObject = (data) => {
     
    activityListtemp = [];

    if (data === undefined) {
        return;
    }
let temp=0
    data.forEach(element => {

        if(temp !==element.Activity_ID)
        {
        const monthnumber= monthDiff(new Date(element.Start_Date), new Date(element.End_Date))
           
        var RequestedDate = new Date(element.Start_Date);

        let datewithouttime = RequestedDate.toISOString().split('T')[0]
        let time = RequestedDate.toISOString().split('T')[1]

        activityListtemp.push({
            activityID: element.Activity_ID,
            activityName: element.Activity_Name,
            duration: monthnumber,  
            startdate: datewithouttime + " " + time,
           
        });
    temp++
        }
    });

}


const headerStyle = {

    headCells: {
        style: {
            backgroundColor: "#EDECEC",
        },
    },
};
// const columns = [
//     {
//         name: 'Activity Name',
//         selector: 'ActivityName',
//         sortable: true,
//         wrap: true
//     },
//     {
//         name: 'Duration',
//         selector: 'Duration',
//         sortable: true,
//         wrap: true
//     },
//     {
//         name: 'Registration Date',
//         selector: 'RegDate',
//         sortable: true,
//         wrap: true
//     },

// ];

// Selected Activity
const SelectedActvitiesData = [
    {
        id: 1,
        ActivityName: 'Prepare For Race',
        Duration: 2,

    }
];
const ActheaderStyle = {
    headCells: {
        style: {
            backgroundColor: "#EDECEC",
        },
    },
};
const ActColumns = [
    {
        name: 'Activity Name',
        selector: 'ActivityName',
        wrap: true
    },
    {
        name: 'Duration',
        selector: 'Duration',
        wrap: true
    }
];
const activityType = [
    { title: 'Run', year: 1994 },
    { title: 'Cycle', year: 1972 },
    { title: 'Gym', year: 1974 },
    { title: 'Yoga', year: 2008 },
    { title: 'Zomba', year: 1957 },
    { title: "Dance", year: 1993 },
];

class AddPugmark extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            { field: 'activityName', header: 'Activity Name' },
            { field: 'duration', header: 'Duration' },
            { field: 'startdate', header: 'Registration Date' },
        ];
        this.ActColumns = [
            { field: 'activityName', header: 'Activity Name' },
            { field: 'duration', header: 'Duration' },

        ]

        this.state = {
            selectedColumns: this.columns,
            ActColumns: this.ActColumns,
            modal_center: false,
            modal_scroll: false,
            customActiveTab: "1",
            selectedGroup: null,
            userdetails: "",
            activities: "",
            buddyactivities:[],
            selectedbuddyactivity:"",
            pugmarkreasons: [],
            ActivityID:"",
            race_title: "",
            race_title_valid: "",
            Buddy_flag: false,
            family_flag: false,
            captain_flag: false,
            Senior_Citizen_flag: false,
            student_flag: false,
            session_flag: false,
            activity_change_flag: false,
            Activity_Cancellation_flag: false,
            wrong_credits_flag: false,
            selecteduserdetails:"",
            selectedreasons:"",
            user_name:"",
            mobile_number:"",
            familydetails:"",
            error: {},
            buddydetails:[],
            SrCitizendetails:[],
            familydetails:[],
            captaindetails:[],
            sessiondetails:[],
            progchnagedetails:[],
            progcanceldetails:[],
            wrongcreditsdetails:[],
            buddydata: {
                selectedbuddyuserdetails: "",
                user_name:"",
                mobile_number:"",
                training_loc:""
               },
            familydata: {
                activitiescompwithmonths:"",
                selectedfamilyuserdetails: "",
                user_name:"",
                mobile_number:"",
                training_loc:"",
                relation:""
               },
               studentdata: {
                selectedstudentuserdetails: "",
                user_name:"",
                mobile_number:"",
                training_loc:"",
               
               },
               srcitizendata: {               
                selectedsrcitizenuserdetails: "",
                user_name:"",
                mobile_number:"",
                training_loc:"",
                srcitizenage:""
               },
               captaindata: {
                selectedcaptainuserdetails: "",
                user_name:"",
                mobile_number:"",
                training_loc:"",
               
               },
               sessiondata: {
                selectedsessionuserdetails: "",
                user_name:"",
                mobile_number:"",
                training_loc:"",
               
               },
               progchangedata: {
                selectedenrolledactivitydetails: "",
                selectedchangedactivitydetails: "",
                comments:""
               
               },
               progcanceldata: {
                
                selectedchangedactivitydetails: "",
                comments:""
               
               },
               wrongcreditsdata: {
               
                selectedchangedactivitydetails: "",
                comments:""
               
               },
            stateData: {
                isFromUpdate: false
            }
        };
        this.add_member = this.add_member.bind(this);
        this.tog_scroll = this.tog_scroll.bind(this);
        this.getIndividualUserIDs=this.getIndividualUserIDs.bind(this);
    }

    removeBodyCss() {
        document.body.classList.add("no_padding");
    }
    add_member() {
        this.setState(prevState => ({
            modal_center: !prevState.modal_center
        }));
        this.removeBodyCss();
    }
    tog_scroll() {
        this.setState(prevState => ({
            modal_scroll: !prevState.modal_scroll
        }));
        this.removeBodyCss();
    }
    show() {
        this.setState({ visible: true });
    }
    hide() {
        this.setState({ visible: false });
    }
    toggleCustom(tab) {
        if (this.state.customActiveTab !== tab) {
            this.setState({
                customActiveTab: tab
            });
        }
    }

    //Race Title *
    handleRaceTitle = (event) => {
        this.setState({ race_title: event.target.value }, this.validateRaceTitle)
        //console.log(this.state.race_title);
    }

    validateRaceTitle = () => {
        let error = { ...this.state.error }
        if (!this.state.race_title) {
            error.race_title_msg = "Please enter race title";
            this.state.race_title_valid = false;
        } else {
            this.state.race_title_valid = true;
        }

        this.setState({ error });
    }

    componentDidMount() {
        
        var userdata = this.props.userdetails;
        var reasons = this.props.pugmarkreasons;
        var activitylist = this.props.activities;

        this.setState({ userdetails: userdata, pugmarkreasons: reasons, activities: activitylist });

        // var reasons= this.props.pugmarkreasons
        // this.setState({
        //     pugmarkreasons:reasons
        // })

        // var activitylist = this.props.activities
        // this.setState({
        //     activities:activitylist
        // })

    }

    GetUSerNameandMobile(userdata)
    {  
        if (userdata !== undefined && userdata !== null && userdata !== ""){
            this.setState({ selecteduserdetails: userdata, user_name:userdata.User_ID ,mobile_number:userdata.Telephone_No,selectedreasons:""});
     
        }else{
        this.setState({ selecteduserdetails: userdata, user_name:"" ,mobile_number:"",selectedreasons:""});
        }

    }
    
    // get individual element
 getIndividualItemArray = array => {
    let individualItemArray = array.filter(function(v, i, self) {
    return i === self.indexOf(v);
  });
  return individualItemArray;
 };
 getIndividualUserIDs =(activities,reasonID)=>{
     if(reasonID === 1 || reasonID ===2)
     {
    let Usersdatawithactivities= activities
    let UseerIDs = [];
    Usersdatawithactivities &&
    Usersdatawithactivities.map(userdata => {
        return (
            UseerIDs.push( userdata.User_Skey_ID )
        
        );
      });
      const individualUserIDs = this.getIndividualItemArray(UseerIDs)
      return individualUserIDs
    }
    else if(reasonID ===3)
    {
        let Usersdatawithactivities= activities.filter(value => value.User_Type_Name ===  'Student') //'Senior Citizen'
        let UseerIDs = [];
        Usersdatawithactivities &&
        Usersdatawithactivities.map(userdata => {
            return (
                UseerIDs.push( userdata.User_Skey_ID )
            
            );
          });
          const individualUserIDs = this.getIndividualItemArray(UseerIDs)
          return individualUserIDs
    }
    else if(reasonID === 4){
        let Usersdatawithactivities= activities.filter(value => value.User_Type_Name ===  'Senior Citizen') //'Senior Citizen'
        let UseerIDs = [];
        Usersdatawithactivities &&
        Usersdatawithactivities.map(userdata => {
            return (
                UseerIDs.push( userdata.User_Skey_ID )
            
            );
          });
          const individualUserIDs = this.getIndividualItemArray(UseerIDs)
          return individualUserIDs
    }else if(reasonID === 7)
    
    { 
    let Usersdatawithactivities= activities.filter(value => value.Role_Name ===  'Captain') 
    let UseerIDs = [];
    Usersdatawithactivities &&
    Usersdatawithactivities.map(userdata => {
        return (
            UseerIDs.push( userdata.User_Skey_ID )
        
        );
      });
      const individualUserIDs = this.getIndividualItemArray(UseerIDs)
      return individualUserIDs
      
    } else if( reasonID===8)

{
    let Usersdatawithactivities= activities.filter(value => value.Role_Name ===  'Location Lead') 
    let UseerIDs = [];
    Usersdatawithactivities &&
    Usersdatawithactivities.map(userdata => {
        return (
            UseerIDs.push( userdata.User_Skey_ID )
        
        );
      });
      const individualUserIDs = this.getIndividualItemArray(UseerIDs)
      return individualUserIDs 

}
}
 //get user data from it's unique id
 getuserdetails=(individualUseerIDs)=>{
    let userdetails=this.state.userdetails
    let userliststemp = []

    for(let i=0; i< individualUseerIDs.length; i++)
    {
        let temp = userdetails.filter(value => value.User_Skey_ID === individualUseerIDs[i])
        Array.prototype.push.apply(userliststemp, temp)
    }
    return userliststemp;
 }
 //get first call to get userdata
 getuserlist(activities,reasonID){
    let individualUseerIDs=[];
    individualUseerIDs = this.getIndividualUserIDs(activities,reasonID);
   let userlists =[]
   if(individualUseerIDs !==null && individualUseerIDs !== undefined)
   {
    userlists=this.getuserdetails(individualUseerIDs);  
   }
    return userlists
 }
 getprogramdetails(){
    let userID=""
    let activitylist = []
    let activityliststemp=[]
    let Usersdatawithactivities= this.state.activities
     if(this.state.selecteduserdetails !=null && this.state.selecteduserdetails !==undefined && this.state.selecteduserdetails !== "")
    {  userID=this.state.selecteduserdetails.User_Skey_ID
        activityliststemp=Usersdatawithactivities.filter(value => value.User_Skey_ID===userID)

        const individualactivitiIDs = this.getIndividualactivities(activityliststemp) 
        for(let i=0; i< individualactivitiIDs.length; i++)
        {
            let temp = activityliststemp.filter(value => value.Activity_ID === individualactivitiIDs[i])    
          
            Array.prototype.push.apply(activitylist, temp)       
       
        }

    }
    return activitylist 
 }

 getactivitylist(userID){
   
    let activitylist = []
    let activityliststemp=[]
    let temp=[]
    let Usersdatawithactivities= this.state.activities
       
     activityliststemp=Usersdatawithactivities.filter(value => value.User_Skey_ID===userID)

     const individualactivitiIDs = this.getIndividualactivities(activityliststemp) 
     for(let i=0; i< individualactivitiIDs.length; i++)
     {
         let temp = activityliststemp.filter(value => value.Activity_ID === individualactivitiIDs[i]) 
      
         Array.prototype.push.apply(activitylist, temp)       
    
     }
   
    return activitylist 
 }
 getshopproducts = ShopProducts => {
    let categories = [...new Set(ShopProducts.map(item => item.Product_Category_Name))];
    
      let finalOutput =
        categories.map(category => {
          let Image = [];
          let subCategories = [...new Set(ShopProducts.map(item => {
            if (item.Product_Category_Name === category) {
              if (!Image.includes(item.Image_Path)) {
                Image.push(item.Image_Path);
              }
              return item.Sub_Product_Category_Name
            }
            else {
              return null
            }
          }))]
         
    
          subCategories = subCategories.filter(item => item !== undefined && item !== null)
          Image = Image.filter(item => item !== undefined && item !== null)
    
          let a = { category: category, subCategories: subCategories, Image: Image }
          return (a)
        })
      return finalOutput
    }
 getIndividualactivities =(activities)=>{
    let Usersdatawithactivities= activities
    let activitiIDs = [];
    Usersdatawithactivities &&
    Usersdatawithactivities.map(userdata => {
        return (
            activitiIDs.push( userdata.Activity_ID )
        
        );
      });
      const individualactivitiIDs = this.getIndividualItemArray(activitiIDs)
      return individualactivitiIDs
 }
 getactivitydetails(individualactivities){
    let Usersdatawithactivities= this.state.activities
    let activityliststemp = []

    for(let i=0; i< individualactivities.length; i++)
    {
        let temp = Usersdatawithactivities.filter(value => value.Activity_ID === individualactivities[i])
        temp &&
        temp.map(tempdta => {
        const isvalid=this.comparetwodates(tempdta)
       if(isvalid){
        Array.prototype.push.apply(activityliststemp, temp)
       }
    })
    }
    return activityliststemp;
 }

 comparetwodates=(temp)=>{
   const monthnumber= this.monthDiff(new Date(temp.Start_Date), new Date(temp.End_Date))
   if(monthnumber>=2){
       return true
   }
   else{
    return false
   }
 }
  monthDiff(dateFrom, dateTo) {
    return dateTo.getMonth() - dateFrom.getMonth() + 
      (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
   }
  
    getreferaldetails(reason){

if (reason !==null && reason !==undefined && reason !==""){
    
    switch(reason.Pugmark_Reason_ID){
        case 1:{
                  
        let activities=this.state.activities
        let userlists = []                
        userlists = this.getuserlist(activities,1);

        this.setState({ selectedreasons: reason, Buddy_flag:true ,family_flag:false,student_flag:false,Senior_Citizen_flag:false,activity_change_flag:false,Activity_Cancellation_flag:false,captain_flag:false,session_flag:false,wrong_credits_flag:false,
           buddydetails:userlists,familydetails:"",studentdetails:"",SrCitizendetails:"",progchnagedetails:"",progcanceldetails:"",wrongcreditsdetails:"",captaindetails:"",sessiondetails:"",buddyactivities:"",
           buddydata: { selectedbuddyuserdetails: "",user_name:"", mobile_number:"", training_loc:""},
           familydata: { activitiescompwithmonths:"", selectedfamilyuserdetails: "", user_name:"",mobile_number:"",training_loc:"", relation:""},
           studentdata: {selectedstudentuserdetails: "",user_name:"",mobile_number:"",training_loc:"",},
           srcitizendata: {selectedsrcitizenuserdetails: "",user_name:"",mobile_number:"",training_loc:"",srcitizenage:"" },
           captaindata: {selectedcaptainuserdetails: "",user_name:"",mobile_number:"",training_loc:"", },
           sessiondata: {selectedsessionuserdetails: "",user_name:"",mobile_number:"",training_loc:"", },
           progchangedata: {selectedenrolledactivitydetails: "",selectedchangedactivitydetails: "",comments:""},
           progcanceldata: {selectedchangedactivitydetails: "",comments:""},
           wrongcreditsdata: {selectedchangedactivitydetails: "",comments:""},});
           
        break;
        }
        case 2:{          
             let individualactivities=[];
             let activities=this.state.activities
             individualactivities = this.getIndividualactivities(activities);
             let activitylists =[]
             activitylists=this.getactivitydetails(individualactivities);  
             let userlists = []                
             userlists = this.getuserlist(activitylists,2);
           

        this.setState({ selectedreasons: reason, Buddy_flag:false ,family_flag:true,student_flag:false,Senior_Citizen_flag:false,activity_change_flag:false,Activity_Cancellation_flag:false,captain_flag:false,session_flag:false,wrong_credits_flag:false,buddydetails:"",familydetails:userlists,studentdetails:"",SrCitizendetails:"",progchnagedetails:"",progcanceldetails:"",wrongcreditsdetails:"",captaindetails:"",sessiondetails:"",buddyactivities:"",
        buddydata: { selectedbuddyuserdetails: "",user_name:"", mobile_number:"", training_loc:""},
        familydata: { activitiescompwithmonths:"", selectedfamilyuserdetails: "", user_name:"",mobile_number:"",training_loc:"", relation:""},
        studentdata: {selectedstudentuserdetails: "",user_name:"",mobile_number:"",training_loc:"",},
        srcitizendata: {selectedsrcitizenuserdetails: "",user_name:"",mobile_number:"",training_loc:"",srcitizenage:"" },
        captaindata: {selectedcaptainuserdetails: "",user_name:"",mobile_number:"",training_loc:"", },
        sessiondata: {selectedsessionuserdetails: "",user_name:"",mobile_number:"",training_loc:"", },
        progchangedata: {selectedenrolledactivitydetails: "",selectedchangedactivitydetails: "",comments:""},
        progcanceldata: {selectedchangedactivitydetails: "",comments:""},
        wrongcreditsdata: {selectedchangedactivitydetails: "",comments:""},});
        break;
        }
        case 3:{
            let activities=this.state.activities
            let userlists = []                
            userlists = this.getuserlist(activities,3);
            

            this.setState({ selectedreasons: reason, Buddy_flag:false ,family_flag:false,student_flag:true,Senior_Citizen_flag:false,activity_change_flag:false,Activity_Cancellation_flag:false,captain_flag:false,session_flag:false,wrong_credits_flag:false,buddydetails:"",familydetails:"",studentdetails:userlists,SrCitizendetails:"",progchnagedetails:"",progcanceldetails:"",wrongcreditsdetails:"",captaindetails:"",sessiondetails:"",buddyactivities:"",
            buddydata: { selectedbuddyuserdetails: "",user_name:"", mobile_number:"", training_loc:""},
            familydata: { activitiescompwithmonths:"", selectedfamilyuserdetails: "", user_name:"",mobile_number:"",training_loc:"", relation:""},
            studentdata: {selectedstudentuserdetails: "",user_name:"",mobile_number:"",training_loc:"",},
            srcitizendata: {selectedsrcitizenuserdetails: "",user_name:"",mobile_number:"",training_loc:"",srcitizenage:"" },
            captaindata: {selectedcaptainuserdetails: "",user_name:"",mobile_number:"",training_loc:"", },
            sessiondata: {selectedsessionuserdetails: "",user_name:"",mobile_number:"",training_loc:"", },
            progchangedata: {selectedenrolledactivitydetails: "",selectedchangedactivitydetails: "",comments:""},
            progcanceldata: {selectedchangedactivitydetails: "",comments:""},
            wrongcreditsdata: {selectedchangedactivitydetails: "",comments:""},});
            break;
        }
        case 4:{
            let activities=this.state.activities
            let userlists = []                
            userlists = this.getuserlist(activities,4);

            this.setState({ selectedreasons: reason, Buddy_flag:false ,family_flag:false,student_flag:false,Senior_Citizen_flag:true,activity_change_flag:false,Activity_Cancellation_flag:false,captain_flag:false,session_flag:false,wrong_credits_flag:false,buddydetails:"",familydetails:"",studentdetails:"",SrCitizendetails:userlists,progchnagedetails:"",progcanceldetails:"",wrongcreditsdetails:"",captaindetails:"",sessiondetails:"",buddyactivities:"",
            buddydata: { selectedbuddyuserdetails: "",user_name:"", mobile_number:"", training_loc:""},
            familydata: { activitiescompwithmonths:"", selectedfamilyuserdetails: "", user_name:"",mobile_number:"",training_loc:"", relation:""},
            studentdata: {selectedstudentuserdetails: "",user_name:"",mobile_number:"",training_loc:"",},
            srcitizendata: {selectedsrcitizenuserdetails: "",user_name:"",mobile_number:"",training_loc:"",srcitizenage:"" },
            captaindata: {selectedcaptainuserdetails: "",user_name:"",mobile_number:"",training_loc:"", },
            sessiondata: {selectedsessionuserdetails: "",user_name:"",mobile_number:"",training_loc:"", },
            progchangedata: {selectedenrolledactivitydetails: "",selectedchangedactivitydetails: "",comments:""},
            progcanceldata: {selectedchangedactivitydetails: "",comments:""},
            wrongcreditsdata: {selectedchangedactivitydetails: "",comments:""},});
            break;
        }
        case 5:{
            // this.state.selecteduserdetails
        let activitylist=[]
        let activityarray=[]
        activityarray=this.getprogramdetails()
         activityListObject(activityarray);
        activitylist= activityListtemp
        this.setState({ selectedreasons: reason, Buddy_flag:false ,family_flag:false,student_flag:false,Senior_Citizen_flag:false,activity_change_flag:true,Activity_Cancellation_flag:false,captain_flag:false,session_flag:false,wrong_credits_flag:false,buddydetails:"",familydetails:"",studentdetails:"",SrCitizendetails:"",progchnagedetails:activitylist,progcanceldetails:"",wrongcreditsdetails:"",captaindetails:"",sessiondetails:"",buddyactivities:"",
        buddydata: { selectedbuddyuserdetails: "",user_name:"", mobile_number:"", training_loc:""},
        familydata: { activitiescompwithmonths:"", selectedfamilyuserdetails: "", user_name:"",mobile_number:"",training_loc:"", relation:""},
        studentdata: {selectedstudentuserdetails: "",user_name:"",mobile_number:"",training_loc:"",},
        srcitizendata: {selectedsrcitizenuserdetails: "",user_name:"",mobile_number:"",training_loc:"",srcitizenage:"" },
        captaindata: {selectedcaptainuserdetails: "",user_name:"",mobile_number:"",training_loc:"", },
        sessiondata: {selectedsessionuserdetails: "",user_name:"",mobile_number:"",training_loc:"", },
        progchangedata: {selectedenrolledactivitydetails: "",selectedchangedactivitydetails: "",comments:""},
        progcanceldata: {selectedchangedactivitydetails: "",comments:""},
        wrongcreditsdata: {selectedchangedactivitydetails: "",comments:""},});
        break;
        }
        case 6:{
            let activitylist=[]
            let activityarray=[]
            activityarray=this.getprogramdetails()
           activityListObject(activityarray);
            activitylist= activityListtemp
         this.setState({ selectedreasons: reason, Buddy_flag:false ,family_flag:false,student_flag:false,Senior_Citizen_flag:false,activity_change_flag:false,Activity_Cancellation_flag:true,captain_flag:false,session_flag:false,wrong_credits_flag:false,buddydetails:"",familydetails:"",studentdetails:"",SrCitizendetails:"",progchnagedetails:"",progcanceldetails:activitylist,wrongcreditsdetails:"",captaindetails:"",sessiondetails:"",buddyactivities:"",
         buddydata: { selectedbuddyuserdetails: "",user_name:"", mobile_number:"", training_loc:""},
         familydata: { activitiescompwithmonths:"", selectedfamilyuserdetails: "", user_name:"",mobile_number:"",training_loc:"", relation:""},
         studentdata: {selectedstudentuserdetails: "",user_name:"",mobile_number:"",training_loc:"",},
         srcitizendata: {selectedsrcitizenuserdetails: "",user_name:"",mobile_number:"",training_loc:"",srcitizenage:"" },
         captaindata: {selectedcaptainuserdetails: "",user_name:"",mobile_number:"",training_loc:"", },
         sessiondata: {selectedsessionuserdetails: "",user_name:"",mobile_number:"",training_loc:"", },
         progchangedata: {selectedenrolledactivitydetails: "",selectedchangedactivitydetails: "",comments:""},
         progcanceldata: {selectedchangedactivitydetails: "",comments:""},
         wrongcreditsdata: {selectedchangedactivitydetails: "",comments:""},});
         break;
        }
        case 7:{
            let activities=this.state.activities
            let userlists = []                
            userlists = this.getuserlist(activities,7);
             
        this.setState({ selectedreasons: reason, Buddy_flag:false ,family_flag:false,student_flag:false,Senior_Citizen_flag:false,activity_change_flag:false,Activity_Cancellation_flag:false,captain_flag:true,session_flag:false,wrong_credits_flag:false,buddydetails:"",familydetails:"",studentdetails:"",SrCitizendetails:"",progchnagedetails:"",progcanceldetails:"",wrongcreditsdetails:"",captaindetails:userlists,sessiondetails:"",buddyactivities:"",
        buddydata: { selectedbuddyuserdetails: "",user_name:"", mobile_number:"", training_loc:""},
        familydata: { activitiescompwithmonths:"", selectedfamilyuserdetails: "", user_name:"",mobile_number:"",training_loc:"", relation:""},
        studentdata: {selectedstudentuserdetails: "",user_name:"",mobile_number:"",training_loc:"",},
        srcitizendata: {selectedsrcitizenuserdetails: "",user_name:"",mobile_number:"",training_loc:"",srcitizenage:"" },
        captaindata: {selectedcaptainuserdetails: "",user_name:"",mobile_number:"",training_loc:"", },
        sessiondata: {selectedsessionuserdetails: "",user_name:"",mobile_number:"",training_loc:"", },
        progchangedata: {selectedenrolledactivitydetails: "",selectedchangedactivitydetails: "",comments:""},
        progcanceldata: {selectedchangedactivitydetails: "",comments:""},
        wrongcreditsdata: {selectedchangedactivitydetails: "",comments:""},});
        break;
         }
        case 8:{
            let activities=this.state.activities
            let userlists = []                
            userlists = this.getuserlist(activities,8);
         this.setState({ selectedreasons: reason, Buddy_flag:false ,family_flag:false,student_flag:false,Senior_Citizen_flag:false,activity_change_flag:false,Activity_Cancellation_flag:false,captain_flag:false,session_flag:true,wrong_credits_flag:false,buddydetails:"",familydetails:"",studentdetails:"",SrCitizendetails:"",progchnagedetails:"",progcanceldetails:"",wrongcreditsdetails:"",captaindetails:"",sessiondetails:userlists,buddyactivities:"",
         buddydata: { selectedbuddyuserdetails: "",user_name:"", mobile_number:"", training_loc:""},
         familydata: { activitiescompwithmonths:"", selectedfamilyuserdetails: "", user_name:"",mobile_number:"",training_loc:"", relation:""},
         studentdata: {selectedstudentuserdetails: "",user_name:"",mobile_number:"",training_loc:"",},
         srcitizendata: {selectedsrcitizenuserdetails: "",user_name:"",mobile_number:"",training_loc:"",srcitizenage:"" },
         captaindata: {selectedcaptainuserdetails: "",user_name:"",mobile_number:"",training_loc:"", },
         sessiondata: {selectedsessionuserdetails: "",user_name:"",mobile_number:"",training_loc:"", },
         progchangedata: {selectedenrolledactivitydetails: "",selectedchangedactivitydetails: "",comments:""},
         progcanceldata: {selectedchangedactivitydetails: "",comments:""},
         wrongcreditsdata: {selectedchangedactivitydetails: "",comments:""},});
       break;
         }
         case 9:{
            let activitylist=[]
            let activityarray=[]
            activityarray=this.getprogramdetails()
            activityListObject(activityarray);
            activitylist= activityListtemp
          this.setState({ selectedreasons: reason, Buddy_flag:false ,family_flag:false,student_flag:false,Senior_Citizen_flag:false,activity_change_flag:false,Activity_Cancellation_flag:false,captain_flag:false,session_flag:false,wrong_credits_flag:true,buddydetails:"",familydetails:"",studentdetails:"",SrCitizendetails:"",progchnagedetails:"",progcanceldetails:"",wrongcreditsdetails:activitylist,captaindetails:"",sessiondetails:"",buddyactivities:"",
          buddydata: { selectedbuddyuserdetails: "",user_name:"", mobile_number:"", training_loc:""},
          familydata: { activitiescompwithmonths:"", selectedfamilyuserdetails: "", user_name:"",mobile_number:"",training_loc:"", relation:""},
          studentdata: {selectedstudentuserdetails: "",user_name:"",mobile_number:"",training_loc:"",},
          srcitizendata: {selectedsrcitizenuserdetails: "",user_name:"",mobile_number:"",training_loc:"",srcitizenage:"" },
          captaindata: {selectedcaptainuserdetails: "",user_name:"",mobile_number:"",training_loc:"", },
          sessiondata: {selectedsessionuserdetails: "",user_name:"",mobile_number:"",training_loc:"", },
          progchangedata: {selectedenrolledactivitydetails: "",selectedchangedactivitydetails: "",comments:""},
          progcanceldata: {selectedchangedactivitydetails: "",comments:""},
          wrongcreditsdata: {selectedchangedactivitydetails: "",comments:""},});
          break;
         }
         default:{
          this.setState({ selectedreasons: reason, Buddy_flag:false ,family_flag:false,student_flag:false,Senior_Citizen_flag:false,activity_change_flag:false,Activity_Cancellation_flag:false,captain_flag:false,session_flag:false,wrong_credits_flag:false,buddydetails:"",familydetails:"",studentdetails:"",SrCitizendetails:"",progchnagedetails:"",progcanceldetails:"",wrongcreditsdetails:"",captaindetails:"",sessiondetails:"",buddyactivities:"",
          buddydata: { selectedbuddyuserdetails: "",user_name:"", mobile_number:"", training_loc:""},
          familydata: { activitiescompwithmonths:"", selectedfamilyuserdetails: "", user_name:"",mobile_number:"",training_loc:"", relation:""},
          studentdata: {selectedstudentuserdetails: "",user_name:"",mobile_number:"",training_loc:"",},
          srcitizendata: {selectedsrcitizenuserdetails: "",user_name:"",mobile_number:"",training_loc:"",srcitizenage:"" },
          captaindata: {selectedcaptainuserdetails: "",user_name:"",mobile_number:"",training_loc:"", },
          sessiondata: {selectedsessionuserdetails: "",user_name:"",mobile_number:"",training_loc:"", },
          progchangedata: {selectedenrolledactivitydetails: "",selectedchangedactivitydetails: "",comments:""},
          progcanceldata: {selectedchangedactivitydetails: "",comments:""},
          wrongcreditsdata: {selectedchangedactivitydetails: "",comments:""},});

            break;
        }
    }
}else{
    this.setState({ selectedreasons: reason, Buddy_flag:false ,family_flag:false,student_flag:false,Senior_Citizen_flag:false,activity_change_flag:false,Activity_Cancellation_flag:false,captain_flag:false,session_flag:false,wrong_credits_flag:false,buddydetails:"",familydetails:"",studentdetails:"",SrCitizendetails:"",progchnagedetails:"",progcanceldetails:"",wrongcreditsdetails:"",captaindetails:"",sessiondetails:"",buddyactivities:"",
    buddydata: { selectedbuddyuserdetails: "",user_name:"", mobile_number:"", training_loc:""},
    familydata: { activitiescompwithmonths:"", selectedfamilyuserdetails: "", user_name:"",mobile_number:"",training_loc:"", relation:""},
    studentdata: {selectedstudentuserdetails: "",user_name:"",mobile_number:"",training_loc:"",},
    srcitizendata: {selectedsrcitizenuserdetails: "",user_name:"",mobile_number:"",training_loc:"",srcitizenage:"" },
    captaindata: {selectedcaptainuserdetails: "",user_name:"",mobile_number:"",training_loc:"", },
    sessiondata: {selectedsessionuserdetails: "",user_name:"",mobile_number:"",training_loc:"", },
    progchangedata: {selectedenrolledactivitydetails: "",selectedchangedactivitydetails: "",comments:""},
    progcanceldata: {selectedchangedactivitydetails: "",comments:""},
    wrongcreditsdata: {selectedchangedactivitydetails: "",comments:""},});

}
    }

    GetbuddyUserDetails(userdata)
    {  
        if(userdata !== null && userdata !== undefined && userdata !==""){
        this.setState({  buddydata: {
            selectedbuddyuserdetails: userdata, user_name:userdata.User_ID ,mobile_number:userdata.Telephone_No,training_loc:""}
        });
       
       let activitylist=[]
       let activityarray=[]
       activityarray=   this.getactivitylist(userdata.User_Skey_ID)
       activityListObject(activityarray);
       activitylist=activityListtemp
        this.setState({ 
            buddyactivities: activitylist}
        );       
    }

    }
    GetfamilyUserDetails(userdata)
    { 
        if(userdata !== null && userdata !== undefined && userdata !==""){
        this.setState({  familydata: {
            ...this.state.familydata,
            selectedfamilyuserdetails: userdata, user_name:userdata.User_ID ,mobile_number:userdata.Telephone_No,relation:"",training_loc:""}
        });
        let activitylist=[]
        let activityarray=[]
        activityarray=   this.getactivitylist(userdata.User_Skey_ID)
        activityListObject(activityarray);
        activitylist=activityListtemp
         this.setState({ 
            buddyactivities: activitylist}
         );
    }

    }
    Getfamilyrelation(temprelation){
        this.setState({  familydata: {
            ...this.state.familydata,
            relation:temprelation.target.value}
        });
    }
    GetstudentUserDetails(userdata)
    { 
        if(userdata !== null && userdata !== undefined && userdata !==""){
        this.setState({  studentdata: {
            selectedstudentuserdetails: userdata, user_name:userdata.User_ID ,mobile_number:userdata.Telephone_No,training_loc:""}
        });
        let activitylist=[]
        let activityarray=[]
        activityarray=   this.getactivitylist(userdata.User_Skey_ID)
        activityListObject(activityarray);
        activitylist=activityListtemp
         this.setState({ 
            buddyactivities: activitylist}
         );
        }

    }
    
    GetSrCitizenUserDetails(userdata)
    { 
        if(userdata !== null && userdata !== undefined && userdata !==""){
        this.setState({  srcitizendata: {
            ...this.state.srcitizendata,
            selectedsrcitizenuserdetails: userdata, user_name:userdata.User_ID ,mobile_number:userdata.Telephone_No,srcitizenage:"",training_loc:""}
        });
        let activitylist=[]
        let activityarray=[]
        activityarray=   this.getactivitylist(userdata.User_Skey_ID)
        activityListObject(activityarray);
        activitylist=activityListtemp
         this.setState({ 
            buddyactivities: activitylist}
         );
        }

    }
    GetSrCitizenUserage(userdata)
    { 
       {
        this.setState({  srcitizendata: {
            ...this.state.srcitizendata,
            srcitizenage:userdata.target.value}
        });

    }}
    GetcaptainUserDetails(userdata)
    { 
        if(userdata !== null && userdata !== undefined && userdata !==""){
        this.setState({  captaindata: {
            selectedcaptainuserdetails: userdata, user_name:userdata.User_ID ,mobile_number:userdata.Telephone_No,training_loc:""}
        });
        let activitylist=[]
        let activityarray=[]
        activityarray=   this.getactivitylist(userdata.User_Skey_ID)
        activityListObject(activityarray);
        activitylist=activityListtemp
         this.setState({ 
             buddyactivities: activitylist}
         );    
        }

    }
    
    GetsessionUserDetails(userdata)
    { 
        if(userdata !== null && userdata !== undefined && userdata !==""){
        this.setState({  sessiondata: {
            selectedsessionuserdetails: userdata, user_name:userdata.User_ID ,mobile_number:userdata.Telephone_No,training_loc:""}
        }); 
        let activitylist=[]
       let activityarray=[]
       activityarray=   this.getactivitylist(userdata.User_Skey_ID)
       activitylist=activityListObject(activityarray);
         this.setState({ 
             buddyactivities: activitylist}
         );
        }

    }
    GetactivitychangeDetails(userdata)
    { 
         
        if(userdata !== null && userdata !== undefined && userdata !==""){
        this.setState({  progchangedata: {
            ...this.state.progchangedata,
            selectedchangedactivitydetails: userdata}
        });}

    }
    GetactivityenrolledDetails(userdata)
    { 
        
        this.setState({  progchangedata: {
            ...this.state.progchangedata,
            selectedenrolledactivitydetails: userdata}
        });

    }
    GetcommentDetails(tempcomment)
    { 
       
        this.setState({  progchangedata: {
            ...this.state.progchangedata,
            comments: tempcomment.target.value}
        });

    }
    GetprogcancelDetails(userdata)
    { 
        
        this.setState({  progcanceldata: {
            ...this.state.progcanceldata,
            selectedchangedactivitydetails: userdata}
        });

    }
    GetprogcancelcommentDetails(tempcomment)

    {
        this.setState({progcanceldata:
        {...this.state.progcanceldata,
            comments:tempcomment.target.value
        }})
    }
    
    GetwrongcreditsDetails(userdata)
    { 
      
        this.setState({  wrongcreditsdata: {
            ...this.state.wrongcreditsdata,
            selectedchangedactivitydetails: userdata}
        });

    }
    GetwrongcreditscommentDetails(tempcomment)
    { 
       
        this.setState({  wrongcreditsdata: {
            ...this.state.wrongcreditsdata,
            comments: tempcomment.target.value}
        });

    }
    
  
     setSelectedActivity = (e) => {
         let ID=e.activityID
        this.setState({ActivityID : ID})
    }

GetBuddyDetailsActivity=(e)=>{
    let selectedact=[]
       let actlist=this.state.buddyactivities;
        let actID=this.state.ActivityID
         selectedact=actlist.filter(value =>value.activityID === actID)
         this.setState({selectedbuddyactivity : selectedact,modal_center: false})
         
}
    render() {
        const { selectedGroup } = this.state;

        const columnComponents = this.state.selectedColumns.map(col => {

            return <Column key={col.field} field={col.field} header={col.header} headerStyle={{ width: '120px' }} sortable />;

        });
        const ActcolomnComponent = this.state.ActColumns.map(col => {

            return <Column key={col.field} field={col.field} header={col.header} headerStyle={{ width: '120px' }} sortable />;

        });


     
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <Row className="align-items-center">
                        <Col sm={6}>
                            <div className="page-title-box">
                                <ol className="breadcrumb mb-0">
                                    <li className="breadcrumb-item">
                                        <Link to="/pugmark-request">Finance</Link>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        Pugmark Request
                                    </li>
                                </ol>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={12} className="text-right mb-4">
                            <Link to="/pugmark-request">
                                <span role="button" className="btn update-btn font ml-3">
                                    Back
                                </span>
                            </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={12}>
                            <Card className="inner-card">
                                <CardHeader className="bl-bg">
                                    <b className="text-white">Add Pugmarks</b>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col lg={6}>
                                            <div className="form-group">
                                                <Label for="act-name">User's Email ID <span className="text-danger" >*</span></Label>
                                                <Autocomplete
                                                    className="d-block w-100"
                                                    options={this.state.userdetails}
                                                    onChange={(event, value) => {
                                                        console.log('value ' + value)
                                                        // this.setState({ selecteduserdetails: value });
                                                        this.GetUSerNameandMobile(value);

                                                    }}
                                                    value={this.state.selecteduserdetails}
                                                    getOptionLabel={(option) => option.Email_ID}
                                                    id="emailID"
                                                    renderInput={(params) => (
                                                        <div ref={params.InputProps.ref}>
                                                            <input type="EmailID" placeholder="select Email ID" id="act" type="text" {...params.inputProps} />
                                                        </div>
                                                    )} />
                                                {/* <ValidationMessage valid={this.state.link_activity_valid} message={this.state.error.link_activity_msg} /> */}
                                            </div>
                                            <div className="form-group">
                                                <Label for="EmailID">User Name </Label>
                                                <Input type="text" id="EmailID"
                                                    placeholder="User Name"
                                                    value={this.state.user_name}
                                                    disabled
                                                />
                                            </div>
                                            <div className="form-group">
                                                <Label for="MobNumber">Mobile Number </Label>
                                                <Input type="text" id="MobNumber"
                                                    placeholder="Mobile Number"
                                                    value={this.state.mobile_number}
                                                    disabled
                                                />
                                            </div>

                                            <div className="form-group">
                                                <Label for="act-name">Comments<span className="text-danger" ></span></Label>
                                                <Input
                                                    type="textarea"
                                                    id="textarea"
                                                    onChange={this.textareachange}
                                                    maxLength="225"
                                                    rows="3"
                                                    placeholder="This textarea has a limit of 225 chars."
                                                />
                                            </div>

                                        </Col>
                                        <Col lg={6}>
                                            <Row>
                                                <Col lg={12}>
                                                    <RadioGroup row aria-label="position" name="position" defaultValue="Credit">
                                                        <FormControlLabel
                                                            value="Credit"
                                                            control={<Radio color="primary" />}
                                                            label="Credit"
                                                        />
                                                        <FormControlLabel
                                                            value="Debit"
                                                            control={<Radio color="primary" />}
                                                            label="Debit"
                                                        />
                                                    </RadioGroup>
                                                    <div className="form-group">
                                                        <Label for="act-name">PugMark Value <span className="text-danger" >*</span></Label>
                                                        <Input type="number" id="race-title"
                                                            placeholder=""
                                                            onChange={this.handleRaceTitle}
                                                            value={this.state.race_title}
                                                            onBlur={this.validateRaceTitle}
                                                        />
                                                        <ValidationMessage valid={this.state.race_title_valid} message={this.state.error.race_title_msg} />
                                                    </div>
                                                    <div className="form-group">
                                                        <Label for="act-name">Reason For PugMark <span className="text-danger" >*</span></Label>
                                                        <Autocomplete
                                                    className="d-block w-100"
                                                    options={this.state.pugmarkreasons}
                                                    onChange={(event, value) => {
                                                        console.log('value ' + value)
                                                        // this.setState({ selecteduserdetails: value });
                                                        this.getreferaldetails(value);

                                                    }}
                                                    value={this.state.selectedreasons}
                                                    getOptionLabel={(option) => option.Pugmark_Reason_Name}
                                                    id="reasons"
                                                    renderInput={(params) => (
                                                        <div ref={params.InputProps.ref}>
                                                            <input type="Reason" placeholder="select Pugmark Reason" id="act" type="text" {...params.inputProps} />
                                                        </div>
                                                    )} />
                                                    </div>
                                                    {this.state.Buddy_flag === true  ?
                                                        ( <Buddy buddydetails={this.state.buddydetails}
                                                            //  GetbuddyUserDetails={this.GetbuddyUserDetails()} 
                                                             GetbuddyUserDetails={(value) => this.GetbuddyUserDetails( value)}   
                                                             buddydata={this.state.buddydata}/>
                                                        ) : null}

                                                    {this.state.family_flag === true  ?
                                                        (  <Family familydetails={this.state.familydetails}
                                                            GetfamilyUserDetails={(value) => this.GetfamilyUserDetails( value)}   
                                                            familydata={this.state.familydata}/>
                                                        ) : null}
                                                    
                                                    {this.state.captain_flag === true  ?
                                                        (  <Captain captaindetails={this.state.captaindetails}
                                                            GetcaptainUserDetails={(value) => this.GetcaptainUserDetails( value)}   
                                                            captaindata={this.state.captaindata}/>
                                                        ) : null}
                                                    
                                                    {this.state.Senior_Citizen_flag === true  ?
                                                        (  <SrCitizen  srCitizendetails={this.state.SrCitizendetails}
                                                           
                                                             GetSrCitizenUserDetails={(value) => this.GetSrCitizenUserDetails( value)}   
                                                             srcitizendata={this.state.srcitizendata}/>
                                                        ) : null}

                                                    {this.state.student_flag === true  ?
                                                        (   <Student studentdetails={this.state.studentdetails}
                                                           
                                                            GetstudentUserDetails={(value) => this.GetstudentUserDetails( value)}   
                                                            studentdata={this.state.studentdata} />
                                                        ) : null}
                                                    
                                                    {this.state.session_flag === true  ?
                                                        (    <Instructor sessiondetails={this.state.sessiondetails}
                                                           
                                                            GetsessionUserDetails={(value) => this.GetsessionUserDetails( value)}   
                                                            sessiondata={this.state.sessiondata} />
                                                        ) : null}
                                                   
                                                   {this.state.activity_change_flag === true  ?
                                                        (    
                                                             <ActivityChage progchnagedetails={this.state.progchnagedetails}
                                                            GetactivitychangeDetails={(value) => this.GetactivitychangeDetails( value)}
                                                            GetactivityenrolledDetails={(value) => this.GetactivityenrolledDetails( value)}
                                                            GetcommentDetails={(value) => this.GetcommentDetails( value)}
                                                            progchangedata={this.state.progchangedata}/>
                                                        ) : null}
                                                  
                                                  
                                                  {this.state.Activity_Cancellation_flag === true  ?
                                                        (        <ActivityCancellation progcanceldetails={this.state.progcanceldetails}
                                                            GetprogcancelDetails={(value) => this.GetprogcancelDetails( value)}
                                                            GetprogcancelcommentDetails={(value) => this.GetprogcancelcommentDetails( value)}
                                                            progcanceldata={this.state.progcanceldata} />
                                                        ) : null}
                                                  
                                                   
                                                  
                                                    {this.state.wrong_credits_flag === true  ?
                                                        (        <WrongCredit  wrongcreditsdetails={this.state.wrongcreditsdetails}
                                                            GetwrongcreditsDetails={(value) => this.GetwrongcreditsDetails( value)}
                                                            GetwrongcreditscommentDetails={(value) => this.GetwrongcreditscommentDetails( value)}
                                                            wrongcreditsdata={this.state.wrongcreditsdata}/>
                                                        ) : null}
                                                 
                                                    <Alert color="warning">
                                                        <strong>"Buddy Name"</strong> is already referred by <strong>"Referree Name"</strong> on <strong>"Date"</strong>
                                                    </Alert>
                                                    {/* <DataTable
                                                                        className="data-table mb-3"
                                                                        columns={ActColumns}
                                                                        data={SelectedActvitiesData}
                                                                        noHeader={true}
                                                                        customStyles={ActheaderStyle}
                                                                    /> */}
                                                    {this.state.selectedbuddyactivity !== "" ?
                                                        <DataTable value={this.state.selectedbuddyactivity}
                                                            className="p-datatable-gridlines">

                                                            {ActcolomnComponent}
                                                        </DataTable> : null}
                                                    {/* <DataTable value={this.state.selectedbuddyactivity}
                                                        className="p-datatable-gridlines">

                                                        {ActcolomnComponent}
                                                    </DataTable> */}
                                               {this.state.Buddy_flag === true || this.state.family_flag === true || this.state.student_flag===true||this.state.Senior_Citizen_flag === true||this.state.captain_flag===true || this.state.session_flag === true  ?
                                                    <button
                                                        className="btn update-btn btn-block"
                                                        type="submit"
                                                        onClick={this.add_member}
                                                        data-toggle="modal"
                                                        data-target=".bs-example-modal-center"
                                                    >
                                                        Find Buddy Details
                                                    </button>
                                                  :  null  }  
                                                    <Modal
                                                        isOpen={this.state.modal_center}
                                                        toggle={this.add_member}
                                                    >
                                                        <div className="modal-header">
                                                            <h5 className="modal-title mt-0">Enrolled Activity List</h5>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    this.setState({ modal_center: false })
                                                                }
                                                                className="close"
                                                                data-dismiss="modal"
                                                                aria-label="Close"
                                                            >
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <Card className="mini-stat text-white">
                                                                <CardHeader className="bl-bg">
                                                                    <b>Recently Enrolled Activities</b>
                                                                </CardHeader>
                                                                <CardBody>
                                                                    {/* <DataTable
                                                                        className="data-table"
                                                                        columns={columns}
                                                                        data={UsersActvitiesData}
                                                                        noHeader={true}
                                                                        customStyles={headerStyle}
                                                                        fixedHeader
                                                                        fixedHeaderScrollHeight="300px"
                                                                        pagination
                                                                        selectableRows
                                                                    /> */}

                                                                    <DataTable
                                                                        value={this.state.buddyactivities} onSelectionChange={e => this.setSelectedActivity(e.value)} dataKey="id"
                                                                        scrollable scrollHeight="200px" style={{ width: '100%' }}
                                                                        className="p-datatable-gridlines"
                                                                        paginator
                                                                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                                                                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10, 20, 50]}
                                                                    >
                                                                        <Column selectionMode="single" headerStyle={{ width: '3rem' }}></Column>

                                                                        {columnComponents}

                                                                    </DataTable>

                                                                    <button className="btn btn-block update-btn font mt-3" 
                                                                     onClick={(event) => this.GetBuddyDetailsActivity(event)}
                                                                    >
                                                                        Select Activity
                                                                    </button>
                                                                </CardBody>
                                                            </Card>
                                                        </div>
                                                    </Modal>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Col lg={12}>
                        <div className="form-group row">
                            <button className="btn update-btn font" type="submit" >
                                Submit
                            </button>
                        </div>
                    </Col>
                </div>
            </React.Fragment>
        )
    }
}

// export default withRouter(AddPugmark);
const mapStatetoProps = state => {

    return {

        //   PMRequesttableData : state.PugMarkRequestResult.tableData ,
        ProviderID: state.currentPageName.roleAndProvider.selectedRole.Service_Provider_ID,
        UserSkeyID: state.userProfileData != undefined ? state.userProfileData.ProfileData[0][0].User_Skey_ID : null,
        userdetails: state.PugMarkStatementResult.userdata,
        pugmarkreasons: state.PugMarkStatementResult.PMreasons,
        activities: state.PugMarkStatementResult.PMactivities

    };
};
const dispatchToProps = dispatch => {
    return {
        updateTableData: (type, payload) => {
            dispatch({ type: type, payload: payload })
        }
    }
}
export default withRouter(connect(mapStatetoProps, dispatchToProps)(AddPugmark));