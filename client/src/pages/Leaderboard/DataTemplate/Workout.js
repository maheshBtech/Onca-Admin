import React, { Component, useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Input } from "reactstrap";
import DataTable, { createTheme } from 'react-data-table-component';
import WorkoutFilter from '../SubComponent/WorkoutFilter';
import CsvDataDownload from '../SubComponent/CSVDataDownload';
import SearchData from '../SubComponent/SearchData';
import { connect } from 'react-redux';
import CsvDownload from 'react-json-to-csv'
import {
  Card,
  Row,
  Col,
  CardBody,
  CardHeader,
  Label
} from "reactstrap";

var workoutLeaderboardList = [];
const WorkoutData = [
  {
    Name: 'CSS',
    EmailID: 'cssomashekar@gmail.com',
    ActivityName: 'Dilse2 2020',
    GroupName: 'Dilse2 2020 Indira',
    Percentage: '100%',
    Workout: '3/3',
  },
  {
    Name: 'Sivaprasad',
    EmailID: 'tpt.siva@gmail.com',
    ActivityName: 'Dilse2 2020',
    GroupName: 'Dilse2 2020 Indira',
    Percentage: '75%',
    Workout: '12/16',
  },
  {
    Name: 'Vidyashankar',
    EmailID: 'shankarvidya11@yahoo.com',
    ActivityName: 'Dilse2 2020',
    GroupName: 'Dilse2 2020 Indira',
    Percentage: '75%',
    Workout: '18/24',
  },
  {
    Name: 'HT Venkatesha',
    EmailID: 'htvblr@gmail.com',
    ActivityName: 'Dilse2 2020',
    GroupName: 'Dilse2 2020 Indira',
    Percentage: '70.59%',
    Workout: '12/17',
  },
  {
    Name: 'Dhananjaya G',
    EmailID: 'dhanadarshil@gmail.com',
    ActivityName: 'Dilse2 2020',
    GroupName: 'Dilse2 2020 Indira',
    Percentage: '66.67%',
    Workout: '18/27',
  }
];
const headerStyle = {
  headCells: {
    style: {
      backgroundColor: "#EDECEC",
    },
  },
};
const columns = [
  {
    name: 'Name',
    selector: 'First_Name',
    sortable: true,
    wrap: true,
  },
  {
    name: 'Email ID',
    selector: 'Email_ID',
    sortable: true,
    wrap: true,
    width: '20%',
  },
  {
    name: 'Activity Name',
    selector: 'Activity_Name',
    sortable: true,
    wrap: true
  },
  {
    name: 'Group Name',
    selector: 'Group_Name',
    sortable: true,
    wrap: true,
  },
  {
    name: 'Percentage',
    selector: 'Percentage',
    sortable: true
  },
  {
    name: 'Workout',
    selector: 'Workouts',
    sortable: true,
  }
];
function Workout(props) {

  const [rawTableData, setrawTableData] = useState();
  const [toCSV, setToCSV] = useState(null)
  const [filteredDataForTable, setFilteredDataForTable] = useState(rawTableData)


  useEffect(() => {
  
    if (props.workoutTableData !== "" && props.workoutTableData !== null) {
      let workoutData = props.workoutTableData
      workoutData.map((item, index) => {
        let First_Name = item.First_Name + " " + item.Last_Name

        workoutData[index].First_Name = First_Name;

      })
      setrawTableData(props.workoutTableData)
      console.log(rawTableData)
      setFilteredDataForTable(props.workoutTableData)
      console.log(filteredDataForTable)
      prepareFileToDownload(props.workoutTableData)
    }

    console.log(props.workoutTableData);

  }, [props.workoutTableData]);



  const prepareFileToDownload = (rawData) => {

    if ((rawData !== "" || rawData !== undefined || rawData !== null) && rawData.length > 0) {
      let filterData = []
      rawData.forEach(obj => {
        filterData.push({ "Name": obj.First_Name, "Email ID": obj.Email_ID, "Activity Name": obj.Activity_Name, "Group Name": obj.Group_Name, "Percentage": obj.Percentage, "Workout": obj.Workouts })
      })
      setToCSV(filterData)
    }
  }

  const searchAnything = () => {
    let thingToSearch = document.getElementById("searchData").value;
    let filterDataToShow = []
    if (thingToSearch == "") {
      setFilteredDataForTable(rawTableData)
      prepareFileToDownload(rawTableData)
    }
    else {
      rawTableData.forEach(obj => {
        if (obj.First_Name.toLowerCase().includes(thingToSearch.toLowerCase()) || obj.Email_ID.toLowerCase().includes(thingToSearch.toLowerCase()) || obj.Activity_Name.toLowerCase().includes(thingToSearch.toLowerCase()) || obj.Group_Name.toLowerCase().includes(thingToSearch.toLowerCase()) || obj.Percentage.includes(thingToSearch.toLowerCase()) || obj.Workouts.includes(thingToSearch.toLowerCase())) {
          filterDataToShow.push(obj)
        }
      });
      setFilteredDataForTable(filterDataToShow)
      prepareFileToDownload(filterDataToShow)
    }

  }


  return (
    <React.Fragment>
      <WorkoutFilter />
      <Card className="mini-stat">
        <CardHeader className="bl-bg">
          <Link to="#" className="text-white">
            <b>Workout Leaderboard List</b>
          </Link>
          <span className="float-right">
            <Input
              className="search-elem"
              type="text"
              id="searchData"
              placeholder={"Search..."}
              onChange={() => { searchAnything() }}
            />
            <CsvDownload
              className="file-dwd ml-3"
              data={toCSV}
              filename={"Workout_Data.csv"}
            />
          </span>
        </CardHeader>
        <CardBody>
          <DataTable
            className="data-table"
            columns={columns}
            data={filteredDataForTable}
            noHeader={true}
            customStyles={headerStyle}
            fixedHeader
            fixedHeaderScrollHeight="300px"
            pagination
          />
        </CardBody>
      </Card>
    </React.Fragment>
  )

}
const mapStatetoProps = state => {
  return {
    workoutTableData: state.workoutData != undefined ? state.workoutData.tableData : null,
  };
};

export default withRouter(connect(mapStatetoProps, null)(Workout));
