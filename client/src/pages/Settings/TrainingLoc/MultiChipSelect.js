/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import Chip from "@material-ui/core/Chip";
import RemoveIcon from "@material-ui/icons/RemoveCircleOutlineSharp";
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function Tags() {
  const [val, setVal] = useState([]);

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
        options={roles}
        onChange={(e, newValue) => setVal(newValue)}
        getOptionLabel={option => option.title}
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
