import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import Rating from "react-rating";
import AppService from "../../../AppService";
import { getProviderCardData } from "../../../AppConfig";
import { connect } from "react-redux";



const appService = new AppService();

class Cards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tooltipContent: ["Rate 1", "Rate 2", "Rate 3", "Rate 4", "Rate 5"],
            tooltipContentMore: ["1", "2", "3", "4", "5", "6", "7", "8"],
            tooltipContentHalf: ["6", "7", "8", "9", "10"],
            tooltipContentMiddle: [
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12"
            ],
            tooltipContentStep: ["2", "4", "6", "8", "10"],
            default: "",
            half: "",
            customize: "",
            cardUrl: getProviderCardData,
            allCardData:[]
        };
        this.getCardData()
    }
    componentDidUpdate(prevProps, prevState){      
       if(this.props.resetCardData===true)
       {
           this.getCardData();
       }
    }
 
    getCardData(){
        
        if(this.props.resetCardData===true){
            this.setState({allCardData:[]});
        }
        let allProvidresID=[1, 2]
        
        allProvidresID.forEach(id=>{
            let data = {numberOfCards:id}
            appService.GetDataFromApiPost(this.state.cardUrl,data)
            .then(response=>{  
                if(response.data[0].length>0){
                this.setState(prevState => ({
                    allCardData: [...prevState.allCardData, JSON.parse(JSON.stringify(response.data[0][0]))]
                  }))         
                //this.state.allCardData.push(JSON.parse(JSON.stringify(response.data[0][0])))
                console.log(this.state.allCardData)  
                             
            }
            })
        })
        this.props.updateTableData("RESET_PROVIDER_CARD_DATA", false);  
    }

    render() {
        return (
            <React.Fragment>
                <Row>
                   {
                    
                    this.state.allCardData.map( (item,idx)=>                        
                        <Col xl={3} md={6} key={idx}>
                        <Card className="mini-stat">
                            <CardHeader className="gray-bg">
                                {item.Provider_Name}
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xl="7">
                                        <h4 className="font-weight-medium font-size-16">
                                            <b>86,200</b>
                                        </h4>
                                        <h4 className="font-weight-medium font-size-11">
                                            Total Active Users
                                        </h4>
                                    </Col>
                                    <Col xl="5">
                                        <label className="status-lbl font-size-12 bg-green text-white">
                                            Monthly
                                        </label>
                                        <h4 className="font-weight-medium font-size-12 text-center">
                                            12%
                                            <i className="mdi mdi-arrow-up text-success font-size-14 ml-2"></i>
                                        </h4>
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col xl="5 pr-0">
                                        <p className="font-size-10">Customer Ratings</p>
                                    </Col>
                                    <Col xl="7 pr-0">
                                        <Rating
                                            stop={5}
                                            emptySymbol="mdi mdi-star fa-1x text-muted"
                                            fullSymbol={[
                                                "mdi mdi-star fa-1x text-primary",
                                                "mdi mdi-star fa-1x text-primary",
                                                "mdi mdi-star fa-1x text-primary",
                                                "mdi mdi-star fa-1x text-primary"
                                            ]}
                                            readonly={true}
                                            initialRating={item.Rating}
                                        />
                                        <span className="font-size-11">(48,520)</span>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                        )
                        }
                   
                    {/* <Col xl={3} md={6}>
                        <Link to="roleTemplate">
                            <Card className="mini-stat">
                                <CardHeader className="gray-bg">
                                    Mumbai Runners
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col xl="7">
                                            <h4 className="font-weight-medium font-size-16">
                                                <b>128</b>
                                            </h4>
                                            <h4 className="font-weight-medium font-size-11">
                                                Total Active Users
                                            </h4>
                                        </Col>
                                        <Col xl="5">
                                            <label className="status-lbl font-size-12 bg-red text-white">
                                                Monthly
                                            </label>
                                            <h4 className="font-weight-medium font-size-12 text-center">
                                                20%
                                                <i className="mdi mdi-arrow-down text-danger font-size-14 ml-2"></i>
                                            </h4>
                                        </Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Col xl="5 pr-0">
                                            <p className="font-size-10">Customer Ratings</p>
                                        </Col>
                                        <Col xl="7 pr-0">
                                            <Rating
                                                stop={5}
                                                emptySymbol="mdi mdi-star fa-1x text-muted"
                                                fullSymbol={[
                                                    "mdi mdi-star fa-1x text-primary",
                                                    "mdi mdi-star fa-1x text-primary",
                                                    "mdi mdi-star fa-1x text-primary",
                                                    "mdi mdi-star fa-1x text-primary"
                                                ]}
                                                readonly={true}
                                                initialRating={3}
                                            />
                                            <span className="font-size-11">(48,520)</span>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Link>
                    </Col>
                    <Col xl={3} md={6}>
                        <Card className="mini-stat">
                            <CardHeader className="gray-bg">
                                Runners Academy
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xl="7">
                                        <h4 className="font-weight-medium font-size-16">
                                            <b>1,600</b>
                                        </h4>
                                        <h4 className="font-weight-medium font-size-11">
                                            Total Active Users
                                        </h4>
                                    </Col>
                                    <Col xl="5">
                                        <label className="status-lbl font-size-12 bg-orange text-white">
                                            Monthly
                                        </label>
                                        <h4 className="font-weight-medium font-size-12 text-center">
                                            37%
                                            <i className="mdi mdi-arrow-down text-warning font-size-14 ml-2"></i>
                                        </h4>
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col xl="5 pr-0">
                                        <p className="font-size-10">Customer Ratings</p>
                                    </Col>
                                    <Col xl="7 pr-0">
                                        <Rating
                                            stop={5}
                                            emptySymbol="mdi mdi-star fa-1x text-muted"
                                            fullSymbol={[
                                                "mdi mdi-star fa-1x text-primary",
                                                "mdi mdi-star fa-1x text-primary",
                                                "mdi mdi-star fa-1x text-primary",
                                                "mdi mdi-star fa-1x text-primary"
                                            ]}
                                            readonly={true}
                                            initialRating={3}
                                        />
                                        <span className="font-size-11">(48,520)</span>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl={3} md={6}>
                        <Card className="mini-stat">
                            <CardHeader className="gray-bg">
                                Bangalore Swimming Club
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xl="7">
                                        <h4 className="font-weight-medium font-size-16">
                                            <b>200</b>
                                        </h4>
                                        <h4 className="font-weight-medium font-size-11">
                                            Total Active Users
                                        </h4>
                                    </Col>
                                    <Col xl="5">
                                        <label className="status-lbl font-size-12 bg-green text-white">
                                            Monthly
                                        </label>
                                        <h4 className="font-weight-medium font-size-12 text-center">
                                            98%
                                            <i className="mdi mdi-arrow-up text-success font-size-14 ml-2"></i>
                                        </h4>
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col xl="5 pr-0">
                                        <p className="font-size-10">Customer Ratings</p>
                                    </Col>
                                    <Col xl="7 pr-0">
                                        <Rating
                                            stop={5}
                                            emptySymbol="mdi mdi-star fa-1x text-muted"
                                            fullSymbol={[
                                                "mdi mdi-star fa-1x text-primary",
                                                "mdi mdi-star fa-1x text-primary",
                                                "mdi mdi-star fa-1x text-primary",
                                                "mdi mdi-star fa-1x text-primary"
                                            ]}
                                            readonly={true}
                                            initialRating={3}
                                        />
                                        <span className="font-size-11">(48,520)</span>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col> */}
                </Row>
            </React.Fragment>
        )
    }
}
const mapStatetoProps = state => {
    return {
       resetCardData: state.reloadProviderTableData.resetCardData
    };
  };
  const dispatchToProps = dispatch => {
    return {
        updateTableData: (type, payload) => {
            dispatch({ type: type, payload: payload })
        }
    }
  }

export default  withRouter(connect(mapStatetoProps, dispatchToProps)(Cards));