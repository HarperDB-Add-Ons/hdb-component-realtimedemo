import React, { useCallback } from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';

import config from '../../config';

function Publish({ publishState, setPublishState }) {
  const generateRecords = useCallback(
    async (currentState, publishDestination) => {
      setPublishState({ ...currentState, loading: publishDestination });
      const start = Date.now();
      try {
        await fetch(`http${config.hdbSSL ? 's' : ''}://${config.hdbUrl}/${config.hdbResource}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: config.hdbAuth },
          body: JSON.stringify({ qty: config.publishQty, origin: publishDestination }),
        });
      } catch (e) {
        // eslint-disable-next-line
        console.log('error publishing');
      }
      setPublishState({ time: Date.now() - start, loading: false });
    },
    [setPublishState]
  );

  return (
    <Row className="down-row">
      {config.originDBs.map(({ key, label }) => (
        <Col key={key} xs={12} lg={12 / config.originDBs.length}>
          <Card className="mb-4">
            <CardBody>
              <Row className="flex-nowrap">
                <Col className="content-column icon">
                  <div className={`logo ${key}`} />
                </Col>
                <Col className="content-column text-nowrap d-none d-sm-inline-block">
                  <h6>{label}</h6>
                </Col>
                <Col className="text-nowrap text-end">
                  <Button disabled={!!publishState.loading} block color="publish" onClick={() => generateRecords(publishState, key)}>
                    {publishState.loading === key ? (
                      <i className="fas fa-spinner fa-spin" />
                    ) : (
                      <div className="text-nowrap">
                        <h6>
                          <span className="fas fa-plus me-1" />
                          {config.publishQty}
                        </h6>
                      </div>
                    )}
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Publish;
