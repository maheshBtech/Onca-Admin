
import React, { Component } from 'react';
import SweetAlert from "react-bootstrap-sweetalert";

export default function Information_Message(props) {
    if (props.messageType === 'success') {
        return (
            <SweetAlert
                title={props.title}
                success
                onConfirm={props.modelOkButtonClicked}
            >
            </SweetAlert>
        )
    }
    else if (props.messageType === 'warning') {
        return (
            <SweetAlert
                title={props.title}
                warning
                onConfirm={props.modelOkButtonClicked}
            >
            </SweetAlert>
        )
    }


}