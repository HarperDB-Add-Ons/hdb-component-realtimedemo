import { MongoClient } from 'mongodb';
import { faker } from '@faker-js/faker';

import config from '../../config.js';
const { mongodb } = config;

const ingest = async ({ logger, qty }) => {
  const client = new MongoClient(mongodb.connectionString);

  const items = new Array(qty).fill().map(() => ({
    content: faker.lorem.sentence({ max: 5, min: 3 }),
    origin_insert_time: Date.now().toString(),
  }));

  try {
    const database = client.db(mongodb.databaseName);
    const collection = database.collection(mongodb.collectionName);
    const result = await collection.insertMany(items);
    logger.notify('inserted new mongodb record', result);
    await client.close();
    return { error: false, result };
  } catch (e) {
    logger.error('error inserting new mongodb records', e);
    await client.close();
    return { error: true, result: e };
  }
};

export default ingest;
