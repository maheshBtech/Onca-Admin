import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import DataTable, { createTheme } from 'react-data-table-component';
import UsersFilter from '../SubComponent/UsersFilter';
import CsvDownload from 'react-json-to-csv';
import { Modal } from "reactstrap";
import {
  Card,
  Row,
  Col,
  CardBody,
  CardHeader,
  Label,
  Button,
  Input
} from "reactstrap";
import { ValidationMessage } from '../../Leaderboard/SubComponent/CommonMessage';

const UserReferalData = [
  {
    id: 1,
    BrandName: 'GNC',
    CategoryName:'Nutrition',
    SubCategoryName: 'Active Nutrition',
    VendorName: 'WILD CHILD ENTERPRISES',
  },
  {
    id: 2,
    BrandName: 'Bigmuscles Nutrition ',
    CategoryName:'Nutrition',
    SubCategoryName: 'Energy Drink',
    VendorName: 'Run Matters-JJ',
  },
  {
    id: 3,
    BrandName: 'Proburst',
    CategoryName:'Nutrition',
    SubCategoryName: 'Terra',
    VendorName: 'Revo International LLP',
  },
  {
    id: 4,
    BrandName: 'FAST&UP',
    CategoryName:'Nutrition',
    SubCategoryName: 'During Workout',
    VendorName: 'AURZ Pharmaceuticals',
  }
];
const headerStyle = {
  rows: {
    style: {
      minHeight: '100px', // override the row height
    }
  },
  headCells: {
    style: {
      backgroundColor: "#EDECEC",
    },
  },
};
const columns = [
  {
    name: 'Brand Name ',
    selector: 'BrandName',
    sortable: true,
    wrap: true
  },
  {
    name: 'Category Name',
    selector: 'CategoryName',
    sortable: true,
  },
  {
    name: 'Sub Category Name',
    selector: 'SubCategoryName',
    sortable: true,
    wrap: true,
  },
  {
    name: 'Vendor Name',
    selector: 'VendorName',
    sortable: true
  },
  {
    name: 'Action',
    cell: (row) => 
    <div className="col-12">
      <Button className="mb-1 btn update-btn">
       View &amp; Update
      </Button>
      <Button className="mb-2 btn">
        Remove
      </Button>
    </div>
    ,
    button: true,
  },
  
];
class UserReferal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modal_center: false,
        modal_scroll: false,
        Brand_name:"",
        Brand_name_valid:false,
        Category:"",
        Category_valid:false,
        Sub_category:"",
        Sub_category_valid:false,
        VendorName:"",
        VendorName_valid:false,
        error:{},

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






handleBrandname=(event)=>{
  this.setState({Brand_name:event.targrt.value},this.validateBrandname)

}
validateBrandname=()=>{
  let error={...this.state.error}
  if(!this.state.Brand_name){
    error.Brand_name_message="plese enter the Brand name";

  }else{
    this.state.Brand_name_valid=true;
  }
  this.setState({error});
}



  render() {
    return (
      <React.Fragment>
          <Card className="mini-stat">
          <CardHeader className="bl-bg">
              <Link to="#" className="text-white">
                <b>Brand List</b>
              </Link>
              <span className="float-right">
              <Button type="button"
                      className="btn update-btn font"
                      onClick={this.add_member}
                      data-toggle="modal"
                      data-target=".bs-example-modal-center">
                Add Brand Name</Button>   &nbsp; 
                <Modal
                           isOpen={this.state.modal_center}
                           toggle={this.add_member}
                        >
                            <div className="modal-header">
                                <h5 className="modal-title mt-0">Add Sub Category</h5>
                                <button
                                    type="button"
                                    onClick={() =>
                                        this.setState({ modal_center: false })
                                    }
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="col-sm-12">
                                    <div className="form-group row">
                                        <Label for="name">Brand Name</Label>
                                        <Input type="email" id="email"
                                        onChange={this.handleBrandname}
                                        value={this.state.Brand_name}
                                        onBlur={this.validate}
                                        />
                                        
                                        
                                    </div>
                                    <div className="form-group row">
                                        <Label for="name">Category</Label>
                                        <Input type="text" id="text" />
                                    </div>
                                    <div className="form-group row">
                                        <Label for="name">Sub Category</Label>
                                        <Input type="text" id="text" />
                                    </div>
                                    <div className="form-group row">
                                        <Label for="name">Vendor Name</Label>
                                        <Input type="text" id="text" />
                                    </div>
                                    
                                    <div className="form-group row">
                                        <button className="btn btn-block update-btn font">
                                            Add
                                  </button>
                                    </div>
                                </div>
                            </div>
                        </Modal>                    
                <Input 
            className="search-elem"
            type="text" 
            id="searchData"
            placeholder={"Search..."} 
            onChange={(event)=>{this.searchAnything(event)}}
          />
          <CsvDownload 
            className="file-dwd ml-3" 
     //      data={this.state.searchedData}
     //       filename={"user_Data.csv"}
          />
                  </span>
            </CardHeader>
            <CardBody>
              <DataTable
                className="data-table"
                columns={columns}
                data={UserReferalData}
                noHeader={true}
                customStyles={headerStyle}
                fixedHeader
                fixedHeaderScrollHeight="800px"
                pagination
              />
            </CardBody>
          </Card>
      </React.Fragment>
    )
  }
}

export default withRouter(UserReferal);