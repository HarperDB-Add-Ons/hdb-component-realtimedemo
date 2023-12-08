import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';

import config from '../../config';

function HarperDB() {
  return (
    <div className="harperdb-row">
      {config.hdbLocations.length > 1 && (
        <div className="load-balancer top">
          <i className="fas fa-compass me-2" />
          GEO-DNS ROUTING
        </div>
      )}
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
      {config.hdbLocations.length > 1 && (
        <div className="load-balancer bottom">
          <i className="fas fa-compass me-2" />
          GEO-DNS ROUTING
        </div>
      )}
    </div>
  );
}

export default HarperDB;
