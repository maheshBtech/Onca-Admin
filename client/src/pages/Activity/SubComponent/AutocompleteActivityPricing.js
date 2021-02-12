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
  const [initVal, setInitVal] = useState({})

  // for one time activity type data bind
  useEffect(() => {
    setDataList(props.DataList)
    switch (props.name) {
      case 'TrainingLocationID':
        let a = props.DataList.filter(row => row.City_ID === props.value)
        setInitVal(a[0])
        break;
      default:
        return {}
    }
  }, [props.DataList, props.value])

  const getOptionLabelValue = (option) => {
    if (props.ACType === 'Activity Location') {
      return option.City_Name
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
    value: initVal,
    getOptionLabel: (option) => getOptionLabelValue(option),
    onChange: (event) => {
      console.log(event.target.textContent)
      props.handleALChange(event.target.textContent, props.ItemId)
    }
  });
  return (
    <div>
      <div {...getRootProps()}>
        <input className="form-control" {...getInputProps()} placeholder={`select ${props.ACType}`} />
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
