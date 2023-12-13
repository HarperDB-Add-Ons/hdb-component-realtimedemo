import { Client } from 'cassandra-driver';
import { faker } from '@faker-js/faker';

import config from '../credentials/credentials.js';
const { datastax } = config;

const ingest = async ({ logger, qty }) => {
  const client = new Client({
    cloud: { secureConnectBundle: datastax.secureConnectBundle },
    credentials: { username: datastax.clientId, password: datastax.secret },
  });

  const items = new Array(qty).fill().map(() => ({
    id: crypto.randomUUID(),
    content: faker.lorem.sentence({ max: 5, min: 3 }),
    origin_insert_time: Date.now(),
  }));

  const query = `INSERT INTO ${datastax.tableName} (id, content, origin_insert_time) values (?, ?, ?)`;
  const inserts = Promise.all(items.map((item) => client.execute(query, Object.values(item), { prepare: true })));

  try {
    const result = await inserts;
    logger.notify('inserted new datastax records');
    await client.shutdown();
    return { error: false, result };
  } catch (e) {
    logger.error('error inserting new datastax records', e);
    await client.shutdown();
    return { error: true, result: e };
  }
};

export default ingest;
