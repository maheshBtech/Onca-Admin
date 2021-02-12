import React, { Component } from "react";
import { Button, Input, Label, Form } from "reactstrap";
import { Editor } from "react-draft-wysiwyg";
class AddAnnouncement extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <Form>

          <div className="form-group">
            <Label for="actType">
              Announcement Name <span className="text-danger"> *</span>
            </Label>
            <Input
              type="text"
              name="AnnounName"
              id="AnnounName"
              placeholder="Enter Announcement"
            />

          </div>

          <div className="form-group mb-3">
            <Label for="act-dec">Description <span className="text-danger" >*</span></Label>
            <Editor
              name="AODActivityDescription"
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              toolbar={{
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: false },
                emoji: { inDropdown: false },
              }}
            />
          </div>
          <div className="form-group">
            <Button className="btn btn-block update-btn" type="submit">
              Submit</Button>
          </div>
        </Form>
      </React.Fragment>
    );
  }
}

export default AddAnnouncement;
