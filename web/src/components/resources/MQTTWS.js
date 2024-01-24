import React, { useEffect } from 'react';
import mqtt from 'mqtt';
import { Col, Row, Card, CardBody } from 'reactstrap';

import DataScroller from '../shared/DataScroller';
import config from '../../config';

function MQTTWS({ setSubscribeState }) {
  useEffect(() => {
    const eventSource = mqtt.connect(`ws${config.hdbSSL ? 's' : ''}://${config.hdbUrl}`);
    eventSource.on('connect', () => {
      eventSource.subscribe(`${config.hdbResource}/#`);
      eventSource.on('message', (mtopic, message) => {
        const decodedMessage = message.toString();
        if (decodedMessage.length) {
          const newRecord = JSON.parse(decodedMessage);
          if (newRecord?.origin_insert_time) {
            window.records?.MQTTWS.unshift(newRecord);
            setSubscribeState(newRecord);
          }
        }
      });
    });
    return () => eventSource.end();
  }, [setSubscribeState]);

  return (
    <Card className="mb-5">
      <CardBody>
        <Row className="text-nowrap">
          <Col xs={8}>
            <h6>MQTTWS</h6>
          </Col>
          <Col xs={4} className="text-end">
            <h6>
              {window.records.MQTTWS.length} <i className="ms-1 fas fa-list" />
            </h6>
          </Col>
        </Row>
        <DataScroller data={window.records?.MQTTWS} />
      </CardBody>
    </Card>
  );
}

export default MQTTWS;
