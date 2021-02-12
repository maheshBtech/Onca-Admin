import React, { Component } from "react";
import { Button, Input, Label, Form, Row } from "reactstrap";
import { Editor } from "react-draft-wysiwyg";
import Autocomplete from "./Autocomplete";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
class AddTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.textareachange = this.textareachange.bind(this);
  }

  textareachange(event) {
    var count = event.target.value.length;
    if (count > 0) {
      this.setState({ textareabadge: true });
    } else {
      this.setState({ textareabadge: false });
    }
    this.setState({ textcount: event.target.value.length });
  }

  render() {
    return (
      <React.Fragment>
        <Form>
          <RadioGroup
            row
            aria-label="runner"
            name="runner"
            defaultValue="top"
          >
            <FormControlLabel
              value="training"
              control={<Radio color="primary" />}
              label="Training"
            />
            <FormControlLabel
              value="retail"
              control={<Radio color="primary" />}
              label="Ecommerce"
            />
          </RadioGroup>
          <div className="form-group">
            <Label for="actType">
              Type <span className="text-danger"> *</span>
            </Label>
            <Autocomplete />
          </div>
          <div className="form-group">
            <Label for="tempName">
              Template Name <span className="text-danger"> *</span>
            </Label>
            <Input
              type="text"
              name="templateName"
              id="tempName"
              placeholder="Enter Template Name"
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

export default AddTemplate;
