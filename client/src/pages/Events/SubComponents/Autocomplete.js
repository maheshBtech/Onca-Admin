/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import useAutocomplete from '@material-ui/lab/useAutocomplete';
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

  // for one time activity type data bind
  useEffect(() => {
    setDataList(props.DataList)
  }, [props.DataList])

  const getOptionLabelValue = (option) => {
    if(props.name === 'activityType'){
      return option.Activity_Type_Name
    }
    else if(props.name === 'activityAssignGroup'){
      return option.Group_Set_Name
    }
    else if(props.name === 'activityCountry'){
      return option.Country_Name
    }
    else if(props.name === 'activityState'){
      return option.State_Name
    }
    else if(props.name === 'activityCity'){
      return option.City_Name
    }
    else if(props.name === 'activityECertificateTemplate'){
      return option.label
    }
    else if(props.name === 'activityRegistrationTemplate'){
      return option.label
    }
    else if(props.name === 'activityRegSuccessMailTemplate'){
      return option.label
    }
    else if(props.name === 'activityRegFailMailTemplate'){
      return option.label
    }
  }
  const returnIdofSelected = (value) => {
    if(props.name === 'activityType'){
      return value.Activity_Type_ID
    }
    else if(props.name === 'activityAssignGroup'){
      return value.Group_Set_ID
    }
    else if(props.name === 'activityCountry'){
      return value.Country_ID
    }
    else if(props.name === 'activityState'){
      return value.State_ID
    }
    else if(props.name === 'activityCity'){
      return value.City_ID
    }
    else if(props.name === 'activityECertificateTemplate'){
      return value.id
    }
    else if(props.name === 'activityRegistrationTemplate'){
      return value.id
    }
    else if(props.name === 'activityRegSuccessMailTemplate'){
      return value.id
    }
    else if(props.name === 'activityRegFailMailTemplate'){
      return value.id
    }
  }
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: 'use-autocomplete-demo',
    options: dataList,
    getOptionLabel: (option) => getOptionLabelValue(option),
    onChange: (option, value) => {
      props.handleACChange(returnIdofSelected(value), props.name)
    }
  });
  return (
    <div>
      <div {...getRootProps()}>
        <input className="form-control" {...getInputProps()} placeholder={`Select ${props.ACType}`} />
      </div>
      {groupedOptions.length > 0 ? (
        <ul className={classes.listbox} {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li {...getOptionProps({ option, index })}>{getOptionLabelValue(option)}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
