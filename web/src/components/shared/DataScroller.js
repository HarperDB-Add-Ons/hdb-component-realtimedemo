import React from 'react';
import { Row, Col } from 'reactstrap';

function DataScroller({ data = [] }) {
  return (
    <div className="data-scroller">
      {data?.map((r) => (
        <Row key={crypto.randomUUID()} className="border-bottom">
          <Col xs={4} className="py-2 text-nowrap">
            {new Date(r?.origin_insert_time).toLocaleTimeString()}
          </Col>
          <Col xs={4} className="py-2 pe-4 text-nowrap text-end overflow-x-hidden">
            {r?.origin}
          </Col>
          <Col xs={4} className="py-2 pe-4 text-nowrap text-end overflow-x-hidden">
            {r?.content}
          </Col>
        </Row>
      ))}
    </div>
  );
}

export default DataScroller;
