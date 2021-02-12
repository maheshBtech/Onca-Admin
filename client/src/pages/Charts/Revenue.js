
import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import { Card, CardBody, CardHeader } from "reactstrap";
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import Highcharts from 'highcharts';
// Add the App service products that you want to use
import AppService from '../../AppService';
import {revenueGraph_dash} from '../../AppConfig';
import SweetAlert from "react-bootstrap-sweetalert";
if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}

class Revenue extends Component {
    state={
        success_msg:false,
         fail_msg:false,
        alertBoxData:"",
        categories:[],
        currentData:[],
        previousData:[],
        jData:{}
      };
    // constructor(props) {
    //     super(props);
    // }
    closeAlertBox(){         
        this.setState({success_msg:false})
        this.setState({alertBoxData:""})       
        this.setState({fail_msg:false})            
      }
      showError(message){
        this.setState({alertBoxData:message})
        this.setState({fail_msg:true})
       this.setState({success_msg:false})
      }
    
    componentDidMount(){
 
 
        this.AppService = new AppService();

        this.AppService.getDataFetch(revenueGraph_dash)
      .then((response) => response.json())
      .then(datalist =>{
        if(datalist=== null){
            this.setState({ modal_center: false })
            this.showError("New Lead API returns NULL.")
          }
        else if(datalist.status = 200){
        this.setState({jData: datalist[0]},function(){
            this.setRevenue();
        })}
        else{
            this.setState({ modal_center: false })
            this.showError("Error in transaction.")
          }
      })
    }
    
      setRevenue() {

        const category=[];
    const current=[];
    const previous=[];
    {this.state.jData.map((item , i) =>{
        
        category.push(item.month);
        current.push(Number(item.current_year));
        previous.push(Number(item.previous_year));
    }
    ) 
    }

    this.setState({categories:category})
    this.setState({currentData:current})
    this.setState({previousData:previous})
        // const jsonData = this.state.jData
        // const cats = {};

        
        // jsonData.forEach((o) => cats[o.month] = 1)
        // const categories = Object.keys(cats)

      
        // let series = jsonData.reduce((acc, o) => {
        //       // Check if array already defined
        //       if (acc[o.provider] && acc[o.provider].data) {
        //         // Push to array new values
        //       acc[o.provider].data.push({x: categories.indexOf(o.month), y: Number(o.total_revenue)})
        //     } else {
        //         // Create new array with first value
        //         acc[o.provider] = { data: [{x: categories.indexOf(o.month), y: Number(o.total_revenue)}] }
        //     }
        //     return acc
        //   }, {});
        
        // // Convert object to array
        // series = Object.keys(series).map((key) => {
        //     series[key].name = key
        //   return series[key]
        // })
        
        // series = series.map(serie => {
        //     serie.data.sort((a, b) => a.x - b.x)
        //   return serie
        // })
        // console.log(series, categories)
        // this.setState({series:series});
        // this.setState({categories:categories});
        }

    render() {

     const chartOptions= {
            chart: {
                type: 'areaspline'
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
                categories:this.state.categories
            },
            yAxis: {
                title: {
                    text: "Revenue"
                }
            },
            tooltip: {
                shared: true,
                valueSuffix: ""
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                areaspline: {
                    fillOpacity: 0.5
                }
            },
            series: [{
                name: 'Current Year Revenue',
                data: this.state.currentData,
                color:  'rgba(255,133,51,1)'
            }, {
                name: 'Previous Year Revenue',
                data: this.state.previousData,
                color: 'rgba(255,204,0,.9)'
            }]
          }
        
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
                        Revenue
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

export default withRouter(Revenue);