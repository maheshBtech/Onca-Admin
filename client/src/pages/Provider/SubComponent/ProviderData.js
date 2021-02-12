import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Button, Input } from "reactstrap";
import DataTable from 'react-data-table-component';
import AppService from "../../../AppService";
import { GetProviders, providerActivateOrDeactive } from "../../../AppConfig";
import { connect } from "react-redux";
import store from '../../../store';
import CsvDownload from 'react-json-to-csv'
import SweetAlert from "react-bootstrap-sweetalert";

const appService = new AppService();

const headerStyle = {
  rows: {
    style: {
      minHeight: '110px', // override the row height
    }
  },
  headCells: {
    style: {
      backgroundColor: "#EDECEC",
    },
  },
};
const columns = [
  {
    name: 'Provider Name',
    selector: 'ProviderName',
    sortable: true,
    maxWidth: "20%"
  },
  {
    name: 'Contact Name',
    selector: 'ContactName',
    sortable: true,
    maxWidth: "20%"
  },
  {
    name: 'Email ID',
    selector: 'EmailID',
    sortable: true,
    maxWidth: "20%"
  },
  {
    name: 'Phone Number',
    selector: 'PhNumber',
    sortable: true,
    maxWidth: "20%"
  },
  {
    name: 'Location',
    selector: 'Location',
    sortable: true,
    wrap: true,
    allowOverflow: true,
    maxWidth: "20%"
  },
  {
    name: 'Action',
    cell: (row) =>
      <div className="col-12">
        <Button className="btn update-btn mt-2 mb-2" variant="contained" type="button" onClick={() => { updateProviderData(row) }}>View &amp; Update</Button>
        {activateOrSuspend(row)}
        <Button className="btn remove-btn mb-2" variant="contained" type="button" onClick={() => removeProvider(row)}>Remove</Button>
      </div>
    ,
    button: true,
  }
];

const activateOrSuspend = (row) => {

  var selectedButton = ""
  {
    row.isActive === 1 ?
    selectedButton = <Button className="btn btn-warning mb-2" variant="contained" onClick={() => activateOrDeactivateProvider(row)}>Suspend</Button>
    :
    selectedButton = <Button className="btn btn-success mb-2" variant="contained" onClick={() => activateOrDeactivateProvider(row)}>Activate</Button>
  }
  return selectedButton
}
const activateOrDeactivateProvider = (row) => {
  let status = (row.isActive === true ? 'suspend' : 'activate')
  let data = {
    show: true,
    data: "Are you sure want to " + status + " " + row.ProviderName,
    actionType: (status === 'suspend' ? 'suspendProvider' : 'activateProvider')
  }
  store.dispatch({ type: "SHOW_ALERT_BOX", payload: data })
  store.dispatch({ type: "SUSPEND_OR_ACTIVATE_PROVIDER", payload: row })
  // let data ={providerID:row.Service_Provider_ID, isActive: (!row.isActive === true?1:0), isDeleted:0};
  //  appService.GetDataFromApiPost(providerActivateOrDeactive, data)
  //      .then(response=>{
  //         if(response.status == 200){
  //           store.dispatch({type:"CHANGE_REFRESH_PROVIDER_TABLE", payload:true})     
  //           store.dispatch({type:"SHOW_ALERT_BOX_DATA", payload:"success, Provider status changed."})     
  //         }

  //      })
  //      .catch((error) => {
  //       store.dispatch({type:"SHOW_ALERT_BOX_DATA", payload:"fail, ."})
  //     });

}
const updateProviderData = (row) => {
  store.dispatch({ type: "CHANGE_PROVIDER_UPDATE_FLAG", payload: true })
  store.dispatch({ type: "CHANGE_PROVIDER_UPDATE_DATA", payload: row })
  console.log(row)
}

