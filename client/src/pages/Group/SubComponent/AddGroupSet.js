import React, {Component} from 'react';
import { Row, Col, Label, Input, } from "reactstrap";
import Select from "react-select";
import { Link } from "react-router-dom";


///Using hooks to set the data for the CSV Download and search
class AddGroupSet extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        
        
       };
    }

    render() {
        return (
            <div className="modal-body">
            <div className="row">
                <div className="col-sm-12">
                    {this.props.groupSetForm.Err ? 
                    (<div class="alert alert-danger" role="alert" >
                        {this.props.groupSetForm.Err} 
                        {/* User Type &amp; Discount not assigned. */}
                    </div> 
                    ): null }
                    {this.props.groupSetForm.ShowSuccessMessage ? 
                    (<div class="alert alert-success" role="alert">
                        {this.props.groupSetForm.ShowSuccessMessage}
                    </div>) : null}
                </div>
            </div>
            <form onSubmit={this.props.handleSubmit}>
                <div className="col-sm-12">
                
                <Row>
                    <Col lg={12}>
                <div className="form-group">
                <Label for="name">Group Set Name <span className="text-danger">*</span></Label>
                        <Input type="text" name="GroupSetName" id="GroupSetName" 
                        placeholder="Enter Group Set" 
                        onChange={this.props.handleChange}
                        value={this.props.groupSetForm.GroupSetName}
                        />
                </div>
            </Col>
            </Row>
                    <div className="form-group row">
                        <button className="btn btn-block update-btn font"  type="submit" >
                        Add Group Set
                        </button>
                    </div>
                </div>
            </form>
        </div>
        )
    }

}
  
  export default AddGroupSet;