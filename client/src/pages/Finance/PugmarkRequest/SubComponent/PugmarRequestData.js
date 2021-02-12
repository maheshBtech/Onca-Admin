
// import React, {useState, useEffect, Component } from 'react';
// import { withRouter, Link } from 'react-router-dom';
// import { Row, Col, Label, Input, } from "reactstrap";
// import { Card, CardBody, CardHeader, Button } from "reactstrap";
// import DataTable from 'react-data-table-component';
// import { connect } from "react-redux";
// const roleData = [
//   {
//     id: 1,
//     UserName: 'Srinidhi',
//     EmaiID: 'Vnsrinidhi@yahoo.com',
//     PhNumber: 9008707172,
//     StatusUpdBy: 'Navya Shankar',
//     TrainingLoc: 'BLR',
//     Pugmark: 0,
//     ReqDateandTime: '2020-09-21 13:47:23',
//     AddedBy: "ONCA Orders",
//     ReferralName: "Buddy Referral",
//     ReferralActiviti: "BRUR FOR JJS",
//     ReqBy: "Deepak Kumar"
//   }
// ];
// const headerStyle = {
//   rows: {
//     style: {
//       minHeight: '115px', // override the row height
//     }
//   },
//   headCells: {
//     style: {
//       backgroundColor: "#EDECEC",
//     },
//   },
// };
// const columns = [
//   {
//     name: 'User Details',
//     selector: 'UserDetails',
//     sortable: true,
//     wrap: true,
//     width: '25%',
//     cell: (row) => <div><p className={'m-0'}>{row.User_Name}</p><p className={'m-0'}>{row.Email_ID}</p><p className={'m-0'}>{row.Telephone_No}</p><p className={'m-0'}>{row.abc}</p></div>,
//   },
//   {
//     name: 'Pugmark',
//     selector: 'Pugmarks',
//     sortable: true,
//     width: '7%',
//   },
//   {
//     name: 'Requested By',
//     selector: 'Reason_Text',
//     sortable: true,
//     wrap: true,
//     wrap: true,
//     width: '15%'

//   },
//   {
//     name: 'Requested Date',
//     selector: 'Requested_Date',
//     sortable: true,
//     wrap: true,
//     width: '14%'

//   },
//   {
//     name: 'Status Changed By',
//     selector: 'Reason_Text',
//     sortable: true,
//     wrap: true,
//     wrap: true,
//     width: '17%'

//   },
//   {
//     name: 'Reason',
//     selector: 'Reason_Text',
//     sortable: true,
//     wrap: true,
//     wrap: true,
//     cell: (row) => <div><p className={'m-0'}>{row.ReferralName}</p><p className={'m-0'}>({row.Reason_Text} / </p><p className={'m-0'}>{row.ReqBy})</p></div>
//   },
//   {
//     name: 'Action',
//     cell: (row) =>
//       <div className="col-12">
//         <Button className="mb-1 btn update-btn" >
//           Approve
//       </Button>
//       <Button className="mb-2 btn">
//           Reject
//       </Button>
//       <Button className="mb-2 btn">
//           More
//       </Button>
//       </div>
//     ,
//     button: true,
//   },
// ];

// // const columns = [
// //   {
// //     name: 'User Details',
// //     selector: 'User_Name',
// //     sortable: true,
// //     wrap: true,
// //     width: '25%',
// //     // cell: (row) => <div><p className={'m-0'}>{row.User_Name}</p><p className={'m-0'}>{row.Email_ID}</p><p className={'m-0'}>{row.Telephone_No}</p><p className={'m-0'}>{row.Telephone_No}</p></div>,
// //   },
// //   {
// //     name: 'Pugmark',
// //     selector: 'Pugmarks',
// //     sortable: true,
// //     width: '7%',
// //   },
// //   {
// //     name: 'Requested By',
// //     selector: 'Reason_Text',
// //     sortable: true,
// //     wrap: true,
// //     wrap: true,
// //     width: '15%'

// //   },
// //   {
// //     name: 'Requested Date',
// //     selector: 'Requested_Date',
// //     sortable: true,
// //     wrap: true,
// //     width: '14%'

// //   },
// //   {
// //     name: 'Status Changed By',
// //     selector: 'Reason_Text',
// //     sortable: true,
// //     wrap: true,
// //     wrap: true,
// //     width: '17%'

