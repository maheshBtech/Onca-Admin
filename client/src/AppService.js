import axios from "axios";
import {roleDataURL,leaderboardRace} from './AppConfig'
import store from '../src/store/index'

import {baseUrl, GetProviders,leaderboardResultList} from "./AppConfig";
import Cookies from 'universal-cookie';
//const Authtoken = sessionStorage.getItem("token");
const cookies = new Cookies();
class AppService {
 
    constructor() {
          
        this.testData = 1
        this.items = [

            { link: 1, name: "test1", summary: "Summary Test 1", year: "2001", country: "us", price: "1000", description: "Desc 1" },

            { link: 2, name: "test2", summary: "Summary Test 2", year: "2002", country: "uk", price: "2000", description: "Desc 2" },

            { link: 3, name: "test3", summary: "Summary Test 3", year: "2003", country: "cz", price: "3000", description: "Desc 3" },

        ];
        this.setRoleData()
    }

    async retrieveItems() {

        return Promise.resolve(this.items);

    }

    async getItem(itemLink) {

        for (var i = 0; i < this.items.length; i++) {

            if (this.items[i].link === itemLink) {

                return Promise.resolve(this.items[i]);

            }

        }

        return null;

    }

    // async getItem(itemLink) {

    //     console.log("ItemService.getItem():");

    //     console.log("Item: " + itemLink);

    //     return fetch(itemLink)

    //         .then(response => {

    //             if (!response.ok) {

    //                 this.handleResponseError(response);

    //             }

    //             return response.json();

    //         })

    //         .then(item => {

    //             item["link"] = item._links.self.href;

    //             return item;

    //         }

    //         )

    //         .catch(error => {

    //             this.handleError(error);

    //         });

    // }

    async createItem(newitem) {

        console.log("ItemService.createItem():");

        console.log(newitem);

        return fetch(this.config.ITEM_COLLECTION_URL, {

            method: "POST",

            mode: "cors",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(newitem)

        })

            .then(response => {

                if (!response.ok) {

                    this.handleResponseError(response);

                }

                return response.json();

            })

            .catch(error => {

                this.handleError(error);

            });

    }

    async deleteItem(itemlink) {

        console.log("ItemService.deleteItem():");

        console.log("item: " + itemlink);

        return fetch(itemlink, {

            method: "DELETE",

            mode: "cors"

        })

            .then(response => {

                if (!response.ok) {

                    this.handleResponseError(response);

                }

            })

            .catch(error => {

                this.handleError(error);

            });

    }

    async updateItem(item) {

        return fetch(item.link, {

            method: "PUT",

            mode: "cors",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(item)

        })

            .then(response => {

                if (!response.ok) {

                    this.handleResponseError(response);

                }

                return response.json();

            })

            .catch(error => {

                this.handleError(error);

            });

    }

    handleResponseError(response) {

        throw new Error("HTTP error, status = " + response.status);

    }

    handleError(error) {
        console.log(error.message);
    }

    async GetDataFromApiGet(url, params, header) {
        let Authtoken = sessionStorage.getItem("token");
            header = "'Content-Type': 'application/json' ,'Authorization':'Bearer " + Authtoken+"','Access-Control-Allow-Origin':"+ baseUrl + ",'Vary': 'Origin', 'Access-Control-Request-Method' : 'GET, POST, OPTIONS','Access-Control-Allow-Headers': 'Content-Type,Authorization'";
        await axios.get(url,{ mode: 'cors'},
            { params: params }, { headers: header }
        ).then(response => {

            if (!response.ok) {

                this.handleResponseError(response);

            }

            return response.json();

        })

            .catch(error => {

                this.handleError(error);

            });
    }

