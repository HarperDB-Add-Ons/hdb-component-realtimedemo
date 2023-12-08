import React, { useEffect } from 'react';
import { Col, Row, Card, CardBody } from 'reactstrap';

import DataScroller from '../shared/DataScroller';
import config from '../../config';

function WS({ setSubscribeState, authenticated }) {
  useEffect(() => {
    if (authenticated) {
      const eventSource = new WebSocket(`ws${config.hdbSSL ? 's' : ''}://${config.hdbUrl}/${config.hdbResource}`);
      eventSource.addEventListener('message', (event) => {
        const newRecord = JSON.parse(event.data).value;
        if (newRecord?.origin_insert_time) {
          window.records?.WS.unshift(newRecord);
          setSubscribeState(newRecord);
        }
      });
      return () => eventSource.close();
    }
    return () => false;
  }, [setSubscribeState, authenticated]);

  return (
    <Card className="mb-5">
      <CardBody>
        <Row className="text-nowrap">
          <Col xs={8}>
            <h6>WS</h6>
          </Col>
          <Col xs={4} className="text-end">
            <h6>
              {window.records.WS.length} <i className="ms-1 fas fa-list" />
            </h6>
          </Col>
        </Row>
        <DataScroller data={window.records?.WS} />
      </CardBody>
    </Card>
  );
}

export default WS;