const removeProvider = (row) => {
  let data = {
    show: true,
    data: "Are you sure want to remove " + row.ProviderName,
    actionType: 'removeProvider'
  }
  store.dispatch({ type: "SHOW_ALERT_BOX", payload: data })
  store.dispatch({ type: "REMOVE_PROVIDER_DATA", payload: row })
  /*let data ={providerID:row.Service_Provider_ID, isActive: 0, isDeleted:1};
  appService.GetDataFromApiPost(providerActivateOrDeactive, data)
  .then(response=>{
     if(response.status == 200){
       store.dispatch({type:"CHANGE_REFRESH_PROVIDER_TABLE", payload:true})     
       store.dispatch({type:"SHOW_ALERT_BOX_DATA", payload:"success, Provider removed."})     
     }

  })
  .catch((error) => {
   store.dispatch({type:"SHOW_ALERT_BOX_DATA", payload:"fail, ."})
 });*/
}



class ProviderData extends Component {
  constructor(props) {
    super(props);
    this.AppService = new AppService();
    this.state = {
      providerList: [],
      GetProviderUrl: GetProviders,
      filterTableData: "",
      toCSV: "",
      showConformation: false,
      showAlert: false,
      conformationData: "",
      alertData: ""
    }
  }


  /* Get provider data from database */
  async getProviders() {
    console.log('getting provider data')
    let rejson = [];
    await this.AppService.GetDataFromApiPost(this.state.GetProviderUrl, "")
      .then(response => {
        rejson = response.data[0]
        let currentData = []
        for (let i = 0; i < rejson.length; i++) {
          let providerObject = {
            Service_Provider_ID: rejson[i].Service_Provider_ID,
            ProviderName: rejson[i].Provider_Name,
            ContactName: rejson[i].Contact_Person,
            EmailID: rejson[i].Email_ID,
            PhNumber: rejson[i].Telephone_No,
            Location: rejson[i].City_Name,
            isActive: rejson[i].Active_Flag.data[0],
            Sub_Domain_Name: rejson[i].Sub_Domain_Name,
            Provider_Address: rejson[i].Provider_Address,
            City_Name: rejson[i].City_Name,
            Country_Name: rejson[i].Country_Name,
            wesiteUrl: rejson[i].Provider_URL
          }
          currentData.push(providerObject);
        }
        this.setState({ providerList: currentData })
        this.setState({ filterTableData: currentData })
        this.deleteExtraCSVKeys()
      })

  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.refreshTableData === true) {
      this.getProviders()
      this.props.updateTableData("CHANGE_REFRESH_PROVIDER_TABLE", false)
    }
    if (prevProps.alertBox !== this.props.alertBox) {
      this.setState({ alertData: this.props.alertBox.data }, () => {
        this.setState({ showAlert: this.props.alertBox.show })
      })
    }
    if (prevProps.confirmBox !== this.props.confirmBox) {
      this.setState({ conformationData: this.props.confirmBox.data }, () => {
        this.setState({ showConformation: this.props.confirmBox.show })
      })
    }
  }
  /* This lifecycle is used for fetching the external data before and rendering it*/
  componentDidMount() {
    this._asyncRequest = this.getProviders().then(
      externalData => {
        this._asyncRequest = null;
        this.setState({ externalData });
      }
    );
  }
  searchAnything(event) {
    let rawData = this.state.providerList
    let searchKey = event.target.value
    var filteredItem = []
    if (searchKey === "" || searchKey === " ") {
      this.setState({ filterTableData: rawData })
      this.setState({ toCSV: rawData })
    }
    else {
      filteredItem = []
      rawData.forEach(obj => {
        if (obj.ProviderName.toLowerCase().includes(searchKey) || obj.ContactName.toLowerCase().includes(searchKey) || obj.EmailID.toLowerCase().includes(searchKey) || obj.PhNumber.toLowerCase().includes(searchKey) || obj.Location.toLowerCase().includes(searchKey)) {
          filteredItem.push(obj)
        }
      });
      this.setState({ filterTableData: filteredItem })
      this.deleteExtraCSVKeys()
    }
  }
  deleteExtraCSVKeys() {
    const { filterTableData } = this.state
    const data = []
    if (filterTableData.length > 0) {
      filterTableData.forEach(obj => {
        let json = {
          "Provider Name": obj.ProviderName,
          "Contact Name": obj.ContactName,
          "Email ID": obj.EmailID,
          "Contact Number": obj.PhNumber,
          "Location": obj.Location
        }
        data.push(JSON.parse(JSON.stringify(json)))
      });

      this.setState({ toCSV: data })
    }
  }
  performAction() {
    this.closeAlertBox();
    let actionType = this.props.alertBox.actionType;
    if (actionType === 'removeProvider') {
      this.removeProvider();
    }
    else if (actionType === 'suspendProvider' || actionType === 'activateProvider') {
      this.enableDisableProvider();
    }
  }
  removeProvider() {
    let row = this.props.providerDataToRemove
    let data = { providerID: row.Service_Provider_ID, isActive: 0, isDeleted: 1 };
    appService.GetDataFromApiPost(providerActivateOrDeactive, data)
      .then(response => {
        if (response.status == 200) {
          let data = {
            show: true,
            data: "Provider removed."
          }
          store.dispatch({ type: "SHOW_CONFIRM_BOX", payload: data })
          this.getProviders();
          this.props.updateTableData("RESET_PROVIDER_CARD_DATA", true);
        }

      })
      .catch((error) => {
      });
  }
  enableDisableProvider() {
    let row = this.props.suspendOrActivateProvider;
    let data = { providerID: row.Service_Provider_ID, isActive: (!row.isActive === true ? 1 : 0), isDeleted: 0 };
    appService.GetDataFromApiPost(providerActivateOrDeactive, data)
      .then(response => {
        if (response.status == 200) {
          let data = {
            show: true,
            data: "Provider status updated."
          }
          store.dispatch({ type: "SHOW_CONFIRM_BOX", payload: data })
          this.getProviders();
          this.props.updateTableData("RESET_PROVIDER_CARD_DATA", true);
          this.props.updateTableData({ type: "CHANGE_REFRESH_PROVIDER_TABLE", payload: true })
        }

      })
      .catch((error) => {

      });
  }
  closeAlertBox() {
    let data = {
      show: false,
      data: "",
      actionType: ""
    }
    this.props.updateTableData("SHOW_ALERT_BOX", data);
    this.props.updateTableData("SHOW_CONFIRM_BOX", data);
  }
  render() {

    if (this.state.providerList.length > 0) {
      return (
        <React.Fragment>
          {/* // alert box */}
          {this.state.showConformation ? (
            <SweetAlert
              title="Success!"
              success
              confirmBtnBsStyle="success"
              onConfirm={() => this.closeAlertBox()}
            >
              {this.state.conformationData}
            </SweetAlert>
          ) : null}

          {this.state.showAlert ? (
            <SweetAlert
              title="Conformation"
              warning
              showCancel
              onConfirm={() => this.performAction()}
              onCancel={() => this.closeAlertBox()}
            >
              {this.state.alertData}
            </SweetAlert>
          ) : null}
          <Card className="mini-stat">
            <CardHeader className="bl-bg">
              <Link to="#" className="text-white">
                <b>Provider List Table</b>
              </Link>
              <span className="float-right">
                <Input
                  className="search-elem"
                  type="text"
                  id="searchData"
                  placeholder={"Search..."}
                  onChange={(event) => { this.searchAnything(event) }}
                />
                <CsvDownload
                  className="file-dwd ml-3"
                  data={this.state.toCSV}
                  filename={"Provider_Data.csv"}
                />
              </span>
            </CardHeader>
            <CardBody>
              <DataTable
                className="data-table"
                columns={columns}
                data={this.state.filterTableData}
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
    } else {
      return null;
    }
  }
}
const mapStatetoProps = state => {
  return {
    refreshTableData: state.reloadProviderTableData.reloadTableData,
    alertBox: state.reloadProviderTableData.alertBox,
    confirmBox: state.reloadProviderTableData.confirmBox,
    providerDataToRemove: state.reloadProviderTableData.providerDataToRemove,
    suspendOrActivateProvider: state.reloadProviderTableData.suspendOrActivateProvider
  };
};
const dispatchToProps = dispatch => {
  return {
    updateTableData: (type, payload) => {
      dispatch({ type: type, payload: payload })
    }
  }
}
export default withRouter(connect(mapStatetoProps, dispatchToProps)(ProviderData));