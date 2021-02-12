
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {  Card, CardBody, CardHeader } from "reactstrap";
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import Highcharts from 'highcharts';
// Add the App service products that you want to use
import AppService from '../../AppService';
import {newLeadGraph_dash} from '../../AppConfig';
import SweetAlert from "react-bootstrap-sweetalert";
if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}


class NewLeads extends Component {

    state={
        success_msg:false,
         fail_msg:false,
        alertBoxData:"",
        data:[],
        series:[],

    }

    componentDidMount(){


        this.AppService = new AppService();

    this.AppService.getDataFetch(newLeadGraph_dash)
        .then((response) => response.json())
        .then(datalist =>{
            if(datalist=== null){
                this.setState({ modal_center: false })
                this.showError("New Lead API returns NULL.")
              }
              else if(datalist.status = 200){
          this.setState({data: datalist[0]},function(){
              this.setNewRegistration();
          })
        }
        else{
            this.setState({ modal_center: false })
            this.showError("Error in transaction.")
          }

        })
      }
    //     const jsonData = [{
    //             "provider": "Provider 1",
    //             "lead": "40",
    //           }, {
    //             "provider": "Provider 2",
    //             "lead": "30",
    //           }, {
    //             "provider": "Provider 3",
    //             "lead": "40",
    //           },{
    //             "provider": "Provider 4",
    //             "lead": "50",
    //           },{
    //             "provider": "Provider 5",
    //             "lead": "10",
    //           }
    // ]
    // this.setState({data:jsonData},function(){
    //     this.setNewRegistration();
    // })
    showError(message){
        this.setState({alertBoxData:message})
        this.setState({fail_msg:true})
       this.setState({success_msg:false})
      }
    

setNewRegistration(){
    const seriesData=[];

    {this.state.data.map((item , i) =>{
        seriesData.push([item.provider,Number(item.lead)]);
    }
    ) 
    }

    this.setState({series:seriesData})

}
closeAlertBox(){         
    this.setState({success_msg:false})
    this.setState({alertBoxData:""})       
    this.setState({fail_msg:false})            
  }
    render() {

       const chartOptions= {
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
                type: 'category',
                labels: {
                    rotation: -45,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Leads'
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: 'New leads : <b>{point.y:.1f}</b>'
            },
            series: [{
                name: 'New Leads',
                color: 'rgba(126,86,134,.9)',
                data:this.state.series,
                pointPadding: 0.3,
                dataLabels: {
                    enabled: true,
                    rotation: -90,
                    color: '#FFFFFF',
                    align: 'right',
                    format: '{point.y:.1f}', // one decimal
                    y: 10, // 10 pixels down from the top
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
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
                        New Leads
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

export default withRouter(NewLeads);