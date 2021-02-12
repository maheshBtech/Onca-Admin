
import React, { Component } from 'react';
import SweetAlert from "react-bootstrap-sweetalert";

class Information_Message extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (

            <SweetAlert
                title={this.props.title}
                warning
                onConfirm={this.props.modelOkButtonClicked}
            >
            </SweetAlert>

        )
    }
}

export default Information_Message;
