

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, CardBody, CardHeader } from "reactstrap";
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import Highcharts from 'highcharts';
// Add the App service products that you want to use
import AppService from '../../AppService';
import { activityGraph_dash } from '../../AppConfig';
import SweetAlert from "react-bootstrap-sweetalert";
if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}

class Activity extends Component {
  state = {
    success_msg: false,
    fail_msg: false,
    alertBoxData: "",
    categories: [],
    series: [],
    jData: {}
  };
  // constructor(props) {
  //     super(props);
  // }
  closeAlertBox() {
    this.setState({ success_msg: false })
    this.setState({ alertBoxData: "" })
    this.setState({ fail_msg: false })
  }
  showError(message) {
    this.setState({ alertBoxData: message })
    this.setState({ fail_msg: true })
    this.setState({ success_msg: false })
  }
  componentDidMount() {

    this.AppService = new AppService();

    this.AppService.getDataFetch(activityGraph_dash)
      .then((response) => response.json())
      .then(datalist => {
        if (datalist === null) {
          this.setState({ modal_center: false })
          this.showError("New Lead API returns NULL.")
        } else if (datalist.status = 200) {
          this.setState({ jData: datalist[0] }, function () {
            this.setCategory();
          })
        }
        else {
          this.setState({ modal_center: false })
          this.showError("Error in transaction.")
        }
      })
  }

  setCategory() {
    const jsonData = this.state.jData
    const cats = {};
    jsonData.forEach((o) => cats[o.month] = 1)
    const categories = Object.keys(cats)
    let series = jsonData.reduce((acc, o) => {
      // Check if array already defined
      if (acc[o.activity] && acc[o.activity].data) {
        // Push to array new values
        acc[o.activity].data.push({ x: categories.indexOf(o.month), y: Number(o.sampleyqty) })
      } else {
        // Create new array with first value
        acc[o.activity] = { data: [{ x: categories.indexOf(o.month), y: Number(o.sampleyqty) }] }
      }
      return acc
    }, {});

    // Convert object to array
    series = Object.keys(series).map((key) => {
      series[key].name = key
      return series[key]
    })

    series = series.map(serie => {
      serie.data.sort((a, b) => a.x - b.x)
      return serie
    })
    console.log(series, categories)
    this.setState({ series: series });
    this.setState({ categories: categories });
  }

  render() {
    const chartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: ''
      },
      exporting: {
        buttons: {
          contextButton: {
            menuItems: [
              'printChart',
              'downloadPNG',
              'downloadPDF',
            ]
          }
        }
      },
      xAxis: {
        //categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
        categories: this.state.categories
      },
      yAxis: {
        title: {
          text: "Activities"
        }
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        areaspline: {
          fillOpacity: 0.5
        }
      },
      series: this.state.series
    }
    //const { chartOptions } = this.state;
    return (
      <React.Fragment>
        {this.state.success_msg ? (
          <SweetAlert
            title="Success!"
            success
            onConfirm={() => this.closeAlertBox()}
          >
            {this.state.alertBoxData}
          </SweetAlert>
        ) : null}
        {this.state.fail_msg ? (
          <SweetAlert
            title="Error!"
            warning
            onConfirm={() => this.closeAlertBox()}
          >
            {this.state.alertBoxData}
          </SweetAlert>
        ) : null}
        {this.state.conformation ? (
          <SweetAlert
            title="Conformation"
            warning
            onConfirm={() => this.removeOrSuspendID()}
          >
            {this.state.alertBoxData}
          </SweetAlert>
        ) : null}
        <Card className="mini-stat">
          <CardHeader className="gray-bg">
            Activity
                </CardHeader>
          <CardBody>
            <HighchartsReact
              highcharts={Highcharts}
              options={chartOptions}
            />
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default withRouter(Activity);