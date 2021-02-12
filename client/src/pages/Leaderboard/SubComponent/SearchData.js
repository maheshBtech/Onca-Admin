import React from 'react';
import {  Input } from "reactstrap";

///Using hooks to set the data for the CSV Download and search
const SearchData = (props) => {
    

    return (
    <Input 
      className="search-elem"
      type="text" 
      id="searchData"
      placeholder={"Search..."} 
      onChange={props.searchAnything}
    />);
    
  }
  
  export default SearchData;