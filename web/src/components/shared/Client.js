import React from 'react';
import { Row, Col } from 'reactstrap';

import SSE from '../resources/SSE';
import MQTTWS from '../resources/MQTTWS';
import WS from '../resources/WS';
import REST from '../resources/REST';

import config from '../../config';

function Client({ setSubscribeState, recordTimestamp, authenticated }) {
  return (
    <Row className="up-row">
      {config.subscriberTypes.map((subscriberType) => (
        <Col key={subscriberType} xs={12} lg={12 / config.subscriberTypes.length}>
          {subscriberType === 'SSE' ? (
            <SSE setSubscribeState={setSubscribeState} authenticated={authenticated} />
          ) : subscriberType === 'MQTTWS' ? (
            <MQTTWS setSubscribeState={setSubscribeState} authenticated={authenticated} />
          ) : subscriberType === 'REST' ? (
            <REST recordTimestamp={recordTimestamp} />
          ) : (
            <WS setSubscribeState={setSubscribeState} authenticated={authenticated} />
          )}
        </Col>
      ))}
    </Row>
  );
}

export default Client;
