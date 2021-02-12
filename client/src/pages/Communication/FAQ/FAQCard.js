import React, { Component } from "react";
import ReactHtmlParser from "react-html-parser";
import { Row, Col, Card, CardBody, Collapse, CardHeader } from "reactstrap";
import ExpandLessSharpIcon from "@material-ui/icons/ExpandLessSharp";
import ExpandMoreSharpIcon from "@material-ui/icons/ExpandMoreSharp";
export class FAQCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Collapse: false,
    };
    this.item = this.props.details;
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState((prevState) => ({
      Collapse: !prevState.Collapse,
    }));
  }

  render() {
    return (
      <div className="accordion" id="accordionExample">
        <Card className="mb-0">
          <div className="faq collapsed">
            <CardHeader
              onClick={() => {
                this.handleToggle();
              }}
              className="text-dark"
              id="headingOne"
            >
              <h6 className="m-0 faq-question">
                {this.item.Question}
                <a
                  href="javascript:void(0);"
                  rel="button"
                  className="float-right"
                >
                  {this.state.Collapse ? (
                    <ExpandLessSharpIcon />
                  ) : (
                    <ExpandMoreSharpIcon />
                  )}
                </a>
              </h6>
            </CardHeader>
          </div>

          <Collapse isOpen={this.state.Collapse}>
            <CardBody>
              <p className="text-muted mb-0 faq-ans">
                {ReactHtmlParser(this.item.Answer)}
              </p>
            </CardBody>
          </Collapse>
        </Card>
      </div>
    );
  }
}

export default FAQCard;
