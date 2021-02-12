/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  listbox: {
    width: '95.5%',
    margin: 0,
    padding: '5px 10px',
    zIndex: 1,
    position: 'absolute',
    listStyle: 'none',
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    maxHeight: 200,
    borderRadius: '0 0 4px 4px',
    border: '1px solid rgba(0,0,0,.25)',
    '& li[data-focus="true"]': {
      backgroundColor: '#4a8df6',
      color: 'white',
      cursor: 'pointer',
    },
    '& li:active': {
      backgroundColor: '#2977f5',
      color: 'white',
    },
  },
}));

export default function UseAutocomplete(props) {
  const classes = useStyles();
  const [dataList, setDataList] = useState([])
  const [initVal, setInitVal] = useState({})

  // for one time activity type data bind
  useEffect(() => {
    setDataList(props.DataList)
    let a;
    switch (props.name) {
      case 'activityType':
        a = props.DataList.filter(row => row.Activity_Type_ID === props.value)
        break;
      case 'activityAssignGroup':
        a = props.DataList.filter(row => row.Group_Set_ID === props.value)
        break;
      case 'activityCountry':
        a = props.DataList.filter(row => row.Country_ID === props.value)
        break;
      case 'activityState':
        a = props.DataList.filter(row => row.State_ID === props.value)
        break;
      case 'activityCity':
        a = props.DataList.filter(row => row.City_ID === props.value)
        break;
      case 'activityECertificateTemplate':
        a = props.DataList.filter(row => row.id === props.value)
        break;
      case 'activityRegistrationTemplate':
        a = props.DataList.filter(row => row.Template_Type_ID === props.value)
        break;
      case 'activityRegSuccessMailTemplate':
        a = props.DataList.filter(row => row.Template_Type_ID === props.value)
        break;
      case 'activityRegFailMailTemplate':
        a = props.DataList.filter(row => row.Template_Type_ID === props.value)
        break;
      default:
        return {}
    }
    let b = a[0];
    setInitVal(b)
  }, [props.DataList, props.value])

  const getOptionLabelValue = (option) => {
    if (props.name === 'activityType') {
      return option.Activity_Type_Name
    }
    else if (props.name === 'activityAssignGroup') {
      return option.Group_Set_Name
    }
    else if (props.name === 'activityCountry') {
      return option.Country_Name
    }
    else if (props.name === 'activityState') {
      return option.State_Name
    }
    else if (props.name === 'activityCity') {
      return option.City_Name
    }
    else if (props.name === 'activityECertificateTemplate') {
      return option.label
    }
    else if (props.name === 'activityRegistrationTemplate') {
      return option.Template_Type_Name
    }
    else if (props.name === 'activityRegSuccessMailTemplate') {
      return option.Template_Type_Name
    }
    else if (props.name === 'activityRegFailMailTemplate') {
      return option.Template_Type_Name
    }
  }
  const returnIdofSelected = (value) => {
    if (value !== null) {
      switch (props.name) {
        case 'activityType':
          return value.Activity_Type_ID
        case 'activityAssignGroup':
          return value.Group_Set_ID
        case 'activityCountry':
          return value.Country_ID
        case 'activityState':
          return value.State_ID
        case 'activityCity':
          return value.City_ID
        case 'activityECertificateTemplate':
          return value.id
        case 'activityRegistrationTemplate':
          return value.Template_Type_ID
        case 'activityRegSuccessMailTemplate':
          return value.Template_Type_ID
        case 'activityRegFailMailTemplate':
          return value.Template_Type_ID
        default:
          return null
      }
    }
    else {
      return 0
    }
  }
  return (
    initVal !== undefined ? 
    <Autocomplete
      className="d-block w-100"
      options= {dataList}
      onChange={(event, value) => {props.handleACChange(returnIdofSelected(value), props.name)}}
      value={initVal}
      //defaultValue={props.DataList[2]}
      getOptionLabel={(option) => getOptionLabelValue(option)}
      id={props.ACType}
      renderInput={(params) => (
        <div ref={params.InputProps.ref}>
          <input type={props.ACType} placeholder={`Select ${props.ACType}`} id="act" type="text" {...params.inputProps} />
        </div>
      )} />
      :
      <Autocomplete
      className="d-block w-100"
      options= {dataList}
      onChange={(event, value) => {props.handleACChange(returnIdofSelected(value), props.name)}}
      getOptionLabel={(option) => getOptionLabelValue(option)}
      id={props.ACType}
      renderInput={(params) => (
        <div ref={params.InputProps.ref}>
          <input type={props.ACType} placeholder={`Select ${props.ACType}`} id="act" type="text" {...params.inputProps} />
        </div>
      )} />
  );
}
