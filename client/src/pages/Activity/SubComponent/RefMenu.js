import React, { Component } from "react";
import { 
    Row, 
    Col,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    ButtonDropdown
 } from "reactstrap";
import { Link } from "react-router-dom";

class RefMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <ButtonDropdown
                    isOpen={this.state.drop_align}
                    direction="right"
                    toggle={() =>
                        this.setState({ drop_align: !this.state.drop_align })
                    }
                >
                    <DropdownToggle
                        className="btn-menu"
                    >
                        <i className="mdi mdi-dots-vertical font-size-20"></i>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-right-custom">
                        <DropdownItem>Create AOD</DropdownItem>
                        <DropdownItem>Edit AOD</DropdownItem>
                        <DropdownItem>Copy from AOD Templated</DropdownItem>
                        <DropdownItem>Copy from another AOD</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            </React.Fragment>
        );
    }
}

export default RefMenu;
