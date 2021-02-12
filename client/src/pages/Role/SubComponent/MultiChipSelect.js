/* eslint-disable no-use-before-define */
import React,{ useState, useEffect, Component }from "react";
import Chip from "@material-ui/core/Chip";
import RemoveIcon from "@material-ui/icons/RemoveCircleOutlineSharp";
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete';
import AppService from '../../../AppService'
import {listRoleURL} from '../../../AppConfig'
import store from '../../../store/index'
import { connect } from "react-redux";

export default function Tags(props) {
  const [val, setVal] = useState([]);
  const appService  = new AppService();
  const [firstRun, setFirstRun] = useState(false)
  const [selectionData, setSelectionData] = useState("")
  const[checkUpdateData, setcheckUpdateData] = useState(true)
  const[rolesToRemove, setRolesToRemove] = useState([])

  
  useEffect(() => {      
     
    if(firstRun === false){
      getRoleData()     
    } 

    },[]);
    
    useEffect(() => {    
        
      if(checkUpdateData){         
     let storeData = store.getState().rolePopupData    
     if(Object.keys(storeData)){
      setcheckUpdateData(false)
      updateValueOfSelector(storeData.popupData)
     }
      
     }    
      });
  
      const updateValueOfSelector = (vals)=>{
         
        if(vals !== ""){
        let newVal = vals.roles
        setVal(newVal)
      }
      }

  const getRoleData = ()=>{
    setFirstRun(true)
    console.log(store.getState())
    let rawData = store.getState().masterRoleTableData.totalRoleList
    makeJson(rawData)  
  }

  const makeJson = (rawData)=>{         
    let arr = []
    let provider = store.getState().userProfileData.providerName
    let onlyRole = []

    rawData.forEach(obj => { 
     
      if(provider.toLowerCase().includes('onca')){
      if(obj.Role_Name.toLowerCase().includes('onca')){
      arr.push({ title: obj.Role_Name, id: obj.Role_ID, discription: obj.Role_Desc })
    }}
        else{
          if(!obj.Role_Name.toLowerCase().includes('onca')){
            arr.push({ title: obj.Role_Name, id: obj.Role_ID, discription: obj.Role_Desc })          
        }
      }});   
    
    if(props.clickType){
      arr.forEach(obj=>{
        if(obj.title.toLowerCase().includes(props.clickType))
        {onlyRole.push(obj)}
      })
      arr = onlyRole
    } 
    
    console.log(arr)
    setSelectionData(arr)
  }

  const clickHandeler = (event, newValue) => { 
    
    removeSameRole(newValue)       
    setVal(newValue)
  }
  useEffect(() => {   
    console.log(val)  
    store.dispatch({type:'CHANGE_SELECTED_ROLES', roles:val}) 
  },[val]);

  const removeRoles = (delVal)=>{
    setRolesToRemove(prevArray => [...prevArray, delVal])  
    
  }
  useEffect(() => {
    store.dispatch({type:'CHANGE_REMOVE_ROLES', roles:rolesToRemove})
}, [rolesToRemove]);

  const removeSameRole=(newValue)=>{
     
    let arrayToDelete = []    
   newValue.forEach(obj =>{
      rolesToRemove.forEach((obj2,idx)=>{
        if(obj2.id === obj.id)
        {
          arrayToDelete.push(idx)
        }
      })
    })
    if(arrayToDelete.length > 0){
      arrayToDelete.forEach(obj=>{
        rolesToRemove.splice(obj, 1);
      })
    }
    store.dispatch({type:'CHANGE_REMOVE_ROLES', roles:arrayToDelete})
  }

  const valHtml = val.map((option, index) => {
    // This is to handle new options added by the user (allowed by freeSolo prop).
    const label = option.title || option;
    return (
      <Chip
        key={label}
        label={label}
        deleteIcon={<RemoveIcon />}
        onDelete={() => {
          setVal(val.filter(entry => entry !== option));
          removeRoles(option);
        }}        
      />
    );
  });

  return (
    <div style={{ width: 500 }}>
      <Autocomplete
        multiple
        id="tags-standard"
        freeSolo
        filterSelectedOptions
        options={selectionData}
        /*onChange={(e, newValue) => setVal(newValue)}*/
        onChange={(e, newValue) => clickHandeler(e, newValue)}
        getOptionLabel={option => option.title}
        renderTags={() => {}}
        value={val}        
        renderInput={params => (
          <TextField
            {...params}
            variant="standard"
            placeholder="Select Role"
            margin="normal"
            fullWidth
          />
        )}
      />
    <div className="selectedTags">{valHtml}</div>
     { 
     val.map((item, i) => <div className="role-desc">{item.title}: {item.discription}</div>)
     }      
    </div>
  );
}

const roles = [
  { title: "Admin", id: 1, discription: '' },
  { title: "Marketing", id: 2, discription: 'Marketing - has read-write access to all, including Root and Admin Roles.'  },
  { title: "Support", id: 3, discription: 'Support - has read-write access to all, including Root and Admin Roles.'  }
];