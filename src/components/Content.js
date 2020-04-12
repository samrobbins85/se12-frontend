import React, { Component } from "react";

import { Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Content extends Component {
  render() {
    return (
      <div className="next-steps my-5">
        <h2 className="my-5 text-center">How do you use it?</h2>
        <Row className="d-flex justify-content-between">
          <Col key = {1} md={5} className="mb-4">
            <h6 className="mb-3">
              <a href="https://se-docs.netlify.com/">
                  <FontAwesomeIcon icon="link" className="mr-2" />
                  Docs
                </a></h6>
            <p>This will take you offsite to a website containing the documentation behind this site. This link is particularly useful if you are a developer or are seeking to make changes to the system</p>
          </Col>

          <Col key = {4} md={5} className="mb-4">
            <h6 className="mb-3">
              <a href="/designer">
                  <FontAwesomeIcon icon="link" className="mr-2" />
                  Designer
                </a></h6>
            <p>The designer allows you to edit features of the warehouse. You can add zones and bays, delete zones and bays, and edit their dimensions.</p>
          </Col>
          
          <Col key = {5} md={5} className="mb-4">
            <h6 className="mb-3">
              <a href="/reports">
                  <FontAwesomeIcon icon="link" className="mr-2" />
                  Reports
                </a></h6>
            <p>The reports page allows you to view data from previous stock takes to allow for further processing and trend predictions. It also shows the breakdown of stock by category with some other key data.</p>
          </Col>

          <Col key = {6} md={5} className="mb-4">
            <h6 className="mb-3">
              <a href="/stocktake">
                  <FontAwesomeIcon icon="link" className="mr-2" />
                  Stocktake
                </a></h6>
            <p>The stocktake page allows for quick and easy stock take. You simply compare what is on the website to what is before you and amend as necessary.</p>
          </Col>
          

        </Row>
      </div>
    );
  }
}

export default Content;
