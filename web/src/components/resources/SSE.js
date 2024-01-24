import React, { useEffect } from 'react';
import { Col, Row, Card, CardBody } from 'reactstrap';

import DataScroller from '../shared/DataScroller';
import config from '../../config';

function SSE({ setSubscribeState }) {
  useEffect(() => {
    const eventSource = new EventSource(`http${config.hdbSSL ? 's' : ''}://${config.hdbUrl}/${config.hdbResource}`, { withCredentials: true });
    // eslint-disable-next-line
    console.log(eventSource);
    eventSource.addEventListener('put', (event) => {
      const newRecord = JSON.parse(event.data);
      if (newRecord?.origin_insert_time) {
        window.records?.SSE.unshift(newRecord);
        setSubscribeState(newRecord);
      }
    });
    return () => eventSource.close();
  }, [setSubscribeState]);

  return (
    <Card className="mb-5">
      <CardBody>
        <Row className="text-nowrap">
          <Col xs={8}>
            <h6>SSE</h6>
          </Col>
          <Col xs={4} className="text-end">
            <h6>
              {window.records.SSE.length} <i className="ms-1 fas fa-list" />
            </h6>
          </Col>
        </Row>
        <DataScroller data={window.records?.SSE} />
      </CardBody>
    </Card>
  );
}

export default SSE;
