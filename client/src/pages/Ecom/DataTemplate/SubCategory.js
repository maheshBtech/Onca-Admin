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

const UserReferalData = [
  {
    id: 1,
    SubCategoryName: 'Active Nutrition',
    CategoryName:'Nutrition',
    ProductQuality: 100,
    BrandName: 'GNC',
    Status:'Active',
  },
  {
    id: 2,
    SubCategoryName: 'Energy Drink',
    CategoryName:'Nutrition',
    ProductQuality: 200,
    BrandName: 'BigMuscles Nutrition',
    Status:'Active',
  },
  {
    id: 3,
    SubCategoryName: 'Arivoli',
    CategoryName:'Nutrition',
    ProductQuality: 50,
    BrandName: 'Proburst',
    Status:'Active',
  },
  {
    id: 4,
    SubCategoryName: 'Arivoli',
    CategoryName:'Nutrition',
    ProductQuality: 150,
    BrandName: 'FAST&UP',
    Status:'Active',
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
    name: 'Sub Category Name ',
    selector: 'SubCategoryName',
    sortable: true,
    wrap: true
  },
  {
    name: 'Category Name',
    selector: 'CategoryName',
    sortable: true,
  },
  {
    name: 'Product Quality',
    selector: 'ProductQuality',
    sortable: true,
    wrap: true,
  },
  {
    name: 'Brand Name',
    selector: 'BrandName',
    sortable: true
  },
  {
    name: 'Status',
    selector: 'Status',
    sortable: true,
    wrap: true
  },
  {
    name: 'Action',
    cell: (row) => 
    <div className="col-12">
      <Button className="mb-1 btn update-btn">
      View &amp; Update
      </Button>
      <Button className="mb-1 btn">
        Suspend
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
        modal_scroll: false
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
  render() {
    return (
      <React.Fragment>
          <Card className="mini-stat">
          <CardHeader className="bl-bg">
              <Link to="#" className="text-white">
                <b>Sub Category List</b>
              </Link>
              <span className="float-right">
              <Button type="button"
                      className="btn update-btn font"
                      onClick={this.add_member}
                      data-toggle="modal"
                      data-target=".bs-example-modal-center">
                Add Sub Category</Button>   &nbsp; 
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
                                        <Label for="name">Category</Label>
                                        <Input type="email" id="email" />
                                    </div>
                                    <div className="form-group row">
                                        <Label for="name">Sub Category Name</Label>
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
                {/* <Input 
            className="search-elem"
            type="text" 
            id="searchData"
            placeholder={"Search..."} 
            onChange={(event)=>{this.searchAnything(event)}}
          /> */}
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