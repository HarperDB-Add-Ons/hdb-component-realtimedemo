import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';

import config from '../../config';

function Pricing() {
  return (
    <Row className="pricing">
      {config.originDBs.map(({ key }) => (
        <Col key={key} xs={12} lg={12 / config.originDBs.length}>
          <Card className="mb-4">
            <CardBody>
              <Row className="border-bottom">
                <Col xs={3} className="text-nowrap pb-1">
                  Size
                </Col>
                <Col xs={3} className="text-nowrap pb-1">
                  Rate
                </Col>
                <Col xs={3} className="text-nowrap pb-1">
                  Clients
                </Col>
                <Col xs={3} className="text-nowrap pb-1">
                  Monthly
                </Col>
              </Row>

              <Row className="border-bottom">
                <Col xs={3} className="py-1">
                  1k
                </Col>
                <Col xs={3} className="py-1">
                  1/sec
                </Col>
                <Col xs={3} className="py-1">
                  1,000
                </Col>
                <Col xs={3} className="py-1">
                  $500
                </Col>
              </Row>

              <Row className="border-bottom">
                <Col xs={3} className="py-1">
                  1k
                </Col>
                <Col xs={3} className="py-1">
                  1/sec
                </Col>
                <Col xs={3} className="py-1">
                  1,000
                </Col>
                <Col xs={3} className="py-1">
                  $500
                </Col>
              </Row>

              <Row className="border-bottom">
                <Col xs={3} className="py-1">
                  1k
                </Col>
                <Col xs={3} className="py-1">
                  1/sec
                </Col>
                <Col xs={3} className="py-1">
                  1,000
                </Col>
                <Col xs={3} className="py-1">
                  $500
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Pricing;
