import React from 'react';
import CsvDownload from 'react-json-to-csv';

///Using hooks to set the data for the CSV Download and search
const CSVDataDownload = (props) => {
    
    return (<CsvDownload 
    className="file-dwd ml-3" 
    data={props.UserTypeListToDownload}
    filename={"UserType.csv"}
    />);
     
  }
  
  export default CSVDataDownload;