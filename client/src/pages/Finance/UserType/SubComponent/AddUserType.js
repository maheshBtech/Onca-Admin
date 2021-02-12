import React, {Component} from 'react';
import { Row, Col, Label, Input, } from "reactstrap";

///Using hooks to set the data for the CSV Download and search
class AddUserType extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        selectedFiles: []
       };
    }

    render() {
        return (
            <div className="modal-body">
            <div className="row">
                <div className="col-sm-12">
                    {this.props.userTypeForm.Err ? 
                    (<div class="alert alert-danger" role="alert" >
                        {this.props.userTypeForm.Err} 
                        {/* User Type &amp; Discount not assigned. */}
                    </div> 
                    ): null }
                    {this.props.userTypeForm.ShowSuccessMessage ? 
                    (<div class="alert alert-success" role="alert">
                        {/* User Type &amp; Discount created successfully. */}
                        {this.props.userTypeForm.ShowSuccessMessage}
                    </div>) : null}
                </div>
            </div>
            <form onSubmit={this.props.handleSubmit}>
                <div className="col-sm-12">
                    
                    <div className="form-group row">
                        <Label for="name">User Type <span className="text-danger">*</span></Label>
                        <Input type="text" id="UserTypeName" name="UserTypeName" 
                        placeholder="Enter UserType Name" 
                        onChange={this.props.handleChange}
                        value={this.props.userTypeForm.UserTypeName}
                        disabled={this.props.userTypeForm.UserTypeID != 0}
                        />
                    </div>
                    <div className="form-group row">
                        <Label for="name">Discount <span className="text-danger">*</span></Label>
                        <Input type="number" name="Discount" id="number" 
                        placeholder="Enter Discount" 
                        onChange={this.props.handleChange}
                        value={this.props.userTypeForm.Discount}
                        />
                    </div>
                    <div className="form-group row">
                        <Label for="name">Description</Label>
                        <Input type="text" name="UserTypeDesc" id="UserTypeDesc" 
                        placeholder="Enter UserType Desc" 
                        onChange={this.props.handleChange}
                        value={this.props.userTypeForm.UserTypeDesc}
                        />
                    </div>
                    <div className="form-group row">
                        <button className="btn btn-block update-btn font"  type="submit" >
                           Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
        )
    }

}
  
  export default AddUserType;