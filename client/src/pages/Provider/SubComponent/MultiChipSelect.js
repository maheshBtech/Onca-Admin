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
    <div style={{ width: 500 }}>
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
            placeholder="Select Role"
            margin="normal"
            fullWidth
          />
        )}
      />
      <div className="selectedTags">{valHtml}</div>
      <div className="roleDiscription">
          <p>
            Marketing - has read-write access to all, including Root and Admin Roles.
          </p>
      </div>
    </div>
  );
}

const roles = [
  { title: "Admin", id: 1, discription: '' },
  { title: "Marketing", id: 2, discription: 'Marketing - has read-write access to all, including Root and Admin Roles.'  },
  { title: "Support", id: 3, discription: 'Support - has read-write access to all, including Root and Admin Roles.'  }
];
