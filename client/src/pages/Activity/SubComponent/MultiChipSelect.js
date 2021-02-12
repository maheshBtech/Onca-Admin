/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import Chip from "@material-ui/core/Chip";
import RemoveIcon from "@material-ui/icons/RemoveCircleOutlineSharp";
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete';
import AppService from '../../../AppService';
const appService = new AppService();

export default function Tags(props) {
  const [val, setVal] = useState([]);
  const [data, setData] = useState();
  const [placeholder, setPlaceolder] = useState();
  // api call
  useEffect(() => {
    if (props.name === 'activityWeekDays') {
      setPlaceolder('Activity Week Days');
      if (props.value.length > 0 && props.DataList.length > 0) {
        setVal(props.value)
        let temp = props.DataList
        props.value.forEach(elem => {
          let temptemp = temp.filter(obj => obj.Week_Day !== elem.Week_Day)
          temp = temptemp
        })
        setData(temp);
      }
      else {
        setData(props.DataList);
      }
    }
    else if (props.name === 'activityTrainingLocation') {
      setPlaceolder('Activity Training Location');
      if (props.value.length > 0 && props.DataList.length > 0) {
        let temp = props.DataList
        let tempTwo = props.DataList
        let temptempTwo = []
        props.value.forEach(elem => {
          let temptemp = temp.filter(obj => obj.Training_Location_ID.toString() !== elem.toString())
          temp = temptemp
          let a = tempTwo.filter(obj => obj.Training_Location_ID.toString() === elem.toString())
          temptempTwo.push(a[0])
        })
        setData(temp);
        setVal(temptempTwo)
      }
      else {
        setData(props.DataList);
      }
    }
  }, [props.DataList, props.value])

  const removeChip = (option) => {
    /// to add the chip back in ddl
    let tempdata = [];
    data.length !== 0? tempdata=data: tempdata=[];
    if (props.name === 'activityWeekDays'){
      if(!data.some(day => day.Week_Day === option.Week_Day)){
        tempdata.push(option)
      }
    }
    else if(props.name === 'activityTrainingLocation'){
      if(!data.some(day => day.Training_Location_Name === option.Training_Location_Name)){
        tempdata.push(option)
      }
    }
    setData(tempdata)
  }

  const valHtml = val.map((option, index) => {
    // This is to handle new options added by the user (allowed by freeSolo prop).
    if (props.name === 'activityWeekDays') {
      const label = option.Week_Day || option;
      return (
        <Chip
          key={label}
          label={label}
          deleteIcon={<RemoveIcon />}
          onDelete={() => {
            removeChip(option);
            setVal(val.filter(entry => entry !== option));
            let a = val;
            props.handleMCSChange(a.filter(entry => entry !== option))
          }}
        />
      );
    }
    else if (props.name === 'activityTrainingLocation') {
      const label = option.Training_Location_Name || option;
      return (
        <Chip
          key={label}
          label={label}
          deleteIcon={<RemoveIcon />}
          onDelete={() => {
            removeChip(option);
            setVal(val.filter(entry => entry !== option));
            let a = val;
            props.handleMCSChange(a.filter(entry => entry !== option))
          }}
        />
      );
    }
  });

  const getOptionLabelValue = (option) => {
    if (props.name === 'activityWeekDays') {
      return option.Week_Day
    }
    else if (props.name === 'activityTrainingLocation') {
      return option.Training_Location_Name
    }
  }

  return (
    <div className="col-12 p-0">
      <Autocomplete
        multiple
        id="tags-standard"
        freeSolo
        filterSelectedOptions
        options={data}
        onChange={(e, newValue) => { setVal(newValue); props.handleMCSChange(newValue) }}
        getOptionLabel={option => getOptionLabelValue(option)}
        renderTags={() => { }}
        value={val}
        renderInput={params => (
          <TextField
            {...params}
            variant="standard"
            placeholder={`Select ${placeholder}`}
            margin="normal"
            fullWidth
          />
        )}
      />
      <div className="selectedTags">{valHtml}</div>
    </div>
  );
}