// //   },
// //   {
// //     name: 'Reason',
// //     selector: 'Reason_Text',
// //     sortable: true,
// //     wrap: true,
// //     wrap: true,
// //     // cell: (row) => <div><p className={'m-0'}>{row.ReferralName}</p><p className={'m-0'}>({row.ReferralActiviti} / </p><p className={'m-0'}>{row.ReqBy})</p></div>
// //   },
// //   {
// //     name: 'Action',
// //     cell: (row) =>
// //       <div className="col-12">
// //         <Button className="mb-1 btn update-btn">
// //           Approve
// //       </Button>
// //       <Button className="mb-2 btn">
// //           Reject
// //       </Button>
// //       <Button className="mb-2 btn">
// //           More
// //       </Button>
// //       </div>
// //     ,
// //     button: true,
// //   },
// // ];
// function PugmarkRequestData(props) {
 
//   const [rawTableData, setrawTableData] = useState([]);
//   const [filteredDataForTable, setFilteredDataForTable] = useState(rawTableData)
 


//   useEffect(() => {  

// if(props.PMRequesttableData != ""){
//     setrawTableData(props.PMRequesttableData)
//     console.log(rawTableData)
//     console.log(props.PMRequesttableData)
//     setFilteredDataForTable(props.PMRequesttableData)
//     console.log(filteredDataForTable);
// }
// }, [props.PMRequesttableData]);

// // const searchAnything = () => {
// //   let thingToSearch = document.getElementById("searchData").value;
// //   let filterDataToShow = []
// //   if (thingToSearch == "") {
// //       setFilteredDataForTable(rawTableData)
     
// //   }
// //   else {
// //       rawTableData.forEach(obj => {
// //           if (obj.Fitness_Event_Name.toLowerCase().includes(thingToSearch.toLowerCase()) || obj.Fitness_Event_Type.toLowerCase().includes(thingToSearch.toLowerCase()) || obj.Date.toString().toLowerCase().includes(thingToSearch.toLowerCase()) || obj.Duration_In_Hours.toString().includes(thingToSearch) ) {
// //               filterDataToShow.push(obj)
// //           }
// //       });
// //       setFilteredDataForTable(filterDataToShow)
     
// //   }

// // }
//     return (
//       <React.Fragment>
//         <div className="container-fluid">
//           <Row className="align-items-center">
//             <Col sm={6}>
//               <div className="page-title-box">
//                 <ol className="breadcrumb mb-0">
//                   <li className="breadcrumb-item">
//                     <Link to="#"> Finance</Link>
//                   </li>
//                   <li className="breadcrumb-item active">
//                     PugMarks Statement
//                                 </li>
//                 </ol>
//               </div>
//             </Col>
//           </Row>
//           <Row>
//             <Col xl={12} className="text-right mb-4">
//               <Link to="/add-pugmark">
//                 <span role="button" className="btn update-btn font ml-3">
//                   Add Pugmark
//                             </span>
//               </Link>
//             </Col>
//           </Row>
//           <Row>
//             <Col xl={12}>
//               <Card className="mini-stat">
//                 <CardHeader className="bl-bg">
//                   <Link to="#" className="text-white">
//                     <b>PugMarks Statement</b>
//                   </Link>
//                   <span className="float-right">
//                     <Input
//                       className="search-elem"
//                       type="text"
//                       id="searchData"
//                       placeholder={"Search..."}
//                       // onChange={(event) => { this.searchAnything(event) }}
//                     />
//                   </span>
//                 </CardHeader>
//                 <CardBody>
//                 <DataTable
//                             className="data-table"
//                             columns={columns}
//                             data={filteredDataForTable}
//                             noHeader={true}
//                             customStyles={headerStyle}
//                             fixedHeader
//                             fixedHeaderScrollHeight="400px"
//                             pagination
//                         />
                   
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//         </div>
//       </React.Fragment>
//     )
  
// }
// const mapStatetoProps = state => {

//   return {  
  
//     PMRequesttableData :state.PugMarkRequestResult !=undefined ? state.PugMarkRequestResult.tableData :""
  
//   };
// };
// const dispatchToProps = dispatch => {
//   return {
//       updateTableData: (type, payload) => {
//           dispatch({ type: type, payload: payload })
//       }
//   }
// }
// export default withRouter(connect(mapStatetoProps, dispatchToProps)(PugmarkRequestData));

// // export default withRouter(PugmarkRequestData);