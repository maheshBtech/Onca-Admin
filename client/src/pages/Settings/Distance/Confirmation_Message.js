import React, {Component} from 'react';
import SweetAlert from "react-bootstrap-sweetalert";

class Confirmation_Message extends Component {
    constructor(props) {
        super(props);
}

    render() {
        return (
                <SweetAlert
                title={this.props.title}
                success
                showCancel
                confirmBtnBsStyle="success"
                cancelBtnBsStyle="danger"
                onConfirm={(response) => this.props.modelOkButtonClicked(response)}
                onCancel={() => this.props.modelCancelButtonClicked()}
                
            >
            </SweetAlert>
        )
    }
}

export default Confirmation_Message;
