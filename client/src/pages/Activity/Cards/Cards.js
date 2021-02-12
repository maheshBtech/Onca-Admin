import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import Rating from "react-rating";


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
        };

        this.state = { 
            CardActiviisList:[],
            TotalUser: 0,
          };
          this.onUpdateButtonHandleClick = this.onUpdateButtonHandleClick.bind(this);
    }


    componentDidUpdate(prevProps, prevState,snapShot) {
        if (this.props.ActivityListData !== prevProps.ActivityListData)
        {
            let activitiesList = this.props.ActivityListData;
            this.componentDidUpdateFilterForCard(activitiesList);
        }
      }
        //Update Button
        onUpdateButtonHandleClick = () => {
            
        }

      componentDidUpdateFilterForCard = (activitiesList) =>{

        if (activitiesList != undefined || activitiesList != null) {
            //Set the card activity List
            
            let cardActivitiesList = activitiesList.filter(item=> item.Expiry_Days <=30 && item.Expiry_Days >=0).sort(function(a, b){return a.Expiry_Days-b.Expiry_Days}).slice(0,4);
            this.setState({CardActiviisList: cardActivitiesList,TotalUser:activitiesList.length });
            console.log(cardActivitiesList);
            console.log(activitiesList.length);
        }
      }


    render() {
        return (
            <React.Fragment>
                <Row>
                    {(this.state.CardActiviisList ||  []).map((item,i) => (
                    <Col xl={3} md={6} key={i}>
                        <Card className="mini-stat">
                            <CardHeader className="gray-bg">
                                {item.Activity_Name}
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xl="6">
                                        <h4 className="font-weight-medium font-size-16">
                                            <b>{this.state.TotalUser === undefined || null ? 0 : this.state.TotalUser}</b>
                                        </h4>
                                        <h4 className="font-weight-medium font-size-11">
                                            Total Active Users
                                        </h4>
                                    </Col>
                                    <Col xl="6">
                                        <p className="font-size-10 mb-0">Customer Ratings</p>
                                        <Rating
                                            stop={5}
                                            emptySymbol="mdi mdi-star fa-xs text-muted"
                                            fullSymbol={[
                                                "mdi mdi-star fa-xs text-danger",
                                                "mdi mdi-star fa-xs text-danger",
                                                "mdi mdi-star fa-xs text-danger",
                                                "mdi mdi-star fa-xs text-danger"
                                            ]}
                                            readonly={true}
                                            initialRating={item.Rating}
                                        />
                                        <span className="font-size-10">({this.state.TotalUser === undefined || null ? 0 : this.state.TotalUser})</span>
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col xl="6 pr-0">
                                        <p className="font-size-11 mb-0">
                                            Date of expiry
                                        </p>
                                        <p className="font-size-11 mb-0">
                                            <b>{new Date(item.End_Date).toLocaleDateString('en-GB',{
                                                day:'numeric' , month:'short', year:'numeric'
                                            }).replace(/ /g,'-')}</b>
                                        </p>
                                    </Col>
                                    <Col xl="6 pr-0">
                                    <Link to={{
                                        pathname:'/new-activity'
                                        }}>
                                         <button type="button" 
                                         className="btn update-btn font"
                                         onClick={()=>this.onUpdateButtonHandleClick()}>
                                            Update
                                        </button>
                                        </Link>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    ))}
                </Row>
            </React.Fragment>
        )
    }
}

export default withRouter(Cards);