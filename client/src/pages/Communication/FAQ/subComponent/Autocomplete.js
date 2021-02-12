/* eslint-disable no-use-before-define */
import React from "react";
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

export default function UseAutocomplete() {
    const classes = useStyles();
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: 'use-autocomplete-demo',
    options: activityType,
    getOptionLabel: (option) => option.title,
  });
    return (
        <div>
            <div {...getRootProps()}>
                <input className="form-control" {...getInputProps()} placeholder="Select Topic" />
            </div>
            {groupedOptions.length > 0 ? (
            <ul className={classes.listbox} {...getListboxProps()}>
                {groupedOptions.map((option, index) => (
                <li {...getOptionProps({ option, index })}>{option.title}</li>
                ))}
            </ul>
            ) : null}
      </div>
  );
}
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const activityType = [
    { title: 'General', year: 1994 },
    { title: 'Training Program', year: 1972 },
    { title: 'Training Schedule', year: 1974 },
    { title: 'Training Location', year: 2008 },
    { title: 'Zomba', year: 1957 },
    { title: "Dance", year: 1993 },
  ];