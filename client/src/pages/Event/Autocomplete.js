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

  // for one time Event type data bind
  useEffect(() => {
    setDataList(props.DataList)
    let a;
    switch (props.name) {
      case 'EventType':
        a = props.DataList.filter(row => row.Event_Type_ID === props.value)
        break;
      // case 'EventAssignGroup':
      //   a = props.DataList.filter(row => row.Group_Set_ID === props.value)
      //   break;
      case 'EventCountry':
        a = props.DataList.filter(row => row.Country_ID === props.value)
        break;
      case 'EventState':
        a = props.DataList.filter(row => row.State_ID === props.value)
        break;
      case 'EventCity':
        a = props.DataList.filter(row => row.City_ID === props.value)
        break;
      case 'EventECertificateTemplate':
        a = props.DataList.filter(row => row.id === props.value)
        break;
      case 'EventRegistrationTemplate':
        a = props.DataList.filter(row => row.Template_Type_ID === props.value)
        break;
      case 'EventRegSuccessMailTemplate':
        a = props.DataList.filter(row => row.Template_Type_ID === props.value)
        break;
      case 'EventRegFailMailTemplate':
        a = props.DataList.filter(row => row.Template_Type_ID === props.value)
        break;
      default:
        return {}
    }
    let b = a[0];
    setInitVal(b)
  }, [props.DataList, props.value])

  const getOptionLabelValue = (option) => {
    if (props.name === 'EventType') {
      return option.Event_Type_Name
    }
    // else if (props.name === 'EventAssignGroup') {
    //   return option.Group_Set_Name
    // }
    else if (props.name === 'EventCountry') {
      return option.Country_Name
    }
    else if (props.name === 'EventState') {
      return option.State_Name
    }
    else if (props.name === 'EventCity') {
      return option.City_Name
    }
    else if (props.name === 'EventECertificateTemplate') {
      return option.label
    }
    else if (props.name === 'EventRegistrationTemplate') {
      return option.Template_Type_Name
    }
    else if (props.name === 'EventRegSuccessMailTemplate') {
      return option.Template_Type_Name
    }
    else if (props.name === 'EventRegFailMailTemplate') {
      return option.Template_Type_Name
    }
  }
  const returnIdofSelected = (value) => {
    if (value !== null) {
      switch (props.name) {
        case 'EventType':
          return value.Event_Type_ID
        // case 'EventAssignGroup':
        //   return value.Group_Set_ID
        case 'EventCountry':
          return value.Country_ID
        case 'EventState':
          return value.State_ID
        case 'EventCity':
          return value.City_ID
        case 'EventECertificateTemplate':
          return value.id
        case 'EventRegistrationTemplate':
          return value.Template_Type_ID
        case 'EventRegSuccessMailTemplate':
          return value.Template_Type_ID
        case 'EventRegFailMailTemplate':
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
