import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardHeader } from "reactstrap";
// Add the App service products that you want to use
import AppService from '../../../AppService';
import {cardDashboard_dash} from '../../../AppConfig';

class Cards extends Component {

    state={
        data:[]
    }

    componentDidMount(){
        this.AppService = new AppService();
        //Conditional check if the body is not present.
        this.AppService.getDataFetch(cardDashboard_dash)
        .then((response) => {if (!response == undefined) {
            if (!response.body == undefined){
                response.json()            }
            
        }
            })
        .then(datalist =>{
            if (!datalist == undefined) {
                this.setState({data:  datalist[0]})
            }
        })

    }
    render() {
        return (
       

            <React.Fragment>
                <Row>   
                {this.state.data.map((item , i) => {
                  return  <Col xl={3} md={6}>
                        <Card className="mini-stat">
                            <CardHeader className="gray-bg">
                                {item.cardHeader}
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xl="7">
                                        <h4 className="font-weight-medium font-size-16">
                                            <b>{item.quantity}</b>
                                        </h4>
                                        <h4 className="font-weight-medium font-size-11">
                                            {item.cardDescription}
                                        </h4>
                                    </Col>
                                    <Col xl="5">
                                        <label className={
                                                item.growth === 'down' && item.rate < 25 ? 'status-lbl font-size-12 bg-red text-white':
                                                item.growth === 'down' && item.rate < 75? 'status-lbl font-size-12 bg-orange text-white':
                                                ' status-lbl font-size-12 bg-green text-white'}>
                                            {item.duration}
                                        </label>
                                        <h4 className="font-weight-medium font-size-12 text-center">
                                            {item.rate}%
                                            <i className= {
                                                item.growth === 'down' && item.rate < 25 ? 'mdi mdi-arrow-down text-danger font-size-14 ml-2':
                                                item.growth === 'down' && item.rate < 75? ' mdi mdi-arrow-down text-warning font-size-14 ml-2':
                                                item.growth === 'down'?' mdi mdi-arrow-down text-success font-size-14 ml-2':' mdi mdi-arrow-up text-success font-size-14 ml-2'}> </i>
                                        </h4>
                
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                }
                )
                }
  </Row>
</React.Fragment>
        )
    }
}

export default withRouter(Cards);