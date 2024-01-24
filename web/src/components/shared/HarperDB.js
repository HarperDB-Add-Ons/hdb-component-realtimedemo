import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';

import config from '../../config';

function HarperDB() {
  return (
    <div className="harperdb-row">
      <div className="load-balancer top">
        <i className="fas fa-compress-arrows-alt me-2" />
        CHANGE DATA CAPTURE
      </div>
      <div className="instance-container">
        <Row>
          {config.hdbLocations.map((location) => (
            <Col key={location} className="harperdb-column">
              <Card>
                <CardBody>
                  <Row className="text-nowrap">
                    <Col className="content-column icon">
                      <div className="logo harperdb" />
                    </Col>
                    <Col xs="auto" className="content-column text-nowrap overflow-hidden text-end">
                      <h6>{location}</h6>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <div className="load-balancer bottom">
        <i className="fas fa-share-alt-square me-2" />
        NATIVE INTERFACES
      </div>
    </div>
  );
}

export default HarperDB;
