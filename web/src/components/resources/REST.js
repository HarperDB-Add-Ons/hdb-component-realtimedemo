import React, { useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import { Col, Row, Card, CardBody } from 'reactstrap';

import DataScroller from '../shared/DataScroller';
import config from '../../config';

let controller;

function REST({ recordTimestamp, setTotalRecords }) {
  const [data, setData] = useState([]);

  useAsyncEffect(async () => {
    if (recordTimestamp) {
      try {
        controller = new AbortController();
        const response = await fetch(`http${config.hdbSSL ? 's' : ''}://${config.hdbUrl}/${config.hdbResource}/?origin_insert_time=ge=${recordTimestamp}`, {
          signal: controller.signal,
          method: 'GET',
          headers: { 'Content-Type': 'application/json', Authorization: config.hdbAuth },
        });
        const result = await response.json();
        if (response.status === 200) {
          setData([...result, ...data]);
        } else {
          // eslint-disable-next-line
          console.log(result);
        }
      } catch (e) {
        // eslint-disable-next-line
        console.log('error getting records');
      }
    }
    return () => controller.abort();
  }, [recordTimestamp, setData]);

  return (
    <Card className="mb-5">
      <CardBody>
        <Row className="text-nowrap">
          <Col xs={8}>
            <h6>REST</h6>
          </Col>
          <Col xs={4} className="text-end">
            <h6>
              {data.length} <i className="ms-1 fas fa-list" />
            </h6>
          </Col>
        </Row>
        <DataScroller data={data} setTotalRecords={setTotalRecords} />
      </CardBody>
    </Card>
  );
}

export default REST;
