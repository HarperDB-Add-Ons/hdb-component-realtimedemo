import Pulsar from 'pulsar-client';

import config from '../credentials/credentials.js';
const { datastax } = config;

const authentication = new Pulsar.AuthenticationToken({ token: datastax.token });

const client = new Pulsar.Client({
  serviceUrl: datastax.serviceUrl,
  authentication,
  operationTimeoutSeconds: 30,
});

const cdc = async ({ logger, table }) => {
  try {
    const consumer = await client.subscribe({
      topic: datastax.topic,
      subscription: datastax.subscription,
      subscriptionType: 'Exclusive',
    });

    const watchStream = async () => {
      const msg = await consumer.receive();
      const objectString = msg.getData().toString();
      const newRecord = { origin: 'datastax', content: decodeURIComponent(objectString), origin_insert_time: Date.now() };
      logger.notify('received new datastax record', newRecord);
      table.post(newRecord);
      await consumer.acknowledge(msg);
      watchStream();
    };

    watchStream();
  } catch (e) {
    logger.error('error creating datastax consumer', e);
  }
};

export default cdc;
