
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {  Card, CardBody, CardHeader } from "reactstrap";
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import Highcharts from 'highcharts';
// Add the App service products that you want to use
import AppService from '../../AppService';
import {newRegistrationGraph_dash} from '../../AppConfig';
import SweetAlert from "react-bootstrap-sweetalert";
if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}

class NewRegistration extends Component {

    state={
        success_msg:false,
         fail_msg:false,
        alertBoxData:"",
        data:[],
        categories:[],
        currentData:[],
        previousData:[]
    }
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

        this.AppService.getDataFetch(newRegistrationGraph_dash)
      .then((response) => response.json())
      .then(datalist =>{
        if(datalist=== null){
            this.setState({ modal_center: false })
            this.showError("New Registration API returns NULL.")
          }
          else if(datalist.status = 200){
        this.setState({data: datalist[0]},function(){
            this.setNewRegistration();
        })}
        else{
            this.setState({ modal_center: false })
            this.showError("Error in transaction.")
          }
      })
    }
    //     const jsonData = [{
    //             "provider": "Provider 1",
    //             "current": "40",
    //             "Previous": "30"
    //           }, {
    //             "provider": "Provider 3",
    //             "current": "25",
    //             "previous": "30"
    //           }, {
    //             "provider": "Provider 4",
    //             "current": "36",
    //             "Previous": "22"
    //           },{
    //             "provider": "Provider 2",
    //             "current": "45",
    //             "Previous": "36"
    //           }
    // ]


    

setNewRegistration(){
    const category=[];
    const current=[];
    const previous=[];
    {this.state.data.map((item , i) =>{
        category.push(item.provider);
        current.push(Number(item.current));
        previous.push(Number(item.previous));
    }
    ) 
    }
console.log(category,current,previous)
    this.setState({categories:category})
    this.setState({currentData:current})
    this.setState({previousData:previous})
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
                categories: this.state.categories
            },
            yAxis: [{
                min: 0,
                title: {
                    text: 'Registrations'
                }
           
            }],
            legend: {
                shadow: false
            },
            tooltip: {
                shared: true
            },
            plotOptions: {
                column: {
                    grouping: false,
                    shadow: false,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Current Registration',
                color: 'rgba(248,161,63,1)',
                data: this.state.currentData,
                pointPadding: 0.3,
                //pointPlacement: -0.2
            }, {
                name: 'Previous Registration',
                color: 'rgba(186,60,61,.9)',
                data: this.state.previousData,
                pointPadding: 0.4,
                //pointPlacement: -0.2
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
                        New Registration
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

export default withRouter(NewRegistration);