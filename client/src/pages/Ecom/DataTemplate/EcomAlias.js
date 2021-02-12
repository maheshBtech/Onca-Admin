import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Category from './Category';
import Vendor from '../DataTemplate/NewVendor/Vendor';
import SubCategory from './SubCategory';
import Brand from './Brand';
import {
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Row,
    Col,
} from "reactstrap";
import classnames from "classnames";

class ecomalias extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_center: false,
            modal_scroll: false,
            customActiveTab: "1",
        };
        this.add_member = this.add_member.bind(this);
        this.tog_scroll = this.tog_scroll.bind(this);
    }
    removeBodyCss() {
        document.body.classList.add("no_padding");
    }
    add_member() {
        this.setState(prevState => ({
            modal_center: !prevState.modal_center
        }));
        this.removeBodyCss();
    }
    tog_scroll() {
        this.setState(prevState => ({
            modal_scroll: !prevState.modal_scroll
        }));
        this.removeBodyCss();
    }
    show() {
        this.setState({ visible: true });
    }
    hide() {
        this.setState({ visible: false });
    }
    toggleCustom(tab) {
        if (this.state.customActiveTab !== tab) {
            this.setState({
                customActiveTab: tab
            });
        }
    }
    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <Row className="align-items-center">
                        <Col sm={6}>
                            <div className="page-title-box">
                                <ol className="breadcrumb mb-0">
                                    <li className="breadcrumb-item">
                                        <Link to="/activity">E-Commerce</Link>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        Configuration
                                    </li>
                                </ol>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <Nav tabs className="nav-tabs-custom">
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.customActiveTab === "1" })}
                                        onClick={() => { this.toggleCustom("1"); }}
                                    >
                                        <span className="d-none d-sm-block">Category</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.customActiveTab === "2" })}
                                        onClick={() => { this.toggleCustom("2");}}
                                    >
                                        <span className="d-none d-sm-block">Sub-Category</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.customActiveTab === "3" })}
                                        onClick={() => { this.toggleCustom("3"); }}
                                    >
                                        <span className="d-none d-sm-block">Vendor</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink 
                                        className={classnames({ active: this.state.customActiveTab === "4"})}
                                        onClick={() => {this.toggleCustom("4"); }}>
                                        <span className="d-none d-sm-block">Brand</span>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={this.state.customActiveTab}>
                                <TabPane tabId="1">
                                    <Category />
                                </TabPane>
                                <TabPane tabId="2">
                                    <SubCategory />
                                </TabPane>
                                <TabPane tabId="3">
                                    <Vendor />
                                </TabPane>
                                <TabPane tabId="4">
                                    <Brand />
                                </TabPane>
                            </TabContent>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(ecomalias);