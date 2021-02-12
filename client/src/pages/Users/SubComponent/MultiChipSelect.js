/* eslint-disable no-use-before-define */
import React,{ useState, useEffect, Component }from "react";
import Chip from "@material-ui/core/Chip";
import RemoveIcon from "@material-ui/icons/RemoveCircleOutlineSharp";
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete';
import store from '../../../store/index'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function Tags() {
  const [val, setVal] = useState([]);
  const [selectionData, setSelectionData] = useState([{ title: "", id: '', discription: ''}])
  const[checkUpdateData, setcheckUpdateData] = useState(true)
  const[rolesToRemove, setRolesToRemove] = useState([])


  useEffect(() => {      
      getRoleData()     
    },[]);

  const getRoleData = ()=>{   
   
    let rawData = store.getState().masterRoleTableData.totalRoleList 

     let k  = getPreviousRole();
     setVal(k)
   
   if(rawData){
    makeJson(rawData)  
  }
  }

  const getPreviousRole = ()=>{
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
    
    console.log(arr)
    setSelectionData(arr)
  }
  const clickHandeler = (event, newValue) => { 
     
    removeSameRole(newValue)       
    setVal(newValue)
  }
  const removeRoles = (delVal)=>{
    setRolesToRemove(prevArray => [...prevArray, delVal])  
  }
  useEffect(() => {
    store.dispatch({type:'CHANGE_REMOVE_ROLES', roles:rolesToRemove})
}, [rolesToRemove]);

useEffect(()=>{
  getRoleData()     
},[store.getState().masterRoleTableData.totalRoleList])
 
const removeSameRole=(newValue)=>{     
    let arrayToDelete = []    
   newValue.forEach(obj =>{
      rolesToRemove.forEach((obj2,idx)=>{
        if(obj2.id === obj.id)
        {
          rolesToRemove.splice(idx,1)
        }
      })
    })
    if(arrayToDelete.length > 0){
      arrayToDelete.forEach(obj=>{
        rolesToRemove.splice(obj, 1);
      })
    }
     
    store.dispatch({type:'CHANGE_REMOVE_ROLES', roles:rolesToRemove})
  }

  useEffect(() => {      
    store.dispatch({type:'CHANGE_SELECTED_ROLES', roles:val}) 
    // setTimeout(function() {
    //   console.log(store.getState().selectedRoles.roles)
    // }, 1000);
  },[val]);

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
    <div className="col-12 p-0">
      <Autocomplete
        multiple
        id="tags-standard"
        freeSolo
        filterSelectedOptions
        options={selectionData}
        // onChange={(e, newValue) => setVal(newValue)}
        getOptionLabel={option => option.title}
        onChange={(e, newValue) => clickHandeler(e, newValue)}
        renderTags={() => {}}
        value={val}
        renderInput={params => (
          <TextField
            {...params}
            variant="standard"
            placeholder="Select Weekday(s)"
            margin="normal"
            fullWidth
          />
        )}
      />
      <div className="selectedTags">{valHtml}</div>
    </div>
  );
}

const roles = [
  { title: "Sunday", id: 1, discription: '' },
  { title: "Monday", id: 2, discription: '' },
  { title: "Tuesday", id: 3, discription: '' },
  { title: "Wednesday", id: 4, discription: '' },
  { title: "Thursday", id: 5, discription: '' },
  { title: "Friday", id: 6, discription: '' },
  { title: "Saturday", id: 7, discription: '' }
];