    async GetDataFromApiPostLogin(url, data) {
        let response = null;
        try{          
        response =  await axios.post(
            url,
            data,
            { mode: 'cors'},
            { headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': baseUrl, 'Vary': 'Origin','Access-Control-Allow-Credentials': true, 'Access-Control-Request-Method' : 'GET, POST, OPTIONS'}}
        );
        if (!response.statusText.toLowerCase() === 'ok') {

                this.handleResponseError(response);

            }
            
            return response;

        }
        catch(error)
        {

                this.handleError(error);
                return response;
            }
    }

    async GetDataFromApiPost(url, data) {
        let response = null;
        let Authtoken = sessionStorage.getItem("token");
        try{
            
         response =  await axios.post(
            url,
            data,
        {credentials: "omit",mode: 'cors', method: 'POST', headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': baseUrl,
         'Vary': 'Origin', 'Access-Control-Request-Method' : 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,Authorization','Authorization':'Bearer ' + Authtoken} }
        );
        if (!response.statusText.toLowerCase() === 'ok') {

                this.handleResponseError(response);

            }

            return response;

        }
        catch(error)
        {

                this.handleError(error);
                return response;
            }
    }

    async getDataFetch(url) {
        let Authtoken = sessionStorage.getItem("token");
        console.log(Authtoken)

        const response =
            await fetch(url,{ credentials: "omit",mode: 'cors', method: 'GET',
                headers: { 'Content-Type': 'application/json','Vary': 'Origin', 'Access-Control-Request-Method' : 'GET, POST, OPTIONS','Access-Control-Allow-Origin': baseUrl,'Authorization':'Bearer ' + Authtoken,'Access-Control-Allow-Headers': 'Content-Type,Authorization'} }
            )
        //console.log(await response)
        return await response;
    }

    ShareUserDetails(data) {
        //sessionStorage.setItem('UserDetails', JSON.stringify(data));
        this.userDetail = data;
        //this.UserDetailsChangeObserver.next(JSON.stringify(data));
    }

    GetUserDetails() {
        //return JSON.parse(sessionStorage.getItem('UserDetails'));
        return this.userDetail;

    }
    GetSubmitResult() {
        return this.Searchresult;
    }
    SetSubmitResult(result) {
        this.Searchresult = result;
    }

    ClearSessionData() {
        sessionStorage.removeItem('UserDetails');
    }

    convertDate(str) {
        var parts = str.split("-");
        return new Date(parts[1] + "/" + parts[2] + "/" + parts[0]);
    }

    convertDBDate(str) {
        //str = str.replace(' 12:00:00 AM', '');
        str = str.split(' ')[0];
        var parts = str.split("-");
        return new Date(parts[1] + "/" + parts[0] + "/" + parts[2]);
    }

    convertddmmyyyyToyyyymmdd(str) {
        //str = str.replace(' 12:00:00 AM', '');
        str = str.split(' ')[0];
        var parts = str.split("-");
        var arr1 = parts[0].split("/");
        return (arr1[2] + "-" + arr1[0] + "-" + arr1[1]);
    }

    GetTodaysDateInYYYYMMDD() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        var DD; var MM; var YYYY;
        if (dd < 10)
            DD = '0' + dd;
        else
            DD = dd

        if (mm < 10)
            MM = '0' + mm;
        else
            MM = mm;

        YYYY = yyyy;
        var TodayDate = YYYY + '-' + MM + '-' + DD;
        return TodayDate;
    }

    setRoleData(){
        this.roleData = [
            {
                "fieldCount": 0,
                "affectedRows": 0,
                "insertId": 0,
                "serverStatus": 10,
                "warningCount": 0,
                "message": "",
                "protocol41": true,
                "changedRows": 0
            },
            {
                "fieldCount": 0,
                "affectedRows": 5,
                "insertId": 0,
                "serverStatus": 42,
                "warningCount": 0,
                "message": "&Records: 5  Duplicates: 0  Warnings: 0",
                "protocol41": true,
                "changedRows": 0
            },
            [
                {
                    "userID": 1,
                    "Role": 2,
                    "MemberName": "Deepak Kumar",
                    "EmailID": "deepak.kumar@secureexpert.in",
                    "PhNumber": 999999999
                },
                {
                    "userID": 2,
                    "Role": 3,
                    "MemberName": "Ajay Shanker",
                    "EmailID": "ajayjaishankar@gmail.com",
                    "PhNumber": 999999999
                },
                {
                    "userID": 3,
                    "Role": 4,
                    "MemberName": "Pachu Verma",
                    "EmailID": "pachchu@gmail.com",
                    "PhNumber": 999999999
                },
                {
                    "userID": 4,
                    "Role": 5,
                    "MemberName": "Rama Lingam",
                    "EmailID": "lingamani3005@gmail.com",
                    "PhNumber": 999999999
                },
                {
                    "userID": 5,
                    "Role": 6,
                    "MemberName": "Devdas Sharma",
                    "EmailID": "ds@lf.com",
                    "PhNumber": 7845784578
                }
            ],
            [
                {
                    "Role": 2,
                    "num": 1
                },
                {
                    "Role": 3,
                    "num": 1
                },
                {
                    "Role": 4,
                    "num": 1
                },
                {
                    "Role": 5,
                    "num": 1
                },
                {
                    "Role": 6,
                    "num": 1
                }
            ]
        ]
    }

   /* getRoleData(){
        return this.roleData;
    }


    setTestService(data){
        alert('service file '+data)
        this.testData = data
    }
    getTestService(){
        return this.testData
    }*/

    validatePopupForm(email, mobNo, role){        
        let message = []
        let section = []
        let status = true
        if(email === "" || email === null || email === undefined)
        {
            message.push("*Email cannot be empty.") 
            section.push("emailError")
            status = false
        }
        if(mobNo === "" || mobNo === null || mobNo === undefined)
        {
            message.push("*Phone Number cannot be empty.")
            section.push("numberError")
            status = false
        }
        if(role === "" || role === null || role === undefined || role.length === 0)        {
            message.push("*Select atleat one role")
            section.push("roleError")            
            status = false
        }
        return{
            status: status,
            message: message,
            section: section
        }
    }

    updateRoleMasterData(){
        this.GetDataFromApiPost(roleDataURL, null)
        .then((response)=>{  
            
            this.removeLoginUserData(response)
            
        })
    }

    removeLoginUserData(response){
        let email = cookies.get('userEmail')  
        let data = []
        response.data[1].forEach((obj,idx)=>{
          if(obj.Email_ID !== email){
            data.push(obj)
          }
        });
        let rawTableData = JSON.parse(JSON.stringify(data));
        store.dispatch({type:'CHANGE_TABLE_DATA', payload:rawTableData})        
        data = []
        response.data[0].forEach((obj,idx)=>{
          if(obj.Email_ID !== email){
            data.push(obj)
          }
        });
        let MasterRoletableData =JSON.parse(JSON.stringify(data));
        store.dispatch({type:'CHANGE_MASTER_ROLE_TABLE_DATA',payload:MasterRoletableData})        
       }



    async updateProviderDataList(){
        
        let rejson = await this.GetDataFromApiPostLogin(GetProviders, "")        
         return rejson;
    }
    
    async GetraceDataFromApiget(url,data) {
        let response = null;
        let Authtoken = sessionStorage.getItem("token");
      try{
            
         response =  await axios.post(
            url,
            data,
        {credentials: "omit",mode: 'cors', method: 'POST', headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': baseUrl,
         'Vary': 'Origin', 'Access-Control-Request-Method' : 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,Authorization','Authorization':'Bearer ' + Authtoken} }
        );
        if (!response.statusText.toLowerCase() === 'ok') {

                this.handleResponseError(response);

            }

            return response;

        }

        catch(error)
        {

                this.handleError(error);
                return response;
            }
    }
    updateRaceMasterData(){
        this.GetDataFromApiPost(leaderboardRace, null)
        .then((response)=>{  
            
            let rawTableData = response.data[0];
            store.dispatch({type:'TABLE_DATA_RACE', payload:rawTableData})  
            
        })
    }
    async GetWorkoutDataFromApiget(url,data) {
        let response = null;
        let Authtoken = sessionStorage.getItem("token");
      try{
            
         response =  await axios.post(
            url,
            data,
        {credentials: "omit",mode: 'cors', method: 'POST', headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': baseUrl,
         'Vary': 'Origin', 'Access-Control-Request-Method' : 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,Authorization','Authorization':'Bearer ' + Authtoken} }
        );
        if (!response.statusText.toLowerCase() === 'ok') {

                this.handleResponseError(response);

            }

            return response;

        }

        catch(error)
        {

                this.handleError(error);
                return response;
            }
    }
   

    async GetLeaderboardDataFromApiPost(url, data) {
        let response = null;
        let Authtoken = sessionStorage.getItem("token");
        try{            
         response =  await axios.post(
            url,
            data,
        {credentials: "omit",mode: 'cors', method: 'POST', headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': baseUrl,
         'Vary': 'Origin', 'Access-Control-Request-Method' : 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type,Authorization','Authorization':'Bearer ' + Authtoken} }
        );
        if (!response.statusText.toLowerCase() === 'ok') {
                this.handleResponseError(response);
            }
            return response;
        }
        catch(error)
        {
                this.handleError(error);
                return response;
            }
    }
    updateLeaderboardListMasterData(providerID){
        let data = {provider : providerID ,activity: null, group:null, gender: null, location:null}
    
        this.GetDataFromApiPost(leaderboardResultList, data)
        .then((response)=>{  
            
            let rawTableData = response.data[0];
            store.dispatch({type:'TABLE_LEADERRESULT_DATA', payload:rawTableData})  
            
        })
    }
    validateTimingPopupForm(raceName, runnerName, timing){        
        let message = []
        let section = []
        let status = true
        if(raceName === "" || raceName === null || raceName === undefined)
        {
            message.push("*Race Name cannot be empty.") 
            section.push("racenameError")
            status = false
        }
        if(runnerName === "" || runnerName === null || runnerName === undefined)
        {
            message.push("*Runner cannot be empty.")
            section.push("runnerError")
            status = false
        }
        if(timing === "" || timing === null || timing === undefined )        {
            message.push("*Select Timing")
            section.push("timingError")            
            status = false
         } 
         //if(raceurl === "" || raceurl === null || raceurl === undefined )        {
        //     message.push("*raceurl cannot be empty.")
        //     section.push("raceurlError")            
        //     status = false
        // }
        return{
            status: status,
            message: message,
            section: section
        }
    }
}

export default AppService;
